import "./globals.css";

export const metadata = {
  title: "DENSAPAL AGENCIES",
  description: "Investment Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
