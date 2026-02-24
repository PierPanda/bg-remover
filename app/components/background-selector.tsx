import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Slider,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import * as React from "react";
import type { BackgroundOption, BackgroundType } from "~/types";

interface BackgroundSelectorProps {
  value: BackgroundOption;
  onChange: (option: BackgroundOption) => void;
}

const SOLID_PRESETS = [
  { color: "#FFFFFF", label: "White" },
  { color: "#000000", label: "Black" },
  { color: "#6B7280", label: "Gray" },
  { color: "#EF4444", label: "Red" },
  { color: "#22C55E", label: "Green" },
  { color: "#3B82F6", label: "Blue" },
];

const GRADIENT_PRESETS = [
  {
    colors: ["#667eea", "#764ba2"] as [string, string],
    label: "Purple Dream",
  },
  {
    colors: ["#f093fb", "#f5576c"] as [string, string],
    label: "Pink Sunset",
  },
  {
    colors: ["#4facfe", "#00f2fe"] as [string, string],
    label: "Ocean Blue",
  },
  {
    colors: ["#43e97b", "#38f9d7"] as [string, string],
    label: "Mint Fresh",
  },
  {
    colors: ["#fa709a", "#fee140"] as [string, string],
    label: "Warm Glow",
  },
  {
    colors: ["#a18cd1", "#fbc2eb"] as [string, string],
    label: "Lavender",
  },
];

const TABS: { type: BackgroundType; label: string; icon: string }[] = [
  { type: "transparent", label: "Transparent", icon: "lucide:grid-3x3" },
  { type: "solid", label: "Solid", icon: "lucide:palette" },
  { type: "gradient", label: "Gradient", icon: "lucide:blend" },
  { type: "image", label: "Image", icon: "lucide:image" },
];

interface ColorPickerButtonProps {
  color: string;
  onChange: (color: string) => void;
  size?: "sm" | "md";
}

