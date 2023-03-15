/* eslint-disable react/require-default-props */
import Head from 'next/head';

type MetaData = {
  pageTitle: string;
  pageDescription: string;
  pagePath?: string;
  pageImg?: string;
  pageImgWidth?: number;
  pageImgHeight?: number;
};

function SEO(props: MetaData) {
  const { pageTitle, pageDescription, pagePath, pageImg, pageImgWidth, pageImgHeight } = props;
  const defaultTitle = 'AI観光';
  const defaultDescription = 'AIがおすすめの観光スポットをレコメンドします';

  const title = pageTitle ? `${defaultTitle} | ${pageTitle}` : defaultTitle;
  const description = pageDescription || defaultDescription;
  const url = pagePath;
  const imgUrl = pageImg;
  const imgWidth = pageImgWidth || 1280;
  const imgHeight = pageImgHeight || 640;

  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={imgUrl} />
      <meta property="og:image:width" content={String(imgWidth)} />
      <meta property="og:image:height" content={String(imgHeight)} />
      <link rel="canonical" href={url} />
    </Head>
  );
}

export default SEO;
