import React from 'react';
import { Mode } from '../types';

interface VisualizerProps {
  mode: Mode;
  isPlaying: boolean;
}

const Visualizer: React.FC<VisualizerProps> = ({ mode, isPlaying }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Solid background using brand colors */}
      <div className="absolute inset-0 bg-[var(--bg-primary)] z-0"></div>

      {/* Ambient ember blobs — ≤7% tint, breathe a little more while playing */}
      <div className="ambient" aria-hidden="true">
        <span className={`w-[36rem] h-[36rem] -top-48 -left-40 bg-[#F74603]/[0.07] transition-opacity duration-1000 ${isPlaying ? 'opacity-70' : 'opacity-40'}`}></span>
        <span className={`w-[30rem] h-[30rem] -bottom-32 -right-32 bg-[#F74603]/[0.05] transition-opacity duration-1000 ${isPlaying ? 'opacity-70' : 'opacity-40'}`}></span>
      </div>
    </div>
  );
};

export default Visualizer;