import "./globals.css";
import { Inter, Barlow, Manrope } from 'next/font/google';
import Header from "../componentes/Header/Header";
import { Metadata } from "next";

const inter = Inter({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], variable: '--font-inter' });
const barlow = Barlow({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], variable: '--font-barlow' });
const manrope = Manrope({ subsets: ['latin'], weight: ['200', '300', '400', '500', '600', '700', '800'], variable: '--font-manrope' });

export const metadata: Metadata = {
  title: "Livraria Online - Encontre Seu Próximo Livro",
  description: "A melhor livraria online para encontrar livros incríveis. Compre com facilidade e segurança.",

  robots: {
    index: true, 
    follow: true, 
  },

  openGraph: {
    title: "Livraria Online - Seu Destino Literário",
    description: "A melhor livraria online para encontrar livros incríveis. Descubra lançamentos e clássicos.",
    url: "https://www.sualivraria.com", // Substitua pela URL do seu site
    siteName: "Livraria Online",
    images: [
      {
        url: "https://www.sualivraria.com/og-image.jpg", // Substitua pela imagem da capa
        width: 1200,
        height: 630,
        alt: "Capa da Livraria Online",
      },
    ],
    type: "website",
  }};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      
      <body
        className={`antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
