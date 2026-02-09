import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Trophy, Star, ArrowRight, Calendar, Gift, Shield, ChevronRight } from "lucide-react";
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
      <nav className="fixed top-0 w-full z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center">
              <Star className="w-5 h-5 text-navy-dark" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">Sorteos B2B</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#sorteos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sorteos</a>
            <a href="#como-funciona" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cómo funciona</a>
            <a href="/bases-y-condiciones" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Bases y condiciones</a>
            <Button variant="outline" size="sm" onClick={() => navigate("/admin")}>
              Admin
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-16 overflow-hidden">
        <div className="gradient-hero min-h-[85vh] flex items-center relative">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-gold/5 animate-float" />
            <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-gold/5 animate-float" style={{ animationDelay: "1s" }} />
            <div className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full bg-gold/3 animate-float" style={{ animationDelay: "2s" }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
                  <Trophy className="w-4 h-4 text-gold" />
                  <span className="text-sm text-gold-light font-medium">Programa de Incentivos 2026</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground leading-tight mb-6">
                  Tus sorteos,{" "}
                  <span className="text-gradient-gold">transparentes</span>{" "}
                  y al instante
                </h1>

                <p className="text-lg text-primary-foreground/70 mb-8 max-w-lg font-body">
                  Consultá tus números, seguí tu progreso y conocé los resultados de cada sorteo trimestral. Todo en un solo lugar.
                </p>

                {upcomingSorteo && (
                  <div className="glass-card rounded-xl p-4 mb-8 inline-flex items-center gap-4">
                    <Calendar className="w-5 h-5 text-gold" />
                    <div>
                      <p className="text-sm text-primary-foreground/60">Próximo sorteo</p>
                      <p className="text-primary-foreground font-semibold">{upcomingSorteo.name} — {new Date(upcomingSorteo.date).toLocaleDateString("es-AR")}</p>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Login Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <Card className="bg-card/95 backdrop-blur-sm shadow-2xl border-border/50">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <div className="w-14 h-14 rounded-2xl gradient-gold mx-auto mb-4 flex items-center justify-center">
                        <Search className="w-7 h-7 text-navy-dark" />
                      </div>
                      <h2 className="text-2xl font-display font-bold text-card-foreground">Consultá tus números</h2>
                      <p className="text-muted-foreground mt-2">Ingresá tu CUIT o DNI para acceder a tu panel</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <Input
                          type="text"
                          placeholder="Ej: 30-71234567-8 o 27345678"
                          value={cuitInput}
                          onChange={(e) => { setCuitInput(e.target.value); setError(""); }}
                          className="h-12 text-base"
                        />
                        {error && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-destructive text-sm mt-2"
                          >
                            {error}
                          </motion.p>
                        )}
                      </div>
                      <Button type="submit" className="w-full h-12 text-base gradient-gold text-navy-dark font-semibold hover:opacity-90 transition-opacity">
                        Acceder a mi panel
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </form>

                    <p className="text-xs text-muted-foreground text-center mt-4">
                      Probá con: <button onClick={() => setCuitInput("30-71234567-8")} className="text-accent underline">30-71234567-8</button>
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section id="como-funciona" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">¿Cómo funciona?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Por cada monto facturado según tu categoría, acumulás números para participar en nuestros sorteos trimestrales.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: Gift, title: "Facturá", desc: "Cada factura se convierte en números de sorteo según tu categoría." },
              { icon: Star, title: "Acumulá", desc: "Tus números se suman automáticamente a tu cuenta personal." },
              { icon: Trophy, title: "Ganá", desc: "Participá de sorteos trimestrales con premios exclusivos." },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Card className="border-border/50 hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 rounded-2xl gradient-gold mx-auto mb-6 flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-navy-dark" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-card-foreground mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Category rules */}
          <Card className="border-border/50">
            <CardContent className="p-8">
              <h3 className="text-xl font-display font-bold text-card-foreground mb-6 text-center">Categorías y umbrales</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {CATEGORY_RULES.map((rule) => (
                  <div key={rule.category} className="rounded-xl border border-border p-4 text-center">
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent">{rule.category}</span>
                    <p className="text-2xl font-bold text-card-foreground mt-2">USD {rule.thresholdUSD.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground mt-1">por número</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sorteos */}
      <section id="sorteos" className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Resultados de sorteos</h2>
            <p className="text-muted-foreground">Consultá los ganadores de sorteos anteriores</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {completedSorteos.map((sorteo, i) => (
              <motion.div
                key={sorteo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-border/50 hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="gradient-navy p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gold text-sm font-medium">{new Date(sorteo.date).toLocaleDateString("es-AR", { year: "numeric", month: "long" })}</p>
                        <h3 className="text-xl font-display font-bold text-primary-foreground mt-1">{sorteo.name}</h3>
                      </div>
                      <Trophy className="w-8 h-8 text-gold" />
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {sorteo.winningNumbers.map((wn, j) => (
                        <div key={j} className="flex items-center gap-4">
                          <span className="number-ball-sm">{wn.number}</span>
                          <div className="flex-1">
                            <p className="font-semibold text-card-foreground text-sm">{sorteo.prizes.find(p => p.id === wn.prizeId)?.name}</p>
                            <p className="text-xs text-muted-foreground">{wn.clientName}</p>
                          </div>
                          <span className="text-xs font-medium text-accent">#{j + 1}° premio</span>
                        </div>
                      ))}
                    </div>
                    <Button variant="ghost" className="w-full mt-4 text-muted-foreground" onClick={() => navigate(`/sorteos/${sorteo.id}`)}>
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
              <Card className="border-2 border-accent/30 bg-accent/5">
                <CardContent className="p-8 text-center">
                  <Gift className="w-10 h-10 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-display font-bold text-foreground mb-2">{upcomingSorteo.name}</h3>
                  <p className="text-muted-foreground mb-4">
                    Fecha: {new Date(upcomingSorteo.date).toLocaleDateString("es-AR", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {upcomingSorteo.prizes.map((prize) => (
                      <span key={prize.id} className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20">
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
      <footer className="gradient-navy py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-gold" />
              <span className="font-display text-lg font-bold text-primary-foreground">Sorteos B2B</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="/bases-y-condiciones" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors flex items-center gap-1">
                <Shield className="w-4 h-4" /> Bases y condiciones
              </a>
            </div>
            <p className="text-sm text-primary-foreground/40">© 2026 Sorteos B2B. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
