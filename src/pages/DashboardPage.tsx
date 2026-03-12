import { DashboardLayout } from "@/components/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Shield, Image, Clock, CheckCircle } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();

  const { data: vcs } = useQuery({
    queryKey: ["vcs-count", user?.id],
    queryFn: async () => {
      const { count } = await supabase
        .from("verifiable_credentials")
        .select("*", { count: "exact", head: true })
        .eq("owner_id", user!.id);
      return count ?? 0;
    },
    enabled: !!user,
  });

  const { data: nfts } = useQuery({
    queryKey: ["nfts-count", user?.id],
    queryFn: async () => {
      const { count } = await supabase
        .from("nft_assets")
        .select("*", { count: "exact", head: true })
        .eq("owner_id", user!.id);
      return count ?? 0;
    },
    enabled: !!user,
  });

  const { data: activities } = useQuery({
    queryKey: ["activity-count", user?.id],
    queryFn: async () => {
      const { count } = await supabase
        .from("activity_history")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user!.id);
      return count ?? 0;
    },
    enabled: !!user,
  });

  const stats = [
    { label: "Credentials", value: vcs ?? 0, icon: Shield, color: "text-primary" },
    { label: "NFT Assets", value: nfts ?? 0, icon: Image, color: "text-primary" },
    { label: "Activities", value: activities ?? 0, icon: Clock, color: "text-primary" },
    { label: "Verified", value: "—", icon: CheckCircle, color: "text-primary" },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold mb-1">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your verifiable credentials & digital assets</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="card-gradient rounded-xl p-5 glow-border animate-fade-in">
              <div className="flex items-center justify-between mb-3">
                <s.icon className={`h-5 w-5 ${s.color}`} />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</span>
              </div>
              <p className="font-display text-3xl font-bold">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="card-gradient rounded-xl p-8 glow-border text-center">
          <Shield className="h-12 w-12 text-primary mx-auto mb-4 opacity-50" />
          <h2 className="font-display text-xl font-semibold mb-2">Welcome to KODE</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Your blockchain-secured credential wallet. Navigate using the sidebar to manage your
            Verifiable Credentials, NFT assets, and activity history.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
