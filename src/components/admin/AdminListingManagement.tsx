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
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export const AdminListingManagement = () => {
  const { data: listings, refetch } = useQuery({
    queryKey: ["all-listings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*, profiles(username)");

      if (error) throw error;
      return data;
    },
  });

  const toggleVisibility = async (productId: string, visible: boolean) => {
    const { error } = await supabase
      .from("products")
      .update({ is_visible: visible })
      .eq("id", productId);

    if (error) {
      toast.error("Failed to update listing visibility");
      return;
    }

    toast.success(
      `Listing ${visible ? "visible" : "hidden"} successfully`
    );
    refetch();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Listing Management</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Seller</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listings?.map((listing) => (
            <TableRow key={listing.id}>
              <TableCell>{listing.title}</TableCell>
              <TableCell>{listing.profiles?.username}</TableCell>
              <TableCell>₹{listing.price}</TableCell>
              <TableCell>
                {listing.is_visible ? "Visible" : "Hidden"}
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant={listing.is_visible ? "destructive" : "default"}
                  onClick={() => toggleVisibility(listing.id, !listing.is_visible)}
                >
                  {listing.is_visible ? (
                    <>
                      <EyeOff className="h-4 w-4 mr-1" />
                      Hide
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 mr-1" />
                      Show
                    </>
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};