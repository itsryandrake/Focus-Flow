import React, { useState, useEffect } from 'react';
import { X, User, Trophy, Calendar, Clock, Activity, Heart, Play, Trash2 } from 'lucide-react';
import { StorageService } from '../services/storageService';
import { UserProfile, FavoriteTrack } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void; // Callback to refresh parent data
  onPlayTrack?: (track: FavoriteTrack) => void; // Optional callback to play a track
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onUpdate, onPlayTrack }) => {
  const [profile, setProfile] = useState<UserProfile>(StorageService.getProfile());
  const [favorites, setFavorites] = useState<FavoriteTrack[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState('');
  const [activeTab, setActiveTab] = useState<'stats' | 'favorites'>('stats');

  useEffect(() => {
    if (isOpen) {
      const p = StorageService.getProfile();
      setProfile(p);
      setTempName(p.name);
      setIsEditing(!p.name); // Auto edit if no name
      setFavorites(StorageService.getFavorites());
    }
  }, [isOpen]);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      StorageService.updateName(tempName.trim());
      setProfile({ ...profile, name: tempName.trim() });
      setIsEditing(false);
      onUpdate();
    }
  };

  const handleRemoveFavorite = (videoId: string) => {
    StorageService.removeFavorite(videoId);
    setFavorites(StorageService.getFavorites());
  };

  const handlePlayFavorite = (track: FavoriteTrack) => {
    if (onPlayTrack) {
      onPlayTrack(track);
      onClose();
    }
  };

  if (!isOpen) return null;

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatAddedDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md surface-panel rounded-3xl p-8 relative max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
        >
          <X size={20} />
        </button>

        {/* Profile Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 bg-[var(--bg-secondary)] border-2 border-[var(--accent)]/30 rounded-full flex items-center justify-center mb-4 hover:border-[var(--accent)] transition-colors">
            <User size={40} className="text-[var(--accent)]" />
          </div>
          
          {isEditing ? (
            <form onSubmit={handleSaveName} className="flex flex-col items-center gap-2 w-full max-w-[240px]">
              <input 
                type="text" 
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg px-4 py-2 text-center text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                autoFocus
              />
              <button 
                type="submit"
                className="btn-mechanical text-xs font-medium text-[var(--accent)] px-3 py-1 rounded-lg uppercase tracking-wider"
              >
                Save
              </button>
            </form>
          ) : (
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setIsEditing(true)}>
              <h2 className="text-2xl font-light text-[var(--text-primary)]">{profile.name || 'Anonymous User'}</h2>
              <span className="text-xs text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">(edit)</span>
            </div>
          )}
          <p className="text-[var(--text-secondary)] text-sm mt-1 font-light">Member since {formatDate(profile.memberSince)}</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
              activeTab === 'stats' 
                ? 'btn-mechanical-active' 
                : 'btn-mechanical text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Statistics
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${
              activeTab === 'favorites' 
                ? 'btn-mechanical-active' 
                : 'btn-mechanical text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Heart size={14} className={activeTab === 'favorites' ? 'fill-current' : ''} />
            Favourites ({favorites.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'stats' ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[var(--bg-secondary)] rounded-lg p-4 flex flex-col items-center text-center hover:border-[var(--accent)] transition-colors border border-[var(--border)]">
                <Trophy className="w-6 h-6 text-[var(--accent)] mb-2" />
                <div className="text-2xl font-light text-[var(--text-primary)] mb-1">{profile.currentStreak}</div>
                <div className="text-xs text-[var(--text-secondary)] uppercase tracking-wider font-light">Day Streak</div>
              </div>
              
              <div className="bg-[var(--bg-secondary)] rounded-lg p-4 flex flex-col items-center text-center hover:border-[var(--accent)] transition-colors border border-[var(--border)]">
                <Activity className="w-6 h-6 text-[var(--chrome)] mb-2" />
                <div className="text-2xl font-light text-[var(--text-primary)] mb-1">{profile.totalSessions}</div>
                <div className="text-xs text-[var(--text-secondary)] uppercase tracking-wider font-light">Total Sessions</div>
              </div>

              <div className="bg-[var(--bg-secondary)] rounded-lg p-4 flex flex-col items-center text-center hover:border-[var(--accent)] transition-colors border border-[var(--border)] col-span-2">
                <Clock className="w-6 h-6 text-[var(--chrome)] mb-2" />
                <div className="text-2xl font-light text-[var(--text-primary)] mb-1">{Math.floor(profile.totalMinutes)}</div>
                <div className="text-xs text-[var(--text-secondary)] uppercase tracking-wider font-light">Minutes Focused</div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {favorites.length === 0 ? (
                <div className="text-center py-8">
                  <Heart size={40} className="mx-auto text-[var(--text-secondary)]/30 mb-3" />
                  <p className="text-[var(--text-secondary)] text-sm">No favourites yet</p>
                  <p className="text-[var(--text-secondary)]/70 text-xs mt-1">Tap the Save button whilst playing a track to save it here</p>
                </div>
              ) : (
                favorites.map((track) => (
                  <div 
                    key={track.videoId}
                    className="bg-[var(--bg-secondary)] rounded-lg p-4 flex items-center gap-3 hover:border-[var(--accent)] transition-colors border border-[var(--border)] group"
                  >
                    {/* Play button */}
                    <button
                      onClick={() => handlePlayFavorite(track)}
                      className="btn-mechanical w-10 h-10 rounded-full flex items-center justify-center text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all flex-shrink-0"
                    >
                      <Play size={16} className="ml-0.5" fill="currentColor" />
                    </button>

                    {/* Track info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[var(--text-primary)] font-medium text-sm truncate">{track.title}</h4>
                      <div className="flex items-center gap-2 text-[var(--text-secondary)] text-xs">
                        {track.category && <span>{track.category}</span>}
                        {track.category && <span>•</span>}
                        <span>Added {formatAddedDate(track.addedAt)}</span>
                      </div>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => handleRemoveFavorite(track.videoId)}
                      className="p-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors opacity-0 group-hover:opacity-100"
                      title="Remove from favourites"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
