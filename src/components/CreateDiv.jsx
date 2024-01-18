import React, { useState } from "react";
import "../styles/CreateDiv.css";
import Tooltip from "./Tooltip/ToolTip";

function CreateDiv() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const [isDragging, setIsDragging] = useState(false);
  const tooltipDivSize = {
    width: 0,
    height: 0,
  };
  const startPosition = { x: 0, y: 0 };

  const handleMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    tooltipDivSize.width = e.currentTarget.getBoundingClientRect().width;
    tooltipDivSize.height = e.currentTarget.getBoundingClientRect().height;

    setIsDragging(true);

    startPosition.x = e.clientX - position.x;
    startPosition.y = e.clientY - position.y;

    document.body.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const newX = e.clientX - startPosition.x;
    const newY = e.clientY - startPosition.y;

    const parentRect = document.getElementById("dragging-div")?.getBoundingClientRect();
    const maxX = parentRect && parentRect.width - tooltipDivSize.width - 4;
    const maxY = parentRect && parentRect.height - tooltipDivSize.height - 4;

    const boundedX = Math.min(Math.max(newX, 0), maxX ? maxX : 0);
    const boundedY = Math.min(Math.max(newY, 0), maxY ? maxY : 0);

    setPosition({ x: boundedX, y: boundedY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.removeEventListener("mousemove", handleMouseMove);
    document.body.removeEventListener("mouseup", handleMouseUp);
  };

  

  return (
    <div className="main-div">
      <div className={`dragging-div ${isDragging ? "dragging" : ""}`} id="dragging-div">
        <div
          className={`drag-div ${isDragging ? "dragging" : ""}`}
          style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
          onMouseDown={handleMouseDown}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Hellllooooo
        </div>
        {isHovered && <Tooltip />}
      </div>
    </div>
  );
}

export default CreateDiv;
