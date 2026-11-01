/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FilterBar } from './components/FilterBar';
import { JobCard } from './components/JobCard';
import { JobDetailModal } from './components/JobDetailModal';
import { JobPrepSection } from './components/JobPrepSection';
import { AdminPanel } from './components/AdminPanel';
import { TeletalkHelperModal } from './components/TeletalkHelperModal';
import { LogoUploadModal } from './components/LogoUploadModal';
import { AdSenseBanner } from './components/AdSenseBanner';
import { Footer } from './components/Footer';
import { INITIAL_JOBS, INITIAL_SETTINGS } from './data/initialJobs';
import { JobCircular, JobFilterState, SiteSettings, JobCategory } from './types';
import { Bookmark, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

export default function App() {
  const [jobs, setJobs] = useState<JobCircular[]>(INITIAL_JOBS);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [loading, setLoading] = useState<boolean>(true);

  // App Tabs
  const [currentTab, setCurrentTab] = useState<'jobs' | 'prep' | 'admin' | 'teletalk' | 'calculator'>('jobs');

  // Filters State (Permanent logic: default sort by deadline ASC with today expiring at top)
  const [filters, setFilters] = useState<JobFilterState>({
    searchQuery: '',
    category: 'all',
    division: 'all',
    education: 'all',
    status: 'all',
    sortBy: 'deadline',
  });

  // Modal states
  const [selectedJob, setSelectedJob] = useState<JobCircular | null>(null);
  const [showTeletalkModal, setShowTeletalkModal] = useState<boolean>(false);
  const [showBookmarksModal, setShowBookmarksModal] = useState<boolean>(false);
  const [showLogoModal, setShowLogoModal] = useState<boolean>(false);
  const [editingJob, setEditingJob] = useState<JobCircular | null>(null);

  // Bookmarks State in localStorage
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bdjobs_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Admin Login State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('bdjobs_admin_logged') === 'true';
    } catch {
      return false;
    }
  });

  // Fetch jobs and settings on mount
  const fetchJobs = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.category !== 'all') params.set('category', filters.category);
      if (filters.division !== 'all') params.set('division', filters.division);
      if (filters.education !== 'all') params.set('education', filters.education);
      if (filters.searchQuery) params.set('search', filters.searchQuery);
      if (filters.status !== 'all') params.set('status', filters.status);
      if (filters.sortBy) params.set('sort', filters.sortBy);

      const res = await fetch(`/api/jobs?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.jobs) {
          setJobs(data.jobs);
        }
      }
    } catch (err) {
      console.warn('API fetch jobs fallback to initial:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        if (data.settings) {
          setSettings((prev) => ({ ...prev, ...data.settings }));
        }
      }
    } catch (err) {
      console.warn('API fetch settings fallback:', err);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchSettings();

    // Permanent auto logic: Check and purge expired jobs every 1 hour
    const ONE_HOUR = 60 * 60 * 1000;
    const hourlyTimer = setInterval(() => {
      console.log('[Auto-Check] Hourly check for expired circulars...');
      fetchJobs();
    }, ONE_HOUR);

    return () => clearInterval(hourlyTimer);
  }, [filters.category, filters.division, filters.education, filters.searchQuery, filters.status, filters.sortBy]);

  // Handle Bookmarks Toggle
  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('bdjobs_bookmarks', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  // Handle Share Job
  const handleShare = (job: JobCircular) => {
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `${job.title} - ${job.organization} (পদ সংখ্যা: ${job.vacancies} জন, শেষ তারিখ: ${job.deadline})`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      const text = `${job.title} - ${job.organization}\nশেষ তারিখ: ${job.deadline}\nআবেদন লিঙ্ক: ${job.applyLink}\nবিস্তারিত: ${window.location.href}`;
      navigator.clipboard.writeText(text);
      alert('বিজ্ঞপ্তির তথ্য ও আবেদনের লিঙ্ক কপি করা হয়েছে! ফেসবুক বা হোয়াটসঅ্যাপে শেয়ার করতে পারেন।');
    }

    // Ping share API
    fetch(`/api/jobs/${job.id}/share`, { method: 'POST' }).catch(() => {});
  };

  // Open Details Modal and increment view count
  const handleViewDetails = (job: JobCircular) => {
    setSelectedJob(job);
    fetch(`/api/jobs/${job.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.job) {
          setJobs((prev) => prev.map((j) => (j.id === job.id ? data.job : j)));
        }
      })
      .catch(() => {});
  };

  // Admin: Save Job (Create or Edit)
  const handleSaveJob = async (jobData: Partial<JobCircular>, isEdit: boolean) => {
    try {
      const pin = settings.adminPin || 'admin123';
      const url = isEdit ? `/api/jobs/${jobData.id}` : '/api/jobs';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminPin: pin, job: jobData }),
      });

      const result = await res.json();
      if (result.success) {
        await fetchJobs();
        setEditingJob(null);
        return true;
      } else {
        alert(result.message || 'সংরক্ষণ ব্যর্থ হয়েছে');
        return false;
      }
    } catch (err) {
      alert('সার্ভার এরর');
      return false;
    }
  };

  // Admin: Delete Job
  const handleDeleteJob = async (jobId: string) => {
    try {
      const pin = settings.adminPin || 'admin123';
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminPin: pin }),
      });
      const result = await res.json();
      if (result.success) {
        await fetchJobs();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // Admin: Save Settings
  const handleSaveSettings = async (newSettings: Partial<SiteSettings>) => {
    try {
      const pin = settings.adminPin || 'admin123';
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminPin: pin, newSettings }),
      });
      const result = await res.json();
      if (result.success) {
        setSettings((prev) => ({ ...prev, ...newSettings }));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // Admin: Verify PIN
  const handleVerifyPin = async (pin: string) => {
    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminPin: pin }),
      });
      const result = await res.json();
      if (result.success) {
        sessionStorage.setItem('bdjobs_admin_logged', 'true');
        return true;
      }
      return false;
    } catch {
      if (pin === 'admin123') {
        sessionStorage.setItem('bdjobs_admin_logged', 'true');
        return true;
      }
      return false;
    }
  };

  // Calculate category counts
  const categoryCounts = jobs.reduce((acc, job) => {
    acc[job.category] = (acc[job.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalVacancies = jobs.reduce((sum, j) => sum + (j.vacancies || 0), 0);

  // Filter change helper
  const handleFilterChange = <K extends keyof JobFilterState>(key: K, value: JobFilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      category: 'all',
      division: 'all',
      education: 'all',
      status: 'all',
      sortBy: 'deadline',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-['Hind_Siliguri']">
      {/* Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          if (tab === 'teletalk') setShowTeletalkModal(true);
        }}
        bookmarksCount={bookmarkedIds.length}
        onOpenBookmarks={() => setShowBookmarksModal(true)}
        siteName={settings.siteName}
        siteLogoUrl={settings.siteLogoUrl}
        onOpenLogoUpload={() => setShowLogoModal(true)}
      />

      {/* Main View Switching */}
      {currentTab === 'prep' ? (
        <JobPrepSection settings={settings} />
      ) : currentTab === 'admin' ? (
        <AdminPanel
          jobs={jobs}
          settings={settings}
          onSaveJob={handleSaveJob}
          onDeleteJob={handleDeleteJob}
          onSaveSettings={handleSaveSettings}
          onVerifyPin={handleVerifyPin}
          editingJob={editingJob}
          onClearEditingJob={() => setEditingJob(null)}
          isAdminLoggedIn={isAdminLoggedIn}
          setIsAdminLoggedIn={(val) => {
            setIsAdminLoggedIn(val);
            if (!val) sessionStorage.removeItem('bdjobs_admin_logged');
          }}
        />
      ) : (
        <main className="flex-1">
          {/* Hero with Search and Quick Stats */}
          <HeroSection
            searchQuery={filters.searchQuery}
            onSearchChange={(query) => handleFilterChange('searchQuery', query)}
            selectedCategory={filters.category}
            onSelectCategory={(cat) => handleFilterChange('category', cat)}
            totalJobs={jobs.length}
            totalVacancies={totalVacancies}
            noticeText={settings.noticeText}
          />

          {/* Filter Bar */}
          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            categoryCounts={categoryCounts}
            totalCount={jobs.length}
          />

          {/* Header Ad Slot (AdSense Leaderboard) */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <AdSenseBanner position="header" settings={settings} />
          </div>

          {/* Job Circulars Grid */}
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
            <div className="flex items-center justify-between pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Hind_Siliguri']">
                  {filters.category === 'all'
                    ? 'সর্বশেষ চাকরির নিয়োগ বিজ্ঞপ্তি'
                    : `${categoryCounts[filters.category] || 0}টি বিজ্ঞপ্তি পাওয়া গেছে`}
                </h2>
                <p className="text-xs text-slate-500">
                  নিয়মিত আপডেটকৃত সরকারি গেজেট ও জাতীয় পত্রিকার বিজ্ঞপ্তি
                </p>
              </div>

              {isAdminLoggedIn && (
                <button
                  onClick={() => {
                    setEditingJob(null);
                    setCurrentTab('admin');
                  }}
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-700"
                >
                  + নতুন সার্কুলার যোগ করুন
                </button>
              )}
            </div>

            {loading ? (
              <div className="py-20 text-center">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto text-emerald-600 mb-2" />
                <p className="text-sm font-semibold text-slate-600">সার্কুলার লোড হচ্ছে...</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xs">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 mb-4">
                  <AlertCircle className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">কোনো সার্কুলার পাওয়া যায়নি</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  আপনার নির্বাচিত ফিল্টার বা অনুসন্ধানের সাথে কোনো বিজ্ঞপ্তি মেলেনি। অন্য ক্যাটাগরি বা জেলা নির্বাচন করুন।
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-4 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-700"
                >
                  সকল ফিল্টার রিসেট করুন
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {jobs.map((job, idx) => (
                    <React.Fragment key={job.id}>
                      <JobCard
                        job={job}
                        isBookmarked={bookmarkedIds.includes(job.id)}
                        onToggleBookmark={handleToggleBookmark}
                        onViewDetails={handleViewDetails}
                        onEditJob={(j) => {
                          setEditingJob(j);
                          setCurrentTab('admin');
                        }}
                        onShare={handleShare}
                        isAdminLoggedIn={isAdminLoggedIn}
                      />

                      {/* Inject In-feed native ad after every 3 job cards for maximum revenue */}
                      {idx === 2 && (
                        <div className="col-span-1 md:col-span-2 lg:col-span-3">
                          <AdSenseBanner position="in-feed" settings={settings} />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      )}

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          handleFilterChange('category', cat);
          setCurrentTab('jobs');
        }}
        onOpenCalculator={() => {
          setCurrentTab('admin');
        }}
        onOpenAdmin={() => {
          setCurrentTab('admin');
        }}
      />

      {/* Job Details Modal */}
      <JobDetailModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        isBookmarked={selectedJob ? bookmarkedIds.includes(selectedJob.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onShare={handleShare}
        onEditJob={(j) => {
          setSelectedJob(null);
          setEditingJob(j);
          setCurrentTab('admin');
        }}
        isAdminLoggedIn={isAdminLoggedIn}
        settings={settings}
        onOpenTeletalkHelper={() => setShowTeletalkModal(true)}
      />

      {/* Teletalk SMS Generator Helper Modal */}
      {showTeletalkModal && (
        <TeletalkHelperModal onClose={() => setShowTeletalkModal(false)} />
      )}

      {/* Bookmarked Jobs Modal */}
      {showBookmarksModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Bookmark className="h-5 w-5 text-rose-600 fill-rose-600" />
                <h3 className="text-base font-bold text-slate-900">
                  আপনার সংরক্ষিত সার্কুলার ({bookmarkedIds.length}টি)
                </h3>
              </div>
              <button
                onClick={() => setShowBookmarksModal(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 divide-y divide-slate-100">
              {bookmarkedIds.length === 0 ? (
                <p className="py-8 text-center text-xs text-slate-400">
                  আপনি এখনো কোনো সার্কুলার বুকমার্ক করেননি।
                </p>
              ) : (
                jobs
                  .filter((j) => bookmarkedIds.includes(j.id))
                  .map((j) => (
                    <div key={j.id} className="py-3 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-semibold text-emerald-700">{j.organization}</span>
                        <h4 className="text-sm font-bold text-slate-900">{j.title}</h4>
                        <span className="text-xs text-rose-600">শেষ তারিখ: {j.deadline}</span>
                      </div>
                      <button
                        onClick={() => {
                          setShowBookmarksModal(false);
                          handleViewDetails(j);
                        }}
                        className="rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-700"
                      >
                        দেখুন
                      </button>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Logo Upload & Customizer Modal */}
      {showLogoModal && (
        <LogoUploadModal
          currentLogoUrl={settings.siteLogoUrl || ''}
          onSaveLogo={async (newUrl) => {
            const success = await handleSaveSettings({ siteLogoUrl: newUrl });
            return success;
          }}
          onClose={() => setShowLogoModal(false)}
        />
      )}

      {/* Sticky Bottom Anchor Ad */}
      <AdSenseBanner position="sticky-footer" settings={settings} />
    </div>
  );
}
