
import React, { useEffect, useState } from 'react';

interface SimilarityScoreProps {
  score: number;
  size?: number;
  thickness?: number;
  animated?: boolean;
}

const SimilarityScore: React.FC<SimilarityScoreProps> = ({
  score,
  size = 150,
  thickness = 12,
  animated = true
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  useEffect(() => {
    if (!animated) {
      setAnimatedScore(score);
      return;
    }
    
    // Animate the score
    if (score > 0) {
      const duration = 1000; // 1 second animation
      const interval = 10; // Update every 10ms
      const steps = duration / interval;
      const step = score / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += step;
        if (current >= score) {
          current = score;
          clearInterval(timer);
        }
        setAnimatedScore(current);
      }, interval);
      
      return () => clearInterval(timer);
    } else {
      setAnimatedScore(0);
    }
  }, [score, animated]);
  
  // Calculate circle properties
  const radius = size / 2;
  const normalizedRadius = radius - thickness / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;
  
  // Determine color based on score
  let color;
  if (score >= 75) color = 'rgb(34, 197, 94)'; // Green
  else if (score >= 50) color = 'rgb(234, 179, 8)'; // Yellow
  else if (score >= 25) color = 'rgb(249, 115, 22)'; // Orange
  else color = 'rgb(239, 68, 68)'; // Red
  
  return (
    <div 
      className="similarity-circle"
      style={{ 
        width: size, 
        height: size
      }}
    >
      <svg
        height={size}
        width={size}
        className="rotate-[-90deg]"
      >
        {/* Background circle */}
        <circle
          stroke="currentColor"
          className="text-muted"
          fill="transparent"
          strokeWidth={thickness}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        
        {/* Progress circle */}
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={thickness}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-300 ease-in-out"
        />
      </svg>
      
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-3xl font-bold">{Math.round(animatedScore)}%</span>
        <span className="text-xs text-muted-foreground mt-1">Similarity</span>
      </div>
    </div>
  );
};

export default SimilarityScore;
