import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Users, Hash, Trophy, Settings, Plus, Search, Star, LogOut,
  ChevronRight, BarChart3, Gift
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { MOCK_CLIENTS, MOCK_SORTEOS, CATEGORY_RULES } from "@/lib/mockData";

type AdminTab = "clientes" | "numeros" | "sorteos" | "reglas";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>("clientes");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const tabs = [
    { id: "clientes" as AdminTab, label: "Clientes", icon: Users },
    { id: "numeros" as AdminTab, label: "Números", icon: Hash },
    { id: "sorteos" as AdminTab, label: "Sorteos", icon: Trophy },
    { id: "reglas" as AdminTab, label: "Reglas", icon: Settings },
  ];

  const filteredClients = MOCK_CLIENTS.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.cuit.includes(searchQuery) ||
    c.dni.includes(searchQuery)
  );

  const allNumbers = MOCK_CLIENTS.flatMap(c =>
    c.numbers.map(n => ({ ...n, clientName: c.name, clientCategory: c.category }))
  );

  const categoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      DIAMANTE: "bg-accent/10 text-accent border-accent/20",
      ORO: "bg-gold/10 text-gold-dark border-gold/20",
      PLATA: "bg-muted text-muted-foreground border-border",
      GREMIO: "bg-primary/10 text-primary border-primary/20",
    };
    return colors[cat] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 gradient-navy flex flex-col min-h-screen sticky top-0">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center">
              <Star className="w-5 h-5 text-navy-dark" />
            </div>
            <span className="font-display text-lg font-bold text-primary-foreground">Admin</span>
          </div>

          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6">
          <Button variant="ghost" className="w-full text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 justify-start" onClick={() => navigate("/")}>
            <LogOut className="w-4 h-4 mr-2" /> Salir
          </Button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: "Clientes", value: MOCK_CLIENTS.length, icon: Users },
            { label: "Números activos", value: allNumbers.filter(n => n.status === "active").length, icon: Hash },
            { label: "Sorteos realizados", value: MOCK_SORTEOS.filter(s => s.status === "completed").length, icon: Trophy },
            { label: "Próximo sorteo", value: MOCK_SORTEOS.find(s => s.status === "upcoming")?.name || "—", icon: Gift, isText: true },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="border-border/50">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                      <p className={`mt-1 font-bold text-card-foreground ${stat.isText ? 'text-sm' : 'text-2xl'}`}>
                        {typeof stat.value === 'number' ? stat.value : stat.value}
                      </p>
                    </div>
                    <stat.icon className="w-8 h-8 text-accent/40" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Clientes Tab */}
        {activeTab === "clientes" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold text-foreground">Clientes</h2>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre o CUIT..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-9 w-72"
                  />
                </div>
                <Button className="gradient-gold text-navy-dark font-semibold hover:opacity-90">
                  <Plus className="w-4 h-4 mr-2" /> Nuevo cliente
                </Button>
              </div>
            </div>

            <Card className="border-border/50">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>CUIT</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead className="text-right">Facturado</TableHead>
                    <TableHead className="text-right">Números</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">{client.name}</TableCell>
                      <TableCell className="text-muted-foreground">{client.cuit}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={categoryColor(client.category)}>
                          {client.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">USD {client.totalBilled.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <span className="font-bold text-accent">{client.numbers.filter(n => n.status === "active").length}</span>
                        <span className="text-muted-foreground"> / {client.numbers.length}</span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/dashboard/${client.id}`)}>
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </motion.div>
        )}

        {/* Numeros Tab */}
        {activeTab === "numeros" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold text-foreground">Números en circulación</h2>
              <Button className="gradient-gold text-navy-dark font-semibold hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" /> Asignar números
              </Button>
            </div>

            <Card className="border-border/50">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Asignado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allNumbers.sort((a, b) => a.number - b.number).map((n) => (
                    <TableRow key={n.id}>
                      <TableCell>
                        <span className={n.status === "active" ? "number-ball-sm" : "number-ball-consumed w-9 h-9 inline-flex items-center justify-center rounded-full font-bold text-sm"}>
                          {n.number}
                        </span>
                      </TableCell>
                      <TableCell className="font-medium">{n.clientName}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={categoryColor(n.clientCategory)}>
                          {n.clientCategory}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={n.status === "active" ? "default" : "secondary"} className={n.status === "active" ? "bg-success text-success-foreground" : ""}>
                          {n.status === "active" ? "Activo" : "Consumido"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(n.assignedAt).toLocaleDateString("es-AR")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </motion.div>
        )}

        {/* Sorteos Tab */}
        {activeTab === "sorteos" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold text-foreground">Sorteos</h2>
              <Button className="gradient-gold text-navy-dark font-semibold hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" /> Crear sorteo
              </Button>
            </div>

            <div className="space-y-4">
              {MOCK_SORTEOS.map((sorteo) => (
                <Card key={sorteo.id} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${sorteo.status === "upcoming" ? "gradient-gold" : "bg-muted"}`}>
                          <Trophy className={`w-6 h-6 ${sorteo.status === "upcoming" ? "text-navy-dark" : "text-muted-foreground"}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-card-foreground">{sorteo.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(sorteo.date).toLocaleDateString("es-AR", { year: "numeric", month: "long", day: "numeric" })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant={sorteo.status === "upcoming" ? "default" : "secondary"} className={sorteo.status === "upcoming" ? "bg-accent text-accent-foreground" : ""}>
                          {sorteo.status === "upcoming" ? "Próximo" : "Completado"}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{sorteo.prizes.length} premios</span>
                        {sorteo.status === "upcoming" && (
                          <Button variant="outline" size="sm">Cargar resultados</Button>
                        )}
                      </div>
                    </div>
                    {sorteo.winningNumbers.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="flex flex-wrap gap-3">
                          {sorteo.winningNumbers.map((wn, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm">
                              <span className="number-ball-sm">{wn.number}</span>
                              <span className="text-muted-foreground">{wn.clientName}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Reglas Tab */}
        {activeTab === "reglas" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold text-foreground">Reglas por categoría</h2>
              <Button variant="outline">
                <BarChart3 className="w-4 h-4 mr-2" /> Editar umbrales
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {CATEGORY_RULES.map((rule) => (
                <Card key={rule.category} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Badge variant="outline" className={categoryColor(rule.category)}>{rule.category}</Badge>
                        <p className="text-2xl font-bold text-card-foreground mt-3">USD {rule.thresholdUSD.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground mt-1">{rule.description}</p>
                      </div>
                      <Settings className="w-8 h-8 text-muted-foreground/30" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
