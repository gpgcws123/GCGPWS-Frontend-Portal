import React from "react";

export default function ContentSection({ title, description, children }) {
  return (
    <div className="flex flex-col gap-2">
      {/* Render title if provided */}
      {title && <h1 className="font-bold font-[Plus Jakarta Sans] text-[35px]">{title}</h1>}

      {/* Render children */}
      {children}

      {/* Render description if provided */}
      {description && <p className="text-black  font-[Poppins] font-normal text-[20px]">{description}</p>}
    </div>
  );
}
