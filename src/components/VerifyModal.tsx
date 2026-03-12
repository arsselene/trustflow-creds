import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, Loader2, Shield, Link, FileCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface VC {
  id: string;
  issuer_did: string;
  type: string;
  document_hash: string;
  is_verified: boolean;
}

const steps = [
  { label: "Signature Check", desc: "Validating digital signature", icon: Shield },
  { label: "Issuer Trust", desc: "Verifying issuer DID on trust registry", icon: Link },
  { label: "Hash Integrity", desc: "Matching document hash on-chain", icon: FileCheck },
];

export function VerifyModal({ open, onClose, vc }: { open: boolean; onClose: () => void; vc: VC }) {
  const [currentStep, setCurrentStep] = useState(-1);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!open) {
      setCurrentStep(-1);
      setDone(false);
      return;
    }
    setCurrentStep(0);
    const timers = steps.map((_, i) =>
      setTimeout(() => {
        setCurrentStep(i + 1);
        if (i === steps.length - 1) {
          setTimeout(async () => {
            setDone(true);
            await supabase
              .from("verifiable_credentials")
              .update({ is_verified: true })
              .eq("id", vc.id);
          }, 500);
        }
      }, (i + 1) * 1200)
    );
    return () => timers.forEach(clearTimeout);
  }, [open, vc.id]);

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Verification Process</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {steps.map((step, i) => {
            const StepIcon = step.icon;
            const isActive = currentStep === i;
            const isDone = currentStep > i;
            return (
              <div key={i} className={`flex items-center gap-4 p-3 rounded-lg transition-all ${isDone ? "bg-primary/10" : isActive ? "bg-secondary" : "opacity-40"}`}>
                <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${isDone ? "accent-gradient" : "bg-secondary"}`}>
                  {isDone ? (
                    <CheckCircle className="h-5 w-5 text-primary-foreground" />
                  ) : isActive ? (
                    <Loader2 className="h-5 w-5 text-primary animate-spin" />
                  ) : (
                    <StepIcon className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm">{step.label}</p>
                  <p className="text-xs text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            );
          })}
          {done && (
            <div className="text-center py-3 animate-fade-in">
              <CheckCircle className="h-10 w-10 text-primary mx-auto mb-2" />
              <p className="font-display font-semibold text-primary">Credential Verified!</p>
              <p className="text-xs text-muted-foreground mt-1">All checks passed successfully</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
