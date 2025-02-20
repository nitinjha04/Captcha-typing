'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, IndianRupee, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export default function Withdraw() {
  const [balance] = useState(50);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [paymentDetails, setPaymentDetails] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleWithdraw = () => {
    if (paymentDetails) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
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
          {/* Balance Card */}
          <Card className="mb-8 p-6 bg-black/30 backdrop-blur-lg border border-purple-500/20 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Wallet className="w-6 h-6 text-purple-400" />
                <span className="text-lg font-semibold text-white">Available Balance</span>
              </div>
              <span className="text-2xl font-bold text-purple-400">₹{balance}</span>
            </div>
          </Card>

          {/* Withdrawal Form */}
          <Card className="p-8 bg-black/40 backdrop-blur-xl border border-purple-500/20 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Withdraw Funds</h1>
              <p className="text-gray-400">Minimum withdrawal amount: ₹10</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-white">Select Payment Method</Label>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="grid grid-cols-1 gap-4"
                >
                  <Label
                    htmlFor="upi"
                    className="flex items-center space-x-3 bg-black/20 p-4 rounded-lg cursor-pointer border border-purple-500/30 hover:border-purple-500/50 transition-colors"
                  >
                    <RadioGroupItem value="upi" id="upi" />
                    <span className="text-white">UPI</span>
                  </Label>
                  <Label
                    htmlFor="paytm"
                    className="flex items-center space-x-3 bg-black/20 p-4 rounded-lg cursor-pointer border border-purple-500/30 hover:border-purple-500/50 transition-colors"
                  >
                    <RadioGroupItem value="paytm" id="paytm" />
                    <span className="text-white">Paytm</span>
                  </Label>
                  <Label
                    htmlFor="bank"
                    className="flex items-center space-x-3 bg-black/20 p-4 rounded-lg cursor-pointer border border-purple-500/30 hover:border-purple-500/50 transition-colors"
                  >
                    <RadioGroupItem value="bank" id="bank" />
                    <span className="text-white">Bank Transfer</span>
                  </Label>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label className="text-white">
                  {paymentMethod === 'upi'
                    ? 'UPI ID'
                    : paymentMethod === 'paytm'
                    ? 'Paytm Number'
                    : 'Bank Account Details'}
                </Label>
                <Input
                  value={paymentDetails}
                  onChange={(e) => setPaymentDetails(e.target.value)}
                  placeholder={
                    paymentMethod === 'upi'
                      ? 'Enter your UPI ID'
                      : paymentMethod === 'paytm'
                      ? 'Enter Paytm number'
                      : 'Enter account number'
                  }
                  className="bg-black/20 border-purple-500/30 text-white placeholder:text-gray-500"
                />
              </div>

              <Button
                onClick={handleWithdraw}
                disabled={!paymentDetails || balance < 10}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                <IndianRupee className="w-4 h-4 mr-2" />
                Withdraw Funds
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Success Animation */}
            {showSuccess && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
              >
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <p className="text-white text-xl">Withdrawal Request Submitted!</p>
                </div>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}