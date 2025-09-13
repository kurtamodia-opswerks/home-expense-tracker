"use client";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SelectUser } from "@/db/schema";

interface ParticipantSelectorProps {
  participants: SelectUser[];
  selectedUsers: number[];
  onChange: (userId: number, checked: boolean) => void;
}

export default function ParticipantSelector({
  participants,
  selectedUsers,
  onChange,
}: ParticipantSelectorProps) {
  return (
    <div className="flex flex-col">
      <Label>Participants</Label>
      <ScrollArea className="max-h-48 border rounded p-2">
        <div className="flex flex-col gap-2">
          {participants.map((u) => (
            <label key={u.id} className="flex items-center gap-2">
              <Checkbox
                checked={selectedUsers.includes(u.id)}
                onCheckedChange={(checked) => onChange(u.id, Boolean(checked))}
                className="ml-2"
              />
              {u.name}
            </label>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
