import React, { useState } from "react";
import Tooltip from "./Tooltip/ToolTip";

const CreateDiv = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [absolutePosition, setAbsolutePosition] = useState({
    parentbox: { x: 0, y: 0 },
    x: 0,
    y: 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState("top");

  const handleMouseOver = () => {
    const parentRect = document.getElementById("container")?.getBoundingClientRect();
    const dragboxRect = document.getElementById("dragbox")?.getBoundingClientRect();
    setAbsolutePosition({
      parentbox: { x: parentRect?.x || 0, y: parentRect?.y || 0 },
      y: dragboxRect?.y || 0,
      x: dragboxRect?.x || 0,
    });
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  let startPosition = { x: 0, y: 0 };
  const handleMouseDown = (e) => {
    e.preventDefault();

    startPosition = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    setIsDragging(true);

    const parentRect = document.getElementById("container")?.getBoundingClientRect();
    const dragboxRect = document.getElementById("dragbox")?.getBoundingClientRect();
    setAbsolutePosition({
      parentbox: { x: parentRect?.x || 0, y: parentRect?.y || 0 },
      y: dragboxRect?.y || 0,
      x: dragboxRect?.x || 0,
    });

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const newX = e.clientX - (startPosition.x === 0 ? e.clientX : startPosition.x);
    const newY = e.clientY - (startPosition.y === 0 ? e.clientY : startPosition.y);

    const parentRect = document.getElementById("container")?.getBoundingClientRect();

    const dragboxRect = document.getElementById("dragbox")?.getBoundingClientRect();

    const maxX = parentRect?.width && parentRect.width - 100;
    const maxY = parentRect?.height && parentRect.height - 100;

    const boundedX = Math.min(Math.max(newX, 0), maxX ? maxX : 0);
    const boundedY = Math.min(Math.max(newY, 0), maxY ? maxY : 0);

    setPosition({ x: boundedX, y: boundedY });
    setAbsolutePosition({
      parentbox: { x: parentRect?.x || 0, y: parentRect?.y || 0 },
      y: dragboxRect?.y || 0,
      x: dragboxRect?.x || 0,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const tooltipContent = "Hey There!";

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
   

      <div
        id="container"
        style={{
          width: "600px",
          height: "600px",
          position: "relative",
          border: "1px solid black",  
          borderRadius: "10px",  
          backgroundColor: "pink",
          boxShadow: "0 0 5px rgba(0, 0, 0, 0.5)",  
         
        }}
      >
      <div
  id="dragbox"
  style={{
    width: "100px",
    height: "100px",
    backgroundColor: "purple",
    position: "absolute",
    top: `${position.y}px`,
    left: `${position.x}px`,
    cursor: "move",
    border: "2px solid #fff",  
    borderRadius: "10px",  
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.5)",  
    color: "#fff",  
    textAlign: "center",  
    lineHeight: "100px",  
  }}
          onMouseDown={handleMouseDown}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
         >Drag ME!!!!</div>
        {!isDragging && isHovered && (
          <Tooltip
            position={absolutePosition}
            direction={direction}
            content={tooltipContent}
          />
        )}
      </div>
    </div>
  );
};

export default CreateDiv;
