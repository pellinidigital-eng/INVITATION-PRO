import type { Metadata } from "next";
import type React from "react";
import "@fontsource/playfair-display/latin-500.css";
import "@fontsource/cormorant-garamond/latin-400.css";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/nunito/latin-400.css";
import "@fontsource/quicksand/latin-400.css";
import "@fontsource/dancing-script/latin-400.css";
import "@fontsource/great-vibes/latin-400.css";
import "@fontsource/cinzel/latin-400.css";
import "@fontsource/libre-baskerville/latin-400.css";
import "@fontsource/caveat/latin-400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Invitation Creator PRO",
    template: "%s | Invitation Creator PRO"
  },
  description: "Premium digital invitation studio for animated event experiences.",
  applicationName: "Invitation Creator PRO",
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Invitation Creator PRO",
    description: "Create premium animated digital invitations with QR, RSVP and export tools.",
    type: "website",
    locale: "it_IT"
  },
  icons: {
    icon: "/icon.svg"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
