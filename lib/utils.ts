/**
 * General utility functions used across the application.
 * 
 * Functions:
 * - cn: Tailwind CSS class name merger using clsx and tailwind-merge
 * - formatDate: Formats date objects for display
 * - generateId: Generates unique identifiers (wraps nanoid)
 * - debounce: Creates debounced function (if needed)
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
