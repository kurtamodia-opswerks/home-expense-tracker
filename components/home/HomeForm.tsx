// app/components/home/HomeForm.tsx
"use client";

import { useState } from "react";
import { Button } from "../ui/button";

interface HomeFormProps {
  onSuccess: () => void;
  userId: number;
}

export default function HomeForm({ onSuccess, userId }: HomeFormProps) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/homes", {
      method: "POST",
      body: JSON.stringify({ name, address, userId }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setName("");
      setAddress("");
      onSuccess();
    } else {
      const data = await res.json();
      setError(data.error || "Something went wrong");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 w-full max-w-md"
    >
      <input
        type="text"
        placeholder="Home Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Home Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <Button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        type="submit"
      >
        Create Home
      </Button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
