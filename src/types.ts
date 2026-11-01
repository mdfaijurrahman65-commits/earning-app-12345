export type JobCategory =
  | 'govt'
  | 'bank'
  | 'it'
  | 'private'
  | 'teacher'
  | 'defence'
  | 'ngo'
  | 'medical';

export interface CategoryInfo {
  id: JobCategory;
  nameBn: string;
  nameEn: string;
  icon: string;
  badgeColor: string;
}

export interface JobCircular {
  id: string;
  title: string;
  organization: string;
  orgLogo?: string;
  category: JobCategory;
  vacancies: number;
  education: string;
  experience: string;
  ageLimit: string;
  location: string;
  division: string;
  district: string;
  salary: string;
  publishDate: string;
  deadline: string; // ISO date string e.g. "2026-11-20"
  applicationFee: string;
  applyLink: string;
  source: string;
  isFeatured: boolean;
  isUrgent: boolean;
  description: string;
  circularImage: string;
  views: number;
  shares: number;
  teletalkSmsCode?: string;
  admitCardAvailable?: boolean;
  resultPublished?: boolean;
  createdAt: string;
}

export interface AdSettings {
  adSense: {
    enabled: boolean;
    publisherId: string;
    headerSlot: string;
    inFeedSlot: string;
    articleTopSlot: string;
    articleBottomSlot: string;
    sidebarSlot: string;
    stickyFooterSlot: string;
    autoAds: boolean;
  };
  monetag?: {
    enabled?: boolean;
    zoneId?: string;
    directLinkUrl?: string;
    inPagePushEnabled?: boolean;
    vignetteEnabled?: boolean;
  };
  adsMode: 'demo' | 'live';
  adsTxt: string;
}

export interface SiteSettings extends AdSettings {
  siteName: string;
  siteTagline: string;
  siteLogoUrl?: string;
  noticeText: string;
  contactEmail: string;
  contactPhone: string;
  facebookGroupUrl: string;
  telegramChannelUrl: string;
  adminPin: string;
}

export interface JobFilterState {
  searchQuery: string;
  category: JobCategory | 'all';
  division: string;
  education: string;
  status: 'all' | 'active' | 'endingSoon' | 'expired';
  sortBy: 'newest' | 'deadline' | 'vacancies' | 'popular';
}
