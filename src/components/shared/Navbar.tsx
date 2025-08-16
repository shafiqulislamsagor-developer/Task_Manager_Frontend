"use client";

import { useGetProfileQuery } from "@/redux/services/privateApi";

export default function Navbar() {
  const { data: user, isLoading: userLoading } = useGetProfileQuery();
  console.log(user);
  return (
    <div className="flex items-center justify-center w-full">
      <h1 className="text-4xl font-bold mt-2 uppercase border-b-2 border-primary">
        Dashboard
      </h1>
      <div className="absolute right-3 top-3 size-12 cursor-pointer rounded-full bg-secondary border border-primary flex items-center justify-center text-4xl">
        {user?.data.name ? user.data.name[0].toUpperCase() : "U"}
      </div>
    </div>
  );
}
