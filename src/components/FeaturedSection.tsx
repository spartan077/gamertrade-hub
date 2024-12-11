import { ProductCard } from "./ProductCard";
import { Database } from "@/integrations/supabase/types";

type Product = Database["public"]["Tables"]["products"]["Row"];

interface FeaturedSectionProps {
  products: Product[];
}

export const FeaturedSection = ({ products }: FeaturedSectionProps) => {
  return (
    <section className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Featured Products</h2>
        <a href="/products" className="text-secondary hover:underline">
          View All
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={Number(product.price)}
            image={product.images?.[0] || "/placeholder.svg"}
            condition={product.condition}
            type={product.is_bidding ? "bid" : "fixed"}
            currentBid={product.current_bid ? Number(product.current_bid) : undefined}
            timeLeft={product.bid_end_time ? new Date(product.bid_end_time).toLocaleString() : undefined}
          />
        ))}
      </div>
    </section>
  );
};