"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface UserAnalyticsChartsProps {
  totalOwed: number;
  totalReceivable: number;
}

export default function UserAnalyticsCharts({
  totalOwed,
  totalReceivable,
}: UserAnalyticsChartsProps) {
  const data = [
    {
      name: "Totals",
      Owed: totalOwed,
      Receivable: totalReceivable,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Owed vs Receivable</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Owed" fill="#ef4444" radius={[0, 4, 4, 0]} />
            <Bar dataKey="Receivable" fill="#22c55e" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
