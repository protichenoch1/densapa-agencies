import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "DENSAPAL AGENCIES",
  description: "Investment Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
  {children}
  <Toaster
  position="top-center"
  toastOptions={{
    duration: 3000,
    style: {
      background: "#fff",
      color: "#0A3D91",
      borderRadius: "12px",
      padding: "16px",
      fontWeight: "bold",
    },
    success: {
      iconTheme: {
        primary: "#28a745",
        secondary: "#fff",
      },
    },
    error: {
      iconTheme: {
        primary: "#dc3545",
        secondary: "#fff",
      },
    },
  }}
/>
</body>
    </html>
  );
}
