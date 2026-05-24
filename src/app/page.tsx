import { Menu } from "lucide-react";
import Image from "next/image";
import { ActionShowcase } from "@/components/showroom/action-showcase";
import {
  ProgramOperationTable,
} from "@/components/showroom/interactive-tables";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RecursiveMenu } from "@/components/ui/recursive-menu";
import { SectionHeader, Surface } from "@/components/ui/surface";
import { cn } from "@/lib/cn";
import {
  menuShowcase,
  showroomNav,
  tokenRows,
  cardSamples,
  vehicleDemo,
} from "@/data/showroom";
import { consultingAreas } from "@/data/leadership";

export default function Home() {
  return (
    <main className="min-h-screen text-[var(--ds-gray-1000)]">
      <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-4 px-3 py-3">
        <TopBar />
        <ComponentQuickNav />

          <div className="min-w-0 space-y-8">
            <IntroPanel />

            <ShowcaseSection
              componentId="S-01"
              id="foundation"
              kicker="01 / Foundation"
              title="Geist token rafı"
              summary="Beyaz/siyah ana eksen, düşük kontrast borderlar ve gerektiğinde renkli durum tonları."
            >
              <FoundationTokenTable />
            </ShowcaseSection>

            <ShowcaseSection
              componentId="S-02"
              id="actions"
              kicker="02 / Actions"
              title="Button, badge, toolbar"
              summary="Küçük yüzeylerde hızlı taranabilirlik: ikon, kısa etiket, durum rengi."
            >
              <ActionShowcase />
            </ShowcaseSection>

            <ShowcaseSection
              componentId="S-04"
              id="cards"
              kicker="04 / Cards"
              title="Kart sistemi"
              summary="Aynı kart iskeleti; ton, yoğunluk ve derinlik ayrı ayrı kontrol ediliyor."
            >
              <div className="space-y-3">
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                  {cardSamples.map((card) => (
                    <Card depth="lifted" key={card.title} tone="default">
                      <CardHeader>
                        <p className="flex items-center gap-2 font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
                          <StatusDot color={card.dot} />
                          {card.eyebrow}
                        </p>
                        <CardTitle className="mt-3">{card.title}</CardTitle>
                      </CardHeader>
                      <CardDescription>{card.body}</CardDescription>
                    </Card>
                  ))}
                </div>

                <div className="grid gap-3 xl:grid-cols-[0.95fr_1.05fr]">
                  <VehicleSpecCard />
                  <VehicleVisualCard />
                </div>

                <div className="grid gap-3">
                  <VehicleWideVisualCard />
                  <VehicleWideDataCard />
                </div>
              </div>
            </ShowcaseSection>

            <ShowcaseSection
              componentId="S-05"
              id="media"
              kicker="05 / Media"
              title="Görsel çerçeve testleri"
              summary="Aynı görseli iki farklı frame diliyle deniyoruz: biri ürün kartı gibi, diğeri daha editorial."
            >
              <div className="grid gap-3 xl:grid-cols-[0.95fr_1.05fr]">
                <ImageFrame
                  caption="Inset frame / controlled crop / caption strip"
                  componentId="MEDIA-01"
                  mode="contained"
                  title="Border içinde sakin görsel"
                />
                <ImageFrame
                  caption="Full visual surface / soft overlay / metadata flags"
                  componentId="MEDIA-02"
                  mode="editorial"
                  title="Daha geniş nefes alan görsel alan"
                />
              </div>
            </ShowcaseSection>

            <ShowcaseSection
              componentId="S-06"
              id="tables"
              kicker="06 / Tables"
              title="Tablo vitrini"
              summary="Filter ve kolon başlığına basarak sıralama destekli compact tablo sistemi."
            >
              <div className="space-y-3">
                <Surface
                  className="overflow-hidden"
                  data-component-id="TABLE-02"
                  id="table-02-program-operation"
                  tone="flat"
                >
                  <SectionHeader
                    action={
                      <>
                        <ComponentIdBadge id="TABLE-02" />
                        <Badge tone="gray">demo data</Badge>
                      </>
                    }
                    eyebrow="Leadership Uncoded"
                    summary="Gerçek içerik yoğunluğu geldiğinde tablo nasıl davranıyor?"
                    title="Program operation table"
                  />
                  <ProgramOperationTable />
                </Surface>
              </div>
            </ShowcaseSection>

            <ShowcaseSection
              componentId="S-07"
              id="menus"
              kicker="07 / Menus"
              title="Recursive menu ve listeler"
              summary="Sidebar, content tree ve nested bilgi yapıları için aynı veri şekli."
            >
              <div className="grid gap-3 xl:grid-cols-[420px_1fr]">
                <Surface className="overflow-hidden" tone="flat">
                  <SectionHeader
                    eyebrow="Recursive"
                    summary="Sınırsız derinlikli ağaç menü örneği."
                    title="Navigation tree"
                  />
                  <RecursiveMenu items={menuShowcase} />
                </Surface>

                <Surface className="overflow-hidden" tone="flat">
                  <SectionHeader
                    action={<Badge tone="teal">{consultingAreas.length} items</Badge>}
                    eyebrow="Dense List"
                    summary="Uzun listelerde kart kalabalığı yerine ince border ritmi."
                    title="Danışmanlık alanları"
                  />
                  <div className="grid md:grid-cols-2">
                    {consultingAreas.slice(0, 10).map((area, index) => (
                      <div
                        className="flex min-h-14 items-center gap-3 border-b border-r border-[var(--ds-gray-alpha-300)] px-3 py-2 hover:bg-[var(--ds-gray-100)]"
                        key={area}
                      >
                        <span className="font-mono text-[11px] text-[var(--ds-gray-700)]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[13px] font-medium">{area}</span>
                      </div>
                    ))}
                  </div>
                </Surface>
              </div>
            </ShowcaseSection>

            <footer className="flex flex-col gap-2 border-t border-[var(--ds-gray-alpha-300)] py-6 text-[12px] text-[var(--ds-gray-700)] sm:flex-row sm:items-center sm:justify-between">
              <p>© 2025 Leadership Uncoded · Component showroom</p>
              <p className="font-mono">Geist tokens / Tailwind / CVA / Radix Slot</p>
            </footer>
          </div>
      </div>
    </main>
  );
}

