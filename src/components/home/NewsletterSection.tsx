"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setIsSubmitted(true);
  };

  return (
    <section className="w-full py-20 sm:py-28 bg-neutral-900 text-white border-t border-neutral-800">
      <Container size="narrow">
        <div className="text-center space-y-6">
          <span className="text-xs uppercase tracking-luxury text-denim-300 font-semibold">
            PRIVILEGED ACCESS
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight">
            JOIN THE DENIM CLUB
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 max-w-md mx-auto font-light leading-relaxed">
            Get exclusive early access to new arrivals, curated private offers,
            and limited edition selvedge denim collections.
          </p>

          {isSubmitted ? (
            <div className="pt-6 pb-2 flex flex-col items-center justify-center space-y-3">
              <div className="flex items-center space-x-2 text-white">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-semibold tracking-wider uppercase">
                  Welcome to the Club
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                You will receive our next private lookbook update at {email}.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-3"
            >
              <div className="flex-grow flex flex-col items-start">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Enter your email address"
                  aria-label="Email address for newsletter"
                  required
                  className="w-full h-12 bg-neutral-800 border border-neutral-700 px-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                />
                {error && (
                  <span className="text-[11px] text-red-400 mt-1 pl-1">
                    {error}
                  </span>
                )}
              </div>
              <Button
                type="submit"
                variant="secondary"
                size="md"
                className="h-12 w-full sm:w-auto font-bold px-8 whitespace-nowrap"
              >
                SUBSCRIBE
              </Button>
            </form>
          )}

          <p className="text-[11px] text-neutral-500 max-w-xs mx-auto">
            By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
          </p>
        </div>
      </Container>
    </section>
  );
}
