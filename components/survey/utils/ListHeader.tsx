"use client";
import React, { useState } from "react";
import IconPlus from "@/components/icon/icon-plus";
import IconTrashLines from "@/components/icon/icon-trash-lines";
// import IconRestore from "@/components/icon/icon-restore";
// import IconFilter from "@/components/icon/icon-filter";
import { FilterModal } from "../../common/FilterModal";
import IconUser from "@/components/icon/icon-user";
import IconUserPlus from "@/components/icon/icon-user-plus";

export interface FilterValues {
  block?: string;
  parcel_no?: string;
  uid?: string;
  pmidc?: string;
  property_type?: string;
  owner_name?: string;
  father_husband?: string;
  mobile_no?: string;
  status?: string;
  page_no?: string;
}

type TProps = {
  title: string;
  showAdd?: boolean;
  isTrashList?: boolean;
  showTrash?: boolean;
  showAddText?: string;
  isHardDelete?: boolean;
  selectedRows?: number[];
  filterValues?: FilterValues;
  onFilterApply: (filters: FilterValues) => void;
  onAddNew?: () => void;
  showAddTextFun?: () => void;
  onShowTrash?: () => void;
  onMoveToTrash?: () => void;
  onRestore?: () => void;
  onDelete?: () => void;
  archieve?: boolean;
};

export const ListHeader = ({
  title,
  showAdd = true,
  isTrashList = false,
  showAddText,
  showTrash = false,
  selectedRows,
  isHardDelete = false,
  filterValues = {},
  onFilterApply,
  onAddNew,
  showAddTextFun,
  onShowTrash,
  onMoveToTrash,
  onRestore,
  onDelete,
  archieve,
}: TProps) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleFilterApply = (filters: FilterValues) => {
    onFilterApply(filters);
    setIsFilterModalOpen(false);
  };

  const activeFiltersCount = Object.values(filterValues).filter(
    (value) => value && value !== ""
  ).length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl">{title}</h2>
        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
          <div className="flex gap-3">
            {selectedRows?.length && (!isTrashList || isHardDelete) ? (
              <div>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={onMoveToTrash}
                >
                  <IconTrashLines className="ltr:mr-2 rtl:ml-2" />
                  {archieve
                    ? "archieve"
                    : isHardDelete
                    ? `Delete `
                    : `Move To trash `}
                  ({selectedRows?.length})
                </button>
              </div>
            ) : null}
            {selectedRows?.length && isTrashList ? (
              <>
                <div>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={onRestore}
                  >
                    <IconUser className="ltr:mr-2 rtl:ml-2" />
                    Restore ({selectedRows?.length})
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={onDelete}
                  >
                    <IconTrashLines className="ltr:mr-2 rtl:ml-2" />
                    Delete ({selectedRows?.length})
                  </button>
                </div>
              </>
            ) : null}
          </div>

          {/* Filter Button */}
          <div className="relative">
            <button
              type="button"
              className="btn btn-outline-primary relative"
              onClick={() => setIsFilterModalOpen(true)}
            >
              <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
              Filter
              {activeFiltersCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          <div className="flex gap-3">
            {showAdd && (
              <div className="">
                <button
                  type="button"
                  className={showAddText ? "btn bg-white" : "btn btn-primary"}
                  onClick={showAddText ? showAddTextFun : onAddNew}
                >
                  <IconPlus className="ltr:mr-2 rtl:ml-2" />
                  {showAddText ? showAddText : "Add New"}
                </button>
              </div>
            )}
            {showTrash && (
              <div>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={onShowTrash}
                >
                  <IconTrashLines className="ltr:mr-2 rtl:ml-2" />
                  See Trash
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={handleFilterApply}
        initialValues={filterValues}
      />
    </div>
  );
};