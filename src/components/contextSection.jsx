import React from "react";

export default function ContentSection({ title, description, children }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Render title if provided */}
      {title && <h1 className="font-medium text-[26px]">{title}</h1>}

      {/* Render children */}
      {children}

      {/* Render description if provided */}
      {description && <p className="text-black text-[18px]">{description}</p>}
    </div>
  );
}
