"use client";

import type { SelectUser, SelectHome } from "@/db/schema";
import HomeCard from "./HomeCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface HomeListClientProps {
  homes: SelectHome[];
  currentUser: SelectUser | null;
}

export default function HomeListClient({
  homes,
  currentUser,
}: HomeListClientProps) {
  if (homes.length === 0) {
    return <p>No homes available.</p>;
  }

  return (
    <Carousel className="w-full max-w-4xl">
      <CarouselContent>
        {homes.map((home) => (
          <CarouselItem key={home.id} className="md:basis-1/2 lg:basis-1/3">
            <HomeCard home={home} currentUser={currentUser} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
