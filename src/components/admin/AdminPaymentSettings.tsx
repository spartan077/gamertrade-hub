import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const AdminPaymentSettings = () => {
  const { data: settings, refetch } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("admin_settings")
        .select("*")
        .single();

      if (error) throw error;
      return data;
    },
  });

  const updatePaymentGateway = async (gateway: string) => {
    const { error } = await supabase
      .from("admin_settings")
      .update({ payment_gateway: gateway })
      .eq("id", settings?.id);

    if (error) {
      toast.error("Failed to update payment gateway");
      return;
    }

    toast.success("Payment gateway updated successfully");
    refetch();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Payment Gateway Settings</h2>
      <div className="max-w-md">
        <Select
          value={settings?.payment_gateway}
          onValueChange={updatePaymentGateway}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select payment gateway" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="razorpay">Razorpay</SelectItem>
            <SelectItem value="payu">PayU</SelectItem>
            <SelectItem value="cashfree">Cashfree</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};