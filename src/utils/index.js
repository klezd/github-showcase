export const scope = ["user:email", "repo", "read:org"];
export const state = "19109719972809";
export const host = window.location.origin;

export const getUrl = (suffix) => `${window.location.origin}/${suffix}`;

export const getQueryParams = (queryString) => {
  // Ex: queryString = ?code=513cbac8a8cf78c9a86f&state=19109719972809

  queryString = queryString.slice(1);
  const KeyValPairs = queryString.split("&");

  const obj = KeyValPairs.reduce((obj, pair) => {
    const [key, val] = pair.split("=");
    return Object.assign(obj, { [key]: escape(val) });
  }, {});
  return obj;
};
