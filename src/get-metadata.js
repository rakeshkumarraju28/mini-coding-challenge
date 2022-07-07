// Note: Please do not use JSDOM or any other external library/package (sorry)
/*
type Metadata = {
  url: string;
  siteName: string;
  title: string;
  description: string;
  keywords: string[];
  author: string;
};
*/

/**
 * Gets the URL, site name, title, description, keywords, and author info out of the <head> meta tags from a given html string.
 * 1. Get the URL from the <meta property="og:url"> tag.
 * 2. Get the site name from the <meta property="og:site_name"> tag.
 * 3. Get the title from the the <title> tag.
 * 4. Get the description from the <meta property="og:description"> tag or the <meta name="description"> tag.
 * 5. Get the keywords from the <meta name="keywords"> tag and split them into an array.
 * 6. Get the author from the <meta name="author"> tag.
 * If any of the above tags are missing or if the values are empty, then the corresponding value will be null.
 * @param html The complete HTML document text to parse
 * @returns A Metadata object with data from the HTML <head>
 */
export default function getMetadata(html) {
  // TODO: delete and replace this with your code
  if (typeof html !== "string") {
    return {
      url: null,
      title: null,
      description: null,
      keywords: null,
      author: null,
      siteName: null,
    };
  }
  const urlTag = [
    ...html.matchAll(/<meta.*property="og:url".*content="(.*)".*>/gi),
  ];

  const siteNameTag = [
    ...html.matchAll(/<meta.*property="og:site_name".*content="(.*)".*>/gi),
  ];

  const titleTage = [...html.matchAll(/<title[^>]*>(.*?)<\/title>/gi)];

  const descriptionTagOrg = [
    ...html.matchAll(/<meta.*property="og:description".*content="(.*)".*>/gi),
  ];

  const keywordsTag = [
    ...html.matchAll(/<meta.*name="keywords".*content="(.*)".*>/gi),
  ];

  const authorTag = [
    ...html.matchAll(/<meta.*name="author".*content="(.*)".*>/gi),
  ];

  const descriptionTag = [
    ...html.matchAll(/<meta.*name="description".*content="(.*)".*>/gi),
  ];

  const description =
    descriptionTagOrg.length > 0 ? descriptionTagOrg : descriptionTag;

  return {
    url: urlTag.length > 0 ? urlTag[0][1] : null,
    siteName: siteNameTag.length > 0 ? siteNameTag[0][1] : null,
    title: titleTage.length > 0 ? titleTage[0][1] : null,
    description: description.length > 0 ? description[0][1] : null,
    keywords:
      keywordsTag.length > 0
        ? keywordsTag[0][1].split(",").filter((ele) => !!ele)
        : null,
    author: authorTag.length > 0 ? authorTag[0][1] : null,
  };
}
