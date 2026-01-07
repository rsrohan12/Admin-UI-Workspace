import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { LINKS } from "@/constants";
import { EditForm } from "@/components/colony-master";

export const metadata: Metadata = {
  title: "Edit Colony",
};

const EditColony = () => {
  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link
            href={LINKS.colony_master.route}
            className="text-primary hover:underline"
          >
            Colony Master
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Edit</span>
        </li>
      </ul>
      <EditForm />
    </div>
  );
};

export default EditColony;
