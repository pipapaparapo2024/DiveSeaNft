'use client';

import { useEffect, useRef } from 'react';
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

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchNfts());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (status === 'succeeded' && items.length > 0 && containerRef.current) {
      // Initialize Draggable
      const ctx = gsap.context(() => {
        draggableInstance.current = Draggable.create(containerRef.current, {
          type: 'x',
          edgeResistance: 0.65,
          bounds: wrapperRef.current, // Constrain to wrapper? Or handle infinite logic
          inertia: true,
          // For simple infinite effect without complex logic, we rely on duplicate items 
          // and maybe snapping, but full infinite loop with GSAP Draggable is complex.
          // We will implement a standard slider first.
        });
      }, wrapperRef);
      
      return () => ctx.revert();
    }
  }, [status, items]);

  const handlePrev = () => {
    if (draggableInstance.current && draggableInstance.current[0]) {
       // Simple move
       gsap.to(containerRef.current, { x: `+=300`, duration: 0.5 });
    }
  };

  const handleNext = () => {
    if (draggableInstance.current && draggableInstance.current[0]) {
      gsap.to(containerRef.current, { x: `-=300`, duration: 0.5 });
    }
  };

  // Mock infinite by tripling items
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
        <button onClick={handlePrev}>←</button>
        <button onClick={handleNext}>→</button>
      </div>
    </section>
  );
}
