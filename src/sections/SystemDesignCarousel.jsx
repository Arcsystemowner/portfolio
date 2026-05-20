import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import SystemDesign from "./SystemDesign";
import RateLimiterSystemDesign from "./RateLimiterSystemDesign";

const SLIDES = [
  {
    id: "microservices",
    title: "Microservices Architecture",
    description: "Event-driven distributed system with Kafka, Redis, and PostgreSQL",
    component: SystemDesign,
    props: {}
  },
  {
    id: "rl-intro",
    title: "Rate Limiter: Introduction & Overview",
    description: "Multi-algorithm rate limiting system with Redis cluster and observability",
    component: RateLimiterSystemDesign,
    props: { phase: 5 }
  },
  {
    id: "rl-edge",
    title: "Rate Limiter: 01. Edge Security",
    description: "Geo-blocking & WAF filtering of malicious requests at the edge",
    component: RateLimiterSystemDesign,
    props: { phase: 0 }
  },
  {
    id: "rl-gateway",
    title: "Rate Limiter: 02. API Gateway Routing",
    description: "SSL termination, JWT credential decoding, and client identity extraction",
    component: RateLimiterSystemDesign,
    props: { phase: 1 }
  },
  {
    id: "rl-cache",
    title: "Rate Limiter: 03. Cache & Lua Scripts",
    description: "Distributed rate counter checking using atomic Redis Lua scripts",
    component: RateLimiterSystemDesign,
    props: { phase: 2 }
  },
  {
    id: "rl-services",
    title: "Rate Limiter: 04. Service Delivery",
    description: "Routing permitted requests to microservices and injecting rate limit headers",
    component: RateLimiterSystemDesign,
    props: { phase: 3 }
  },
  {
    id: "rl-observe",
    title: "Rate Limiter: 05. Observability & Telemetry",
    description: "Metrics ingestion via Prometheus, Grafana charts, and Jaeger trace analysis",
    component: RateLimiterSystemDesign,
    props: { phase: 4 }
  },
  {
    id: "rl-playground",
    title: "Rate Limiter: Complete Topology Playground",
    description: "Interactive playground to inspect nodes, connections, and live stats",
    component: RateLimiterSystemDesign,
    props: { phase: 5 }
  }
];

export default function SystemDesignCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState("next");
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    setDirection(index > currentSlide ? "next" : "prev");
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const nextSlide = () => {
    if (isAnimating) return;
    goToSlide((currentSlide + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    goToSlide((currentSlide - 1 + SLIDES.length) % SLIDES.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, isAnimating]);

  // Auto-advance every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 15000);
    return () => clearInterval(interval);
  }, [currentSlide, isAnimating]);

  const slide = SLIDES[currentSlide];
  const CurrentComponent = slide.component;
  const componentProps = slide.props || {};

  return (
    <div className="relative w-full bg-gradient-to-br from-[#060910] via-[#0a0d16] to-[#06090f] rounded-3xl py-8 overflow-hidden">
      <style>{`
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .carousel-slide {
          animation: ${direction === 'next' ? 'slide-in-right' : 'slide-in-left'} 0.6s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        .slide-header {
          animation: fade-in 0.8s ease-out 0.2s both;
        }
      `}</style>

      {/* Header Section */}
      <div className="slide-header text-center mb-8 px-8">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-wide font-mono">
          {slide.title}
        </h2>
        <p className="text-xs sm:text-sm text-white/40 tracking-wider font-mono">
          {slide.description}
        </p>
      </div>

      {/* Main Carousel Content */}
      <div className="relative min-h-[auto] lg:min-h-[810px] flex items-center justify-center">
        {/* Navigation Buttons (Desktop Only) */}
        <button
          onClick={prevSlide}
          disabled={isAnimating}
          className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/8 border border-white/12 hover:bg-white/12 hover:scale-108 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed backdrop-blur-md items-center justify-center transition-all duration-300 text-white cursor-none"
          aria-label="Previous slide"
        >
          <FiChevronLeft size={24} />
        </button>

        <button
          onClick={nextSlide}
          disabled={isAnimating}
          className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/8 border border-white/12 hover:bg-white/12 hover:scale-108 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed backdrop-blur-md items-center justify-center transition-all duration-300 text-white cursor-none"
          aria-label="Next slide"
        >
          <FiChevronRight size={24} />
        </button>

        {/* Slide Content */}
        <div 
          key={currentSlide}
          className="carousel-slide w-full flex justify-center px-4 lg:px-12"
        >
          <CurrentComponent {...componentProps} />
        </div>
      </div>

      {/* Slide Indicators (Dots & Mobile Controls) */}
      <div className="flex justify-center items-center gap-4 mt-8 px-8">
        {/* Mobile Left Arrow */}
        <button
          onClick={prevSlide}
          disabled={isAnimating}
          className="flex lg:hidden w-10 h-10 rounded-full bg-white/8 border border-white/12 active:scale-95 disabled:opacity-30 items-center justify-center text-white"
          aria-label="Previous slide"
        >
          <FiChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-[10px]">
          {SLIDES.map((s, index) => (
            <button
              key={s.id}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`dot-indicator h-2 rounded-full border-none transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] disabled:cursor-not-allowed cursor-none ${
                index === currentSlide 
                  ? 'bg-indigo-400 w-8 active' 
                  : 'bg-white/20 w-2 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${index + 1}: ${s.title}`}
              aria-current={index === currentSlide ? "true" : "false"}
            />
          ))}
        </div>

        {/* Mobile Right Arrow */}
        <button
          onClick={nextSlide}
          disabled={isAnimating}
          className="flex lg:hidden w-10 h-10 rounded-full bg-white/8 border border-white/12 active:scale-95 disabled:opacity-30 items-center justify-center text-white"
          aria-label="Next slide"
        >
          <FiChevronRight size={20} />
        </button>
      </div>

      {/* Slide Counter */}
      <div className="text-center mt-6 px-8">
        <span className="text-xs text-white/35 tracking-widest font-mono">
          {currentSlide + 1} / {SLIDES.length}
        </span>
      </div>

      {/* Keyboard Navigation Hint (Desktop Only) */}
      <div className="hidden lg:flex absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-white/25 tracking-wider font-mono items-center gap-2">
        <span>Use</span>
        <kbd className="bg-white/8 border border-white/12 rounded px-1.5 py-0.5">←</kbd>
        <kbd className="bg-white/8 border border-white/12 rounded px-1.5 py-0.5">→</kbd>
        <span>to navigate</span>
      </div>
    </div>
  );
}
