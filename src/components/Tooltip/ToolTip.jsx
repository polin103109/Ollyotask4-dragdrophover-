import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Tooltip = ({ position, content, direction }) => {
  const [tooltipStyle, setTooltipStyle] = useState({
    position: "fixed",
    border: "1px solid #ccc",
    padding: "5px",
    backgroundColor: "black",
    margin: "10px",
    zIndex: 1000,
    color:"#fff"
  });

  useEffect(() => {
    setTooltipStyle((prevStyle) => ({
      ...prevStyle,
      top:
        direction === "top"
          ? position.y - (position?.parentbox?.y || 0) <= 50
            ? position.y + 105 + "px"
            : position.y - 40 + "px"
          : position.y + 35 + "px",
      left:
        direction === "left"
          ? position.x - (position?.parentbox?.x || 0) <= 45
            ? position.x + 105 + "px"
            : position.x - 45 + "px"
          : position.x + 35 + "px",
    }));
  }, [position, direction]);

  return ReactDOM.createPortal(<div style={tooltipStyle}>{content}</div>, document.body);
};

export default Tooltip;
