import React, { useState, useEffect } from 'react';
import {
  X,
  Building2,
  Calendar,
  Users,
  GraduationCap,
  MapPin,
  ExternalLink,
  Share2,
  Bookmark,
  DollarSign,
  Download,
  ZoomIn,
  ZoomOut,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  Edit3,
} from 'lucide-react';
import { JobCircular, SiteSettings } from '../types';
import { CATEGORIES } from '../data/categories';
import { AdSenseBanner } from './AdSenseBanner';

interface JobDetailModalProps {
  job: JobCircular | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onShare: (job: JobCircular) => void;
  onEditJob?: (job: JobCircular) => void;
  isAdminLoggedIn?: boolean;
  settings?: SiteSettings;
  onOpenTeletalkHelper?: () => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onShare,
  onEditJob,
  isAdminLoggedIn,
  settings,
  onOpenTeletalkHelper,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    if (!job) return;

    const calculateTime = () => {
      const deadlineDate = new Date(`${job.deadline}T23:59:59`);
      const now = new Date();
      const difference = deadlineDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft(null);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [job]);

  if (!job) return null;

  const categoryInfo = CATEGORIES.find((c) => c.id === job.category);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/70 p-2 sm:p-4 backdrop-blur-xs animate-fade-in">
      <div className="relative flex max-h-[95vh] w-full max-w-4xl flex-col rounded-3xl bg-white shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur-md">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200">
              {categoryInfo?.nameBn || 'সার্কুলার'}
            </span>
            <span className="truncate text-xs font-semibold text-slate-500">
              {job.organization}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isAdminLoggedIn && onEditJob && (
              <button
                onClick={() => onEditJob(job)}
                className="flex items-center gap-1 rounded-xl bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700 hover:bg-amber-100 transition-colors"
                title="সার্কুলার ও লিঙ্ক এডিট করুন"
              >
                <Edit3 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">এডিট করুন</span>
              </button>
            )}

            <button
              onClick={() => onToggleBookmark(job.id)}
              className={`rounded-xl p-2 transition-all ${
                isBookmarked
                  ? 'bg-rose-50 text-rose-600'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
              }`}
              title="বুকমার্ক"
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-rose-600' : ''}`} />
            </button>

            <button
              onClick={() => onShare(job)}
              className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-all"
              title="শেয়ার"
            >
              <Share2 className="h-4 w-4" />
            </button>

            <button
              onClick={onClose}
              className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-800 transition-all"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Top Title & Organization */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
              <Building2 className="h-4 w-4" />
              <span>{job.organization}</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 leading-snug">
              {job.title}
            </h1>
            <p className="text-xs text-slate-400">
              প্রকাশের তারিখ: {job.publishDate} | তথ্যসূত্র: {job.source || 'অফিশিয়াল বিজ্ঞপ্তি'}
            </p>
          </div>

          {/* Ad Placement: Article Top */}
          <AdSenseBanner position="article-top" settings={settings} />

          {/* Deadline Countdown Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 p-4 text-white shadow-md">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-400 animate-pulse" />
                <div>
                  <h4 className="text-sm font-bold text-white">আবেদনের শেষ সময়</h4>
                  <p className="text-xs text-slate-300">শেষ তারিখ: {job.deadline} (রাত ১১:৫৯ মিনিট)</p>
                </div>
              </div>

              {timeLeft ? (
                <div className="flex items-center gap-2 text-center">
                  <div className="rounded-xl bg-white/10 px-3 py-1.5 backdrop-blur-xs">
                    <span className="block text-base font-extrabold text-amber-300">{timeLeft.days}</span>
                    <span className="text-[10px] text-slate-300">দিন</span>
                  </div>
                  <span className="font-bold text-white">:</span>
                  <div className="rounded-xl bg-white/10 px-3 py-1.5 backdrop-blur-xs">
                    <span className="block text-base font-extrabold text-white">{timeLeft.hours}</span>
                    <span className="text-[10px] text-slate-300">ঘণ্টা</span>
                  </div>
                  <span className="font-bold text-white">:</span>
                  <div className="rounded-xl bg-white/10 px-3 py-1.5 backdrop-blur-xs">
                    <span className="block text-base font-extrabold text-white">{timeLeft.minutes}</span>
                    <span className="text-[10px] text-slate-300">মিনিট</span>
                  </div>
                  <span className="font-bold text-white">:</span>
                  <div className="rounded-xl bg-white/10 px-3 py-1.5 backdrop-blur-xs">
                    <span className="block text-base font-extrabold text-emerald-300">{timeLeft.seconds}</span>
                    <span className="text-[10px] text-slate-300">সেকেন্ড</span>
                  </div>
                </div>
              ) : (
                <span className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-bold text-white">
                  আবেদনের সময় শেষ হয়ে গেছে
                </span>
              )}
            </div>
          </div>

          {/* Job Specifications Table */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-2xs">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
              <h3 className="font-bold text-sm text-slate-800">সারসংক্ষেপ ও নিয়োগ তথ্যাবলী</h3>
            </div>
            <div className="divide-y divide-slate-100 text-xs sm:text-sm">
              <div className="grid grid-cols-3 p-3">
                <span className="font-semibold text-slate-500">মোট পদ সংখ্যা</span>
                <span className="col-span-2 font-bold text-emerald-800">{job.vacancies} জন</span>
              </div>
              <div className="grid grid-cols-3 p-3 bg-slate-50/50">
                <span className="font-semibold text-slate-500">বেতন স্কেল / গ্রেড</span>
                <span className="col-span-2 font-medium text-slate-900">{job.salary || 'নিয়ম অনুযায়ী'}</span>
              </div>
              <div className="grid grid-cols-3 p-3">
                <span className="font-semibold text-slate-500">শিক্ষাগত যোগ্যতা</span>
                <span className="col-span-2 font-medium text-slate-900 leading-relaxed">{job.education}</span>
              </div>
              <div className="grid grid-cols-3 p-3 bg-slate-50/50">
                <span className="font-semibold text-slate-500">বয়সসীমা</span>
                <span className="col-span-2 font-medium text-slate-900">{job.ageLimit}</span>
              </div>
              <div className="grid grid-cols-3 p-3">
                <span className="font-semibold text-slate-500">কর্মস্থল / জেলা</span>
                <span className="col-span-2 font-medium text-slate-900">{job.district || job.location}</span>
              </div>
              <div className="grid grid-cols-3 p-3 bg-slate-50/50">
                <span className="font-semibold text-slate-500">আবেদন ফি</span>
                <span className="col-span-2 font-medium text-slate-900">{job.applicationFee}</span>
              </div>
              <div className="grid grid-cols-3 p-3">
                <span className="font-semibold text-slate-500">আবেদনের মাধ্যম</span>
                <span className="col-span-2 font-medium text-slate-900">
                  {job.applyLink?.includes('teletalk') ? 'অনলাইন ও টেলিটক এসএমএস' : 'অনলাইন আবেদন'}
                </span>
              </div>
            </div>
          </div>

          {/* Description & Full Details */}
          {job.description && (
            <div className="space-y-2">
              <h3 className="font-bold text-base text-slate-900">বিজ্ঞপ্তির বিস্তারিত বিবরণ:</h3>
              <div className="rounded-2xl bg-slate-50 p-4 text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line border border-slate-200/80 font-sans">
                {job.description}
              </div>
            </div>
          )}

          {/* Teletalk SMS shortcut helper if applicable */}
          {job.teletalkSmsCode && (
            <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-blue-950">টেলিটক আবেদন ফি এসএমএস কোড: {job.teletalkSmsCode}</h4>
                  <p className="text-xs text-blue-800">
                    এসএমএস ফরম্যাট: <code className="bg-white px-1.5 py-0.5 rounded font-mono font-bold">{job.teletalkSmsCode} &lt;space&gt; USERID send to 16222</code>
                  </p>
                </div>
              </div>
              {onOpenTeletalkHelper && (
                <button
                  onClick={onOpenTeletalkHelper}
                  className="rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700"
                >
                  পূর্ণাঙ্গ এসএমএস গাইড
                </button>
              )}
            </div>
          )}

          {/* Official Circular Image Viewer */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900">অফিশিয়াল নিয়োগ বিজ্ঞপ্তির ছবি (কাটিং)</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomLevel((prev) => Math.max(0.7, prev - 0.2))}
                  className="rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-100"
                  title="জুম আউট"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setZoomLevel((prev) => Math.min(2.5, prev + 0.2))}
                  className="rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-100"
                  title="জুম ইন"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
                <a
                  href={job.circularImage || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200'}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>ডাউনলোড</span>
                </a>
              </div>
            </div>

            <div className="overflow-auto max-h-[500px] rounded-2xl border border-slate-200 bg-slate-100 p-2 text-center flex items-center justify-center">
              <img
                src={job.circularImage || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200'}
                alt={job.title}
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center', transition: 'transform 0.2s ease' }}
                className="max-w-full rounded-lg shadow-sm"
              />
            </div>
          </div>

          {/* Ad Placement: Article Bottom */}
          <AdSenseBanner position="article-bottom" settings={settings} />

          {/* Social Share Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
            <span className="text-xs font-semibold text-slate-600">চাকরিপ্রার্থীদের সাথে শেয়ার করুন:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const shareText = `*${job.title}*\nপ্রতিষ্ঠান: ${job.organization}\nপদ সংখ্যা: ${job.vacancies} জন\nশেষ তারিখ: ${job.deadline}\nআবেদন লিঙ্ক: ${job.applyLink}\nবিস্তারিত দেখুন: ${window.location.href}`;
                  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
                }}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow-xs"
              >
                <span>হোয়াটসঅ্যাপ</span>
              </button>

              <button
                onClick={() => {
                  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
                }}
                className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-700 shadow-xs"
              >
                <span>ফেসবুক</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                {copiedLink ? '✓ লিঙ্ক কপি হয়েছে!' : 'লিঙ্ক কপি'}
              </button>
            </div>
          </div>
        </div>

        {/* Modal Sticky Bottom Action Footer */}
        <div className="sticky bottom-0 border-t border-slate-200 bg-white/95 px-5 py-3 backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            <span className="font-semibold text-slate-700">আবেদনের শেষ তারিখ:</span> {job.deadline}
          </div>

          <div className="flex items-center gap-3">
            {job.applyLink ? (
              <a
                href={job.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-2.5 text-sm font-extrabold text-white shadow-md hover:from-emerald-700 hover:to-teal-700 active:scale-95 transition-all"
              >
                <span>অনলাইনে আবেদন করুন</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : (
              <span className="text-xs text-slate-400">সরাসরি আবেদন লিঙ্ক সংযুক্ত নেই</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
