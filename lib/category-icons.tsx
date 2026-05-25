import React from 'react';
import {
  FolderOpen,
  UtensilsCrossed,
  Car,
  Film,
  ShoppingBag,
  Lightbulb,
  Wallet,
  BookOpen,
  Heart,
  Plane,
} from 'lucide-react';

export const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  folder: FolderOpen,
  utensils: UtensilsCrossed,
  car: Car,
  film: Film,
  shopping: ShoppingBag,
  lightbulb: Lightbulb,
  wallet: Wallet,
  book: BookOpen,
  heart: Heart,
  plane: Plane,
};

export const commonIcons = [
  { id: 'folder', label: 'Folder' },
  { id: 'utensils', label: 'Food' },
  { id: 'car', label: 'Car' },
  { id: 'film', label: 'Entertainment' },
  { id: 'shopping', label: 'Shopping' },
  { id: 'lightbulb', label: 'Utilities' },
  { id: 'wallet', label: 'Money' },
  { id: 'book', label: 'Education' },
  { id: 'heart', label: 'Health' },
  { id: 'plane', label: 'Travel' },
];

export function getCategoryIcon(iconId: string | null | undefined) {
  if (!iconId) return FolderOpen;
  
  // Check if it's a lucide icon ID (non-emoji)
  if (iconMap[iconId]) {
    return iconMap[iconId];
  }
  
  // For backward compatibility with emoji icons, return null to display the emoji
  return null;
}

export function renderCategoryIcon(
  iconId: string | null | undefined,
  className: string = 'size-4'
) {
  const Icon = getCategoryIcon(iconId);
  
  // If it's a lucide icon, render it as a component
  if (Icon) {
    return <Icon className={className} />;
  }
  
  // Otherwise render as emoji (for backward compatibility)
  return <span className="text-lg">{iconId}</span>;
}
