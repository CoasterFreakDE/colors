import React from "react";
import ColorSwatch from "./ColorSwatch";

interface ColorGridProps {
  colors?: Array<{
    hexCode: string;
    tags: string[];
  }>;
  selectedCategory?: string;
  searchQuery?: string;
}

const ColorGrid = ({
  colors = [{ hexCode: "#6366F1", tags: ["Primary", "Blue", "Vibrant"] }],
  selectedCategory,
  searchQuery = "",
}: ColorGridProps) => {
  const filteredColors = colors.filter((color) => {
    // First apply category filter
    const matchesCategory =
      !selectedCategory ||
      selectedCategory === "all" ||
      color.tags.includes(selectedCategory);

    // Then apply search filter if there's a search query
    if (!searchQuery) return matchesCategory;

    const query = searchQuery.toLowerCase();
    return (
      matchesCategory &&
      (color.hexCode.toLowerCase().includes(query) ||
        color.tags.some((tag) => tag.toLowerCase().includes(query)))
    );
  });

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
              key={`${color.hexCode}-${index}`}
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
