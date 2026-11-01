import React from 'react';
import {
  Briefcase,
  Bookmark,
  ShieldCheck,
  BookOpen,
  DollarSign,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

interface NavbarProps {
  currentTab: 'jobs' | 'prep' | 'admin' | 'teletalk' | 'calculator';
  onSelectTab: (tab: 'jobs' | 'prep' | 'admin' | 'teletalk' | 'calculator') => void;
  bookmarksCount: number;
  onOpenBookmarks: () => void;
  siteName: string;
  siteLogoUrl?: string;
  onOpenLogoUpload?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  bookmarksCount,
  onOpenBookmarks,
  siteName,
  siteLogoUrl,
  onOpenLogoUpload,
}) => {
  return (
    <header className="sticky top-0 z-30 border-b border-emerald-900/10 bg-white/95 backdrop-blur-md shadow-xs">
      {/* Top micro bar for breaking notification & quick stats */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 px-4 py-1.5 text-xs text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-emerald-200">লাইভ আপডেট:</span>
            <span className="truncate text-emerald-100 font-normal">
              আজকে প্রকাশিত সকল সরকারি ও ব্যাংক সার্কুলারের ডেডলাইন ও সরাসরি আবেদন লিঙ্ক
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-emerald-200 shrink-0 font-medium">
            <span>🇧🇩 সমগ্র বাংলাদেশ</span>
            <span>✓ ভেরিফায়েড সার্কুলার</span>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand identity */}
        <div
          onClick={() => onSelectTab('jobs')}
          className="flex cursor-pointer items-center gap-3 transition-opacity hover:opacity-90"
        >
          <div className="relative group/logo">
            {siteLogoUrl ? (
              <img
                src={siteLogoUrl}
                alt={siteName || 'Logo'}
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl object-cover shadow-md border border-slate-200/80 bg-white"
              />
            ) : (
              <div className="relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-800 text-white shadow-md shadow-emerald-700/20">
                <Briefcase className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[9px] font-bold text-slate-900 ring-2 ring-white shadow-xs">
                  ★
                </span>
              </div>
            )}
            {onOpenLogoUpload && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenLogoUpload();
                }}
                className="absolute -top-1.5 -right-1.5 hidden group-hover/logo:flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] text-white shadow-md hover:bg-emerald-700"
                title="লোগো পরিবর্তন করুন"
              >
                ✎
              </button>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 font-['Hind_Siliguri']">
                {siteName || 'BD Job Alert (বিডি জব অ্যালার্ট)'}
              </h1>
              <span className="hidden md:inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                অফিশিয়াল পোর্টাল
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium hidden sm:block">
              নিয়মিত সরকারি, ব্যাংক ও বেসরকারি চাকরির খবর ও প্রস্তুতি
            </p>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => onSelectTab('jobs')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs sm:text-sm font-semibold transition-all ${
              currentTab === 'jobs'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Briefcase className="h-4 w-4" />
            <span className="hidden md:inline">সকল সার্কুলার</span>
            <span className="md:hidden">জবস</span>
          </button>

          <button
            onClick={() => onSelectTab('prep')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs sm:text-sm font-semibold transition-all ${
              currentTab === 'prep'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <BookOpen className="h-4 w-4 text-amber-500" />
            <span>চাকরি প্রস্তুতি</span>
            <span className="rounded-full bg-amber-100 px-1.5 py-0.2 text-[10px] font-bold text-amber-800 border border-amber-200">
              কুইজ
            </span>
          </button>

          <button
            onClick={() => onSelectTab('teletalk')}
            className={`hidden lg:flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs sm:text-sm font-semibold transition-all ${
              currentTab === 'teletalk'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="h-4 w-4 text-blue-500" />
            <span>টেলিটক এসএমএস</span>
          </button>

          <button
            onClick={() => onSelectTab('calculator')}
            className={`hidden sm:flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs sm:text-sm font-semibold transition-all ${
              currentTab === 'calculator'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <DollarSign className="h-4 w-4 text-emerald-600" />
            <span>অ্যাড আয় গাইড</span>
          </button>

          {/* Bookmarks counter button */}
          <button
            onClick={onOpenBookmarks}
            className="relative flex items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:scale-95 transition-all"
            title="সংরক্ষিত চাকরি"
          >
            <Bookmark className="h-4 w-4 text-slate-700" />
            {bookmarksCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white ring-2 ring-white animate-scale">
                {bookmarksCount}
              </span>
            )}
          </button>

          {/* Admin panel button */}
          <button
            onClick={() => onSelectTab('admin')}
            className={`flex items-center gap-1.5 rounded-xl border px-3 sm:px-3.5 py-2 text-xs sm:text-sm font-bold transition-all shadow-xs ${
              currentTab === 'admin'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'border-emerald-600 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span className="hidden sm:inline">সার্কুলার আপলোড (এডমিন)</span>
            <span className="sm:hidden">এডমিন</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
