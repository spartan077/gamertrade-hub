import { Navbar } from "@/components/Navbar";
import { FeaturedSection } from "@/components/FeaturedSection";
import { Button } from "@/components/ui/button";
import { Gamepad, Monitor, Cpu } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-b from-primary/20 to-background">
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-secondary to-accent animate-rgb-shift">
              India's Gaming Marketplace
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Buy and sell games, consoles, and PC components from trusted sellers across India.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gap-2">
                <Gamepad className="w-5 h-5" />
                Start Selling
              </Button>
              <Button size="lg" variant="secondary" className="gap-2">
                Browse Products
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-16">
        <h2 className="text-2xl font-bold mb-8">Browse Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Gamepad, title: "Games", desc: "New & used video games" },
            { icon: Monitor, title: "Consoles", desc: "Gaming consoles & accessories" },
            { icon: Cpu, title: "PC Parts", desc: "Computer components & peripherals" },
          ].map(({ icon: Icon, title, desc }) => (
            <a key={title} href={`/${title.toLowerCase()}`} className="gaming-card group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-colors">
                  <Icon className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <FeaturedSection />
    </div>
  );
};

export default Index;