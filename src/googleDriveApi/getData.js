export const getDataFromGoogleSpreadsheet = (
  spreadsheetId,
  transformFn = reduceEntriesById,
  transformKeys = fromGoogleKeys,
) => (
  fetchFromUrl(`https://spreadsheets.google.com/feeds/list/${spreadsheetId}/od6/public/values?alt=json`)
    .then(response => transformFn(getRows(response), transformKeys))
);

const reduceEntriesById = (entries, transformKeys) => (
  entries.reduce(
    (transformed, origEntry) => ({
      ...transformed,
      [getValue(origEntry, 'gsx$id')]: transformKeys(origEntry),
    }),
    {},
  )
);

const fromGoogleKeys = (entry) => (
  Object.keys(entry).reduce(
    (transformed, key) => {
      if (key.startsWith('gsx$')) {
        const transformedKey = camelCase(key.slice(4));
        return { ...transformed, [transformedKey]: getValue(entry, key) };
      }
      else return transformed;
    },
    {},
  )
);

// the json returning from google drive does not respect capitalization, so we use underscores
const camelCase = (str) => (
  str.replace(/[_.-](\w|$)/g, (_, x) => x.toUpperCase())
);

const getRows = (spreadsheet) => (
  spreadsheet.feed.entry
);

const getValue = (entry, key) => (
  entry[key].$t
);

const fetchFromUrl = (url) => (
  fetch(url)
    .then(resp => resp.json())
);
