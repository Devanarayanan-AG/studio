import { Compass } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center">
        <Compass className="h-8 w-8" />
        <h1 className="ml-4 text-3xl font-bold font-headline">
          Campus Navigator
        </h1>
      </div>
    </header>
  );
}
