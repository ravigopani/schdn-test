"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardAction } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const items = [
  { label: "Select a fruit", value: null },
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
]

export default function Home() {
  const [count, setCount] = useState(0);
  const loginForm = ({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <div className="ml-4 mt-4 flex flex-col gap-4">
      <div>
        <h1>Hello World</h1>
      </div>
      <div>
        <p>Count: {count}</p>
      </div>
      <div>
        <Button onClick={() => setCount(count + 1)}>Click me</Button>
      </div>
      <div>
        <Select items={items}>
          <SelectTrigger className="w-full max-w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Terms of Service</CardTitle>
            <CardDescription>
              Review the terms before accepting the agreement.
            </CardDescription>
          </CardHeader>
          <CardContent className="-mb-(--card-spacing)">
            <div className="-mx-(--card-spacing) max-h-48 space-y-4 overflow-y-scroll border-t bg-muted/50 px-(--card-spacing) py-4 text-sm leading-relaxed">
              <p>
                These terms govern your use of the workspace, including access to
                shared documents, project files, and collaboration tools.
              </p>
              <p>
                You are responsible for the content you upload and for ensuring that
                your team has the appropriate permissions to view or edit it.
              </p>
              <p>
                We may update features or limits as the service evolves. When those
                changes materially affect your workflow, we will notify your
                workspace administrators.
              </p>
              <p>
                By continuing, you agree to keep your account credentials secure and
                to follow your organization&apos;s acceptable use policies.
              </p>
            </div>
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button variant="outline">Decline</Button>
            <Button>Accept</Button>
          </CardFooter>
        </Card>
      </div>
      <div>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            <CardAction>
              <Button variant="link">Sign Up</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" type="password" required />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
