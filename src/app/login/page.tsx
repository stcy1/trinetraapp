
import Link from 'next/link';
import { login, signup, signInWithGoogle } from '@/app/auth/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';
import { GoogleIcon } from '@/components/google-icon';
import { Checkbox } from '@/components/ui/checkbox';

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
       <Link href="/" className="flex items-center gap-2 mb-6">
            <Logo className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Trinetra</span>
        </Link>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome</CardTitle>
          <CardDescription>
            Enter your email below to login or sign up.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" action={login}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" name="password" required />
            </div>
             <div className="flex items-center space-x-2">
              <Checkbox id="remember-me" />
              <Label
                htmlFor="remember-me"
                className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </Label>
            </div>
            {searchParams?.message && (
              <p className="text-sm p-3 bg-foreground/10 text-foreground text-center rounded-md">
                {searchParams.message}
              </p>
            )}
            <div className="grid grid-cols-2 gap-2">
                <Button formAction={login} className="w-full">
                Sign In
                </Button>
                <Button formAction={signup} variant="outline" className="w-full">
                Sign Up
                </Button>
            </div>
          </form>

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

          <form action={signInWithGoogle}>
            <Button variant="outline" className="w-full">
              <GoogleIcon className="mr-2 h-4 w-4" />
              Sign in with Google
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
