import Link from "next/link";
import Image from "next/image";

export interface PropertyCardProps {
  slug: string;
  title: string;
  subtitle: string;
  price: string;
  size: string;
  location: string;
  status: "Buy" | "Rent" | "Land";
  imageUrl: string;
  features?: string[];
}

export default function PropertyCard({
  slug,
  title,
  subtitle,
  price,
  size,
  location,
  status,
  imageUrl,
  features = ["Road access", "Water", "12 min to city"]
}: PropertyCardProps) {
  const statusColors = {
    "Buy": "bg-blue-500",
    "Rent": "bg-purple-500",
    "Land": "bg-green-500"
  };

  return (
    <div className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-[3/2] overflow-hidden bg-neutral-200">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
        
        {/* Chips */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2 py-1 text-xs rounded-full bg-white/90 text-foreground font-medium">
            {location}
          </span>
          <span className={`px-2 py-1 text-xs rounded-full ${statusColors[status]} text-white font-medium`}>
            {status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h3 className="text-lg sm:text-xl font-semibold line-clamp-2 mb-2">
          {title}
        </h3>
        <p className="text-sm text-neutral-600 line-clamp-2 mb-3">
          {subtitle}
        </p>

        {/* Price & Size */}
        <div className="flex items-center gap-3 text-sm mb-4">
          <span className="font-medium text-accent">₹{price}</span>
          <span className="text-neutral-400">•</span>
          <span className="text-neutral-600">{size}</span>
        </div>

        {/* CTAs */}
        <div className="flex gap-2 mb-3">
          <Link
            href={`/properties/${slug}`}
            className="btn btn-primary flex-1 text-center text-sm"
          >
            Enquire
          </Link>
          <Link
            href={`/properties/${slug}`}
            className="btn btn-ghost flex-1 text-center text-sm"
          >
            View Details
          </Link>
        </div>

        {/* Features - shown on hover */}
        <ul className="hidden group-hover:block text-sm text-neutral-600 space-y-1 pt-3 border-t border-neutral-200">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <span className="text-accent mr-2">•</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function PropertyCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-sm animate-pulse">
      <div className="aspect-[3/2] bg-neutral-200" />
      <div className="p-4 sm:p-5">
        <div className="h-6 bg-neutral-200 rounded mb-2" />
        <div className="h-4 bg-neutral-200 rounded mb-3 w-3/4" />
        <div className="h-4 bg-neutral-200 rounded mb-4 w-1/2" />
        <div className="flex gap-2">
          <div className="h-10 bg-neutral-200 rounded flex-1" />
          <div className="h-10 bg-neutral-200 rounded flex-1" />
        </div>
      </div>
    </div>
  );
}
