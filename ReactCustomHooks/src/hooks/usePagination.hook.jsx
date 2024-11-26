import { useEffect, useState } from 'react';
import { useWindowSize } from './useWindowSize.hook';

const usePagination = (totalPages, currentPage = 1, mobileWidth = 768) => {
  const { width } = useWindowSize();
  const [page, setPage] = useState(currentPage);
  const [pagination, setPagination] = useState([]);
  const isSmallScreen = width < mobileWidth;

  useEffect(() => {
    const pages = [];

    if (totalPages <= (isSmallScreen ? 5 : 7)) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (page <= (isSmallScreen ? 3 : 4)) {
        pages.push(2);
        pages.push(3);
        if (!isSmallScreen) {
          pages.push(4);
          pages.push(5);
        }
      } else {
        pages.push(-1);
      }

      if (
        page >= (isSmallScreen ? 4 : 5) &&
        page <= totalPages - (isSmallScreen ? 3 : 4)
      ) {
        if (!isSmallScreen) pages.push(page - 1);
        pages.push(page);
        if (!isSmallScreen) pages.push(page + 1);
      }

      if (page >= totalPages - (isSmallScreen ? 2 : 3)) {
        if (!isSmallScreen) {
          pages.push(totalPages - 4);
          pages.push(totalPages - 3);
        }
        pages.push(totalPages - 2);
        pages.push(totalPages - 1);
      } else {
        pages.push(-1);
      }

      pages.push(totalPages);
    }

    setPagination(pages);
    // eslint-disable-next-line
  }, [page, isSmallScreen]);

  const _setPage = num => {
    if (num < 1 || num > totalPages) return;
    setPage(num);
  };

  const goToPreviousPage = () => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  const goToNextPage = () => {
    if (page >= totalPages) return;
    setPage(page + 1);
  };

  return {
    pagination,
    currentPage: page,
    totalPages,
    setPage: _setPage,
    goToPreviousPage,
    goToNextPage
  };
};

export { usePagination };
