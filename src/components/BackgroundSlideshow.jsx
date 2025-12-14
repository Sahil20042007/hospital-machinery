import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const images = [
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920',
  'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=1920',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920',
  'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1920',
  'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1920'
];

const BackgroundSlideshow = () => {
  const slidesRef = useRef([]);

  useEffect(() => {
    gsap.set(slidesRef.current, {
      opacity: 0,
      scale: 1.05
    });

    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: 'power2.inOut' }
    });

    slidesRef.current.forEach((slide, i) => {
      tl.to(slide, {
        opacity: 1,
        scale: 1.15,
        duration: 6
      })
      .to(slide, { duration: 3 })
      .to(slide, {
        opacity: 0,
        scale: 1.25,
        duration: 4
      }, '+=0');
    });

    return () => tl.kill();
  }, []);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden">
      {images.map((img, i) => (
        <div
          key={i}
          ref={el => slidesRef.current[i] = el}
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
    </div>
  );
};

export default BackgroundSlideshow;