export interface ProfileInput {
  name: string;
  allowanceInCents: number | null;
}

export interface SituationInput {
  title: string;
  amountInCents: number | null;
  type: 'reward' | 'penalty';
}

export interface EntryInput {
  description: string;
  amountInCents: number | null;
  date: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

export function validateProfile(input: ProfileInput) {
  const errors: ValidationErrors = {};

  if (!input.name.trim()) {
    errors.name = 'Please enter a profile name.';
  }

  if (input.allowanceInCents === null || input.allowanceInCents < 0) {
    errors.allowanceInCents = 'Allowance must be CAD 0.00 or more.';
  }

  return errors;
}

export function validateSituation(input: SituationInput) {
  const errors: ValidationErrors = {};

  if (!input.title.trim()) {
    errors.title = 'Please add a short title.';
  }

  if (input.amountInCents === null || input.amountInCents <= 0) {
    errors.amountInCents = `${input.type === 'reward' ? 'Reward' : 'Penalty'} amount must be greater than CAD 0.00.`;
  }

  return errors;
}

export function validateEntry(input: EntryInput) {
  const errors: ValidationErrors = {};

  if (!input.description.trim()) {
    errors.description = 'Please describe this entry.';
  }

  if (input.amountInCents === null) {
    errors.amountInCents = 'Please enter an amount.';
  }

  if (!input.date) {
    errors.date = 'Please choose a date.';
  }

  return errors;
}
