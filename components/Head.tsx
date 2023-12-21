import NextHead from "next/head";
const Head = () => {
  return (
    <NextHead>
      <title>Lewis Casewell</title>
      <meta
        name="description"
        content="SWE from the UK, mainly focused on React, React native, Typescript and Go"
      />
      <meta name="theme-color" content="#18181b" />
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  );
};

export default Head;
