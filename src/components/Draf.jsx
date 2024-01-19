import React from 'react';
import { useState,useRef, useEffect} from "react";

function Draf() {
    const refContainer = useRef(null);
    const refTop = useRef(null);
    const refRight = useRef(null);
    const refBottom = useRef(null);
    const refLeft = useRef(null);
  return (
    <div className='Container'>
        <div ref={refLeft} className="resize-rl"></div>
            <div ref={refTop} className="resize-rt"></div>
            <div ref={refRight} className="resize-rr"></div>
            <div ref={refBottom} className="resize-rb"></div>
    </div>
  )
}

export default Draf;