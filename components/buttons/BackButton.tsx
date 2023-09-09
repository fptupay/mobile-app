import { Link } from "expo-router";
import React from "react";
import CustomIcon from "../Icon";

export default function BackButton({ href }: { href: any }) {
  return (
    <Link href={href}>
      <CustomIcon name="ChevronLeft" color="gray" size={30} />
    </Link>
  );
}
