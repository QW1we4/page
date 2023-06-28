"use client";

import { ReactNode, createContext, useState } from "react";

import SideMenu from "@/components/SideMenu";
import Header from "@/components/Header";

import "./globals.css";

export const AppContext = createContext<any>(null);

export default function RootLayout({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<string>("");

  return (
    <html lang="en">
      <body>
        <AppContext.Provider value={{ account, setAccount }}>
          <SideMenu>
            <div className="flex flex-col w-full">
              <Header />
              {children}
            </div>
          </SideMenu>
        </AppContext.Provider>
      </body>
    </html>
  );
}
