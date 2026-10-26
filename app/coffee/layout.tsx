import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'coffee', description: 'the mood dial picks your drink, the cup spells your name wrong.' };
export default function L({ children }: { children: React.ReactNode }) { return children; }
