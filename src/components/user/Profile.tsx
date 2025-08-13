"use client";

import {
  useGetAllTaskQuery,
  useGetProfileQuery,
} from "@/redux/services/privateApi";

export default function Profile() {
  const { data, isLoading } = useGetProfileQuery();
  const { data: tasks, isLoading: taskLoading } = useGetAllTaskQuery();

  if (isLoading || taskLoading) return <div>Loading...</div>;
  console.log(data, tasks);
  return <div>Profile</div>;
}
