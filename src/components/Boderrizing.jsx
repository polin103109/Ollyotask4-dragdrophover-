import React, { useState } from 'react';
import '../styles/CreateDiv.css';
const ResizableBox = () => {
  const [isResizing, setIsResizing] = useState(false);

  const mousedown = (e) => {
    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    let prevX = e.clientX;
    let prevY = e.clientY;

    function mousemove(e) {
      if (!isResizing) {
        let newX = prevX - e.clientX;
        let newY = prevY - e.clientY;

        const rect = elRef.current.getBoundingClientRect();

        setStyle({
          left: rect.left - newX + "px",
          top: rect.top - newY + "px"
        });

        prevX = e.clientX;
        prevY = e.clientY;
      }
    }

    function mouseup() {
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
      setIsResizing(false);
    }
  };

  const elRef = React.createRef();
  const [style, setStyle] = useState({});

  const resizers = ["se", "sw", "ne", "nw"];

  const resizerMouseDown = (e, direction) => {
    setIsResizing(true);

    let prevX = e.clientX;
    let prevY = e.clientY;

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e) {
      const rect = elRef.current.getBoundingClientRect();

      if (direction === "se") {
        setStyle({
          width: rect.width - (prevX - e.clientX) + "px",
          height: rect.height - (prevY - e.clientY) + "px"
        });
      } else if (direction === "sw") {
        setStyle({
          width: rect.width + (prevX - e.clientX) + "px",
          height: rect.height - (prevY - e.clientY) + "px",
          left: rect.left - (prevX - e.clientX) + "px"
        });
      } else if (direction === "ne") {
        setStyle({
          width: rect.width - (prevX - e.clientX) + "px",
          height: rect.height + (prevY - e.clientY) + "px",
          top: rect.top - (prevY - e.clientY) + "px"
        });
      } else {
        setStyle({
          width: rect.width + (prevX - e.clientX) + "px",
          height: rect.height + (prevY - e.clientY) + "px",
          top: rect.top - (prevY - e.clientY) + "px",
          left: rect.left - (prevX - e.clientX) + "px"
        });
      }

      prevX = e.clientX;
      prevY = e.clientY;
    }

    function mouseup() {
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
      setIsResizing(false);
    }
  };

  return (
    <div
      ref={elRef}
      className="resizable-box"
      style={style}
      onMouseDown={mousedown}
    >
      {resizers.map((direction) => (
        <div
          key={direction}
          className={`resizer ${direction}`}
          onMouseDown={(e) => resizerMouseDown(e, direction)}
        />
      ))}
    </div>
  );
};

export default ResizableBox;
