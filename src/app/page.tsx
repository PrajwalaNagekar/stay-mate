"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SplashScreen from "@/components/splash/SpashScreen";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 4000);

    return () => clearTimeout(timer);
  }, [router]);

  return <SplashScreen />;
}