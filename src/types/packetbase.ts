export default interface ColorData {
    id: string;          // kommt von PocketBase automatisch
    hexCode: string;
    tags: PocketBaseTag[];      // Wenn du sie als Array in PB speicherst
    // oder tags: string; // Wenn du sie als Komma-getrennte Liste speicherst
}

export interface PocketBaseTag {
    id: string;
    tag: string;
}