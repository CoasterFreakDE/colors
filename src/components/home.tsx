import React from "react";
import ColorCategories from "./ColorCategories";
import ColorGrid from "./ColorGrid";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ColorPaletteLibraryProps {
  initialCategory?: string;
}

const COLORS = [
  // Chat Colors
  { hexCode: "#E8F5E9", tags: ["Chat", "Info", "Light", "Background"] },
  { hexCode: "#2196F3", tags: ["Chat", "Info", "Primary"] },
  { hexCode: "#1976D2", tags: ["Chat", "Info", "Dark"] },

  { hexCode: "#FFF3E0", tags: ["Chat", "Warning", "Light", "Background"] },
  { hexCode: "#FF9800", tags: ["Chat", "Warning", "Primary"] },
  { hexCode: "#F57C00", tags: ["Chat", "Warning", "Dark"] },

  { hexCode: "#FFEBEE", tags: ["Chat", "Error", "Light", "Background"] },
  { hexCode: "#F44336", tags: ["Chat", "Error", "Primary"] },
  { hexCode: "#D32F2F", tags: ["Chat", "Error", "Dark"] },

  { hexCode: "#E8F5E9", tags: ["Chat", "Success", "Light", "Background"] },
  { hexCode: "#4CAF50", tags: ["Chat", "Success", "Primary"] },
  { hexCode: "#388E3C", tags: ["Chat", "Success", "Dark"] },

  { hexCode: "#EFEBE9", tags: ["Chat", "Locked", "Light", "Background"] },
  { hexCode: "#795548", tags: ["Chat", "Locked", "Primary"] },
  { hexCode: "#5D4037", tags: ["Chat", "Locked", "Dark"] },

  // Info
  { hexCode: "#84ACCE", tags: ["Chat", "Info", "Light"] },   // LIGHT_BLUE
  { hexCode: "#006494", tags: ["Chat", "Info", "Primary"] }, // BLUE
  { hexCode: "#665687", tags: ["Chat", "Info", "Dark"] },    // PURPLE

  // Warning
  { hexCode: "#F9DC5C", tags: ["Chat", "Warning", "Light"] },  // YELLOW
  { hexCode: "#FA824C", tags: ["Chat", "Warning", "Primary"] },// ORANGE
  { hexCode: "#B084CC", tags: ["Chat", "Warning", "Dark"] },   // VIOLET

  // Error
  { hexCode: "#CB8589", tags: ["Chat", "Error", "Light"] },  // ROSE
  { hexCode: "#ED254E", tags: ["Chat", "Error", "Primary"] },// RED
  { hexCode: "#6F2DBD", tags: ["Chat", "Error", "Dark"] },   // GRAPE

  // Success
  { hexCode: "#ACFCD9", tags: ["Chat", "Success", "Light"] }, // TURQUOISE
  { hexCode: "#9FD356", tags: ["Chat", "Success", "Primary"] },// GREEN
  { hexCode: "#466365", tags: ["Chat", "Success", "Dark"] },   // DARK_GREEN

  // Locked
  { hexCode: "#EFD6AC", tags: ["Chat", "Locked", "Light"] },   // SKIN_COLOR
  { hexCode: "#342E37", tags: ["Chat", "Locked", "Primary"] }, // BLACK_ACCENT
  { hexCode: "#04151F", tags: ["Chat", "Locked", "Dark"] },    // BLACK


  // -------------------------
  // GUI / Special Elements
  // -------------------------
  { hexCode: "#D8E1FF", tags: ["GUI", "Special", "White"] },   // WHITE
  { hexCode: "#DDE8B9", tags: ["GUI", "Special", "Lime"] },    // LIME
  { hexCode: "#D7D9B1", tags: ["GUI", "Special", "Vanilla"] }, // VANILLA
  { hexCode: "#B298DC", tags: ["GUI", "Special", "Wisteria"] },// WISTERIA

  // GUI Colors
  { hexCode: "#1E1E1E", tags: ["GUI", "Background", "Dark", "Primary"] },
  { hexCode: "#2D2D2D", tags: ["GUI", "Background", "Dark", "Secondary"] },
  { hexCode: "#424242", tags: ["GUI", "Border", "Dark"] },

  // Button States
  { hexCode: "#616161", tags: ["GUI", "Button", "Default"] },
  { hexCode: "#757575", tags: ["GUI", "Button", "Hover"] },
  { hexCode: "#4A4A4A", tags: ["GUI", "Button", "Pressed"] },
  { hexCode: "#9E9E9E", tags: ["GUI", "Button", "Disabled"] },

  // Selection & Highlight
  { hexCode: "#64B5F6", tags: ["GUI", "Selection", "Primary"] },
  { hexCode: "#2196F3", tags: ["GUI", "Selection", "Secondary"] },

  // Inventory Slots
  { hexCode: "#373737", tags: ["GUI", "Inventory", "Slot", "Default"] },
  { hexCode: "#4A4A4A", tags: ["GUI", "Inventory", "Slot", "Hover"] },
  { hexCode: "#1E1E1E", tags: ["GUI", "Inventory", "Slot", "Selected"] },

  { hexCode: "#778d9f", tags: ["GUI", "Item", "Title", "Name"] },
  { hexCode: "#94afc6", tags: ["GUI", "Item", "Lore", "Description"] },
  

  // Special Elements
  { hexCode: "#FFD700", tags: ["GUI", "Special", "Gold"] },
  { hexCode: "#B9F2FF", tags: ["GUI", "Special", "Diamond"] },
  { hexCode: "#A0522D", tags: ["GUI", "Special", "Bronze"] },
];

const ColorPaletteLibrary = ({
  initialCategory = "all",
}: ColorPaletteLibraryProps) => {
  const [selectedCategory, setSelectedCategory] =
    React.useState(initialCategory);
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    const theme = localStorage.getItem("theme") || "dark";
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
          colors={COLORS}
        />

        <ColorGrid
          selectedCategory={
            selectedCategory === "all" ? undefined : selectedCategory
          }
          searchQuery={searchQuery}
          colors={COLORS}
        />
      </div>
    </div>
  );
};

export default ColorPaletteLibrary;
