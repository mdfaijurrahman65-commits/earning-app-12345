import React, { useState } from 'react';
import { X, MessageSquare, Copy, CheckCircle2, Phone, AlertCircle } from 'lucide-react';

interface TeletalkHelperModalProps {
  onClose: () => void;
}

export const TeletalkHelperModal: React.FC<TeletalkHelperModalProps> = ({ onClose }) => {
  const [appCode, setAppCode] = useState('BR');
  const [userId, setUserId] = useState('');
  const [userPin, setUserPin] = useState('');
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const firstSms = `${appCode.toUpperCase()} ${userId || 'USERID'}`;
  const secondSms = `${appCode.toUpperCase()} YES ${userPin || 'PIN'}`;
  const recoverUserSms = `${appCode.toUpperCase()} HELP USER 01XXXXXXXXX`;
  const recoverPinSms = `${appCode.toUpperCase()} HELP PIN ${userId || 'USERID'}`;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/70 p-4 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-['Hind_Siliguri']">
                টেলিটক আবেদন ফি এসএমএস (SMS) জেনারেটর
              </h3>
              <p className="text-xs text-slate-500">সরকারি চাকরির আবেদন ফি জমা দেওয়ার সহজ নিয়ম</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                সার্কুলার কোড (যেমন: BR, DPE, DGHS):
              </label>
              <input
                type="text"
                value={appCode}
                onChange={(e) => setAppCode(e.target.value.toUpperCase())}
                placeholder="BR"
                className="w-full rounded-xl border border-slate-300 p-2 text-sm font-mono uppercase text-slate-900 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                আপনার USER ID (আবেদন ফরমের):
              </label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="ABCDEF"
                className="w-full rounded-xl border border-slate-300 p-2 text-sm font-mono text-slate-900 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              প্রথম এসএমএস-এর পর পাওয়া PIN (যদি থাকে):
            </label>
            <input
              type="text"
              value={userPin}
              onChange={(e) => setUserPin(e.target.value)}
              placeholder="12345678"
              className="w-full rounded-xl border border-slate-300 p-2 text-sm font-mono text-slate-900 focus:outline-hidden"
            />
          </div>

          {/* Formatted SMS cards */}
          <div className="space-y-3 pt-2">
            {/* 1st SMS */}
            <div className="rounded-2xl bg-blue-50/70 border border-blue-200 p-3.5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-blue-900">১ম এসএমএস (টেলিটক সিম থেকে):</span>
                <span className="text-[11px] font-mono font-bold text-blue-700">পাঠাবেন: 16222</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white p-2.5 border border-blue-200">
                <code className="text-sm font-mono font-bold text-slate-800">{firstSms}</code>
                <button
                  onClick={() => copyToClipboard(firstSms, 'first')}
                  className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700"
                >
                  <Copy className="h-3 w-3" />
                  <span>{copiedType === 'first' ? 'কপি হয়েছে' : 'কপি করুন'}</span>
                </button>
              </div>
            </div>

            {/* 2nd SMS */}
            <div className="rounded-2xl bg-emerald-50/70 border border-emerald-200 p-3.5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-emerald-900">২য় এসএমএস (টাকা কাটার সম্মতি):</span>
                <span className="text-[11px] font-mono font-bold text-emerald-700">পাঠাবেন: 16222</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white p-2.5 border border-emerald-200">
                <code className="text-sm font-mono font-bold text-slate-800">{secondSms}</code>
                <button
                  onClick={() => copyToClipboard(secondSms, 'second')}
                  className="flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-700"
                >
                  <Copy className="h-3 w-3" />
                  <span>{copiedType === 'second' ? 'কপি হয়েছে' : 'কপি করুন'}</span>
                </button>
              </div>
            </div>

            {/* Help / Recovery */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3 text-xs text-slate-600 space-y-1.5">
              <span className="font-bold text-slate-800 block">ইউজার আইডি বা পিন ভুলে গেলে:</span>
              <p>• ইউজার আইডি পেতে: <code className="bg-white px-1.5 py-0.5 rounded font-mono font-bold">{recoverUserSms}</code> send to 16222</p>
              <p>• পিন পুনরুদ্ধার করতে: <code className="bg-white px-1.5 py-0.5 rounded font-mono font-bold">{recoverPinSms}</code> send to 16222</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
