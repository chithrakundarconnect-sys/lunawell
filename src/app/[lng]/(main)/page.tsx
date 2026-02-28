import DashboardClient from "./DashboardClient";

export default async function Page({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;

  return <DashboardClient lng={lng} />;
}