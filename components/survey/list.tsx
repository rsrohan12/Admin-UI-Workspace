"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "react-query";
import { Table } from "@/components/common";
import { LINKS, DEFAULT_QUERY } from "@/constants";
import {
  fetchUsers,
  FETCH_USERS_KEY,
  deleteUserRequest,
} from "@/client/endpoints";
import { useGlobalLoader } from "@/hooks";
import { TQueryData, TUser } from "@/types";
import { getColumns } from "./utils";
import { ListHeader, FilterValues } from "./utils";
import { showDeleteConfirmation } from "@/utils";
import toast from "react-hot-toast";

const defaultQuery = DEFAULT_QUERY;

export const List = () => {
  const router = useRouter();
  const [filterValues, setFilterValues] = useState<FilterValues>({});
  const [queryData, setQueryData] = useState<TQueryData>(defaultQuery);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const { data: users, refetch } = useQuery(
    [FETCH_USERS_KEY, queryData],
    () => fetchUsers(queryData),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: 0,
    }
  );

  const { mutate: deleteUser } = useMutation(deleteUserRequest, {
    onSuccess: (res: any) => {
      refetch();
      toast.success(res.data.message);
      setSelectedRows([]);
    },
  });

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Check if any filter values exist
      const hasFilters = Object.values(filterValues).some(
        (value) => value && value !== ""
      );
      
      if (hasFilters) {
        useGlobalLoader.getState().setShowLoader(true);
      }

      // Build query data from filter values
      // setQueryData({
      //   ...defaultQuery,
      //   // Map filter values to your API query parameters
      //   block: filterValues.block || undefined,
      //   parcel_no: filterValues.parcel_no || undefined,
      //   uid: filterValues.uid || undefined,
      //   pmidc: filterValues.pmidc || undefined,
      //   property_type: filterValues.property_type || undefined,
      //   owner_name: filterValues.owner_name || undefined,
      //   father_husband: filterValues.father_husband || undefined,
      //   mobile_no: filterValues.mobile_no || undefined,
      //   status: filterValues.status || undefined,
      //   page_no: filterValues.page_no || undefined,
      // });
    }, 500); // Reduced debounce time since it's a deliberate filter action

    return () => clearTimeout(delayDebounceFn);
  }, [filterValues]);

  const handleFilterApply = (filters: FilterValues) => {
    setFilterValues(filters);
  };

  const handlePageChange = (filters: TQueryData) => {
    setQueryData(filters);
  };

  const handleSortChange = (filters: TQueryData) => {
    setQueryData(filters);
  };

  const handleRowSelection = (rows: TUser[]) => {
    if (rows?.length) {
      setSelectedRows(rows.map((row: TUser) => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const trashConfirmation = async () => {
    const data = await showDeleteConfirmation(
      "Do you want to move selected users to trash?"
    );
    if (data?.isConfirmed) {
      deleteUser(selectedRows);
    }
  };

  return (
    <div>
      <ListHeader
        title="Surveys"
        filterValues={filterValues}
        onFilterApply={handleFilterApply}
        onAddNew={() => router.push(LINKS.survey.add)}
        showTrash={false}
        onShowTrash={() => router.push(LINKS.users.trash)}
        selectedRows={selectedRows}
        onMoveToTrash={trashConfirmation}
      />
      
      {/* Active Filters Display */}
      {Object.entries(filterValues).some(([_, value]) => value && value !== "") && (
        <div className="mt-3 rounded-md border border-[#ebedf2] bg-white p-4 dark:border-[#191e3a] dark:bg-black">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium">Active Filters:</span>
            {Object.entries(filterValues).map(
              ([key, value]) =>
                value &&
                value !== "" && (
                  <span
                    key={key}
                    className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  >
                    <span className="capitalize">
                      {key.replace(/_/g, " ")}:
                    </span>
                    <span className="font-semibold">{value}</span>
                  </span>
                )
            )}
            <button
              onClick={() => setFilterValues({})}
              className="ml-auto text-xs text-danger hover:underline"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}

      <div className="panel relative mt-5 overflow-hidden border-0 p-0">
        <div className="table-responsive">
          <div className="datatables">
            <Table
              records={users && users.data}
              columns={getColumns({ refetch })}
              totalRecords={users?.total || 0}
              onPageChange={handlePageChange}
              onSortStatusChange={handleSortChange}
              filters={queryData}
              onRowSelection={handleRowSelection}
            />
          </div>
        </div>
      </div>
    </div>
  );
};