"use server";

import { getHomeAnalyticsQuery } from "@/app/data/analytics/home-analytics";
import { getUserAnalyticsQuery } from "@/app/data/analytics/user-analytics";
import { revalidateData } from "./revalidate";

export async function getHomeAnalytics(homeId: number) {
  await revalidateData();

  return await getHomeAnalyticsQuery(homeId);
}

export async function getUserAnalytics(userId: number, homeId?: number) {
  await revalidateData();

  return await getUserAnalyticsQuery(userId, homeId);
}
