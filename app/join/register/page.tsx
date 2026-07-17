export default function RegisterPage() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-6">
      <h1 className="font-serif text-4xl mb-8">Membership Registration</h1>
      
      {/* Payment Details Card */}
      <div className="border border-[#2e3a28]/20 p-8 mb-10 bg-white">
        <h2 className="font-serif text-xl mb-4">Payment Details</h2>
        <div className="space-y-2 text-sm">
          <p><strong>Account Name:</strong> University of Nigeria Debating Society</p>
          <p><strong>Bank:</strong> First Bank</p>
          <p><strong>Account Number:</strong> 2044682352</p>
        </div>
      </div>

      <form action={submitMembershipApplication} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <input name="firstName" placeholder="First Name" className="border p-3 w-full" required />
          <input name="lastName" placeholder="Last Name" className="border p-3 w-full" required />
        </div>
        <input name="email" type="email" placeholder="Email Address" className="border p-3 w-full" required />
        <input name="phone" placeholder="Phone Number" className="border p-3 w-full" />
        
        {/* File Upload Section */}
        <div className="border-2 border-dashed p-8 text-center">
          <label className="cursor-pointer">
            <span className="block font-bold">Upload Proof of Payment</span>
            <input type="file" name="receipt" className="hidden" accept=".pdf,.jpg,.png" />
          </label>
        </div>

        <button type="submit" className="w-full bg-[#2e3a28] text-white py-4 font-bold">
          Submit Registration
        </button>
      </form>
    </div>
  );
}