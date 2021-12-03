import React from "react";

export default function LoadingPage() {
  return (
    <div className="hero fullscreen u-items-center u-justify-center animated fadeIn"
         style={{background: "linear-gradient(to right, #6782b4, #b1bfd8)"}}>
      <div className="px-1 py-10 mx-2">
        <div className="animated loading hide-text loading-white">
          <p>Hidden</p>
        </div>
      </div>
    </div>
  )
}