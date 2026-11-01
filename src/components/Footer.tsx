import React from 'react';
import { Briefcase, Heart, Shield, FileText, Send, DollarSign } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { JobCategory } from '../types';

interface FooterProps {
  onSelectCategory: (cat: JobCategory | 'all') => void;
  onOpenCalculator: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenCalculator,
  onOpenAdmin,
}) => {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white text-slate-600 text-xs sm:text-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-bold">
                <Briefcase className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-['Hind_Siliguri']">
                বিডি জবস সার্কুলার
              </h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              বাংলাদেশের সকল সরকারি, বেসরকারি ও ব্যাংক চাকরির সর্বশেষ নিয়োগ বিজ্ঞপ্তি, পরীক্ষার সময়সূচি ও সরাসরি আবেদন পোর্টাল।
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs">
              <a
                href="/ads.txt"
                target="_blank"
                className="text-emerald-700 font-semibold hover:underline"
              >
                ads.txt ভেরিফিকেশন
              </a>
              <span>•</span>
              <button onClick={onOpenCalculator} className="text-emerald-700 font-semibold hover:underline">
                বিজ্ঞাপন আয় গাইড
              </button>
            </div>
          </div>

          {/* Job Categories */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">চাকরির ক্যাটাগরি</h4>
            <ul className="space-y-1.5 text-xs text-slate-500">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    className="hover:text-emerald-700 transition-colors"
                  >
                    {cat.nameBn}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Tools */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">প্রয়োজনীয় সেবা</h4>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li>
                <span className="hover:text-emerald-700 cursor-pointer">টেলিটক এসএমএস আবেদন নিয়ম</span>
              </li>
              <li>
                <span className="hover:text-emerald-700 cursor-pointer">বিসিএস ও ব্যাংক মডেল টেস্ট</span>
              </li>
              <li>
                <span className="hover:text-emerald-700 cursor-pointer">সাম্প্রতিক সাধারণ জ্ঞান ২০২৬</span>
              </li>
              <li>
                <span className="hover:text-emerald-700 cursor-pointer">ভাইভা বোর্ড টিপস ও সিভি</span>
              </li>
              <li>
                <button onClick={onOpenAdmin} className="text-slate-700 font-bold hover:text-emerald-700">
                  এডমিন ড্যাশবোর্ড (সার্কুলার আপলোড)
                </button>
              </li>
            </ul>
          </div>

          {/* Disclaimer & Transparency */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">সতর্কীকরণ ও তথ্যসূত্র</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              এই পোর্টালের সকল সার্কুলার দৈনিক জাতীয় পত্রিকা ও সরকারি বিভিন্ন মন্ত্রণালয়/প্রতিষ্ঠানের অফিশিয়াল গেজেট থেকে সংগৃহীত। আবেদন করার পূর্বে অফিশিয়াল মূল বিজ্ঞপ্তি যাচাই করে নেওয়া বাঞ্ছনীয়।
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© ২০২৬ বিডি জবস সার্কুলার পোর্টাল। সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="flex items-center gap-1">
            বাংলাদেশের চাকরিপ্রার্থীদের জন্য তৈরি <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
};
