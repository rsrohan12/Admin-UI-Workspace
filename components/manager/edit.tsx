'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { useMutation, useQuery } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, InputSelect, ErrorMessage, Label } from '@/components/common';
import { editUserSchema } from '@/validations'
import {
  fetchUser,
  fetchRoles,
  FETCH_ROLE_KEY,
  fetchAllPosition,
  FETCH_POSITION_ROLE_KEY,
  fetchBranches,
  FETCH_BRANCHES_KEY,
} from '@/client/endpoints';
import { DefaultValue, TUser, USER_ROLE_ENUM, USER_ROLE_LABELS } from '@/types';
import { LINKS } from '@/constants';
import {
  editManagerRequest,
  fetchSingleManager,
  GET_MANAGER_KEY,
  TEditManager,
} from '@/client/endpoints/manager';
import { editManagerSchema } from '@/validations/manager';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import toast from 'react-hot-toast';

export const EditForm = () => {
  const { id } = useParams();
  const router = useRouter();
  const [roleOptions, setRoleOptions] = useState<DefaultValue[] | null>(null);
  const userSession = useSelector((state: IRootState) => state.auth);
  const userDetails:TUser = userSession?.user!;


  const [branchOptions, setBranchOptions] = useState<DefaultValue[] | null>(
    null,
  );
  const [positionOptions, setPositionOptions] = useState<DefaultValue[] | null>(
    null,
  );

  const { data: branchs } = useQuery(
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

  const { data: roles } = useQuery(
    [FETCH_ROLE_KEY],
    () => fetchRoles({ size: 1000, skip: 0, search: '', sorting: 'id DESC' }),
    { keepPreviousData: false, refetchOnWindowFocus: false, retry: 0 },
  );

  const { data: manager } = useQuery(
    [GET_MANAGER_KEY, id],
    () => fetchSingleManager(id as string),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: 0,
      enabled: !!id,
    },
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TEditManager>({
    resolver: yupResolver(editManagerSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (roles?.data?.length) {
      const roleValues: DefaultValue[] = roles.data.map(role => ({
        id: role.id?.toString(),
        name: role.name!,
      }));
      setRoleOptions(roleValues);
    }

    if (branchs?.data?.length) {
      const branchValues: DefaultValue[] = branchs.data.map(branch => ({
        id: branch.id?.toString(),
        name: branch.name!,
      }));
      setBranchOptions(branchValues);
    }

    if (positions?.data?.length) {
      const positionValues: DefaultValue[] = positions.data.map(position => ({
        id: position.id?.toString(),
        name: position.name!,
      }));
      setPositionOptions(positionValues);
    }
  }, [roles, branchs, positions]);

  useEffect(() => {
    if (manager) {
      reset({
        email: manager.email ?? '',
        first_name: manager.first_name ?? '',
        last_name: manager.last_name ?? '',
        role: manager.role?.toString() ?? '',
        position: manager.position?.toString() ?? '',
        branch: manager.branch?.toString() ?? '',
      });
    }
  }, [manager, reset]);

  const { mutate: editManager } = useMutation(editManagerRequest, {
    onSuccess: (res: any) => {
      router.push(LINKS.manager.route);
      toast.success(res.data.message);
    },
  });

  const onSubmit = (data: TEditManager) => {
    let payload = {
      ...data,
    };
    editManager({
      id: manager?.id,
      ...payload,
    });
  };

  return (
    <div className="pt-5">
      <div className="mb-5 rounded-md border border-[#ebedf2] bg-white p-6 dark:border-[#191e3a] dark:bg-black">
        <h6 className="mb-5 text-lg font-bold">Edit</h6>
        <div className="flex">
          <div className="flex w-[calc(100%+150px)] flex-col sm:flex-row">
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
                <Controller
                  control={control}
                  name="branch"
                  rules={{ required: true }}
                  render={({ field: { onChange, value, onBlur } }) => (
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
                      value={branchOptions?.find(item => item.id === value?.toString())}

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
                  rules={{ required: true }}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <InputSelect
                      isMandatory
                      onChange={(option: DefaultValue) => onChange((option as DefaultValue).id)}
                      options={positionOptions ?? []}
                      getOptionValue={(option: DefaultValue) =>
                        (option as DefaultValue).id.toString()
                      }
                      getOptionLabel={(option: DefaultValue) => (option as DefaultValue).name}
                      value={positionOptions?.find(
                        item => item.id === value?.toString(),
                      )}
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
                  rules={{ required: true }}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <InputSelect
                      isMandatory
                      onChange={(option: DefaultValue) => onChange((option as DefaultValue).id)}
                      options={
                        userDetails?.user?.role === USER_ROLE_ENUM.ADMIN
                          ? roleOptions ?? []
                          : roleOptions?.filter(i => i.name !== USER_ROLE_LABELS[USER_ROLE_ENUM.ADMIN]) ?? []
                      }
                      
                      getOptionValue={(option: DefaultValue) =>
                        (option as DefaultValue).id.toString()
                      }
                      getOptionLabel={(option: DefaultValue) => (option as DefaultValue).name}
                      value={roleOptions?.find(
                        item => item.id === value?.toString(),
                      )}
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
                  onClick={handleSubmit(onSubmit)}>
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
