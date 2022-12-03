import '../styles/globals.css'
import Head from 'next/head'
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        ></meta>
      </Head>

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-DGVJ306842"
        strategy="afterInteractive"
        onLoad={() => {
          window.dataLayer = window.dataLayer || []
          function gtag() { window.dataLayer.push(arguments) }
          gtag('js', new Date())
          gtag('config', 'G-DGVJ306842')
        }}
      />

      <Component {...pageProps} />
    </>
  )
}

export default MyApp
