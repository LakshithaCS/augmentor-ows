import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import "./iframe.css";

function IFrame() {
  const [searchParams] = useSearchParams();
    
  const [iframeUrl, setIframeUrl] = useState("");

  useEffect(() => {

    const category = searchParams.get("c");
    const model = searchParams.get("m");
    const parameters = searchParams.get("p");
    const augmentor_base_url = "https://augmentor-web.vercel.app";

    const constructedIframeUrl = `${augmentor_base_url}/augmentor/${category}/${model}?p=${parameters}`;

    function generateLaunchUrl(inputUrl) {
      if (inputUrl.includes("?p=b")) {
        inputUrl += "r";
      } else {
        inputUrl += "?p=r";
      }
      const encodedUrl = encodeURIComponent(inputUrl);
      return `https://launchar.app/launch/ar-5?url=${encodedUrl}`;
    }

    function getDeviceType() {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;

      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "apple-mobile";
      }
      if (/android/i.test(userAgent)) {
        return "android-mobile";
      }
      return "desktop";
    }

    if (getDeviceType() === "apple-mobile") {
      const launchUrl = generateLaunchUrl(constructedIframeUrl);
      window.location.href = launchUrl;
    } else {
      setIframeUrl(constructedIframeUrl);
    }

  }, []);

  if (!iframeUrl) return null;

  return (
    <section className="ar-container">
      <iframe
        allow="camera;gyroscope;accelerometer;magnetometer;xr-spatial-tracking;microphone;"
        allowFullScreen
        id="augmentor-iframe"
        src={iframeUrl}
        title="AugmnetoR"
        style={{width: "100%", height: "100%"}}
      ></iframe>
    </section>
  );
}


export default IFrame;
