import { ReactNode } from "react";

import SideMenu from "@/components/SideMenu";
import Header from "@/components/Header";

import "./globals.css";

export const metadata = {
  title: "Dadenbu",
  description: "Dadenbu is good.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SideMenu>
          <div className="flex flex-col w-full">
            <Header />
            {children}
          </div>
        </SideMenu>
      </body>
    </html>
  );
}
