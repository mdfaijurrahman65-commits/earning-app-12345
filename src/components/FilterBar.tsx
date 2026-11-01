import React from 'react';
import {
  Filter,
  MapPin,
  GraduationCap,
  Clock,
  ArrowUpDown,
  RotateCcw,
  Landmark,
  Building2,
  Laptop,
  Briefcase,
  Shield,
  Globe,
  Stethoscope,
} from 'lucide-react';
import { CATEGORIES, DIVISIONS, POPULAR_DISTRICTS, EDUCATION_LEVELS } from '../data/categories';
import { JobCategory, JobFilterState } from '../types';

interface FilterBarProps {
  filters: JobFilterState;
  onFilterChange: <K extends keyof JobFilterState>(key: K, value: JobFilterState[K]) => void;
  onResetFilters: () => void;
  categoryCounts: Record<string, number>;
  totalCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  categoryCounts,
  totalCount,
}) => {
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'govt':
        return <Landmark className="h-4 w-4" />;
      case 'bank':
        return <Building2 className="h-4 w-4" />;
      case 'teacher':
        return <GraduationCap className="h-4 w-4" />;
      case 'defence':
        return <Shield className="h-4 w-4" />;
      case 'it':
        return <Laptop className="h-4 w-4" />;
      case 'private':
        return <Briefcase className="h-4 w-4" />;
      case 'ngo':
        return <Globe className="h-4 w-4" />;
      case 'medical':
        return <Stethoscope className="h-4 w-4" />;
      default:
        return <Briefcase className="h-4 w-4" />;
    }
  };

  const isFiltered =
    filters.category !== 'all' ||
    filters.division !== 'all' ||
    filters.education !== 'all' ||
    filters.status !== 'all' ||
    Boolean(filters.searchQuery);

  return (
    <div className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 shadow-2xs">
      <div className="mx-auto max-w-7xl space-y-4">
        {/* Horizontal Category Carousel / Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-200">
          <button
            onClick={() => onFilterChange('category', 'all')}
            className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
              filters.category === 'all'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span>সব ক্যাটাগরি</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                filters.category === 'all' ? 'bg-white/20 text-white' : 'bg-white text-slate-700'
              }`}
            >
              {totalCount}
            </span>
          </button>

          {CATEGORIES.map((cat) => {
            const isSelected = filters.category === cat.id;
            const count = categoryCounts[cat.id] || 0;
            return (
              <button
                key={cat.id}
                onClick={() => onFilterChange('category', cat.id)}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all border ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-xs ring-2 ring-emerald-600/20'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className={isSelected ? 'text-emerald-700' : 'text-slate-500'}>
                  {getCategoryIcon(cat.id)}
                </span>
                <span>{cat.nameBn}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                    isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dropdowns Row: Location, Education, Status, Sorting */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 flex-1">
            {/* Location / Division Dropdown */}
            <div className="relative min-w-[150px] sm:min-w-[180px]">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 text-slate-400">
                <MapPin className="h-4 w-4 text-emerald-600" />
              </div>
              <select
                value={filters.division}
                onChange={(e) => onFilterChange('division', e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-8 pr-8 text-xs sm:text-sm font-medium text-slate-700 focus:border-emerald-500 focus:bg-white focus:outline-hidden"
              >
                <option value="all">📍 বিভাগ/জেলা (সবগুলো)</option>
                <optgroup label="বিভাগসমূহ">
                  {DIVISIONS.map((div) => (
                    <option key={div} value={div}>
                      {div}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="জনপ্রিয় জেলা">
                  {POPULAR_DISTRICTS.map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Education Filter */}
            <div className="relative min-w-[150px] sm:min-w-[180px]">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 text-slate-400">
                <GraduationCap className="h-4 w-4 text-blue-600" />
              </div>
              <select
                value={filters.education}
                onChange={(e) => onFilterChange('education', e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-8 pr-8 text-xs sm:text-sm font-medium text-slate-700 focus:border-emerald-500 focus:bg-white focus:outline-hidden"
              >
                <option value="all">🎓 শিক্ষাগত যোগ্যতা (সব)</option>
                {EDUCATION_LEVELS.map((edu) => (
                  <option key={edu} value={edu}>
                    {edu}
                  </option>
                ))}
              </select>
            </div>

            {/* Application Deadline Status */}
            <div className="relative min-w-[130px] sm:min-w-[160px]">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 text-slate-400">
                <Clock className="h-4 w-4 text-amber-600" />
              </div>
              <select
                value={filters.status}
                onChange={(e) => onFilterChange('status', e.target.value as any)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-8 pr-8 text-xs sm:text-sm font-medium text-slate-700 focus:border-emerald-500 focus:bg-white focus:outline-hidden"
              >
                <option value="all">⏰ সব সময়সীমা</option>
                <option value="active">চলমান আবেদন (সক্রিয়)</option>
                <option value="endingSoon">শীঘ্রই শেষ (৩ দিন বাকি)</option>
                <option value="expired">আবেদনের মেয়াদ শেষ</option>
              </select>
            </div>

            {/* Reset Button */}
            {isFiltered && (
              <button
                onClick={onResetFilters}
                className="flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-all"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>রিসেট</span>
              </button>
            )}
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">সাজান:</span>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 text-slate-400">
                <ArrowUpDown className="h-3.5 w-3.5" />
              </div>
              <select
                value={filters.sortBy}
                onChange={(e) => onFilterChange('sortBy', e.target.value as any)}
                className="rounded-xl border border-slate-200 bg-white py-2 pl-7 pr-8 text-xs font-semibold text-slate-700 focus:border-emerald-500 focus:outline-hidden shadow-2xs"
              >
                <option value="deadline">আবেদনের শেষ তারিখ (আজকের ও দ্রুত শেষগুলো শীর্ষে)</option>
                <option value="newest">সর্বশেষ প্রকাশিত</option>
                <option value="vacancies">সর্বোচ্চ খালি পদ</option>
                <option value="popular">সর্বাধিক পঠিত</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
