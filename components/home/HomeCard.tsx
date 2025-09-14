import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Badge } from "../ui/badge";
import type { SelectHome, SelectUser } from "@/db/schema";
import JoinHomeButton from "./JoinHomeButton";
import Link from "next/link";
import { Button } from "../ui/button";

interface HomeCardProps {
  home: SelectHome;
  currentUser: SelectUser | null;
}

export default function HomeCard({ home, currentUser }: HomeCardProps) {
  const alreadyInHome = currentUser?.homeId === home.id;

  return (
    <Card className="hover:shadow-lg transition-shadow flex flex-col justify-between max-w-xs">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {home.name}
          <Badge variant="secondary">{`Home #${home.id}`}</Badge>
        </CardTitle>
        <CardDescription>{home.address}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between mt-auto gap-2">
        <Link href={`/home/${home.id}`}>
          <Button variant="outline" size="sm">
            View
          </Button>
        </Link>
        <JoinHomeButton
          homeId={home.id}
          currentUser={currentUser}
          alreadyInHome={alreadyInHome}
        />
      </CardContent>
    </Card>
  );
}
