import React from "react";
import ColorCategories from "./ColorCategories";
import ColorGrid from "./ColorGrid";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ColorPaletteLibraryProps {
  initialCategory?: string;
}

const ColorPaletteLibrary = ({
  initialCategory = "all",
}: ColorPaletteLibraryProps) => {
  const [selectedCategory, setSelectedCategory] =
    React.useState(initialCategory);
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.add(theme);
  }, []);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchQuery(""); // Clear search when changing categories
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Color Palette Library
            </h1>
            <p className="text-muted-foreground">
              Browse and copy color codes from our curated collection of color
              palettes
            </p>
          </div>
          <ModeToggle />
        </header>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by hex code or tags (e.g. Dark, Blue, Primary)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <ColorCategories
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />

        <ColorGrid
          selectedCategory={
            selectedCategory === "all" ? undefined : selectedCategory
          }
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
};

export default ColorPaletteLibrary;
