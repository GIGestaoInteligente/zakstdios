import { Link } from "@tanstack/react-router";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { t } from "../../data/content";
import type { SiteLocale } from "../../hooks/use-locale";
import { Reveal } from "./Reveal";

type JournalPost = {
  image: string;
  title: { pt: string; en: string };
  excerpt: { pt: string; en: string };
  date: string;
  read: string;
};

export function HomeJournal({ locale, posts }: { locale: SiteLocale; posts: JournalPost[] }) {
  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: 2000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        stopOnFocusIn: false,
      }),
    [],
  );

  // Duplica os posts para o loop do Embla ter overflow mesmo com poucos itens
  const slides = useMemo(() => [...posts, ...posts], [posts]);

  return (
    <section className="bg-[#171717] pb-10 pt-20 text-[#f2eadf] md:pb-12 md:pt-24">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <h2 className="journal-label text-2xl">Journal</h2>
          <p className="journal-lede mt-2 text-sm text-white/70">
            {locale === "pt" ? "Notas sobre recuperação e ritmo." : "Notes on recovery and rhythm."}
          </p>
        </Reveal>
      </div>

      {/* Full-bleed: canto a canto da viewport */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
          skipSnaps: false,
          duration: 25,
        }}
        plugins={[autoplay]}
        className="journal-carousel mt-10 w-full"
      >
        <CarouselContent className="ml-0">
          {slides.map((post, index) => (
            <CarouselItem
              key={`${post.title.en}-${index}`}
              className="basis-[78%] pl-0 pr-3 sm:basis-[48%] sm:pr-4 md:basis-[38%] md:pr-5 lg:basis-[30%] xl:basis-[24%]"
            >
              <article className="group h-full">
                <div className="journal-image aspect-[4/5] overflow-hidden">
                  <img
                    src={post.image}
                    alt={t(post.title, locale)}
                    loading="lazy"
                    className="h-full w-full scale-[1.03] object-cover brightness-75 saturate-75 transition duration-700 ease-out group-hover:scale-110 group-hover:brightness-100 group-hover:saturate-100"
                  />
                </div>
                <p className="journal-meta mt-3 text-[10px] text-white/55">
                  {post.date} · {post.read}
                </p>
                <h3 className="journal-title mt-1 text-xl leading-[0.95]">
                  {t(post.title, locale)}
                </h3>
                <p className="journal-excerpt mt-3 text-xs leading-snug text-white/65">
                  {t(post.excerpt, locale)}
                </p>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Link
          to="/blog"
          className="journal-cta mt-10 inline-flex items-center gap-2 rounded-full border border-[#d8bd94] px-6 py-2 text-xs text-[#d8bd94] transition hover:bg-[#d8bd94] hover:text-black"
        >
          {locale === "pt" ? "Ver todos" : "View all"} <ArrowRight size={13} />
        </Link>
      </div>
    </section>
  );
}
