import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CertificateViewProps {
  isOpen: boolean;
  onClose: () => void;
  certificateUrl: string;
  certificateTitle: string;
  theme: 'light' | 'dark';
}

const CertificateView: React.FC<CertificateViewProps> = ({ isOpen, onClose, certificateUrl, certificateTitle, theme }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Certificate Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-4 md:inset-8 lg:inset-12 z-[101] flex flex-col"
          >
            {/* Header */}
            <div className={`flex items-center justify-between mb-4 px-4 py-3 rounded-t-xl ${
              theme === 'dark' ? 'bg-[#0a0a0a] border-white/10' : 'bg-white border-zinc-200'
            } border`}>
              <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                {certificateTitle}
              </h2>
              <button
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'text-zinc-400 hover:text-white hover:bg-white/10'
                    : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* PDF Viewer */}
            <div className={`flex-1 rounded-b-xl overflow-hidden border ${
              theme === 'dark' ? 'bg-[#0a0a0a] border-white/10' : 'bg-white border-zinc-200'
            }`}>
              <iframe
                src={certificateUrl}
                className="w-full h-full"
                title={`${certificateTitle} PDF`}
                style={{ minHeight: 'calc(100vh - 200px)' }}
              />
            </div>

            {/* Download Button */}
            <div className="mt-4 flex justify-center">
              <a
                href={certificateUrl}
                download={`${certificateTitle}.pdf`}
                className={`px-6 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                  theme === 'dark'
                    ? 'bg-white text-black hover:bg-zinc-200'
                    : 'bg-black text-white hover:bg-zinc-800'
                }`}
              >
                Download PDF
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CertificateView;
