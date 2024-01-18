import React from 'react';

const DraggableItem = ({ item, onDragStart }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('hello', item); // Set the data being dragged
   
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
    >
      {item}
    </div>
  );
};

export default DraggableItem;