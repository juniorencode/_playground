import { isArray, isString } from './utils';

const findChunks = (str, searchWords) => {
  return searchWords
    .filter(word => word)
    .reduce((chunks, word) => {
      const regex = new RegExp(word, 'gi');
      let match;

      while ((match = regex.exec(str))) {
        let start = match.index;
        let end = regex.lastIndex;

        if (end > start) chunks.push({ start, end });
      }

      return chunks;
    }, []);
};

const mergeChunks = chunks => {
  return chunks
    .sort((first, second) => first.start - second.start)
    .reduce((merged, current) => {
      if (merged.length === 0) {
        return [current];
      } else {
        const prev = merged[merged.length - 1];

        if (prev && current.start <= prev.end) {
          prev.end = Math.max(prev.end, current.end);
        } else {
          merged.push(current);
        }

        return merged;
      }
    }, []);
};

const processChunks = (chunks, textLength) => {
  const result = [];
  let lastIndex = 0;

  const append = (start, end, highlight) => {
    if (end > start) {
      result.push({ start, end, highlight });
    }
  };

  chunks.forEach(chunk => {
    append(lastIndex, chunk.start, false);
    append(chunk.start, chunk.end, true);
    lastIndex = chunk.end;
  });

  append(lastIndex, textLength, false);

  return result;
};

const highlightText = (textToHighlight, search) => {
  if (!isString(textToHighlight)) return [];
  if (!textToHighlight) return [{ start: 0, end: 0 }];
  if (!isArray(search) && !isString(search))
    return [{ start: 0, end: textToHighlight.length }];

  const searchWords = isArray(search) ? search : [search];
  if (searchWords.length === 0)
    return [{ start: 0, end: textToHighlight.length }];

  const chunks = findChunks(textToHighlight, searchWords);
  const mergedChunks = mergeChunks(chunks);

  return processChunks(mergedChunks, textToHighlight.length);
};

export { highlightText };
