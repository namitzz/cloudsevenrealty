export default function TrustStrip() {
  const facts = [
    {
      icon: "✓",
      title: "Verified Titles",
      description: "All properties legally verified"
    },
    {
      icon: "👥",
      title: "On-Ground Team",
      description: "Local support for site visits"
    },
    {
      icon: "💬",
      title: "WhatsApp in Minutes",
      description: "Quick response guaranteed"
    },
    {
      icon: "🏆",
      title: "Trusted Partner",
      description: "100+ successful deals"
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-neutral-100">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {facts.map((fact, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl sm:text-4xl mb-3">{fact.icon}</div>
              <h3 className="font-semibold text-lg mb-1">{fact.title}</h3>
              <p className="text-sm text-neutral-600">{fact.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
