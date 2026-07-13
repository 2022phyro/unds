import { Mail } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter-form";

export function NewsletterSignup() {
  return (
    <div className="border-t border-border pt-16 max-w-xl mx-auto text-center space-y-6">
      <div className="inline-flex p-3 rounded-full bg-[#2e3a28]/5 text-[#2e3a28]">
        <Mail className="w-5 h-5" />
      </div>
      <div className="space-y-2">
        <h3 className="font-garamond text-2xl font-light tracking-tight text-text-primary">
          Never miss an opening.
        </h3>
        <p className="font-garamond text-md  text-text-secondary max-w-sm mx-auto leading-relaxed">
          Stay up to date with the latest news, events, and opportunities from the UNDS. Sign up for our newsletter and be the first to know about upcoming debates, workshops, and exclusive content.
        </p>
      </div>
      <NewsletterForm source="home" className="max-w-md mx-auto" />
    </div>
  );
}
