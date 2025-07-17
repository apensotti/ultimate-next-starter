import { headers } from "next/headers";
import { Signup } from "@/components/auth/Signup";

export default async function SignupPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const headersList = await headers();
  const host = headersList.get("host");

  return <Signup host={host} searchParams={searchParams} />;
} 