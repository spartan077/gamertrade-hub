import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { supabase } from "@/integrations/supabase/client";

const PcParts = () => {
  const { data: products } = useQuery({
    queryKey: ["pc-parts-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", "pc-parts")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">PC Parts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
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
      </div>
    </div>
  );
};

export default PcParts;