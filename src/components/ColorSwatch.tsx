import React from "react";
import { Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PocketBaseTag } from "@/types/packetbase";

interface ColorSwatchProps {
  hexCode?: string;
  tags?: PocketBaseTag[];
  onCopy?: (hexCode: string) => void;
}

const ColorSwatch = ({
  hexCode = "#6366F1",
  tags = [],
  onCopy = () => {},
}: ColorSwatchProps) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(hexCode);
    setCopied(true);
    onCopy(hexCode);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculate contrast for text color
  const getContrastColor = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "#000000" : "#FFFFFF";
  };

  let distinctTags = [... new Set(tags)];

  const textColor = getContrastColor(hexCode);

  function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
  }

  return (
    <TooltipProvider>
      <div className="bg-background w-[250px] h-[250px] rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
        <Button
          variant="ghost"
          className="w-full h-full p-0 hover:bg-transparent relative group"
          onClick={handleCopy}
        >
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ backgroundColor: hexCode }}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center gap-2">
                  <span
                    className={cn(
                      "text-lg font-medium transition-opacity",
                      copied
                        ? "opacity-0"
                        : "opacity-100 group-hover:opacity-100",
                    )}
                    style={{ color: textColor }}
                  >
                    {hexCode}
                  </span>
                  <div className="flex flex-wrap gap-1 justify-center px-4 max-w-[200px]">
                    {distinctTags.map((tag) => (
                      <Badge
                        key={`${hexCode}-${tag.id}`}
                        variant="secondary"
                        className={cn(
                          "text-xs transition-opacity",
                          copied
                            ? "opacity-0"
                            : "opacity-70 group-hover:opacity-100",
                        )}
                        style={{
                          backgroundColor: `${textColor}20`,
                          color: textColor,
                        }}
                      >
                        {toTitleCase(tag.tag)}
                      </Badge>
                    ))}
                  </div>
                  <Copy
                    className={cn(
                      "w-6 h-6 transition-opacity mt-2",
                      copied
                        ? "opacity-0"
                        : "opacity-0 group-hover:opacity-100",
                    )}
                    style={{ color: textColor }}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to copy</p>
              </TooltipContent>
            </Tooltip>
            <span
              className={cn(
                "absolute text-lg font-medium transition-opacity",
                copied ? "opacity-100" : "opacity-0",
              )}
              style={{ color: textColor }}
            >
              Copied!
            </span>
          </div>
        </Button>
      </div>
    </TooltipProvider>
  );
};

export default ColorSwatch;
