import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Arafat Voyage',
  description: 'Hajj, Oumra et voyages internationaux.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
