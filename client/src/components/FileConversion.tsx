'use client';

import { useDropzone } from 'react-dropzone';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

interface FileConversionProps {
  onUpgradePrompt?: () => void;
}

const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://mp4-to-mp3-backend-hu8o.onrender.com';

type Stage = 'idle' | 'selected' | 'converting' | 'done' | 'error';

const fmt = (b: number) =>
  b < 1024 * 1024 ? `${(b / 1024).toFixed(0)} KB` : `${(b / (1024 * 1024)).toFixed(1)} MB`;

export default function FileConversion({ onUpgradePrompt }: FileConversionProps) {
  const [file, setFile]           = useState<File | null>(null);
  const [stage, setStage]         = useState<Stage>('idle');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [progress, setProgress]   = useState(0);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/conversionCount`).then(r => setTotalCount(r.data.totalCount)).catch(() => {});
  }, []);

  const onDrop = useCallback((files: File[]) => {
    setIsDragOver(false);
    if (!files.length) return;
    setFile(files[0]);
    setStage('selected');
    setDownloadUrl('');
    setProgress(0);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'video/mp4': ['.mp4'] },
    maxFiles: 1,
    onDrop,
    onDragEnter: () => setIsDragOver(true),
    onDragLeave: () => setIsDragOver(false),
  });

  const handleConvert = async () => {
    if (!file) return;
    setStage('converting');
    setProgress(0);
    const tick = setInterval(() => setProgress(p => (p < 82 ? p + Math.random() * 9 : p)), 380);
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await axios.post(`${API_URL}/convert`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      clearInterval(tick);
      setProgress(100);
      setTimeout(() => { setDownloadUrl(res.data.downloadUrl); setStage('done'); }, 350);
    } catch {
      clearInterval(tick);
      setStage('error');
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    // Fix: ensure correct protocol for localhost
    let url = downloadUrl;
    if (process.env.NODE_ENV === 'development') {
      url = url.replace(/^https:\/\/localhost/, 'http://localhost');
    }
    const a = document.createElement('a');
    a.href = url;
    a.download = url.split('/').pop() || 'converted.mp3';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const reset = () => { setFile(null); setStage('idle'); setDownloadUrl(''); setProgress(0); };

  return (
    <div className="w-full">
      {/* Drop zone */}
      <motion.div
        {...getRootProps()}
        animate={isDragOver ? { scale: 1.01 } : { scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="relative w-full cursor-pointer border transition-colors duration-200"
        style={{
          borderColor: isDragOver ? 'var(--accent)' : stage === 'selected' ? 'var(--text)' : 'var(--border)',
          backgroundColor: isDragOver ? 'var(--accent-dim)' : 'var(--surface)',
          padding: '3rem 2rem',
        }}
      >
        <input {...getInputProps()} />
        <AnimatePresence mode="wait">
          {stage === 'selected' && file ? (
            <motion.div key="sel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-2 text-center">
              <p className="font-display-md text-2xl" style={{ color: 'var(--text)' }}>
                {file.name}
              </p>
              <p className="text-sm" style={{ color: 'var(--text-2)' }}>{fmt(file.size)} · Drop another to replace</p>
            </motion.div>
          ) : (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3 text-center">
              <p className="font-display text-4xl sm:text-5xl" style={{ color: 'var(--text)' }}>
                DROP YOUR MP4
              </p>
              <p className="text-sm font-medium uppercase tracking-widest" style={{ color: 'var(--text-2)' }}>
                or click to browse
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Action area */}
      <div className="mt-4">
        <AnimatePresence mode="wait">

          {/* Convert button */}
          {stage === 'selected' && (
            <motion.button key="btn"
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}
              onClick={handleConvert}
              className="w-full py-4 text-sm font-700 uppercase tracking-[0.15em] flex items-center justify-between px-6 transition-colors duration-150"
              style={{ backgroundColor: 'var(--text)', color: 'var(--bg)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--text)'; }}
            >
              <span>Convert to MP3</span>
              <RefreshCw size={16} />
            </motion.button>
          )}

          {/* Progress */}
          {stage === 'converting' && (
            <motion.div key="prog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="w-full py-4 px-6 flex items-center justify-between"
              style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="flex-1 mr-6">
                <div className="h-px w-full" style={{ backgroundColor: 'var(--border)' }}>
                  <motion.div className="h-full" style={{ backgroundColor: 'var(--accent)' }}
                    animate={{ width: `${progress}%` }} transition={{ duration: 0.3, ease: 'easeOut' }} />
                </div>
              </div>
              <span className="text-xs font-700 uppercase tracking-widest tabular-nums" style={{ color: 'var(--text-2)' }}>
                {Math.round(progress)}%
              </span>
            </motion.div>
          )}

          {/* Done */}
          {stage === 'done' && (
            <motion.div key="done" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex gap-3">
              <motion.button
                whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}
                onClick={handleDownload}
                className="flex-1 py-4 text-sm font-700 uppercase tracking-[0.15em] flex items-center justify-between px-6 transition-colors duration-150"
                style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
              >
                <span>Download MP3</span>
                <Download size={16} />
              </motion.button>
              <button onClick={reset}
                className="px-5 py-4 text-xs font-600 uppercase tracking-widest transition-colors duration-150"
                style={{ border: '1px solid var(--border)', color: 'var(--text-2)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--text)'; (e.currentTarget as HTMLElement).style.color = 'var(--text)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-2)'; }}
              >
                <RefreshCw size={14} />
              </button>
            </motion.div>
          )}

          {/* Error */}
          {stage === 'error' && (
            <motion.div key="err" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex items-center justify-between px-6 py-4"
              style={{ border: '1px solid var(--border)' }}>
              <span className="text-sm font-medium" style={{ color: 'var(--text-2)' }}>
                Conversion failed — check the file and try again
              </span>
              <button onClick={reset} className="text-xs font-700 uppercase tracking-widest transition-colors duration-150 ml-4"
                style={{ color: 'var(--accent)' }}>
                Retry
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Meta row */}
      <div className="mt-5 flex items-center justify-between" style={{ color: 'var(--text-3)' }}>
        <div className="flex items-center gap-5 text-xs uppercase tracking-widest font-500">
          {['Free', 'Private', 'No limits'].map(l => (
            <span key={l} className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
              {l}
            </span>
          ))}
        </div>
        {totalCount !== null && totalCount > 0 && (
          <span className="text-xs uppercase tracking-widest font-500">
            {totalCount.toLocaleString()} conversions
          </span>
        )}
      </div>
    </div>
  );
}