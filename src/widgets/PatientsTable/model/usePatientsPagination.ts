import { useEffect, useState } from "react";

export function usePatientsPagination(totalCount: number, pageSize = 10) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  const gotoPage = (page: number) =>
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));

  const nextPage = () => gotoPage(currentPage + 1);
  const prevPage = () => gotoPage(currentPage - 1);

  return {
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    gotoPage,
  };
}
