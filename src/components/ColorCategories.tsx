import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ColorCategory {
  id: string;
  name: string;
  count?: number;
}

interface ColorCategoriesProps {
  categories?: ColorCategory[];
  selectedCategory?: string;
  onCategorySelect?: (categoryId: string) => void;
}

const ColorCategories = ({
  categories = [
    { id: "all", name: "All Colors", count: 24 },
    { id: "Primary", name: "Primary", count: 6 },
    { id: "Secondary", name: "Secondary", count: 6 },
    { id: "Accent", name: "Accent", count: 4 },
    { id: "Neutral", name: "Neutral", count: 8 },
    { id: "Dark", name: "Dark", count: 12 },
    { id: "Light", name: "Light", count: 4 },
    { id: "Vibrant", name: "Vibrant", count: 8 },
    { id: "Blue", name: "Blue", count: 6 },
    { id: "Pink", name: "Pink", count: 6 },
    { id: "Gray", name: "Gray", count: 8 },
  ],
  selectedCategory = "all",
  onCategorySelect = () => {},
}: ColorCategoriesProps) => {
  return (
    <div className="w-full bg-background border-b">
      <div className="container mx-auto px-4 py-2">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((category) => (
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
              {category.count !== undefined && (
                <span className="ml-2 text-xs rounded-full bg-background/10 px-2 py-0.5">
                  {category.count}
                </span>
              )}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorCategories;
