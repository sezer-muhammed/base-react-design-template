import type { RecursiveMenuItem } from "@/components/ui/recursive-menu";

export const navItems = [
  "Ana Sayfa",
  "Eğitimler",
  "Blog",
  "Program Detayı",
  "Danışmanlık",
];

export const leadershipSignals = [
  {
    id: "01",
    title: "Stratejik Vizyon",
    text: "Veriye anlam katma ve uzun vadeli yön belirleme",
    tone: "blue",
  },
  {
    id: "02",
    title: "Muhakeme Yetisi",
    text: "Rasyonelin ötesindeki kararı sezgiyle tamamlama",
    tone: "purple",
  },
  {
    id: "03",
    title: "Kolektif Empati",
    text: "Güven ve kültür inşasının temeli",
    tone: "teal",
  },
  {
    id: "04",
    title: "Değerli Cesaret",
    text: "Anlamlı riski sıradandan ayırt etme",
    tone: "amber",
  },
] as const;

export const programTraits = [
  "C-Suite Odaklı",
  "Teknik + İnsani",
  "Dönüşüm Odaklı",
  "Sektör Bağımsız",
  "Radikal Empati",
  "Bilişsel Esneklik",
  "Stratejik Sezgi",
  "Kolektif Zeka",
];

export const journeySteps = [
  {
    id: "01",
    kicker: "Kod Değişimi",
    title: "Dünya yeni bir işletim sistemine geçiyor.",
    text: "Silikon vadilerinden çıkan satırlar; yönetim kurullarını, strateji odalarını ve yaratıcı zihinlerin çalışma alanlarını yeniden şekillendiriyor.",
  },
  {
    id: "02",
    kicker: "Kusursuz Vasatlık",
    title: "Yalnızca AI çıktısına yaslanmak herkesi birbirine benzetir.",
    text: "Yapay zeka mevcut veriden en olası yolu çıkarır. Liderin farkı, güvenli yolun ötesindeki anlamı ve yönü görebilmesidir.",
  },
  {
    id: "03",
    kicker: "Simyacı Lider",
    title: "Analitik gücü AI'dan, sezgiyi insandan alan lider öne çıkar.",
    text: "Gelecek, empatiyi, muhakemeyi ve kolektif zekayı yönetenlerin olacak.",
  },
  {
    id: "04",
    kicker: "Uygulamaya Dönüşüm",
    title: "Felsefe, kurumun çalışma biçimine işlendiğinde değer üretir.",
    text: "Leadership Uncoded; eğitimi, danışmanlığı ve operasyonel mimariyi aynı dönüşüm hattında birleştirir.",
  },
];

export const serviceCards = [
  {
    id: "01",
    title: "Kurumsal ve Lider Odaklı Eğitimler",
    text: "Özel tasarlanmış müfredatlarla AI yetkinliklerini liderlik kaslarınıza entegre ediyoruz.",
  },
  {
    id: "02",
    title: "Stratejik AI Danışmanlığı",
    text: "Darboğazları tespit ediyor, süreçleri AI projeleriyle optimize ediyoruz.",
  },
  {
    id: "03",
    title: "Liderlik Koçluğu",
    text: "Kendi tarzınıza özgü liderlik dilini ve AI stratejinizi birlikte inşa ediyoruz.",
  },
];

export const consultingAreas = [
  "Kurumsal bilgi asistanları ve RAG sistemleri",
  "LLM / GenAI çözüm mimarileri",
  "Multi-agent iş akışları",
  "Multimodal doküman zekası",
  "Kurumsal dil ve içerik üretimi",
  "AI proje yol haritası ve MVP planlama",
  "Lokal / on-premise AI danışmanlığı",
  "AI yönetişimi ve risk çerçevesi",
  "Ekip benimsemesi ve değişim yönetimi",
  "Satış enablement notları ve teklif otomasyonu",
  "Yönetim kurulu karar destek ekranları",
  "İç eğitim ölçümleme ve beceri haritaları",
];

export type ProgramRow = {
  id: string;
  cohort: string;
  lead: string;
  module: string;
  readiness: number;
  risk: "Düşük" | "Orta" | "Yüksek";
  status: "Aktif" | "Taslak" | "Tamam";
};

