import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Location } from '@/lib/data';
import { Building2, Layers, User, Bookmark, FlaskConical } from 'lucide-react';
import { cn } from "@/lib/utils";

interface LocationCardProps {
  location: Location;
  index: number;
}

export function LocationCard({ location, index }: LocationCardProps) {
  const isClass = location.type === 'class';

  return (
    <Card
        className="w-full overflow-hidden transition-all duration-300 ease-out hover:shadow-xl hover:border-primary/50 animate-in fade-in-0 slide-in-from-bottom-5"
        style={{ animationDelay: `${index * 75}ms`, animationFillMode: 'backwards' }}
    >
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <CardTitle className="text-xl font-headline">{location.name}</CardTitle>
            <Badge variant={isClass ? "default" : "secondary"} className={cn("whitespace-nowrap w-fit", isClass ? 'bg-primary/80' : '')}>
              {isClass ? <Bookmark className="mr-2 h-4 w-4" /> : <FlaskConical className="mr-2 h-4 w-4" />}
              {location.type.charAt(0).toUpperCase() + location.type.slice(1)}
            </Badge>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6 text-sm">
        <div className="flex items-center gap-3">
            <Building2 className="h-6 w-6 text-accent" />
            <div>
                <p className="text-muted-foreground">Block</p>
                <p className="font-semibold text-base">{location.block}</p>
            </div>
        </div>
        <div className="flex items-center gap-3">
            <Layers className="h-6 w-6 text-accent" />
            <div>
                <p className="text-muted-foreground">Floor</p>
                <p className="font-semibold text-base">{location.floor}</p>
            </div>
        </div>
        <div className="flex items-center gap-3">
            <User className="h-6 w-6 text-accent" />
            <div>
                <p className="text-muted-foreground">Faculty</p>
                <p className="font-semibold text-base">{location.faculty}</p>
            </div>
        </div>
      </CardContent>
    </Card>
  )
}
