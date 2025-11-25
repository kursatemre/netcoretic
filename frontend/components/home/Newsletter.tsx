'use client';

import { useState } from 'react';
import { Button, Input } from '@/components/ui';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: API call to subscribe
    console.log('Newsletter subscription:', email);

    setSubmitted(true);
    setEmail('');

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Kampanyalardan Haberdar Olun</h2>
          <p className="text-xl mb-8 text-gray-300">
            E-bültene abone olun, %10 indirim kazanın
          </p>

          {submitted ? (
            <div className="bg-green-500 text-white py-4 px-6 rounded-lg">
              ✓ Başarıyla abone oldunuz! E-postanızı kontrol edin.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="E-posta adresiniz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" size="lg" className="sm:w-auto">
                Abone Ol
              </Button>
            </form>
          )}

          <p className="text-sm text-gray-400 mt-4">
            Abone olarak <a href="#" className="underline">gizlilik politikamızı</a> kabul etmiş olursunuz.
          </p>
        </div>
      </div>
    </section>
  );
}
