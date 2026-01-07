'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/common';
import { useSession, TUserSession } from '@/hooks';
import { TEditUserProfile, editUserProfileRequest, resetPasswordRequest } from '@/client/endpoints';
import 'react-phone-number-input/style.css';
import { ModalForm } from '../modals';
import toast from 'react-hot-toast';

export const ProfileForm = () => {
  const { session, updateUserSession } = useSession();
  const [isModalOpen, setModalOpen] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<TEditUserProfile>({
    mode: 'onBlur',
    // resolver: yupResolver(editUserProfileSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (session && session?.user?.id) {
      reset({
        first_name: session?.user?.first_name ?? '',
        last_name: session?.user?.last_name ?? '',
      });
    }
  }, [session, reset]);

  const { mutate: editUser } = useMutation(editUserProfileRequest, {
    onSuccess: res => {
      toast.success(res.data.message);
    },
  });

  const { mutate: changePassword } = useMutation(resetPasswordRequest, {
    onSuccess: res => {
      toast.success(res.data.message);
    },
  });

  const onSubmit = (data: TEditUserProfile) => {
    editUser(data);
    let prevSession = { ...session };
    let newDetails = {
      ...prevSession?.user,
      ...data,
    };
    prevSession = {
      ...prevSession,
      user: newDetails!,
    };
    updateUserSession(prevSession as TUserSession);
  };

  const openModal = () => setModalOpen(true);

  const password = watch('password');

  const confirmPassword = watch('confirmPassword');

  const isPasswordsMatch = password === confirmPassword;


  const handleChangePassword = () => {

      if(isPasswordsMatch && session){
        const payload: any = {
          password: password,       
          user_id: String(session?.user?.id),
        };
        changePassword(payload);

        toast.success('Password changed successfully!');
        
        reset({ password: '', confirmPassword: '' });
        
        setModalOpen(false);
      }

  };
  
  return (
    <div className="pt-5">
      <div className="mb-5 flex items-center justify-between">
        <h5 className="text-lg font-semibold dark:text-white-light">
          Account Settings
        </h5>
        <button className="btn btn-secondary" onClick={openModal}>
          Change Password
        </button>
      </div>
      <div>
        <form
          className="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 dark:border-[#191e3a] dark:bg-black"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h6 className="mb-5 text-lg font-bold">Profile</h6>
          <div className="flex flex-col sm:flex-row">
            <div className="mb-5 w-full sm:w-1/12 ltr:sm:mr-4 rtl:sm:ml-4">
              <Image
                src="/assets/images/default-user.jpg"
                alt="img"
                className="mb-5 rounded-full object-cover"
                width={140}
                height={140}
              />
            </div>
            <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <Input
                  inverted
                  label="First Name"
                  {...register('first_name')}
                  type="text"
                  errorText={errors.first_name?.message}
                />
              </div>
              <div>
                <Input
                  inverted
                  label="Last Name"
                  {...register('last_name')}
                  type="text"
                  errorText={errors.last_name?.message}
                />
              </div>
              <div>
                <Input
                  inverted
                  label="Email"
                  type="text"
                  value={session?.user?.email ?? ''}
                  readOnly
                  disabled
                />
              </div>

              <div className="mt-3 sm:col-span-2">
                <button className="btn btn-primary" type="submit">
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {isModalOpen && (
        <ModalForm
          title="Change Password"
          show={isModalOpen}
          toggle={() => setModalOpen(false)}
          onCancel={() => setModalOpen(false)}
          onConfirm={handleChangePassword}
          isConfirmDisabled={!isPasswordsMatch || !password} 
        >
          <div className="mt-4">
            <Input
              inverted
              label="New Password"
              {...register('password')}
              type="password"
              className="bg-white"
              errorText={errors.password?.message}
            />
            <Input
              inverted
              label="Confirm Password"
              {...register('confirmPassword')}
              type="password"
              className="bg-white"
              errorText={errors.confirmPassword?.message}
            />

          </div>
        </ModalForm>
      )}
    </div>
  );
};
