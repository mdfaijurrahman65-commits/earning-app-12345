import React, { useState } from 'react';
import {
  Lock,
  PlusCircle,
  Edit3,
  Trash2,
  Settings,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Save,
  Flame,
  FileText,
  Key,
  HelpCircle,
  Eye,
  Sparkles,
  Link as LinkIcon,
} from 'lucide-react';
import { JobCircular, SiteSettings, JobCategory } from '../types';
import { CATEGORIES, DIVISIONS, EDUCATION_LEVELS } from '../data/categories';

interface AdminPanelProps {
  jobs: JobCircular[];
  settings: SiteSettings;
  onSaveJob: (job: Partial<JobCircular>, isEdit: boolean) => Promise<boolean>;
  onDeleteJob: (jobId: string) => Promise<boolean>;
  onSaveSettings: (settings: Partial<SiteSettings>) => Promise<boolean>;
  onVerifyPin: (pin: string) => Promise<boolean>;
  editingJob: JobCircular | null;
  onClearEditingJob: () => void;
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (val: boolean) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  jobs,
  settings,
  onSaveJob,
  onDeleteJob,
  onSaveSettings,
  onVerifyPin,
  editingJob,
  onClearEditingJob,
  isAdminLoggedIn,
  setIsAdminLoggedIn,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState<'upload' | 'manage' | 'ads' | 'calculator'>('upload');

  // Form State for new or edited Job
  const [formData, setFormData] = useState<Partial<JobCircular>>({
    title: '',
    organization: '',
    category: 'govt',
    vacancies: 1,
    education: 'স্নাতক / ডিগ্রি অথবা এইচএসসি পাস',
    experience: 'প্রযোজ্য নয়',
    ageLimit: '১৮ থেকে ৩০ বছর',
    location: 'সমগ্র বাংলাদেশ',
    division: 'ঢাকা (Dhaka)',
    district: 'সকল জেলা (All Districts)',
    salary: '৯,৩০০ - ২২,৪৯০/- টাকা (গ্রেড-১৬)',
    publishDate: new Date().toISOString().split('T')[0],
    deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    applicationFee: '১১২ টাকা',
    applyLink: 'http://example.teletalk.com.bd',
    source: 'দৈনিক ইত্তেফাক',
    isFeatured: false,
    isUrgent: false,
    description: '',
    circularImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop&q=80',
    teletalkSmsCode: '',
  });

  const [savingJob, setSavingJob] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Google AdSense & Site Settings Form State
  const [adsForm, setAdsForm] = useState({
    siteLogoUrl: settings.siteLogoUrl || '',
    publisherId: settings.adSense?.publisherId || 'ca-pub-1234567890123456',
    headerSlot: settings.adSense?.headerSlot || '1234567890',
    inFeedSlot: settings.adSense?.inFeedSlot || '2345678901',
    articleTopSlot: settings.adSense?.articleTopSlot || '3456789012',
    articleBottomSlot: settings.adSense?.articleBottomSlot || '4567890123',
    adsMode: settings.adsMode || 'demo',
    adsTxt: settings.adsTxt || `google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0`,
  });

  // Earnings calculator state
  const [dailyVisitors, setDailyVisitors] = useState(5000);
  const [pageviewsPerVisitor, setPageviewsPerVisitor] = useState(3.5);
  const [estCpm, setEstCpm] = useState(0.85); // $0.85 average CPM for BD education & job portals

  // When editingJob changes, sync form
  React.useEffect(() => {
    if (editingJob) {
      setFormData(editingJob);
      setActiveTab('upload');
    }
  }, [editingJob]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinError('');
    const success = await onVerifyPin(pinInput);
    if (success) {
      setIsAdminLoggedIn(true);
    } else {
      setPinError('ভুল এডমিন পিন! ডিফল্ট পিন হলো: admin123');
    }
  };

  // Submit Job
  const handleSubmitJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingJob(true);
    setSaveMessage('');

    const isEdit = Boolean(editingJob?.id);
    const success = await onSaveJob(formData, isEdit);
    setSavingJob(false);

