"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Password {
  id: string;
  accountName: string;
  username: string;
  password: string;
}

export default function PasswordList() {
  const [passwords] = useState<Password[]>([
    {
      id: "1",
      accountName: "Example",
      username: "user@example.com",
      password: "********",
    },
    // Add more mock data as needed
  ]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // TODO: Add a toast notification
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Your Passwords</h2>
      <div className="space-y-4">
        {passwords.map((password) => (
          <Card key={password.id}>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg">{password.accountName}</h3>
              <p className="text-sm text-gray-600">{password.username}</p>
              <div className="mt-2 flex justify-between items-center">
                <p className="text-sm">********</p>
                <div className="space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(password.username)}
                  >
                    Copy Username
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(password.password)}
                  >
                    Copy Password
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
