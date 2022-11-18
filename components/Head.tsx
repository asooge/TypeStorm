import NextHead from 'next/head';

export const Head: React.FC = () => {
  return (
    <NextHead>
      <title>TypeStorm</title>
      <meta name="description" content="See how fast you can type" />
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  );
};
