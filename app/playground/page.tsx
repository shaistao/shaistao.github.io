import Link from 'next/link';

export const metadata = {
  title: 'Playground',
  robots: { index: false, follow: false },
};

const prototypes: { slug: string; title: string; note?: string }[] = [
  { slug: 'factor-programs-hero', title: 'Factor Programs Hero Video' },
];

export default function PlaygroundIndex() {
  return (
    <main className="min-h-screen bg-[#f8fbfe] px-6 md:px-12 lg:px-20 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold mb-2">Playground</h1>
        <p className="text-gray-600 mb-10">
          Private prototypes for screen recording. Not linked from the portfolio.
        </p>
        <ul className="flex flex-col gap-3">
          {prototypes.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/playground/${p.slug}`}
                className="block rounded-2xl border border-gray-200 bg-white px-5 py-4 hover:border-gray-400 transition-colors"
              >
                <div className="font-semibold text-gray-900">{p.title}</div>
                {p.note && <div className="text-sm text-gray-500 mt-1">{p.note}</div>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
