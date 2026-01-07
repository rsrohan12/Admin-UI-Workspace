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
import { DefaultValue, BooleanValues } from "@/types";
import { LINKS } from "@/constants";
import "react-phone-number-input/style.css";
import toast from "react-hot-toast";
import { addColonykRequest, TAddColony } from "@/client/endpoints/colony-master/add-colony";
import { addColonySchema } from "@/validations/colony-master";

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
  } = useForm<TAddColony>({
    mode: "onBlur",
    resolver: yupResolver(addColonySchema),
    defaultValues: {},
  });

  const { mutate: addNewColony } = useMutation(addColonykRequest, {
    onSuccess: (res) => {
      router.push(LINKS.colony_master.route);
      // toast.success(res.data.message);
    },
  });

  const onSubmit = (data: TAddColony) => {
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
          <h6 className="mb-5 text-lg font-bold">Add Colony</h6>
          <div className="flex flex-col sm:flex-row">
            <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <Input
                  isMandatory
                  inverted
                  label="Colony Name"
                  {...register("colony_name")}
                  type="text"
                  errorText={errors.colony_name?.message}
                  placeholder="Enter Colony Name"
                />
              </div>
              <div>
                <Input
                  isMandatory
                  inverted
                  label="Marla"
                  {...register("marla")}
                  type="number"
                  errorText={errors.marla?.message}
                  placeholder="Enter Marla"
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
