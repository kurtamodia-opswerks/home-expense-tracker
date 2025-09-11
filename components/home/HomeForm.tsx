// app/components/home/HomeForm.tsx
"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { InsertHome } from "@/db/schema";

const schema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
});

interface HomeFormProps {
  onSuccess: () => void;
  userId: number;
}

type FormData = z.infer<typeof schema>;

export default function HomeForm({ onSuccess, userId }: HomeFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: { name: "Sunset", address: "" },
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<InsertHome> = async (data) => {
    try {
      await fetch("/api/homes", {
        method: "POST",
        body: JSON.stringify({ ...data, userId }),
        headers: { "Content-Type": "application/json" },
      });
      throw new Error();
      onSuccess();
    } catch (error) {
      setError("root", { message: "Failed to create home" });
    }
  };

  return (
    <form
      className="flex flex-col gap-2 w-full max-w-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        {...register("name")}
        type="text"
        placeholder="Home Name"
        className="border p-2 rounded"
      />
      {errors.name && (
        <span className="text-red-500">{errors.name.message}</span>
      )}
      <input
        {...register("address")}
        type="text"
        placeholder="Home Address"
        className="border p-2 rounded"
      />
      {errors.address && (
        <span className="text-red-500">{errors.address.message}</span>
      )}
      <Button
        disabled={isSubmitting}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        type="submit"
      >
        {isSubmitting ? "Loading" : "Create Home"}
      </Button>
      {errors.root && (
        <span className="text-red-500">{errors.root.message}</span>
      )}
    </form>
  );
}
