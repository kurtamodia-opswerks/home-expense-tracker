"use client";

import { useUser } from "@/providers/UserProvider";

export default function LandingPage() {
  const user = useUser();
  return (
    <>
      {" "}
      <h1 className="text-3xl font-bold text-center">
        How to Use Expense Tracker
      </h1>
      <div>{user ? `Hi ${user.name}` : "Not logged in"}</div>
    </>
  );
}
