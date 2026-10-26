'use client';
import { useRef } from 'react';
import { MERCH, img, money, ADDRESS, hm, CLOSE } from '@/lib/data';
import { useHC } from '@/lib/state';

const CREW = [['crew-mo', 'mo', 'head baker · metal playlist'], ['crew-jas', 'jas', 'pastry · writes on cakes'], ['crew-lou', 'lou', 'coffee · spells names wrong']];

function Merch({ m }: { m: (typeof MERCH)[number] }) {
  const { add } = useHC(); const ref = useRef<HTMLDivElement>(null);
  return (
    <article className="card bean">
      <div ref={ref}><img src={img(m.img)} alt="" className="cutout" loading="lazy" /></div>
      <div className="frow"><h3 className="title-s">{m.name}</h3><span className="mono cherry">{money(m.price)}</span></div>
      <p className="small">{m.note}</p>
      <button className="btn fill sm" onClick={() => add({ id: m.id, name: m.name, price: m.price, kind: 'merch', img: m.img }, ref.current)}>add</button>
    </article>
  );
}

export default function About() {
  const { mode, toast, peek } = useHC();
  const copy = async () => { try { await navigator.clipboard.writeText(ADDRESS); toast('copied, see you there'); } catch { toast(ADDRESS); } };
  const status = mode === 'open' && !peek ? `open · ovens on till ${hm(CLOSE)}` : mode === 'sunrise' ? 'warming up · open at 7:00' : 'closed · back at 7:00';
  return (
    <div className="page">
      <section className="wrap about-hero">
        <div>
          <p className="script">since 4am, every day</p>
          <h1 className="headline-m">Pink outside. Loud inside.</h1>
          <p className="body" style={{ marginTop: 22 }}>heavy cream started in a dalston kitchen with one deck oven, a playlist that’s mostly metal, and a rule: nothing leaves the back unless we’d eat it right now. the pink is for you. the black tees are for us.</p>
        </div>
        <img src={img('about-baker-4am')} alt="a baker shaping dough at 4am, flour in the air" className="about-photo" />
      </section>
      <section className="wrap crew">
        <p className="script">the crew</p>
        <div className="crew-grid">
          {CREW.map(([f, n, r], i) => (
            <figure key={n} className="polaroid" style={{ ['--r' as string]: `${[-2, 2, -1.5][i]}deg` }}>
              <img src={img(f)} alt={`${n}, ${r}`} loading="lazy" />
              <figcaption><span className="marker">{n}</span><span className="mono cherry">{r}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section className="wrap menu-sec" id="merch">
        <h2 className="headline-m">Merch, obviously.</h2>
        <div className="bean-grid">{MERCH.map((m) => <Merch key={m.id} m={m} />)}</div>
      </section>
      <section className="wrap findus" id="find-us">
        <div>
          <h2 className="headline-m">Find us.</h2>
          <p className="status mono"><i className="dot" aria-hidden />{status}</p>
          <p className="title">12 kingsland road<br />london e8</p>
          <p className="body" style={{ marginTop: 14 }}>dalston junction (overground), 3 min · buses 67, 149, 242 · bike rack outside. step-free entrance, one accessible toilet.</p>
          <dl className="hours">
            {[['mon–fri', '7:00–18:00'], ['sat', '8:00–18:00'], ['sun', '8:00–16:00'], ['cake pick-up', '10:00–16:00']].map(([d, t]) => <div key={d}><dt className="title-s cherry">{d}</dt><dd className="mono">{t}</dd></div>)}
          </dl>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24 }}>
            <a className="btn fill" href="https://www.openstreetmap.org/?mlat=51.5409&mlon=-0.0754#map=17/51.5409/-0.0754" target="_blank" rel="noreferrer">directions ↗</a>
            <button className="btn" onClick={copy}>copy address</button>
          </div>
        </div>
        <div className="map">
          <iframe title="map around kingsland road, dalston" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=-0.0820%2C51.5375%2C-0.0688%2C51.5443&layer=mapnik" />
          <img src={img('hero-croissant')} alt="" className="pin" />
        </div>
      </section>
      <section className="hiring on-cherry" id="hiring">
        <div className="wrap hiring-in">
          <div>
            <p className="metal" style={{ color: 'var(--cream)', margin: 0 }}>WE’RE HIRING</p>
            <p className="body" style={{ color: 'var(--cream)', marginTop: 10 }}>bakers who like 4am, baristas who can spell (or not). staff tee included.</p>
          </div>
          <a className="btn cream" href="mailto:jobs@heavycream.example?subject=4am%20is%20fine">apply by email</a>
        </div>
      </section>
    </div>
  );
}
