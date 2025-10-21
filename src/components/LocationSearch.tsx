'use client';

import { useState, useMemo } from 'react';
import type { Location } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { LocationCard } from '@/components/LocationCard';
import { Search } from 'lucide-react';

interface LocationSearchProps {
  locations: Location[];
}

export default function LocationSearch({ locations }: LocationSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLocations = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      return [];
    }
    return locations.filter(
      (location) =>
        location.classNumber.toLowerCase().includes(query) ||
        location.id.toLowerCase().includes(query) ||
        location.faculty.toLowerCase().includes(query)
    );
  }, [searchQuery, locations]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for a class, lab, or faculty..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-card pl-12 text-base md:text-lg py-6 rounded-full shadow-md focus-visible:shadow-lg focus-visible:ring-offset-2 focus-visible:ring-ring transition-shadow"
          aria-label="Search for a location"
        />
      </div>

      <div className="space-y-4">
        {searchQuery && filteredLocations.length > 0 && (
          filteredLocations.map((location, index) => (
            <LocationCard key={location.id} location={location} index={index} />
          ))
        )}
        
        {searchQuery && filteredLocations.length === 0 && (
          <div className="text-center py-10 px-4 bg-card rounded-lg shadow-sm">
            <p className="text-lg text-foreground">No results found.</p>
            <p className="text-sm text-muted-foreground">Try using a different name, ID, or faculty.</p>
          </div>
        )}

        {!searchQuery && (
           <div className="text-center py-16">
              <h2 className="text-2xl font-bold font-headline text-foreground mb-2">Welcome to Campus Navigator</h2>
              <p className="text-lg text-muted-foreground">Start typing in the search bar above to find a location.</p>
           </div>
        )}
      </div>
    </div>
  );
}
