import Link from "next/link";

export default function CTASection() {
  return (
    <section className="text-center py-24">
      <h2 className="text-4xl font-bold mb-6">Ready to build faster?</h2>

      <Link
        href="/auth/register"
        className="bg-violet-600 px-6 py-3 rounded-lg"
      >
        Start Building
      </Link>
    </section>
  );
}
