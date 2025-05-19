import React, { useEffect, useRef } from "react";

const AvatarViewer = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!window.AvatarSDK) return;

    const sdk = new window.AvatarSDK({
      container: containerRef.current,
      // You can provide config here like token or starting avatar
    });

    sdk.start();

    return () => {
      sdk.destroy();
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "600px" }} />;
};

export default AvatarViewer;
