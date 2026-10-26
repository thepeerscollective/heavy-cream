import { CakeBuilder } from '@/components/features';
import { WALL, img } from '@/lib/data';

export const metadata = { title: 'write on the cake', description: 'type your message, watch it get piped, order exactly that cake. 48 hours notice.' };

export default function Cakes() {
  return (
    <div className="page">
      <div className="wrap">
        <p className="script">for birthdays &amp; breakups</p>
        <h1 className="headline">Write on<br />the cake.</h1>
        <CakeBuilder />
      </div>
      <section className="wrap wall">
        <p className="script">things people wrote</p>
        <h2 className="headline-m">The cake wall.</h2>
        <div className="wall-grid">
          {WALL.map(([f, t]) => (
            <figure key={f}>
              <img src={img(f)} alt={`a finished cake that says ${t}`} loading="lazy" />
              <figcaption className="script">“{t}”</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section className="wrap faq">
        <h2 className="mono sec-title">good to know</h2>
        {[['how far ahead?', '48 hours. for saturdays, order by thursday noon.'], ['can you pipe emoji?', 'no. our bakers have hands, not keyboards.'], ['allergies?', 'tell us when you collect or in the note. nuts live in our kitchen, so no promises there.'], ['how long can the message be?', '40 letters. the piping bag runs out after that.']].map(([q, a]) => (
          <div key={q} className="qa"><h3 className="title-s">{q}</h3><p className="body">{a}</p></div>
        ))}
      </section>
    </div>
  );
}
