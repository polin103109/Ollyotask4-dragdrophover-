import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children, target }) => {
  const [el, setEl] = useState(null);

  useEffect(() => {
    const root = target || document.getElementById("root");
     if (!root) {
     console.error("Root element not found");
      return;
    }

    const portalElement = document.createElement("div");
    portalElement.setAttribute("style", "position:relative");

    root.parentElement?.insertBefore(portalElement, root.nextSibling);

    setEl(portalElement);

    return () => {
      if (portalElement) {
        portalElement.remove();
      }
    };
  }, [target]);

  return el ? createPortal(children, el) : null;
};

export default Portal;
