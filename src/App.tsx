import { ReactNode, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const DARK = '#0C0C0C';
const ICE = '#D7E2EA';

const marqueeImages = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif'
];

const decorativeImages = {
  moon: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
  object: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
  lego: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
  group: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png'
};

const services = [
  {
    number: "01",
    name: "AI Agent Development",
    description:
      "Building intelligent AI agents that can understand tasks, process inputs, use tools, and generate useful outputs for real-world applications.",
  },
  {
    number: "02",
    name: "Machine Learning",
    description:
      "Creating machine learning models for prediction, classification, data analysis, and intelligent decision-making using Python and ML libraries.",
  },
  {
    number: "03",
    name: "Data Analysis",
    description:
      "Cleaning, analyzing, and visualizing data to find meaningful insights using Python, Pandas, NumPy, Matplotlib, Seaborn, SQL, and Power BI.",
  },
  {
    number: "04",
    name: "Python Backend Development",
    description:
      "Developing backend APIs and project logic using Python, FastAPI, Flask, databases, and integration with AI models.",
  },
  {
    number: "05",
    name: "Dashboard Development",
    description:
      "Designing simple and interactive dashboards to display project results, metrics, AI outputs, and data insights clearly.",
  },
];

const projects = [
  {
    number: '01',
    name: 'AI Software Engineer Agent',
    category: 'AI Project',
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    ],
  },
  {
    number: '02',
    name: 'Netflix Movies & TV Shows Analysis',
    category: 'Data Analysis',
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    ],
  },
  {
    number: '03',
    name: 'Syndrome Scan: Down Syndrome Detection',
    category: 'Machine Learning',
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    ],
  },
];

function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = ''
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ContactButton() {
  return (
    <a
      href="https://mail.google.com/mail/?view=cm&fs=1&to=nikhilgoud489@gmail.com"
      target="_blank"
      rel="noopener noreferrer"
      className="group contact-button-gradient inline-flex items-center gap-2 rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white outline outline-2 -outline-offset-[3px] outline-white transition-transform duration-200 hover:scale-[1.03] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
    >
      Contact Me
      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

function LiveProjectButton() {
  return (
    <button
      type="button"
      className="group inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-base"
    >
      Live Project
      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </button>
  );
}

function Magnet({
  children,
  padding = 150,
  strength = 3
}: {
  children: ReactNode;
  padding?: number;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const onMouseMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const insideX = event.clientX >= rect.left - padding && event.clientX <= rect.right + padding;
      const insideY = event.clientY >= rect.top - padding && event.clientY <= rect.bottom + padding;

      if (!insideX || !insideY) {
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
        return;
      }

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (event.clientX - centerX) / strength;
      const y = (event.clientY - centerY) / strength;

      setIsActive(true);
      setPosition({ x, y });
    };

    const onMouseLeave = () => {
      setIsActive(false);
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [padding, strength]);

  return (
    <motion.div
      ref={ref}
      className="will-change-transform"
      animate={{ x: position.x, y: position.y }}
      transition={isActive ? { duration: 0.3, ease: 'easeOut' } : { duration: 0.6, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedCharacter({
  char,
  index,
  total,
  progress
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = Math.min(1, start + 0.12);
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  const visibleChar = char === ' ' ? '\u00A0' : char;

  return (
    <span className="relative inline-block">
      <span className="opacity-0">{visibleChar}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {visibleChar}
      </motion.span>
    </span>
  );
}

function AnimatedText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2']
  });
  const chars = Array.from(text);

  return (
    <p
      ref={ref}
      className="max-w-[560px] text-center text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-[#D7E2EA]"
    >
      {chars.map((char, index) => (
        <AnimatedCharacter
          key={`${char}-${index}`}
          char={char}
          index={index}
          total={chars.length}
          progress={scrollYProgress}
        />
      ))}
    </p>
  );
}

function HeroSection() {
  const navLinks = ['About', 'Price', 'Projects', 'Contact'];

  return (
    <section className="relative flex h-screen flex-col overflow-x-clip bg-[#0C0C0C]">
      <FadeIn delay={0} y={-20}>
        <nav className="flex justify-between px-6 pt-6 text-sm font-medium uppercase tracking-wider text-[#D7E2EA] md:px-10 md:pt-8 md:text-lg lg:text-[1.4rem]">
          {navLinks.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="transition-opacity duration-200 hover:opacity-70">
              {item}
            </a>
          ))}
        </nav>
      </FadeIn>

      <FadeIn delay={0.15} y={40} className="overflow-hidden">
        <h1 className="hero-heading mt-6 w-full whitespace-nowrap text-[14vw] font-black uppercase leading-none tracking-tight sm:mt-4 sm:text-[15vw] md:-mt-5 md:text-[16vw] lg:text-[17.5vw]">
          Hi, I&apos;m Nikhil
        </h1>
      </FadeIn>

      <FadeIn delay={0.6} y={30} className="absolute left-1/2 top-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:top-auto sm:bottom-0 sm:w-[360px] sm:translate-y-0 md:w-[440px] lg:w-[520px]">
        <Magnet padding={150} strength={3}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
            alt="Jack 3D creator portrait"
            className="w-full select-none object-contain"
            draggable={false}
          />
        </Magnet>
      </FadeIn>

      <div className="relative z-20 mt-auto flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p className="max-w-[160px] text-[clamp(0.75rem,1.4vw,1.5rem)] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]">
            aspiring ai engineer and data science enthusiast building ai agents and intelligent applications
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}

function MarqueeRow({ images, direction }: { images: string[]; direction: 'right' | 'left' }) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const updateOffset = () => {
      const section = sectionRef.current;
      if (!section) return;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const calculated = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(calculated);
    };

    updateOffset();
    window.addEventListener('scroll', updateOffset, { passive: true });
    window.addEventListener('resize', updateOffset);

    return () => {
      window.removeEventListener('scroll', updateOffset);
      window.removeEventListener('resize', updateOffset);
    };
  }, []);

  const translateX = direction === 'right' ? offset - 200 : -(offset - 200);
  const repeatedImages = [...images, ...images, ...images];

  return (
    <div ref={sectionRef} className="overflow-visible">
      <motion.div
        className="flex gap-3 will-change-transform"
        animate={{ x: translateX }}
        transition={{ duration: 0.3, ease: 'linear' }}
      >
        {repeatedImages.map((src, index) => (
          <img
            key={`${src}-${index}`}
            src={src}
            alt="3D creator work preview"
            loading="lazy"
            className="h-[220px] w-[340px] min-w-[340px] rounded-2xl object-cover sm:h-[250px] sm:w-[390px] sm:min-w-[390px] md:h-[270px] md:w-[420px] md:min-w-[420px]"
          />
        ))}
      </motion.div>
    </div>
  );
}

