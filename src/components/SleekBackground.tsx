import { useEffect, useRef } from "react";

export default function SleekBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        
        // Purple or Cyan glowing hue
        const roll = Math.random();
        if (roll < 0.4) {
          this.color = "rgba(124, 58, 237, 0.4)"; // Purple glow
        } else if (roll < 0.8) {
          this.color = "rgba(6, 182, 212, 0.4)";  // Cyan glow
        } else {
          this.color = "rgba(255, 255, 255, 0.2)"; // Soft white
        }
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color;
        // Subtle path glow
        if (this.size > 1.8) {
          context.shadowBlur = 8;
          context.shadowColor = this.color;
        } else {
          context.shadowBlur = 0;
        }
        context.fill();
      }
    }

    const particlesArray: Particle[] = [];
    const numberOfParticles = Math.min(60, Math.floor((width * height) / 25000));

    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.shadowBlur = 0; // reset shadow
      
      // Draw grid lines (subtle blueprint background)
      ctx.strokeStyle = "rgba(30, 41, 59, 0.21)";
      ctx.lineWidth = 1;
      const gridSize = 80;
      
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw(ctx);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "radial-gradient(circle at 50% 50%, #1E1B4B 0%, #0F172A 100%)" }}
      ref={canvasRef}
      id="neon_stars_canvas"
    />
  );
}
