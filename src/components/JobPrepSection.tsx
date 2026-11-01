import React, { useState } from 'react';
import {
  BookOpen,
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Clock,
  Sparkles,
  FileText,
  Download,
  HelpCircle,
  Bookmark,
  Share2,
} from 'lucide-react';
import { AdSenseBanner } from './AdSenseBanner';
import { SiteSettings } from '../types';

interface JobPrepSectionProps {
  settings?: SiteSettings;
}

export const JobPrepSection: React.FC<JobPrepSectionProps> = ({ settings }) => {
  const [activeSubTab, setActiveSubTab] = useState<'quiz' | 'affairs' | 'viva'>('quiz');

  // Quiz State
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const quizQuestions = [
    {
      id: 1,
      subject: 'সাধারণ জ্ঞান',
      question: 'বাংলাদেশের জাতীয় সংসদ ভবনের স্থপতি কে?',
      options: ['লুই আই কান', 'এফ আর খান', 'মাজহারুল ইসলাম', 'হামিদুর রহমান'],
      correct: 0,
      explanation: 'লুই আই কান (Louis I Kahn) মার্কিন স্থপতি, যিনি শেরেবাংলা নগরে অবস্থিত জাতীয় সংসদ ভবনের মূল নকশা তৈরি করেন।',
    },
    {
      id: 2,
      subject: 'বাংলা সাহিত্য',
      question: '‘রক্তাক্ত প্রান্তর’ নাটকটির রচয়িতা কে?',
      options: ['মুনীর চৌধুরী', 'সেলিম আল দীন', 'নুরুল মোমেন', 'সৈয়দ ওয়ালীউল্লাহ'],
      correct: 0,
      explanation: 'মুনীর চৌধুরী রচিত ‘রক্তাক্ত প্রান্তর’ পানিপথের তৃতীয় যুদ্ধের পটভূমিতে রচিত একটি বিখ্যাত নাটক।',
    },
    {
      id: 3,
      subject: 'ইংরেজি গ্রামার',
      question: 'What is the noun form of the word "Brief"?',
      options: ['Briefly', 'Brevity', 'Briefness', 'Brieve'],
      correct: 1,
      explanation: '"Brevity" হলো Brief শব্দের সঠিক Noun রূপ, যার অর্থ সংক্ষিপ্ততা।',
    },
    {
      id: 4,
      subject: 'গণিত শর্টকাট',
      question: 'কোনো সংখ্যার ৬০% থেকে ৬০ বিয়োগ করলে ফলাফল ৬০ হয়। সংখ্যাটি কত?',
      options: ['১০০', '১৫০', '২০০', '২৫০'],
      correct: 2,
      explanation: '৬০% = ৬০ + ৬০ = ১২০। সুতরাং ১০০% = (১২০ / ৬০) * ১০০ = ২০০।',
    },
    {
      id: 5,
      subject: 'ব্যাংক ও অর্থনীতি',
      question: 'বাংলাদেশের কেন্দ্রীয় ব্যাংকের নাম কী এবং এটি কবে প্রতিষ্ঠিত হয়?',
      options: ['সোনালী ব্যাংক (১৯৭২)', 'বাংলাদেশ ব্যাংক (১৯৭১ সালের ১৬ ডিসেম্বর)', 'কৃষি ব্যাংক (১৯৭৩)', 'জনতা ব্যাংক (১৯৭২)'],
      correct: 1,
      explanation: 'বাংলাদেশ ব্যাংক হলো বাংলাদেশের কেন্দ্রীয় ব্যাংক যা বাংলাদেশ ব্যাংক অর্ডার ১৯৭১ অনুযায়ী প্রতিষ্ঠিত হয়।',
    },
  ];

  const handleSelectOption = (qIndex: number, optionIndex: number) => {
    if (submitted) return;
    setAnswers({ ...answers, [qIndex]: optionIndex });
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (answers[idx] === q.correct) score++;
    });
    return score;
  };

  const currentAffairsList = [
    {
      title: '২০২৬ সালের গুরুত্বপূর্ণ মেগা প্রকল্প ও উন্নয়ন সূচক',
      date: 'অক্টোবর ২০২৬',
      tag: 'জাতীয় বিষয়াবলী',
      points: [
        'মাতারবাড়ি গভীর সমুদ্র বন্দরের ১ম পর্যায়ের বাণিজ্যিক কার্যক্রম সংক্রান্ত তথ্য।',
        'ঢাকা মেট্রো রেলের নতুন সম্প্রসারিত রুটের সর্বশেষ অগ্রগতি।',
        'বাংলাদেশ পরিসংখ্যান ব্যুরোর (BBS) সর্বশেষ শ্রমশক্তি জরিপ ও কর্মসংস্থান প্রতিবেদন।',
      ],
    },
    {
      title: 'আন্তর্জাতিক বাণিজ্য, নোবেল পুরস্কার ও সাম্প্রতিক চুক্তি ২০২৬',
      date: 'অক্টোবর ২০২৬',
      tag: 'আন্তর্জাতিক বিষয়াবলী',
      points: [
        '২০২৬ সালের শান্তিতে ও অর্থনীতিতে নোবেল পুরস্কার বিজয়ীদের নাম ও তাদের গুরুত্বপূর্ণ অবদান।',
        'ব্রিকস (BRICS) সম্মেলনের নতুন সদস্য দেশ ও অর্থনৈতিক সিদ্ধান্তসমূহ।',
        'জলবায়ু পরিবর্তন মোকাবিলায় বিশ্বব্যাংকের নতুন তহবিল বরাদ্দ।',
      ],
    },
    {
      title: 'প্রাইমারি শিক্ষক ও বিসিএস ভাইভা স্পেশাল প্রশ্ন সম্ভার',
      date: 'চলতি আপডেট',
      tag: 'ভাইভা প্রস্তুতি',
      points: [
        'নিজের নামের অর্থ, নিজ জেলার ইতিহাস ও বিখ্যাত ব্যক্তিদের পরিচয় প্রস্তুত রাখার নিয়ম।',
        'সংবিধানের মূলনীতি ও সাম্প্রতিক সরকারি প্রজ্ঞাপন সংক্রান্ত সাধারণ প্রশ্নোত্তর।',
        'ভাইভায় পোশাকের শালীনতা ও নার্ভাসনেস কাটানোর বাস্তব টিপস।',
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 animate-fade-in">
      {/* Prep Section Hero */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-400/30">
              <Sparkles className="h-3.5 w-3.5" />
              <span>চাকরি প্রস্তুতি স্পেশাল জোন</span>
            </span>
            <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold font-['Hind_Siliguri']">
              বিসিএস, প্রাইমারি শিক্ষক ও ব্যাংক জব প্রস্তুতি
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
              নিয়মিত মডেল টেস্ট দিন, সাম্প্রতিক সাধারণ জ্ঞান রিভিশন দিন এবং ভাইভায় প্রথমবারেই সফল হওয়ার আত্মবিশ্বাস অর্জন করুন।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-2xl bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur-xs">
              ✓ ১০০% ফ্রি প্র্যাকটিস
            </span>
          </div>
        </div>
      </div>

      {/* In-feed Ad Banner to monetize the high-traffic prep page */}
      <AdSenseBanner position="header" settings={settings} />

      {/* Sub Tabs */}
      <div className="mt-6 flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('quiz')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
            activeSubTab === 'quiz'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Award className="h-4 w-4" />
          <span>দৈনিক মডেল টেস্ট কুইজ (MCQ)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('affairs')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
            activeSubTab === 'affairs'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>সাম্প্রতিক সাধারণ জ্ঞান ক্যাপসুল</span>
        </button>

        <button
          onClick={() => setActiveSubTab('viva')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
            activeSubTab === 'viva'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>ভাইভা ও সিভি গাইড</span>
        </button>
      </div>

      {/* SubTab 1: Interactive Model Test */}
      {activeSubTab === 'quiz' && (
        <div className="mt-6 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-['Hind_Siliguri']">
                  আজকের সরকারি ও ব্যাংক নিয়োগ মডেল টেস্ট (৫টি গুরুত্বপূর্ণ প্রশ্ন)
                </h3>
                <p className="text-xs text-slate-500">
                  সঠিক উত্তরটি বাছাই করুন এবং শেষে সাবমিট করে আপনার স্কোর ও বিস্তারিত ব্যাখ্যা দেখুন।
                </p>
              </div>

              {submitted && (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2 text-center">
                  <span className="text-xs text-slate-500">আপনার স্কোর:</span>
                  <p className="text-lg font-extrabold text-emerald-700">
                    {calculateScore()} / {quizQuestions.length}
                  </p>
                </div>
              )}
            </div>

            {/* Questions list */}
            <div className="mt-6 space-y-6">
              {quizQuestions.map((q, idx) => {
                const isAnswered = answers[idx] !== undefined;
                const isCorrect = answers[idx] === q.correct;

                return (
                  <div key={q.id} className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 sm:p-5">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-emerald-800 font-bold text-[10px]">
                        {q.subject}
                      </span>
                      <span>প্রশ্ন {idx + 1}</span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-3">
                      {idx + 1}. {q.question}
                    </h4>

                    {/* Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        let btnStyle = 'border-slate-200 bg-white text-slate-800 hover:bg-slate-100';

                        if (submitted) {
                          if (optIdx === q.correct) {
                            btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-500/20';
                          } else if (answers[idx] === optIdx) {
                            btnStyle = 'border-rose-500 bg-rose-50 text-rose-900 font-bold';
                          }
                        } else if (answers[idx] === optIdx) {
                          btnStyle = 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-600/20';
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={submitted}
                            onClick={() => handleSelectOption(idx, optIdx)}
                            className={`flex items-center justify-between rounded-xl border p-3 text-xs sm:text-sm text-left transition-all ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {submitted && optIdx === q.correct && (
                              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                            )}
                            {submitted && answers[idx] === optIdx && optIdx !== q.correct && (
                              <XCircle className="h-4 w-4 text-rose-600 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {submitted && (
                      <div className="mt-3 rounded-xl bg-blue-50 p-3 text-xs text-blue-900 border border-blue-200">
                        <strong className="font-bold text-blue-950">ব্যাখ্যা: </strong>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quiz Action Buttons */}
            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setAnswers({});
                  setSubmitted(false);
                }}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>পুনরায় শুরু করুন</span>
              </button>

              {!submitted ? (
                <button
                  onClick={() => setSubmitted(true)}
                  disabled={Object.keys(answers).length === 0}
                  className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md hover:from-emerald-700 hover:to-teal-800 disabled:opacity-50"
                >
                  উত্তর জমা দিন ও রেজাল্ট দেখুন
                </button>
              ) : (
                <span className="text-xs font-bold text-emerald-700">
                  ✓ পরীক্ষা সম্পন্ন হয়েছে!
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SubTab 2: Current Affairs */}
      {activeSubTab === 'affairs' && (
        <div className="mt-6 space-y-4">
          {currentAffairsList.map((item, i) => (
            <div key={i} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                  {item.tag}
                </span>
                <span className="text-xs text-slate-400">{item.date}</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">{item.title}</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {item.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 mt-2 shrink-0"></span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* SubTab 3: Viva Tips & CV */}
      {activeSubTab === 'viva' && (
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-['Hind_Siliguri']">
              সরকারি ও ব্যাংক ভাইভা বোর্ডে সফল হওয়ার ৫টি সোনালী টিপস
            </h3>
            <p className="text-xs text-slate-500">
              ভাইভা বোর্ডে আত্মবিশ্বাস ধরে রাখা ও সাধারণ ভুল এড়িয়ে চলার উপায়।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 space-y-1">
              <h4 className="font-bold text-slate-900">১. নিজ নাম ও জেলার ইতিবৃত্ত:</h4>
              <p>আপনার নামের অর্থ, কোনো বিখ্যাত ব্যক্তি ওই নামের আছেন কিনা এবং আপনার নিজ জেলার বিখ্যাত স্থান, ঐতিহ্য ও মুক্তিযুদ্ধের ইতিহাস জেনে যান।</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 space-y-1">
              <h4 className="font-bold text-slate-900">২. ‘জানিনা’ বলার কৌশল:</h4>
              <p>কোনো প্রশ্নের উত্তর জানা না থাকলে অনুমাননির্ভর উত্তর না দিয়ে বিনীতভাবে বলুন, "স্যার/ম্যাডাম, এই মুহূর্তে তথ্যটি আমার মনে পড়ছে না।"</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 space-y-1">
              <h4 className="font-bold text-slate-900">৩. পদের দায়িত্ব সম্পর্কে স্বচ্ছ ধারণা:</h4>
              <p>যে পদে পরীক্ষা দিচ্ছেন (যেমন: সহকারী স্টেশন মাস্টার বা সিনিয়র অফিসার), তার মূল কাজ ও দায়িত্ব কী তা জেনে যাওয়া আবশ্যক।</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 space-y-1">
              <h4 className="font-bold text-slate-900">৪. মার্জিত পোশাক ও বডি ল্যাঙ্গুয়েজ:</h4>
              <p>হালকা রঙের ফর্মাল শার্ট, গাঢ় প্যান্ট ও পালিশ করা জুতো পরুন। বসার অনুমতি পাওয়ার পর হাসিমুখে বসুন।</p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom In-article ad */}
      <AdSenseBanner position="article-bottom" settings={settings} />
    </div>
  );
};
