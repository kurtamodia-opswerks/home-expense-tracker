// app/users/page.tsx
"use client";

import HomeForm from "@/components/home/HomeForm";
import { useState } from "react";

// Temporary: replace with actual logged-in user id
const loggedInUserId = 1;

export default function HomePage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => setRefreshKey((prev) => prev + 1);

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-3xl font-bold">Home Expense Tracker App</h1>

      <HomeForm onSuccess={refresh} userId={loggedInUserId} />
    </div>
  );
}
