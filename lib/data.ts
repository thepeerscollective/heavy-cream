export const BASE = process.env.NEXT_PUBLIC_BASE ?? '';
export const img = (n: string) => `${BASE}/img/${n}.webp`;

export const ADDRESS = '12 kingsland road, london e8';
export const OPEN = 7 * 60; // 07:00
export const CLOSE = 18 * 60; // 18:00
export const HALF_PRICE = 15 * 60; // after 15:00 day-old goes half price

export type Kind = 'pastry' | 'bread' | 'slice' | 'drink' | 'cake' | 'merch' | 'beans';
export type Item = { id: string; name: string; price: number; img: string; kind: Kind; bake?: number; every?: number; note?: string; soldOut?: string };

/** bake = minutes after opening when today's tray came out */
export const PASTRIES: Item[] = [
  { id: 'croissant', name: 'croissant', price: 3.8, img: 'hero-croissant', kind: 'pastry', bake: 0, every: 150 },
  { id: 'pain-au-chocolat', name: 'pain au chocolat', price: 4.2, img: 'menu-pain-au-chocolat', kind: 'pastry', bake: 20, every: 240 },
  { id: 'cardamom-bun', name: 'cardamom bun', price: 4.2, img: 'menu-cardamom-bun', kind: 'pastry', bake: 45, every: 120 },
  { id: 'cherry-danish', name: 'cherry danish', price: 4.5, img: 'menu-cherry-danish', kind: 'pastry', bake: 70, every: 300 },
  { id: 'almond-croissant', name: 'almond croissant', price: 4.6, img: 'menu-almond-croissant', kind: 'pastry', bake: 30, soldOut: '10:40' },
  { id: 'cinnamon-swirl', name: 'cinnamon swirl', price: 4.2, img: 'menu-cinnamon-swirl', kind: 'pastry', bake: -600 },
  { id: 'pistachio-cruffin', name: 'pistachio cruffin', price: 4.8, img: 'menu-pistachio-cruffin', kind: 'pastry', bake: 95, every: 360 },
  { id: 'kouign-amann', name: 'kouign-amann', price: 4.4, img: 'menu-kouign-amann', kind: 'pastry', bake: 120, every: 400 },
];
export const BREAD: Item[] = [
  { id: 'sourdough', name: 'sourdough loaf', price: 6.5, img: 'menu-sourdough', kind: 'bread', bake: 10, every: 600 },
  { id: 'milk-bread', name: 'milk bread', price: 5.5, img: 'menu-milk-bread', kind: 'bread', bake: 60, every: 260 },
  { id: 'everything-bagel', name: 'everything bagel', price: 3.4, img: 'menu-everything-bagel', kind: 'pastry', bake: 150, every: 180 },
  { id: 'salt-bagel', name: 'salt bagel', price: 3.2, img: 'menu-salt-bagel', kind: 'pastry', bake: 165, every: 500 },
];
export const SLICES: Item[] = [
  { id: 'slice-cherry', name: 'cherry vanilla', price: 5.5, img: 'slice-cherry-vanilla', kind: 'slice' },
  { id: 'slice-basque', name: 'burnt basque', price: 6, img: 'slice-basque', kind: 'slice' },
  { id: 'slice-carrot', name: 'carrot, no raisins', price: 5, img: 'slice-carrot', kind: 'slice' },
  { id: 'slice-lemon', name: 'olive oil + lemon', price: 5, img: 'slice-olive-oil-lemon', kind: 'slice' },
];
export const COFFEE: [string, number][] = [
  ['espresso', 2.6], ['cortado', 3.4], ['flat white', 3.6], ['cardamom latte', 4.2],
  ['iced latte', 4], ['strawberry matcha', 4.5], ['hot choc, heavy cream', 3.8], ['oat / almond', 0.4],
];
export const MOODS = [
  { mood: 'barely alive', drink: 'double oat cortado', line: 'you need: a double oat cortado. now.', img: 'latte-heart', price: 3.8 },
  { mood: 'functioning', drink: 'flat white', line: 'you need: a flat white. steady.', img: 'latte-leaf', price: 3.6 },
  { mood: 'chatty', drink: 'cardamom latte', line: 'you need: a cardamom latte and someone to tell.', img: 'latte-swirl', price: 4.2 },
  { mood: 'main character', drink: 'strawberry matcha', line: 'you need: a strawberry matcha. for the photo.', img: 'latte-star', price: 4.5 },
  { mood: 'unhinged', drink: 'espresso, then another', line: 'you need: espresso, then another. we’re not judging, we’re pouring.', img: 'latte-skull', price: 5.2 },
];
export const BEANS: Item[] = [
  { id: 'beans-house', name: 'house blend', price: 12, img: 'beans-house', kind: 'beans', note: 'chocolate, cherry, bossy' },
  { id: 'beans-decaf', name: 'decaf', price: 12, img: 'beans-decaf', kind: 'beans', note: 'for the 4pm crowd' },
  { id: 'beans-guest', name: 'guest roast', price: 14, img: 'beans-guest', kind: 'beans', note: 'changes monthly' },
];
export const MERCH: Item[] = [
  { id: 'merch-tee', name: 'the tee', price: 30, img: 'merch-tee', kind: 'merch', note: 'metal logo, cherry on white' },
  { id: 'merch-tote', name: 'the tote', price: 18, img: 'merch-tote', kind: 'merch', note: 'pink, holds 13 pastries' },
  { id: 'merch-stickers', name: 'stamp sticker sheet', price: 4, img: 'merch-stickers', kind: 'merch', note: 'nine skull-hearts' },
];
export const CAKE = {
  sizes: [{ id: '6', label: '6 inch', serves: 8, price: 38, scale: 0.82 }, { id: '8', label: '8 inch', serves: 14, price: 48, scale: 0.92 }, { id: '10', label: '10 inch', serves: 22, price: 62, scale: 1 }],
  flavours: [
    { id: 'vanilla-cherry', label: 'vanilla cherry', swatch: '#F7B8CB', filter: 'none', tint: '' },
    { id: 'chocolate', label: 'chocolate', swatch: '#5A3324', filter: 'brightness(.62) contrast(1.05)', tint: '#7a4a32' },
    { id: 'pistachio', label: 'pistachio', swatch: '#B9C98A', filter: 'brightness(1.02)', tint: '#a9c46c' },
    { id: 'black-sesame', label: 'black sesame', swatch: '#3A3434', filter: 'grayscale(1) brightness(.5) contrast(1.15)', tint: '' },
  ],
  extras: [['candles', 0], ['sparklers', 3], ['a tiny knife', 0], ['extra cherries', 4]] as [string, number][],
};
export const WALL = [['cake-wall-1', 'sorry about the car'], ['cake-wall-2', '30, flirty, thriving'], ['cake-wall-3', 'you got the job (finally)'], ['cake-wall-4', 'happy birthday kevin']];

