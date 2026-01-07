import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import ResetForm from "@/components/auth/reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password",
};

const BoxedSignIn = () => {
  return (
    <div>
      <div className="relative flex min-h-screen items-center justify-center px-6 py-10 sm:px-16">
        <div className="relative w-full max-w-[870px] rounded-md p-2">
          <div className="relative flex flex-col justify-center rounded-md px-6 py-20 dark:bg-black/50 lg:min-h-[758px]">
            <div className="mx-auto w-full max-w-[440px]">
              <div className="mb-5">
                <div className="flex justify-center mb-5">
                  <Link href="/auth/signin">
                    <img
                      className="inline w-18 mx-auto"
                      src="/assets/images/logo.png"
                      alt="logo"
                    />
                  </Link>
                </div>
                <p className="text-base font-bold leading-normal text-[#101828] text-center">
                  Enter your email to reset your password
                </p>
              </div>
              <ResetForm />
              <div className="relative my-7 text-center md:mb-9"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxedSignIn;
