import Image from "next/image";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/assignment1");
  }, []);
  return <div></div>;
}
