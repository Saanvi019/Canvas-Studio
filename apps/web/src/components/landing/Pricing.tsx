export default function PricingSection() {
  return (
    <section id="pricing" className="max-w-5xl mx-auto py-24 px-6">
      <h2 className="text-4xl font-bold text-center mb-12">Pricing</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="border border-slate-800 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-4">Free</h3>

          <ul className="space-y-2">
            <li>3 Projects</li>
            <li>Basic AI</li>
            <li>Version History</li>
          </ul>
        </div>

        <div className="border border-violet-500 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-4">Pro</h3>

          <ul className="space-y-2">
            <li>Unlimited Projects</li>
            <li>Advanced AI</li>
            <li>Priority Support</li>
          </ul>

          <p className="mt-6 text-violet-400">Coming Soon</p>
        </div>
      </div>
    </section>
  );
}
