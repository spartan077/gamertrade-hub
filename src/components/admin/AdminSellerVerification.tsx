import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { Check, X } from "lucide-react";
import { toast } from "sonner";

export const AdminSellerVerification = () => {
  const { data: sellers, refetch } = useQuery({
    queryKey: ["unverified-sellers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("is_verified", false);

      if (error) throw error;
      return data;
    },
  });

  const handleVerification = async (sellerId: string, verify: boolean) => {
    const { error } = await supabase
      .from("profiles")
      .update({ is_verified: verify })
      .eq("id", sellerId);

    if (error) {
      toast.error("Failed to update seller verification status");
      return;
    }

    toast.success(
      `Seller ${verify ? "verified" : "rejected"} successfully`
    );
    refetch();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Pending Verifications</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sellers?.map((seller) => (
            <TableRow key={seller.id}>
              <TableCell>{seller.username}</TableCell>
              <TableCell>{seller.full_name}</TableCell>
              <TableCell className="space-x-2">
                <Button
                  size="sm"
                  onClick={() => handleVerification(seller.id, true)}
                >
                  <Check className="h-4 w-4 mr-1" />
                  Verify
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleVerification(seller.id, false)}
                >
                  <X className="h-4 w-4 mr-1" />
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};