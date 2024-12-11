import { ProductCard } from "./ProductCard";

export const FeaturedSection = () => {
  const featuredProducts = [
    {
      title: "PlayStation 5 Digital Edition",
      price: 39999,
      image: "/placeholder.svg",
      condition: "New",
      type: "fixed" as const,
    },
    {
      title: "God of War Ragnarök PS5",
      price: 4999,
      image: "/placeholder.svg",
      condition: "Like New",
      type: "bid" as const,
      currentBid: 3500,
      timeLeft: "2h 15m",
    },
    {
      title: "RTX 4070 Ti Gaming OC",
      price: 85999,
      image: "/placeholder.svg",
      condition: "New",
      type: "fixed" as const,
    },
    {
      title: "Xbox Series X 1TB",
      price: 49999,
      image: "/placeholder.svg",
      condition: "Used",
      type: "bid" as const,
      currentBid: 42000,
      timeLeft: "1d 4h",
    },
  ];

  return (
    <section className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Featured Products</h2>
        <a href="/products" className="text-secondary hover:underline">
          View All
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.title} {...product} />
        ))}
      </div>
    </section>
  );
};