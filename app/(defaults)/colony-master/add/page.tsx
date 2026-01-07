import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { LINKS } from "@/constants";
import { AddForm } from "@/components/colony-master";

export const metadata: Metadata = {
  title: "Add new",
};

const AddColony = () => {
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
          <span>Add</span>
        </li>
      </ul>
      <AddForm />
    </div>
  );
};

export default AddColony;
