import Head from "next/head";

interface Args {
  /** Would be appended to "Instant Auction: "
   *
   * i.e. title: "404" => "Instant Auction: 404" */
  title: string;
  description: string;
  /** relative path; e.g. /login, /me, /users/him */
  path: string;
}

export const getHeadForPage = (pageData: Args) => {
  const title = `${pageData.title} - Instant Auction`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={title} />
      <meta
        name="keywords"
        content="auction, platform, trade, trending, ethical, social"
      />
      <meta name="robots" content="index, follow" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="0 days" />
      <meta name="author" content="Tim <timpersonal07@gmail.com>" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta
        property="og:url"
        content={`https://instantauction.vercel.app${pageData.path}`}
      />
      <meta property="og:description" content={pageData.description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={pageData.description} />
    </Head>
  );
};
