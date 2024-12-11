import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminSellerVerification } from "@/components/admin/AdminSellerVerification";
import { AdminListingManagement } from "@/components/admin/AdminListingManagement";
import { AdminPaymentSettings } from "@/components/admin/AdminPaymentSettings";
import { AdminRevenue } from "@/components/admin/AdminRevenue";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Admin = () => {
  const session = useSession();
  const navigate = useNavigate();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session?.user?.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  useEffect(() => {
    if (!session) {
      navigate("/auth");
    } else if (profile && !profile.is_admin) {
      toast.error("Unauthorized access");
      navigate("/");
    }
  }, [session, profile, navigate]);

  if (!profile?.is_admin) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Console</h1>
        <Tabs defaultValue="sellers">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sellers">Seller Verification</TabsTrigger>
            <TabsTrigger value="listings">Listing Management</TabsTrigger>
            <TabsTrigger value="payments">Payment Settings</TabsTrigger>
            <TabsTrigger value="revenue">Revenue Tracking</TabsTrigger>
          </TabsList>
          <TabsContent value="sellers">
            <AdminSellerVerification />
          </TabsContent>
          <TabsContent value="listings">
            <AdminListingManagement />
          </TabsContent>
          <TabsContent value="payments">
            <AdminPaymentSettings />
          </TabsContent>
          <TabsContent value="revenue">
            <AdminRevenue />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;