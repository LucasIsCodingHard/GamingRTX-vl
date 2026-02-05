export type BuilderSlot =
  | "cpu"
  | "motherboard"
  | "gpu"
  | "ram"
  | "storage"
  | "psu"
  | "case"

export type Socket = "AM5" | "LGA1700"
export type RamType = "DDR5" | "DDR4"
export type FormFactor = "ATX" | "mATX" | "ITX"

export type BuilderComponent = {
  id: string
  name: string
  slot: BuilderSlot
  price: number
  image: string
  specs: string[]
  socket?: Socket
  ramType?: RamType
  formFactor?: FormFactor
  wattage?: number
  condition: "nuevo" | "usado"
}

export const builderComponents: BuilderComponent[] = [
  // CPUs
  {
    id: "cpu-1",
    name: "AMD Ryzen 7 7800X3D",
    slot: "cpu",
    price: 389999,
    image: "/images/sell-components.jpg",
    specs: ["8 Cores / 16 Threads", "5.0 GHz Boost", "96MB 3D V-Cache"],
    socket: "AM5",
    wattage: 120,
    condition: "nuevo",
  },
  {
    id: "cpu-2",
    name: "AMD Ryzen 5 7600X",
    slot: "cpu",
    price: 229999,
    image: "/images/sell-components.jpg",
    specs: ["6 Cores / 12 Threads", "5.3 GHz Boost", "38MB Cache"],
    socket: "AM5",
    wattage: 105,
    condition: "nuevo",
  },
  {
    id: "cpu-3",
    name: "Intel Core i7-13700K",
    slot: "cpu",
    price: 339999,
    image: "/images/sell-components.jpg",
    specs: ["16 Cores / 24 Threads", "5.4 GHz Boost", "LGA 1700"],
    socket: "LGA1700",
    wattage: 125,
    condition: "nuevo",
  },
  {
    id: "cpu-4",
    name: "Intel Core i5-13600K (Usado)",
    slot: "cpu",
    price: 189999,
    image: "/images/sell-components.jpg",
    specs: ["14 Cores", "5.1 GHz Boost", "3 meses de uso"],
    socket: "LGA1700",
    wattage: 125,
    condition: "usado",
  },

  // Motherboards
  {
    id: "mb-1",
    name: "ASUS ROG Strix B650-A WiFi",
    slot: "motherboard",
    price: 219999,
    image: "/images/sell-components.jpg",
    specs: ["AM5", "DDR5", "WiFi 6E", "PCIe 5.0"],
    socket: "AM5",
    ramType: "DDR5",
    formFactor: "ATX",
    condition: "nuevo",
  },
  {
    id: "mb-2",
    name: "MSI MAG B650 Tomahawk",
    slot: "motherboard",
    price: 189999,
    image: "/images/sell-components.jpg",
    specs: ["AM5", "DDR5", "2.5G LAN", "USB-C"],
    socket: "AM5",
    ramType: "DDR5",
    formFactor: "ATX",
    condition: "nuevo",
  },
  {
    id: "mb-3",
    name: "ASUS TUF Gaming Z790-Plus WiFi",
    slot: "motherboard",
    price: 249999,
    image: "/images/sell-components.jpg",
    specs: ["LGA 1700", "DDR5", "WiFi 6", "Thunderbolt 4"],
    socket: "LGA1700",
    ramType: "DDR5",
    formFactor: "ATX",
    condition: "nuevo",
  },
  {
    id: "mb-4",
    name: "Gigabyte B660M DS3H (Usado)",
    slot: "motherboard",
    price: 99999,
    image: "/images/sell-components.jpg",
    specs: ["LGA 1700", "DDR4", "mATX", "6 meses de uso"],
    socket: "LGA1700",
    ramType: "DDR4",
    formFactor: "mATX",
    condition: "usado",
  },

  // GPUs
  {
    id: "gpu-1",
    name: "NVIDIA RTX 4080 Super",
    slot: "gpu",
    price: 899999,
    image: "/images/sell-components.jpg",
    specs: ["16GB GDDR6X", "Ada Lovelace", "DLSS 3"],
    wattage: 320,
    condition: "nuevo",
  },
  {
    id: "gpu-2",
    name: "NVIDIA RTX 4070 Ti",
    slot: "gpu",
    price: 649999,
    image: "/images/sell-components.jpg",
    specs: ["12GB GDDR6X", "Ada Lovelace", "DLSS 3"],
    wattage: 285,
    condition: "nuevo",
  },
  {
    id: "gpu-3",
    name: "NVIDIA RTX 4060 8GB",
    slot: "gpu",
    price: 349999,
    image: "/images/sell-components.jpg",
    specs: ["8GB GDDR6", "Ada Lovelace", "DLSS 3"],
    wattage: 115,
    condition: "nuevo",
  },
  {
    id: "gpu-4",
    name: "RTX 3070 Ti (Usado)",
    slot: "gpu",
    price: 299999,
    image: "/images/sell-components.jpg",
    specs: ["8GB GDDR6X", "Ampere", "6 meses de uso"],
    wattage: 290,
    condition: "usado",
  },

  // RAM
  {
    id: "ram-1",
    name: "Corsair Vengeance DDR5 32GB (2x16)",
    slot: "ram",
    price: 129999,
    image: "/images/sell-components.jpg",
    specs: ["5600MHz", "CL36", "Intel XMP 3.0"],
    ramType: "DDR5",
    condition: "nuevo",
  },
  {
    id: "ram-2",
    name: "G.Skill Trident Z5 32GB (2x16)",
    slot: "ram",
    price: 149999,
    image: "/images/sell-components.jpg",
    specs: ["6000MHz", "CL30", "RGB"],
    ramType: "DDR5",
    condition: "nuevo",
  },
  {
    id: "ram-3",
    name: "Kingston Fury Beast DDR4 32GB (2x16)",
    slot: "ram",
    price: 69999,
    image: "/images/sell-components.jpg",
    specs: ["3200MHz", "CL16", "XMP"],
    ramType: "DDR4",
    condition: "nuevo",
  },

  // Storage
  {
    id: "ssd-1",
    name: "Samsung 990 Pro 2TB NVMe",
    slot: "storage",
    price: 179999,
    image: "/images/sell-components.jpg",
    specs: ["7450 MB/s", "PCIe 4.0", "V-NAND"],
    condition: "nuevo",
  },
  {
    id: "ssd-2",
    name: "WD Black SN850X 1TB",
    slot: "storage",
    price: 99999,
    image: "/images/sell-components.jpg",
    specs: ["7300 MB/s", "PCIe 4.0", "NVMe M.2"],
    condition: "nuevo",
  },
  {
    id: "ssd-3",
    name: "Kingston NV2 1TB (Usado)",
    slot: "storage",
    price: 49999,
    image: "/images/sell-components.jpg",
    specs: ["3500 MB/s", "NVMe", "4 meses de uso"],
    condition: "usado",
  },

  // PSU
  {
    id: "psu-1",
    name: "Corsair RM1000x 1000W",
    slot: "psu",
    price: 189999,
    image: "/images/sell-components.jpg",
    specs: ["80+ Gold", "Full Modular", "ATX 3.0"],
    wattage: 1000,
    condition: "nuevo",
  },
  {
    id: "psu-2",
    name: "Corsair RM850x 850W",
    slot: "psu",
    price: 149999,
    image: "/images/sell-components.jpg",
    specs: ["80+ Gold", "Full Modular", "Zero RPM"],
    wattage: 850,
    condition: "nuevo",
  },
  {
    id: "psu-3",
    name: "EVGA 750 G6 (Usado)",
    slot: "psu",
    price: 79999,
    image: "/images/sell-components.jpg",
    specs: ["750W", "80+ Gold", "1 anio de uso"],
    wattage: 750,
    condition: "usado",
  },

  // Cases
  {
    id: "case-1",
    name: "NZXT H7 Flow",
    slot: "case",
    price: 99999,
    image: "/images/sell-components.jpg",
    specs: ["ATX Mid Tower", "Vidrio templado", "Airflow"],
    formFactor: "ATX",
    condition: "nuevo",
  },
  {
    id: "case-2",
    name: "Corsair 4000D Airflow",
    slot: "case",
    price: 89999,
    image: "/images/sell-components.jpg",
    specs: ["ATX Mid Tower", "Mesh frontal", "USB-C"],
    formFactor: "ATX",
    condition: "nuevo",
  },
  {
    id: "case-3",
    name: "Cooler Master NR200P",
    slot: "case",
    price: 79999,
    image: "/images/sell-components.jpg",
    specs: ["mATX/ITX", "Compacto", "Panel vidrio"],
    formFactor: "mATX",
    condition: "nuevo",
  },
]

