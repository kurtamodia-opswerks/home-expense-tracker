"use client";

import { useTransition, useState } from "react";
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
import ConfirmModal from "../ConfirmModal"; // adjust path if needed

interface HomeListClientProps {
  homes: SelectHome[];
  currentUser: SelectUser | null;
}

export default function HomeListClient({
  homes,
  currentUser,
}: HomeListClientProps) {
  const [isPending, startTransition] = useTransition();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleJoin = (homeId: number) => {
    if (!currentUser) return;
    startTransition(async () => {
      await joinHome(currentUser.id, homeId);
    });
  };

  const handleLeaveConfirm = () => {
    if (!currentUser) return;
    startTransition(async () => {
      await leaveHome(currentUser.id);
      setIsConfirmOpen(false);
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
              onClick={() => setIsConfirmOpen(true)}
            >
              Leave Home
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Homes List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {homes.map((home) => {
          const alreadyInHome = currentUser?.homeId === home.id;
          const disabled = !!currentUser?.homeId && !alreadyInHome;

          return (
            <Card
              key={home.id}
              className="hover:shadow-lg transition-shadow flex flex-col justify-between"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {home.name}
                  <Badge variant="secondary">{`Home #${home.id}`}</Badge>
                </CardTitle>
                <CardDescription>{home.address}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-end mt-auto">
                <Button
                  disabled={disabled || isPending || alreadyInHome}
                  onClick={() => handleJoin(home.id)}
                  variant={alreadyInHome ? "secondary" : "default"}
                >
                  {alreadyInHome ? "Joined" : "Join"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleLeaveConfirm}
        title="Leave Home"
        description="Are you sure you want to leave this home?"
        confirmText="Leave"
        cancelText="Cancel"
      />
    </div>
  );
}
