"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface FilterOption {
  label: string;
  value: string;
}

interface FiltersProps {
  locationOptions?: FilterOption[];
  typeOptions?: FilterOption[];
  statusOptions?: FilterOption[];
  budgetOptions?: FilterOption[];
  resultCount?: number;
}

export default function Filters({
  locationOptions = [
    { label: "All Locations", value: "" },
    { label: "Downtown", value: "downtown" },
    { label: "Suburbs", value: "suburbs" },
    { label: "Highway", value: "highway" }
  ],
  typeOptions = [
    { label: "All Types", value: "" },
    { label: "Residential", value: "residential" },
    { label: "Commercial", value: "commercial" },
    { label: "Land", value: "land" }
  ],
  statusOptions = [
    { label: "All Status", value: "" },
    { label: "Launching", value: "launching" },
    { label: "Ready", value: "ready" },
    { label: "Sold Out", value: "sold-out" }
  ],
  budgetOptions = [
    { label: "Any Budget", value: "" },
    { label: "Under ₹50L", value: "0-50" },
    { label: "₹50L - ₹1Cr", value: "50-100" },
    { label: "Above ₹1Cr", value: "100+" }
  ],
  resultCount = 0
}: FiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "",
    type: searchParams.get("type") || "",
    status: searchParams.get("status") || "",
    budget: searchParams.get("budget") || ""
  });

  const updateFilters = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Build query string
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    
    // Update URL without page reload
    const query = params.toString();
    router.push(query ? `?${query}` : window.location.pathname, { scroll: false });
  };

  const resetFilters = () => {
    setFilters({ location: "", type: "", status: "", budget: "" });
    router.push(window.location.pathname, { scroll: false });
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== "");

  return (
    <div className="bg-white border-b border-neutral-200 py-4 sticky top-16 sm:top-20 z-40">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Filter Pills */}
          <div className="flex-1 flex flex-wrap gap-2 sm:gap-3">
            {/* Location */}
            <select
              value={filters.location}
              onChange={(e) => updateFilters("location", e.target.value)}
              className="px-4 py-2 rounded-full border border-neutral-300 text-sm font-medium hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
            >
              {locationOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Type */}
            <select
              value={filters.type}
              onChange={(e) => updateFilters("type", e.target.value)}
              className="px-4 py-2 rounded-full border border-neutral-300 text-sm font-medium hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
            >
              {typeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Status */}
            <select
              value={filters.status}
              onChange={(e) => updateFilters("status", e.target.value)}
              className="px-4 py-2 rounded-full border border-neutral-300 text-sm font-medium hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Budget */}
            <select
              value={filters.budget}
              onChange={(e) => updateFilters("budget", e.target.value)}
              className="px-4 py-2 rounded-full border border-neutral-300 text-sm font-medium hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
            >
              {budgetOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Reset & Results */}
          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-sm font-medium text-neutral-600 hover:text-foreground transition-colors"
              >
                Reset
              </button>
            )}
            <div className="text-sm font-medium text-neutral-600 whitespace-nowrap">
              {resultCount} results
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
