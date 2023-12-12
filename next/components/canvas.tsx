import { useEffect, useRef } from 'react';

const Canvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const w = window.innerWidth;
    const h = window.innerHeight;
    const rate = 60;
    const arc = 100;
    let time = 0;
    const size = 7;
    const speed = 20;
    const parts = [];

    const colors = ['#c80909', '#f7a700', '#7d59ce', '#007f6c', '#ef146b'];
    const mouse = { x: 0, y: 0 };

    canvas.width = w;
    canvas.height = h;

    function create() {
      time = 0;

      for (let i = 0; i < arc; i++) {
        parts[i] = {
          x: Math.random() * w,
          y: Math.random() * h,
          toX: Math.random() * 5 - 1,
          toY: Math.random() * 2 - 1,
          c: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * size,
        };
      }
    }

    function particles() {
      ctx.clearRect(0, 0, w, h);
      canvas.addEventListener('mousemove', MouseMove, false);

      for (let i = 0; i < arc; i++) {
        const li = parts[i];
        const distanceFactor = DistanceBetween(mouse, parts[i]);
        const distanceFactorClamped = Math.max(Math.min(15 - distanceFactor / 10, 10), 1);
        ctx.beginPath();
        ctx.arc(li.x, li.y, li.size * distanceFactorClamped, 0, Math.PI * 2, false);
        ctx.fillStyle = li.c;
        ctx.strokeStyle = li.c;
        if (i % 2 === 0) ctx.stroke();
        else ctx.fill();

        li.x = (li.x + li.toX * 0.5) % w;
        li.y = (li.y + li.toY * 0.5) % h;

        if (li.x < 0) {
          li.x = w;
        }
        if (li.y < 0) {
          li.y = h;
        }
      }

      if (time < speed) {
        time++;
      }
      requestAnimationFrame(particles);
    }

    function MouseMove(e) {
      mouse.x = e.layerX;
      mouse.y = e.layerY;
    }

    function DistanceBetween(p1, p2) {
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      return Math.sqrt(dx * dx + dy * dy);
    }

    create();
    particles();
  }, []); // Ensure this effect runs once when the component mounts

  return <canvas ref={canvasRef} className='lg:block hidden'></canvas>;
};

export default Canvas;
