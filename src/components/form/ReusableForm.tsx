"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { setToken, setUser } from "@/redux/features/authSlice";
import {
  useLoginMutation,
  useRegisterMutation,
} from "@/redux/services/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";

// ✅ Schema setup: Name optional if login mode
const FormSchema = (login: boolean) =>
  z.object({
    name: login
      ? z.string().optional() // login হলে name প্রয়োজন নেই
      : z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
  });

export function ReusableForm({ login = true }: { login: boolean }) {
  const { login: loginAuth } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirectTo") || "/";
  const [
    registerApi,
    { isLoading: isRegisterLoading, isError: isRegisterError },
  ] = useRegisterMutation();
  const [loginApi, { isLoading: loginLoading, isError: loginError }] =
    useLoginMutation();
  const form = useForm<z.infer<ReturnType<typeof FormSchema>>>({
    resolver: zodResolver(FormSchema(login)),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<ReturnType<typeof FormSchema>>) {
    if (login) {
      loginApi(data)
        .unwrap()
        .then((res) => {
          console.log("success", res);
          loginAuth(res.user, res.accessToken);
          Cookies.set("refreshToken", res.refreshToken, {
            expires: 0.0104,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          });
          dispatch(setToken(res.accessToken));
          dispatch(setUser(res.user));
          router.push(redirectTo);
        })
        .catch((err) => {
          console.log("error", err);
        });
    } else {
      registerApi(data)
        .unwrap()
        .then((res) => {
          console.log("success", res);
          router.push("/login");
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          {!login && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-center pt-5">
            <Button type="submit" className="w-full">
              {login ? "Login" : "Register"}
            </Button>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {login ? (
              <>
                Don’t have an account?{" "}
                <Link
                  href="/register"
                  className="text-blue-500 hover:underline"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link href="/login" className="text-blue-500 hover:underline">
                  Login
                </Link>
              </>
            )}
          </p>
        </form>
      </Form>
    </Suspense>
  );
}
