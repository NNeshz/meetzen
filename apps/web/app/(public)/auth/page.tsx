import { LoginForm } from "@/modules/auth/login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/assets/gradient-hero.avif"
          alt="Hero"
          fill
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 pointer-events-none bg-[url('/assets/noise.png')] bg-repeat bg-[length:500px_500px] opacity-10 mix-blend-multiply" />
      </div>
    </div>
  );
}
