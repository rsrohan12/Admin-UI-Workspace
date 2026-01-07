'use client';
import IconMail from '@/components/icon/icon-mail';
import { useRouter } from 'next/navigation';
import { useResetPassword } from "@/hooks";
import React from 'react';

const ResetPasswordForm = () => {
    const router = useRouter();
    const { mutate } = useResetPassword();

    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            email: formData.get('email') as string,
        };
        mutate(data);
    };

    return (
        <form className="space-y-5" onSubmit={submitForm}>
            <div>
                <label htmlFor="Email" className="dark:text-white">
                    Email
                </label>
                <div className="relative text-white-dark">
                    <input id="Email" name="email" type="email" placeholder="Enter email address" className="form-input ps-10 placeholder:text-white-dark" />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                        <IconMail fill={true} />
                    </span>
                </div>
            </div>
            <button type="submit" className="btn btn-gradient !mt-4 w-full border-0 uppercase">
                Reset Password
            </button>
        </form>
    );
};

export default ResetPasswordForm;
