"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "react-query";
import { ListHeader, Table } from "@/components/common";
import { LINKS, DEFAULT_QUERY } from "@/constants";
import { useGlobalLoader } from "@/hooks";
import { TQueryData, TUser } from "@/types";

import { showDeleteConfirmation } from "@/utils";
import { getColumns } from "./utils";
import { deleteManagerForeverRequest, FETCH_MANAGER_KEY, fetchAllManagers } from "@/client/endpoints/manager";
import toast from "react-hot-toast";

const defaultQuery = DEFAULT_QUERY;

export const List = () => {
  const router = useRouter();
  const [search, setSearch] = useState<any>("");
  const [queryData, setQueryData] = useState<TQueryData>(defaultQuery);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const { data: manager, refetch } = useQuery(
    [FETCH_MANAGER_KEY, queryData],
    () => fetchAllManagers(queryData),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: 0,
    }
  );

  const { mutate: deleteManager } = useMutation(deleteManagerForeverRequest, {
    onSuccess: (res: any) => {
      refetch();
      toast.success(res.data.message);
      setSelectedRows([]);
    },
  });

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      search && useGlobalLoader.getState().setShowLoader(true);
      setQueryData({
        ...defaultQuery,
        search,
      });
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const handleSearch = (param: string) => {
    setSearch(param);
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
        "Do you want to delete this manager?"
    );
    if (data?.isConfirmed) {
        deleteManager(selectedRows);
    }
  };

  return (
    <div>
      <ListHeader
        title="Managers"
        onSearch={handleSearch}
        onAddNew={() => router.push(LINKS.manager.add)}
        search={search}
        selectedRows={selectedRows}
        onMoveToTrash={trashConfirmation}
      />
      <div className="panel relative mt-5 overflow-hidden border-0 p-0">
        <div className="table-responsive">
          <div className="datatables">
            <Table
              records={manager && manager.data}
              columns={getColumns({ refetch })}
              totalRecords={manager?.total || 0}
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
