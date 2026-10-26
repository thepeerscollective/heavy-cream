'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useHC } from '@/lib/state';

export function Header() {
  const { count, setOpen, sound, setSound, bump, mode } = useHC();
  const [wob, setWob] = useState(false);
  useEffect(() => { if (!bump) return; setWob(true); const t = setTimeout(() => setWob(false), 500); return () => clearTimeout(t); }, [bump]);
  return (
    <>
      <div className="topbar">
        {mode === 'closed' ? 'closed for today. pre-order for tomorrow is open ;)' : 'pre-order tomorrow’s croissants till 21:00 ;)'}
      </div>
      <header className="header wrap">
        <Link href="/" className="brand" aria-label="heavy cream, home">
          <span className="logo">heavy cream</span>
          <span className="mono">bakery &amp; coffee · dalston</span>
        </Link>
        <div className="header-right">
          <button className="ding" role="switch" aria-checked={sound} onClick={() => setSound(!sound)}>
            <span className="small">listen for dings</span>
            <span className="toggle" aria-hidden><span /></span>
          </button>
          <button className={`boxicon ${wob ? 'wob' : ''}`} data-box-target onClick={() => setOpen(true)} aria-label={`your box, ${count} item${count === 1 ? '' : 's'}`}>
            <span className="lid" aria-hidden />
            <span className="badge" aria-hidden>{count}</span>
          </button>
        </div>
      </header>
    </>
  );
}

const LINKS = [['/menu/', 'menu'], ['/cakes/', 'cakes'], ['/coffee/', 'coffee'], ['/about/', 'about'], ['/about/#find-us', 'find us']] as const;

export function NavPill() {
  const path = usePathname();
  const { count, setOpen } = useHC();
  return (
    <nav className="navpill" aria-label="main">
      {LINKS.map(([h, l]) => (
        <Link key={l} href={h} aria-current={h.startsWith(path) && path !== '/' && !h.includes('#') ? 'page' : undefined} className={l === 'find us' || l === 'about' ? 'hide-m' : ''}>{l}</Link>
      ))}
      <Link href="/about/" className="show-m">more</Link>
      <button className="navbox" onClick={() => setOpen(true)}>box {count}</button>
    </nav>
  );
}
