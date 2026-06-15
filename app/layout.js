import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "DENSAPAL AGENCIES",
  description: "Investment Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
