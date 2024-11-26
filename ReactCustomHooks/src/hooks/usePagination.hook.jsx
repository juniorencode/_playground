import { useEffect, useState } from 'react';
import { useWindowSize } from './useWindowSize.hook';

const usePagination = (totalPages, initialPage = 1, mobileWidth = 768) => {
  const { width } = useWindowSize();
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pagination, setPagination] = useState([]);
  const isSmallScreen = width < mobileWidth;

  useEffect(() => {
    const maxVisiblePages = isSmallScreen ? 5 : 7;
    const pages = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const visibleRange = isSmallScreen ? 2 : 3;

      pages.push(1);

      if (currentPage > visibleRange + 1) pages.push(-1);

      const start = Math.min(
        totalPages - visibleRange - (visibleRange - 2),
        Math.max(
          2,
          currentPage -
            (visibleRange - (currentPage > visibleRange + 1 ? 2 : 1))
        )
      );

      const end = Math.min(
        totalPages - 1,
        Math.max(
          maxVisiblePages - 2,
          currentPage +
            (visibleRange - (totalPages - currentPage > visibleRange ? 2 : 0))
        )
      );

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - visibleRange) pages.push(-1);

      pages.push(totalPages);
    }

    setPagination(pages);
    // eslint-disable-next-line
  }, [currentPage, isSmallScreen]);

  const setPage = num => {
    if (num < 1 || num > totalPages) return;
    setCurrentPage(num);
  };

  const goToPreviousPage = () => {
    if (currentPage <= 1) return;
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage >= totalPages) return;
    setCurrentPage(currentPage + 1);
  };

  return {
    pagination,
    currentPage,
    totalPages,
    setPage,
    goToPreviousPage,
    goToNextPage
  };
};

export { usePagination };
