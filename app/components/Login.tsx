"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BrowserQRCodeReader } from "@zxing/library";
import { Barcode, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [masterPassword, setMasterPassword] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [scannerError, setScannerError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const codeReader = useRef<BrowserQRCodeReader | null>(null);

  useEffect(() => {
    if (showScanner && videoRef.current) {
      codeReader.current = new BrowserQRCodeReader();
      codeReader.current
        .decodeFromVideoDevice(null, videoRef.current, (result, error) => {
          if (result) {
            setMasterPassword(result.getText());
            setShowScanner(false); 
            setScannerError(null);
          }
          if (error) {
            setScannerError(error.message);
          }
        });
    }

    return () => {
      if (codeReader.current) {
        codeReader.current.reset();
      }
    };
  }, [showScanner]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!masterPassword) {
      alert("Master password is required!");
      return;
    }
    // TODO: Implement login logic
    console.log("Logging in with:", masterPassword);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Password Manager
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            {showScanner ? (
              <div className="relative">
                <div className="w-full">
                  <video ref={videoRef} width="100%" height="auto" />
                </div>
                <Button
                  type="button"
                  onClick={() => setShowScanner(false)}
                  className="bg-primary absolute top-2 right-2"
                >
                  Close Scanner
                </Button>
                {scannerError && (
                  <p className="text-red-500 text-sm mt-2">{scannerError}</p>
                )}
              </div>
            ) : (
              <div className="relative">
                <Input
                  id="master-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Master Password"
                  value={masterPassword}
                  onChange={(e) => setMasterPassword(e.target.value)}
                />
                <Button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center "
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </Button>
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <Button
              type="button"
              onClick={() => setShowScanner(!showScanner)}
              className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
            >
              <Barcode className="h-5 w-5 mr-2" />
              {showScanner ? "Hide Scanner" : "Scan Barcode"}
            </Button>
            <Button
              type="submit"
              className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