function ColorPickerButton({
  color,
  onChange,
  size = "md",
}: ColorPickerButtonProps) {
  const sizeClasses = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const innerSize = size === "sm" ? "h-6 w-6" : "h-8 w-8";

  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <button
          aria-label="Select custom color"
          className={`${sizeClasses} flex cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-gray-300 transition-colors hover:border-gray-400 dark:border-gray-600`}
        >
          <div
            className={`${innerSize} rounded-full border border-gray-200 dark:border-gray-700`}
            style={{ backgroundColor: color }}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-3">
        <div className="flex flex-col gap-3">
          <HexColorPicker color={color} onChange={onChange} />
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">#</span>
            <HexColorInput
              color={color}
              onChange={onChange}
              className="w-full rounded border border-gray-300 px-2 py-1 text-sm font-mono uppercase dark:border-gray-600 dark:bg-gray-800"
              prefixed={false}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default function BackgroundSelector({
  value,
  onChange,
}: BackgroundSelectorProps) {
  const [customColor, setCustomColor] = React.useState(
    value.color ?? "#FFFFFF"
  );
  const [gradientColor1, setGradientColor1] = React.useState(
    value.gradient?.colors[0] ?? "#667eea"
  );
  const [gradientColor2, setGradientColor2] = React.useState(
    value.gradient?.colors[1] ?? "#764ba2"
  );
  const [gradientAngle, setGradientAngle] = React.useState(
    value.gradient?.angle ?? 180
  );
  const [gradientType, setGradientType] = React.useState<"linear" | "radial">(
    value.gradient?.type ?? "linear"
  );
  const [uploadedImage, setUploadedImage] = React.useState<string | null>(
    value.imageUrl ?? null
  );
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Cleanup blob URL on unmount to prevent memory leaks
  React.useEffect(() => {
    return () => {
      if (uploadedImage) {
        URL.revokeObjectURL(uploadedImage);
      }
    };
  }, [uploadedImage]);

  const handleTabChange = (type: BackgroundType) => {
    if (type === "transparent") {
      onChange({ type: "transparent" });
    } else if (type === "solid") {
      onChange({ type: "solid", color: customColor });
    } else if (type === "gradient") {
      onChange({
        type: "gradient",
        gradient: {
          type: gradientType,
          colors: [gradientColor1, gradientColor2],
          angle: gradientAngle,
        },
      });
    } else if (type === "image" && uploadedImage) {
      onChange({ type: "image", imageUrl: uploadedImage });
    } else if (type === "image") {
      onChange({ type: "image" });
    }
  };

  const handleSolidPreset = (color: string) => {
    setCustomColor(color);
    onChange({ type: "solid", color });
  };

  const handleCustomColorChange = (color: string) => {
    setCustomColor(color);
    onChange({ type: "solid", color });
  };

  const handleGradientPreset = (colors: [string, string]) => {
    setGradientColor1(colors[0]);
    setGradientColor2(colors[1]);
    onChange({
      type: "gradient",
      gradient: {
        type: gradientType,
        colors,
        angle: gradientAngle,
      },
    });
  };

  const handleGradientColorChange = (
    color: string,
    position: "first" | "second"
  ) => {
    const newColors: [string, string] =
      position === "first" ? [color, gradientColor2] : [gradientColor1, color];
    if (position === "first") setGradientColor1(color);
    else setGradientColor2(color);
    onChange({
      type: "gradient",
      gradient: {
        type: gradientType,
        colors: newColors,
        angle: gradientAngle,
      },
    });
  };

  const handleGradientAngleChange = (angle: number) => {
    setGradientAngle(angle);
    onChange({
      type: "gradient",
      gradient: {
        type: gradientType,
        colors: [gradientColor1, gradientColor2],
        angle,
      },
    });
  };

  const handleGradientTypeToggle = () => {
    const newType = gradientType === "linear" ? "radial" : "linear";
    setGradientType(newType);
    onChange({
      type: "gradient",
      gradient: {
        type: newType,
        colors: [gradientColor1, gradientColor2],
        angle: gradientAngle,
      },
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB

    // Validate that the selected file is an image and within the allowed size
    if (!file.type.startsWith("image/") || file.size > MAX_IMAGE_SIZE) {
      // Reset the input so the user can select a different file
      e.target.value = "";
      return;
    }

    // Revoke previous URL to prevent memory leaks
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
    }

    const url = URL.createObjectURL(file);
    setUploadedImage(url);
    onChange({ type: "image", imageUrl: url });
  };

  const handleRemoveImage = () => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
    }
    setUploadedImage(null);
    onChange({ type: "image" });
  };

  const renderTabContent = () => {
    switch (value.type) {
      case "transparent":
        return (
          <div className="flex items-center gap-3 py-2">
            <div
              className="h-12 w-12 rounded-lg border border-gray-300 dark:border-gray-600"
              style={{
                backgroundImage: `
                  linear-gradient(45deg, #ccc 25%, transparent 25%),
                  linear-gradient(-45deg, #ccc 25%, transparent 25%),
                  linear-gradient(45deg, transparent 75%, #ccc 75%),
                  linear-gradient(-45deg, transparent 75%, #ccc 75%)
                `,
                backgroundSize: "10px 10px",
                backgroundPosition: "0 0, 0 5px, 5px -5px, -5px 0px",
              }}
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Transparent background (checkerboard pattern)
            </span>
          </div>
        );

      case "solid":
        return (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              {SOLID_PRESETS.map((preset) => (
                <button
                  key={preset.color}
                  onClick={() => handleSolidPreset(preset.color)}
                  className={`group relative h-10 w-10 rounded-full border-2 transition-all ${
                    customColor.toUpperCase() === preset.color.toUpperCase()
                      ? "border-blue-500 ring-2 ring-blue-500/30"
                      : "border-gray-300 hover:border-gray-400 dark:border-gray-600"
                  }`}
                  style={{ backgroundColor: preset.color }}
                  title={preset.label}
                  aria-label={`${preset.label} color preset`}
                >
                  {customColor.toUpperCase() === preset.color.toUpperCase() && (
                    <Icon
                      icon="lucide:check"
                      className={`absolute inset-0 m-auto h-5 w-5 ${
                        preset.color === "#FFFFFF"
                          ? "text-gray-800"
                          : "text-white"
                      }`}
                    />
                  )}
                </button>
              ))}
              <ColorPickerButton
                color={customColor}
                onChange={handleCustomColorChange}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Selected:
              </span>
              <div
                className="h-6 w-6 rounded border border-gray-300 dark:border-gray-600"
                style={{ backgroundColor: customColor }}
              />
              <span className="text-sm font-mono text-gray-700 dark:text-gray-300">
                {customColor.toUpperCase()}
              </span>
            </div>
          </div>
        );

      case "gradient":
        return (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              {GRADIENT_PRESETS.map((preset) => (
                <button
                  key={`${preset.colors[0]}-${preset.colors[1]}`}
                  onClick={() => handleGradientPreset(preset.colors)}
                  className={`h-10 w-16 rounded-lg border-2 transition-all ${
                    gradientColor1.toUpperCase() ===
                      preset.colors[0].toUpperCase() &&
                    gradientColor2.toUpperCase() ===
                      preset.colors[1].toUpperCase()
                      ? "border-blue-500 ring-2 ring-blue-500/30"
                      : "border-gray-300 hover:border-gray-400 dark:border-gray-600"
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${preset.colors[0]}, ${preset.colors[1]})`,
                  }}
                  title={preset.label}
                  aria-label={`${preset.label} gradient preset`}
                />
              ))}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <ColorPickerButton
                  color={gradientColor1}
                  onChange={(color) =>
                    handleGradientColorChange(color, "first")
                  }
                  size="sm"
                />
                <Icon
                  icon="lucide:arrow-right"
                  className="h-4 w-4 text-gray-400"
                />
                <ColorPickerButton
                  color={gradientColor2}
                  onChange={(color) =>
                    handleGradientColorChange(color, "second")
                  }
                  size="sm"
                />
              </div>
              <Button
                size="sm"
                variant="bordered"
                onPress={handleGradientTypeToggle}
                startContent={
                  <Icon
                    icon={
                      gradientType === "linear"
                        ? "lucide:move-horizontal"
                        : "lucide:circle"
                    }
                    className="h-4 w-4"
                  />
                }
              >
                {gradientType === "linear" ? "Linear" : "Radial"}
              </Button>
            </div>
            {gradientType === "linear" && (
              <div>
                <label
                  htmlFor="gradient-angle-slider"
                  className="mb-2 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400"
                >
                  <span>Angle</span>
                  <span>{gradientAngle}°</span>
                </label>
                <Slider
                  id="gradient-angle-slider"
                  size="sm"
                  step={15}
                  minValue={0}
                  maxValue={360}
                  value={gradientAngle}
                  onChange={(v) => handleGradientAngleChange(v as number)}
                  className="max-w-full"
                  color="primary"
                  aria-label="Gradient angle"
                />
              </div>
            )}
            <div
              className="h-12 w-full rounded-lg border border-gray-300 dark:border-gray-600"
              style={{
                background:
                  gradientType === "linear"
                    ? `linear-gradient(${gradientAngle}deg, ${gradientColor1}, ${gradientColor2})`
                    : `radial-gradient(circle, ${gradientColor1}, ${gradientColor2})`,
              }}
            />
          </div>
        );

      case "image":
        return (
          <div className="space-y-4">
            {uploadedImage ? (
              <div className="relative">
                <img
                  src={uploadedImage}
                  alt="Background preview"
                  className="h-32 w-full rounded-lg border border-gray-300 object-cover dark:border-gray-600"
                />
                <Button
                  size="sm"
                  color="danger"
                  variant="flat"
                  className="absolute right-2 top-2"
                  onPress={handleRemoveImage}
                  isIconOnly
                  aria-label="Remove background image"
                >
                  <Icon icon="lucide:x" className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Upload background image"
                className="flex h-32 w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 transition-colors hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500"
              >
                <Icon icon="lucide:upload" className="h-8 w-8 text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Upload background image
                </span>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mb-6">
      <label className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
        Background
      </label>
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-4 flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <Button
              key={tab.type}
              size="sm"
              variant={value.type === tab.type ? "solid" : "bordered"}
              color={value.type === tab.type ? "primary" : "default"}
              onPress={() => handleTabChange(tab.type)}
              startContent={<Icon icon={tab.icon} className="h-4 w-4" />}
            >
              {tab.label}
            </Button>
          ))}
        </div>
        {renderTabContent()}
      </div>
    </div>
  );
}
