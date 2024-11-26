import { useState } from 'react';

const mergeObjectDeep = (target, source) => {
  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], mergeObjectDeep(target[key], source[key]));
    }
  }

  Object.assign(target || {}, source);
  return target;
};

const useFilter = (initialFilter = {}) => {
  const defaultFilter = {
    page: { number: 1, size: 50 },
    sort: '-createdAt'
  };

  const combineFilter = mergeObjectDeep(defaultFilter, initialFilter);
  const [filter, setFilter] = useState(combineFilter);

  const setDate = (start, end) => {
    setFilter({ ...filter, start, end });
  };

  const setPage = page => {
    setFilter({ ...filter, page: { ...filter.page, number: page } });
  };

  const setSearch = search => {
    setFilter({ ...filter, search });
  };

  const setSort = sort => {
    setFilter({ ...filter, sort });
  };

  const setReset = () => {
    setFilter(combineFilter);
  };

  return { filter, setSort, setDate, setPage, setSearch, setReset, setFilter };
};

export { useFilter };
