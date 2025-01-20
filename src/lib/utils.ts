import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function capitalizeAllFirstLetter(text: string) {
  if (!text) return text; // Handle empty text
  return text
    .split(" ") // Split the string into an array of words
    .map((word) => {
      if (word.length > 0) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); // Capitalize the first letter and lowercase the rest
      }
      return word; // Return the word as is if it's empty
    })
    .join(" ");
}
