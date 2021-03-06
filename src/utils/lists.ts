import { RandomizerInfo } from "../interfaces/randomizer";

export function getLists() {
  const listsRaw = __RANDOMIZER_LISTS__;

  const listsParsed: RandomizerInfo[] = Object.keys(listsRaw).map(
    (listName, index) => ({
      name: listName,
      id: hashString(index + __COMMIT_HASH__ + listName),
      items: listsRaw[listName],
    })
  );

  return listsParsed;
}

/**
  A string hashing function based on Daniel J. Bernstein's popular 'times 33' hash algorithm.
  Adapted from https://github.com/MatthewBarker/hash-string/blob/master/source/hash-string.js
*/
export function hashString(text: string) {
  let hash = 5381;
  let index = text.length;

  while (index) {
    hash = (hash * 33) ^ text.charCodeAt(--index);
  }

  return (hash >>> 0).toString(36);
}
