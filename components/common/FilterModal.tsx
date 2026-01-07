"use client";
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import IconX from "@/components/icon/icon-x";
import { Input, InputSelect } from "@/components/common";
import { DefaultValue } from "@/types";
import { FilterValues } from "../survey/utils/ListHeader";

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterValues) => void;
  initialValues?: FilterValues;
};

export const FilterModal: React.FC<TProps> = ({
  isOpen,
  onClose,
  onApply,
  initialValues = {},
}) => {
  const [blockOptions, setBlockOptions] = useState<DefaultValue[] | null>(null);
  const [propertyTypeOptions, setPropertyTypeOptions] = useState<
    DefaultValue[] | null
  >(null);
  const [statusOptions, setStatusOptions] = useState<DefaultValue[] | null>(
    null
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FilterValues>({
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (isOpen) {
      reset(initialValues);
    }
  }, [isOpen, initialValues, reset]);

  // Fetch options from API
  // replace with actual API data
  useEffect(() => {
    setBlockOptions([
      { id: "1", name: "Block 1" },
      { id: "2", name: "Block 2" },
    ]);
    setPropertyTypeOptions([
      { id: "private", name: "Private" },
      { id: "commercial", name: "Commercial" },
    ]);
    setStatusOptions([
      { id: "undefined", name: "Undefined" },
      { id: "active", name: "Active" },
      { id: "inactive", name: "Inactive" },
    ]);
  }, []);

  const onSubmit = (data: FilterValues) => {
    onApply(data);
  };

  const handleReset = () => {
    reset({
      block: "",
      parcel_no: "",
      uid: "",
      pmidc: "",
      property_type: "",
      owner_name: "",
      father_husband: "",
      mobile_no: "",
      status: "",
      page_no: "",
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[999] bg-black/60"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed left-[50%] top-[50%] z-[1000] w-[90%] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-700">
          <h3 className="text-xl font-bold">Filter Options</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <IconX className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Block */}
              <div>
                <Controller
                  control={control}
                  name="block"
                  render={({ field: { onChange, value, onBlur } }) => (
                    <InputSelect
                      onChange={(option: DefaultValue) =>
                        onChange((option as DefaultValue)?.id || "")
                      }
                      options={blockOptions ?? []}
                      getOptionValue={(option: DefaultValue) =>
                        (option as DefaultValue).id.toString()
                      }
                      getOptionLabel={(option: DefaultValue) =>
                        (option as DefaultValue).name
                      }
                      value={
                        blockOptions &&
                        blockOptions.find(
                          (item) => item.id === value?.toString()
                        )
                      }
                      label="Block"
                      errorText={errors.block?.message}
                      onBlur={onBlur}
                      isClearable
                    />
                  )}
                />
              </div>

              {/* Parcel No */}
              <div>
                <Input
                  inverted
                  label="Parcel No"
                  {...register("parcel_no")}
                  type="text"
                  errorText={errors.parcel_no?.message}
                  placeholder="Enter Parcel No"
                />
              </div>

              {/* UID */}
              <div>
                <Input
                  inverted
                  label="UID"
                  {...register("uid")}
                  type="text"
                  errorText={errors.uid?.message}
                  placeholder="Enter UID"
                />
              </div>

              {/* Pmidc */}
              <div>
                <Input
                  inverted
                  label="Pmidc"
                  {...register("pmidc")}
                  type="text"
                  errorText={errors.pmidc?.message}
                  placeholder="Enter Pmidc"
                />
              </div>

              {/* Property Type */}
              <div>
                <Controller
                  control={control}
                  name="property_type"
                  render={({ field: { onChange, value, onBlur } }) => (
                    <InputSelect
                      onChange={(option: DefaultValue) =>
                        onChange((option as DefaultValue)?.id || "")
                      }
                      options={propertyTypeOptions ?? []}
                      getOptionValue={(option: DefaultValue) =>
                        (option as DefaultValue).id.toString()
                      }
                      getOptionLabel={(option: DefaultValue) =>
                        (option as DefaultValue).name
                      }
                      value={
                        propertyTypeOptions &&
                        propertyTypeOptions.find(
                          (item) => item.id === value?.toString()
                        )
                      }
                      label="Property Type"
                      errorText={errors.property_type?.message}
                      onBlur={onBlur}
                      isClearable
                    />
                  )}
                />
              </div>

              {/* Owner Name */}
              <div>
                <Input
                  inverted
                  label="Owner Name"
                  {...register("owner_name")}
                  type="text"
                  errorText={errors.owner_name?.message}
                  placeholder="Enter Owner Name"
                />
              </div>

              {/* Father/Husband */}
              <div>
                <Input
                  inverted
                  label="Father/Husband"
                  {...register("father_husband")}
                  type="text"
                  errorText={errors.father_husband?.message}
                  placeholder="Enter Father/Husband"
                />
              </div>

              {/* Mobile No */}
              <div>
                <Input
                  inverted
                  label="Mobile No"
                  {...register("mobile_no")}
                  type="text"
                  errorText={errors.mobile_no?.message}
                  placeholder="S-PR,S-PMI,S-OLD"
                />
              </div>

              {/* Status */}
              <div>
                <Controller
                  control={control}
                  name="status"
                  render={({ field: { onChange, value, onBlur } }) => (
                    <InputSelect
                      onChange={(option: DefaultValue) =>
                        onChange((option as DefaultValue)?.id || "")
                      }
                      options={statusOptions ?? []}
                      getOptionValue={(option: DefaultValue) =>
                        (option as DefaultValue).id.toString()
                      }
                      getOptionLabel={(option: DefaultValue) =>
                        (option as DefaultValue).name
                      }
                      value={
                        statusOptions &&
                        statusOptions.find(
                          (item) => item.id === value?.toString()
                        )
                      }
                      label="Status"
                      errorText={errors.status?.message}
                      onBlur={onBlur}
                      isClearable
                    />
                  )}
                />
              </div>

              {/* Page No */}
              <div>
                <Input
                  inverted
                  label="Page No"
                  {...register("page_no")}
                  type="text"
                  errorText={errors.page_no?.message}
                  placeholder="Enter Page No"
                />
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="mt-6 flex justify-end gap-3 border-t border-gray-200 pt-4 dark:border-gray-700">
            <button
              type="button"
              onClick={handleReset}
              className="btn btn-outline-danger"
            >
              Reset
            </button>
            <button type="button" onClick={onClose} className="btn btn-outline-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Apply Filter
            </button>
          </div>
        </form>
      </div>
    </>
  );
};