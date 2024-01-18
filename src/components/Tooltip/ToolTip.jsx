import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./Tooltip.css";
const Tooltip = ({ children, direction}) => {
  const triggerRef = useRef(null);
  const tooltipContainerRef = useRef(document.createElement("div"));
  const [calculatedDirection, setCalculatedDirection] = useState(direction || "top");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseOver = () => {
    if (isDragging) return;
    setActive(true);
  };

  const handleMouseLeave = () => {
    setActive(false);
    setPosition(null);
  };

  const onPointerDown = (event) => {
    event.target.setPointerCapture(event.pointerId);
    setIsDragging(true);
    setActive(false);
  };

  const onPointerUp = (event) => {
    event.target.releasePointerCapture(event.pointerId);
    setIsDragging(false);
  };

  const calculatePosition = (bounds, tooltipBounds) => {
    const positions = {
      top: { x: bounds.x + bounds.width / 2, y: bounds.y - tooltipBounds.height - 5 },
      bottom: { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height + 5 },
      left: { x: bounds.x - tooltipBounds.width - 5, y: bounds.y + bounds.height / 2 },
      right: { x: bounds.x + bounds.width + 5, y: bounds.y + bounds.height / 2 },
    };

    setCalculatedDirection(direction || "top");
    setPosition(positions[direction]);
  };

  useEffect(() => {
    const bounds = triggerRef.current?.getBoundingClientRect();
    const tooltipBounds = tooltipContainerRef.current?.getBoundingClientRect();

    if (bounds && tooltipBounds) {
      calculatePosition(bounds, tooltipBounds);
    }
  }, [active, direction]);

  return (
    <>
      <div
        ref={triggerRef}
        className="tooltipWrapper"  
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      > jbbhjhuhiuiujiuu
        {children}
      </div>
      {active &&
        createPortal(
          <div
            style={{
              position: "absolute",
              top: position && position.y,
              left: position && position.x,
            }}
            className={`tooltipTip ${calculatedDirection}`}  
          >
            jhfghdfbvdfhvb
          </div>,
          tooltipContainerRef.current
        )}
    </>
  );
};

export default Tooltip;

