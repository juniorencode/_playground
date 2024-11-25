import { useEffect, useState } from 'react';
import { useWindowSize } from './useWindowSize.hook';

const usePagination = (totalPages, currentPage, mobileWidth = 768) => {
  const { width } = useWindowSize();
  const [pagination, setPagination] = useState([]);
  const isSmallScreen = width < mobileWidth;

  useEffect(() => {
    let pages = [];

    const insertElement = num => {
      if (pages.some(elem => elem.number === num)) return;

      if (
        num !== 1 &&
        pages.length > 1 &&
        pages[pages.length - 1]?.number !== num - 1
      ) {
        const prevIndexNumber = pages.findIndex(
          elem => elem.number === num - 1
        );
        if (prevIndexNumber >= 0) {
          pages = [
            ...pages.slice(0, prevIndexNumber),
            {
              type: 'page',
              number: num
            },
            ...pages.slice(prevIndexNumber + 1)
          ];
        } else {
          const nextIndexNumber = pages.findIndex(
            elem => elem.number === num + 1
          );

          if (nextIndexNumber >= 0) {
            pages = [
              ...pages.slice(0, nextIndexNumber),
              {
                type: 'page',
                number: num
              },
              ...pages.slice(nextIndexNumber)
            ];
          } else {
            pages.push({
              type: 'page',
              number: num
            });
          }
        }
      } else {
        pages.push({
          type: 'page',
          number: num
        });
      }
    };

    const insertSkips = () => {
      if (pages.length < (isSmallScreen ? 3 : 5)) return;

      if (pages[1].number !== 2) {
        pages = [
          pages[0],
          {
            type: 'skip'
          },
          ...pages.slice(1)
        ];
      }

      if (pages[pages.length - 2] !== totalPages - 1) {
        pages = [
          ...pages.slice(0, pages.length - 1),
          {
            type: 'skip'
          },
          pages[pages.length - 1]
        ];
      }
    };

    const setActivePage = () => {
      pages.forEach(elem => {
        if (elem.number === currentPage) {
          elem.active = true;
        }
      });
    };

    if (totalPages <= (isSmallScreen ? 5 : 7)) {
      for (let i = 2; i < totalPages; i++) {
        insertElement(i);
      }
    } else {
      insertElement(1);

      if (currentPage <= (isSmallScreen ? 3 : 5)) {
        if (currentPage <= 4 || isSmallScreen) {
          insertElement(2);
          insertElement(3);
        }
        if (!isSmallScreen) {
          insertElement(4);
          insertElement(5);
        }
      }

      if (
        currentPage >= (isSmallScreen ? 3 : 5) &&
        currentPage <= totalPages - 2
      ) {
        if (!isSmallScreen) insertElement(currentPage - 1);
        insertElement(currentPage);
        if (!isSmallScreen) insertElement(currentPage + 1);
      }

      if (currentPage >= totalPages - (isSmallScreen ? 2 : 3)) {
        insertElement(totalPages - 1);
        insertElement(totalPages - 2);
        if (!isSmallScreen) {
          insertElement(totalPages - 3);
          insertElement(totalPages - 4);
        }
      }

      insertElement(totalPages);
      insertSkips();
      setActivePage();
    }

    setPagination([...pages]);
  }, [totalPages, currentPage, isSmallScreen]);

  return { pagination, isSmallScreen };
};

export { usePagination };
