// app/homes/page.tsx
import { getHomes } from "@/app/data/home/get-homes";
import { getOrCreateUser } from "@/app/data/user/get-or-create-user";
import HomeForm from "@/components/home/HomeForm";
import HomeListClient from "@/components/home/HomeListClient";

export default async function HomesPage() {
  const homes = await getHomes();
  const currentUser = await getOrCreateUser();

  return (
    <div className="flex flex-col items-center gap-6 p-6 w-full max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">Homes</h1>

      {/* Create new home */}
      <HomeForm userId={currentUser?.id ?? 0} />

      {/* List homes with join button */}
      <HomeListClient homes={homes} currentUser={currentUser} />
    </div>
  );
}
