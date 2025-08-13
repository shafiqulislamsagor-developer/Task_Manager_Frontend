import React from "react";

export default function layout({
  sidebar,
  children,
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      {sidebar}
      {children}
    </div>
  );
}
