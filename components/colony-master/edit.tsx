"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Input,
  InputSelect,
  ErrorMessage,
  Label,
  Textarea,
} from "@/components/common";
import { editUserSchema } from "@/validations";
import { DefaultValue, BooleanValues } from "@/types";
import { LINKS } from "@/constants";
import "react-phone-number-input/style.css";
import PhoneInput, {
  isValidPhoneNumber,
  getCountryCallingCode,
} from "react-phone-number-input";
import { phoneStyles } from "@/constants";
import toast from "react-hot-toast";
import { editBLockRequest, TEditBLock } from "@/client/endpoints/block-master/edit-block";
import { editBlockSchema } from "@/validations/block-master";
import { editColonyRequest, TEditColony } from "@/client/endpoints/colony-master/edit-colony";
import { editColonySchema } from "@/validations/colony-master";

const booleanOptions = Object.values(BooleanValues).map((value) => ({
  id: value,
  name: value,
}));

const defaultCountryCode = "US";

export const EditForm = () => {
  const { id } = useParams();
  const router = useRouter();
  const [roleOptions, setRoleOptions] = useState<DefaultValue[] | null>(null);
  const [countryCode, setCountryCode] = useState("1");

//   const { data: roles } = useQuery(
//     [FETCH_ROLE_KEY],
//     () =>
//       fetchRoles({
//         size: 1000,
//         skip: 0,
//         search: "",
//         sorting: 'id DESC'
//       }),
//     {
//       keepPreviousData: false,
//       refetchOnWindowFocus: false,
//       retry: 0,
//     }
//   );

//   useEffect(() => {
//     if (roles && roles?.data?.length) {
//       let roleValues: DefaultValue[] = [];
//       roles?.data?.map((role) => {
//         roleValues.push({
//           id: role.id?.toString(),
//           name: role.name!,
//         });
//       });
//       setRoleOptions(roleValues);
//     }
//   }, [roles]);

  const { data: user } = useQuery(
    [GET_USER_KEY, id],
    () => fetc(id as string),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: 0,
      enabled: id ? true : false,
    }
  );

//   useEffect(() => {
//     if (user && user?.id) {
//       reset({
//         email: user?.email ?? "",
//         full_name: user?.full_name ?? "",
//         contact_number: user?.contact_number
//           ? `${user?.phone_code}${user?.contact_number}`
//           : "",
//         role: user?.role ?? "",
//         address: user?.address ?? "",
//         active: user?.active == 1 ? BooleanValues.YES : BooleanValues.NO,
//       });
//     }
//   }, [user]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TEditColony>({
    // @ts-ignore
    resolver: yupResolver(editColonySchema),
    defaultValues: {},
  });

  const { mutate: editUser } = useMutation(editColonyRequest, {
    onSuccess: (res: any) => {
      router.push(LINKS.block_master.route);
      toast.success(res.data.message);
    },
  });

  const onSubmit = (data: TEditBLock) => {
    // const phoneCode = `+${countryCode}`;
    // const phoneNumber = data.contact_number.replace(phoneCode, "");
    // let payload = {
    //   ...data,
    //   contact_number: phoneNumber,
    //   phone_code: phoneCode,
    //   active: data.active === BooleanValues.YES ? "1" : "0",
    // };
    // editUser({
    //   id: user?.id,
    //   ...payload,
    // });
  };

  return (
    <div className="pt-5">
      <div>
        <div className="mb-5 rounded-md border border-[#ebedf2] bg-white p-6 dark:border-[#191e3a] dark:bg-black">
          <h6 className="mb-5 text-lg font-bold">Edit</h6>
          <div className="flex">
            <div className="flex w-[calc(100%+150px)] flex-col sm:flex-row">
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
                  <Textarea
                    isMandatory
                    label="Marla"
                    {...register("marla")}
                    errorText={errors.marla?.message}
                    placeholder="Enter Marla"
                  />
                </div>
                <div className="mt-3 sm:col-span-2">
                  <button
                    className="btn btn-primary"
                    onClick={handleSubmit(onSubmit as any)}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
