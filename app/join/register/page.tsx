"use client";

import { useActionState, useEffect, useState } from "react";
import { submitMembershipApplication } from "@/lib/actions/membership";
import { SubmitButton } from "@/components/submit-button";
import { Shield, CheckCircle2, ArrowLeft } from "lucide-react";
import { FileUploadField } from "@/components/ui/file-upload";
import { useRouter } from "next/navigation";

const theme = {
  bg: "bg-[#fcfaf7]",
  border: "border-[#2e3a28]/20",
  forest: "bg-[#2e3a28]",
};

export default function RegisterPage() {
  const [state, action] = useActionState(submitMembershipApplication, { 
    success: false, 
    message: "", 
    redirectUrl: "" 
  });
  const router = useRouter();
  const [seconds, setSeconds] = useState(5);

  // Redirect Timer
  useEffect(() => {
    if (state.success && state.redirectUrl) {
      const timer = setInterval(() => {
        setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      if (seconds === 0) {
        router.push(state.redirectUrl);
      }
      return () => clearInterval(timer);
    }
  }, [state, seconds]);

  // --- SUCCESS VIEW ---
  if (state.success) {
    return (
      <main className={`min-h-screen py-20 px-6 font-serif`}>
        <div className="max-w-2xl mx-auto border ${theme.border} p-12 text-center shadow-sm">
          <CheckCircle2 className="mx-auto text-green-700 mb-6" size={48} />
          <h1 className="text-4xl! mb-4">Application Received!</h1>
          <p className="mb-8 opacity-80 leading-relaxed">
            Thank you for taking the first step toward becoming a Spartan. An admin will contact you soon to schedule your interview. You will be redirected in {seconds} seconds.
          </p>
          <a href={state.redirectUrl} className={`${theme.forest}  px-8 py-4 font-bold inline-block hover:opacity-90 transition-opacity`}>
            Join the UNDS Community
          </a>
        </div>
      </main>
    );
  }

  // --- REGISTRATION VIEW ---
  return (
    <main className={` min-h-screen py-20 px-6 font-seri7f flex flex-col gap-`}>
        <div>
            <a href="/join" className="inline-flex items-center gap-5 text-sm font-medium text-primary hover:underline">
                <ArrowLeft size={16} /> Back
            </a>
        </div>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl! mb-12">Membership Registration</h1>
        
        <div className="grid lg:grid-cols-[350px,1fr] gap-12">
          {/* Left Column: Info Cards */}
          <div className="space-y-6">
            <div className={`border ${theme.border} p-8`}>
              <Shield className="mb-4 opacity-50" size={32} />
              <h2 className="font-bold text-xl! mb-2">₦2,000</h2>
              <p className="text-sm opacity-70 leading-relaxed">Your contribution supports trainings, tournaments, member resources, and society administration.</p>
            </div>
            
            <div className={`border ${theme.border} p-8 `}>
              <h2 className="font-bold text-lg! mb-4">Payment Details</h2>
              <div className="space-y-3 text-sm opacity-80">
                <p><strong>Account Name:</strong> University of Nigeria Debating Society</p>
                <p><strong>Bank:</strong> First Bank</p>
                <p><strong>Number:</strong> 2044682352</p>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <form action={action} className="border ${theme.border} flex flex-col gap-4 p-8 space-y-6 shadow-sm">
            {state?.message && !state.success && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-sm">
                {state.message}
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <input name="firstName" placeholder="First Name *" className={`border ${theme.border} p-4 w-full bg-transparent focus:outline-none`} required />
              <input name="lastName" placeholder="Last Name *" className={`border ${theme.border} p-4 w-full bg-transparent focus:outline-none`} required />
            </div>
            
            <input name="email" type="email" placeholder="Email Address *" className={`border ${theme.border} p-4 w-full bg-transparent focus:outline-none`} required />
            <input name="phone" placeholder="Phone Number *" className={`border ${theme.border} p-4 w-full bg-transparent focus:outline-none`} required />
            
            <div className="grid grid-cols-2 gap-4">
              <input name="faculty" placeholder="Faculty *" className={`border ${theme.border} p-4 w-full bg-transparent focus:outline-none`} required />
              <input name="department" placeholder="Department *" className={`border ${theme.border} p-4 w-full bg-transparent focus:outline-none`} required />
            </div>

            <input name="level" placeholder="Level/Year *" className={`border ${theme.border} p-4 w-full bg-transparent focus:outline-none`} required />

            <FileUploadField theme={{
                          border: ""
                      }}/>
            
            <SubmitButton />
          </form>
        </div>
      </div>
    </main>
  );
}