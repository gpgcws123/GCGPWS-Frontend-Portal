import React from "react";

export default function HeadingTitle({ title, width = "100%", height = "10px", className = "" }) {
    return (
        <div className={`text-center ${className}`}>
            <h2
                className="text-[40px] font-medium font-poppins text-black mx-auto"
                style={{ width: "max-content", padding: "0 10px" }}
            >
                {title}
            </h2>
            <div
                className="bg-black mx-auto rounded-full mt-[6px]"
                style={{ width, height }}
            ></div>
        </div>
    );
}
