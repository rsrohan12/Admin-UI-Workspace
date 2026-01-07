import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { LINKS } from "@/constants";
import { AddForm } from "@/components/block-master";

export const metadata: Metadata = {
  title: "Add new",
};

const AddBlock = () => {
  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link
            href={LINKS.block_master.route}
            className="text-primary hover:underline"
          >
            Block Master
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

export default AddBlock;
