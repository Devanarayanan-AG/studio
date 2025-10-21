
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import LocationSearch from '@/components/LocationSearch';
import { locations as initialLocations, Location } from '@/lib/data';

export default function Home() {
  const [locations, setLocations] = useState<Location[]>(initialLocations);

  const handleAddLocation = (newLocation: Location) => {
    // A more robust solution would check for duplicate IDs
    setLocations(prevLocations => [...prevLocations, newLocation]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:px-6 lg:py-12">
        <LocationSearch locations={locations} onAddLocation={handleAddLocation} />
      </main>
    </div>
  );
}
