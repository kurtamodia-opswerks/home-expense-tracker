"use client";

import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { SelectUser } from "@/db/schema";

interface CustomSplitDrawerProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  amount: number | "";
  selectedUsers: number[];
  participants: SelectUser[];
  customShares: { userId: number; amount: number }[];
  setCustomShares: (shares: { userId: number; amount: number }[]) => void;
  onSubmit: () => void;
  loading: boolean;
}

export default function CustomSplitDrawer({
  open,
  setOpen,
  amount,
  selectedUsers,
  participants,
  customShares,
  setCustomShares,
  onSubmit,
  loading,
}: CustomSplitDrawerProps) {
  const total = customShares.reduce((sum, s) => sum + s.amount, 0);
  const remaining = Number(amount) - total;

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Custom Split</DrawerTitle>
          <p>Total: {amount}</p>
        </DrawerHeader>

        <div className="p-4 flex flex-col gap-3">
          {selectedUsers.map((userId) => {
            const user = participants.find((u) => u.id === userId);
            const share = customShares.find((s) => s.userId === userId);

            const isNegative = (share?.amount ?? 0) < 0;
            const isOverTotal = remaining < 0;

            return (
              <div key={userId} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="w-32">{user?.name}</span>
                  <Input
                    type="number"
                    value={share?.amount ?? 0}
                    className={
                      isNegative || isOverTotal
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      const newShares = customShares.map((s) =>
                        s.userId === userId ? { ...s, amount: value } : s
                      );
                      setCustomShares(newShares);
                    }}
                  />
                </div>
                {isNegative && (
                  <span className="text-xs text-red-500">
                    Share cannot be negative.
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="px-4 py-2 text-sm">
          Remaining:{" "}
          <span className={remaining !== 0 ? "text-red-500" : "text-green-600"}>
            {remaining}
          </span>
        </div>
        {remaining < 0 && (
          <div className="px-4 text-xs text-red-500">
            Total exceeds transaction amount.
          </div>
        )}

        <DrawerFooter>
          <Button
            onClick={onSubmit}
            disabled={
              loading ||
              customShares.length === 0 ||
              customShares.every((s) => s.amount === 0) ||
              customShares.some((s) => s.amount < 0) ||
              total !== Number(amount)
            }
          >
            Save Custom Split
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
