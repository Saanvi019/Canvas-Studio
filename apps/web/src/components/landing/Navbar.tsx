import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-slate-800">
      <h1 className="text-2xl font-bold">CanvasStudio</h1>

      <div className="flex gap-6">
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
      </div>

      <div className="flex gap-4">
        <Link href="/auth/login">Login</Link>

        <Link href="/auth/register" className="px-4 py-2 rounded border">
          Get Started
        </Link>
      </div>
    </nav>
  );
}
