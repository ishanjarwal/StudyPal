"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import Preloader from "./Preloader";

const RedirectToDashboardIfSignedIn = ({
  children,
}: {
  children: ReactNode;
}) => {
  const router = useRouter();

  const auth = useAuth();

  useEffect(() => {
    if (auth.isSignedIn) {
      router.push("/dashboard");
    }
  }, [auth, router]);

  if (!auth.isLoaded || auth.isSignedIn) return <Preloader />;

  return children;
};

export default RedirectToDashboardIfSignedIn;
