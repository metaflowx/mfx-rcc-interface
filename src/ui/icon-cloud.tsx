"use client";

import React, { useState, useEffect, useRef } from "react";

interface IconCloudProps {
  icons?: React.ReactNode[];
  images?: string[];
}

interface Icon {
  x: number;
  y: number;
  z: number;
  id: number;
}

export function IconCloud({ icons, images }: IconCloudProps) {
  const [iconPositions, setIconPositions] = useState<Icon[]>([]);
  const [angle, setAngle] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate initial icon positions on a sphere
  useEffect(() => {
    const items = icons || images || [];
    const newIcons: Icon[] = [];
    const numIcons = items.length || 20;

    // Fibonacci sphere parameters
    const offset = 2 / numIcons;
    const increment = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < numIcons; i++) {
      const y = i * offset - 1 + offset / 2;
      const r = Math.sqrt(1 - y * y);
      const phi = i * increment;

      const x = Math.cos(phi) * r;
      const z = Math.sin(phi) * r;

      newIcons.push({
        x: x * 150, // Increase sphere size
        y: y * 150,
        z: z * 150,
        id: i,
      });
    }
    setIconPositions(newIcons);
  }, [icons, images]);

  // Auto-rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        setAngle((prev) => ({
          x: (prev.x + 0.01) % (2 * Math.PI), // Auto-rotation X
          y: (prev.y + 0.01) % (2 * Math.PI), // Auto-rotation Y
        }));
      }
    }, 30); // Adjust interval for smooth rotation
    return () => clearInterval(interval);
  }, [isHovering]);

  // Mouse hover event handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - rect.width / 2;
      const mouseY = e.clientY - rect.top - rect.height / 2;

      setAngle({
        x: mouseY * 0.0005, // Scale rotation speed based on mouse movement
        y: -mouseX * 0.0005,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
      
        position: "relative",
        perspective: "1000px",
      }}
     className="h-[300px] sm:h-[400px] md:h-[600px] lg:h-[800px] xl:h-[900px]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {iconPositions.map((icon, index) => {
        // Rotate each icon in 3D space using updated angles
        const cosX = Math.cos(angle.x);
        const sinX = Math.sin(angle.x);
        const cosY = Math.cos(angle.y);
        const sinY = Math.sin(angle.y);

        // 3D rotation math
        const rotatedX = icon.x * cosY + icon.z * sinY;
        const rotatedZ = -icon.x * sinY + icon.z * cosY;
        const rotatedY = icon.y * cosX - rotatedZ * sinX;
        const finalZ = icon.y * sinX + rotatedZ * cosX;

        return (
          <div
            key={icon.id}
            style={{
              position: "absolute",
              width: "50px", // Increased icon size
              height: "50px",
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%) 
                          translate3d(${rotatedX}px, ${rotatedY}px, ${finalZ}px)`,
              transition: isHovering ? "transform 0.05s ease" : undefined,
            }}
          >
            {icons ? (
              icons[index]
            ) : images ? (
              <img
                src={images[index]}
                alt={`icon-${index}`}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  backgroundColor: "#4444ff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                }}
              >
                {index + 1}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
