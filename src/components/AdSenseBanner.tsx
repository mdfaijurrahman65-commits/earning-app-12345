import React, { useState } from 'react';
import { ExternalLink, Sparkles, TrendingUp, Info } from 'lucide-react';
import { AdSettings } from '../types';

interface AdSenseBannerProps {
  position: 'header' | 'in-feed' | 'article-top' | 'article-bottom' | 'sidebar' | 'sticky-footer';
  settings?: AdSettings;
  className?: string;
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({
  position,
  settings,
  className = '',
}) => {
  const isDemo = settings?.adsMode !== 'live';
  const adSenseEnabled = settings?.adSense?.enabled ?? true;
  const [clicked, setClicked] = useState(false);
  const [closed, setClosed] = useState(false);

  if (!adSenseEnabled || closed) {
    return null;
  }

  // Pre-configured sponsor styles for demo/preview mode with realistic high-CTR BD advertisers
  const demoSponsors = {
    header: {
      title: 'বিসিএস ও ব্যাংক জব স্পেশাল অনলাইন কোর্স - ৫০% ডিসকাউন্ট!',
      subtitle: 'লাইভ ক্লাস, বিষয়ভিত্তিক লেকচার শিট ও ১০০+ মডেল টেস্টের সুযোগ। আজই ভর্তি হন।',
      sponsorName: 'ক্যারিয়ার কেয়ার একাডেমি',
      cta: 'কোর্স দেখুন',
      badge: 'বিজ্ঞাপন / Sponsored',
      theme: 'from-amber-600 to-orange-700',
      tag: 'শীর্ষ রেটেড',
    },
    'in-feed': {
      title: 'প্রাইমারি শিক্ষক ও সরকারি চাকরি স্পেশাল সাজেশন বুক ২০২৬',
      subtitle: 'বিগত ২০ বছরের প্রশ্নব্যাংক এবং নিশ্চিত কমন উপযোগী শর্ট টেকনিক হ্যান্ডনোট। ঘরে বসেই ক্যাশ অন ডেলিভারি নিন।',
      sponsorName: 'বিদ্যাবাড়ি প্রকাশনী',
      cta: 'অর্ডার করুন',
      badge: 'বিজ্ঞাপন / Ad',
      theme: 'from-blue-600 to-indigo-700',
      tag: 'সেরা অফার',
    },
    'article-top': {
      title: 'ঘরে বসে প্রফেশনাল স্পোকেন ইংলিশ ও আইটি স্কিল শিখুন',
      subtitle: 'সহজে ফ্রি ডেমো ক্লাস করে আপনার চাকরি পাওয়ার সম্ভাবনা ৩ গুণ বৃদ্ধি করুন।',
      sponsorName: 'স্কিল ল্যাব বাংলাদেশ',
      cta: 'ফ্রি ক্লাস শুরু করুন',
      badge: 'Google AdSense (Responsive)',
      theme: 'from-emerald-600 to-teal-700',
      tag: 'ফ্রি ডেমো',
    },
    'article-bottom': {
      title: 'টেলিটক আবেদন ও সকল চাকরির প্রবেশপত্র সরাসরি এসএমএস অ্যালার্ট!',
      subtitle: 'আপনার জেলা ও শিক্ষাগত যোগ্যতা অনুযায়ী নতুন সার্কুলার ও পরীক্ষার তারিখের ইনস্ট্যান্ট নোটিফিকেশন পান।',
      sponsorName: 'জব নোটিফায়ার প্রো',
      cta: 'অ্যালার্ট চালু করুন',
      badge: 'Google AdSense (Responsive)',
      theme: 'from-rose-600 to-pink-700',
      tag: '১০০% ফ্রি সার্ভিস',
    },
    sidebar: {
      title: 'চাকরির ইন্টারভিউ ও স্মার্ট সিভি বানানোর সেরা টেমপ্লেট',
      subtitle: 'মিনিটেই মোবাইল দিয়ে তৈরি করুন আন্তর্জাতিক মানের বায়োডাটা।',
      sponsorName: 'সিভি মেকার বিডি',
      cta: 'সিভি তৈরি করুন',
      badge: 'বিজ্ঞাপন / Ad',
      theme: 'from-purple-600 to-violet-700',
      tag: 'জনপ্রিয়',
    },
    'sticky-footer': {
      title: '⚡ সোনালী ব্যাংক ও রেলওয়ে স্পেশাল মডেল টেস্ট শুরু হয়েছে!',
      subtitle: 'অনলাইনে এখনই পরীক্ষা দিয়ে আপনার প্রস্তুতি যাচাই করুন।',
      sponsorName: 'মডেল টেস্ট বিডি',
      cta: 'টেস্টে অংশ নিন',
      badge: 'অ্যাডসেন্স ফিক্সড ব্যানার',
      theme: 'from-slate-900 to-slate-800',
      tag: 'লাইভ এক্সাম',
    },
  };

  const ad = demoSponsors[position];

  // If live mode is on, real AdSense container would mount here
  if (!isDemo && settings?.adSense?.publisherId) {
    const slotId =
      position === 'header'
        ? settings.adSense.headerSlot
        : position === 'in-feed'
        ? settings.adSense.inFeedSlot
        : position === 'article-top'
        ? settings.adSense.articleTopSlot
        : position === 'article-bottom'
        ? settings.adSense.articleBottomSlot
        : settings.adSense.sidebarSlot;

    return (
      <div className={`my-4 overflow-hidden rounded-xl border border-slate-200 bg-white p-2 text-center shadow-xs ${className}`}>
        <div className="flex items-center justify-between px-2 pb-1 text-[11px] text-slate-400">
          <span>বিজ্ঞাপন / Ad</span>
          <span>Google AdSense (Slot: {slotId || 'Auto'})</span>
        </div>
        <div className="flex min-h-[90px] items-center justify-center bg-slate-50 text-xs text-slate-500">
          <div className="space-y-1">
            <p className="font-semibold text-slate-700">Google AdSense ব্যানার প্রদর্শিত হচ্ছে</p>
            <p className="text-[11px] text-slate-400">Pub ID: {settings.adSense.publisherId}</p>
          </div>
        </div>
      </div>
    );
  }

  // Sticky footer layout
  if (position === 'sticky-footer') {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-700 bg-slate-900/95 backdrop-blur-md px-3 py-2 text-white shadow-2xl transition-all">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="hidden sm:inline-flex items-center rounded-sm bg-amber-500 px-1.5 py-0.5 text-[10px] font-bold text-slate-950 uppercase tracking-wide">
              {ad.tag}
            </span>
            <div className="truncate">
              <p className="truncate text-sm font-semibold text-white">{ad.title}</p>
              <p className="hidden md:block truncate text-xs text-slate-300">{ad.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setClicked(true)}
              className="rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-md hover:from-emerald-600 hover:to-teal-600 active:scale-95 transition-all"
            >
              {clicked ? '✓ ধন্যবাদ' : ad.cta}
            </button>
            <button
              onClick={() => setClosed(true)}
              className="rounded-full p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
              title="বিজ্ঞাপন বন্ধ করুন"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Header Banner (Leaderboard style)
  if (position === 'header') {
    return (
      <div className={`relative mx-auto my-3 overflow-hidden rounded-xl border border-amber-200/80 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100 p-3 sm:p-4 shadow-xs ${className}`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-sm bg-amber-200 px-1.5 py-0.5 text-[10px] font-bold text-amber-900 uppercase">
                  {ad.badge}
                </span>
                <span className="text-xs text-slate-500 font-medium">{ad.sponsorName}</span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">{ad.title}</h4>
              <p className="text-xs text-slate-600 line-clamp-1">{ad.subtitle}</p>
            </div>
          </div>
          <button
            onClick={() => setClicked(true)}
            className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-sm hover:from-orange-700 hover:to-amber-700 active:scale-95 transition-all"
          >
            <span>{clicked ? '✓ স্পন্সর ভিজিট করা হয়েছে' : ad.cta}</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    );
  }

  // In-Feed Native Ad (Blends naturally with Job cards, highest CTR!)
  if (position === 'in-feed') {
    return (
      <div className={`my-4 overflow-hidden rounded-2xl border-2 border-dashed border-indigo-200 bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/70 p-4 sm:p-5 shadow-xs transition-all hover:border-indigo-400 ${className}`}>
        <div className="flex items-center justify-between pb-2 border-b border-indigo-100/80">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-indigo-100 px-2 py-0.5 text-[11px] font-bold text-indigo-700">
              {ad.badge}
            </span>
            <span className="text-xs text-slate-500">{ad.sponsorName}</span>
          </div>
          <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
            <TrendingUp className="h-3 w-3" /> স্পন্সরড অফার
          </span>
        </div>

        <div className="mt-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">{ad.title}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{ad.subtitle}</p>
          </div>
          <button
            onClick={() => setClicked(true)}
            className="w-full md:w-auto shrink-0 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md hover:from-indigo-700 hover:to-blue-700 active:scale-95 transition-all text-center flex items-center justify-center gap-2"
          >
            <span>{clicked ? '✓ লোড হচ্ছে...' : ad.cta}</span>
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  // Article Top / Bottom & Sidebar default
  return (
    <div className={`my-4 overflow-hidden rounded-xl border border-slate-200 bg-white p-3 sm:p-4 shadow-xs ${className}`}>
      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
        <span className="font-medium bg-slate-100 px-2 py-0.5 rounded-sm text-slate-600">{ad.badge}</span>
        <span className="flex items-center gap-1 text-slate-400">
          <Info className="h-3 w-3" /> {ad.sponsorName}
        </span>
      </div>
      <div className="rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 p-3 sm:p-4 border border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <h4 className="text-sm sm:text-base font-bold text-slate-900">{ad.title}</h4>
          <p className="text-xs text-slate-600 mt-1">{ad.subtitle}</p>
        </div>
        <button
          onClick={() => setClicked(true)}
          className="shrink-0 rounded-lg bg-emerald-600 px-4 py-2 text-xs sm:text-sm font-bold text-white hover:bg-emerald-700 active:scale-95 transition-all"
        >
          {clicked ? '✓ বিস্তারিত লোড হচ্ছে' : ad.cta}
        </button>
      </div>
    </div>
  );
};
