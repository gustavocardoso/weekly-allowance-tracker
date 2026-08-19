import { clsx, type ClassValue } from 'clsx';

export function classNames(...inputs: ClassValue[]) {
  return clsx(inputs);
}
