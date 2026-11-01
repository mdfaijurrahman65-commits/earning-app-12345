import React from 'react';
import { Search, Sparkles, AlertCircle, Building2, Landmark, GraduationCap, Laptop, ChevronRight } from 'lucide-react';
import { JobCategory } from '../types';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: JobCategory | 'all';
  onSelectCategory: (category: JobCategory | 'all') => void;
  totalJobs: number;
  totalVacancies: number;
  noticeText: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  totalJobs,
  totalVacancies,
  noticeText,
}) => {
  const quickCategories: { id: JobCategory; name: string; icon: React.ReactNode; color: string }[] = [
    { id: 'govt', name: 'সরকারি চাকরি', icon: <Landmark className="h-4 w-4" />, color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    { id: 'bank', name: 'ব্যাংক জবস', icon: <Building2 className="h-4 w-4" />, color: 'bg-blue-50 text-blue-800 border-blue-200' },
    { id: 'teacher', name: 'শিক্ষক নিয়োগ', icon: <GraduationCap className="h-4 w-4" />, color: 'bg-amber-50 text-amber-800 border-amber-200' },
    { id: 'it', name: 'আইটি ও সফটওয়্যার', icon: <Laptop className="h-4 w-4" />, color: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-800 to-teal-900 text-white pt-8 pb-12 px-4 sm:px-6">
      {/* Background subtle decorative patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-5xl text-center">
        {/* Notice ticker banner */}
        {noticeText && (
          <div className="mx-auto mb-6 inline-flex max-w-3xl items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-4 py-1.5 text-xs text-emerald-100 border border-white/20 shadow-inner">
            <span className="flex h-2 w-2 rounded-full bg-rose-400 animate-ping shrink-0" />
            <span className="font-semibold text-amber-300 shrink-0">জরুরি নোটিশ:</span>
            <span className="truncate">{noticeText}</span>
          </div>
        )}

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-['Hind_Siliguri'] leading-tight sm:leading-snug">
          বাংলাদেশের সকল <span className="text-amber-300 underline decoration-amber-400 decoration-wavy underline-offset-8">সরকারি ও বেসরকারি চাকরির</span> সার্কুলার
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-emerald-100 font-normal">
          সরাসরি আবেদনের লিঙ্ক, অফিশিয়াল বিজ্ঞপ্তি ইমেজ ডাউনলোড ও টেলিটক এসএমএস ফরম্যাটসহ সর্বশেষ তথ্যাবলী
        </p>

        {/* Big Search Bar */}
        <div className="mx-auto mt-8 max-w-3xl">
          <div className="relative flex items-center rounded-2xl bg-white p-2 shadow-xl ring-4 ring-black/10">
            <div className="flex pl-3 text-slate-400">
              <Search className="h-6 w-6 text-emerald-600" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="পদের নাম, প্রতিষ্ঠান (যেমন: রেলওয়ে, সোনালী ব্যাংক, প্রাইমারি শিক্ষক) লিখে খুঁজুন..."
              className="w-full border-none bg-transparent px-3 py-2 text-sm sm:text-base text-slate-800 placeholder-slate-400 focus:outline-hidden font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="mr-2 text-xs text-slate-400 hover:text-slate-600 px-2 py-1"
              >
                ক্লিয়ার
              </button>
            )}
            <button
              onClick={() => onSearchChange(searchQuery)}
              className="shrink-0 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:from-emerald-700 hover:to-teal-700 active:scale-95 transition-all"
            >
              অনুসন্ধান
            </button>
          </div>
        </div>

        {/* Quick Category Chips */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-emerald-200 font-medium mr-1">জনপ্রিয় ক্যাটাগরি:</span>
          {quickCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(selectedCategory === cat.id ? 'all' : cat.id)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-amber-400 text-slate-900 border-amber-300 shadow-sm font-bold scale-105'
                  : 'bg-white/15 text-white border-white/20 hover:bg-white/25'
              }`}
            >
              {cat.icon}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Live Counters */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto pt-4 border-t border-emerald-700/50">
          <div className="rounded-xl bg-white/5 backdrop-blur-xs p-2.5 border border-white/10">
            <p className="text-xl sm:text-2xl font-bold text-amber-300">{totalJobs} টি</p>
            <p className="text-xs text-emerald-200">চলমান সার্কুলার</p>
          </div>
          <div className="rounded-xl bg-white/5 backdrop-blur-xs p-2.5 border border-white/10">
            <p className="text-xl sm:text-2xl font-bold text-emerald-200">{totalVacancies.toLocaleString('bn-BD')} টি+</p>
            <p className="text-xs text-emerald-200">মোট খালি পদ</p>
          </div>
          <div className="col-span-2 sm:col-span-1 rounded-xl bg-white/5 backdrop-blur-xs p-2.5 border border-white/10">
            <p className="text-xl sm:text-2xl font-bold text-rose-300">১০০% ভেরিফাইড</p>
            <p className="text-xs text-emerald-200">দৈনিক পত্রিকা ও গেজেট</p>
          </div>
        </div>
      </div>
    </div>
  );
};
