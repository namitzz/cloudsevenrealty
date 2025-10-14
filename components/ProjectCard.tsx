import Link from "next/link";
import Image from "next/image";

export interface ProjectCardProps {
  slug: string;
  title: string;
  subtitle: string;
  price: string;
  size: string;
  location: string;
  status: "Launching" | "Ready" | "Sold Out";
  imageUrl: string;
  highlights?: string[];
}

export default function ProjectCard({
  slug,
  title,
  subtitle,
  price,
  size,
  location,
  status,
  imageUrl,
  highlights = ["Road access", "All utilities", "Prime location"]
}: ProjectCardProps) {
  const statusColors = {
    "Launching": "bg-gradient-to-r from-amber-500 to-orange-500",
    "Ready": "bg-gradient-to-r from-green-500 to-emerald-500",
    "Sold Out": "bg-gradient-to-r from-neutral-500 to-neutral-600"
  };

  return (
    <div className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-luxury-lg transition-all duration-500 border border-luxury-gold/10 hover:border-luxury-gold/30 hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-[3/2] overflow-hidden bg-neutral-200">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Chips */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1.5 text-xs rounded-full bg-white/95 backdrop-blur-sm text-luxury-navy font-semibold shadow-md">
            📍 {location}
          </span>
          <span className={`px-3 py-1.5 text-xs rounded-full ${statusColors[status]} text-white font-semibold shadow-md`}>
            {status}
          </span>
        </div>

        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-luxury-gold/0 group-hover:bg-luxury-gold/10 transition-all duration-500" />
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-serif font-bold line-clamp-2 mb-2 text-luxury-navy group-hover:text-luxury-gold transition-colors">
          {title}
        </h3>
        <p className="text-sm text-neutral-600 line-clamp-2 mb-4">
          {subtitle}
        </p>

        {/* Price & Size */}
        <div className="flex items-center gap-3 text-sm mb-5">
          <span className="font-bold text-lg text-luxury-gold">From ₹{price}</span>
          <span className="text-neutral-400">•</span>
          <span className="text-neutral-600 font-medium">{size}</span>
        </div>

        {/* CTAs */}
        <div className="flex gap-3 mb-4">
          <Link
            href={`/projects/${slug}`}
            className="btn btn-primary flex-1 text-center text-sm"
          >
            Enquire Now
          </Link>
          <Link
            href={`/projects/${slug}`}
            className="btn btn-ghost flex-1 text-center text-sm"
          >
            Details
          </Link>
        </div>

        {/* Highlights - shown on hover */}
        <ul className="hidden group-hover:block text-sm text-neutral-600 space-y-2 pt-4 border-t border-luxury-gold/20">
          {highlights.map((highlight, index) => (
            <li key={index} className="flex items-center">
              <svg className="w-4 h-4 text-luxury-gold mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ProjectCardSkeleton() {
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
