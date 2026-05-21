import { useRef, useState, useEffect } from 'react';

export function BrandMarquee() {
  const brands = [
    "Salesforce", "ServiceNow", "New Relic", "Microsoft", 
    "Google Workspace", "Shopify", "Amazon Seller", "PayHip", 
    "Twilio", "Razorpay", "Sophos", "Zendesk", "cPanel", 
    "AWS", "GCP", "Oracle"
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const scroll = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isPaused && scrollRef.current && contentRef.current) {
        // Significantly faster speed: ~1.8 pixels per frame
        const speed = (delta / 16) * 1.8; 
        
        scrollRef.current.scrollLeft += speed;
        
        // We duplicated the brands 8 times.
        // To maintain perfect pixel symmetry without twitching, 
        // the oneSetWidth represents exactly 16 items and 16 gaps.
        const oneSetWidth = contentRef.current.offsetWidth / 8;
        
        // Loop when we've smoothly scrolled past two sets
        if (scrollRef.current.scrollLeft >= oneSetWidth * 2) {
          scrollRef.current.scrollLeft -= oneSetWidth;
        } else if (scrollRef.current.scrollLeft <= 0) {
          scrollRef.current.scrollLeft += oneSetWidth;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  // Drag and Drop handlers for Desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDown(true);
    setIsPaused(true);
    if (!scrollRef.current) return;
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    setIsPaused(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
    setIsPaused(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (startX - x) * 2; // Drag multiplier
    scrollRef.current.scrollLeft = scrollLeft + walk;
  };

  // Touch handlers for Mobile
  const handleTouchStart = () => setIsPaused(true);
  const handleTouchEnd = () => setIsPaused(false);
  
  // Continuous wrap-check during native scroll/swipe on mobile
  const handleScroll = () => {
    if (!scrollRef.current || !contentRef.current) return;
    const oneSetWidth = contentRef.current.offsetWidth / 8;
    if (scrollRef.current.scrollLeft >= oneSetWidth * 3) {
      scrollRef.current.scrollLeft -= oneSetWidth;
    } else if (scrollRef.current.scrollLeft <= 0) {
      scrollRef.current.scrollLeft += oneSetWidth;
    }
  };

  return (
    <div className="w-full bg-ksa-neon py-4 border-y border-ksa-neon/50">
      <div 
        ref={scrollRef}
        className="overflow-x-auto cursor-grab active:cursor-grabbing no-scrollbar"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onScroll={handleScroll}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        <div ref={contentRef} className="flex items-center gap-12 w-max pr-12">
          {[...brands, ...brands, ...brands, ...brands, ...brands, ...brands, ...brands, ...brands].map((brand, i) => (
            <div key={i} className="flex-shrink-0 font-display font-bold text-black text-xl uppercase tracking-wider select-none pointer-events-none">
              {brand}
            </div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
}
