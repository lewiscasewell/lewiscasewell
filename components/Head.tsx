import NextHead from "next/head";
const Head = () => {
  return (
    <NextHead>
      <title>Lewis Casewell</title>
      <meta
        name="description"
        content="SWE from the UK, mainly focused on React, React native, Typescript and Go"
      />
      <meta name="theme-color" content="#0a0a0a" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="manifest" href="/manifest.json" />
    </NextHead>
  );
};

export default Head;
