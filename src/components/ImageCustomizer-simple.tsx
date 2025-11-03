import { useEffect, useRef, useState } from "react";
import { Canvas, FabricImage, FabricObject, Text } from "fabric";
import { Button } from "@/components/ui/button";
import { Upload, RotateCw, ZoomIn, ZoomOut, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface CustomObjectData {
  id?: string;
  type: string;
  left: number;
  top: number;
  scaleX: number;
  scaleY: number;
  angle: number;
  text?: string;
  url?: string;
}

interface ImageCustomizerProps {
  productImage: string;
  customizableArea?: {
    width: number;
    height: number;
    x: number;
    y: number;
  };
  onCustomizationChange?: (data: {
    imageData?: string;
    hasCustomization: boolean;
    customText?: string;
    customImage?: string;
  }) => void;
}

export const ImageCustomizer = ({ productImage, onCustomizationChange, selectedIcons, nameText }: ImageCustomizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hasCustomImage, setHasCustomImage] = useState(false);
  const [customObjects, setCustomObjects] = useState<CustomObjectData[]>([]);

  const updateCustomization = () => {
    if (!fabricCanvasRef.current) return;

    const dataUrl = fabricCanvasRef.current.toDataURL({
      format: "png",
      quality: 1,
      multiplier: 1,
    });

    const currentCustomObjects: CustomObjectData[] = [];
    fabricCanvasRef.current.getObjects().forEach((obj: FabricObject) => {
      // Only include objects that are selectable (i.e., not the background image)
      if (obj.selectable) {
        currentCustomObjects.push({
          id: (obj as any).id, // Assuming id is set for icons
          type: obj.type || "image",
          left: obj.left || 0,
          top: obj.top || 0,
          scaleX: obj.scaleX || 1,
          scaleY: obj.scaleY || 1,
          angle: obj.angle || 0,
          text: (obj as Text).text, // For text objects
          url: (obj as any).url, // For image objects
        });
      }
    });

    setCustomObjects(currentCustomObjects);

    onCustomizationChange?.({
      imageData: dataUrl,
      hasCustomization: hasCustomImage || currentCustomObjects.length > 0,
      customObjects: currentCustomObjects,
    });
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new Canvas(canvasRef.current, {
      width: 500,
      height: 500,
      backgroundColor: "#f5f5f5",
    });

    fabricCanvasRef.current = canvas;

    // Load product background image
    FabricImage.fromURL(productImage, {
      crossOrigin: "anonymous",
    }).then((img) => {
      img.scaleToWidth(500);
      img.scaleToHeight(500);
      img.selectable = false;
      img.evented = false;
      canvas.add(img);
      canvas.sendObjectToBack(img);
      canvas.renderAll();
    });

    canvas.on("object:modified", updateCustomization);
    canvas.on("object:added", updateCustomization);
    canvas.on("object:removed", updateCustomization);

    return () => {
      canvas.dispose();
    };
  }, [productImage]);

  useEffect(() => {
    if (!fabricCanvasRef.current) return;

    // Clear existing custom icons and text
    fabricCanvasRef.current.getObjects().forEach((obj: FabricObject) => {
      if (obj.selectable && (obj as any).isCustomIcon || (obj as any).isNameText) {
        fabricCanvasRef.current?.remove(obj);
      }
    });

    // Add selected icons
    selectedIcons.forEach(async (icon) => {
      const fabricImg = await FabricImage.fromURL(icon.url, { crossOrigin: "anonymous" });
      fabricImg.scaleToWidth(50); // Adjust size as needed
      fabricImg.set({
        left: icon.initialLeft,
        top: icon.initialTop,
        id: icon.id,
        isCustomIcon: true,
      });
      fabricCanvasRef.current?.add(fabricImg);
    });

    // Add name text
    if (nameText) {
      const textObject = new Text(nameText, {
        left: 250, // Center
        top: 200, // Adjust position as needed
        fontSize: 30,
        fill: "black",
        fontFamily: "Arial",
        textAlign: "center",
        isNameText: true,
      });
      fabricCanvasRef.current?.add(textObject);
    }

    fabricCanvasRef.current.renderAll();
    updateCustomization();
  }, [selectedIcons, nameText]);


  const convertToBlack = (imageElement: HTMLImageElement): Promise<string> => {
    return new Promise((resolve) => {
      const tempCanvas = document.createElement("canvas");
      const ctx = tempCanvas.getContext("2d");
      if (!ctx) return;

      tempCanvas.width = imageElement.width;
      tempCanvas.height = imageElement.height;

      ctx.drawImage(imageElement, 0, 0);
      const imageData = ctx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
      const data = imageData.data;

      // Convert to black based on alpha channel
      for (let i = 0; i < data.length; i += 4) {
        const alpha = data[i + 3];
        if (alpha > 128) {
          // If pixel is mostly opaque, make it black
          data[i] = 0;
          data[i + 1] = 0;
          data[i + 2] = 0;
          data[i + 3] = 255;
        } else {
          // If pixel is mostly transparent, make it fully transparent
          data[i + 3] = 0;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      resolve(tempCanvas.toDataURL("image/png"));
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const imgElement = new Image();
      imgElement.onload = async () => {
        try {
          // Convert image to black
          const blackImageData = await convertToBlack(imgElement);

          // Add to canvas
          const fabricImg = await FabricImage.fromURL(blackImageData);
          fabricImg.scaleToWidth(200);
          fabricImg.set({
            left: 150,
            top: 150,
          });

          fabricCanvasRef.current?.add(fabricImg);
          fabricCanvasRef.current?.setActiveObject(fabricImg);
          fabricCanvasRef.current?.renderAll();

          setHasCustomImage(true);
          updateCustomization();
          toast.success("Image uploaded and converted to black!");
        } catch (error) {
          toast.error("Failed to process image");
          console.error(error);
        }
      };
      imgElement.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const rotateSelected = () => {
    const activeObject = fabricCanvasRef.current?.getActiveObject();
    if (activeObject) {
      activeObject.rotate((activeObject.angle || 0) + 15);
      fabricCanvasRef.current?.renderAll();
      updateCustomization();
    }
  };

  const scaleSelected = (factor: number) => {
    const activeObject = fabricCanvasRef.current?.getActiveObject();
    if (activeObject) {
      const newScale = (activeObject.scaleX || 1) * factor;
      activeObject.scale(newScale);
      fabricCanvasRef.current?.renderAll();
      updateCustomization();
    }
  };

  const deleteSelected = () => {
    const activeObject = fabricCanvasRef.current?.getActiveObject();
    if (activeObject) {
      fabricCanvasRef.current?.remove(activeObject);
      fabricCanvasRef.current?.renderAll();
      setHasCustomImage(false); // Re-evaluate if any custom images are left
      updateCustomization();
      toast.success("Design element removed");
    }
  };

  const resetCanvas = () => {
    if (!fabricCanvasRef.current) return;

    const objects = fabricCanvasRef.current.getObjects();
    objects.forEach((obj: FabricObject) => {
      if (obj.selectable !== false) { // Remove all selectable objects
        fabricCanvasRef.current?.remove(obj);
      }
    });

    fabricCanvasRef.current.renderAll();
    setHasCustomImage(false);
    onCustomizationChange?.({
      imageData: undefined,
      hasCustomization: false,
      customObjects: [],
    });
    toast.success("Canvas reset");
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-border rounded-lg p-4 bg-card">
        <canvas ref={canvasRef} className="mx-auto rounded shadow-lg" />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant="hero"
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 min-w-[140px]"
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload PNG
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          onChange={handleImageUpload}
          className="hidden"
        />

        <Button
          variant="outline"
          onClick={rotateSelected}
          disabled={!fabricCanvasRef.current?.getActiveObject()}
          size="icon"
        >
          <RotateCw className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          onClick={() => scaleSelected(1.1)}
          disabled={!fabricCanvasRef.current?.getActiveObject()}
          size="icon"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          onClick={() => scaleSelected(0.9)}
          disabled={!fabricCanvasRef.current?.getActiveObject()}
          size="icon"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          onClick={deleteSelected}
          disabled={!fabricCanvasRef.current?.getActiveObject()}
          size="icon"
        >
          <Trash2 className="h-4 w-4" />
        </Button>

        <Button
          variant="destructive"
          onClick={resetCanvas}
          disabled={!hasCustomImage && customObjects.length === 0}
          className="flex-1 min-w-[100px]"
        >
          Reset
        </Button>
      </div>

      <div className="text-sm text-muted-foreground space-y-1">
        <p>• Select icons from the dropdowns above - they will appear on the canvas</p>
        <p>• Click and drag icons to position them on the hanger</p>
        <p>• Use controls to rotate, scale, or delete selected items</p>
        <p>• Upload a PNG image for additional customization (auto-converted to black)</p>
      </div>
    </div>
  );
};
