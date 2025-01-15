import React from "react";
import ColorCategories from "./ColorCategories";
import ColorGrid from "./ColorGrid";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import pb from "@/lib/pocketbase";
import { RecordModel } from "pocketbase";
import ColorData, { PocketBaseTag } from "@/types/packetbase";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  const [projects, setProjects] = React.useState<
    { name: string; raw: string }[]
  >([]);
  const [project, setProject] = React.useState<string>("all");

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

    async function fetchProjects() {
      const records = await pb.collection("color_tags").getFullList({
        sort: "-created",
      });

      const filtered = records.filter((tag) => tag.tag.startsWith("project:"));

      const projects = filtered.map((tag) => ({
        name: tag.tag.replace("project:", ""),
        raw: tag.tag,
      }));

      setProjects(projects);
    }

    fetchColors();
    fetchProjects();
  }, []);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchQuery(""); // Clear search when changing categories
  };

  const handleProjectSelect = (projectId: string) => {
    setProject(projectId);
    setSearchQuery(""); // Clear search when changing projects
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
          <Select value={project} onValueChange={handleProjectSelect}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a project" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Projects</SelectLabel>
                {projects.map((project) => (
                  <SelectItem key={project.raw} value={project.raw}>
                    {project.name}
                  </SelectItem>
                ))}
                <SelectItem value="all">All Projects</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
          selectedProject={project === "all" ? undefined : project}
          searchQuery={searchQuery}
          colors={colors}
        />
      </div>
    </div>
  );
};

export default ColorPaletteLibrary;
