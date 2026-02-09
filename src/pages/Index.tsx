import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Trophy, Star, ArrowRight, Calendar, Gift, Shield, ChevronRight, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MOCK_SORTEOS, CATEGORY_RULES, getClientByCuit } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [cuitInput, setCuitInput] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const client = getClientByCuit(cuitInput.trim());
    if (client) {
      navigate(`/dashboard/${client.id}`);
    } else {
      setError("No encontramos un cliente con ese CUIT/DNI. Verificá los datos e intentá de nuevo.");
    }
  };

  const upcomingSorteo = MOCK_SORTEOS.find(s => s.status === "upcoming");
  const completedSorteos = MOCK_SORTEOS.filter(s => s.status === "completed");

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-xl border-b border-border/40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl gradient-gold flex items-center justify-center">
              <Star className="w-5 h-5 text-navy-dark" />
            </div>
            <span className="font-display text-lg font-bold text-foreground tracking-tight">Sorteos B2B</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#sorteos" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">Sorteos</a>
            <a href="#como-funciona" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">Cómo funciona</a>
            <a href="/bases-y-condiciones" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">Bases</a>
            <Button variant="outline" size="sm" className="rounded-xl" onClick={() => navigate("/admin")}>
              Admin
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-16 overflow-hidden">
        <div className="gradient-hero grain min-h-[90vh] flex items-center relative">
          {/* Modern mesh gradient */}
          <div className="absolute inset-0 gradient-mesh" />
          
          {/* Geometric accents */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-32 right-[15%] w-72 h-72 rounded-full border border-gold/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute bottom-32 left-[10%] w-48 h-48 rounded-full border border-gold/5"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute top-1/2 right-1/3 w-2 h-2 rounded-full bg-gold/30 animate-float" />
            <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-gold/20 animate-float" style={{ animationDelay: "1.5s" }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-8"
                >
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span className="text-sm text-gold-light font-semibold tracking-wide">Programa de Incentivos 2026</span>
                </motion.div>

                <h1 className="text-5xl md:text-7xl font-display font-extrabold text-primary-foreground leading-[1.05] mb-8">
                  Tus sorteos,{" "}
                  <span className="text-gradient-gold">transparentes</span>{" "}
                  y al instante
                </h1>

                <p className="text-lg text-primary-foreground/60 mb-10 max-w-lg font-body leading-relaxed">
                  Consultá tus números, seguí tu progreso y conocé los resultados de cada sorteo trimestral. Todo en un solo lugar.
                </p>

                {upcomingSorteo && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="glass-card rounded-2xl p-5 inline-flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-primary-foreground/40 uppercase tracking-wider font-semibold">Próximo sorteo</p>
                      <p className="text-primary-foreground font-semibold mt-0.5">{upcomingSorteo.name} — {new Date(upcomingSorteo.date).toLocaleDateString("es-AR")}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Login Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="glass-card-light rounded-3xl p-8 md:p-10">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl gradient-gold mx-auto mb-5 flex items-center justify-center modern-shadow-lg">
                      <Search className="w-8 h-8 text-navy-dark" />
                    </div>
                    <h2 className="text-2xl font-display font-bold text-card-foreground tracking-tight">Consultá tus números</h2>
                    <p className="text-muted-foreground mt-2 text-sm">Ingresá tu CUIT o DNI para acceder a tu panel</p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Input
                        type="text"
                        placeholder="Ej: 30-71234567-8 o 27345678"
                        value={cuitInput}
                        onChange={(e) => { setCuitInput(e.target.value); setError(""); }}
                        className="h-13 text-base rounded-xl bg-background/80 border-border/60 focus:border-accent/50"
                      />
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-destructive text-sm mt-2.5 font-medium"
                        >
                          {error}
                        </motion.p>
                      )}
                    </div>
                    <Button type="submit" className="w-full h-13 text-base rounded-xl gradient-gold text-navy-dark font-bold hover:opacity-90 transition-all modern-shadow">
                      Acceder a mi panel
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </form>

                  <p className="text-xs text-muted-foreground text-center mt-5">
                    Probá con: <button onClick={() => setCuitInput("30-71234567-8")} className="text-accent font-semibold hover:underline">30-71234567-8</button>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section id="como-funciona" className="py-28 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider mb-4">
              <Zap className="w-3.5 h-3.5" /> Cómo funciona
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-foreground tracking-tight mb-5">Simple y transparente</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Por cada monto facturado según tu categoría, acumulás números para participar.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {[
              { icon: Gift, title: "Facturá", desc: "Cada factura se convierte en números de sorteo según tu categoría.", num: "01" },
              { icon: Star, title: "Acumulá", desc: "Tus números se suman automáticamente a tu cuenta personal.", num: "02" },
              { icon: Trophy, title: "Ganá", desc: "Participá de sorteos trimestrales con premios exclusivos.", num: "03" },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-border/40 hover:border-accent/30 transition-all duration-300 h-full modern-shadow hover:modern-shadow-lg group rounded-2xl overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl gradient-gold flex items-center justify-center modern-shadow group-hover:scale-105 transition-transform">
                        <step.icon className="w-7 h-7 text-navy-dark" />
                      </div>
                      <span className="text-5xl font-display font-extrabold text-border/80">{step.num}</span>
                    </div>
                    <h3 className="text-xl font-display font-bold text-card-foreground mb-3">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Category rules */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-border/40 rounded-2xl overflow-hidden modern-shadow">
              <CardContent className="p-8 md:p-10">
                <h3 className="text-xl font-display font-bold text-card-foreground mb-8 text-center">Categorías y umbrales</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {CATEGORY_RULES.map((rule, i) => (
                    <motion.div
                      key={rule.category}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="rounded-2xl border border-border/50 p-5 text-center hover:border-accent/30 transition-colors group"
                    >
                      <span className="text-[11px] font-bold uppercase tracking-widest text-accent">{rule.category}</span>
                      <p className="text-3xl font-display font-extrabold text-card-foreground mt-2">USD {rule.thresholdUSD.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground mt-1">por número</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Sorteos */}
      <section id="sorteos" className="py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider mb-4">
              <Trophy className="w-3.5 h-3.5" /> Resultados
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-foreground tracking-tight mb-5">Sorteos anteriores</h2>
            <p className="text-muted-foreground text-lg">Consultá los ganadores de cada edición</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {completedSorteos.map((sorteo, i) => (
              <motion.div
                key={sorteo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="border-border/40 hover:border-accent/20 transition-all duration-300 overflow-hidden modern-shadow hover:modern-shadow-lg rounded-2xl">
                  <div className="gradient-navy grain p-6">
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <p className="text-gold/80 text-xs font-semibold uppercase tracking-wider">{new Date(sorteo.date).toLocaleDateString("es-AR", { year: "numeric", month: "long" })}</p>
                        <h3 className="text-xl font-display font-bold text-primary-foreground mt-1.5">{sorteo.name}</h3>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-gold" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      {sorteo.winningNumbers.map((wn, j) => (
                        <div key={j} className="flex items-center gap-3">
                          <span className="number-ball-sm">{wn.number}</span>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-card-foreground text-sm truncate">{sorteo.prizes.find(p => p.id === wn.prizeId)?.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{wn.clientName}</p>
                          </div>
                          <span className="text-[11px] font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-full">#{j + 1}°</span>
                        </div>
                      ))}
                    </div>
                    <Button variant="ghost" className="w-full mt-4 text-muted-foreground rounded-xl hover:text-accent" onClick={() => navigate(`/sorteos/${sorteo.id}`)}>
                      Ver detalle completo <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {upcomingSorteo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <Card className="border-2 border-accent/20 bg-accent/5 rounded-2xl modern-shadow">
                <CardContent className="p-10 text-center">
                  <div className="w-14 h-14 rounded-2xl gradient-gold mx-auto mb-5 flex items-center justify-center modern-shadow">
                    <Gift className="w-7 h-7 text-navy-dark" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2">{upcomingSorteo.name}</h3>
                  <p className="text-muted-foreground mb-6">
                    Fecha: {new Date(upcomingSorteo.date).toLocaleDateString("es-AR", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {upcomingSorteo.prizes.map((prize) => (
                      <span key={prize.id} className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold border border-accent/20">
                        {prize.position}° — {prize.name}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="gradient-navy grain py-14 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center">
                <Star className="w-4 h-4 text-navy-dark" />
              </div>
              <span className="font-display text-lg font-bold text-primary-foreground tracking-tight">Sorteos B2B</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="/bases-y-condiciones" className="text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors flex items-center gap-1.5 font-medium">
                <Shield className="w-4 h-4" /> Bases y condiciones
              </a>
            </div>
            <p className="text-sm text-primary-foreground/30">© 2026 Sorteos B2B</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
