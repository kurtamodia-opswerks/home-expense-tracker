import { getHomeAnalytics } from "@/app/actions/analytics";

export default async function HomeAnalytics({ homeId }: { homeId: number }) {
  const data = await getHomeAnalytics(homeId);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Home Analytics</h2>
      <p>Total Expenses: ₱{data.totalExpenses}</p>

      <h3 className="font-semibold">Expenses per Month</h3>
      <ul>
        {data.monthlyExpenses.map((m: any) => (
          <li key={m.month}>
            {m.month}: ₱{m.total}
          </li>
        ))}
      </ul>

      <h3 className="font-semibold">Top Spenders</h3>
      <ul>
        {data.topSpenders.map((s: any) => (
          <li key={s.userId}>
            {s.name}: ₱{s.total}
          </li>
        ))}
      </ul>
    </div>
  );
}
