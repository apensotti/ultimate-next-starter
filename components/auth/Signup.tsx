"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Database } from "@/database.types";
import disposableDomains from "disposable-email-domains";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const Signup = ({
  host,
  searchParams,
}: {
  host: string | null;
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const supabase = createClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitted },
  } = useForm<Inputs>();

  const password = watch("password");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        throw error;
      }

      setIsSubmitting(false);
      toast.success("Please check your email to confirm your account.", {
        duration: 5000,
      });
      router.push("/login");
    } catch (error: any) {
      setIsSubmitting(false);
      toast.error(error.message || "Failed to create account. Please try again.", {
        duration: 5000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-8rem)] p-8">
      <div className="flex flex-col gap-4 p-4 rounded-xl max-w-sm w-full">
        <h1 className="text-3xl font-bold text-center">Create Account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  validate: {
                    emailIsValid: (value: string) =>
                      /^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ||
                      "Please enter a valid email",
                    emailDoesntHavePlus: (value: string) =>
                      /^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ||
                      "Email addresses with a '+' are not allowed",
                    emailIsntDisposable: (value: string) =>
                      !disposableDomains.includes(value.split("@")[1]) ||
                      "Please use a permanent email address",
                  },
                })}
              />
              {isSubmitted && errors.email && (
                <span className={"text-xs text-red-400"}>
                  {errors.email?.message || "Email is required"}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {isSubmitted && errors.password && (
                <span className={"text-xs text-red-400"}>
                  {errors.password?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {isSubmitted && errors.confirmPassword && (
                <span className={"text-xs text-red-400"}>
                  {errors.confirmPassword?.message}
                </span>
              )}
            </div>
          </div>

          <Button
            disabled={isSubmitting}
            variant="outline"
            className="w-full"
            type="submit"
          >
            Create Account
          </Button>
        </form>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:underline">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}; 