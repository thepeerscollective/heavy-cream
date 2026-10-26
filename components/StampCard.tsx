'use client';
import { useHC } from '@/lib/state';

export default function StampCard({ small = false }: { small?: boolean }) {
  const { stamps, ready } = useHC();
  const n = ready ? Math.min(9, stamps.length) : 0;
  return (
    <div className={`stamp-card ${small ? 'small' : ''}`} role="img" aria-label={`loyalty card, ${n} of 9 stamps${n >= 9 ? ', free coffee unlocked' : ''}`}>
      <p className="metal-s">HEAVY CREAM</p>
      <p className="mono">loyalty card · 9 stamps = free coffee</p>
      <div className="stamps">
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} className={i < n ? 'on' : ''} style={{ ['--i' as string]: i }}>
            {i < n && (
              <svg viewBox="0 0 40 40" aria-hidden><path d="M20 6c-7 0-12 5-12 11 0 4 2 6 4 7v4h3v-3h2v3h6v-3h2v3h3v-4c2-1 4-3 4-7 0-6-5-11-12-11z" /><circle cx="15" cy="17" r="3" fill="var(--cherry)" /><path d="M25 14c-1.5 0-2.5 1-2.5 2.3 0 2 2.5 3.4 2.5 3.4s2.5-1.4 2.5-3.4C27.5 15 26.5 14 25 14z" fill="var(--cherry)" /></svg>
            )}
          </span>
        ))}
      </div>
      <p className="small">{n >= 9 ? 'nine! show this at the till for a free coffee.' : 'one stamp per visit. it lives on this site, not in your wallet.'}</p>
    </div>
  );
}
