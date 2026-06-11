export const metadata = {
  title: 'CYBER STORE',
  description: 'Secure Affiliate & Digital Selling Portal',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#0D0D11', fontFamily: 'monospace' }}>
        {children}
      </body>
    </html>
  );
}
