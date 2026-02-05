export type Product = {
  id: number
  name: string
  category: string
  price: number
  originalPrice?: number
  condition: "nuevo" | "usado"
  image: string
  specs: string[]
  badge?: string
}

export const categories = [
  "Todos",
  "PCs Armadas",
  "Placas de Video",
  "Procesadores",
  "Motherboards",
  "Memorias RAM",
  "Almacenamiento",
  "Fuentes",
  "Gabinetes",
  "Monitores",
] as const

export const products: Product[] = [
  {
    id: 1,
    name: "PC Gaming RTX 4070 Ti",
    category: "PCs Armadas",
    price: 1299999,
    originalPrice: 1499999,
    condition: "nuevo",
    image: "/images/hero-gaming-pc.jpg",
    specs: ["Intel i7-13700K", "RTX 4070 Ti", "32GB DDR5", "1TB NVMe SSD"],
    badge: "Destacado",
  },
  {
    id: 2,
    name: "PC Gamer RTX 4060",
    category: "PCs Armadas",
    price: 849999,
    condition: "nuevo",
    image: "/images/hero-gaming-pc.jpg",
    specs: ["AMD Ryzen 5 7600X", "RTX 4060 8GB", "16GB DDR5", "512GB NVMe"],
  },
  {
    id: 3,
    name: "NVIDIA RTX 4080 Super",
    category: "Placas de Video",
    price: 899999,
    condition: "nuevo",
    image: "/images/sell-components.jpg",
    specs: ["16GB GDDR6X", "PCIe 4.0", "Ada Lovelace", "DLSS 3"],
    badge: "Nuevo",
  },
  {
    id: 4,
    name: "RTX 3070 Ti (Usado)",
    category: "Placas de Video",
    price: 349999,
    originalPrice: 549999,
    condition: "usado",
    image: "/images/sell-components.jpg",
    specs: ["8GB GDDR6X", "PCIe 4.0", "Ampere", "6 meses de uso"],
    badge: "Oferta",
  },
  {
    id: 5,
    name: "AMD Ryzen 7 7800X3D",
    category: "Procesadores",
    price: 389999,
    condition: "nuevo",
    image: "/images/sell-components.jpg",
    specs: ["8 Cores / 16 Threads", "5.0 GHz Boost", "96MB 3D V-Cache", "AM5"],
  },
  {
    id: 6,
    name: "Intel Core i5-13600K (Usado)",
    category: "Procesadores",
    price: 189999,
    originalPrice: 299999,
    condition: "usado",
    image: "/images/sell-components.jpg",
    specs: ["14 Cores", "5.1 GHz Boost", "LGA 1700", "3 meses de uso"],
  },
  {
    id: 7,
    name: "Corsair Vengeance DDR5 32GB",
    category: "Memorias RAM",
    price: 129999,
    condition: "nuevo",
    image: "/images/sell-components.jpg",
    specs: ["2x16GB", "5600MHz", "DDR5", "CL36"],
  },
  {
    id: 8,
    name: "ASUS ROG Strix B650-A",
    category: "Motherboards",
    price: 219999,
    condition: "nuevo",
    image: "/images/sell-components.jpg",
    specs: ["AM5", "DDR5", "WiFi 6E", "PCIe 5.0"],
  },
  {
    id: 9,
    name: "Samsung 990 Pro 2TB",
    category: "Almacenamiento",
    price: 179999,
    condition: "nuevo",
    image: "/images/sell-components.jpg",
    specs: ["NVMe M.2", "7450 MB/s", "PCIe 4.0", "V-NAND"],
  },
  {
    id: 10,
    name: "Corsair RM850x (Usado)",
    category: "Fuentes",
    price: 89999,
    originalPrice: 149999,
    condition: "usado",
    image: "/images/sell-components.jpg",
    specs: ["850W", "80+ Gold", "Modular", "1 anio de uso"],
    badge: "Oferta",
  },
  {
    id: 11,
    name: "NZXT H7 Flow",
    category: "Gabinetes",
    price: 99999,
    condition: "nuevo",
    image: "/images/sell-components.jpg",
    specs: ["ATX Mid Tower", "Panel vidrio templado", "Airflow", "USB-C"],
  },
  {
    id: 12,
    name: "Monitor LG 27GP850-B",
    category: "Monitores",
    price: 399999,
    condition: "nuevo",
    image: "/images/sell-components.jpg",
    specs: ['27" QHD', "165Hz", "1ms Nano IPS", "HDR 400"],
    badge: "Destacado",
  },
]
