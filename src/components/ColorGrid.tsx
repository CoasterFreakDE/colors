import React from "react";
import ColorSwatch from "./ColorSwatch";
import ColorData from "@/types/packetbase";

interface ColorGridProps {
  colors?: Array<ColorData>;
  selectedCategory?: string;
  searchQuery?: string;
}

const ColorGrid = ({
  colors = [],
  selectedCategory,
  searchQuery = "",
}: ColorGridProps) => {
  let filteredColors = colors.filter((color) => {
    // First apply category filter
    const matchesCategory =
      !selectedCategory ||
      selectedCategory === "all" ||
      color.tags.map((t) => t.tag).includes(selectedCategory);

    // Then apply search filter if there's a search query
    if (!searchQuery) return matchesCategory;

    const query = searchQuery.toLowerCase();
    return (
      matchesCategory &&
      (color.hexCode.toLowerCase().includes(query) ||
        color.tags.some((tag) => tag.tag.toLowerCase().includes(query)))
    );
  });
  filteredColors = [... new Set(filteredColors)];

  const handleColorCopy = (hexCode: string) => {
    console.log(`Color ${hexCode} copied to clipboard`);
  };

  return (
    <div className="bg-background min-h-[882px] w-full p-6">
      {filteredColors.length === 0 ? (
        <div className="flex justify-center items-center h-[400px] text-muted-foreground">
          No colors found matching your search
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
          {filteredColors.map((color, index) => (
            <ColorSwatch
              key={`${color.id}`}
              hexCode={color.hexCode}
              tags={color.tags}
              onCopy={handleColorCopy}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorGrid;
