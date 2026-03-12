import { useState } from "react";
import { Shield, CheckCircle, Eye, Share2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VerifyModal } from "./VerifyModal";
import { JsonModal } from "./JsonModal";
import { ShareProofModal } from "./ShareProofModal";

interface VC {
  id: string;
  issuer_did: string;
  type: string;
  issuance_date: string;
  document_hash: string;
  raw_json_vc: any;
  is_verified: boolean;
}

export function CredentialCard({ vc }: { vc: VC }) {
  const [showVerify, setShowVerify] = useState(false);
  const [showJson, setShowJson] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const typeIcons: Record<string, string> = {
    Passport: "🛂",
    Diploma: "🎓",
    License: "📄",
    Certificate: "📜",
  };

  return (
    <>
      <div className="card-gradient rounded-xl p-5 glow-border group hover:scale-[1.02] transition-all duration-300 animate-fade-in">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{typeIcons[vc.type] || "📃"}</span>
            <div>
              <h3 className="font-display font-semibold text-foreground">{vc.type}</h3>
              <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                Issuer: {vc.issuer_did.slice(0, 20)}...
              </p>
            </div>
          </div>
          {vc.is_verified ? (
            <span className="flex items-center gap-1 text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">
              <CheckCircle className="h-3 w-3" /> Verified
            </span>
          ) : (
            <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
              Unverified
            </span>
          )}
        </div>

        <div className="space-y-2 mb-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Issued</span>
            <span className="text-foreground">{new Date(vc.issuance_date).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Hash</span>
            <span className="text-foreground font-mono text-xs">{vc.document_hash.slice(0, 16)}...</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => setShowVerify(true)}
            className="flex-1 accent-gradient text-primary-foreground font-medium"
          >
            <Shield className="h-3.5 w-3.5 mr-1" /> Verify
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowJson(true)}
            className="border-border text-foreground hover:bg-secondary"
          >
            <Eye className="h-3.5 w-3.5" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowShare(true)}
            className="border-border text-foreground hover:bg-secondary"
          >
            <Share2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <VerifyModal open={showVerify} onClose={() => setShowVerify(false)} vc={vc} />
      <JsonModal open={showJson} onClose={() => setShowJson(false)} json={vc.raw_json_vc} />
      <ShareProofModal open={showShare} onClose={() => setShowShare(false)} vcId={vc.id} vcType={vc.type} />
    </>
  );
}
