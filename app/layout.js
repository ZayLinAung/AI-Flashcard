import { Montserrat } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { TooltipProvider } from "@/components/ui/tooltip";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "CramIt",
  description: "A flashcard AI App",
};

export default function RootLayout({ children }) {

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={montserrat.className}>
          <TooltipProvider>
            {children}
          </TooltipProvider>

        </body>
      </html>
    </ClerkProvider>
  );

}
