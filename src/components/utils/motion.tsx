import React, { useState, useEffect, useRef } from 'react';

// Type definitions
type MotionProps = {
  children: React.ReactNode;
  initial?: Record<string, any>;
  animate?: Record<string, any>;
  exit?: Record<string, any>;
  transition?: Record<string, any>;
  whileInView?: Record<string, any>;
  viewport?: {
    once?: boolean;
    margin?: string;
  };
  className?: string;
};

export const motion = {
  div: ({ 
    children, 
    initial, 
    animate,
    exit,
    transition,
    whileInView,
    viewport,
    className = '',
    ...props 
  }: MotionProps & React.HTMLAttributes<HTMLDivElement>) => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
      if (!whileInView) return;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (viewport?.once) {
              setHasAnimated(true);
              observer.disconnect();
            }
          } else if (!viewport?.once) {
            setIsVisible(false);
          }
        },
        {
          rootMargin: viewport?.margin || '0px',
          threshold: 0.1,
        }
      );
      
      if (ref.current) {
        observer.observe(ref.current);
      }
      
      return () => {
        observer.disconnect();
      };
    }, [whileInView, viewport]);
    
    // Compute styles based on animation states
    const getStyle = () => {
      if (whileInView && (isVisible || hasAnimated)) {
        const transitionDelay = transition?.delay || 0;
        const transitionDuration = transition?.duration || 0.3;
        
        return {
          transform: getTransformValue(),
          opacity: getOpacityValue(),
          transition: `transform ${transitionDuration}s, opacity ${transitionDuration}s`,
          transitionDelay: `${transitionDelay}s`,
        };
      }
      
      if (initial && !isVisible) {
        return {
          transform: getInitialTransformValue(),
          opacity: initial.opacity,
        };
      }
      
      return {};
    };
    
    const getInitialTransformValue = () => {
      if (!initial) return '';
      
      const transforms = [];
      if (initial.x) transforms.push(`translateX(${initial.x}px)`);
      if (initial.y) transforms.push(`translateY(${initial.y}px)`);
      if (initial.scale) transforms.push(`scale(${initial.scale})`);
      if (initial.rotate) transforms.push(`rotate(${initial.rotate}deg)`);
      
      return transforms.join(' ');
    };
    
    const getTransformValue = () => {
      if (isVisible || hasAnimated) {
        const targetState = whileInView || animate;
        if (!targetState) return '';
        
        const transforms = [];
        if (targetState.x) transforms.push(`translateX(${targetState.x}px)`);
        if (targetState.y) transforms.push(`translateY(${targetState.y}px)`);
        if (targetState.scale) transforms.push(`scale(${targetState.scale})`);
        if (targetState.rotate) transforms.push(`rotate(${targetState.rotate}deg)`);
        
        return transforms.length ? transforms.join(' ') : 'none';
      }
      
      return getInitialTransformValue();
    };
    
    const getOpacityValue = () => {
      if (isVisible || hasAnimated) {
        const targetState = whileInView || animate;
        return targetState?.opacity !== undefined ? targetState.opacity : 1;
      }
      return initial?.opacity !== undefined ? initial.opacity : 1;
    };
    
    return (
      <div
        ref={ref}
        className={className}
        style={{
          ...getStyle(),
          ...props.style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
};

export default motion;