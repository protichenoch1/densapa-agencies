"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InvitePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/team");
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "18px",
        color: "#0A3D91"
      }}
    >
      Redirecting...
    </div>
  );
}
