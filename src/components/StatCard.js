const TONES = {
  lime: "bg-lime",
  sky: "bg-sky",
  flame: "bg-flame",
  ink: "bg-ink",
};

export default function StatCard({ value, label, tone, className = "" }) {
  return (
    <article
      data-tone={tone}
      className={`stat relative overflow-hidden rounded-[6px] border border-ink/10 bg-white/50 p-3.5 sm:p-4 md:p-5 ${className}`}
    >
      <span
        aria-hidden
        className={`stat-fill absolute inset-0 origin-bottom ${TONES[tone]}`}
        style={{ transform: "scaleY(0)" }}
      />
      <div className="stat-body relative">
        <p className="font-wide text-[clamp(1.75rem,3.4vw,3.25rem)] font-bold leading-none tracking-tight tabular-nums">
          <span className="stat-num">{value}</span>
          <span className="ml-0.5 text-[0.55em] align-top">%</span>
        </p>
        <p className="mt-2 max-w-[20ch] text-[13px] leading-snug md:mt-3 md:text-sm">{label}</p>
      </div>
    </article>
  );
}
