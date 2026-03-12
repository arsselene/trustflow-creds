import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export function JsonModal({ open, onClose, json }: { open: boolean; onClose: () => void; json: any }) {
  const formatted = json
    ? JSON.stringify(json, null, 2)
    : JSON.stringify(
        {
          "@context": ["https://www.w3.org/2018/credentials/v1"],
          type: ["VerifiableCredential"],
          issuer: "did:example:issuer",
          credentialSubject: {},
        },
        null,
        2
      );

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="bg-card border-border max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display">W3C Verifiable Credential JSON</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-96">
          <pre className="text-xs font-mono text-foreground bg-secondary rounded-lg p-4 overflow-auto whitespace-pre-wrap">
            {formatted}
          </pre>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