export const slotLabels: Record<BuilderSlot, string> = {
  cpu: "Procesador",
  motherboard: "Motherboard",
  gpu: "Placa de Video",
  ram: "Memoria RAM",
  storage: "Almacenamiento",
  psu: "Fuente",
  case: "Gabinete",
}

export const slotOrder: BuilderSlot[] = [
  "cpu",
  "motherboard",
  "gpu",
  "ram",
  "storage",
  "psu",
  "case",
]

export type BuildSelection = Partial<Record<BuilderSlot, BuilderComponent>>

/**
 * Returns components compatible with the current build selection.
 */
export function getCompatibleComponents(
  slot: BuilderSlot,
  selection: BuildSelection
): BuilderComponent[] {
  const all = builderComponents.filter((c) => c.slot === slot)

  return all.filter((component) => {
    // CPU + Motherboard socket compatibility
    if (slot === "cpu" && selection.motherboard) {
      if (component.socket !== selection.motherboard.socket) return false
    }
    if (slot === "motherboard" && selection.cpu) {
      if (component.socket !== selection.cpu.socket) return false
    }

    // Motherboard + RAM type compatibility
    if (slot === "ram" && selection.motherboard) {
      if (component.ramType !== selection.motherboard.ramType) return false
    }
    if (slot === "motherboard" && selection.ram) {
      if (component.ramType !== selection.ram.ramType) return false
    }

    // Case + Motherboard form factor compatibility
    if (slot === "case" && selection.motherboard) {
      const mbFF = selection.motherboard.formFactor
      const caseFF = component.formFactor
      // ATX case fits all, mATX fits mATX+ITX, ITX fits only ITX
      if (caseFF === "ITX" && mbFF !== "ITX") return false
      if (caseFF === "mATX" && mbFF === "ATX") return false
    }
    if (slot === "motherboard" && selection.case) {
      const caseFF = selection.case.formFactor
      if (caseFF === "ITX" && component.formFactor !== "ITX") return false
      if (caseFF === "mATX" && component.formFactor === "ATX") return false
    }

    // PSU wattage: should cover estimated total (CPU + GPU)
    if (slot === "psu") {
      const cpuWatts = selection.cpu?.wattage ?? 0
      const gpuWatts = selection.gpu?.wattage ?? 0
      const totalEstimated = cpuWatts + gpuWatts + 150 // +150 for rest
      if (component.wattage && component.wattage < totalEstimated) return false
    }

    return true
  })
}

export function estimateWattage(selection: BuildSelection): number {
  const cpuW = selection.cpu?.wattage ?? 0
  const gpuW = selection.gpu?.wattage ?? 0
  return cpuW + gpuW + 100 // base overhead
}

export function getTotalPrice(selection: BuildSelection): number {
  return Object.values(selection).reduce((sum, comp) => sum + (comp?.price ?? 0), 0)
}
