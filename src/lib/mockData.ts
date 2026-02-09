// Mock data for the sorteo system
export interface Client {
  id: string;
  name: string;
  cuit: string;
  dni: string;
  category: "GREMIO" | "DIAMANTE" | "ORO" | "PLATA";
  totalBilled: number;
  numbers: SorteoNumber[];
}

export interface SorteoNumber {
  id: string;
  number: number;
  clientId: string;
  status: "active" | "consumed";
  assignedAt: string;
  consumedAt?: string;
  sorteoId?: string;
  prize?: string;
}

export interface Sorteo {
  id: string;
  name: string;
  date: string;
  status: "upcoming" | "completed";
  prizes: Prize[];
  winningNumbers: WinningNumber[];
}

export interface Prize {
  id: string;
  name: string;
  description: string;
  position: number;
}

export interface WinningNumber {
  number: number;
  prizeId: string;
  clientName: string;
}

export interface CategoryRule {
  category: string;
  thresholdUSD: number;
  description: string;
}

export const CATEGORY_RULES: CategoryRule[] = [
  { category: "DIAMANTE", thresholdUSD: 5000, description: "1 número cada USD 5.000 facturados" },
  { category: "ORO", thresholdUSD: 10000, description: "1 número cada USD 10.000 facturados" },
  { category: "PLATA", thresholdUSD: 15000, description: "1 número cada USD 15.000 facturados" },
  { category: "GREMIO", thresholdUSD: 20000, description: "1 número cada USD 20.000 facturados" },
];

export const MOCK_CLIENTS: Client[] = [
  {
    id: "1",
    name: "Distribuidora Norte S.A.",
    cuit: "30-71234567-8",
    dni: "27345678",
    category: "DIAMANTE",
    totalBilled: 47500,
    numbers: [
      { id: "n1", number: 1042, clientId: "1", status: "active", assignedAt: "2025-11-15" },
      { id: "n2", number: 1043, clientId: "1", status: "active", assignedAt: "2025-11-15" },
      { id: "n3", number: 1044, clientId: "1", status: "active", assignedAt: "2025-12-01" },
      { id: "n4", number: 1045, clientId: "1", status: "consumed", assignedAt: "2025-09-10", consumedAt: "2025-10-01", sorteoId: "s1", prize: "Smart TV 55\"" },
      { id: "n5", number: 2187, clientId: "1", status: "active", assignedAt: "2026-01-10" },
      { id: "n6", number: 2188, clientId: "1", status: "active", assignedAt: "2026-01-10" },
      { id: "n7", number: 2189, clientId: "1", status: "active", assignedAt: "2026-01-25" },
      { id: "n8", number: 3501, clientId: "1", status: "active", assignedAt: "2026-02-05" },
      { id: "n9", number: 3502, clientId: "1", status: "active", assignedAt: "2026-02-05" },
    ],
  },
  {
    id: "2",
    name: "Comercial del Sur S.R.L.",
    cuit: "30-65432198-1",
    dni: "31987654",
    category: "ORO",
    totalBilled: 32000,
    numbers: [
      { id: "n10", number: 1101, clientId: "2", status: "active", assignedAt: "2025-11-20" },
      { id: "n11", number: 1102, clientId: "2", status: "active", assignedAt: "2025-12-15" },
      { id: "n12", number: 2200, clientId: "2", status: "active", assignedAt: "2026-01-20" },
    ],
  },
  {
    id: "3",
    name: "Ferretería Industrial Córdoba",
    cuit: "20-40567891-3",
    dni: "40567891",
    category: "PLATA",
    totalBilled: 18000,
    numbers: [
      { id: "n13", number: 1200, clientId: "3", status: "active", assignedAt: "2026-01-05" },
    ],
  },
];

export const MOCK_SORTEOS: Sorteo[] = [
  {
    id: "s1",
    name: "Sorteo 3er Trimestre 2025",
    date: "2025-10-01",
    status: "completed",
    prizes: [
      { id: "p1", name: "Smart TV 55\"", description: "Samsung Smart TV 55\" 4K", position: 1 },
      { id: "p2", name: "Notebook HP", description: "HP Pavilion 15\" i5 16GB", position: 2 },
      { id: "p3", name: "Gift Card USD 500", description: "Gift Card por USD 500", position: 3 },
    ],
    winningNumbers: [
      { number: 1045, prizeId: "p1", clientName: "Distribuidora Norte S.A." },
      { number: 887, prizeId: "p2", clientName: "Mayorista Central S.A." },
      { number: 654, prizeId: "p3", clientName: "TecnoPlus S.R.L." },
    ],
  },
  {
    id: "s2",
    name: "Sorteo 4to Trimestre 2025",
    date: "2025-12-20",
    status: "completed",
    prizes: [
      { id: "p4", name: "Viaje Cancún", description: "Viaje todo incluido a Cancún para 2 personas", position: 1 },
      { id: "p5", name: "iPhone 16 Pro", description: "Apple iPhone 16 Pro 256GB", position: 2 },
      { id: "p6", name: "Gift Card USD 300", description: "Gift Card por USD 300", position: 3 },
    ],
    winningNumbers: [
      { number: 2034, prizeId: "p4", clientName: "Importadora Global S.A." },
      { number: 1567, prizeId: "p5", clientName: "Metalúrgica del Oeste" },
      { number: 903, prizeId: "p6", clientName: "Alimentos Premium S.R.L." },
    ],
  },
  {
    id: "s3",
    name: "Sorteo 1er Trimestre 2026",
    date: "2026-03-31",
    status: "upcoming",
    prizes: [
      { id: "p7", name: "Auto 0km", description: "Fiat Cronos 0km", position: 1 },
      { id: "p8", name: "Moto Honda", description: "Honda CB190R 0km", position: 2 },
      { id: "p9", name: "Smart TV 65\"", description: "LG Smart TV 65\" OLED", position: 3 },
      { id: "p10", name: "Gift Card USD 1.000", description: "Gift Card por USD 1.000", position: 4 },
    ],
    winningNumbers: [],
  },
];

export function getClientByCuit(cuit: string): Client | undefined {
  return MOCK_CLIENTS.find(c => c.cuit === cuit || c.dni === cuit);
}

export function getNextNumberProgress(client: Client): { current: number; threshold: number; percentage: number } {
  const rule = CATEGORY_RULES.find(r => r.category === client.category);
  if (!rule) return { current: 0, threshold: 10000, percentage: 0 };
  
  const numbersEarned = Math.floor(client.totalBilled / rule.thresholdUSD);
  const amountUsed = numbersEarned * rule.thresholdUSD;
  const currentProgress = client.totalBilled - amountUsed;
  const percentage = (currentProgress / rule.thresholdUSD) * 100;
  
  return { current: currentProgress, threshold: rule.thresholdUSD, percentage };
}
