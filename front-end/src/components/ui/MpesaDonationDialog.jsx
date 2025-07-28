import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Copy, Smartphone, CreditCard, CheckCircle, Phone } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const MpesaDonationDialog = ({ 
  isOpen, 
  onClose, 
  donationAmount, 
  setDonationAmount, 
  homeName,
  onConfirmDonation 
}) => {
  const [step, setStep] = useState(1); // 1: Amount, 2: M-Pesa Details, 3: Confirmation
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // M-Pesa payment details
  const mpesaDetails = {
    businessNumber: '254712321789',
    businessName: 'CareConnect Donations',
    accountReference: homeName ? `DONATION-${homeName.replace(/\s+/g, '').toUpperCase()}` : 'GENERAL-DONATION'
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const handleAmountSubmit = () => {
    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid donation amount",
        variant: "destructive"
      });
      return;
    }
    setStep(2);
  };

  const handlePhoneSubmit = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid M-Pesa phone number",
        variant: "destructive"
      });
      return;
    }
    setStep(3);
  };

  const handleConfirmPayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onConfirmDonation();
      toast({
        title: "Donation Successful!",
        description: `Thank you for your KES ${donationAmount} donation${homeName ? ` to ${homeName}` : ''}!`,
      });
      handleClose();
    }, 3000);
  };

  const handleClose = () => {
    setStep(1);
    setPhoneNumber('');
    setIsProcessing(false);
    onClose();
  };

  const formatPhoneNumber = (value) => {
    // Remove non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as Kenyan number
    if (digits.startsWith('254')) {
      return digits;
    } else if (digits.startsWith('0')) {
      return '254' + digits.slice(1);
    } else if (digits.length <= 9) {
      return '254' + digits;
    }
    return digits;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center">
            <Smartphone className="h-5 w-5 mr-2 text-green-400" />
            M-Pesa Donation
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            {step === 1 && "Enter your donation amount"}
            {step === 2 && "Follow the M-Pesa payment instructions"}
            {step === 3 && "Confirm your donation details"}
          </DialogDescription>
        </DialogHeader>

        {/* Step 1: Amount Entry */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Donation Amount (KES)</label>
              <Input
                type="number"
                placeholder="Enter amount in KES"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                className="input-field"
                min="1"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {[100, 500, 1000, 2000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setDonationAmount(amount.toString())}
                  className="glass-effect rounded-lg py-2 text-sm hover:bg-white/20 transition-colors text-white"
                >
                  {amount}
                </button>
              ))}
            </div>

            {homeName && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <p className="text-sm text-blue-300">
                  <strong>Donating to:</strong> {homeName}
                </p>
              </div>
            )}

            <Button onClick={handleAmountSubmit} className="w-full btn-primary">
              Continue to M-Pesa
            </Button>
          </div>
        )}

        {/* Step 2: M-Pesa Payment Details */}
        {step === 2 && (
          <div className="space-y-4">
            <Card className="bg-green-500/10 border-green-500/20">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Business Number:</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-white">{mpesaDetails.businessNumber}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(mpesaDetails.businessNumber, 'Business number')}
                      className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Business Name:</span>
                  <span className="text-white text-sm">{mpesaDetails.businessName}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Account Reference:</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-white text-xs">{mpesaDetails.accountReference}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(mpesaDetails.accountReference, 'Account reference')}
                      className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Amount:</span>
                  <span className="font-bold text-green-400">KES {donationAmount}</span>
                </div>
              </CardContent>
            </Card>

            <div className="bg-gray-800/50 rounded-lg p-4 space-y-2">
              <h4 className="font-medium text-white flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                How to pay via M-Pesa:
              </h4>
              <ol className="text-sm text-gray-300 space-y-1 list-decimal list-inside">
                <li>Go to M-Pesa on your phone</li>
                <li>Select "Lipa na M-Pesa"</li>
                <li>Select "Pay Bill"</li>
                <li>Enter Business Number: <strong>{mpesaDetails.businessNumber}</strong></li>
                <li>Enter Account Number: <strong>{mpesaDetails.accountReference}</strong></li>
                <li>Enter Amount: <strong>KES {donationAmount}</strong></li>
                <li>Enter your M-Pesa PIN and confirm</li>
              </ol>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Your M-Pesa Phone Number</label>
              <Input
                type="tel"
                placeholder="e.g., 254712345678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                className="input-field"
              />
              <p className="text-xs text-gray-400">
                We'll use this to track your payment confirmation
              </p>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button onClick={handlePhoneSubmit} className="flex-1 btn-primary">
                I've Sent Payment
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="space-y-4 text-center">
            <div className="flex justify-center">
              <div className="bg-green-500/20 rounded-full p-3">
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Confirm Your Donation</h3>
              <p className="text-gray-300 text-sm">
                Please confirm that you have sent the M-Pesa payment with the following details:
              </p>
            </div>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">Amount:</span>
                  <span className="text-white font-bold">KES {donationAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Phone Number:</span>
                  <span className="text-white">{phoneNumber}</span>
                </div>
                {homeName && (
                  <div className="flex justify-between">
                    <span className="text-gray-300">Beneficiary:</span>
                    <span className="text-white">{homeName}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <p className="text-xs text-gray-400">
              You will receive an M-Pesa confirmation SMS shortly. 
              Our team will verify the payment and send you a receipt.
            </p>

            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1" disabled={isProcessing}>
                Back
              </Button>
              <Button 
                onClick={handleConfirmPayment} 
                className="flex-1 btn-primary" 
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Confirm Donation'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default MpesaDonationDialog;