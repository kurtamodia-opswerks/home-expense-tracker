"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const COLORS = ["#6366F1", "#22C55E", "#F97316", "#06B6D4", "#E11D48"];

interface ChartsProps {
  monthlyExpenses: { month: string; total: number }[];
  topSpenders: { userId: number; name: string; total: number }[];
}

export default function Charts({ monthlyExpenses, topSpenders }: ChartsProps) {
  return (
    <>
      {/* Expenses per Month (Line Chart) */}
      <Card>
        <CardHeader>
          <CardTitle>Expenses per Month</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyExpenses}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#6366F1"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Spenders (Pie Chart) */}
      <Card>
        <CardHeader>
          <CardTitle>Top Spenders</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={topSpenders}
                dataKey="total"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {topSpenders.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
}
