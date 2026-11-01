import { CategoryInfo, JobCategory } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'govt',
    nameBn: 'সরকারি চাকরি',
    nameEn: 'Government Jobs',
    icon: 'Landmark',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  },
  {
    id: 'bank',
    nameBn: 'ব্যাংক ও আর্থিক প্রতিষ্ঠান',
    nameEn: 'Bank Jobs',
    icon: 'Building2',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  {
    id: 'teacher',
    nameBn: 'শিক্ষক ও শিক্ষা প্রতিষ্ঠান',
    nameEn: 'Teaching & Education',
    icon: 'GraduationCap',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
  },
  {
    id: 'defence',
    nameBn: 'প্রতিরক্ষা ও পুলিশ',
    nameEn: 'Defence & Police',
    icon: 'Shield',
    badgeColor: 'bg-red-100 text-red-800 border-red-200',
  },
  {
    id: 'it',
    nameBn: 'আইটি ও সফটওয়্যার',
    nameEn: 'IT & Software Jobs',
    icon: 'Laptop',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  },
  {
    id: 'private',
    nameBn: 'বেসরকারি কোম্পানি',
    nameEn: 'Private Company Jobs',
    icon: 'Briefcase',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
  },
  {
    id: 'ngo',
    nameBn: 'এনজিও ও আন্তর্জাতিক সংস্থা',
    nameEn: 'NGO & Development',
    icon: 'Globe',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
  },
  {
    id: 'medical',
    nameBn: 'স্বাস্থ্য ও চিকিৎসা',
    nameEn: 'Health & Medical',
    icon: 'Stethoscope',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
  },
];

export const DIVISIONS = [
  'সকল বিভাগ (All Divisions)',
  'ঢাকা (Dhaka)',
  'চট্টগ্রাম (Chattogram)',
  'রাজশাহী (Rajshahi)',
  'খুলনা (Khulna)',
  'বরিশাল (Barishal)',
  'সিলেট (Sylhet)',
  'রংপুর (Rangpur)',
  'ময়মনসিংহ (Mymensingh)',
];

export const POPULAR_DISTRICTS = [
  'সকল জেলা (All Districts)',
  'ঢাকা',
  'চট্টগ্রাম',
  'কুমিল্লা',
  'বগুড়া',
  'রাজশাহী',
  'খুলনা',
  'সিলেট',
  'ময়মনসিংহ',
  'রংপুর',
  'বরিশাল',
  'গাজীপুর',
  'নারায়ণগঞ্জ',
  'কক্সবাজার',
  'যশোর',
  'দিনাজপুর',
  'পাবনা',
  'কুষ্টিয়া',
  'টাঙ্গাইল',
  'ফরিদপুর',
  'ব্রাহ্মণবাড়িয়া',
  'নোয়াখালী',
];

export const EDUCATION_LEVELS = [
  'সকল যোগ্যতা (Any Qualification)',
  '৮ম শ্রেণী / জেএসসি (Class 8 / JSC)',
  'এসএসসি / সমমান (SSC / Dakhil)',
  'এইচএসসি / সমমান (HSC / Alim)',
  'ডিপ্লোমা (Diploma in Engineering)',
  'স্নাতক / ডিগ্রি (Bachelor / Honors)',
  'স্নাতকোত্তর (Master / Equivalent)',
  'মেডিকেল / বিএসসি ইঞ্জিনিয়ারিং (MBBS/B.Sc)',
];
