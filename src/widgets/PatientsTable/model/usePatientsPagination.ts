import { useEffect, useMemo, useState } from "react";
import type { PatientData } from "@/entities/patient/model/types";

/**
 * Хук для клиентской пагинации списка пациентов.
 * Универсален — можно использовать с любым массивом данных.
 */

export function usePatientsPagination(patients: PatientData[], pageSize = 10) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(patients.length / pageSize));

  // если массив изменился и текущая страница выходит за пределы — корректируем
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // вычисляем текущий подмассив пациентов
  const paginatedPatients = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return patients.slice(startIndex, endIndex);
  }, [patients, currentPage, pageSize]);

  // управление страницами
  const gotoPage = (page: number) =>
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));

  const nextPage = () => gotoPage(currentPage + 1);
  const prevPage = () => gotoPage(currentPage - 1);

  return {
    currentPage,
    totalPages,
    totalCount: patients.length,
    pageSize,
    paginatedPatients,
    nextPage,
    prevPage,
    gotoPage,
  };
}
