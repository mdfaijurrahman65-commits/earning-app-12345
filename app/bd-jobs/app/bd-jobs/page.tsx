"use client";
import { useState } from "react";

export default function BDJobsPage() {
  const jobs = [
    { id: 1, title: "বাংলাদেশ সেনাবাহিনীতে সৈনিক পদে নিয়োগ 2026", deadline: "30 Nov 2026", type: "সরকারি" },
    { id: 2, title: "ব্র্যাক এ ফিল্ড অফিসার নিয়োগ", deadline: "25 Nov 2026", type: "বেসরকারি NGO" },
    { id: 3, title: "প্রাথমিক বিদ্যালয় সহকারী শিক্ষক নিয়োগ", deadline: "15 Dec 2026", type: "সরকারি" },
    { id: 4, title: "বাংলাদেশ রেলওয়ে নিয়োগ বিজ্ঞপ্তি", deadline: "10 Dec 2026", type: "সরকারি" },
  ];

  return (
    <div style={{ padding: '16px', background: '#f5f5f5', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '10px' }}>🇧🇩 BD Job Circular</h1>
      <p style={{ color: '#666', marginBottom: '16px' }}>নিয়মিত আপডেট - প্রতিদিন নতুন চাকরি</p>

      {jobs.map((job) => (
        <div key={job.id} style={{ background: 'white', border: '1px solid #ddd', padding: '14px', borderRadius: '12px', marginBottom: '12px' }}>
          <h2 style={{ fontWeight: 'bold', fontSize: '16px' }}>{job.title}</h2>
          <p style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>শেষ তারিখ: {job.deadline} | {job.type}</p>
          <button style={{ marginTop: '10px', background: '#16a34a', color: 'white', padding: '8px 14px', borderRadius: '8px', border: 'none', width: '100%' }}>
            বিস্তারিত দেখুন
          </button>
        </div>
      ))}

      <div style={{ marginTop: '20px', background: 'white', padding: '12px', borderRadius: '10px', fontSize: '13px' }}>
        <b>নিয়মিত আপলোড কিভাবে করবে?</b><br/>
        এই ফাইলটাই (page.tsx) এডিট করে উপরের jobs লিস্টে নতুন লাইন যোগ করলেই নতুন চাকরি যোগ হয়ে যাবে ভাই।
      </div>
    </div>
  );
}
