import React, { useState } from 'react';
import Dashboard from './Dashboard';
import SplashScreen from './SplashScreen';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [showSplash, setShowSplash] = useState(false);

  return (
    <div className="relative min-h-screen bg-slate-950 text-white">
      <AnimatePresence mode="wait">
        {showSplash ? (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-50"
          >
            <SplashScreen onFinish={() => setShowSplash(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="min-h-screen"
          >
            <Dashboard onReplaySplash={() => setShowSplash(true)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

