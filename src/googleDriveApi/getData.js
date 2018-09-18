export const getDataFromGoogleSpreadsheet = (spreadsheetUrl, transformFn = transformEntries) => (
  fetchFromUrl(spreadsheetUrl)
    .then(response => transformFn(getRows(response)))
);

const transformEntries = (entries) => (
  entries.reduce(
    (transformed, origEntry) => ({
      ...transformed,
      [getValue(origEntry, 'gsx$id')]: toEntryWithDesiredKeys(origEntry),
    }),
    {},
  )
);

const toEntryWithDesiredKeys = (entry) => (
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
