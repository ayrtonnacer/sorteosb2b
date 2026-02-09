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
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <p className="text-foreground font-semibold mb-4">Cliente no encontrado</p>
            <Button onClick={() => navigate("/")} variant="outline">
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
      <div className="gradient-navy">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-8">
            <Button variant="ghost" className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Inicio
            </Button>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-gold" />
              <span className="font-display text-lg font-bold text-primary-foreground">Sorteos B2B</span>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <p className="text-primary-foreground/60 text-sm">Bienvenido/a</p>
                <h1 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground">{client.name}</h1>
                <div className="flex items-center gap-3 mt-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold gradient-gold text-navy-dark">{client.category}</span>
                  <span className="text-primary-foreground/50 text-sm">CUIT: {client.cuit}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-primary-foreground/60 text-sm">Números activos</p>
                <p className="text-4xl font-bold text-gold">{activeNumbers.length}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-6 pb-16">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Progress Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="shadow-lg border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2 font-body">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  Progreso al próximo número
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Progress value={progress.percentage} className="h-3" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">USD {progress.current.toLocaleString()}</span>
                    <span className="font-semibold text-card-foreground">USD {progress.threshold.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Te faltan <span className="font-semibold text-accent">USD {(progress.threshold - progress.current).toLocaleString()}</span> para obtener un nuevo número
                  </p>
                  {rule && <p className="text-xs text-muted-foreground">{rule.description}</p>}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Upcoming */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Card className="shadow-lg border-accent/20 bg-accent/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2 font-body">
                  <Clock className="w-5 h-5 text-accent" />
                  Próximo sorteo
                </CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingSorteo ? (
                  <div className="space-y-3">
                    <p className="font-semibold text-card-foreground">{upcomingSorteo.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(upcomingSorteo.date).toLocaleDateString("es-AR", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                    <p className="text-sm text-accent font-medium">
                      Participás con {activeNumbers.length} número{activeNumbers.length !== 1 ? "s" : ""}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {upcomingSorteo.prizes.slice(0, 2).map(p => (
                        <span key={p.id} className="text-xs px-2 py-1 rounded bg-accent/10 text-accent">{p.position}° {p.name}</span>
                      ))}
                      {upcomingSorteo.prizes.length > 2 && (
                        <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">+{upcomingSorteo.prizes.length - 2} más</span>
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
            <Card className="shadow-lg border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2 font-body">
                  <Gift className="w-5 h-5 text-accent" />
                  Resumen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total facturado</span>
                    <span className="font-bold text-card-foreground">USD {client.totalBilled.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Números totales</span>
                    <span className="font-bold text-card-foreground">{client.numbers.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Premios ganados</span>
                    <span className="font-bold text-accent">{consumedNumbers.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Active Numbers */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mt-8">
          <Card className="shadow-lg border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-body">
                <Star className="w-5 h-5 text-accent" />
                Tus números activos ({activeNumbers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {activeNumbers.map((n) => (
                  <motion.span
                    key={n.id}
                    className="number-ball"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
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
            <Card className="shadow-lg border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-body">
                  <Trophy className="w-5 h-5 text-accent" />
                  Números ganadores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {consumedNumbers.map((n) => (
                    <div key={n.id} className="flex items-center gap-4 p-4 rounded-xl bg-accent/5 border border-accent/20">
                      <span className="number-ball">{n.number}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-card-foreground">{n.prize}</p>
                        <p className="text-sm text-muted-foreground">
                          Sorteo del {new Date(n.consumedAt!).toLocaleDateString("es-AR")}
                        </p>
                      </div>
                      <Trophy className="w-6 h-6 text-gold" />
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
