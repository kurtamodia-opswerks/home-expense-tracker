import { getOrCreateUser } from "./data/user/get-or-create-user";

export default async function LandingPage() {
  const user = await getOrCreateUser();
  return (
    <>
      {" "}
      <h1 className="text-3xl font-bold text-center">
        How to Use Expense Tracker
      </h1>
      <div>{user ? `Hi ${user.name}` : "Not logged in"}</div>
    </>
  );
}
