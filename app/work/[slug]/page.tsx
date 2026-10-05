import Home from '@/app/page';
import { projects } from '@/lib/projects';

export function generateStaticParams() {
  return projects.filter((p) => !p.hidden).map((p) => ({ slug: p.slug }));
}

export default function WorkSlugPage() {
  return <Home />;
}
