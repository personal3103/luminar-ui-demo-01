import { useEffect, useRef } from "react";
import { cn } from "../lib/utils";

export default function AmbientCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const particleCount = 100;
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    
    let mouse = { x: -1000, y: -1000 };
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5
      });
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => { mouse.x = -1000; mouse.y = -1000; };
    
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseout', onMouseLeave);
    
    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    let animationId: number;
    const render = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Draw gradient background
      const grad = ctx.createRadialGradient(w/2, 0, 0, w/2, 0, w);
      grad.addColorStop(0, 'rgba(99, 102, 241, 0.08)'); // indigo-500/8
      grad.addColorStop(1, 'rgba(9, 9, 11, 1)'); // zinc-950
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        
        // Mouse interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 150) {
           p.x -= dx * 0.01;
           p.y -= dy * 0.01;
           // Draw line to mouse
           ctx.beginPath();
           ctx.moveTo(p.x, p.y);
           ctx.lineTo(mouse.x, mouse.y);
           ctx.strokeStyle = `rgba(167, 139, 250, ${0.2 * (1 - dist/150)})`;
           ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(render);
    };
    
    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseout', onMouseLeave);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className={cn("fixed inset-0 pointer-events-none z-[-1]", className)} />;
}
