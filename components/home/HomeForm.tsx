"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { InsertHome } from "@/db/schema";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
});

interface HomeFormProps {
  userId: number;
}

type FormData = z.infer<typeof schema>;

export default function HomeForm({ userId }: HomeFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: { name: "", address: "" },
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<InsertHome> = async (data) => {
    try {
      await fetch("/api/homes", {
        method: "POST",
        body: JSON.stringify({ ...data, userId }),
        headers: { "Content-Type": "application/json" },
      });
      reset({ name: "", address: "" });
    } catch {
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
        className=" px-4 py-2 rounded"
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
