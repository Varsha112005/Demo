export function PageHeader({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="mt-3 text-4xl font-semibold tracking-normal text-slate-950 md:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>
      ) : null}
    </div>
  )
}
