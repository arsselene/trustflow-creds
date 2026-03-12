import { DashboardLayout } from "@/components/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { NFTCard } from "@/components/NFTCard";
import { Image } from "lucide-react";

export default function NFTPage() {
  const { user } = useAuth();

  const { data: nfts, isLoading } = useQuery({
    queryKey: ["nfts", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("nft_assets")
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
        <div>
          <h1 className="font-display text-3xl font-bold mb-1">NFT Collection</h1>
          <p className="text-muted-foreground">Your document-linked NFT assets</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card-gradient rounded-xl glow-border animate-pulse h-64" />
            ))}
          </div>
        ) : nfts && nfts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {nfts.map((nft) => (
              <NFTCard key={nft.id} nft={nft} />
            ))}
          </div>
        ) : (
          <div className="card-gradient rounded-xl p-12 glow-border text-center">
            <Image className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-40" />
            <h2 className="font-display text-xl font-semibold mb-2">No NFTs Yet</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Your NFT collection will populate as documents are verified and minted on-chain.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
