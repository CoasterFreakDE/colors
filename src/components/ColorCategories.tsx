import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ColorCategory {
  id: string;
  name: string;
}

interface ColorCategoriesProps {
  categories?: ColorCategory[];
  selectedCategory?: string;
  onCategorySelect?: (categoryId: string) => void;
  colors?: Array<{ hexCode: string; tags: string[] }>;
}

const DEFAULT_CATEGORIES = [
  { id: "all", name: "All Colors" },
  // Main Categories
  { id: "Chat", name: "Chat" },
  { id: "GUI", name: "GUI" },
  // Chat Types
  { id: "Info", name: "Info" },
  { id: "Warning", name: "Warning" },
  { id: "Error", name: "Error" },
  { id: "Success", name: "Success" },
  { id: "Locked", name: "Locked" },
  // GUI Elements
  { id: "Button", name: "Button" },
  { id: "Inventory", name: "Inventory" },
  { id: "Selection", name: "Selection" },
  { id: "Special", name: "Special" },
  // States
  { id: "Background", name: "Background" },
  { id: "Primary", name: "Primary" },
  { id: "Secondary", name: "Secondary" },
  { id: "Dark", name: "Dark" },
  { id: "Light", name: "Light" },
];

const ColorCategories = ({
  categories = DEFAULT_CATEGORIES,
  selectedCategory = "all",
  onCategorySelect = () => {},
  colors = [],
}: ColorCategoriesProps) => {
  // Calculate counts for each category
  const getCategoryCount = (categoryId: string) => {
    if (categoryId === "all") return colors.length;
    return colors.filter((color) => color.tags.includes(categoryId)).length;
  };

  const categoriesWithCounts = categories.map((category) => ({
    ...category,
    count: getCategoryCount(category.id),
  }));

  // Get the "all" category and top 5 categories by count
  const allCategory = categoriesWithCounts.find((c) => c.id === "all");
  const topCategories = categoriesWithCounts
    .filter((c) => c.id !== "all" && c.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Combine "all" with top categories
  const displayCategories = allCategory
    ? [allCategory, ...topCategories]
    : topCategories;

  return (
    <div className="w-full bg-background border-b">
      <div className="container mx-auto px-4 py-2">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {displayCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={cn(
                "whitespace-nowrap",
                selectedCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted",
              )}
              onClick={() => onCategorySelect(category.id)}
            >
              {category.name}
              <span className="ml-2 text-xs rounded-full bg-background/10 px-2 py-0.5">
                {category.count}
              </span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorCategories;
