/* eslint-disable no-param-reassign */
/*
type Metadata = {
  url: string | null;
  siteName: string | null;
  title: string | null;
  description: string | null;
  keywords: string[] | null;
  author: string | null;
};
*/

/**
 * @param {string} string - The string to replace special characters
 * @returns {string} - New string with replaced special characters
 */
function removeSpecialChar(string) {
  const specialCharRegex = /[&/\\#,+()$~%.'":*?<>{}]/g;
  if (typeof string !== "string") {
    return string;
  }
  return string.replace(specialCharRegex, "");
}

/**
 * Filters the given Metadata array to only include the objects that match the given search query.
 * If the search query has multiple words,
 * treat each word as a separate search term to filter by,
 * in addition to gathering results from the overall query.
 * If the search query has special characters,
 * run the query filter with the special characters removed.
 * Can return an empty array if no Metadata objects match the search query.
 * @param {Metadata[]} metadata - An array of Metadata objects
 * @param {string} query - The search query string
 * @returns {Metadata[]} - An array of Metadata objects that match the given search query
 */
export default function filterMetadata(metadata, query) {
  // TODO: delete and replace this with your code
  if (
    !(metadata instanceof Array) ||
    typeof query !== "string" ||
    metadata.length === 0
  ) {
    return [];
  }

  // Handle: Hypenated word: without hypen match case
  const hypenArray = query.split("-");
  if (hypenArray.length > 1) {
    query += ` ${hypenArray[0]}`;
    query += ` ${hypenArray[1]}`;
    query += ` ${hypenArray[0]}${hypenArray[1]}`;
  }
  return metadata.filter((ele) => {
    let formattedQuery = removeSpecialChar(query);
    formattedQuery = formattedQuery.replace(/ /g, "|");
    const regex = new RegExp(formattedQuery, "i");
    return (
      regex.test(removeSpecialChar(ele.url)) ||
      regex.test(removeSpecialChar(ele.title)) ||
      regex.test(removeSpecialChar(ele.author)) ||
      regex.test(removeSpecialChar(ele.siteName)) ||
      regex.test(removeSpecialChar(ele.description)) ||
      (ele.keywords &&
        ele.keywords.length > 0 &&
        ele.keywords.filter((key) => regex.test(removeSpecialChar(key))).length > 0)
    );
  });
}
