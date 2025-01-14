import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ColorData from "@/types/packetbase";

interface ColorCategory {
  id: string;
  name: string;
  count?: number;
}

interface ColorCategoriesProps {
  selectedCategory?: string;
  onCategorySelect?: (categoryId: string) => void;
  colors?: ColorData[];
}

const ColorCategories = ({
  selectedCategory = "all",
  onCategorySelect = () => {},
  colors = [],
}: ColorCategoriesProps) => {
  // 1. Alle vorhandenen Tags dynamisch sammeln
  const tagSet = React.useMemo(() => {
    const set = new Set<string>();
    for (const color of colors) {
      // Falls color.tags = [{tag: "Chat"}, {tag: "Info"} ...]
      // dann alle 'tag'-Strings ins Set
      color.tags.forEach((t) => {
        set.add(t.tag);
      });
    }
    return set;
  }, [colors]);

  // 2. Aus dem Set ein Array von Kategorien bauen + "All Colors"
  const baseCategories: ColorCategory[] = [
    { id: "all", name: "All Colors" },
    ...Array.from(tagSet).map((tag) => ({ id: tag, name: tag })),
  ];

  // 3. Count-Funktion definieren
  const getCategoryCount = (categoryId: string) => {
    if (categoryId === "all") return colors.length;
    return colors.filter((color) =>
      color.tags.some((t) => t.tag === categoryId)
    ).length;
  };

  // 4. Count pro Kategorie berechnen
  const categoriesWithCounts = baseCategories.map((category) => ({
    ...category,
    count: getCategoryCount(category.id),
  }));

  // 5. "All" finden und weitere Top-Kategorien ermitteln
  const allCategory = categoriesWithCounts.find((c) => c.id === "all");
  const topCategories = categoriesWithCounts
    .filter((c) => c.id !== "all" && c.count && c.count > 0)
    .sort((a, b) => (b.count ?? 0) - (a.count ?? 0))
    .slice(0, 5); // Nur Top 5 anzeigen?

  // 6. Zusammensetzen
  const displayCategories = allCategory
    ? [allCategory, ...topCategories]
    : topCategories;

  function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
  }

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
                  : "hover:bg-muted"
              )}
              onClick={() => onCategorySelect(category.id)}
            >
              {toTitleCase(category.name)}
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
