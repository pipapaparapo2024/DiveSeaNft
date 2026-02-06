'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchNfts } from '@/store/nftsSlice';
import Card from './Card';
import styles from './Slider.module.scss';
import gsap from 'gsap';
import { Draggable } from 'gsap/all';

// Register Draggable
gsap.registerPlugin(Draggable);

export default function Slider() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status } = useSelector((state: RootState) => state.nfts);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const draggableInstance = useRef<Draggable[] | null>(null);
  const [cardWidth, setCardWidth] = useState(310); // Default desktop width + gap (280 + 30)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchNfts());
    }
  }, [dispatch, status]);

  // Calculate card width on resize
  useEffect(() => {
    const handleResize = () => {
      // Check if mobile (screen width < 600px)
      // Card width: Mobile 210px, Desktop 280px
      // Gap: 30px
      const isMobile = window.matchMedia('(max-width: 600px)').matches;
      setCardWidth(isMobile ? 240 : 310); // 210+30 or 280+30
    };

    handleResize(); // Initial
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (status === 'succeeded' && items.length > 0 && containerRef.current) {
      const totalItems = items.length;
      const singleSetWidth = totalItems * cardWidth;
      
      // Initialize position to the start of the second set (middle)
      gsap.set(containerRef.current, { x: -singleSetWidth });

      const ctx = gsap.context(() => {
        draggableInstance.current = Draggable.create(containerRef.current, {
          type: 'x',
          edgeResistance: 0.65,
          inertia: true,
          onDrag: function() {
            wrap(this.x);
          },
          onThrowUpdate: function() {
            wrap(this.x);
          }
        });
      }, wrapperRef);

      // Wrap function to handle infinite loop
      const wrap = (x: number) => {
        const normalizeX = x;
        // If scrolled past the beginning of the first set (too far right)
        if (normalizeX > 0) {
          gsap.set(containerRef.current, { x: normalizeX - singleSetWidth });
          if (draggableInstance.current && draggableInstance.current[0]) {
            draggableInstance.current[0].update(); // Update draggable state
          }
        }
        // If scrolled past the end of the third set (too far left)
        // Actually, we want to keep it within the middle set range roughly
        // If we go past the end of the second set (-2 * singleSetWidth)
        else if (normalizeX < -singleSetWidth * 2) {
           gsap.set(containerRef.current, { x: normalizeX + singleSetWidth });
           if (draggableInstance.current && draggableInstance.current[0]) {
            draggableInstance.current[0].update();
          }
        }
      };
      
      return () => ctx.revert();
    }
  }, [status, items, cardWidth]);

  const moveSlider = useCallback((direction: 'prev' | 'next') => {
    if (!containerRef.current || !items.length) return;
    
    const currentX = gsap.getProperty(containerRef.current, "x") as number;
    const targetX = direction === 'next' ? currentX - cardWidth : currentX + cardWidth;
    
    const totalItems = items.length;
    const singleSetWidth = totalItems * cardWidth;

    gsap.to(containerRef.current, {
      x: targetX,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: () => {
         // Check wrap during animation
         const x = gsap.getProperty(containerRef.current, "x") as number;
         if (x > 0) {
            gsap.set(containerRef.current, { x: x - singleSetWidth });
         } else if (x < -singleSetWidth * 2) {
            gsap.set(containerRef.current, { x: x + singleSetWidth });
         }
      },
      onComplete: () => {
         // Final wrap check
         const finalX = gsap.getProperty(containerRef.current, "x") as number;
         if (finalX > 0) {
            gsap.set(containerRef.current, { x: finalX - singleSetWidth });
         } else if (finalX < -singleSetWidth * 2) {
            gsap.set(containerRef.current, { x: finalX + singleSetWidth });
         }
         // Sync Draggable
         if (draggableInstance.current && draggableInstance.current[0]) {
           draggableInstance.current[0].update();
         }
      }
    });
  }, [items.length, cardWidth]);

  const handlePrev = () => moveSlider('prev');
  const handleNext = () => moveSlider('next');

  // Triple items for infinite loop
  const displayItems = status === 'succeeded' ? [...items, ...items, ...items] : [];

  return (
    <section className={styles.sliderSection} ref={wrapperRef}>
      <h2>Weekly - Top NFT</h2>
      
      <div className={styles.sliderContainer} ref={containerRef}>
        {status === 'loading' && <p>Loading NFTs...</p>}
        {status === 'failed' && <p>Error loading NFTs.</p>}
        {displayItems.map((item, index) => (
          <Card 
            key={`${item.id}-${index}`} 
            name={item.name} 
            image={item.image} 
            currentBid={item.currentBid}
            endTime={item.endTime}
          />
        ))}
      </div>

      <div className={styles.controls}>
        <button onClick={handlePrev} aria-label="Previous slide" className={styles.prevBtn}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className={styles.divider}></div>
        <button onClick={handleNext} aria-label="Next slide" className={styles.nextBtn}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </section>
  );
}
