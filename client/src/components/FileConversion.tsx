import { useDropzone } from 'react-dropzone';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, RotateCcw } from 'lucide-react';
import axios from 'axios';

interface FileConversionProps {
  onUpgradePrompt: () => void;
}

const FileConversion: React.FC<FileConversionProps> = ({ onUpgradePrompt }) => {
  const [conversionCount, setConversionCount] = useState(0); // Today's conversion count
  const [totalConversionCount, setTotalConversionCount] = useState(0); // Total conversion count (ever)
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [isConverted, setIsConverted] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);

  // Fetch today's conversion count and total conversion count
  useEffect(() => {
    const storedCount = localStorage.getItem('conversionCount');
    if (storedCount) setConversionCount(Number(storedCount));

    const storedTotalCount = localStorage.getItem('totalConversionCount');
    if (storedTotalCount) setTotalConversionCount(Number(storedTotalCount));

    const lastConversionDate = localStorage.getItem('lastConversionDate');
    if (lastConversionDate) {
      const today = new Date().toISOString().split('T')[0];
      const lastDate = new Date(lastConversionDate).toISOString().split('T')[0];
      if (today !== lastDate) {
        setConversionCount(0); // Reset daily count
        localStorage.setItem('conversionCount', '0');
      }
    }
  }, []);

  // Fetch the conversion count from the backend to ensure it's in sync
  useEffect(() => {
    const fetchConversionCount = async () => {
      try {
        const res = await axios.get('http://localhost:5000/conversionCount');
        setTotalConversionCount(res.data.totalCount);
      } catch (err) {
        console.error('Failed to fetch conversion count:', err);
      }
    };

    fetchConversionCount();
    const interval = setInterval(fetchConversionCount, 60000); // Update every 60 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'video/mp4': ['.mp4'] },
    onDrop: (acceptedFiles) => {
      if (conversionCount >= 3) {
        setShowUpgradePrompt(true);
        onUpgradePrompt();
        return;
      }
      setFile(acceptedFiles[0]);
      setIsConverted(false);
      setDownloadUrl('');
      setShowUpgradePrompt(false); // Reset the upgrade prompt when a new file is selected
    },
  });

  const handleConvert = async () => {
    if (!file) return;

    setIsConverting(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/convert', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setDownloadUrl(res.data.downloadUrl);
      setIsConverted(true);

      // Update today's conversion count
      const updatedCount = res.data.count;
      setConversionCount(updatedCount);
      localStorage.setItem('conversionCount', updatedCount.toString());
      localStorage.setItem('lastConversionDate', new Date().toISOString());

      // Update total conversion count
      const updatedTotalCount = totalConversionCount + 1; // Increment total count
      setTotalConversionCount(updatedTotalCount);
      localStorage.setItem('totalConversionCount', updatedTotalCount.toString());
    } catch (err) {
      console.error('Conversion error:', err);
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = downloadUrl.split('/').pop() || 'converted.mp3';
      a.click();
    }

    // Reset states after download and new file selection
    setIsConverted(false);
    setDownloadUrl('');
    setFile(null);
  };

  const handleConvertNext = () => {
    // Reset all states to allow the user to upload a new file
    setFile(null);
    setIsConverted(false);
    setDownloadUrl('');
    setShowUpgradePrompt(false); // Reset the upgrade prompt state if the user chooses to try again
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 p-6">
      <motion.div
        {...getRootProps()}
        whileHover={{ scale: 1.02 }}
        className="w-full sm:w-4/5 md:w-2/3 border-4 border-dashed border-gray-300 rounded-xl bg-white dark:bg-gray-900 p-10 text-center cursor-pointer transition-all duration-300"
      >
        <input {...getInputProps()} />
        <p className="text-lg font-medium text-gray-800 dark:text-white">
          Drag & drop your MP4 here or click to select
        </p>
      </motion.div>

      {file && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-md text-gray-700 dark:text-white"
        >
          Selected: <strong>{file.name}</strong>
        </motion.p>
      )}

      <div className="flex gap-6">
        {file && !isConverted && !isConverting  && conversionCount < 3 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95, rotate: -2 }}
            onClick={handleConvert}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#007AFF] text-white rounded-xl shadow font-semibold transition duration-300"
          >
            <RotateCcw size={20} />
            Convert
          </motion.button>
        )}
      </div>

      {isConverting && (
        <motion.div
          className="text-gray-500 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          >
            <RotateCcw size={20} />
          </motion.div>
          Converting...
        </motion.div>
      )}

      {isConverted && downloadUrl && (
        <motion.button
          onClick={handleDownload}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 bg-[#34C759] text-white rounded-xl shadow font-semibold hover:bg-[#28a745] transition duration-300"
        >
          <motion.span
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, repeatDelay: 2, duration: 1 }}
          >
            <Download size={20} />
          </motion.span>
          Download MP3
        </motion.button>
      )}

      {showUpgradePrompt && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1b1b1b] dark:bg-white transition duration-2 dark:text-black text-white px-6 py-4 rounded-lg text-center"
        >
          <p className="font-semibold">You’ve hit 3 free conversions today.</p>
          <a href="#pricing" className="text-[#007AFF] underline font-medium">Upgrade to Pro</a>
        </motion.div>
      )}

    </div>
  );
};

export default FileConversion;
