import { useEffect, useRef, useState } from "react";
import { Canvas, FabricImage, FabricObject, Text } from "fabric";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, RotateCw, ZoomIn, ZoomOut, Trash2, Type } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  fontFamily?: string;
}

interface ImageCustomizerProps {
  productImage: string;
  selectedIcons?: { id: string; url: string; initialLeft: number; initialTop: number; }[];
  nameText?: string;
  onCustomizationChange?: (data: {
    imageData?: string;
    hasCustomization: boolean;
    customObjects: CustomObjectData[];
  }) => void;
}

export const ImageCustomizer = ({ productImage, onCustomizationChange, selectedIcons = [], nameText = "" }: ImageCustomizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hasCustomImage, setHasCustomImage] = useState(false);
  const [customObjects, setCustomObjects] = useState<CustomObjectData[]>([]);
  const [textInput, setTextInput] = useState("");
  const fontOptions = [
    // Modern & Minimal Sans-Serif
    { label: "Inter", value: "\"Inter\", Arial, sans-serif" },
    { label: "Poppins", value: "\"Poppins\", Arial, sans-serif" },
    { label: "Nunito", value: "\"Nunito\", Arial, sans-serif" },
    { label: "Montserrat", value: "\"Montserrat\", Arial, sans-serif" },
    { label: "Lato", value: "\"Lato\", Arial, sans-serif" },
    { label: "Work Sans", value: "\"Work Sans\", Arial, sans-serif" },
    { label: "Rubik", value: "\"Rubik\", Arial, sans-serif" },
    { label: "Outfit", value: "\"Outfit\", Arial, sans-serif" },
    { label: "Manrope", value: "\"Manrope\", Arial, sans-serif" },
    { label: "Plus Jakarta Sans", value: "\"Plus Jakarta Sans\", Arial, sans-serif" },
    // Elegant Serif
    { label: "Playfair Display", value: "\"Playfair Display\", Georgia, serif" },
    { label: "Merriweather", value: "\"Merriweather\", Georgia, serif" },
    { label: "Cormorant Garamond", value: "\"Cormorant Garamond\", Georgia, serif" },
    { label: "Lora", value: "\"Lora\", Georgia, serif" },
    { label: "Libre Baskerville", value: "\"Libre Baskerville\", Georgia, serif" },
    { label: "EB Garamond", value: "\"EB Garamond\", Georgia, serif" },
    { label: "Bodoni Moda", value: "\"Bodoni Moda\", Georgia, serif" },
    { label: "DM Serif Display", value: "\"DM Serif Display\", Georgia, serif" },
    { label: "Spectral", value: "\"Spectral\", Georgia, serif" },
    { label: "Georgia", value: "\"Georgia\", serif" },
    // Creative & Artistic
    { label: "Pacifico", value: "\"Pacifico\", \"Brush Script MT\", cursive" },
    { label: "Dancing Script", value: "\"Dancing Script\", \"Brush Script MT\", cursive" },
    { label: "Great Vibes", value: "\"Great Vibes\", \"Brush Script MT\", cursive" },
    { label: "Satisfy", value: "\"Satisfy\", \"Brush Script MT\", cursive" },
    { label: "Cookie", value: "\"Cookie\", \"Brush Script MT\", cursive" },
    { label: "Allura", value: "\"Allura\", \"Brush Script MT\", cursive" },
    { label: "Caveat", value: "\"Caveat\", \"Comic Sans MS\", cursive" },
    { label: "Amatic SC", value: "\"Amatic SC\", \"Comic Sans MS\", cursive" },
    { label: "Yellowtail", value: "\"Yellowtail\", \"Brush Script MT\", cursive" },
    { label: "Parisienne", value: "\"Parisienne\", \"Brush Script MT\", cursive" },
    // Tech & Futuristic
    { label: "Space Grotesk", value: "\"Space Grotesk\", Arial, sans-serif" },
    { label: "Rajdhani", value: "\"Rajdhani\", Arial, sans-serif" },
    { label: "Orbitron", value: "\"Orbitron\", Arial, sans-serif" },
    { label: "Audiowide", value: "\"Audiowide\", Arial, sans-serif" },
    { label: "Exo 2", value: "\"Exo 2\", Arial, sans-serif" },
    { label: "Quantico", value: "\"Quantico\", Arial, sans-serif" },
    { label: "Saira", value: "\"Saira\", Arial, sans-serif" },
    { label: "Bebas Neue", value: "\"Bebas Neue\", Arial, sans-serif" },
    { label: "Teko", value: "\"Teko\", Arial, sans-serif" },
    { label: "Oxanium", value: "\"Oxanium\", Arial, sans-serif" },
    // Designer Favorites
    { label: "Helvetica Neue", value: "\"Helvetica Neue\", Arial, sans-serif" },
    { label: "Futura", value: "\"Futura\", Arial, sans-serif" },
    { label: "Avenir", value: "\"Avenir\", Arial, sans-serif" },
    { label: "Proxima Nova", value: "\"Proxima Nova\", Arial, sans-serif" },
    { label: "Roboto", value: "\"Roboto\", Arial, sans-serif" },
    { label: "Open Sans", value: "\"Open Sans\", Arial, sans-serif" },
    { label: "Source Sans Pro", value: "\"Source Sans Pro\", Arial, sans-serif" },
    { label: "Gilroy", value: "\"Gilroy\", Arial, sans-serif" },
    { label: "Circular Std", value: "\"Circular Std\", Arial, sans-serif" },
    { label: "Satoshi", value: "\"Satoshi\", Arial, sans-serif" },
    // LaserCraft Local Collection
    { label: "Angelos", value: "\"Angelos\", Arial, sans-serif" },
    { label: "Eagle Horizon", value: "\"Eagle Horizon\", Arial, sans-serif" },
    { label: "Lucy Said Ok", value: "\"Lucy Said Ok\", Arial, sans-serif" },
    { label: "Perfecto Calligraphy", value: "\"Perfecto Calligraphy\", cursive" },
    { label: "Ruigslay", value: "\"Ruigslay\", serif" },
    { label: "Rustic Roadway", value: "\"Rustic Roadway\", serif" },
    { label: "Transcity", value: "\"Transcity\", Arial, sans-serif" },
    { label: "Hugh is Life", value: "\"Hugh is Life\", cursive" },
    { label: "Shlop", value: "\"Shlop\", cursive" },
  ] as const;
  const [selectedFont, setSelectedFont] = useState<(typeof fontOptions)[number]["value"]>(fontOptions[0].value);
  const silhouetteOptions = [
    { label: "Basketball Hoop", value: "/images/silhouette/basket.png" },
    { label: "Basketball Pose 2", value: "/images/silhouette/basket2.png" },
    { label: "Basketball Pose 3", value: "/images/silhouette/basket3.jpg" },
    { label: "Basketball Pose 4", value: "/images/silhouette/basket4.jpg" },
    { label: "Boxer Icon", value: "/images/silhouette/black-vector-boxer-icon-white-background_572070-901.jpg" },
    { label: "Boxer Punch", value: "/images/silhouette/boxer-punching-silhouette-combat-sport-training-free-vector.jpg" },
    { label: "Athlete Outline", value: "/images/silhouette/c7394009e63a2320d73ec9a66fbef004.jpg" },
    { label: "Basketball Jump", value: "/images/silhouette/images (1).jpeg" },
    { label: "Celebration Pose", value: "/images/silhouette/images (3).jpeg" },
    { label: "Runner Sprint", value: "/images/silhouette/runner-silhouette-sprinting-or-jogging-vector-48778587.png" },
    { label: "Football Player", value: "/images/silhouette/silhouette-football-player_917710-348.jpg" },
    { label: "Swimmer", value: "/images/silhouette/swim1.jpg" },
    { label: "Tennis Serve", value: "/images/silhouette/tennis1.svg" },
    { label: "Tennis Forehand", value: "/images/silhouette/tennis2.png" },
  ] as const;
  const [selectedSilhouette, setSelectedSilhouette] = useState<string | undefined>(undefined);
  const ensureObjectWithinBounds = (object?: FabricObject | null) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || !object || object.selectable === false) return;

    const getScaledWidth =
      (object as FabricObject & { getScaledWidth?: () => number }).getScaledWidth?.bind(object) ??
      (() => ((object.width ?? 0) * (object.scaleX ?? 1)));
    const getScaledHeight =
      (object as FabricObject & { getScaledHeight?: () => number }).getScaledHeight?.bind(object) ??
      (() => ((object.height ?? 0) * (object.scaleY ?? 1)));

    const canvasWidth = canvas.getWidth();
    const canvasHeight = canvas.getHeight();
    const scaledWidth = getScaledWidth();
    const scaledHeight = getScaledHeight();

    if (scaledWidth > canvasWidth || scaledHeight > canvasHeight) {
      const widthRatio = canvasWidth / (scaledWidth || 1);
      const heightRatio = canvasHeight / (scaledHeight || 1);
      const scaleFactor = Math.min(widthRatio, heightRatio, 1);

      const nextScaleX = (object.scaleX ?? 1) * scaleFactor;
      const nextScaleY = (object.scaleY ?? 1) * scaleFactor;

      object.set({
        scaleX: nextScaleX,
        scaleY: nextScaleY,
      });
    }

    object.setCoords();
    const boundingRect = object.getBoundingRect(true, true);
    let { left = 0, top = 0 } = object;
    const rightOverflow = boundingRect.left + boundingRect.width - canvasWidth;
    const bottomOverflow = boundingRect.top + boundingRect.height - canvasHeight;

    if (boundingRect.left < 0) {
      left -= boundingRect.left;
    }
    if (boundingRect.top < 0) {
      top -= boundingRect.top;
    }
    if (rightOverflow > 0) {
      left -= rightOverflow;
    }
    if (bottomOverflow > 0) {
      top -= bottomOverflow;
    }

    object.set({ left, top });
    object.setCoords();
  };

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
          fontFamily: (obj as Text).fontFamily as string | undefined,
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
    const containerElement = canvas.getElement().parentElement;
    if (containerElement instanceof HTMLElement) {
      containerElement.style.marginLeft = "auto";
      containerElement.style.marginRight = "auto";
      containerElement.style.position = "relative";
      containerElement.style.display = "block";
    }
    const handleObjectTransform = (event: { target?: FabricObject | null }) => {
      ensureObjectWithinBounds(event.target);
      canvas.requestRenderAll();
    };

    canvas.on("object:moving", handleObjectTransform);
    canvas.on("object:scaling", handleObjectTransform);
    canvas.on("object:rotating", handleObjectTransform);
    canvas.on("object:added", handleObjectTransform);

    // Load product background image
    FabricImage.fromURL(productImage, {
      crossOrigin: "anonymous",
    }).then((img) => {
      const canvasWidth = canvas.getWidth();
      const canvasHeight = canvas.getHeight();
      const imgWidth = img.width ?? canvasWidth;
      const imgHeight = img.height ?? canvasHeight;
      const scale = Math.min(canvasWidth / imgWidth, canvasHeight / imgHeight);

      img.set({
        scaleX: scale,
        scaleY: scale,
        selectable: false,
        evented: false,
        originX: "center",
        originY: "center",
        left: canvasWidth / 2,
        top: canvasHeight / 2,
      });

      canvas.add(img);
      canvas.sendObjectToBack(img);
      canvas.renderAll();
    });

    canvas.on("object:modified", updateCustomization);
    canvas.on("object:added", updateCustomization);
    canvas.on("object:removed", updateCustomization);

    return () => {
      canvas.off("object:moving", handleObjectTransform);
      canvas.off("object:scaling", handleObjectTransform);
      canvas.off("object:rotating", handleObjectTransform);
      canvas.off("object:added", handleObjectTransform);
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
      ensureObjectWithinBounds(fabricImg);
    });

    // Add name text
    if (nameText) {
      const textObject = new Text(nameText, {
        left: 250, // Center
        top: 200, // Adjust position as needed
        fontSize: 30,
        fill: "black",
        fontFamily: "Manrope, Inter, Arial, sans-serif",
        textAlign: "center",
        isNameText: true,
      });
      fabricCanvasRef.current?.add(textObject);
      ensureObjectWithinBounds(textObject);
    }

    fabricCanvasRef.current.renderAll();
    updateCustomization();
  }, [selectedIcons, nameText]);

  const ensureFontLoaded = async (fontFamily: string) => {
    if (document.fonts && "load" in document.fonts) {
      try {
        const primaryFont = fontFamily.split(",")[0]?.replace(/["']/g, "").trim() || fontFamily;
        await document.fonts.load(`400 16px ${primaryFont}`);
      } catch (error) {
        console.warn("Failed to load font:", error);
      }
    }
  };

  const handleFontChange = async (value: (typeof fontOptions)[number]["value"]) => {
    setSelectedFont(value);
    const activeObject = fabricCanvasRef.current?.getActiveObject();
    if (activeObject && activeObject.type === "text") {
      await ensureFontLoaded(value);
      (activeObject as Text).set("fontFamily", value);
      fabricCanvasRef.current?.renderAll();
      updateCustomization();
      toast.success("Font updated for selected text");
    }
  };


  const convertToBlack = (imageElement: HTMLImageElement): Promise<string> => {
    return new Promise((resolve) => {
      const tempCanvas = document.createElement("canvas");
      const ctx = tempCanvas.getContext("2d");
      if (!ctx) {
        resolve(imageElement.src);
        return;
      }

      tempCanvas.width = imageElement.width;
      tempCanvas.height = imageElement.height;

      ctx.drawImage(imageElement, 0, 0);
      const imageData = ctx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
      const data = imageData.data;

      // Convert to black while removing neutral/light backgrounds (including checkerboards)
      for (let i = 0; i < data.length; i += 4) {
        const alpha = data[i + 3];

        if (alpha <= 32) {
          data[i + 3] = 0;
          continue;
        }

        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];
        const maxChannel = Math.max(red, green, blue);
        const minChannel = Math.min(red, green, blue);
        const lightness = maxChannel;
        const saturation = maxChannel === 0 ? 0 : (maxChannel - minChannel) / maxChannel;

        // Treat very light or low-saturation light pixels as background (handles white & checkerboards)
        const isNeutralLight = lightness >= 210 && saturation <= 0.25;
        const isAlmostWhite = red > 240 && green > 240 && blue > 240;
        if (isNeutralLight || isAlmostWhite) {
          data[i + 3] = 0;
          continue;
        }

        data[i] = 0;
        data[i + 1] = 0;
        data[i + 2] = 0;
        data[i + 3] = 255;
      }

      ctx.putImageData(imageData, 0, 0);
      resolve(tempCanvas.toDataURL("image/png"));
    });
  };

  const loadImageElement = (src: string) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = src;
    });
  };

  const handleAddText = async () => {
    if (!textInput.trim()) {
      toast.error("Please enter some text");
      return;
    }

    if (!fabricCanvasRef.current) return;

    await ensureFontLoaded(selectedFont);
    const textObject = new Text(textInput, {
      left: 250,
      top: 250,
      fontSize: 32,
      fill: "black",
      fontFamily: selectedFont,
      fontWeight: "bold",
    });

    fabricCanvasRef.current.add(textObject);
    ensureObjectWithinBounds(textObject);
    fabricCanvasRef.current.setActiveObject(textObject);
    fabricCanvasRef.current.renderAll();

    setTextInput("");
    updateCustomization();
    toast.success("Text added to canvas!");
  };

  const handleSilhouetteSelect = async (value: string) => {
    setSelectedSilhouette(value);
    if (!fabricCanvasRef.current) return;

    try {
      const imageElement = await loadImageElement(value);
      const processedDataUrl = await convertToBlack(imageElement);
      const silhouetteImg = await FabricImage.fromURL(processedDataUrl);
      const canvas = fabricCanvasRef.current;
      const canvasWidth = canvas.getWidth();
      const canvasHeight = canvas.getHeight();

      const desiredSize = 220;
      const rawWidth = silhouetteImg.width ?? desiredSize;
      const rawHeight = silhouetteImg.height ?? desiredSize;
      const scale = Math.min(desiredSize / rawWidth, desiredSize / rawHeight, 1);

      silhouetteImg.set({
        originX: "center",
        originY: "center",
        left: canvasWidth / 2,
        top: canvasHeight / 2,
        isSilhouette: true,
      });

      silhouetteImg.scale(scale);
      canvas.add(silhouetteImg);
      ensureObjectWithinBounds(silhouetteImg);
      canvas.setActiveObject(silhouetteImg);
      canvas.renderAll();
      updateCustomization();
      toast.success("Silhouette added to canvas!");
    } catch (error) {
      console.error("Failed to load silhouette", error);
      toast.error("Could not add silhouette. Please try again.");
    } finally {
      setSelectedSilhouette(undefined);
    }
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
          ensureObjectWithinBounds(fabricImg);
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
      ensureObjectWithinBounds(activeObject);
      fabricCanvasRef.current?.renderAll();
      updateCustomization();
    }
  };

  const scaleSelected = (factor: number) => {
    const activeObject = fabricCanvasRef.current?.getActiveObject();
    if (activeObject) {
      const newScale = (activeObject.scaleX || 1) * factor;
      activeObject.scale(newScale);
      ensureObjectWithinBounds(activeObject);
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

      <div className="space-y-2">
        <Label htmlFor="text-input">Add Text</Label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Select value={selectedFont} onValueChange={handleFontChange}>
            <SelectTrigger className="sm:w-48 border-border/70 bg-background/80">
              <SelectValue placeholder="Font family" />
            </SelectTrigger>
            <SelectContent className="border-border/70 bg-card/90">
              {fontOptions.map((option) => (
                <SelectItem key={option.label} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            id="text-input"
            placeholder="Enter text to add..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddText();
              }
            }}
          />
          <Button onClick={handleAddText} variant="hero">
            <Type className="mr-2 h-4 w-4" />
            Add
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="silhouette-select">Add Sports Silhouette</Label>
        <Select value={selectedSilhouette} onValueChange={handleSilhouetteSelect}>
          <SelectTrigger id="silhouette-select" className="sm:w-72 border-border/70 bg-background/80">
            <SelectValue placeholder="Choose a silhouette" />
          </SelectTrigger>
          <SelectContent className="border-border/70 bg-card/90">
            {silhouetteOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded bg-muted/60">
                    <img src={option.value} alt={option.label} className="h-7 w-7 object-contain" loading="lazy" />
                  </span>
                  <span>{option.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant="hero"
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 min-w-[140px]"
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload Image
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
        <p>• Enter text in the field above and click "Add" to place it on the canvas</p>
        <p>• Upload an image (PNG/JPG) - it will be converted to black silhouette</p>
        <p>• Click and drag to position text or images on the product</p>
        <p>• Use controls to rotate, scale, or delete selected items</p>
      </div>
    </div>
  );
};
