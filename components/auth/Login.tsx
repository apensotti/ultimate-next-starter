"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Database } from "@/database.types";
import disposableDomains from "disposable-email-domains";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineGoogle } from "react-icons/ai";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { WaitingForMagicLink } from "./WaitingForMagicLink";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

type Inputs = {
  email: string;
  password: string;
};

export const Login = ({
  host,
  searchParams,
}: {
  host: string | null;
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const supabase = createClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMagicLinkSent, setIsMagicLinkSent] = useState(false);
  const router = useRouter();

  let returnTo: string | null = null;
  if (searchParams && "returnTo" in searchParams) {
    const return_path = searchParams["returnTo"];
    returnTo = Array.isArray(return_path) ? return_path[0] : return_path || null;
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        throw error;
      }

      setIsSubmitting(false);
      toast.success("You have been signed in successfully.", {
        duration: 5000,
      });
      
      if (returnTo) {
        router.push(returnTo);
      } else {
        router.push("/dashboard");
      }
    } catch (error: any) {
      setIsSubmitting(false);
      toast.error(error.message || "Failed to sign in. Please try again.", {
        duration: 5000,
      });
    }
  };

  const isNgrok = host?.includes("ngrok-free.app");
  const isVercel = host?.includes("vercel.app");
  const protocol = isNgrok || isVercel ? "https" : "http";
  const redirectUrl = `${protocol}://${host}/auth/callback`;

  const finalRedirectUrl = returnTo 
    ? `${redirectUrl}?returnTo=${encodeURIComponent(returnTo)}`
    : redirectUrl;

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: finalRedirectUrl,
      },
    });

    if (error) {
      toast.error(error.message);
    }
  };

  const signInWithGithub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: finalRedirectUrl,
      },
    });

    if (error) {
      toast.error(error.message);
    }
  };

  if (isMagicLinkSent) {
    return <WaitingForMagicLink toggleState={() => setIsMagicLinkSent(false)} />;
  }

  return (
    <>
      <div className="flex items-center justify-center h-[calc(100vh-8rem)] p-8">
        <div className="flex flex-col gap-4 p-4 rounded-xl max-w-sm w-full">
          <h1 className="text-3xl font-bold text-center">Login</h1>
          <Button
            onClick={signInWithGoogle}
            variant={"outline"}
            className="font-semibold"
          >
            <AiOutlineGoogle size={20} />
            Continue with Google
          </Button>
          <Button
            onClick={signInWithGithub}
            variant={"outline"}
            className="font-semibold"
          >
            <FaGithub size={20} />
            Continue with GitHub
          </Button>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

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
                    {errors.email?.message || "Email is required to sign in"}
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
            </div>

            <Button
              disabled={isSubmitting}
              variant="outline"
              className="w-full"
              type="submit"
            >
              Sign In
            </Button>
            <div className="mt-2 text-sm">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="text-primary hover:text-primary/90">
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export const OR = () => {
  return (
    <div className="flex items-center my-1">
      <div className="border-b flex-grow mr-2 opacity-50" />
      <span className="text-sm opacity-50">OR</span>
      <div className="border-b flex-grow ml-2 opacity-50" />
    </div>
  );
};
