import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: "../public/font/PretendardVariable.ttf",
  display: "swap",
  weight: "100 900",
});
export const metadata: Metadata = {
  title: "Derre",
  description: "Dev Record",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pretendard.className} antialiased`}>
        <main className="flex justify-center">
          <div className="min-h-screen w-full md:max-w-sm py-18">
            {children}
          </div>
        </main>
        <div id="modal" />
      </body>
    </html>
  );
}
