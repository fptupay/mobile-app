import { Link } from "expo-router";
import React from "react";
import CustomIcon from "../Icon";

export default function BackButton({ href }: { href: any }) {
  return (
    <Link href={href} className="absolute top-14 left-4 z-10 p-2">
      <CustomIcon name="ChevronLeft" color="gray" size={30} />
    </Link>
  );
}
