import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";

export const AdminRevenue = () => {
  const { data: subscriptions } = useQuery({
    queryKey: ["subscriptions-revenue"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("seller_subscriptions")
        .select("*, profiles(username)")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const totalRevenue = subscriptions?.reduce(
    (sum, sub) => sum + (sub.price || 0),
    0
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Revenue Tracking</h2>
      <div className="bg-primary/10 p-4 rounded-lg mb-4">
        <p className="text-lg">Total Revenue: ₹{totalRevenue || 0}</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Seller</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscriptions?.map((subscription) => (
            <TableRow key={subscription.id}>
              <TableCell>{subscription.profiles?.username}</TableCell>
              <TableCell className="capitalize">
                {subscription.subscription_type}
              </TableCell>
              <TableCell>₹{subscription.price}</TableCell>
              <TableCell>
                {new Date(subscription.start_date).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(subscription.end_date).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};