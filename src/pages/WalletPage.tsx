import { DashboardLayout } from "@/components/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { CredentialCard } from "@/components/CredentialCard";
import { Wallet, Plus } from "lucide-react";

export default function WalletPage() {
  const { user } = useAuth();

  const { data: vcs, isLoading } = useQuery({
    queryKey: ["vcs", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("verifiable_credentials")
        .select("*")
        .eq("owner_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold mb-1">My Credentials</h1>
            <p className="text-muted-foreground">Manage your Verifiable Credentials</p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card-gradient rounded-xl p-5 glow-border animate-pulse h-48" />
            ))}
          </div>
        ) : vcs && vcs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vcs.map((vc) => (
              <CredentialCard key={vc.id} vc={vc} />
            ))}
          </div>
        ) : (
          <div className="card-gradient rounded-xl p-12 glow-border text-center">
            <Wallet className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-40" />
            <h2 className="font-display text-xl font-semibold mb-2">No Credentials Yet</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Your Verifiable Credentials will appear here once documents are scanned and verified
              through the Huawei Cloud OCR system.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
