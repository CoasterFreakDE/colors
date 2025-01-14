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
  colors = [
    { hexCode: "#6366F1", tags: ["Primary", "Blue", "Vibrant"] },
    { hexCode: "#4F46E5", tags: ["Primary", "Blue", "Dark"] },
    { hexCode: "#4338CA", tags: ["Primary", "Blue", "Dark"] },
    { hexCode: "#3730A3", tags: ["Primary", "Blue", "Dark"] },
    { hexCode: "#312E81", tags: ["Primary", "Blue", "Dark"] },
    { hexCode: "#1E1B4B", tags: ["Primary", "Blue", "Dark"] },
    { hexCode: "#EC4899", tags: ["Secondary", "Pink", "Vibrant"] },
    { hexCode: "#DB2777", tags: ["Secondary", "Pink", "Vibrant"] },
    { hexCode: "#BE185D", tags: ["Secondary", "Pink", "Dark"] },
    { hexCode: "#9D174D", tags: ["Secondary", "Pink", "Dark"] },
    { hexCode: "#831843", tags: ["Secondary", "Pink", "Dark"] },
    { hexCode: "#500724", tags: ["Secondary", "Pink", "Dark"] },
    { hexCode: "#10B981", tags: ["Accent", "Green", "Vibrant"] },
    { hexCode: "#F59E0B", tags: ["Accent", "Yellow", "Vibrant"] },
    { hexCode: "#EF4444", tags: ["Accent", "Red", "Vibrant"] },
    { hexCode: "#8B5CF6", tags: ["Accent", "Purple", "Vibrant"] },
    { hexCode: "#111827", tags: ["Neutral", "Gray", "Dark"] },
    { hexCode: "#374151", tags: ["Neutral", "Gray", "Dark"] },
    { hexCode: "#6B7280", tags: ["Neutral", "Gray", "Medium"] },
    { hexCode: "#9CA3AF", tags: ["Neutral", "Gray", "Medium"] },
    { hexCode: "#D1D5DB", tags: ["Neutral", "Gray", "Light"] },
    { hexCode: "#E5E7EB", tags: ["Neutral", "Gray", "Light"] },
    { hexCode: "#F3F4F6", tags: ["Neutral", "Gray", "Light"] },
    { hexCode: "#F9FAFB", tags: ["Neutral", "Gray", "Light"] },
  ],
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
