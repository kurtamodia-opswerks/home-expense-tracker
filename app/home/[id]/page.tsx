import HomeAnalytics from "@/components/analytics/HomeAnalytics";

interface HomePageProps {
  params: { id: string };
}

export default function HomePage({ params }: HomePageProps) {
  const homeId = parseInt(params.id, 10);

  return (
    <div className="p-6">
      <HomeAnalytics homeId={homeId} />
    </div>
  );
}
