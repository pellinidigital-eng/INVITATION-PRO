export const invitationFonts = [
  { name: "Editorial serif", family: "Georgia, serif", weight: 400 },
  { name: "Modern grotesk", family: "Arial, sans-serif", weight: 400 },
  { name: "Classic roman", family: '"Times New Roman", serif', weight: 400 },
  { name: "Soft rounded", family: 'ui-rounded, "Trebuchet MS", sans-serif', weight: 400 },
  { name: "Playfair Display", family: '"Playfair Display", Georgia, serif', weight: 500 },
  { name: "Cormorant Garamond", family: '"Cormorant Garamond", Georgia, serif', weight: 400 },
  { name: "DM Sans", family: '"DM Sans", sans-serif', weight: 400 },
  { name: "Nunito", family: '"Nunito", sans-serif', weight: 400 },
  { name: "Quicksand", family: '"Quicksand", sans-serif', weight: 400 },
  { name: "Dancing Script", family: '"Dancing Script", cursive', weight: 400 },
  { name: "Great Vibes", family: '"Great Vibes", cursive', weight: 400 },
  { name: "Cinzel", family: '"Cinzel", Georgia, serif', weight: 400 },
  { name: "Libre Baskerville", family: '"Libre Baskerville", Georgia, serif', weight: 400 },
  { name: "Caveat", family: '"Caveat", cursive', weight: 400 }
] as const;

export function getInvitationFont(name: string) {
  return invitationFonts.find((font) => font.name === name) ?? invitationFonts[0];
}
