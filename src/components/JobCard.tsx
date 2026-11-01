import React from 'react';
import {
  Calendar,
  Users,
  GraduationCap,
  MapPin,
  ExternalLink,
  Bookmark,
  Share2,
  Clock,
  Sparkles,
  Edit3,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { JobCircular } from '../types';
import { CATEGORIES } from '../data/categories';

interface JobCardProps {
  job: JobCircular;
  isBookmarked: boolean;
  onToggleBookmark: (jobId: string) => void;
  onViewDetails: (job: JobCircular) => void;
  onEditJob?: (job: JobCircular) => void;
  onShare: (job: JobCircular) => void;
  isAdminLoggedIn?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  isBookmarked,
  onToggleBookmark,
  onViewDetails,
  onEditJob,
  onShare,
  isAdminLoggedIn,
}) => {
  // Category styling
  const categoryInfo = CATEGORIES.find((c) => c.id === job.category) || {
    nameBn: 'অন্যান্য',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
  };

  // Calculate days remaining
  const calculateDaysLeft = (deadlineDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadline = new Date(deadlineDate);
    deadline.setHours(0, 0, 0, 0);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = calculateDaysLeft(job.deadline);
  const isExpired = daysLeft < 0;
  const isUrgent = daysLeft >= 0 && daysLeft <= 3;

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl border bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
        job.isFeatured
          ? 'border-amber-300 ring-2 ring-amber-400/20 shadow-md'
          : 'border-slate-200/90 shadow-2xs hover:border-emerald-300'
      }`}
    >
      {/* Top badges: Category, Featured & Urgent */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold border ${categoryInfo.badgeColor}`}
            >
              {categoryInfo.nameBn}
            </span>

            {job.isFeatured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-2.5 py-0.5 text-[10px] font-extrabold text-white shadow-2xs">
                <Flame className="h-3 w-3" />
                <span>হট জবস</span>
              </span>
            )}

            {daysLeft === 0 ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-rose-600 to-red-600 px-2.5 py-0.5 text-[10px] font-extrabold text-white shadow-xs ring-2 ring-rose-400 animate-pulse">
                <Clock className="h-3 w-3" />
                <span>🚨 আজই শেষ দিন!</span>
              </span>
            ) : isUrgent ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-bold text-white">
                <Clock className="h-2.5 w-2.5" />
                <span>আর {daysLeft} দিন বাকি</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 border border-emerald-100">
                <Clock className="h-2.5 w-2.5 text-emerald-600" />
                <span>আর {daysLeft} দিন বাকি</span>
              </span>
            )}
          </div>

          {/* Quick action buttons: Bookmark & Share */}
          <div className="flex items-center gap-1">
            {isAdminLoggedIn && onEditJob && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditJob(job);
                }}
                className="rounded-lg bg-amber-50 p-1.5 text-amber-700 hover:bg-amber-100 transition-colors"
                title="সার্কুলার ও লিঙ্ক এডিট করুন"
              >
                <Edit3 className="h-4 w-4" />
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(job.id);
              }}
              className={`rounded-lg p-1.5 transition-colors ${
                isBookmarked
                  ? 'bg-rose-50 text-rose-600'
                  : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'
              }`}
              title={isBookmarked ? 'সংরক্ষণ বাতিল' : 'সংরক্ষণ করুন'}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-rose-600' : ''}`} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onShare(job);
              }}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              title="শেয়ার করুন (WhatsApp / FB)"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Organization & Job Title */}
        <div className="mt-3 cursor-pointer" onClick={() => onViewDetails(job)}>
          <p className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
            {job.organization}
          </p>
          <h2 className="mt-1 text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-800 leading-snug line-clamp-2">
            {job.title}
          </h2>
        </div>

        {/* Quick Specs Grid */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 p-2">
            <Users className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">
              পদ সংখ্যা: <strong className="text-slate-900 font-bold">{job.vacancies} জন</strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 p-2">
            <GraduationCap className="h-3.5 w-3.5 text-blue-600 shrink-0" />
            <span className="truncate" title={job.education}>
              যোগ্যতা: <strong className="text-slate-900">{job.education}</strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 p-2">
            <MapPin className="h-3.5 w-3.5 text-amber-600 shrink-0" />
            <span className="truncate" title={job.district || job.location}>
              জেলা: <strong className="text-slate-900">{job.district || job.location}</strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 p-2">
            <Calendar className="h-3.5 w-3.5 text-rose-600 shrink-0" />
            <span className="truncate">
              শেষ তারিখ: <strong className="text-rose-700 font-semibold">{job.deadline}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Footer action buttons */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="text-[11px] text-slate-400">
          <span>প্রকাশ: {job.publishDate}</span>
          {job.views > 0 && <span className="ml-2">👁️ {job.views} বার দেখা হয়েছে</span>}
        </div>

        <div className="flex items-center gap-2">
          {job.applyLink && (
            <a
              href={job.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="hidden sm:inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-700 transition-colors"
              title="সরাসরি আবেদনের লিঙ্ক"
            >
              <span>আবেদন লিঙ্ক</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          )}

          <button
            onClick={() => onViewDetails(job)}
            className="flex items-center gap-1 rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 active:scale-95 transition-all"
          >
            <span>বিস্তারিত সার্কুলার</span>
          </button>
        </div>
      </div>
    </div>
  );
};