    if (success) {
      setSaveMessage(isEdit ? 'সার্কুলার ও লিঙ্ক সফলভাবে আপডেট হয়েছে!' : 'নতুন সার্কুলার সফলভাবে প্রকাশিত হয়েছে!');
      if (!isEdit) {
        // Reset form to defaults
        setFormData({
          title: '',
          organization: '',
          category: 'govt',
          vacancies: 1,
          education: 'স্নাতক / ডিগ্রি অথবা এইচএসসি পাস',
          experience: 'প্রযোজ্য নয়',
          ageLimit: '১৮ থেকে ৩০ বছর',
          location: 'সমগ্র বাংলাদেশ',
          division: 'ঢাকা (Dhaka)',
          district: 'সকল জেলা (All Districts)',
          salary: '৯,৩০০ - ২২,৪৯০/- টাকা',
          publishDate: new Date().toISOString().split('T')[0],
          deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          applicationFee: '১১২ টাকা',
          applyLink: 'http://example.teletalk.com.bd',
          source: 'দৈনিক পত্রিকা',
          isFeatured: false,
          isUrgent: false,
          description: '',
          circularImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop&q=80',
          teletalkSmsCode: '',
        });
      }
      setTimeout(() => setSaveMessage(''), 4000);
    }
  };

  // Save Ads & Site Settings
  const handleSaveAds = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated: Partial<SiteSettings> = {
      siteLogoUrl: adsForm.siteLogoUrl,
      adsMode: adsForm.adsMode as 'demo' | 'live',
      adsTxt: adsForm.adsTxt,
      adSense: {
        ...settings.adSense,
        enabled: true,
        publisherId: adsForm.publisherId,
        headerSlot: adsForm.headerSlot,
        inFeedSlot: adsForm.inFeedSlot,
        articleTopSlot: adsForm.articleTopSlot,
        articleBottomSlot: adsForm.articleBottomSlot,
      },
    };

    const success = await onSaveSettings(updated);
    if (success) {
      alert('বিজ্ঞাপন সেটিংস ও ads.txt সফলভাবে সংরক্ষিত হয়েছে!');
    }
  };

  // If not logged in, show clean login screen
  if (!isAdminLoggedIn) {
    return (
      <div className="mx-auto max-w-md py-16 px-4 animate-fade-in">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 mb-4 shadow-sm">
            <Lock className="h-7 w-7 text-emerald-700" />
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Hind_Siliguri']">
            এডমিন কন্ট্রোল প্যানেল
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            নিয়মিত চাকরির সার্কুলার আপলোড, লিঙ্ক এডিট এবং এডসেন্স ও মনিট্যাগ অ্যাড নিয়ন্ত্রণের জন্য লগইন করুন
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-left text-xs font-bold text-slate-700 mb-1">
                এডমিন সিক্রেট পিন কোড:
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="পিন কোড লিখুন (ডিফল্ট: admin123)"
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden text-center tracking-widest font-mono"
                required
              />
            </div>

            {pinError && (
              <p className="rounded-lg bg-rose-50 p-2 text-xs font-semibold text-rose-600 border border-rose-200">
                {pinError}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 py-3 text-sm font-bold text-white shadow-md hover:from-emerald-700 hover:to-teal-800 active:scale-95 transition-all"
            >
              লগইন করুন
            </button>
          </form>

          <div className="mt-6 border-t border-slate-100 pt-4 text-[11px] text-slate-400">
            <p>ডিফল্ট পাসকোড: <code className="bg-slate-100 px-2 py-0.5 rounded font-bold text-slate-700">admin123</code></p>
          </div>
        </div>
      </div>
    );
  }

  // Monthly revenue estimation
  const monthlyImpressions = dailyVisitors * pageviewsPerVisitor * 30;
  const monthlyEstUsd = (monthlyImpressions / 1000) * estCpm;
  const monthlyEstBdt = Math.round(monthlyEstUsd * 122); // ~122 BDT per USD

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 animate-fade-in">
      {/* Admin header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 p-6 text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
              ম্যানেজমেন্ট ড্যাশবোর্ড
            </span>
          </div>
          <h1 className="mt-1 text-xl sm:text-2xl font-bold font-['Hind_Siliguri']">
            সার্কুলার আপলোড ও ইনকাম কন্ট্রোল সেন্টার
          </h1>
          <p className="text-xs text-slate-300">
            নতুন সার্কুলার পোস্ট করুন, যে কোনো সার্কুলারের লিঙ্ক এডিট করুন এবং অ্যাডসেন্স মনিটাইজেশন নিয়ন্ত্রণ করুন।
          </p>
        </div>

        <button
          onClick={() => setIsAdminLoggedIn(false)}
          className="rounded-xl border border-slate-700 bg-white/10 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-white/20 transition-all"
        >
          লগআউট
        </button>
      </div>

      {/* Admin Tab buttons */}
      <div className="mt-6 flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => {
            setActiveTab('upload');
            if (!editingJob) onClearEditingJob();
          }}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'upload'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <PlusCircle className="h-4 w-4" />
          <span>{editingJob ? 'সার্কুলার ও লিঙ্ক এডিট' : 'নতুন সার্কুলার প্রকাশ'}</span>
        </button>

        <button
          onClick={() => setActiveTab('manage')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'manage'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Edit3 className="h-4 w-4" />
          <span>সকল সার্কুলার ব্যবস্থাপনা ({jobs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('ads')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'ads'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Settings className="h-4 w-4" />
          <span>গুগল এডসেন্স (Google AdSense) সেটিংস</span>
        </button>

        <button
          onClick={() => setActiveTab('calculator')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'calculator'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <DollarSign className="h-4 w-4 text-emerald-500" />
          <span>বিজ্ঞাপন আয় ক্যালকুলেটর</span>
        </button>
      </div>

      {/* Tab 1: Upload / Edit Form */}
      {activeTab === 'upload' && (
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-['Hind_Siliguri']">
                {editingJob ? 'সার্কুলার ও লিঙ্ক সম্পাদনা করুন' : 'নতুন চাকরির সার্কুলার আপলোড করুন'}
              </h2>
              <p className="text-xs text-slate-500">
                তথ্যগুলো পূরণ করে প্রকাশ বাটনে ক্লিক করলেই ওয়েবসাইটে লাইভ হয়ে যাবে।
              </p>
            </div>
            {editingJob && (
              <button
                onClick={() => {
                  onClearEditingJob();
                  setFormData({
                    title: '',
                    organization: '',
                    category: 'govt',
                    vacancies: 1,
                    education: 'স্নাতক / ডিগ্রি অথবা এইচএসসি পাস',
                    experience: 'প্রযোজ্য নয়',
                    ageLimit: '১৮ থেকে ৩০ বছর',
                    location: 'সমগ্র বাংলাদেশ',
                    division: 'ঢাকা (Dhaka)',
                    district: 'সকল জেলা (All Districts)',
                    salary: '৯,৩০০ - ২২,৪৯০/- টাকা',
                    publishDate: new Date().toISOString().split('T')[0],
                    deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    applicationFee: '১১২ টাকা',
                    applyLink: 'http://example.teletalk.com.bd',
                    source: 'দৈনিক পত্রিকা',
                    isFeatured: false,
                    isUrgent: false,
                    description: '',
                    circularImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop&q=80',
                    teletalkSmsCode: '',
                  });
                }}
                className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg hover:bg-rose-100"
              >
                এডিট বাতিল (নতুন ফরম)
              </button>
            )}
          </div>

          {saveMessage && (
            <div className="mb-6 flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800 text-sm font-semibold">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              <span>{saveMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmitJob} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Job Title */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  পদের নাম ও বিজ্ঞপ্তির শিরোনাম *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="যেমন: সহকারী স্টেশন মাস্টার ও পয়েন্টসম্যান পদে বিশাল নিয়োগ"
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm font-semibold text-slate-900 focus:border-emerald-500 focus:outline-hidden"
                  required
                />
              </div>

              {/* Organization */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  প্রতিষ্ঠানের নাম *
                </label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="যেমন: বাংলাদেশ রেলওয়ে / সোনালী ব্যাংক / ব্র্যাক"
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:outline-hidden"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  চাকরির ক্যাটাগরি *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as JobCategory })}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:outline-hidden"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nameBn} ({c.nameEn})
                    </option>
                  ))}
                </select>
              </div>

              {/* Application Link - CRUCIAL USER FEATURE */}
              <div className="md:col-span-2 rounded-2xl bg-emerald-50/70 border-2 border-emerald-300 p-4">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-extrabold text-emerald-950 flex items-center gap-1.5">
                    <LinkIcon className="h-4 w-4 text-emerald-700" />
                    <span>সরাসরি অনলাইনে আবেদনের লিঙ্ক (Application Link) *</span>
                  </label>
                  {formData.applyLink && (
                    <a
                      href={formData.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                    >
                      <span>লিঙ্ক টেস্ট করুন</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
                <input
                  type="url"
                  value={formData.applyLink}
                  onChange={(e) => setFormData({ ...formData, applyLink: e.target.value })}
                  placeholder="যেমন: http://br.teletalk.com.bd অথবা https://erecruitment.bb.org.bd"
                  className="w-full rounded-xl border border-emerald-300 bg-white p-2.5 text-sm font-mono text-slate-900 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden"
                  required
                />
                <p className="mt-1 text-[11px] text-emerald-800">
                  💡 চাকরিপ্রার্থীরা "আবেদন করুন" বাটনে ক্লিক করলে সরাসরি এই লিঙ্কে প্রবেশ করবে।
                </p>
              </div>

              {/* Vacancies */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  মোট পদ সংখ্যা (Vacancies) *
                </label>
                <input
                  type="number"
                  value={formData.vacancies}
                  onChange={(e) => setFormData({ ...formData, vacancies: parseInt(e.target.value, 10) || 0 })}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:outline-hidden"
                  required
                />
              </div>

              {/* Salary */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  বেতন স্কেল ও গ্রেড
                </label>
                <input
                  type="text"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  placeholder="যেমন: ২২,০০০ - ৫৩,০৬০/- (৯ম গ্রেড)"
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              {/* Education */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  শিক্ষাগত যোগ্যতা *
                </label>
                <input
                  type="text"
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  placeholder="যেমন: যেকোনো বিষয়ে স্নাতক ডিগ্রি / এইচএসসি পাস"
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:outline-hidden"
                  required
                />
              </div>

              {/* Age Limit */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  বয়সসীমা
                </label>
                <input
                  type="text"
                  value={formData.ageLimit}
                  onChange={(e) => setFormData({ ...formData, ageLimit: e.target.value })}
                  placeholder="যেমন: ১৮ থেকে ৩০ বছর (কোটাধারীদের ৩২ বছর)"
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              {/* Division / District */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  বিভাগ / কর্মস্থল
                </label>
                <select
                  value={formData.division}
                  onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:outline-hidden"
                >
                  {DIVISIONS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  জেলা বা কোটা
                </label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  placeholder="যেমন: সকল জেলা অথবা ঢাকা, চট্টগ্রাম"
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              {/* Publish Date & Deadline */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  প্রকাশের তারিখ
                </label>
                <input
                  type="date"
                  value={formData.publishDate}
                  onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  আবেদনের শেষ তারিখ (Deadline) *
                </label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full rounded-xl border border-rose-300 p-2.5 text-sm font-bold text-rose-700 focus:border-rose-500 focus:outline-hidden"
                  required
                />
              </div>

              {/* Application Fee */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  আবেদন ফি
                </label>
                <input
                  type="text"
                  value={formData.applicationFee}
                  onChange={(e) => setFormData({ ...formData, applicationFee: e.target.value })}
                  placeholder="যেমন: ২২৩ টাকা (টেলিটক এসএমএস)"
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              {/* Teletalk SMS Code */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  টেলিটক এসএমএস কোড (প্রযোজ্য হলে)
                </label>
                <input
                  type="text"
                  value={formData.teletalkSmsCode}
                  onChange={(e) => setFormData({ ...formData, teletalkSmsCode: e.target.value })}
                  placeholder="যেমন: BR, DPE, DGNM, BSC"
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm font-mono text-slate-900 focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              {/* Circular Image URL */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  অফিশিয়াল সার্কুলার ছবির লিঙ্ক (Image URL)
                </label>
                <input
                  type="url"
                  value={formData.circularImage}
                  onChange={(e) => setFormData({ ...formData, circularImage: e.target.value })}
                  placeholder="https://... (ইমেজ বা পেপার কাটিং ইউআরএল)"
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              {/* Full Description */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  বিজ্ঞপ্তির বিস্তারিত বিবরণ
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="বিজ্ঞপ্তির নিয়মাবলী, পদের বিবরণ ও শর্তাবলী..."
                  className="w-full rounded-xl border border-slate-300 p-3 text-sm text-slate-900 focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              {/* Featured & Urgent Checkboxes */}
              <div className="md:col-span-2 flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                    <Flame className="h-4 w-4 text-amber-500" />
                    <span>হট জবস (হোমপেজের শীর্ষে ফিচার করুন)</span>
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="submit"
                disabled={savingJob}
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 px-8 py-3 text-sm font-extrabold text-white shadow-md hover:from-emerald-700 hover:to-teal-800 active:scale-95 transition-all disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                <span>{savingJob ? 'সংরক্ষণ হচ্ছে...' : editingJob ? 'আপডেট সম্পন্ন করুন' : 'সার্কুলার প্রকাশ করুন'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: Manage Circulars List */}
      {activeTab === 'manage' && (
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
            <h2 className="text-lg font-bold text-slate-900 font-['Hind_Siliguri']">
              প্রকাশিত সকল সার্কুলার তালিকা ({jobs.length}টি)
            </h2>
          </div>

          <div className="divide-y divide-slate-100 overflow-x-auto">
            {jobs.map((j) => (
              <div key={j.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-slate-50 px-2 rounded-xl">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                      {j.category}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{j.organization}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{j.title}</h4>
                  <p className="text-xs text-slate-500">
                    পদ: {j.vacancies} জন | শেষ তারিখ: <strong className="text-rose-600">{j.deadline}</strong> | লিঙ্ক:{' '}
                    <a href={j.applyLink} target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">
                      {j.applyLink || 'নেই'}
                    </a>
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setFormData(j);
                      setActiveTab('upload');
                    }}
                    className="flex items-center gap-1 rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700 hover:bg-amber-100 transition-colors"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                    <span>এডিট করুন</span>
                  </button>

                  <button
                    onClick={async () => {
                      if (confirm(`আপনি কি "${j.title}" সার্কুলারটি ডিলিট করতে চান?`)) {
                        await onDeleteJob(j.id);
                      }
                    }}
                    className="flex items-center gap-1 rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>ডিলিট</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: AdSense & Monetag Settings */}
      {activeTab === 'ads' && (
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
          <div className="pb-4 border-b border-slate-200 mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-['Hind_Siliguri']">
              গুগল এডসেন্স (Google AdSense) বিজ্ঞাপন ও সাইট সেটিংস
            </h2>
            <p className="text-xs text-slate-500">
              আপনার Google AdSense Publisher ID বসিয়ে বিজ্ঞাপন প্রদর্শন ও ইনকাম শুরু করুন। কোনো ক্ষতিকর পপআপ বা রিডাইরেক্ট নেই।
            </p>
          </div>

          <form onSubmit={handleSaveAds} className="space-y-6">
            {/* Mode toggle */}
            <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4">
              <label className="block text-xs font-bold text-amber-950 mb-2">
                বিজ্ঞাপন ডিসপ্লে মোড (Ad Mode):
              </label>
              <div className="flex flex-wrap items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="adsMode"
                    value="demo"
                    checked={adsForm.adsMode === 'demo'}
                    onChange={() => setAdsForm({ ...adsForm, adsMode: 'demo' })}
                    className="text-amber-600 focus:ring-amber-500"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    ডেমো / স্পন্সরড প্রিভিউ মোড (হাই-কনভার্টিং বিজ্ঞাপন প্রিভিউ ও ক্লিক সিমুলেশন)
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="adsMode"
                    value="live"
                    checked={adsForm.adsMode === 'live'}
                    onChange={() => setAdsForm({ ...adsForm, adsMode: 'live' })}
                    className="text-amber-600 focus:ring-amber-500"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    লাইভ গুগল এডসেন্স মোড (রিয়েল AdSense স্ক্রিপ্ট চালু হবে)
                  </span>
                </label>
              </div>
            </div>

            {/* Site Brand Logo Settings */}
            <div className="rounded-2xl bg-emerald-50/70 border border-emerald-300 p-4">
              <label className="block text-xs font-bold text-emerald-950 mb-2 flex items-center justify-between">
                <span>ওয়েবসাইটের ব্র্যান্ড লোগো (Site Logo Image):</span>
                {adsForm.siteLogoUrl && (
                  <button
                    type="button"
                    onClick={() => setAdsForm({ ...adsForm, siteLogoUrl: '' })}
                    className="text-[11px] text-rose-600 hover:underline"
                  >
                    লোগো রিমুভ করুন
                  </button>
                )}
              </label>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="shrink-0">
                  {adsForm.siteLogoUrl ? (
                    <img
                      src={adsForm.siteLogoUrl}
                      alt="Site Logo"
                      className="h-14 w-14 rounded-2xl object-cover shadow-md border border-slate-200 bg-white"
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-700 text-white font-bold text-xs shadow-md">
                      ডিফল্ট লোগো
                    </div>
                  )}
                </div>

                <div className="flex-1 w-full space-y-2">
                  <input
                    type="url"
                    value={adsForm.siteLogoUrl}
                    onChange={(e) => setAdsForm({ ...adsForm, siteLogoUrl: e.target.value })}
                    placeholder="ছবির অনলাইন লিংক (URL) লিখুন: https://..."
                    className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs sm:text-sm font-mono text-slate-900 focus:outline-hidden"
                  />
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700">
                      <span>📁 ডিভাইস থেকে ছবি সিলেক্ট করুন</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              if (typeof reader.result === 'string') {
                                setAdsForm({ ...adsForm, siteLogoUrl: reader.result });
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                    <span className="text-[11px] text-slate-500">
                      (মোবাইল বা পিসি থেকে যেকোনো ছবি সরাসরি সিলেক্ট করতে পারেন)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Google AdSense Publisher ID (pub-xxxxxxxxxxxx)
                </label>
                <input
                  type="text"
                  value={adsForm.publisherId}
                  onChange={(e) => setAdsForm({ ...adsForm, publisherId: e.target.value })}
                  placeholder="ca-pub-1234567890123456"
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm font-mono text-slate-900 focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  হেডার ব্যানার অ্যাড স্লট আইডি (Header Slot)
                </label>
                <input
                  type="text"
                  value={adsForm.headerSlot}
                  onChange={(e) => setAdsForm({ ...adsForm, headerSlot: e.target.value })}
                  placeholder="1234567890"
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm font-mono text-slate-900 focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  সার্কুলার আর্টিকেলের ভিতরের অ্যাড স্লট (Article Top Slot)
                </label>
                <input
                  type="text"
                  value={adsForm.articleTopSlot}
                  onChange={(e) => setAdsForm({ ...adsForm, articleTopSlot: e.target.value })}
                  placeholder="3456789012"
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm font-mono text-slate-900 focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ইন-ফিড নেটিভ অ্যাড স্লট (In-Feed Slot)
                </label>
                <input
                  type="text"
                  value={adsForm.inFeedSlot}
                  onChange={(e) => setAdsForm({ ...adsForm, inFeedSlot: e.target.value })}
                  placeholder="2345678901"
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-sm font-mono text-slate-900 focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              {/* ads.txt File Editor */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ads.txt ফাইলের কনটেন্ট (Google AdSense ভেরিফিকেশনের জন্য সরাসরি <code className="bg-slate-100 px-1 py-0.5 rounded">/ads.txt</code> রুটে সার্ভ হয়)
                </label>
                <textarea
                  rows={2}
                  value={adsForm.adsTxt}
                  onChange={(e) => setAdsForm({ ...adsForm, adsTxt: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 p-3 font-mono text-xs text-slate-900 focus:border-emerald-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 px-8 py-3 text-sm font-bold text-white shadow-md hover:from-emerald-700 hover:to-teal-800"
              >
                <Save className="h-4 w-4" />
                <span>বিজ্ঞাপন সেটিংস সংরক্ষণ করুন</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 4: Earnings Calculator & Guide */}
      {activeTab === 'calculator' && (
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
          <div className="pb-4 border-b border-slate-200 mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-['Hind_Siliguri']">
              বিজ্ঞাপন আয় প্রজেকশন ও ক্যালকুলেটর (Earnings Calculator)
            </h2>
            <p className="text-xs text-slate-500">
              দৈনিক ট্রাফিক ও পেজভিউ বাড়িয়ে কীভাবে মাসে ৫০,০০০ থেকে ১,৫০,০০০+ টাকা ইনকাম করবেন তা হিসাব করুন।
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Controls */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                  <span>দৈনিক ভিজিটর সংখ্যা:</span>
                  <span className="text-emerald-700 font-extrabold text-sm">{dailyVisitors.toLocaleString('bn-BD')} জন / দিন</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="50000"
                  step="500"
                  value={dailyVisitors}
                  onChange={(e) => setDailyVisitors(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                  <span>গড়ে প্রতি ভিজিটরের পেজভিউ:</span>
                  <span className="text-blue-700 font-extrabold text-sm">{pageviewsPerVisitor} টি পেজ</span>
                </div>
                <input
                  type="range"
                  min="1.5"
                  max="8"
                  step="0.5"
                  value={pageviewsPerVisitor}
                  onChange={(e) => setPageviewsPerVisitor(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                  <span>গড় CPM রেট (প্রতি ১০০০ অ্যাড ইমপ্রেশনে আয়):</span>
                  <span className="text-amber-700 font-extrabold text-sm">${estCpm.toFixed(2)} USD</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="2.5"
                  step="0.05"
                  value={estCpm}
                  onChange={(e) => setEstCpm(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 text-xs text-slate-600 space-y-1">
                <p className="font-bold text-slate-800">📌 আয় বাড়ানোর কার্যকারী কৌশল:</p>
                <p>• ফেসবুক গ্রুপ ও টেলিগ্রাম চ্যানেলে নিয়মিত সার্কুলার শেয়ার করলে প্রতিদিন হাজার হাজার অর্গানিক ভিজিটর পাওয়া যায়।</p>
                <p>• ইন-ফিড বিজ্ঞাপন ও জব ডিটেইলস পেজে বিজ্ঞাপনে ক্লিক বেশি পড়ে (CTR 2.5% - 4.5%)।</p>
                <p>• চাকরি প্রস্তুতি ও মডেল টেস্ট সেকশনে ভিজিটর বেশি সময় কাটায়, যা অ্যাডসেন্স আয় বহুগুণ বাড়িয়ে দেয়।</p>
              </div>
            </div>

            {/* Income Display Card */}
            <div className="rounded-3xl bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-900 p-6 sm:p-8 text-white text-center shadow-xl">
              <span className="inline-block rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-400/30 mb-4">
                মাসিক সম্ভাব্য বিজ্ঞাপন উপার্জন
              </span>
              <div className="my-2">
                <span className="text-4xl sm:text-5xl font-extrabold text-amber-300 font-['Hind_Siliguri']">
                  ৳{monthlyEstBdt.toLocaleString('bn-BD')}
                </span>
                <span className="text-sm text-emerald-200 font-medium block mt-1">
                  (আনুমানিক ${monthlyEstUsd.toFixed(0)} USD)
                </span>
              </div>

              <div className="mt-6 pt-6 border-t border-emerald-700/50 grid grid-cols-2 gap-4 text-left text-xs">
                <div>
                  <span className="text-emerald-200">মাসিক পেজভিউ:</span>
                  <p className="font-bold text-white text-sm">{Math.round(monthlyImpressions).toLocaleString('bn-BD')} টি</p>
                </div>
                <div>
                  <span className="text-emerald-200">দৈনিক আয়:</span>
                  <p className="font-bold text-amber-300 text-sm">৳{Math.round(monthlyEstBdt / 30).toLocaleString('bn-BD')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