function MarqueeSection() {
  return (
    <section className="flex flex-col gap-3 overflow-hidden bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40">
      <MarqueeRow images={marqueeImages.slice(0, 11)} direction="right" />
      <MarqueeRow images={marqueeImages.slice(11)} direction="left" />
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0C0C0C] px-5 py-20 sm:px-8 md:px-10">
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute left-[1%] top-[4%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]">
        <img src={decorativeImages.moon} alt="Moon 3D decoration" className="w-full" loading="lazy" />
      </FadeIn>

      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]">
        <img src={decorativeImages.object} alt="Abstract 3D decoration" className="w-full" loading="lazy" />
      </FadeIn>

      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute right-[1%] top-[4%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]">
        <img src={decorativeImages.lego} alt="Lego 3D decoration" className="w-full" loading="lazy" />
      </FadeIn>

      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]">
        <img src={decorativeImages.group} alt="3D group decoration" className="w-full" loading="lazy" />
      </FadeIn>

      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight">
            About me
          </h2>
        </FadeIn>

        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <AnimatedText text="I am an aspiring AI Engineer and Data Science enthusiast with knowledge of Python, Machine Learning, Data Analysis, FastAPI, and AI Agent development. I enjoy building intelligent applications, dashboards, and real-world AI projects that solve practical problems." />
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="price" className="rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
      <FadeIn y={40}>
        <h2 className="mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight text-[#0C0C0C] sm:mb-20 md:mb-28">
          Services
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-5xl">
        {services.map((service, index) => (
          <FadeIn key={service.number} delay={index * 0.1} y={35}>
            <article className="grid grid-cols-[0.7fr_1.3fr] gap-5 border-t border-[rgba(12,12,12,0.15)] py-8 last:border-b sm:gap-8 sm:py-10 md:grid-cols-[0.9fr_2fr] md:gap-12 md:py-12">
              <span className="text-[clamp(3rem,10vw,140px)] font-black leading-none text-[#0C0C0C]">
                {service.number}
              </span>
              <div className="flex flex-col justify-center gap-3">
                <h3 className="text-[clamp(1rem,2.2vw,2.1rem)] font-medium uppercase text-[#0C0C0C]">
                  {service.name}
                </h3>
                <p className="max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] font-light leading-relaxed text-[#0C0C0C] opacity-60">
                  {service.description}
                </p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  totalCards
}: {
  project: (typeof projects)[number];
  index: number;
  totalCards: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={ref} className="relative h-[85vh]">
      <motion.article
        className="sticky overflow-hidden rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
        style={{ scale, top: `calc(6rem + ${index * 28}px)` }}
      >
        <div className="mb-6 grid items-center gap-4 lg:grid-cols-[0.35fr_0.45fr_1fr_auto] lg:gap-6">
          <span className="text-[clamp(3rem,10vw,140px)] font-black leading-none text-[#D7E2EA]">
            {project.number}
          </span>
          <p className="text-sm font-medium uppercase tracking-widest text-[#D7E2EA]/70 sm:text-base">
            {project.category}
          </p>
          <h3 className="text-[clamp(1.7rem,5vw,5.5rem)] font-black uppercase leading-none tracking-tight text-[#D7E2EA]">
            {project.name}
          </h3>
          <LiveProjectButton />
        </div>

        <div className="grid gap-4 md:grid-cols-[40%_60%]">
          <div className="grid gap-4">
            <img
              src={project.images[0]}
              alt={`${project.name} preview 1`}
              loading="lazy"
              className="h-[clamp(130px,16vw,230px)] w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
            />
            <img
              src={project.images[1]}
              alt={`${project.name} preview 2`}
              loading="lazy"
              className="h-[clamp(160px,22vw,340px)] w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
            />
          </div>
          <img
            src={project.images[2]}
            alt={`${project.name} large preview`}
            loading="lazy"
            className="h-[340px] w-full rounded-[40px] object-cover sm:h-[430px] sm:rounded-[50px] md:h-full md:min-h-[520px] md:rounded-[60px]"
          />
        </div>
      </motion.article>
    </div>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-32">
      <FadeIn y={40}>
        <h2 className="hero-heading mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28">
          Project
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-7xl">
        {projects.map((project, index) => (
          <ProjectCard key={project.number} project={project} index={index} totalCards={projects.length} />
        ))}
      </div>
    </section>
  );
}

export default function App() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#0C0C0C] font-kanit">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <footer id="contact" className="bg-[#0C0C0C] px-5 pb-12 text-center text-sm font-light uppercase tracking-widest text-[#D7E2EA]/70 sm:px-8 md:px-10">
       Nikhil Goud -- AI Engineer © 2026
      </footer>
    </main>
  );
}
