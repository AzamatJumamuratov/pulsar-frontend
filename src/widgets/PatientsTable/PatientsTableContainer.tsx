import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { fetchPatients } from "@/entities/patient/model/patientsSlice";
import { useEffect } from "react";
import { usePatientsPagination } from "./model/usePatientsPagination";
import PatientsTableSkeleton from "./ui/PatientsTableSkeleton";
import PatientTableView from "./ui/PatientsTableView";

export default function PatientsTableContainer() {
  const dispatch = useAppDispatch();
  const {
    data: { patients = [], total_count },
    loading,
    error,
  } = useAppSelector((s) => s.patients);
  const profile = useAppSelector((s) => s.profile.data);

  const { currentPage, totalPages, nextPage, prevPage } = usePatientsPagination(
    total_count,
    10
  );

  useEffect(() => {
    dispatch(fetchPatients({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  if (loading || !profile) return <PatientsTableSkeleton />;

  return (
    <PatientTableView
      profile={profile}
      loading={loading}
      error={error}
      patients={patients}
      totalCount={total_count}
      pageSize={10}
      currentPage={currentPage}
      totalPages={totalPages}
      onPrevPage={prevPage}
      onNextPage={nextPage}
      onGotoPage={() => {}}
    />
  );
}
