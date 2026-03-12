import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Link, Brain, Fingerprint, Upload, CheckCircle, ArrowRight } from "lucide-react";

const features = [
  { icon: Link, title: "Blockchain", desc: "Immutable record on-chain" },
  { icon: Brain, title: "AI Verified", desc: "Deep learning authenticity" },
  { icon: Fingerprint, title: "NFT Secured", desc: "Unique token per document" },
];

const steps = [
  { icon: Upload, step: "STEP 1", title: "Upload", desc: "Submit your document" },
  { icon: Brain, step: "STEP 2", title: "AI Analysis", desc: "Deep learning verification" },
  { icon: Link, step: "STEP 3", title: "Blockchain", desc: "Mint NFT on-chain" },
  { icon: CheckCircle, step: "STEP 4", title: "Verified", desc: "Immutable proof" },
];

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-display text-lg font-bold">KODE</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/auth")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Sign In
            </button>
            <Button onClick={() => navigate("/auth")} className="accent-gradient text-primary-foreground font-semibold text-sm px-5">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-gradient pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(160_100%_40%/0.08),transparent_60%)]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center mb-6">
            <Shield className="h-12 w-12 text-primary opacity-60" />
          </div>
          <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-sm text-primary font-medium mb-8">
            <span className="h-1.5 w-1.5 rounded-full accent-gradient" />
            Blockchain Secured
          </span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 max-w-4xl mx-auto">
            Verify Documents{" "}
            <span className="text-gradient">on the Blockchain</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            KODE connects your identity documents to the blockchain through NFT verification.
            Immutable, transparent, and AI-powered authenticity checks.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={() => navigate("/auth")}
              className="accent-gradient text-primary-foreground font-semibold text-base px-8 py-6"
            >
              Connect Wallet <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/auth")}
              className="border-border text-foreground hover:bg-secondary font-semibold text-base px-8 py-6"
            >
              Learn More
            </Button>
          </div>
        </div>
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 h-16">
          <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M0 32C240 64 480 0 720 32C960 64 1200 0 1440 32V64H0V32Z" fill="hsl(200 25% 8%)" />
          </svg>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {features.map((f) => (
              <div key={f.title} className="card-gradient rounded-xl p-8 text-center glow-border hover:scale-105 transition-transform duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 accent-gradient" />
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <f.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground mb-16 max-w-xl mx-auto">
            Four simple steps to verify and secure your documents on the blockchain.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto relative">
            {steps.map((s, i) => (
              <div key={s.step} className="flex flex-col items-center animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="h-16 w-16 rounded-full bg-card glow-border flex items-center justify-center mb-4">
                  <s.icon className="h-7 w-7 text-primary" />
                </div>
                <span className="text-xs text-primary font-semibold tracking-widest mb-2">{s.step}</span>
                <h3 className="font-display font-semibold mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="hero-gradient py-12 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-display font-bold">KODE</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Blockchain-secured document verification. © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
