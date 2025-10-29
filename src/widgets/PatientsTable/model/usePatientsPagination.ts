import { useEffect, useState, useCallback } from "react";

export function usePatientsPagination(totalCount: number, pageSize = 10) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  const gotoPage = useCallback(
    (page: number) => setCurrentPage(Math.max(1, Math.min(page, totalPages))),
    [totalPages]
  );

  const nextPage = useCallback(
    () => gotoPage(currentPage + 1),
    [gotoPage, currentPage]
  );
  const prevPage = useCallback(
    () => gotoPage(currentPage - 1),
    [gotoPage, currentPage]
  );

  const resetToFirstPage = useCallback(() => setCurrentPage(1), []);

  return {
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    gotoPage,
    resetToFirstPage,
  };
}
