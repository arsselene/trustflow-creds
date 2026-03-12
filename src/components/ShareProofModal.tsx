import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ShareProofModal({
  open,
  onClose,
  vcId,
  vcType,
}: {
  open: boolean;
  onClose: () => void;
  vcId: string;
  vcType: string;
}) {
  const { toast } = useToast();
  const shareUrl = `${window.location.origin}/verify/${vcId}`;

  const copy = () => {
    navigator.clipboard.writeText(shareUrl);
    toast({ title: "Copied!", description: "Share URL copied to clipboard" });
  };

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Share Proof — {vcType}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center justify-center p-6 bg-secondary rounded-xl">
            <div className="h-32 w-32 bg-foreground/10 rounded-lg flex items-center justify-center border border-border">
              <QrCode className="h-16 w-16 text-primary" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Share this link with verifiers to prove your credential
          </p>
          <div className="flex gap-2">
            <Input value={shareUrl} readOnly className="bg-secondary border-border text-xs font-mono" />
            <Button onClick={copy} size="icon" variant="outline" className="shrink-0 border-border">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
