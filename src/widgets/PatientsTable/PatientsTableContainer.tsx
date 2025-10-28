import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { fetchPatients } from "@/entities/patient/model/patientsSlice";
import { useEffect } from "react";
import { usePatientsPagination } from "./model/usePatientsPagination";
import PatientsTableSkeleton from "./ui/PatientsTableSkeleton";
import PatientTableView from "./ui/PatientsTableView";

export default function PatientsTableContainer() {
  const dispatch = useAppDispatch();
  const {
    data: patients = [],
    loading,
    error,
  } = useAppSelector((s) => s.patients);
  const profile = useAppSelector((s) => s.profile.data);

  const {
    currentPage,
    totalPages,
    totalCount,
    paginatedPatients,
    nextPage,
    prevPage,
  } = usePatientsPagination(patients, 10);

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  if (loading || !profile) return <PatientsTableSkeleton />;

  return (
    <PatientTableView
      profile={profile}
      loading={loading}
      error={error}
      patients={paginatedPatients}
      totalCount={totalCount}
      pageSize={10}
      currentPage={currentPage}
      totalPages={totalPages}
      onPrevPage={prevPage}
      onNextPage={nextPage}
      onGotoPage={() => {}}
    />
  );
}