export const gbp = (n: number) => `£${(Math.round(n * 100) / 100).toFixed(n % 1 ? 2 : 0).replace(/\.?0+$/, (m) => (n % 1 ? m : ''))}`;
export const money = (n: number) => `£${n.toFixed(2).replace(/\.00$/, '')}`;

/** london wall clock in minutes, plus date key */
export function londonNow(d = new Date()) {
  const p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(d);
  const g = (t: string) => p.find((x) => x.type === t)?.value ?? '0';
  return { minutes: Number(g('hour')) * 60 + Number(g('minute')), day: `${g('year')}-${g('month')}-${g('day')}`, hm: `${g('hour')}:${g('minute')}` };
}
export type Mode = 'sunrise' | 'open' | 'closed';
export function modeAt(minutes: number): Mode {
  if (minutes >= OPEN - 60 && minutes < OPEN) return 'sunrise';
  if (minutes >= OPEN && minutes < CLOSE) return 'open';
  return 'closed';
}
export const hm = (m: number) => `${String(Math.floor(m / 60) % 24).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;

/** freshness of a tray at a given wall-clock minute. trays come out in batches until 15:30 */
export const LAST_BAKE = 15 * 60 + 30;
export function fresh(item: Item, now: number) {
  if (item.soldOut) return { state: 'sold' as const, label: `sold out at ${item.soldOut}`, steam: 0 };
  if (item.bake == null) return { state: 'none' as const, label: '', steam: 0 };
  if (item.bake < 0) return { state: 'old' as const, label: 'yesterday’s · half price', steam: 0 };
  const first = OPEN + item.bake;
  if (now < first) return { state: 'soon' as const, label: `first tray at ${hm(first)}`, steam: 0 };
  const every = item.every ?? 600;
  let last = first + Math.floor((Math.min(now, LAST_BAKE) - first) / every) * every;
  if (last > now) last -= every;
  const mins = now - last;
  if (now >= HALF_PRICE && last < 13 * 60) return { state: 'old' as const, label: `this morning’s · half price`, steam: 0 };
  return { state: 'fresh' as const, label: mins < 1 ? 'out of the oven just now' : `out ${mins} min ago`, steam: mins < 15 ? 3 : mins < 45 ? 2 : 1, mins };
}

/** the cup gets your name wrong. a little worse every time. */
export function misspell(name: string, step: number) {
  const n = (name.trim() || 'babe').toUpperCase();
  if (step >= 4) return 'BABE <3';
  if (step === 3) return 'KEVIN';
  const swap: Record<string, string> = { A: 'E', E: 'I', I: 'Y', O: 'U', U: 'OO', Y: 'IE' };
  if (step === 0) {
    const i = [...n].findIndex((c, k) => k > 0 && swap[c]);
    const a = i > 0 ? n.slice(0, i) + swap[n[i]] + n.slice(i + 1) : n;
    return /[AEIOU]$/.test(a) ? a + 'H' : a + 'E';
  }
  if (step === 1) {
    const first = n[0] === 'K' ? 'C' : n[0] === 'C' ? 'K' : n[0];
    const mid = n.slice(1).replace(/([^AEIOU])/, '$1$1');
    return (first + mid).replace(/A$/, 'AH').slice(0, 11);
  }
  const first = n[0] === 'K' ? 'C' : n[0];
  return (first + 'O' + n.slice(2)).replace(/H$/, '').replace(/([^AEIOU])([AEIOU])$/, '$1$1$2').slice(0, 11);
}
