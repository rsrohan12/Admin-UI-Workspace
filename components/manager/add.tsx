'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import PasswordChecklist from 'react-password-checklist';
import { useMutation, useQuery } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, InputSelect } from '@/components/common';
// import {
//   fetchRoles,
//   FETCH_ROLE_KEY,
//   FETCH_BRANCHES_KEY,
//   fetchBranches,
//   FETCH_POSITION_ROLE_KEY,
//   fetchAllPosition,
// } from '@/client/endpoints';
import { DefaultValue, TUser, USER_ROLE_ENUM } from '@/types';
import { LINKS } from '@/constants';
import { addManagerRequest, TAddManager } from '@/client/endpoints/manager';
import { addManagerSchema } from '@/validations/manager';
import { IRootState } from '@/store';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

export const AddForm = () => {
  const router = useRouter();
  const [roleOptions, setRoleOptions] = useState<DefaultValue[] | null>(null);

  const [isValidPassword, setIsValidPassword] = useState(false);

  const [branchOptions, setBranchOptions] = useState<DefaultValue[] | null>(
    null,
  );
  const [positionOptions, setPositionOptions] = useState<DefaultValue[] | null>(
    null,
  );

  const userSession = useSelector((state: IRootState) => state.auth);
  const userDetails: TUser = userSession?.user!;

  const { data: branch } = useQuery(
    [FETCH_BRANCHES_KEY],
    () =>
      fetchBranches({
        size: 1000,
        skip: 0,
        search: '',
        sorting: 'id DESC',
      }),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: 0,
      refetchOnMount: false,
    },
  );

  const { data: positions } = useQuery(
    [FETCH_POSITION_ROLE_KEY],
    () =>
      fetchAllPosition({
        size: 1000,
        skip: 0,
        search: '',
        sorting: 'id DESC',
      }),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: 0,
      refetchOnMount: false,
    },
  );

  const { data: role } = useQuery(
    [FETCH_ROLE_KEY],
    () =>
      fetchRoles({
        size: 1000,
        skip: 0,
        search: '',
        sorting: 'id DESC',
      }),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: 0,
      refetchOnMount: false,
    },
  );

  useEffect(() => {
    if (branch && branch?.data?.length) {
      let branchValues: DefaultValue[] = [];
      branch?.data?.map(branch => {
        branchValues.push({
          id: branch.id?.toString(),
          name: branch.name!,
        });
      });

      setBranchOptions(branchValues);
    }

    if (positions && positions?.data?.length) {
      let positionValues: DefaultValue[] = [];
      positions?.data?.map(position => {
        positionValues.push({
          id: position.id?.toString(),
          name: position.name!,
        });
      });

      setPositionOptions(positionValues);
    }

    if (role && role?.data?.length) {
      let roleValues: DefaultValue[] = [];
      role?.data?.map(role => {
        roleValues.push({
          id: role.id?.toString(),
          name: role.name!,
        });
      });

      setRoleOptions(roleValues);
    }
  }, [branch, positions, role]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<TAddManager>({
    mode: 'onBlur',
    resolver: yupResolver(addManagerSchema),
    defaultValues: {},
  });

  const { mutate: addNewManager } = useMutation(addManagerRequest, {
    onSuccess: res => {
      router.push(LINKS.manager.route);
      toast.success(res.data.message);
    },
  });

  const onSubmit = (data: TAddManager) => {
    let payload = {
      ...data,
    };

    addNewManager({
      ...payload,
    });
  };

  return (
    <div className="pt-5">
      <div>
        <div className="mb-5 rounded-md border border-[#ebedf2] bg-white p-6 dark:border-[#191e3a] dark:bg-black">
          <h6 className="mb-5 text-lg font-bold">Add New</h6>
          <div className="flex flex-col sm:flex-row">
            <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <Input
                  isMandatory
                  inverted
                  label="First Name"
                  {...register('first_name')}
                  type="text"
                  errorText={errors.first_name?.message}
                  placeholder="Enter First Name"
                />
              </div>
              <div>
                <Input
                  isMandatory
                  inverted
                  label="Last Name"
                  {...register('last_name')}
                  type="text"
                  errorText={errors.last_name?.message}
                  placeholder="Enter Last Name"
                />
              </div>
              <div>
                <Input
                  isMandatory
                  inverted
                  label="Email"
                  {...register('email')}
                  type="text"
                  errorText={errors.email?.message}
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <Input
                  isMandatory
                  inverted
                  label="Password"
                  {...register('password')}
                  type="text"
                  // errorText={errors.password?.message}
                  placeholder="Enter password"
                />
                {watch('password') && (
                  <div className="mt-2">
                    <PasswordChecklist
                      rules={['minLength', 'specialChar', 'number', 'capital']}
                      minLength={5}
                      value={watch('password')}
                      onChange={e => setIsValidPassword(e)}
                    />
                  </div>
                )}
              </div>
              <div>
                <Controller
                  control={control}
                  name="branch"
                  shouldUnregister={false}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value, onBlur },
                    fieldState: { error },
                  }) => (
                    <InputSelect
                      isMandatory
                      onChange={(option: DefaultValue) => onChange((option as DefaultValue).id)}
                      options={
                        (userDetails?.user?.role === USER_ROLE_ENUM.ADMIN)
                          ? branchOptions ?? []
                          : branchOptions?.filter(i => Number(i.id) === userDetails?.user?.branch) ?? []
                      }
                      getOptionValue={(option: DefaultValue) =>
                        (option as DefaultValue).id.toString()
                      }
                      getOptionLabel={(option: DefaultValue) => (option as DefaultValue).name}
                      value={
                        branchOptions &&
                        branchOptions.find(
                          item => item.id === value?.toString(),
                        )
                      }
                      label="Branch"
                      errorText={errors.branch?.message}
                      onBlur={onBlur}
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  control={control}
                  name="position"
                  shouldUnregister={false}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value, onBlur },
                    fieldState: { error },
                  }) => (
                    <InputSelect
                      isMandatory
                      onChange={(option: DefaultValue) => onChange((option as DefaultValue).id)}
                      options={positionOptions ?? []}
                      getOptionValue={(option: DefaultValue) =>
                        (option as DefaultValue).id.toString()
                      }
                      getOptionLabel={(option: DefaultValue) => (option as DefaultValue).name}
                      value={
                        positionOptions &&
                        positionOptions.find(
                          item => item.id === value?.toString(),
                        )
                      }
                      label="Position"
                      errorText={errors.position?.message}
                      onBlur={onBlur}
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  control={control}
                  name="role"
                  shouldUnregister={false}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value, onBlur },
                    fieldState: { error },
                  }) => (
                    <InputSelect
                      isMandatory
                      onChange={(option: DefaultValue) => onChange((option as DefaultValue).id)}
                      options={
                          roleOptions?.filter(
                              option =>
                                option.id === USER_ROLE_ENUM.MANAGER ||
                                option.id === USER_ROLE_ENUM.SENIOR_MANAGER,
                            ) ??[]
                      }
                      getOptionValue={(option: DefaultValue) =>
                        (option as DefaultValue).name.toString()
                      }
                      getOptionLabel={(option: DefaultValue) => (option as DefaultValue).name}
                      value={
                        roleOptions &&
                        roleOptions.find(item => item.id === value?.toString())
                      }
                      label="Role"
                      errorText={errors.role?.message}
                      onBlur={onBlur}
                    />
                  )}
                />
              </div>

              <div className="mt-3 sm:col-span-2">
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit(onSubmit)}
                  disabled={!isValidPassword}>
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
