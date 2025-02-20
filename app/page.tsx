'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, RefreshCw, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function Home() {
  const [balance, setBalance] = useState(0);
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [solvedCount, setSolvedCount] = useState(0);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    setUserInput('');
  };

  const handleSubmit = () => {
    if (userInput.toLowerCase() === captchaText.toLowerCase()) {
      setBalance(prev => prev + 1);
      setSolvedCount(prev => prev + 1);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        generateCaptcha();
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          {/* Wallet Balance Card */}
          <Card className="mb-8 p-6 bg-black/30 backdrop-blur-lg border border-purple-500/20 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Wallet className="w-6 h-6 text-purple-400" />
                <span className="text-lg font-semibold text-white">Wallet Balance</span>
              </div>
              <motion.span 
                className="text-2xl font-bold text-purple-400"
                animate={{ scale: balance > 0 ? [1, 1.2, 1] : 1 }}
              >
                ₹{balance}
              </motion.span>
            </div>
          </Card>

          {/* Captcha Card */}
          <Card className="p-8 bg-black/40 backdrop-blur-xl border border-purple-500/20 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Solve Captcha</h1>
              <p className="text-gray-400">Earn ₹1 for each correct solution</p>
            </div>

            {/* Captcha Display */}
            <div className="mb-6">
              <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-6 rounded-lg text-center">
                <span className="text-2xl font-mono tracking-wider text-white select-none">
                  {captchaText || 'Loading...'}
                </span>
              </div>
              <button
                onClick={generateCaptcha}
                className="mt-2 text-purple-400 hover:text-purple-300 flex items-center gap-2 mx-auto"
              >
                <RefreshCw className="w-4 h-4" /> Refresh
              </button>
            </div>

            {/* Input Field */}
            <div className="space-y-4">
              <Input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter captcha text"
                className="bg-black/20 border-purple-500/30 text-white placeholder:text-gray-500"
              />
              <Button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                Submit
              </Button>
            </div>

            {/* Success Animation */}
            {showSuccess && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <CheckCircle className="w-16 h-16 text-green-500" />
              </motion.div>
            )}
          </Card>

          {/* Subscription Dialog */}
          {solvedCount >= 10 && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-4 w-full bg-gradient-to-r from-purple-600 to-blue-600">
                  Upgrade to Premium
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-black/90 backdrop-blur-xl border border-purple-500/20">
                <DialogHeader>
                  <DialogTitle className="text-2xl text-white">Upgrade to Premium</DialogTitle>
                </DialogHeader>
                <div className="p-6">
                  <div className="text-center mb-6">
                    <p className="text-3xl font-bold text-purple-400">₹99</p>
                    <p className="text-gray-400">per month</p>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
                    Subscribe Now
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </motion.div>
      </div>
    </div>
  );
}