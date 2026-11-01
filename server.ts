import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { INITIAL_JOBS, INITIAL_SETTINGS } from './src/data/initialJobs.ts';
import { JobCircular, SiteSettings } from './src/types.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const DATA_DIR = path.resolve(__dirname, 'data');
const JOBS_FILE = path.join(DATA_DIR, 'jobs.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');
const PREP_FILE = path.join(DATA_DIR, 'prep.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper to read/write JSON files safely
function loadData<T>(filePath: string, defaultData: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content) as T;
    }
  } catch (err) {
    console.error(`Error loading data from ${filePath}:`, err);
  }
  saveData(filePath, defaultData);
  return defaultData;
}

function saveData<T>(filePath: string, data: T): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error saving data to ${filePath}:`, err);
  }
}

// Initial job prep material
const INITIAL_PREP = {
  currentAffairs: [
    {
      id: 'ca-1',
      title: 'সাম্প্রতিক বাংলাদেশ ও আন্তর্জাতিক কারেন্ট অ্যাফেয়ার্স ২০২৬',
      category: 'সাধারণ জ্ঞান',
      date: '২০২৬',
      summary: 'বাংলাদেশের মেগা প্রকল্প, সাম্প্রতিক অর্থনৈতিক সমীক্ষা, বাজেট এবং বৈশ্বিক আন্তর্জাতিক সম্মেলনের গুরুত্বপূর্ণ তথ্যাবলি।',
      importantPoints: [
        'রূপপুর পারমাণবিক বিদ্যুৎ কেন্দ্র ও মাতারবাড়ি গভীর সমুদ্র বন্দর সংক্রান্ত সর্বশেষ তথ্য।',
        'চলতি অর্থবছরের প্রস্তাবিত বাজেট ও জিডিপি প্রবৃদ্ধির লক্ষ্যমাত্রা।',
        'বিশ্বব্যাংক ও আইএমএফ-এর সর্বশেষ বৈশ্বিক অর্থনৈতিক প্রতিবেদন ২০২৬।',
        'কপ (COP) জলবায়ু সম্মেলনের মূল সিদ্ধান্তসমূহ।',
      ],
    },
    {
      id: 'ca-2',
      title: 'বিসিএস প্রিলিমিনারি ও ব্যাংক ম্যাথ শর্টকাট টেকনিক',
      category: 'গণিত ও মানসিক দক্ষতা',
      date: '২০২৬',
      summary: 'শতকরা, লাভ-ক্ষতি, সরল ও চক্রবৃদ্ধি সুদ, নল-চৌবাচ্চা এবং নৌকা-স্রোতের অংকের ৫ সেকেন্ডে সমাধানের কৌশল।',
      importantPoints: [
        'লাভ-ক্ষতির টেকনিক: ক্রয়মূল্য ও বিক্রয়মূল্য অনুপাত দিয়ে দ্রুত উত্তর বের করার নিয়ম।',
        'ঐকিক নিয়ম ও কাজের অংকে LCM মেথড ব্যবহার।',
        'ধারা ও বিন্যাস-সমাবেশের বিশেষ ফর্মুলা।',
      ],
    },
    {
      id: 'ca-3',
      title: 'প্রাইমারি সহকারী শিক্ষক নিয়োগ স্পেশাল ফাইনাল মডেল টেস্ট',
      category: 'প্রাইমারি শিক্ষক',
      date: '২০২৬',
      summary: 'বিগত ১৫ বছরের ডিপিই (DPE) পরীক্ষার প্রশ্ন এনালাইসিস করে তৈরি ৮০ নম্বরের স্পেশাল সাজেশন।',
      importantPoints: [
        'বাংলা সাহিত্য ও ব্যাকরণ থেকে সবচেয়ে কমন ১৫টি প্রশ্ন।',
        'ইংলিশ গ্রামার: Right form of verbs ও Preposition এর ১০০% কমন রুলস।',
        'সাধারণ জ্ঞান: মুক্তিযুদ্ধ, সংবিধান ও জাতির পিতা বঙ্গবন্ধু সংক্রান্ত প্রশ্নোত্তর।',
      ],
    },
  ],
  quizzes: [
    {
      id: 'quiz-1',
      subject: 'সাধারণ জ্ঞান (বাংলাদেশ বিষয়াবলী)',
      question: 'বাংলাদেশের সংবিধানে কতটি অনুচ্ছেদ রয়েছে?',
      options: ['১৩৩ টি', '১৪২ টি', '১৫৩ টি', '১৬১ টি'],
      correctAnswer: 2,
      explanation: 'বাংলাদেশের সংবিধান ১৯৭২ সালের ৪ নভেম্বর গণপরিষদে গৃহীত হয় এবং এতে মোট ১৫৩টি অনুচ্ছেদ রয়েছে।',
    },
    {
      id: 'quiz-2',
      subject: 'বাংলা ভাষা ও সাহিত্য',
      question: '‘গীতাঞ্জলি’ কাব্যের জন্য রবীন্দ্রনাথ ঠাকুর কত সালে নোবেল পুরস্কার পান?',
      options: ['১৯১১', '১৯১৩', '১৯২১', '১৯৩০'],
      correctAnswer: 1,
      explanation: '১৯১৩ সালে গীতাঞ্জলি (Song Offerings) কাব্যগ্রন্থের ইংরেজি অনুবাদের জন্য রবীন্দ্রনাথ ঠাকুর সাহিত্যে নোবেল পান।',
    },
    {
      id: 'quiz-3',
      subject: 'ইংরেজি (English Grammar)',
      question: 'Choose the correct preposition: He is devoid ___ common sense.',
      options: ['with', 'from', 'of', 'for'],
      correctAnswer: 2,
      explanation: '‘Devoid of’ একটি Appropriate Preposition যার অর্থ বর্জিত বা শূন্য।',
    },
    {
      id: 'quiz-4',
      subject: 'গণিত ও মানসিক দক্ষতা',
      question: 'একটি দ্রব্য ৫০০ টাকায় ক্রয় করে ৬০০ টাকায় বিক্রয় করলে শতকরা কত লাভ হবে?',
      options: ['১০%', '১৫%', '২০%', '২৫%'],
      correctAnswer: 2,
      explanation: 'লাভ = ৬০০ - ৫০০ = ১০০ টাকা। শতকরা লাভ = (১০০ / ৫০০) * ১০০% = ২০%।',
    },
    {
      id: 'quiz-5',
      subject: 'আন্তর্জাতিক বিষয়াবলী',
      question: 'জাতিসংঘের বর্তমান সদস্য সংখ্যা কত?',
      options: ['১৮৮', '১৯০', '১৯২', '১৯৩'],
      correctAnswer: 3,
      explanation: 'জাতিসংঘের ১৯৩তম সর্বশেষ সদস্য দেশ হলো দক্ষিণ সুদান (২০১১ সালে যোগদান করে)।',
    },
  ],
};

let jobsData: JobCircular[] = loadData(JOBS_FILE, INITIAL_JOBS);
let settingsData: SiteSettings = loadData(SETTINGS_FILE, INITIAL_SETTINGS);
let prepData = loadData(PREP_FILE, INITIAL_PREP);

// Helper to get today's date in YYYY-MM-DD (Asia/Dhaka time zone)
function getTodayDateString(): string {
  try {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Dhaka',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    return formatter.format(new Date());
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}

// PERMANENT AUTO LOGIC:
// 1. Auto-delete when expired: check on app load / server start and every 1 hour
function autoDeleteExpiredJobs(): number {
  const today = getTodayDateString();
  const initialCount = jobsData.length;
  // Keep only jobs whose deadline is today or in the future
  jobsData = jobsData.filter((j) => {
    if (!j.deadline) return true;
    return j.deadline >= today;
  });

  if (jobsData.length !== initialCount) {
    const deletedCount = initialCount - jobsData.length;
    console.log(`[Auto-Delete] Permanently removed ${deletedCount} expired circulars.`);
    saveData(JOBS_FILE, jobsData);
    return deletedCount;
  }
  return 0;
}

// Execute auto-delete on app load/server start
autoDeleteExpiredJobs();

// Schedule auto-delete to check every 1 hour forever
const ONE_HOUR_MS = 60 * 60 * 1000;
setInterval(() => {
  autoDeleteExpiredJobs();
}, ONE_HOUR_MS);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve ads.txt directly for Google AdSense verification
app.get('/ads.txt', (_req: Request, res: Response) => {
  res.type('text/plain');
  res.send(settingsData.adsTxt || `google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0`);
});

// REST APIs
// 1. Get all jobs with filtering
app.get('/api/jobs', (req: Request, res: Response) => {
  // Always trigger expired cleanup on API request
  autoDeleteExpiredJobs();

  const { category, division, district, education, search, status, sort } = req.query;

  let filtered = [...jobsData];

  // Category filter
  if (category && category !== 'all') {
    filtered = filtered.filter((j) => j.category === category);
  }

  // Division / District filter
  if (division && division !== 'all' && !String(division).includes('All')) {
    const divName = String(division).split(' ')[0].trim();
    filtered = filtered.filter(
      (j) =>
        j.division?.includes(divName) ||
        j.location?.includes(divName) ||
        j.district?.includes('সকল') ||
        j.district?.includes('All')
    );
  }

  if (district && district !== 'all' && !String(district).includes('All')) {
    filtered = filtered.filter(
      (j) =>
        j.district?.includes(String(district)) ||
        j.location?.includes(String(district)) ||
        j.district?.includes('সকল') ||
        j.district?.includes('All')
    );
  }

  // Education filter
  if (education && education !== 'all' && !String(education).includes('All')) {
    const eduKey = String(education).split(' ')[0].trim();
    filtered = filtered.filter((j) => j.education?.includes(eduKey));
  }

  // Search filter
  if (search) {
    const term = String(search).toLowerCase().trim();
    filtered = filtered.filter(
      (j) =>
        j.title.toLowerCase().includes(term) ||
        j.organization.toLowerCase().includes(term) ||
        j.education.toLowerCase().includes(term) ||
        j.description.toLowerCase().includes(term) ||
        j.location.toLowerCase().includes(term)
    );
  }

  const today = getTodayDateString();

  // Status filter (active, endingSoon, expired)
  if (status === 'endingSoon') {
    const in3Days = new Date();
    in3Days.setDate(in3Days.getDate() + 4);
    const in3DaysStr = in3Days.toISOString().split('T')[0];
    filtered = filtered.filter((j) => j.deadline >= today && j.deadline <= in3DaysStr);
  }

  // PERMANENT AUTO LOGIC:
  // - Sort by deadline ASC always
  // - Today expiring jobs at TOP
  filtered.sort((a, b) => {
    // If user explicitly asks for other sort metrics
    if (sort === 'vacancies') {
      return b.vacancies - a.vacancies;
    }
    if (sort === 'popular') {
      return (b.views || 0) - (a.views || 0);
    }

    // Default: Sort by deadline ASC with today expiring at the very TOP
    const aIsToday = a.deadline === today;
    const bIsToday = b.deadline === today;

    if (aIsToday && !bIsToday) return -1;
    if (!aIsToday && bIsToday) return 1;

    // Both are today or both are future dates: sort deadline ASC (earliest first)
    const deadlineDiff = a.deadline.localeCompare(b.deadline);
    if (deadlineDiff !== 0) return deadlineDiff;

    // Secondary tie-breaker: featured first, then vacancies
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return (b.vacancies || 0) - (a.vacancies || 0);
  });

  res.json({ success: true, count: filtered.length, jobs: filtered });
});

// 2. Get single job & increment view counter
app.get('/api/jobs/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const job = jobsData.find((j) => j.id === id);
  if (!job) {
    res.status(404).json({ success: false, message: 'বিজ্ঞপ্তি পাওয়া যায়নি।' });
    return;
  }
  job.views = (job.views || 0) + 1;
  saveData(JOBS_FILE, jobsData);
  res.json({ success: true, job });
});

// 3. Share count increment
app.post('/api/jobs/:id/share', (req: Request, res: Response) => {
  const { id } = req.params;
  const job = jobsData.find((j) => j.id === id);
  if (job) {
    job.shares = (job.shares || 0) + 1;
    saveData(JOBS_FILE, jobsData);
    res.json({ success: true, shares: job.shares });
    return;
  }
  res.status(404).json({ success: false });
});

// 4. Create new job (Admin)
app.post('/api/jobs', (req: Request, res: Response) => {
  const { adminPin, job } = req.body;
  if (adminPin !== settingsData.adminPin) {
    res.status(403).json({ success: false, message: 'ভুল পিন কোড! এডমিন এক্সেস প্রত্যাখ্যাত।' });
    return;
  }

  if (!job || !job.title || !job.organization) {
    res.status(400).json({ success: false, message: 'পদের নাম ও প্রতিষ্ঠানের নাম আবশ্যক।' });
    return;
  }

  const newJob: JobCircular = {
    ...job,
    id: `job-${Date.now()}`,
    views: 0,
    shares: 0,
    createdAt: new Date().toISOString(),
    publishDate: job.publishDate || new Date().toISOString().split('T')[0],
  };

  jobsData.unshift(newJob);
  saveData(JOBS_FILE, jobsData);
  res.json({ success: true, message: 'নতুন চাকরির সার্কুলার সফলভাবে প্রকাশিত হয়েছে!', job: newJob });
});

// 5. Update job (Admin)
app.put('/api/jobs/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { adminPin, job } = req.body;
  if (adminPin !== settingsData.adminPin) {
    res.status(403).json({ success: false, message: 'ভুল পিন কোড! এডমিন এক্সেস প্রত্যাখ্যাত।' });
    return;
  }

  const index = jobsData.findIndex((j) => j.id === id);
  if (index === -1) {
    res.status(404).json({ success: false, message: 'বিজ্ঞপ্তি পাওয়া যায়নি।' });
    return;
  }

  jobsData[index] = {
    ...jobsData[index],
    ...job,
    id, // preserve id
  };

  saveData(JOBS_FILE, jobsData);
  res.json({ success: true, message: 'সার্কুলার সফলভাবে আপডেট করা হয়েছে!', job: jobsData[index] });
});

// 6. Delete job (Admin)
app.delete('/api/jobs/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { adminPin } = req.body;
  if (adminPin !== settingsData.adminPin) {
    res.status(403).json({ success: false, message: 'ভুল পিন কোড!' });
    return;
  }

  const index = jobsData.findIndex((j) => j.id === id);
  if (index === -1) {
    res.status(404).json({ success: false, message: 'বিজ্ঞপ্তি পাওয়া যায়নি।' });
    return;
  }

  jobsData.splice(index, 1);
  saveData(JOBS_FILE, jobsData);
  res.json({ success: true, message: 'বিজ্ঞপ্তিটি ডিলিট করা হয়েছে।' });
});

// 7. Get settings
app.get('/api/settings', (_req: Request, res: Response) => {
  // Hide adminPin from public response
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { adminPin, ...safeSettings } = settingsData;
  res.json({ success: true, settings: safeSettings });
});

// 8. Update settings (Admin)
app.post('/api/settings', (req: Request, res: Response) => {
  const { adminPin, newSettings } = req.body;
  if (adminPin !== settingsData.adminPin) {
    res.status(403).json({ success: false, message: 'এডমিন ভেরিফিকেশন ব্যর্থ হয়েছে!' });
    return;
  }

  settingsData = {
    ...settingsData,
    ...newSettings,
  };

  saveData(SETTINGS_FILE, settingsData);
  res.json({ success: true, message: 'গুগল অ্যাডসেন্স ও সাইট সেটিংস সংরক্ষিত হয়েছে!' });
});

// 9. Admin PIN verification check
app.post('/api/admin/verify', (req: Request, res: Response) => {
  const { adminPin } = req.body;
  if (adminPin === settingsData.adminPin) {
    res.json({ success: true, message: 'এডমিন লগইন সফল।' });
  } else {
    res.status(403).json({ success: false, message: 'ভুল এডমিন পিন কোড।' });
  }
});

// 10. Job Preparation APIs
app.get('/api/prep', (_req: Request, res: Response) => {
  res.json({ success: true, prep: prepData });
});

app.post('/api/prep/quiz', (req: Request, res: Response) => {
  const { adminPin, quiz } = req.body;
  if (adminPin !== settingsData.adminPin) {
    res.status(403).json({ success: false, message: 'এডমিন অনুমতি নেই।' });
    return;
  }
  const newQuiz = {
    ...quiz,
    id: `quiz-${Date.now()}`,
  };
  prepData.quizzes.unshift(newQuiz);
  saveData(PREP_FILE, prepData);
  res.json({ success: true, quiz: newQuiz });
});

// Mount Vite or static server
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
