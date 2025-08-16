import Navbar from "@/components/shared/Navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

export default function layout({
  sidebar,
  children,
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex relative items-center h-screen">
      {sidebar}
      <div className="h-full flex flex-col justify-between w-[calc(100%-14rem)]  py-2">
        <Navbar />
        <ScrollArea className="w-full px-3 border-t border-primary h-[calc(100%-59.1px)]">
          {children}
        </ScrollArea>
      </div>
    </div>
  );
}
