'use client';
import { useRef } from 'react';
import { BEANS, img, money } from '@/lib/data';
import { useHC } from '@/lib/state';
import { MoodDial, WrongName } from '@/components/features';

function Bean({ b }: { b: (typeof BEANS)[number] }) {
  const { add } = useHC(); const ref = useRef<HTMLDivElement>(null);
  return (
    <article className="card bean">
      <div ref={ref}><img src={img(b.img)} alt="" className="cutout" loading="lazy" /></div>
      <div className="frow"><h3 className="title-s">{b.name}</h3><span className="mono cherry">{money(b.price)}</span></div>
      <p className="small">{b.note}</p>
      <button className="btn fill sm" onClick={() => add({ id: b.id, name: b.name + ' beans', price: b.price, kind: 'beans', img: b.img }, ref.current)}>add</button>
    </article>
  );
}

export default function Coffee() {
  return (
    <div className="wrap page">
      <p className="script">espresso o’clock</p>
      <h1 className="headline">Espresso. Milk. Attitude.</h1>
      <div className="coffee-grid big" style={{ marginTop: 50 }}><MoodDial /><WrongName /></div>
      <section className="menu-sec">
        <h2 className="headline-m">Take some home.</h2>
        <div className="bean-grid">{BEANS.map((b) => <Bean key={b.id} b={b} />)}</div>
      </section>
    </div>
  );
}