function formatUsd(amount: number) {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(amount);
}

function ComponentIdBadge({ id }: { id: string }) {
  return (
    <span
      className="inline-flex h-6 items-center rounded-[5px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-200)] px-2 font-mono text-[11px] font-medium uppercase text-[var(--ds-gray-800)]"
      data-component-id={id}
    >
      {id}
    </span>
  );
}

function StatusDot({ className, color }: { className?: string; color: string }) {
  return (
    <span
      className={cn(
        "h-2.5 w-2.5 shrink-0 rounded-full border border-[var(--ds-gray-alpha-500)]",
        className,
      )}
      style={{ background: color }}
    />
  );
}

function GlassBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-7 items-center rounded-[7px] border border-white/35 bg-white/18 px-2.5 text-[12px] font-medium text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.88),inset_0_-1px_0_rgb(255_255_255_/_0.18),0_10px_24px_-18px_rgb(0_0_0_/_0.72)] backdrop-blur-md">
      {children}
    </span>
  );
}

function FoundationTokenTable() {
  return (
    <Surface
      className="overflow-hidden"
      data-component-id="FOUND-01"
      id="found-01-token-table"
      tone="flat"
    >
      <SectionHeader
        action={
          <>
            <ComponentIdBadge id="FOUND-01" />
            <Badge tone="gray">{tokenRows.length} families</Badge>
          </>
        }
        eyebrow="Color tokens"
        summary="Tablo dili alttaki data surface'lerle aynı: başlık, satır ritmi, hover ve swatch alanı."
        title="Foundation color table"
      />
      <div className="grid border-b border-[var(--ds-gray-alpha-400)] bg-[var(--ds-gray-100)] px-3 py-2 font-mono text-[11px] uppercase text-[var(--ds-gray-700)] md:grid-cols-[160px_minmax(0,1fr)_300px]">
        <span>Family</span>
        <span className="hidden md:block">Scale</span>
        <span className="hidden md:block pl-1">Use</span>
      </div>
      <div className="divide-y divide-[var(--ds-gray-alpha-300)]">
        {tokenRows.map((row) => (
          <div
            className="grid items-center gap-3 px-3 py-3 text-[13px] transition hover:bg-[var(--ds-gray-100)] md:grid-cols-[160px_minmax(0,1fr)_300px]"
            key={row.family}
          >
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full border border-[var(--ds-gray-alpha-400)]"
                style={{ background: row.swatches[row.swatches.length - 1][1] }}
              />
              <span className="font-medium">{row.family}</span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
              {row.swatches.map(([label, value]) => (
                <div
                  className="flex min-w-0 items-center gap-2 rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-100)] px-2 py-1.5 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.72)]"
                  key={`${row.family}-${label}`}
                >
                  <span
                    className="h-5 w-5 shrink-0 rounded-[5px] border border-[var(--ds-gray-alpha-400)]"
                    style={{ background: value }}
                  />
                  <span className="min-w-0">
                    <span className="block text-[12px] font-medium leading-4">
                      {label}
                    </span>
                    <code className="block truncate font-mono text-[10px] leading-4 text-[var(--ds-gray-700)]">
                      {value}
                    </code>
                  </span>
                </div>
              ))}
            </div>
            <p className="flex min-h-11 items-center pl-1 text-[13px] leading-5 text-[var(--ds-gray-900)]">
              {row.role}
            </p>
          </div>
        ))}
      </div>
    </Surface>
  );
}

