import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface NFT {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  token_id: string | null;
  contract_address: string | null;
  document_hash: string | null;
  metadata: any;
}

export function NFTCard({ nft }: { nft: NFT }) {
  const [showLinked, setShowLinked] = useState(false);

  const { data: linkedVC } = useQuery({
    queryKey: ["linked-vc", nft.document_hash],
    queryFn: async () => {
      if (!nft.document_hash) return null;
      const { data } = await supabase
        .from("verifiable_credentials")
        .select("*")
        .eq("document_hash", nft.document_hash)
        .maybeSingle();
      return data;
    },
    enabled: !!nft.document_hash && showLinked,
  });

  return (
    <>
      <div
        onClick={() => setShowLinked(true)}
        className="card-gradient rounded-xl overflow-hidden glow-border group cursor-pointer hover:scale-[1.02] transition-all duration-300 animate-fade-in"
      >
        <div className="aspect-square bg-secondary flex items-center justify-center overflow-hidden">
          {nft.image_url ? (
            <img src={nft.image_url} alt={nft.name} className="w-full h-full object-cover" />
          ) : (
            <div className="text-6xl opacity-30">🖼️</div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-display font-semibold truncate">{nft.name}</h3>
          {nft.token_id && (
            <p className="text-xs text-muted-foreground mt-1 font-mono">#{nft.token_id}</p>
          )}
          {nft.document_hash && (
            <div className="flex items-center gap-1 mt-2 text-xs text-primary">
              <ExternalLink className="h-3 w-3" />
              <span>Linked to VC</span>
            </div>
          )}
        </div>
      </div>

      <Dialog open={showLinked} onOpenChange={() => setShowLinked(false)}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">{nft.name} — Linked Credential</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {linkedVC ? (
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Type</span>
                  <span>{linkedVC.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Issuer</span>
                  <span className="font-mono text-xs">{linkedVC.issuer_did.slice(0, 24)}...</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Hash</span>
                  <span className="font-mono text-xs">{linkedVC.document_hash.slice(0, 16)}...</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Verified</span>
                  <span className={linkedVC.is_verified ? "text-primary" : "text-muted-foreground"}>
                    {linkedVC.is_verified ? "✓ Yes" : "No"}
                  </span>
                </div>
                {linkedVC.raw_json_vc && (
                  <pre className="text-xs bg-secondary rounded-lg p-3 font-mono overflow-auto max-h-40 mt-2">
                    {JSON.stringify(linkedVC.raw_json_vc, null, 2)}
                  </pre>
                )}
              </div>
            ) : nft.document_hash ? (
              <p className="text-muted-foreground text-sm text-center">No linked credential found for this hash.</p>
            ) : (
              <p className="text-muted-foreground text-sm text-center">This NFT is not linked to any document.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
