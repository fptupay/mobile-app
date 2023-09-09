import { Link } from "expo-router";
import React from "react";
import CustomIcon from "../Icon";

export default function QuestionButton({ href }: { href: any }) {
  return (
    <Link href={href}>
      <CustomIcon name="HelpCircle" color="gray" size={30} />
    </Link>
  );
}
