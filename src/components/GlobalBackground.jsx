import React from 'react';

const GlobalBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full z-[-1] bg-black">
      {/* 1. The Moving Video - High Clarity */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        // CHANGED: opacity-100 (was 50) so it is fully visible
        // CHANGED: object-cover ensures it stays sharp at any size
        className="absolute inset-0 w-full h-full object-cover opacity-100" 
        // CHANGED: brightness(0.8) (was 0.6) and added contrast(1.1) for sharpness
        style={{ filter: "brightness(0.8) contrast(1.1)" }} 
      >
        <source src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" type="video/mp4" />
      </video>

      {/* 2. Lighter Gradient Overlay */}
      {/* We only darken the edges slightly, leaving the center clear */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      
      {/* 3. Removed the "Noise" texture because it can make video look grainy/blurry */}
    </div>
  );
};

export default GlobalBackground;