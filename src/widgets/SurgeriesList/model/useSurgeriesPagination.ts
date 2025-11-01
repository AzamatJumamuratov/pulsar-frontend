import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { fetchSurgeries } from "@/entities/surgery/model/surgerySlice";

const LIMIT = 10;

export const useSurgeriesPagination = () => {
  const dispatch = useAppDispatch();
  const {
    data: surgeries,
    totalCount,
    loading,
    error,
  } = useAppSelector((s) => s.surgeries);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchSurgeries({ page: currentPage, limit: LIMIT }));
  }, [currentPage, dispatch]);

  const nextPage = () => {
    const totalPages = Math.ceil(totalCount / LIMIT);
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const hasNext = currentPage < Math.ceil(totalCount / LIMIT);
  const hasPrev = currentPage > 1;

  return {
    surgeries,
    loading,
    error,
    currentPage,
    nextPage,
    prevPage,
    hasNext,
    hasPrev,
  };
};
