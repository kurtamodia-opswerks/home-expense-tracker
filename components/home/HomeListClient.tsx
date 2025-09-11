// app/components/home/HomeListClient.tsx
"use client";

import { useTransition } from "react";
import { Button } from "../ui/button";
import type { SelectHome, SelectUser } from "@/db/schema";
import { joinHome } from "@/app/actions/homeActions";

interface HomeListClientProps {
  homes: SelectHome[];
  currentUser: SelectUser | null;
}

export default function HomeListClient({
  homes,
  currentUser,
}: HomeListClientProps) {
  const [isPending, startTransition] = useTransition();

  const handleJoin = (homeId: number) => {
    if (!currentUser) return;
    startTransition(async () => {
      await joinHome(currentUser.id, homeId);
    });
  };

  return (
    <div className="w-full mt-6">
      <h2 className="text-xl font-semibold mb-4">Available Homes</h2>
      <ul className="flex flex-col gap-3">
        {homes.map((home) => {
          const alreadyInHome = currentUser?.homeId === home.id;
          const disabled = !!currentUser?.homeId && !alreadyInHome;

          return (
            <li
              key={home.id}
              className="border rounded p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{home.name}</p>
                <p className="text-sm text-gray-500">{home.address}</p>
              </div>
              <Button
                disabled={disabled || isPending}
                onClick={() => handleJoin(home.id)}
              >
                {alreadyInHome ? "Joined" : "Join"}
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
