import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'menu', description: 'today’s tray with the fresh-o-meter: minutes since the oven, half price after 3pm.' };
export default function L({ children }: { children: React.ReactNode }) { return children; }
