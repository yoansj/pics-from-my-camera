import Head from "next/head";

export default function Seo() {
  return (
    <Head>
      <title>Pics from my camera</title>
      <meta
        name="description"
        content="A Three.js experiment made by Yoan Saint Juste"
      />
      <link rel="icon" href="/favicon.ico" />

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

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      {/* <meta property="og:url" content="fill" /> */}
      <meta property="og:title" content="Pics from my camera" />
      <meta
        property="og:description"
        content="A Three.js experiment made by Yoan Saint Juste"
      />
      <meta property="og:image" content="/thumb.png" />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      {/* <meta property="twitter:url" content={url} /> */}
      <meta property="twitter:title" content="Pics from my camera" />
      <meta
        property="twitter:description"
        content="A Three.js experiment made by Yoan Saint Juste"
      />
      <meta property="twitter:image" content="/thumb.png" />

      {/* Base */}
      <meta property="og:site_name" content="Pics from my camera" />
      <meta property="og:type" content="website" />
      <meta name="theme-color" content="#FFFFFF" />
    </Head>
  );
}
