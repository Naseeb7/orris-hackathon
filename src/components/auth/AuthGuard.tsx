"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user && pathname !== "/login") {
      router.push("/login");
    }
  }, [router, pathname]);

  return <>{children}</>;
}
