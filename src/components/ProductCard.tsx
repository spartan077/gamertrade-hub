import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  title: string;
  price: number;
  image: string;
  condition: string;
  type: "fixed" | "bid";
  currentBid?: number;
  timeLeft?: string;
}

export const ProductCard = ({
  title,
  price,
  image,
  condition,
  type,
  currentBid,
  timeLeft,
}: ProductCardProps) => {
  return (
    <div className="gaming-card group animate-fade-up">
      <div className="relative aspect-square overflow-hidden rounded-md">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/50 backdrop-blur"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-4">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold line-clamp-2">{title}</h3>
          <Badge variant={condition === "New" ? "secondary" : "default"}>
            {condition}
          </Badge>
        </div>
        <div className="mt-4 space-y-2">
          {type === "fixed" ? (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Fixed Price</span>
              <span className="text-lg font-semibold">₹{price}</span>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current Bid</span>
                <span className="text-lg font-semibold">₹{currentBid}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Time Left</span>
                <span className="text-accent">{timeLeft}</span>
              </div>
            </>
          )}
        </div>
        <Button className="mt-4 w-full" variant={type === "fixed" ? "default" : "secondary"}>
          {type === "fixed" ? "Buy Now" : "Place Bid"}
        </Button>
      </div>
    </div>
  );
};