"use client";

import { useRef, useState } from "react";
import { ArrowLeftIcon, PhoneIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const OTP_LENGTH = 6;

export function LoginDialog({ open, onOpenChange }) {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const otpRefs = useRef([]);

  const resetState = () => {
    setStep("phone");
    setPhone("");
    setOtp(Array(OTP_LENGTH).fill(""));
    setError("");
  };

  const handleOpenChange = (next) => {
    if (!next) resetState();
    onOpenChange?.(next);
  };

  const handlePhoneChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(digits);
    if (error) setError("");
  };

  const sendOtp = (e) => {
    e.preventDefault();
    if (phone.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setStep("otp");
    setTimeout(() => otpRefs.current[0]?.focus(), 0);
  };

  const handleOtpChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (error) setError("");
    if (digit && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((d, i) => (next[i] = d));
    setOtp(next);
    otpRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    if (otp.join("").length !== OTP_LENGTH) {
      setError("Please enter the 6-digit OTP.");
      return;
    }
    // Placeholder: wire this up to your auth backend.
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <span className="text-4xl font-bold tracking-tight text-[#002f34]">olx</span>
          <DialogTitle className="mt-3 text-xl">
            {step === "phone" ? "Login or Sign up" : "Verify your number"}
          </DialogTitle>
          <DialogDescription>
            {step === "phone"
              ? "Enter your mobile number to continue"
              : `We sent a 6-digit code to +91 ${phone}`}
          </DialogDescription>
        </div>

        {step === "phone" ? (
          <form onSubmit={sendOtp} className="mt-2 flex flex-col gap-4">
            <div>
              <div className="flex h-12 items-center overflow-hidden rounded-md border-2 border-[#002f34] focus-within:ring-2 focus-within:ring-[#3a77ff]/40">
                <span className="flex h-full items-center gap-1.5 border-r-2 border-[#002f34] bg-[#f2f4f5] px-3 text-sm font-semibold text-[#002f34]">
                  <PhoneIcon className="size-4" />
                  +91
                </span>
                <input
                  type="tel"
                  inputMode="numeric"
                  autoFocus
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="Enter mobile number"
                  className="h-full flex-1 bg-transparent px-3 text-base outline-none placeholder:text-muted-foreground"
                />
              </div>
              {error && <p className="mt-1.5 text-sm text-destructive">{error}</p>}
            </div>

            <Button
              type="submit"
              className="h-12 w-full rounded-md bg-[#002f34] text-base font-bold hover:bg-[#002f34]/90">
              Continue
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              By continuing, you agree to OLX{"'"}s{" "}
              <a href="#" className="underline">Terms of use</a> and{" "}
              <a href="#" className="underline">Privacy policy</a>.
            </p>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="mt-2 flex flex-col gap-4">
            <div>
              <div className="flex justify-center gap-2" onPaste={handleOtpPaste}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (otpRefs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className="size-11 rounded-md border-2 border-[#002f34] text-center text-lg font-semibold outline-none focus:ring-2 focus:ring-[#3a77ff]/40"
                  />
                ))}
              </div>
              {error && (
                <p className="mt-2 text-center text-sm text-destructive">{error}</p>
              )}
            </div>

            <Button
              type="submit"
              className="h-12 w-full rounded-md bg-[#002f34] text-base font-bold hover:bg-[#002f34]/90">
              Verify &amp; Continue
            </Button>

            <div className="flex items-center justify-between text-sm">
              <button
                type="button"
                onClick={() => {
                  setStep("phone");
                  setOtp(Array(OTP_LENGTH).fill(""));
                  setError("");
                }}
                className="flex items-center gap-1 font-medium text-[#002f34] hover:underline">
                <ArrowLeftIcon className="size-4" />
                Change number
              </button>
              <button
                type="button"
                onClick={() => setOtp(Array(OTP_LENGTH).fill(""))}
                className="font-medium text-[#3a77ff] hover:underline">
                Resend OTP
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
