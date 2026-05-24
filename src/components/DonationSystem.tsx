import React, { useState } from "react";
import { auth, db, handleFirestoreError, OperationType } from "../firebase/setup";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { CreditCard, Sparkles, Heart, Shield, CheckCircle, Smartphone, ArrowRight, Gift, Award } from "lucide-react";

interface DonationSystemProps {
  onNewActivityRegistered?: () => void;
}

export default function DonationSystem({ onNewActivityRegistered }: DonationSystemProps) {
  const [donorName, setDonorName] = useState("");
  const [amount, setAmount] = useState<number>(250);
  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "Razorpay">("Razorpay");
  const [customActive, setCustomActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [txReceipt, setTxReceipt] = useState<any | null>(null);

  const donationTiers = [
    { value: 100, label: "₹100", desc: "Covers Server Operations" },
    { value: 250, label: "₹250", desc: "Funds Model API Searches" },
    { value: 500, label: "₹500", desc: "Supports Content Editors" },
    { value: 1000, label: "₹1000", desc: "Super Scholar Sponsor" }
  ];

  const handlePresetClick = (val: number) => {
    setAmount(val);
    setCustomActive(false);
  };

  // Triggers simulated Razorpay flow and records transactions securely insideFirestore
  const handleCheckoutProcess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount <= 0) return;

    setIsProcessing(true);
    setTxReceipt(null);

    // Simulate multi-stage quantum banking transition
    setTimeout(async () => {
      const generatedTxId = "don_" + Date.now();
      const finalDonorName = donorName.trim() || "Generous Supporter";

      try {
        // Build payload obeying Firestore ABAC schema guidelines
        const donationPayload = {
          donationId: generatedTxId,
          userId: auth.currentUser?.uid || "anonymous",
          donorName: finalDonorName,
          amount: Number(amount),
          paymentMethod: paymentMethod,
          status: "success",
          createdAt: serverTimestamp() // Strictly mandated by firestore.rules
        };

        // Write record into ledger
        await setDoc(doc(db, "donations", generatedTxId), donationPayload);

        // Success receipt state triggers
        setTxReceipt({
          id: generatedTxId,
          name: finalDonorName,
          amount: amount,
          method: paymentMethod,
          date: new Date().toLocaleDateString()
        });

        if (onNewActivityRegistered) {
          onNewActivityRegistered();
        }

      } catch (err: any) {
        handleFirestoreError(err, OperationType.WRITE, `donations/${generatedTxId}`);
      } finally {
        setIsProcessing(false);
      }
    }, 2000);
  };

  const handleSimulationCertificateDownload = () => {
    if (!txReceipt) return;

    // Simulate downloading an official sponsorship certificate
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify({
        organization: "LIRAVEN Quantum Academy",
        donor: txReceipt.name,
        contribution: `₹${txReceipt.amount} INR`,
        transaction: txReceipt.id,
        status: "HONORARY_SPONSOR_VERIFIED",
        message: "Thank you for funding future Class 10 scholars across India. LIRAVEN is proud to have you on board."
      })
    )}`;
    
    const link = document.createElement("a");
    link.setAttribute("href", jsonString);
    link.setAttribute("download", `LIRAVEN_Sponsor_Receipt_${txReceipt.id}.json`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-white font-sans z-10 relative">
      {/* Intro Appeal */}
      <div className="text-center mb-12">
        <div className="bg-white/5 text-purple-400 p-4 rounded-full border border-white/10 max-w-max mx-auto mb-5 animate-pulse">
          <Heart className="h-6 w-6 fill-purple-500 text-purple-400" />
        </div>
        <h2 className="text-4xl font-bold tracking-tight text-white font-display">
          Support LIRAVEN
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2 leading-relaxed font-light">
          LIRAVEN is completely ad-free. Your small contributions keep our API endpoints active, fund student study materials, and keep high-quality education free for anyone, anywhere.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column Donation Panel */}
        <div className="md:col-span-7 bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl backdrop-blur-xl shadow-2xl">
          {txReceipt ? (
            /* Success State Receipt Card */
            <div className="text-center space-y-6 py-4 font-sans">
              <div className="mx-auto bg-cyan-500/10 p-4 rounded-full max-w-max border border-cyan-400/20">
                <CheckCircle className="h-10 w-10 text-cyan-400 shrink-0" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white font-display">Transaction Successful!</h3>
                <p className="text-slate-400 text-xs mt-1">Thank you for your generous support of open-source education.</p>
              </div>

              <div className="bg-white/5 p-5 rounded-2xl border border-white/10 text-left space-y-3 font-light">
                <div className="flex justify-between text-xs text-slate-400 border-b border-white/5 pb-2.5">
                  <span>Transaction ID:</span>
                  <span className="font-mono text-cyan-400 truncate max-w-40">{txReceipt.id}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400 border-b border-white/5 pb-2.5">
                  <span>Sponsor:</span>
                  <span className="text-white font-medium">{txReceipt.name}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400 border-b border-white/5 pb-2.5">
                  <span>Contribution:</span>
                  <span className="text-cyan-400 font-semibold text-base">₹{txReceipt.amount}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Gateway:</span>
                  <span className="text-slate-300 font-medium">{txReceipt.method} Mode</span>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 pt-2">
                <button
                  onClick={handleSimulationCertificateDownload}
                  className="bg-white hover:bg-cyan-50 text-[#0F172A] font-semibold py-3 px-5 rounded-full text-xs flex items-center justify-center gap-1.5 transition duration-300 cursor-pointer shadow"
                >
                  <Award className="h-4.5 w-4.5 text-yellow-500 animate-pulse" />
                  Download Sponsor Certificate
                </button>
                <button
                  onClick={() => {
                    setTxReceipt(null);
                    setDonorName("");
                    setAmount(250);
                  }}
                  className="text-xs text-slate-400 hover:text-white transition duration-300 cursor-pointer underline"
                >
                  Make Another Contribution
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleCheckoutProcess} className="space-y-6">
              {/* Preset Chips */}
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-widest font-semibold font-display block mb-3.5">
                  Select Contribution Tier
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {donationTiers.map((tier) => (
                    <button
                      key={tier.value}
                      type="button"
                      onClick={() => handlePresetClick(tier.value)}
                      className={`p-4 rounded-2xl border text-center transition-all duration-300 cursor-pointer flex flex-col items-center justify-center ${
                        amount === tier.value && !customActive
                          ? "bg-white border-white text-[#0F172A] shadow-md"
                          : "bg-white/5 border-white/10 hover:border-white/30 text-slate-300"
                      }`}
                    >
                      <span className="font-bold tracking-wide text-xs uppercase">{tier.label}</span>
                      <span className="text-[9px] text-slate-400 mt-1">{tier.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold font-display">
                    Custom Support Value
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setCustomActive(true);
                      setAmount(50);
                    }}
                    className={`text-xs transition ${customActive ? "text-cyan-400 font-semibold" : "text-slate-500 hover:text-slate-300"}`}
                  >
                    Custom Amount
                  </button>
                </div>
                {customActive && (
                  <div className="relative font-mono">
                    <span className="absolute left-4 top-3 text-slate-400">₹</span>
                    <input
                      type="number"
                      min="10"
                      max="100000"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 focus:border-cyan-400/50 p-3.5 pl-8 rounded-full font-bold text-white focus:outline-none transition leading-none text-xs"
                      placeholder="Enter custom amount in INR"
                    />
                  </div>
                )}
              </div>

              {/* Supporter Details */}
              <div className="space-y-2">
                <label className="text-xs text-slate-400 uppercase tracking-widest font-semibold font-display block">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="Anonymous Sponsor"
                  className="w-full bg-white/5 border border-white/10 focus:border-cyan-400/50 p-3.5 px-5 rounded-full text-white focus:outline-none transition text-xs leading-none"
                />
              </div>

              {/* Payment Mode Selector */}
              <div className="space-y-2">
                <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold font-display block">
                  Payment Method
                </span>
                <div className="grid grid-cols-2 gap-3.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("Razorpay")}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-full border text-xs font-semibold select-none cursor-pointer duration-300 transition-all ${
                      paymentMethod === "Razorpay"
                        ? "bg-cyan-500/10 border-cyan-400 text-cyan-400 shadow-md shadow-cyan-400/5"
                        : "bg-white/5 hover:bg-white/10 border-white/10 text-slate-400"
                    }`}
                  >
                    <CreditCard className="h-4 w-4 shrink-0 text-cyan-400" /> Razorpay
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("UPI")}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-full border text-xs font-semibold select-none cursor-pointer duration-300 transition-all ${
                      paymentMethod === "UPI"
                        ? "bg-cyan-500/10 border-cyan-400 text-cyan-400 shadow-md shadow-cyan-400/5"
                        : "bg-white/5 hover:bg-white/10 border-white/10 text-slate-400"
                    }`}
                  >
                    <Smartphone className="h-4 w-4 shrink-0 text-cyan-400" /> UPI QR
                  </button>
                </div>
              </div>

              {/* Simulated Submit button */}
              <button
                type="submit"
                disabled={isProcessing || !amount || amount <= 0}
                className="w-full bg-white hover:bg-cyan-50 text-[#0F172A] font-bold p-4 rounded-full shadow-lg active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-55 disabled:scale-100"
              >
                {isProcessing ? (
                  <>
                    <span className="h-4 w-4 border-2 border-[#0F172A] border-t-transparent rounded-full animate-spin" />
                    Processing Secure Payment Gate...
                  </>
                ) : (
                  <>
                    <span>Sponsor Project with ₹{amount}</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Column QR Section */}
        <div className="md:col-span-5 space-y-6">
          {/* Neon QR Card */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl text-center shadow-2xl relative overflow-hidden group">
            <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest block mb-4 font-display">
              UPI Instant QR Gateway
            </span>

            {/* Simulated Neon Styled QR Code */}
            <div className="bg-white/5 border-2 border-white/10 p-4 rounded-3xl inline-block shadow-lg transition-all duration-300">
              <div className="w-40 h-40 bg-white p-2 rounded-2xl relative flex items-center justify-center shadow">
                <div className="grid grid-cols-4 gap-2 w-full h-full opacity-90 p-1">
                  <div className="bg-slate-950 rounded" />
                  <div className="bg-slate-950 rounded" />
                  <div className="bg-purple-600 rounded" />
                  <div className="bg-slate-950 rounded" />
                  <div className="bg-purple-600 rounded" />
                  <div className="bg-slate-950 rounded" />
                  <div className="bg-slate-300 rounded" />
                  <div className="bg-purple-600 rounded" />
                  <div className="bg-slate-950 rounded" />
                  <div className="bg-slate-300 rounded" />
                  <div className="bg-purple-600 rounded" />
                  <div className="bg-slate-950 rounded" />
                  <div className="bg-purple-600 rounded" />
                  <div className="bg-slate-950 rounded" />
                  <div className="bg-slate-950 rounded" />
                  <div className="bg-purple-600 rounded" />
                </div>
                {/* Center logo badge overlay */}
                <div className="absolute bg-[#0F172A] border border-cyan-400 p-1 rounded-md text-[8px] font-black text-cyan-400 font-display">
                  LIRAVEN
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-1">
              <p className="text-xs text-slate-300 font-bold">UPI ID: <span className="text-cyan-400 select-all font-mono">liraven@axis</span></p>
              <p className="text-[10px] text-slate-500">Supports GPay, PhonePe, Paytm, and Bhim UPI</p>
            </div>
          </div>

          {/* Bullet Credits and Safeguards */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
            <h4 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider font-display">
              System Guidelines
            </h4>
            <div className="flex items-start gap-3.5">
              <Shield className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                All mock payments utilize test interfaces or directly credit the open creator ledgers. Data operations are fully encrypted.
              </p>
            </div>
            <div className="flex items-start gap-3.5">
              <Gift className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Donors funding above ₹250 receive an official LIRAVEN Honorary Patron Certificate of support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
