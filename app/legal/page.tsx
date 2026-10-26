export const metadata = { title: 'legal' };
const S = [
  ['publisher', 'heavy cream is a concept bakery by the peers collective, made for a portfolio. it doesn’t exist (yet). a real one would list its company name, number, registered office and vat number here.'],
  ['hosting', 'github pages, github inc., 88 colin p kelly jr street, san francisco, ca 94107, usa.'],
  ['what we keep', 'nothing leaves your browser. your box, your stamp card, the name on your cup, your crumb count and whether dings are on are stored on your device (local storage). orders, cakes and payments here are demos and are not sent anywhere.'],
  ['cookies', 'no tracking, no analytics, so no banner.'],
  ['accessibility', 'everything works with a keyboard. the bite, the crumbs, the piping and the steam are decoration, the same information is always in plain text too. motion is switched off if your device asks for reduced motion. sounds are off unless you turn on dings. found something that doesn’t work? hello@heavycream.example.'],
  ['allergens', 'a real allergen sheet would sit at the counter. our kitchen handles gluten, nuts, sesame, eggs and milk, so nothing is free from traces.'],
  ['credits', 'design + build · karina beers, the peers collective. photos · ai generated for the concept. type · cherry bomb one, fraunces, yellowtail, metal mania, permanent marker, instrument sans, dm mono (all open source).'],
];
export default function Legal() {
  return (
    <div className="wrap page legal">
      <h1 className="headline-m">Legal, but cute.</h1>
      {S.map(([t, b]) => <section key={t} id={t} className="qa"><h2 className="title-s">{t}</h2><p className="body">{b}</p></section>)}
    </div>
  );
}
