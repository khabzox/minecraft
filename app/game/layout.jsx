"use client";

import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Set isClient to true when component mounts on client-side
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server-side
  }

  return <>{children}</>;
}
