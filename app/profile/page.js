import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

import React from "react";

export default async function ProfilePage() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const auth = await isAuthenticated();
  const user = await getUser();

  if(!auth){
    return redirect('/api/auth/login');
  }

  return (
    <div>
      <h2>Welcome to my profile</h2>
      <p>{user.family_name}</p>
    </div>
  );
}
