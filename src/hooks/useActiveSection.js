import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds, options = {}) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const observers = [];
    const visibleSections = new Map();

    const callback = (entries) => {
      entries.forEach((entry) => {
        visibleSections.set(entry.target.id, entry.intersectionRatio);
      });

      let maxRatio = 0;
      let currentSection = activeSection;
      visibleSections.forEach((ratio, id) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          currentSection = id;
        }
      });

      if (maxRatio > 0) {
        setActiveSection(currentSection);
      }
    };

    const observer = new IntersectionObserver(callback, {
      threshold: [0, 0.1, 0.25, 0.5],
      rootMargin: '-80px 0px -30% 0px',
      ...options,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        visibleSections.set(id, 0);
      }
    });

    return () => observer.disconnect();
  }, []);

  return activeSection;
}
