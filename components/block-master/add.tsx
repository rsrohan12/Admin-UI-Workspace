"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import PasswordChecklist from "react-password-checklist";
import { useMutation, useQuery } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Input,
  InputSelect,
  ErrorMessage,
  Label,
  Textarea,
} from "@/components/common";
import { addUserSchema } from "@/validations";

import { DefaultValue, BooleanValues } from "@/types";
import { LINKS } from "@/constants";
import "react-phone-number-input/style.css";
import PhoneInput, {
  isValidPhoneNumber,
  getCountryCallingCode,
} from "react-phone-number-input";
import { phoneStyles } from "@/constants";
import toast from "react-hot-toast";
import { addBlockRequest, TAddBlock } from "@/client/endpoints/block-master/add-block";
import { addBlockSchema } from "@/validations/block-master";

const booleanOptions = Object.values(BooleanValues).map((value) => ({
  id: value,
  name: value,
}));

const defaultCountryCode = "US";

export const AddForm = () => {
  const router = useRouter();
  const [roleOptions, setRoleOptions] = useState<DefaultValue[] | null>(null);
  const [countryCode, setCountryCode] = useState("1");
  const [isValidPassword, setIsValidPassword] = useState(false);

  // const { data: roles } = useQuery(
  //   [FETCH_ROLE_KEY],
  //   () =>
  //     fetchRoles({
  //       size: 1000,
  //       skip: 0,
  //       search: "",
  //       sorting: 'id DESC'
  //     }),
  //   {
  //     keepPreviousData: false,
  //     refetchOnWindowFocus: false,
  //     retry: 0,
  //     refetchOnMount: false,
  //   }
  // );

  // useEffect(() => {
  //   if (roles && roles?.data?.length) {
  //     let roleValues: DefaultValue[] = [];
  //     roles?.data?.map((role) => {
  //       roleValues.push({
  //         id: role.id?.toString(),
  //         name: role.name!,
  //       });
  //     });
  //     setRoleOptions(roleValues);
  //   }
  // }, [roles]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<TAddBlock>({
    mode: "onBlur",
    resolver: yupResolver(addBlockSchema),
    defaultValues: {},
  });

  const { mutate: addNewBlock } = useMutation(addBlockRequest, {
    onSuccess: (res) => {
      router.push(LINKS.block_master.route);
      // toast.success(res.data.message);
    },
  });

  const onSubmit = (data: TAddBlock) => {
    // const phoneCode = `+${countryCode}`;
    // const phoneNumber = data.contact_number.replace(phoneCode, "");
    // let payload = {
    //   ...data,
    //   contact_number: phoneNumber,
    //   phone_code: phoneCode,
    //   active: data.active === BooleanValues.YES ? "1" : "0",
    // };
    // addNewUser({
    //   ...payload,
    // });
  };

  return (
    <div className="pt-5">
      <div>
        <div className="mb-5 rounded-md border border-[#ebedf2] bg-white p-6 dark:border-[#191e3a] dark:bg-black">
          <h6 className="mb-5 text-lg font-bold">Add Block</h6>
          <div className="flex flex-col sm:flex-row">
            <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <Input
                  isMandatory
                  inverted
                  label="Block Name"
                  {...register("block_name")}
                  type="text"
                  errorText={errors.block_name?.message}
                  placeholder="Enter Block Name"
                />
              </div>
              <div>
                <Input
                  isMandatory
                  inverted
                  label="Sort"
                  {...register("sort_number")}
                  type="number"
                  errorText={errors.sort_number?.message}
                  placeholder="Enter Block Sort"
                />
              </div>
              <div className="mt-3 sm:col-span-2">
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit(onSubmit)}
                  disabled={!isValidPassword}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
