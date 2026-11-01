import React, { useState, useRef } from 'react';
import { X, Upload, Image as ImageIcon, CheckCircle2, Sparkles, Link as LinkIcon, RotateCcw } from 'lucide-react';

interface LogoUploadModalProps {
  currentLogoUrl: string;
  onSaveLogo: (url: string) => Promise<boolean>;
  onClose: () => void;
}

export const LogoUploadModal: React.FC<LogoUploadModalProps> = ({
  currentLogoUrl,
  onSaveLogo,
  onClose,
}) => {
  const [logoInput, setLogoInput] = useState(currentLogoUrl || '');
  const [previewUrl, setPreviewUrl] = useState(currentLogoUrl || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Preset job portal logos for instant selection
  const presets = [
    {
      name: 'গোল্ডেন ক্যারিয়ার প্রতীক',
      url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=128&auto=format&fit=crop&q=80',
    },
    {
      name: 'সরকারি জবস প্রতীক',
      url: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=128&auto=format&fit=crop&q=80',
    },
    {
      name: 'কর্পোরেট এম্প্লয়মেন্ট ক্রেস্ট',
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=128&auto=format&fit=crop&q=80',
    },
  ];

  // Handle local file selection from device
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('দয়া করে শুধুমাত্র ছবি (JPG, PNG, WebP) ফাইল সিলেক্ট করুন।');
      return;
    }

    // Limit to 3MB for data URL
    if (file.size > 3 * 1024 * 1024) {
      setError('ছবির সাইজ ৩ মেগাবাইটের কম হতে হবে।');
      return;
    }

    setError('');
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPreviewUrl(reader.result);
        setLogoInput(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const success = await onSaveLogo(previewUrl);
    setSaving(false);
    if (success) {
      onClose();
    } else {
      setError('লোগো সংরক্ষণ করা যায়নি। পুনরায় চেষ্টা করুন।');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/70 p-4 backdrop-blur-xs animate-fade-in font-['Hind_Siliguri']">
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
              <ImageIcon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                ওয়েবসাইটের নতুন লোগো পরিবর্তন
              </h3>
              <p className="text-xs text-slate-500">আপনার মোবাইল/কম্পিউটার থেকে ছবি আপলোড করুন বা লিংক দিন</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="mt-5 space-y-5">
          {/* Live Preview */}
          <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-50 p-4 border border-dashed border-slate-300">
            <span className="text-xs font-semibold text-slate-500 mb-2">লোগো প্রিভিউ (লাইভ):</span>
            <div className="flex items-center gap-3">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Logo Preview"
                  className="h-14 w-14 rounded-2xl object-cover shadow-md border border-slate-200 bg-white"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white font-bold shadow-md">
                  লোগো
                </div>
              )}
              <div>
                <p className="text-sm font-bold text-slate-800">বিডি জবস সার্কুলার</p>
                <p className="text-[11px] text-slate-500">অফিশিয়াল পোর্টাল</p>
              </div>
            </div>
          </div>

          {/* Option 1: File Upload from Device */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              ১. আপনার ডিভাইস থেকে ছবি ফাইল সিলেক্ট করুন:
            </label>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50/50 p-3 text-xs sm:text-sm font-bold text-emerald-800 hover:bg-emerald-100/60 active:scale-98 transition-all"
            >
              <Upload className="h-4 w-4 text-emerald-600" />
              <span>ফাইল বা ছবি বেছে নিন (Upload Image)</span>
            </button>
          </div>

          {/* Option 2: Image URL input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <LinkIcon className="h-3.5 w-3.5 text-slate-500" />
              <span>২. অথবা ছবির অনলাইন লিংক (URL) লিখুন:</span>
            </label>
            <input
              type="url"
              value={logoInput}
              onChange={(e) => {
                setLogoInput(e.target.value);
                setPreviewUrl(e.target.value);
              }}
              placeholder="https://example.com/logo.png"
              className="w-full rounded-xl border border-slate-300 p-2.5 text-xs sm:text-sm font-mono text-slate-800 focus:border-emerald-500 focus:outline-hidden"
            />
          </div>

          {/* Presets */}
          <div>
            <span className="block text-xs font-bold text-slate-600 mb-2">
              ৩. অথবা নিচের রেডিমেড স্টাইলিশ লোগো ব্যবহার করুন:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setPreviewUrl(preset.url);
                    setLogoInput(preset.url);
                  }}
                  className="flex flex-col items-center gap-1 rounded-xl border border-slate-200 p-2 hover:border-emerald-500 hover:bg-emerald-50/30 transition-all text-center"
                >
                  <img
                    src={preset.url}
                    alt={preset.name}
                    className="h-8 w-8 rounded-lg object-cover"
                  />
                  <span className="text-[10px] text-slate-600 font-medium truncate w-full">
                    {preset.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="rounded-xl bg-rose-50 p-2 text-xs font-semibold text-rose-600 border border-rose-200">
              {error}
            </p>
          )}

          {/* Action Buttons */}
          <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                setPreviewUrl('');
                setLogoInput('');
              }}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800"
            >
              <RotateCcw className="h-3 w-3" />
              <span>রিসেট</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                বাতিল
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 px-6 py-2 text-xs sm:text-sm font-bold text-white shadow-md hover:from-emerald-700 hover:to-teal-800 disabled:opacity-50 active:scale-95 transition-all"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>{saving ? 'সংরক্ষণ হচ্ছে...' : 'লোগো সেভ করুন'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
