import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Trophy, TrendingUp, Clock, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MOCK_CLIENTS, MOCK_SORTEOS, getNextNumberProgress, CATEGORY_RULES } from "@/lib/mockData";

const ClientDashboard = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const client = MOCK_CLIENTS.find(c => c.id === clientId);

  if (!client) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md rounded-2xl modern-shadow">
          <CardContent className="p-8 text-center">
            <p className="text-foreground font-semibold mb-4">Cliente no encontrado</p>
            <Button onClick={() => navigate("/")} variant="outline" className="rounded-xl">
              <ArrowLeft className="w-4 h-4 mr-2" /> Volver al inicio
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const activeNumbers = client.numbers.filter(n => n.status === "active");
  const consumedNumbers = client.numbers.filter(n => n.status === "consumed");
  const progress = getNextNumberProgress(client);
  const rule = CATEGORY_RULES.find(r => r.category === client.category);
  const upcomingSorteo = MOCK_SORTEOS.find(s => s.status === "upcoming");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-navy grain relative">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="container mx-auto px-4 py-6 relative z-10">
          <div className="flex items-center justify-between mb-10">
            <Button variant="ghost" className="text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-xl" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Inicio
            </Button>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center">
                <Star className="w-4 h-4 text-navy-dark" />
              </div>
              <span className="font-display text-lg font-bold text-primary-foreground tracking-tight">Sorteos B2B</span>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <p className="text-primary-foreground/40 text-xs uppercase tracking-wider font-semibold">Bienvenido/a</p>
                <h1 className="text-3xl md:text-4xl font-display font-extrabold text-primary-foreground tracking-tight mt-1">{client.name}</h1>
                <div className="flex items-center gap-3 mt-3">
                  <span className="px-3 py-1.5 rounded-full text-xs font-bold gradient-gold text-navy-dark">{client.category}</span>
                  <span className="text-primary-foreground/40 text-sm font-medium">CUIT: {client.cuit}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-primary-foreground/40 text-xs uppercase tracking-wider font-semibold">Números activos</p>
                <p className="text-5xl font-display font-extrabold text-gold mt-1">{activeNumbers.length}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-6 pb-16">
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Progress Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="modern-shadow-lg border-border/40 rounded-2xl h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2 font-body font-semibold">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-accent" />
                  </div>
                  Progreso al próximo número
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Progress value={progress.percentage} className="h-2.5 rounded-full" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-medium">USD {progress.current.toLocaleString()}</span>
                    <span className="font-bold text-card-foreground">USD {progress.threshold.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Te faltan <span className="font-bold text-accent">USD {(progress.threshold - progress.current).toLocaleString()}</span> para obtener un nuevo número
                  </p>
                  {rule && <p className="text-xs text-muted-foreground/70">{rule.description}</p>}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Upcoming */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Card className="modern-shadow-lg border-accent/20 bg-accent/5 rounded-2xl h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2 font-body font-semibold">
                  <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-accent" />
                  </div>
                  Próximo sorteo
                </CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingSorteo ? (
                  <div className="space-y-3">
                    <p className="font-bold text-card-foreground">{upcomingSorteo.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(upcomingSorteo.date).toLocaleDateString("es-AR", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                    <p className="text-sm text-accent font-semibold">
                      Participás con {activeNumbers.length} número{activeNumbers.length !== 1 ? "s" : ""}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {upcomingSorteo.prizes.slice(0, 2).map(p => (
                        <span key={p.id} className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent font-semibold">{p.position}° {p.name}</span>
                      ))}
                      {upcomingSorteo.prizes.length > 2 && (
                        <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-medium">+{upcomingSorteo.prizes.length - 2} más</span>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No hay sorteos programados</p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="modern-shadow-lg border-border/40 rounded-2xl h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2 font-body font-semibold">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Gift className="w-4 h-4 text-accent" />
                  </div>
                  Resumen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: "Total facturado", value: `USD ${client.totalBilled.toLocaleString()}` },
                    { label: "Números totales", value: client.numbers.length },
                    { label: "Premios ganados", value: consumedNumbers.length, highlight: true },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                      <span className={`font-bold ${item.highlight ? 'text-accent' : 'text-card-foreground'}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Active Numbers */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mt-8">
          <Card className="modern-shadow-lg border-border/40 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-body text-base font-semibold">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Star className="w-4 h-4 text-accent" />
                </div>
                Tus números activos ({activeNumbers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {activeNumbers.map((n) => (
                  <motion.span
                    key={n.id}
                    className="number-ball"
                    whileHover={{ scale: 1.08, y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    {n.number}
                  </motion.span>
                ))}
              </div>
              {activeNumbers.length === 0 && (
                <p className="text-muted-foreground text-sm">No tenés números activos en este momento.</p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Won Numbers */}
        {consumedNumbers.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-6">
            <Card className="modern-shadow-lg border-border/40 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-body text-base font-semibold">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-accent" />
                  </div>
                  Números ganadores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {consumedNumbers.map((n) => (
                    <div key={n.id} className="flex items-center gap-4 p-4 rounded-2xl bg-accent/5 border border-accent/15">
                      <span className="number-ball">{n.number}</span>
                      <div className="flex-1">
                        <p className="font-bold text-card-foreground">{n.prize}</p>
                        <p className="text-sm text-muted-foreground">
                          Sorteo del {new Date(n.consumedAt!).toLocaleDateString("es-AR")}
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-gold" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
