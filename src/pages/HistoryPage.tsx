import { DashboardLayout } from "@/components/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Clock, FileCheck, Scan, Bell } from "lucide-react";

const iconMap: Record<string, any> = {
  scan: Scan,
  verify: FileCheck,
  default: Bell,
};

export default function HistoryPage() {
  const { user } = useAuth();

  const { data: activities, isLoading } = useQuery({
    queryKey: ["activities", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("activity_history")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold mb-1">Activity History</h1>
          <p className="text-muted-foreground">Track document scans and verifications</p>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card-gradient rounded-xl p-4 glow-border animate-pulse h-16" />
            ))}
          </div>
        ) : activities && activities.length > 0 ? (
          <div className="space-y-3">
            {activities.map((a) => {
              const Icon = iconMap[a.entity_type || "default"] || iconMap.default;
              return (
                <div key={a.id} className="card-gradient rounded-xl p-4 glow-border flex items-center gap-4 animate-fade-in">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{a.action}</p>
                    {a.details && <p className="text-xs text-muted-foreground truncate">{a.details}</p>}
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(a.created_at).toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="card-gradient rounded-xl p-12 glow-border text-center">
            <Clock className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-40" />
            <h2 className="font-display text-xl font-semibold mb-2">No Activity Yet</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Your scan and verification history will appear here as you use the system.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