function VehicleSpecCard() {
  const trims = vehicleDemo.availableTrims;

  return (
    <Card
      data-component-id="CARD-01"
      depth="lifted"
      id="card-01-vehicle-data"
      tone="default"
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <div>
          <CardHeader
            className="flex-col items-start"
            action={
              <div className="flex w-full flex-wrap justify-start gap-1.5">
                <ComponentIdBadge id="CARD-01" />
                <Badge tone="gray">{vehicleDemo.vehicle.market}</Badge>
                <Badge tone="blue">{vehicleDemo.vehicle.modelYear}</Badge>
                <Badge tone="amber">{vehicleDemo.vehicle.category}</Badge>
              </div>
            }
          >
            <p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
              Flag-heavy data card
            </p>
            <CardTitle className="mt-3 text-[22px] leading-7">
              {vehicleDemo.vehicle.make} {vehicleDemo.vehicle.model}
            </CardTitle>
            <CardDescription>
              Araç, fiyat, güç aktarma ve teknoloji gibi yoğun veri setleri için kartta
              bayrak alanı, mini tablo ve not bölgesi.
            </CardDescription>
          </CardHeader>

          <div className="grid gap-2 sm:grid-cols-3">
            <SpecPill label="HP" value={String(vehicleDemo.powertrain.horsepower)} />
            <SpecPill label="Torque" value={`${vehicleDemo.powertrain.torqueLbFt} lb-ft`} />
            <SpecPill label="Display" value="12.9 in" />
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {[
              ["Engine", vehicleDemo.powertrain.engine],
              ["Transmission", vehicleDemo.powertrain.transmission],
              ["Chassis", vehicleDemo.chassis.adaptiveChassisControl],
              ["Safety", "IQ.DRIVE standard"],
            ].map(([label, value]) => (
              <div
                className="rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)] p-3"
                key={label}
              >
                <p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
                  {label}
                </p>
                <p className="mt-1 text-[13px] font-medium leading-5">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)]">
          <div className="border-b border-[var(--ds-gray-alpha-300)] px-3 py-2">
            <p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
              Starting MSRP
            </p>
            <p className="mt-1 text-[20px] font-semibold">
              {formatUsd(vehicleDemo.pricing.amount)}
            </p>
          </div>
          <div className="divide-y divide-[var(--ds-gray-alpha-300)]">
            {trims.map((trim) => (
              <div className="flex h-9 items-center justify-between px-3" key={trim.name}>
                <span className="text-[13px] font-medium">{trim.name}</span>
                <span className="font-mono text-[12px] text-[var(--ds-gray-900)]">
                  {formatUsd(trim.startingMsrp)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CardFooter>
        <div className="flex flex-wrap items-center gap-2">
          {vehicleDemo.technology.map((item) => (
            <Badge key={item} tone="gray">
              {item}
            </Badge>
          ))}
        </div>
        <p className="mt-2 text-[12px] leading-5 text-[var(--ds-gray-700)]">
          {vehicleDemo.pricing.note}
        </p>
      </CardFooter>
    </Card>
  );
}

function VehicleVisualCard() {
  return (
    <Card
      className="min-h-[430px] self-start p-0"
      data-component-id="CARD-02"
      depth="lifted"
      id="card-02-vehicle-visual"
      tone="default"
    >
      <div className="relative min-h-[430px] overflow-hidden bg-[var(--ds-gray-1000)]">
        <Image
          alt="Vehicle visual card sample"
          className="object-cover"
          fill
          sizes="(min-width: 1280px) 700px, 100vw"
          src={vehicleDemo.media.image}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_34%_44%,transparent_36%,rgb(0_0_0_/_0.22)_68%,rgb(0_0_0_/_0.6)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/54 via-black/10 to-black/42" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <ComponentIdBadge id="CARD-02" />
          <GlassBadge>visual</GlassBadge>
          <GlassBadge>{vehicleDemo.vehicle.modelYear}</GlassBadge>
        </div>
        <div className="absolute inset-x-4 bottom-4 grid gap-3 lg:grid-cols-[1fr_260px] lg:items-end">
          <div className="text-white">
            <p className="font-mono text-[11px] uppercase text-white/68">
              {vehicleDemo.media.trim} / {vehicleDemo.media.color}
            </p>
            <h3 className="mt-2 max-w-sm text-[30px] font-semibold leading-9">
              Ferah ürün kartı alternatifi
            </h3>
            <p className="mt-2 max-w-md text-[13px] leading-5 text-white/74">
              Görsel artık kartın tamamına yayılıyor; içerik cam katmanlarla üstünde duruyor.
            </p>
          </div>
          <div className="rounded-[10px] border border-white/24 bg-white/16 p-3 text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.7),0_18px_34px_-24px_rgb(0_0_0_/_0.9)] backdrop-blur-md">
            <div className="grid grid-cols-3 gap-3">
              {[
                ["MSRP", formatUsd(vehicleDemo.pricing.amount)],
                ["HP", `${vehicleDemo.powertrain.horsepower}`],
                ["LB-FT", `${vehicleDemo.powertrain.torqueLbFt}`],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="font-mono text-[10px] uppercase text-white/58">{label}</p>
                  <p className="mt-1 text-[15px] font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function VehicleWideVisualCard() {
  return (
    <Card
      className="p-0"
      data-component-id="CARD-03"
      depth="base"
      id="card-03-vehicle-wide-visual"
      tone="default"
    >
      <div className="relative min-h-[280px] overflow-hidden bg-[var(--ds-gray-1000)]">
        <Image
          alt="Wide vehicle card sample"
          className="object-cover"
          fill
          sizes="(min-width: 1280px) 1320px, 100vw"
          src={vehicleDemo.media.image}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/42 via-black/8 to-white/64" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <ComponentIdBadge id="CARD-03" />
          <GlassBadge>wide visual</GlassBadge>
        </div>
        <div className="relative ml-auto grid min-h-[280px] max-w-[820px] content-between gap-8 border-l border-white/28 bg-white/72 p-5 shadow-[inset_1px_0_0_rgb(255_255_255_/_0.65)] backdrop-blur-md sm:p-6">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge tone="gray">Horizontal</Badge>
              <Badge tone="blue">{vehicleDemo.vehicle.modelYear}</Badge>
              <Badge tone="amber">{vehicleDemo.vehicle.category}</Badge>
            </div>
            <h3 className="mt-4 text-[26px] font-semibold leading-8">
              Uzun görselli araç kartı
            </h3>
            <p className="mt-2 max-w-2xl text-[14px] leading-6 text-[var(--ds-gray-900)]">
              Liste içinde daha premium görünmesi gereken kayıtlar için: solda güçlü görsel,
              sağda kısa açıklama, metrikler ve flag alanı.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-4">
            {[
              ["MSRP", formatUsd(vehicleDemo.pricing.amount)],
              ["HP", String(vehicleDemo.powertrain.horsepower)],
              ["Torque", `${vehicleDemo.powertrain.torqueLbFt}`],
              ["Drive", vehicleDemo.powertrain.transmission],
            ].map(([label, value]) => (
              <div
                className="rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)] p-3"
                key={label}
              >
                <p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
                  {label}
                </p>
                <p className="mt-1 truncate text-[15px] font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function VehicleWideDataCard() {
  return (
    <Card
      data-component-id="CARD-04"
      depth="base"
      id="card-04-vehicle-wide-data"
      tone="default"
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_420px]">
        <div>
          <div className="flex flex-wrap gap-2">
            <ComponentIdBadge id="CARD-04" />
            <Badge tone="gray">wide data</Badge>
            <Badge tone="green">standard safety</Badge>
          </div>
          <h3 className="mt-4 text-[24px] font-semibold leading-7">
            Uzun görselsiz karar kartı
          </h3>
          <p className="mt-2 max-w-2xl text-[14px] leading-6 text-[var(--ds-gray-900)]">
            Görsel gerekmediğinde yatay kart daha operasyonel duruyor. Başlık, karar metni,
            teknik değerler ve trim karşılaştırması tek satır ailesinde kalıyor.
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
          {vehicleDemo.availableTrims.map((trim) => (
            <div
              className="flex items-center justify-between rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)] px-3 py-2.5"
              key={trim.name}
            >
              <span className="text-[13px] font-semibold">{trim.name}</span>
              <span className="font-mono text-[12px] text-[var(--ds-gray-900)]">
                {formatUsd(trim.startingMsrp)}
              </span>
            </div>
          ))}
        </div>
      </div>
      <CardFooter>
        <div className="flex flex-wrap gap-2">
          <Badge tone="blue">12.9 in touchscreen</Badge>
          <Badge tone="teal">Wireless App-Connect</Badge>
          <Badge tone="purple">DCC available</Badge>
          <Badge tone="amber">price subject to change</Badge>
        </div>
      </CardFooter>
    </Card>
  );
}

function SpecPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-100)] p-3">
      <p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">{label}</p>
      <p className="mt-1 text-[15px] font-semibold">{value}</p>
    </div>
  );
}

function ImageFrame({
  caption,
  componentId,
  mode,
  title,
}: {
  caption: string;
  componentId: string;
  mode: "contained" | "editorial";
  title: string;
}) {
  const editorial = mode === "editorial";

  return (
    <Surface
      className={cn("overflow-hidden", editorial && "self-start")}
      data-component-id={componentId}
      id={componentId.toLowerCase()}
      tone={editorial ? "raised" : "flat"}
    >
      <div
        className={cn(
          "relative",
          editorial ? "h-[440px] bg-[var(--ds-gray-1000)]" : "p-3",
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden border border-[var(--ds-gray-alpha-400)]",
            editorial
              ? "h-full rounded-none border-0"
              : "aspect-[4/3] rounded-[7px] bg-[var(--ds-background-200)]",
          )}
        >
          <Image
            alt="Architectural sample scene used for visual frame testing"
            className={cn(
              "object-cover",
              editorial ? "opacity-90" : "rounded-[7px]",
            )}
            fill
            priority={false}
            sizes="(min-width: 1280px) 500px, 100vw"
            src={vehicleDemo.media.image}
          />
          {editorial ? (
            <>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_38%,rgb(0_0_0_/_0.18)_68%,rgb(0_0_0_/_0.56)_100%)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/58 via-transparent to-black/10" />
            </>
          ) : null}
        </div>
        {editorial ? (
          <>
            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              <ComponentIdBadge id={componentId} />
              <GlassBadge>2026-05-24</GlassBadge>
            </div>
            <div className="absolute right-4 top-4 flex flex-wrap justify-end gap-2">
              <GlassBadge>{vehicleDemo.vehicle.model}</GlassBadge>
              <GlassBadge>{vehicleDemo.media.color}</GlassBadge>
            </div>
            <div className="absolute inset-x-0 bottom-0 grid gap-3 p-4 text-white sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <div className="mb-3 flex flex-wrap gap-2">
                  <GlassBadge>full bleed</GlassBadge>
                  <GlassBadge>vignette</GlassBadge>
                </div>
                <h3 className="text-[22px] font-semibold leading-7">{title}</h3>
                <p className="mt-2 max-w-md text-[13px] leading-5 text-white/70">{caption}</p>
              </div>
              <div className="flex flex-wrap gap-2 sm:max-w-[260px] sm:justify-end">
                <GlassBadge>trim: {vehicleDemo.media.trim}</GlassBadge>
                <GlassBadge>market: {vehicleDemo.vehicle.market}</GlassBadge>
                <GlassBadge>hp: {vehicleDemo.powertrain.horsepower}</GlassBadge>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-between border-t border-[var(--ds-gray-alpha-300)] px-3 py-3">
            <div>
              <div className="mb-2">
                <ComponentIdBadge id={componentId} />
              </div>
              <h3 className="text-[15px] font-semibold leading-5">{title}</h3>
              <p className="mt-1 text-[12px] text-[var(--ds-gray-700)]">{caption}</p>
            </div>
            <Badge tone="gray">4:3</Badge>
          </div>
        )}
      </div>
    </Surface>
  );
}

function ComponentQuickNav() {
  return (
    <Surface className="overflow-hidden" tone="flat">
      <nav
        aria-label="Showroom sections"
        className="flex gap-1 overflow-x-auto p-2"
      >
        {showroomNav.map((item, index) => (
          <a
            className="inline-flex h-8 shrink-0 items-center gap-2 rounded-[6px] px-2.5 text-[12px] font-medium text-[var(--ds-gray-900)] hover:bg-[var(--ds-gray-100)] hover:text-[var(--ds-gray-1000)]"
            href={item.href}
            key={item.href}
          >
            <span className="font-mono text-[11px] text-[var(--ds-gray-700)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            {item.label}
          </a>
        ))}
      </nav>
    </Surface>
  );
}

function TopBar() {
  return (
    <header className="depth-surface sticky top-3 z-20 grid min-h-14 grid-cols-[1fr_auto] items-center gap-3 rounded-[8px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] px-3">
      <div className="flex min-w-0 items-center gap-3">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-[7px] border border-[var(--ds-gray-1000)] bg-[var(--ds-gray-1000)] font-mono text-[12px] font-semibold text-[var(--ds-background-100)]">
          LU
        </div>
        <div className="min-w-0">
          <p className="truncate text-[14px] font-semibold leading-5">
            Base Component Showroom
          </p>
          <p className="truncate font-mono text-[11px] text-[var(--ds-gray-700)]">
            Leadership Uncoded / Geist-inspired / compact UI
          </p>
        </div>
      </div>
      <div className="hidden items-center gap-2 md:flex">
        <Badge tone="gray">Next.js</Badge>
        <Badge tone="blue">Tailwind</Badge>
        <Badge tone="green">CVA</Badge>
      </div>
      <div className="flex items-center gap-2 md:hidden">
        <Button icon={Menu} size="sm" variant="secondary">
          Menü
        </Button>
      </div>
    </header>
  );
}

function IntroPanel() {
  return (
    <section className="grid gap-3 xl:grid-cols-[1fr_360px]">
      <div className="py-4">
        <p className="font-mono text-[12px] uppercase tracking-normal text-[var(--ds-gray-700)]">
          Component showroom
        </p>
        <h1 className="mt-2 max-w-3xl text-[38px] font-semibold leading-[1.05] sm:text-[48px]">
          Parça parça yorumlanabilir base UI.
        </h1>
        <p className="mt-4 max-w-2xl text-[14px] leading-6 text-[var(--ds-gray-900)]">
          Bu ekran final landing page değil; border, depth, kart, tablo, menü ve küçük
          layout kararlarını ayrı ayrı görüp hızlı feedback vermek için showroom.
        </p>
      </div>
      <Surface className="overflow-hidden" tone="flat">
        <div className="grid grid-cols-3 divide-x divide-[var(--ds-gray-alpha-300)]">
          {[
            ["Cards", "8"],
            ["Tables", "1"],
            ["Tokens", "Geist"],
          ].map(([label, value]) => (
            <div className="p-4" key={label}>
              <p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
                {label}
              </p>
              <p className="mt-2 text-[22px] font-semibold">{value}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-[var(--ds-gray-alpha-400)] p-3">
          <div className="flex flex-wrap gap-2">
            <Badge tone="gray">white/black</Badge>
            <Badge tone="blue">compact</Badge>
            <Badge tone="amber">depth test</Badge>
          </div>
        </div>
      </Surface>
    </section>
  );
}

function ShowcaseSection({
  children,
  className,
  componentId,
  id,
  kicker,
  summary,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  componentId: string;
  id: string;
  kicker: string;
  summary: string;
  title: string;
}) {
  return (
    <section
      className={cn("scroll-mt-24", className)}
      data-component-id={componentId}
      id={id}
    >
      <div className="mb-3 flex flex-col gap-2 border-t border-[var(--ds-gray-alpha-300)] pt-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-normal text-[var(--ds-gray-700)]">
            <ComponentIdBadge id={componentId} />
            <span>{kicker}</span>
          </p>
          <h2 className="mt-1 text-[24px] font-semibold leading-7">{title}</h2>
        </div>
        <p className="max-w-xl text-[13px] leading-5 text-[var(--ds-gray-900)]">
          {summary}
        </p>
      </div>
      {children}
    </section>
  );
}
