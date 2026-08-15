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
      <div className="pl-[1.15rem] pr-[1.15rem] md:pl-8 md:pr-8">
        <Reveal>
          <h2 className="journal-label text-2xl">Journal</h2>
          <p className="journal-lede mt-2 text-sm text-white/70">
            {locale === "pt" ? "Notas sobre recuperação e ritmo." : "Notes on recovery and rhythm."}
          </p>
        </Reveal>
      </div>

      {/* 1ª ref: escala dos cards + imagens quadradas 1:1 */}
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
        <CarouselContent className="ml-0 pl-[1.15rem] md:pl-8">
          {slides.map((post, index) => (
            <CarouselItem
              key={`${post.title.en}-${index}`}
              className="basis-[78%] pl-0 pr-3 sm:basis-[48%] sm:pr-4 md:basis-[34%] md:pr-4 lg:basis-[26%] lg:pr-4 xl:basis-[23.5%]"
            >
              {/* Bloco = largura do quadrado · título é o elemento mais forte */}
              <article className="group flex w-full min-w-0 flex-col">
                <div className="journal-image aspect-square w-full overflow-hidden">
                  <img
                    src={post.image}
                    alt={t(post.title, locale)}
                    loading="lazy"
                    className="h-full w-full scale-[1.03] object-cover object-center brightness-75 saturate-75 transition duration-700 ease-out group-hover:scale-110 group-hover:brightness-100 group-hover:saturate-100"
                  />
                </div>
                <div className="w-full min-w-0 max-w-full">
                  <p className="journal-meta mt-3 text-[0.6875rem] leading-none text-white/50">
                    {post.date} · {post.read}
                  </p>
                  <h3 className="journal-title mt-2 w-full max-w-full text-[1.35rem] leading-[1.08] tracking-[-0.035em] text-white md:text-[1.45rem] lg:text-[1.5rem]">
                    {t(post.title, locale)}
                  </h3>
                  <p className="journal-excerpt mt-2.5 w-full max-w-full text-[0.8125rem] leading-snug text-white/55">
                    {t(post.excerpt, locale)}
                  </p>
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="pl-[1.15rem] pr-[1.15rem] md:pl-8 md:pr-8">
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
