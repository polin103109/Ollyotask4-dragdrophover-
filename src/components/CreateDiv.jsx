import { useState, useRef, useEffect } from "react";
import Tooltip from "./Tooltip/ToolTip";
import "../styles/CreateDiv.css"
import { AiOutlineDrag } from "react-icons/ai";

const CreateDiv = () => {
  const refContainer = useRef(null);
  const refDragbox = useRef(null);
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
// const handleContainerResize= (e, direction, refContainer, refDragbox) => {
//     console.log(refContainer);
//     e.preventDefault();
//     const handleMouseMove = (e) => {
//         const newX = e.clientX - (startPosition.x === 0 ? e.clientX : startPosition.x);
//         const newY = e.clientY - (startPosition.y === 0 ? e.clientY : startPosition.y);
      
//         const parentRect = document.getElementById("container")?.getBoundingClientRect();
//         const dragboxRect = document.getElementById("dragbox")?.getBoundingClientRect();
      
//         const maxX = parentRect?.width && parentRect.width - 100;
//         const maxY = parentRect?.height && parentRect.height - 100;
      
//         const boundedX = Math.min(Math.max(newX, 0), maxX ? maxX : 0);
//         const boundedY = Math.min(Math.max(newY, 0), maxY ? maxY : 0);
      
//         setPosition({ x: boundedX, y: boundedY });
//         setAbsolutePosition({
//           parentbox: { x: parentRect?.x || 0, y: parentRect?.y || 0 },
//           y: dragboxRect?.y || 0,
//           x: dragboxRect?.x || 0,
//         });
      
//         // Resize and move the container
//         if (direction === "left") {
//           const newWidth = parentRect?.right - e.clientX;
//           if (newWidth >= dragboxRect?.width) {
//             refContainer.current.style.width = newWidth + "px";
//             refContainer.current.style.left = `${e.clientX}px`;
//           }
//         } else if (direction === "up") {
//           const newHeight = parentRect?.bottom - e.clientY;
//           if (newHeight >= dragboxRect?.bottom - parentRect?.bottom) {
//             refContainer.current.style.height = newHeight + "px";
//             refContainer.current.style.top = `${e.clientY}px`;
//           } else {
//             const newWidth = parentRect?.right - e.clientX;
//             const newHeight = parentRect?.bottom - e.clientY;
//             if (newWidth >= dragboxRect?.width && newHeight >= dragboxRect?.height) {
//               refContainer.current.style.width = newWidth + "px";
//               refContainer.current.style.height = newHeight + "px";
//               refContainer.current.style.left = `${e.clientX}px`;
//               refContainer.current.style.top = `${e.clientY}px`;
//             }
//           }
//         } else {
//           // Handle other directions if needed
//           const newWidth = e.clientX - refContainer.current.getBoundingClientRect().left;
//           const newHeight = e.clientY - refContainer.current.getBoundingClientRect().top;
      
//           if (direction === "right") {
//             refContainer.current.style.width = newWidth + "px";
//           } else if (direction === "bottom") {
//             refContainer.current.style.height = newHeight + "px";
//           }
//         }
//     };
//     const handleMouseUp = () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseup", handleMouseUp);
//     };
//     document.addEventListener("mousemove", handleMouseMove);
//     document.addEventListener("mouseup", handleMouseUp);
//   };
  useEffect(() => {
    const resizeableElement = refContainer.current;
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
     // console.log(dy)
      height = height - dy;
     // console.log(height)
      yCord = event.clientY;
      resizeableElement.style.height = `${height}px`;
      resizeableElement.style.top = `${ parseInt(resizeableElement.style.top, 10) + dy
      }px`;
      updatePurpleDivPositionTop(event);
      
    };

    const onMouseUpTopResize = () => {
      document.removeEventListener("mousemove", onMouseMoveTopResize);
    };

    const onMouseDownTopResize = (event) => {
      yCord = event.clientY;
      const styles = window.getComputedStyle(resizeableElement);
      resizeableElement.style.bottom = styles.bottom;
      resizeableElement.style.top = null;
      document.addEventListener("mousemove", onMouseMoveTopResize);
      document.addEventListener("mouseup", onMouseUpTopResize);
    };
    //Right
    const onMouseMoveRightResize = (event) => {
      const dx = event.clientX - xCord;
      xCord = event.clientX;
      width = width + dx;
      resizeableElement.style.width = `${width}px`;
      updatePurpleDivPositionRight(event);
      
    };

    const onMouseUpRightResize = () => {
      document.removeEventListener("mousemove", onMouseMoveRightResize);
    };

    const onMouseDownRightResize = (event) => {
      xCord = event.clientX;
      resizeableElement.style.left = styles.left;
      resizeableElement.style.right = null;
      document.addEventListener("mousemove", onMouseMoveRightResize);
      document.addEventListener("mouseup", onMouseUpRightResize);
    };
    //bottom
    const onMouseMoveBottomResize = (event) => {
      const dy = event.clientY - yCord;
      height = height + dy;
      yCord = event.clientY;
      resizeableElement.style.height = `${height}px`;
      updatePurpleDivPositionBottom(event);
    };

    const onMouseUpBottomResize = () => {
      document.removeEventListener("mousemove", onMouseMoveBottomResize);
    };

    const onMouseDownBottomResize = (event) => {
      yCord = event.clientY;
      const styles = window.getComputedStyle(resizeableElement);
      resizeableElement.style.top = styles.top;
      resizeableElement.style.bottom = null;
      document.addEventListener("mousemove", onMouseMoveBottomResize);
      document.addEventListener("mouseup", onMouseUpBottomResize);
    };
    //left
    const onMouseMoveLeftResize = (event) => {
      const dx = event.clientX - xCord;
      xCord = event.clientX;
      width = width - dx;
      resizeableElement.style.width = `${width}px`;
      console.log(resizeableElement.style.width)
      updatePurpleDivPositionLeft(event);
    };

    const onMouseUpLeftResize = () => {
      document.removeEventListener("mousemove", onMouseMoveLeftResize);
      //  document.removeEventListener("mouseup", onMouseUpTopResize);
    };

    const onMouseDownLeftResize = (event) => {
      xCord = event.clientX;
      resizeableElement.style.right = styles.right;
      resizeableElement.style.left = null;
      document.addEventListener("mousemove", onMouseMoveLeftResize);
      document.addEventListener("mouseup", onMouseUpLeftResize);
    };
    //mousedown event listener
    const resizerRight = refRight.current;
    resizerRight.addEventListener("mousedown", onMouseDownRightResize);
    const resizerLeft = refLeft.current;
    resizerLeft.addEventListener("mousedown", onMouseDownLeftResize);
    const resizerTop = refTop.current;
    resizerTop.addEventListener("mousedown", onMouseDownTopResize);
    const resizerBottom = refBottom.current;
    resizerBottom.addEventListener("mousedown", onMouseDownBottomResize);

    return () => {
      resizerRight.removeEventListener("mousedown", onMouseDownRightResize);
      resizerLeft.removeEventListener("mousedown", onMouseDownLeftResize);
      resizerTop.removeEventListener("mousedown", onMouseDownTopResize);
      resizerBottom.removeEventListener("mousedown", onMouseDownBottomResize);
    };
  }, []);
  const updatePurpleDivPositionLeft = (event) => {
     const parentRect = document.getElementById("container")?.getBoundingClientRect();
     const dragboxRect = document.getElementById("dragbox")?.getBoundingClientRect();
     const newWidth = parentRect.right - event.clientX;
        if (newWidth >= dragboxRect.width) {
             refContainer.current.style.width = newWidth + "px";
              refContainer.current.style.left = `${event.clientX}px`;
        //     // Ensure inner box stays inside the outer wrapper
              const innerBoxLeft = Math.min(
               parentRect.width - dragboxRect.width,
                 parentRect.width - newWidth
          );
        refDragbox.current.style.left = innerBoxLeft + "px";
          }
  };
 const updatePurpleDivPositionRight =(event)=>{
    const parentRect = document.getElementById("container")?.getBoundingClientRect();
    const dragboxRect = document.getElementById("dragbox")?.getBoundingClientRect();
    refContainer.current.style.width =
     event.clientX - refContainer?.current?.getBoundingClientRect().left + "px";
  if (parentRect.right <= dragboxRect.right) {
    const innerBoxLeft = parentRect.width - dragboxRect.width;
    refDragbox.current.style.left = innerBoxLeft + "px";
  }
}
const updatePurpleDivPositionBottom= (event) =>{
    const parentRect = document.getElementById("container")?.getBoundingClientRect();
    const dragboxRect = document.getElementById("dragbox")?.getBoundingClientRect();
    refContainer.current.style.height =
        event.clientY - refContainer?.current?.getBoundingClientRect().top + "px";
      if (parentRect.bottom <= dragboxRect.bottom) {
        const innerBoxTop = parentRect.height - dragboxRect.height;
        refDragbox.current.style.top = innerBoxTop + "px";
      }

}
const updatePurpleDivPositionTop = (event) => {
  const parentRect = document.getElementById("container")?.getBoundingClientRect();
    const dragboxRect = document.getElementById("dragbox")?.getBoundingClientRect();
    console.log(parentRect.bottom)
    console.log(dragboxRect.bottom)
    const newHeight = parentRect.bottom - event.clientY;
  if (newHeight >= dragboxRect.bottom - parentRect.bottom) {
    refContainer.current.style.height = newHeight + "px";
    refContainer.current.style.top = `${event.clientY}px`;
}
};

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
    const newX =
      e.clientX - (startPosition.x === 0 ? e.clientX : startPosition.x);
    const newY =
      e.clientY - (startPosition.y === 0 ? e.clientY : startPosition.y);

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
    const newX =
      e.clientX -
      (startContainerPosition.x === 0 ? e.clientX : startContainerPosition.x);
    const newY =
      e.clientY -
      (startContainerPosition.y === 0 ? e.clientY : startContainerPosition.y);

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
    <div className="maincontainer1" >
      <div className="directioncontainer"
      >
        <label
          style={{ marginRight: "10px", height: "20px", fontSize: "20px" }}
        >
          Direction:{" "}
        </label>
        <select
          style={{ height: "30px", fontSize: "20px" }}
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
            cursor:"move",
            width: "500px",
            height: "500px",
            position: "absolute",
            backgroundColor: "pink",
            gap:0,
            top: `${containerPosition.y}px`,
            left: `${containerPosition.x}px`,
            border: "1px solid #ccc",
            minWidth: "100px",
            minHeight: "100px",
          }}
         
        >
          <div
            ref={refLeft}
            className="resize-rl"
            style={{
                background:"yellow"}}
          ></div>
          <div
            ref={refTop}
            className="resize-rt"
            style={{
                background:"yellow"}}
          ></div>
          <div
            ref={refRight}
            className="resize-rr"
            style={{
                background:"yellow"}}
          ></div>
          <div
            ref={refBottom}
            className="resize-rb"
            style={{
                background:"yellow"}}
          ></div>
          <div 
           style={{
            position:"relative",
            top:"0",
            left: "calc(100% - 31px)",
            width:"30px",
            height: "30px",
            border: "1px solid black",
            textAlign:"center",
            cursor:"grab",
           }}
            onMouseDown={handleContainerMouseDown}
          >
            <AiOutlineDrag
              size={32}
              color="black"
              cursor="grab"
              margin="10px"
            />
          </div>
          <div className="dragbox"
            id="dragbox"
            ref={refDragbox}
            style={{
              width: "100px",
              height: "100px",
              objectFit: "contain",
              backgroundColor: "purple",
              position: "absolute",
              top: `${position.y}px`,
              left: `${position.x}px`,
              cursor: "move",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
            }}
            onMouseDown={handleMouseDown}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            {" "}
            Drag me!
          </div>
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
export default CreateDiv;
