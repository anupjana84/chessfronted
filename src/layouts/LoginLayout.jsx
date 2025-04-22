import { useState } from "react";

export default function LoginLayout({ children }) {
  return (
    <div className="relative w-full h-screen bg-[#080808] overflow-hidden">
      {/* Render Spline background or keep it black if there's an error */}
      {/* {!hasError && (
                <div className="absolute inset-0 ml-[105px]">
                    <Spline
                        scene="https://prod.spline.design/EBC9mAFQBxTLfanA/scene.splinecode"
                        onLoad={() => setHasError(false)}
                        onError={() => setHasError(true)}
                    />
                </div>
            )} */}

      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {children}
    </div>
  );
}
