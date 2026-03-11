import "./globals.css";
import Providers from "../lib/Providers";

export const metadata = {
  title: {
    default: "Nowor-App-Dashboard",
    template: "%s | Nowor-App-Dashboard",
  },
  description:
    "Nowor is event management platform that allows you to create and manage your events with ease. Whether you're a small business or a large organization, Nowor has everything you need to make your event a success.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <body className={`comic-font box-border antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
