import React from 'react';
import { TimerMode } from '../types';
import { Infinity, Timer, Hourglass } from 'lucide-react';

interface TimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  timerMode: TimerMode;
  setTimerMode: (mode: TimerMode) => void;
  setDuration: (seconds: number) => void;
  quotesEnabled: boolean;
  setQuotesEnabled: (enabled: boolean) => void;
}

const TimerModal: React.FC<TimerModalProps> = ({ 
  isOpen, 
  onClose, 
  timerMode, 
  setTimerMode,
  setDuration,
  quotesEnabled,
  setQuotesEnabled
}) => {
  if (!isOpen) return null;

  const presets = [5, 10, 15, 30, 45, 60, 75, 90];

  const handlePresetClick = (minutes: number) => {
    setTimerMode(TimerMode.TIMER);
    setDuration(minutes * 60);
    onClose();
  };

  const handlePomodoroClick = () => {
    setTimerMode(TimerMode.INTERVALS);
    setDuration(25 * 60); // Default start with 25 min work
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md surface-panel rounded-3xl p-6 transform transition-all" onClick={e => e.stopPropagation()}>
        <h2 className="text-center text-xl font-light text-[var(--text-primary)] mb-8">Timer Settings</h2>

        {/* Mode Selectors */}
        <div className="flex bg-[var(--bg-secondary)] rounded-lg p-1 mb-8 border border-[var(--border)]">
          <button 
            className={`flex-1 flex flex-col items-center py-4 rounded-md transition-all ${
              timerMode === TimerMode.INFINITE 
                ? 'btn-mechanical-active' 
                : 'btn-mechanical text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
            onClick={() => setTimerMode(TimerMode.INFINITE)}
          >
            <Infinity className="w-6 h-6 mb-2" />
            <span className="text-xs font-medium tracking-wider">INFINITE</span>
          </button>
          
          <button 
            className={`flex-1 flex flex-col items-center py-4 rounded-md transition-all ${
              timerMode === TimerMode.TIMER 
                ? 'btn-mechanical-active' 
                : 'btn-mechanical text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
            onClick={() => setTimerMode(TimerMode.TIMER)}
          >
            <Timer className="w-6 h-6 mb-2" />
            <span className="text-xs font-medium tracking-wider">TIMER</span>
          </button>

          <button 
            className={`flex-1 flex flex-col items-center py-4 rounded-md transition-all ${
              timerMode === TimerMode.INTERVALS 
                ? 'btn-mechanical-active' 
                : 'btn-mechanical text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
            onClick={() => setTimerMode(TimerMode.INTERVALS)}
          >
            <Hourglass className="w-6 h-6 mb-2" />
            <span className="text-xs font-medium tracking-wider">POMODORO</span>
          </button>
        </div>

        {/* Dynamic Content Based on Mode */}
        <div className="mb-10">
          
          {timerMode === TimerMode.INFINITE && (
            <div className="text-center">
              <h3 className="text-2xl font-light mb-2 text-[var(--text-primary)]">Infinite Play</h3>
              <p className="text-[var(--text-secondary)] text-sm font-light">Listen freely without any time restrictions.</p>
            </div>
          )}

          {timerMode === TimerMode.TIMER && (
             <div className="animate-fade-in">
                <h3 className="text-center text-lg font-light mb-4 text-[var(--text-primary)]">Select Duration (Minutes)</h3>
                <div className="grid grid-cols-4 gap-3">
                  {presets.map(min => (
                    <button
                      key={min}
                      onClick={() => handlePresetClick(min)}
                      className="btn-mechanical py-2 px-1 rounded-lg text-sm font-medium text-[var(--text-primary)]"
                    >
                      {min}m
                    </button>
                  ))}
                </div>
             </div>
          )}

          {timerMode === TimerMode.INTERVALS && (
            <div className="text-center animate-fade-in">
               <h3 className="text-2xl font-light mb-2 text-[var(--text-primary)]">Pomodoro Technique</h3>
               <p className="text-[var(--text-secondary)] text-sm mb-6 font-light">25 minutes focus, then 5 minutes rest.</p>
               <button 
                 onClick={handlePomodoroClick}
                 className="btn-mechanical-active px-6 py-3 font-medium rounded-lg"
               >
                 Begin Session
               </button>
            </div>
          )}

        </div>

        {/* Toggle Quotes */}
        <div className="flex items-center justify-between border-t border-[var(--border)] pt-6">
          <div>
            <div className="text-[var(--text-primary)] font-medium text-sm">Display Quotes</div>
            <div className="text-[var(--text-secondary)] text-xs font-light">Inspirational quotes replace the timer.</div>
          </div>
          <button 
            className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out border ${
              quotesEnabled 
                ? 'bg-[var(--accent)] border-[var(--accent)]' 
                : 'bg-[var(--bg-secondary)] border-[var(--border)]'
            }`}
            onClick={() => setQuotesEnabled(!quotesEnabled)}
          >
            <div className={`bg-[var(--bg-primary)] w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out border border-[var(--border)] ${quotesEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerModal;