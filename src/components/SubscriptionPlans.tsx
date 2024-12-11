import { useSession } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const plans = [
  {
    name: "Free Tier",
    price: 0,
    duration: "5 days",
    maxListingPrice: 10000,
    description: "List one item for free",
    type: "free"
  },
  {
    name: "Basic",
    price: 299,
    duration: "1 month",
    maxListingPrice: 10000,
    description: "Perfect for casual sellers",
    type: "basic"
  },
  {
    name: "Premium",
    price: 599,
    duration: "1 month",
    maxListingPrice: null,
    description: "For high-value items",
    type: "premium"
  }
];

export const SubscriptionPlans = () => {
  const session = useSession();

  const handleSubscribe = async (plan: typeof plans[0]) => {
    if (!session) {
      toast.error("Please sign in to subscribe");
      return;
    }

    // Here we'll integrate Razorpay
    const options = {
      key: "YOUR_RAZORPAY_KEY", // Replace with actual key
      amount: plan.price * 100, // Razorpay expects amount in paise
      currency: "INR",
      name: "Gaming Marketplace",
      description: `${plan.name} Subscription`,
      handler: async (response: any) => {
        // Create subscription record
        const { error } = await supabase
          .from("seller_subscriptions")
          .insert({
            seller_id: session.user.id,
            subscription_type: plan.type,
            price: plan.price,
            max_listing_price: plan.maxListingPrice,
            end_date: new Date(Date.now() + (plan.type === "free" ? 5 : 30) * 24 * 60 * 60 * 1000)
          });

        if (error) {
          toast.error("Failed to create subscription");
          return;
        }

        toast.success("Subscription activated successfully!");
      },
      prefill: {
        email: session.user.email
      }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map((plan) => (
        <Card key={plan.type} className="flex flex-col">
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="text-3xl font-bold mb-2">
              ₹{plan.price}
              <span className="text-sm font-normal text-muted-foreground">
                /{plan.duration}
              </span>
            </div>
            <ul className="space-y-2 text-sm">
              <li>• {plan.maxListingPrice ? `List items up to ₹${plan.maxListingPrice}` : 'No price limit on listings'}</li>
              <li>• List one item at a time</li>
              <li>• {plan.duration} validity</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              variant={plan.type === "premium" ? "default" : "outline"}
              onClick={() => handleSubscribe(plan)}
            >
              {plan.price === 0 ? "Start Free" : "Subscribe"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};