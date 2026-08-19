const cadFormatter = new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatCentsToCad(amountInCents: number) {
  return cadFormatter.format(amountInCents / 100);
}

export function parseCurrencyInput(value: string) {
  const sanitizedValue = value.replace(/[^\d.-]/g, '');

  if (!sanitizedValue || sanitizedValue === '-' || sanitizedValue === '.') {
    return null;
  }

  const numericValue = Number(sanitizedValue);

  if (Number.isNaN(numericValue)) {
    return null;
  }

  return Math.round(numericValue * 100);
}

export function formatCurrencyInput(amountInCents: number) {
  return (amountInCents / 100).toFixed(2);
}
