import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const BasesCondiciones = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-background">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center">
              <Star className="w-5 h-5 text-navy-dark" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">Sorteos B2B</span>
          </div>
          <Button variant="ghost" onClick={() => navigate("/")} className="text-muted-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" /> Volver
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-accent" />
          <h1 className="text-3xl font-display font-bold text-foreground">Bases y Condiciones</h1>
        </div>

        <Card className="border-border/50">
          <CardContent className="p-8 prose prose-sm max-w-none">
            <div className="space-y-6 text-card-foreground">
              <section>
                <h2 className="text-xl font-display font-bold text-card-foreground mb-3">1. Organizador</h2>
                <p className="text-muted-foreground">El presente programa de sorteos es organizado por [Nombre de la Empresa], con domicilio en [Dirección], en adelante "El Organizador".</p>
              </section>

              <section>
                <h2 className="text-xl font-display font-bold text-card-foreground mb-3">2. Participantes</h2>
                <p className="text-muted-foreground">Podrán participar todos los clientes corporativos que se encuentren registrados en la base de datos del Organizador y mantengan una cuenta activa con facturación vigente.</p>
              </section>

              <section>
                <h2 className="text-xl font-display font-bold text-card-foreground mb-3">3. Mecánica de participación</h2>
                <p className="text-muted-foreground">Por cada monto facturado en dólares estadounidenses (USD), según la categoría del cliente (DIAMANTE, ORO, PLATA, GREMIO), se asignará un número de participación. Los umbrales vigentes están publicados en la plataforma.</p>
              </section>

              <section>
                <h2 className="text-xl font-display font-bold text-card-foreground mb-3">4. Sorteos</h2>
                <p className="text-muted-foreground">Los sorteos se realizarán de forma trimestral. Las fechas exactas serán comunicadas con al menos 15 días de anticipación a través de la plataforma.</p>
              </section>

              <section>
                <h2 className="text-xl font-display font-bold text-card-foreground mb-3">5. Premios</h2>
                <p className="text-muted-foreground">Los premios de cada sorteo serán publicados en la plataforma junto con la convocatoria. Los premios no son canjeables por dinero en efectivo.</p>
              </section>

              <section>
                <h2 className="text-xl font-display font-bold text-card-foreground mb-3">6. Números ganadores</h2>
                <p className="text-muted-foreground">Un número que resulte ganador será marcado como "consumido" y no participará en sorteos futuros. El cliente conserva el resto de sus números activos para futuros sorteos.</p>
              </section>

              <section>
                <h2 className="text-xl font-display font-bold text-card-foreground mb-3">7. Publicación de resultados</h2>
                <p className="text-muted-foreground">Los resultados se publicarán en la plataforma dentro de las 48 horas posteriores a la realización de cada sorteo.</p>
              </section>

              <section>
                <h2 className="text-xl font-display font-bold text-card-foreground mb-3">8. Vigencia</h2>
                <p className="text-muted-foreground">Las presentes bases y condiciones tienen vigencia a partir del 1 de enero de 2026 y se mantendrán vigentes mientras el programa de incentivos esté activo.</p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BasesCondiciones;
