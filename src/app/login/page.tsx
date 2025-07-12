
import Link from 'next/link';
import { login, signup } from '@/app/auth/actions';
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
            Enter your email below to login to your account or sign up.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
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
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" name="password" required />
            </div>
            {searchParams?.message && (
              <p className="text-sm p-3 bg-foreground/10 text-foreground text-center rounded-md">
                {searchParams.message}
              </p>
            )}
            <Button formAction={login} className="w-full">
              Sign In
            </Button>
            <Button formAction={signup} variant="outline" className="w-full">
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

    