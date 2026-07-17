export default function JoinPage() {
  return (
    <div className="bg-[#fcfaf7] text-[#2e3a28] min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-6 max-w-5xl mx-auto text-center">
        <h1 className="font-serif text-6xl mb-6">Become a Spartan.</h1>
        <p className="max-w-xl mx-auto text-lg mb-10 leading-relaxed">
          Join a community of thinkers, speakers, writers, and leaders who believe that 
          ideas deserve to be argued well. 
        </p>
        <div className="flex gap-4 justify-center">
          <a href="/join/register" className="bg-[#2e3a28] text-white px-8 py-4 font-bold">Begin Membership</a>
          <a href="https://chat.whatsapp.com/..." className="border border-[#2e3a28] px-8 py-4 font-bold">Join the Community</a>
        </div>
      </section>

      {/* Guidelines Section (Warm Tone) */}
      <section className="max-w-4xl mx-auto py-20 px-6">
        <h2 className="font-serif text-3xl mb-12">The Spartan Commitment</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="font-bold mb-2">Registration</h3>
            <p className="text-sm leading-relaxed">
              We welcome all applicants to begin their journey by making a modest 
              contribution of ₦2,000. This sustains our training resources and 
              the administrative care we provide to every member.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Probationary Period</h3>
            <p className="text-sm leading-relaxed">
              Consistent participation is a virtue we hold dear. Our month-long 
              probationary period is designed to help you integrate into our rhythms. 
              Active engagement during this time is the surest path to full membership.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}