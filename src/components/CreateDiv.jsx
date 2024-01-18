import React, { useEffect, useState } from 'react';
import "../styles/CreateDiv.css"

const CreateDiv = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const startDrag = (event) => {
    console.log("drag start")
    setIsDragging(true);
     setOffsetX(event.clientX - event.target.getBoundingClientRect().left);
    setOffsetY(event.clientY - event.target.getBoundingClientRect().top);

    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", stopDrag);
  };

  const drag = (event) => {
    console.log({isDragging})
    if (isDragging) {
       const newX = event.clientX - offsetX;
      const newY = event.clientY - offsetY;

      
      const container = document.getElementById("container");
      const maxX = container.clientWidth - document.getElementById("draggable").offsetWidth;
      const maxY = container.clientHeight - document.getElementById("draggable").offsetHeight;

      const clampedX = Math.min(Math.max(newX, 0), maxX);
      const clampedY = Math.min(Math.max(newY, 0), maxY);

      document.getElementById("draggable").style.left = clampedX + "px";
      document.getElementById("draggable").style.top = clampedY + "px";
    }
  };

  const stopDrag = () => {
    setIsDragging(false);
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", stopDrag);
  };

  useEffect(() => {
    window.addEventListener("mousedown", startDrag);
    window.addEventListener("mousemove", drag)
    

   return () =>{
    window.removeEventListener("load",startDrag);
   }
  }, [])

  return (
    <div id="container" style={{ position: 'relative', width: '500px', height: '500px', border: '1px solid #000', margin:'100px' }}>
      <div
        id="draggable"
        style={{
          position: 'absolute',
          width: '100px',
          height: '100px',
          backgroundColor: '#3498db',
          cursor: 'pointer',
        }}
      ></div>
    </div>
  );
};

export default CreateDiv;