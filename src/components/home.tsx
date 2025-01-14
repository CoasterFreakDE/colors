import React from "react";
import ColorCategories from "./ColorCategories";
import ColorGrid from "./ColorGrid";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import pb from "@/lib/pocketbase";
import { RecordModel } from "pocketbase";
import ColorData, { PocketBaseTag } from "@/types/packetbase";

interface ColorPaletteLibraryProps {
  initialCategory?: string;
}

function mapRecordModelToColorData(rm: RecordModel): ColorData {
  return {
    id: rm.id,
    hexCode: rm.hexCode,
    tags: rm.expand.tags as PocketBaseTag[],       
  };
}

const ColorPaletteLibrary = ({
  initialCategory = "all",
}: ColorPaletteLibraryProps) => {
  const [colors, setColors] = React.useState<ColorData[]>([]);

  const [selectedCategory, setSelectedCategory] =
    React.useState(initialCategory);
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    const theme = localStorage.getItem("theme") || "dark";
    document.documentElement.classList.add(theme);
  }, []);

  React.useEffect(() => {
    async function fetchColors() {
      try {
        const records = await pb.collection("colors").getFullList<RecordModel>({
          sort: "-created",
          expand: "tags",
        });

        const colors = records.map(mapRecordModelToColorData);

        setColors(colors);
      } catch (err) {
        console.error("Error loading colors:", err);
      }
    }

    fetchColors();

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
              Minecraft Color Palette
            </h1>
            <p className="text-muted-foreground">
              Browse and copy color codes for Minecraft server chat messages and
              GUI elements
            </p>
          </div>
          <ModeToggle />
        </header>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by hex code or tags (e.g. Chat, GUI, Info, Warning)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <ColorCategories
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          colors={colors}
        />

        <ColorGrid
          selectedCategory={
            selectedCategory === "all" ? undefined : selectedCategory
          }
          searchQuery={searchQuery}
          colors={colors}
        />
      </div>
    </div>
  );
};

export default ColorPaletteLibrary;
