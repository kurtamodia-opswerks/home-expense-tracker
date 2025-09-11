"use client";

import { useTransition } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import type { SelectHome, SelectUser } from "@/db/schema";
import { joinHome, leaveHome } from "@/app/actions/homeActions";

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

  const handleLeave = () => {
    if (!currentUser) return;
    startTransition(async () => {
      await leaveHome(currentUser.id);
    });
  };

  return (
    <div className="w-full mt-6 flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Available Homes</h2>

      {/* Leave Home Section */}
      {currentUser?.homeId && (
        <Card className="bg-gray-50">
          <CardContent className="flex justify-between items-center">
            <p className="font-medium">
              You have joined{" "}
              <Badge variant="secondary">{`Home #${currentUser.homeId}`}</Badge>
            </p>
            <Button
              disabled={isPending}
              variant="destructive"
              onClick={handleLeave}
            >
              Leave Home
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Homes List */}
      {homes.map((home) => {
        const alreadyInHome = currentUser?.homeId === home.id;
        const disabled = !!currentUser?.homeId && !alreadyInHome;

        return (
          <Card key={home.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="secondary">{`Home #${home.id}`}</Badge>
                {home.name}
              </CardTitle>
              <CardDescription>{home.address}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-end">
              <Button
                disabled={disabled || isPending || alreadyInHome}
                onClick={() => handleJoin(home.id)}
              >
                {alreadyInHome ? "Joined" : "Join"}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
