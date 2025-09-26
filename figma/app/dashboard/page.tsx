"use client";

import { signOut } from "../(auth)/actions";

export default function DashboardRoute() {
  return (
    <>
      <button onClick={() => signOut()}>sign out</button>
    </>
  );
}
