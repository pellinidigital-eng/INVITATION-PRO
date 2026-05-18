"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#fbfaf7] px-5 text-center text-[#15151b]">
      <section className="max-w-md rounded-[32px] border border-black/10 bg-white/80 p-8 shadow-soft-xl">
        <p className="text-sm uppercase tracking-[.24em] text-black/45">Studio recovery</p>
        <h1 className="mt-4 font-editorial text-5xl leading-none">Qualcosa si e inceppato</h1>
        <p className="mt-5 leading-7 text-black/60">Nessun dato viene inviato a servizi esterni. Puoi riprovare a caricare lo studio.</p>
        <button className="mt-7 inline-flex rounded-full bg-black px-5 py-3 text-sm font-semibold text-white" onClick={reset}>
          Riprova
        </button>
      </section>
    </main>
  );
}
