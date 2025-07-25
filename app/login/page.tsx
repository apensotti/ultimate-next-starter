import { headers } from "next/headers";
import { Login } from "@/components/auth/Login";

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const headersList = await headers();
  const host = headersList.get("host");

  return <Login host={host} searchParams={searchParams} />;
}