export const programRows: ProgramRow[] = [
  {
    id: "lu-001",
    module: "Algoritmalar Çağında Liderlik",
    cohort: "C-Suite / Retail",
    lead: "Isil Hasdemir",
    readiness: 92,
    risk: "Düşük",
    status: "Aktif",
  },
  {
    id: "lu-002",
    module: "Kusursuz Vasatlık Atölyesi",
    cohort: "Strategy / Finance",
    lead: "M. Kaya",
    readiness: 74,
    risk: "Orta",
    status: "Aktif",
  },
  {
    id: "lu-003",
    module: "AI Yönetişimi ve Risk",
    cohort: "Legal / Compliance",
    lead: "D. Arslan",
    readiness: 63,
    risk: "Yüksek",
    status: "Taslak",
  },
  {
    id: "lu-004",
    module: "RAG Kullanım Senaryoları",
    cohort: "Operations / HR",
    lead: "E. Tan",
    readiness: 88,
    risk: "Düşük",
    status: "Aktif",
  },
  {
    id: "lu-005",
    module: "Simyacı Lider Sprint",
    cohort: "Founders / Growth",
    lead: "A. Deniz",
    readiness: 81,
    risk: "Orta",
    status: "Tamam",
  },
  {
    id: "lu-006",
    module: "Karar Masası Ritüelleri",
    cohort: "Board / Executive",
    lead: "S. Bora",
    readiness: 57,
    risk: "Orta",
    status: "Taslak",
  },
  {
    id: "lu-007",
    module: "Prompt Değil, Prensip",
    cohort: "Marketing / Brand",
    lead: "N. Yılmaz",
    readiness: 69,
    risk: "Düşük",
    status: "Aktif",
  },
  {
    id: "lu-008",
    module: "On-premise AI Planlama",
    cohort: "IT / Security",
    lead: "B. Eren",
    readiness: 44,
    risk: "Yüksek",
    status: "Taslak",
  },
  {
    id: "lu-009",
    module: "Kolektif Zeka Lab",
    cohort: "Product / Design",
    lead: "C. Sönmez",
    readiness: 76,
    risk: "Orta",
    status: "Aktif",
  },
  {
    id: "lu-010",
    module: "İnsan Kalmanın Değeri",
    cohort: "People / Culture",
    lead: "L. Öz",
    readiness: 95,
    risk: "Düşük",
    status: "Tamam",
  },
  {
    id: "lu-011",
    module: "MVP Önceliklendirme",
    cohort: "AI PMO",
    lead: "T. Ece",
    readiness: 51,
    risk: "Yüksek",
    status: "Taslak",
  },
  {
    id: "lu-012",
    module: "Kurumsal Dil Motoru",
    cohort: "Sales / CX",
    lead: "P. Akın",
    readiness: 84,
    risk: "Orta",
    status: "Aktif",
  },
];

export const roadmapTree: RecursiveMenuItem[] = [
  {
    label: "Leadership Uncoded",
    meta: "root",
    status: "active",
    children: [
      {
        label: "Ana Program",
        meta: "4 bölüm",
        status: "ready",
        children: [
          { label: "Kod Değişimi", meta: "video + worksheet", status: "ready" },
          { label: "Kusursuz Vasatlık", meta: "case study", status: "active" },
          { label: "Simyacı Lider", meta: "live lab", status: "draft" },
          { label: "Uygulamaya Dönüşüm", meta: "roadmap", status: "draft" },
        ],
      },
      {
        label: "Danışmanlık Modülleri",
        meta: "12 alan",
        status: "active",
        children: [
          { label: "RAG sistemleri", meta: "discovery", status: "ready" },
          { label: "Multi-agent akışları", meta: "prototype", status: "active" },
          { label: "AI yönetişimi", meta: "policy", status: "draft" },
        ],
      },
      {
        label: "İçerik Motoru",
        meta: "blog + notlar",
        status: "draft",
        children: [
          { label: "Öne çıkan yazı", meta: "2026-04-15", status: "ready" },
          { label: "Haftalık liderlik sinyalleri", meta: "placeholder", status: "draft" },
          { label: "Sektör örnekleri", meta: "messy data", status: "draft" },
        ],
      },
    ],
  },
];
