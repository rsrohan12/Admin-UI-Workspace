'use client';
import React, { useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { useChangePassword } from "@/hooks";
import IconEye from '../icon/icon-eye';
import IconLockDots from "@/components/icon/icon-lock-dots";
import { useChangePasswordByToken } from "@/hooks/auth/changePasswordByToken";

const ChangePasswordForm = () => {
    const router = useRouter();
    const { mutate } = useChangePasswordByToken();
    const searchParams = useSearchParams();
    const tokenFromUrl = searchParams.get('token') || '';

    const [fieldType, setFieldType] = useState("password");

    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            password: formData.get('password') as string,
            token: tokenFromUrl as string,
        };
        mutate(data);
    };

    return (
        <form className="space-y-5" onSubmit={submitForm}>
            <div>
                <div>
                    <label htmlFor="Password">Password</label>
                    <div className="relative text-white-dark">
                        <input
                            id="Password"
                            type={fieldType}
                            name="password"
                            placeholder="Enter password"
                            className="form-input ps-10 placeholder:text-white-dark"
                        />
                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                            <IconLockDots fill={true} />
                        </span>
                        <span
                            className="absolute right-3 top-2 cursor-pointer"
                            onClick={() => {
                                setFieldType(fieldType === "text" ? "password" : "text");
                            }}
                        >
                            <IconEye />
                            {fieldType === "text" && (
                                <span
                                    style={{
                                        position: "absolute",
                                        height: "20px",
                                        borderLeft: "solid 2px",
                                        top: 0,
                                        transform: "rotate(45deg)",
                                        left: "9px",
                                    }}
                                ></span>
                            )}
                        </span>
                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-gradient !mt-4 w-full border-0 uppercase">
                Change Password
            </button>
        </form>
    );
};

export default ChangePasswordForm;
