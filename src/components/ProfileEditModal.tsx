import React, { useState, useRef } from "react";
import { X, Camera, User, Check, Pencil } from "lucide-react";

export interface UserProfile {
  name: string;
  avatarUrl: string;
  bio: string;
}

interface ProfileEditModalProps {
  profile: UserProfile;
  userLevel: number;
  userPoints: number;
  onSave: (updated: UserProfile) => void;
  onClose: () => void;
}

const AVATAR_PRESETS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=120&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=120&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
];

export default function ProfileEditModal({
  profile,
  userLevel,
  userPoints,
  onSave,
  onClose,
}: ProfileEditModalProps) {
  const [name, setName] = useState(profile.name);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl);
  const [bio, setBio] = useState(profile.bio);
  const [customUrl, setCustomUrl] = useState("");
  const [showCustomUrl, setShowCustomUrl] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({ name: name.trim(), avatarUrl, bio: bio.trim() });
    setSaved(true);
    setTimeout(() => onClose(), 600);
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,42,0.55)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Modal card */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-fadeInUp">

        {/* Top emerald header strip */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 px-6 pt-8 pb-16 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <h2 className="font-black text-lg tracking-tight">Edit Profile</h2>
          <p className="text-emerald-100 text-xs mt-0.5">Customize your Verdant identity</p>
        </div>

        {/* Avatar centered over the strip */}
        <div className="flex justify-center -mt-12 mb-4 relative z-10">
          <div className="relative group">
            <img
              src={avatarUrl}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop";
              }}
            />
            {/* Level badge */}
            <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white text-[11px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow">
              {userLevel}
            </span>
          </div>
        </div>

        {/* Points chip */}
        <div className="flex justify-center mb-5">
          <span className="px-3 py-1 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[11px] font-bold rounded-full">
            ✦ {userPoints} Stewardship Points
          </span>
        </div>

        {/* Form body */}
        <div className="px-6 pb-6 space-y-4">

          {/* Display Name */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">
              Display Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={30}
                placeholder="Your name..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">
              Bio <span className="text-slate-300 normal-case font-normal">(optional)</span>
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={80}
              rows={2}
              placeholder="Eco warrior, campus sustainability champion..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all resize-none font-medium"
            />
            <p className="text-right text-[10px] text-slate-300 mt-0.5">{bio.length}/80</p>
          </div>

          {/* Avatar Presets */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
              Choose Avatar
            </label>
            <div className="grid grid-cols-6 gap-2">
              {AVATAR_PRESETS.map((url) => (
                <button
                  key={url}
                  type="button"
                  onClick={() => { setAvatarUrl(url); setShowCustomUrl(false); }}
                  className={`relative rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                    avatarUrl === url
                      ? "border-emerald-500 scale-110 shadow-md"
                      : "border-transparent hover:border-slate-300"
                  }`}
                >
                  <img src={url} alt="avatar option" className="w-10 h-10 object-cover" />
                  {avatarUrl === url && (
                    <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-emerald-600" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Custom URL toggle */}
            <button
              type="button"
              onClick={() => setShowCustomUrl((v) => !v)}
              className="mt-2 text-[11px] text-emerald-600 hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <Camera className="w-3 h-3" />
              Use custom image URL
            </button>

            {showCustomUrl && (
              <div className="mt-2 flex gap-2">
                <input
                  type="url"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="https://..."
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
                />
                <button
                  type="button"
                  onClick={() => { if (customUrl.trim()) setAvatarUrl(customUrl.trim()); }}
                  className="px-3 py-2 bg-emerald-500 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            disabled={!name.trim() || saved}
            className={`w-full py-3.5 rounded-2xl font-black text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
              saved
                ? "bg-emerald-500 text-white"
                : "bg-gradient-to-r from-emerald-600 to-teal-500 text-white hover:brightness-110 shadow-lg shadow-emerald-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            }`}
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" /> Saved!
              </>
            ) : (
              <>
                <Pencil className="w-4 h-4" /> Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.28s cubic-bezier(0.34,1.56,0.64,1) both; }
      `}</style>
    </div>
  );
}
