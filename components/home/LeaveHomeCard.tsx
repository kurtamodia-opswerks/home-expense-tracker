import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import type { SelectUser } from "@/db/schema";
import LeaveHomeButton from "./LeaveHomeButton";

interface LeaveHomeCardProps {
  currentUser: SelectUser;
}

export default function LeaveHomeCard({ currentUser }: LeaveHomeCardProps) {
  return (
    <Card className="bg-gray-50">
      <CardContent className="flex justify-between items-center">
        <p className="font-medium">
          You have joined{" "}
          <Badge variant="secondary">{`Home #${currentUser.homeId}`}</Badge>
        </p>
        <LeaveHomeButton currentUser={currentUser} />
      </CardContent>
    </Card>
  );
}
