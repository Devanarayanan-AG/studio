import Header from '@/components/Header';
import LocationSearch from '@/components/LocationSearch';
import { locations } from '@/lib/data';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:px-6 lg:py-12">
        <LocationSearch locations={locations} />
      </main>
    </div>
  );
}
