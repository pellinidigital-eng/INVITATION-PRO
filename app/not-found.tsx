import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#fbfaf7] px-5 text-center text-[#15151b]">
      <section className="max-w-md rounded-[32px] border border-black/10 bg-white/80 p-8 shadow-soft-xl">
        <p className="text-sm uppercase tracking-[.24em] text-black/45">Invitation Creator PRO</p>
        <h1 className="mt-4 font-editorial text-5xl leading-none">Pagina non trovata</h1>
        <p className="mt-5 leading-7 text-black/60">Il link potrebbe essere incompleto oppure non piu disponibile.</p>
        <Link className="mt-7 inline-flex rounded-full bg-black px-5 py-3 text-sm font-semibold text-white" href="/">
          Torna allo studio
        </Link>
      </section>
    </main>
  );
}
