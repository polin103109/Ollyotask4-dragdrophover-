import { useState,useRef, useEffect} from "react";
import Tooltip from "./Tooltip/ToolTip";
import { Camera } from 'lucide-react';  

const CreateDiv = () => {
  const refContainer = useRef(null);
  const refTop = useRef(null);
  const refRight = useRef(null);
  const refBottom = useRef(null);
  const refLeft = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [absolutePosition, setAbsolutePosition] = useState({
    parentbox: { x: 0, y: 0 },
    x: 0,
    y: 0,
  });
  const [containerPosition, setContainerPosition] = useState({
    x: 610,
    y: 150,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState("top");
  useEffect(() => {
    const resizeableElement = refContainer.current;
    console.log(resizeableElement)
    const styles = window.getComputedStyle(resizeableElement);
    let width = parseInt(styles.width, 10);
    let height = parseInt(styles.height, 10);
    
    let xCord = 0;
    let yCord = 0;
  
    resizeableElement.style.top = "150px";
    resizeableElement.style.left = "150px";
  
    //top
    const onMouseMoveTopResize = (event) => {
      const dy = event.clientY - yCord;
      height = height - dy;
      yCord = event.clientY;
      resizeableElement.style.height = `${height}px`;
      resizeableElement.style.top = `${parseInt(resizeableElement.style.top, 10) + dy}px`;
    };
  
    const onMouseUpTopResize = () => {
      document.removeEventListener("mousemove", onMouseMoveTopResize);
   
    };
  
    const onMouseDownTopResize = (event) => {
      yCord = event.clientY;
      const styles = window.getComputedStyle(resizeableElement);
      resizeableElement.style.bottom = styles.bottom;
      resizeableElement.style.top = null
      document.addEventListener("mousemove", onMouseMoveTopResize);
      document.addEventListener("mouseup", onMouseUpTopResize);
    };
  //Right
  const onMouseMoveRightResize = (event) => {
    const dx = event.clientX - xCord;
    xCord = event.clientX;
    width = width + dx;
    resizeableElement.style.width = `${width}px`;
  };

  const onMouseUpRightResize = () => {
    document.removeEventListener("mousemove", onMouseMoveRightResize);

  };

  const onMouseDownRightResize = (event) => {
    xCord = event.clientX;
    resizeableElement.style.left = styles.left;
    resizeableElement.style.right = null
    document.addEventListener("mousemove", onMouseMoveRightResize);
    document.addEventListener("mouseup", onMouseUpRightResize);
  }
  //bottom
  const onMouseMoveBottomResize = (event) => {
    const dy = event.clientY - yCord;
    height = height + dy;
    yCord = event.clientY;
    resizeableElement.style.height = `${height}px`;
  };

  const onMouseUpBottomResize = () => {
    document.removeEventListener("mousemove", onMouseMoveBottomResize);
  
  };

  const onMouseDownBottomResize = (event) => {
    yCord = event.clientY;
    const styles = window.getComputedStyle(resizeableElement);
    resizeableElement.style.top = styles.top;
    resizeableElement.style.bottom = null
    document.addEventListener("mousemove", onMouseMoveBottomResize);
    document.addEventListener("mouseup", onMouseUpBottomResize);
  };
  //left
  const onMouseMoveLeftResize = (event) => {
    const dx = event.clientX - xCord;
    xCord = event.clientX;
    width = width - dx;
    resizeableElement.style.width = `${width}px`;
  };

  const onMouseUpLeftResize = () => {
    document.removeEventListener("mousemove", onMouseMoveLeftResize);
  //  document.removeEventListener("mouseup", onMouseUpTopResize);
  };

  const onMouseDownLeftResize = (event) => {
    xCord = event.clientX;
    resizeableElement.style.right = styles.right;
    resizeableElement.style.left = null
    document.addEventListener("mousemove", onMouseMoveLeftResize);
    document.addEventListener("mouseup", onMouseUpLeftResize);
  }
  //mousedown event listener
  const resizerRight = refRight.current;
  resizerRight.addEventListener("mousedown",onMouseDownRightResize);
  const resizerLeft = refLeft.current;
  resizerLeft.addEventListener("mousedown",onMouseDownLeftResize);
  const resizerTop = refTop.current;
  resizerTop.addEventListener("mousedown",onMouseDownTopResize);
  const resizerBottom = refBottom.current;
  resizerBottom.addEventListener("mousedown",onMouseDownBottomResize);

    return () => {
      resizerRight.removeEventListener("mousedown",onMouseDownRightResize)
      resizerLeft.removeEventListener("mousedown",onMouseDownLeftResize)
      resizerTop.removeEventListener("mousedown",onMouseDownTopResize)
      resizerBottom.removeEventListener("mousedown",onMouseDownBottomResize)
    };
  }, []);

  const handleMouseOver = () => {
    const parentRect = document
      .getElementById("container")
      ?.getBoundingClientRect();
    const dragboxRect = document
      .getElementById("dragbox")
      ?.getBoundingClientRect();
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

    const parentRect = document
      .getElementById("container")
      ?.getBoundingClientRect();
    const dragboxRect = document
      .getElementById("dragbox")
      ?.getBoundingClientRect();
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

    const parentRect = document
      .getElementById("container")
      ?.getBoundingClientRect();

    const dragboxRect = document
      .getElementById("dragbox")
      ?.getBoundingClientRect();

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

  const tooltipContent = "Heyy I am poppingg";

  let startContainerPosition = { x: 610, y: 150 };
  const handleContainerMouseDown = (e) => {
    startContainerPosition = {
      x: e.clientX - containerPosition.x,
      y: e.clientY - containerPosition.y,
    };

    document.addEventListener("mousemove", handleContainerMouseMove);
    document.addEventListener("mouseup", handleContainerMouseUp);
  };

  const handleContainerMouseMove = (e) => {
    const newX = e.clientX - (startContainerPosition.x === 0 ? e.clientX : startContainerPosition.x);
    const newY = e.clientY - (startContainerPosition.y === 0 ? e.clientY : startContainerPosition.y);

    const parentRect = document
      .getElementById("main-container")
      ?.getBoundingClientRect();

    const maxX = parentRect?.width && parentRect.width - 400;
    const maxY = parentRect?.height && parentRect.height - 400;

    const boundedX = Math.min(Math.max(newX, 0), maxX ? maxX : 0);
    const boundedY = Math.min(Math.max(newY, 0), maxY ? maxY : 0);

    setContainerPosition({ x: boundedX, y: boundedY });
  };

  const handleContainerMouseUp = () => {
    document.removeEventListener("mousemove", handleContainerMouseMove);
    document.removeEventListener("mouseup", handleContainerMouseUp);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div
        style={{
          marginBottom: 70,
          marginTop: 60,
          position: "fixed",
          top: 10,
          left: "45%",
        }}
      >
        <label style={{ marginRight: "10px",height:"20px",fontSize:"20px"}}>Direction: </label>
        <select style={{height:"30px",fontSize:"20px"}}
          value={direction}
          onChange={(e) => {
            setDirection(e.target.value);
          }}
        >
          <option value={""} disabled>
            Direction
          </option>
          <option value={"top"}>Top</option>
          <option value={"left"}>Left</option>
          <option value={"right"}>Right</option>
          <option value={"bottom"}>Bottom</option>
        </select>
      </div>
      <div
        id="main-container"
        style={{
          alignItems: "center",
          height: "99.5vh",
        }}
      >
    
<div
  ref={refContainer}
  id="container"
  className="container"
  style={{
    width: "500px",
    height: "500px",
    position: "absolute",
    backgroundColor: "pink",
    top: `${containerPosition.y}px`,
    left: `${containerPosition.x}px`,
    border: "1px solid #ccc",
    minWidth: "150px",  
    minHeight: "150px", 
  }}
>
            <div ref={refLeft} className="resize-rl"
            style={{
                cursor:"col-resize",
                height:"100%",
                left:0,
                top:0,
                width:"10px",
                position: "absolute",
              }}></div>
            <div ref={refTop} className="resize-rt"
             style={{
                cursor:"row-resize",
                height:"5px",
                left:0,
                top:0,
                width:"100%",
                position: "absolute",
              }}></div>
            <div ref={refRight} className="resize-rr"
            style={{
                cursor:"col-resize",
                height:"100%",
                right:0,
                top:0,
                width:"5px",
                position: "absolute",
              }}
            ></div>
            <div ref={refBottom} className="resize-rb"
            style={{
                cursor:"row-resize",
                height:"5px",
                left:0,
                bottom:0,
                width:"100%",
                position: "absolute",
              }}></div>
          <div
            style={{
              position: "relative",
              top: 0,
              left: "calc(100% - 31px)",
              width: 30,
              height: 30,
              border: "1px solid black",
              textAlign: "center",
              cursor: "grab",
            }}
            onMouseDown={handleContainerMouseDown}
          >
             <Camera size="32" color="black" />
            
          </div>
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
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              color:"#fff",
            }}
            onMouseDown={handleMouseDown}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          > Drag me!</div>
          {!isDragging && isHovered && (
            <Tooltip
              position={absolutePosition}
              direction={direction}
              content={tooltipContent}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default CreateDiv