import test from 'node:test';
import assert from 'node:assert/strict';

import { calculateCycleTotals, createBackupFileName, formatCurrency, getWeekRange, importAppData, validateAppData } from '../../lib/storage';
import { validateProfile, validateSituation } from '../validation';

import { createAppData, createCycle, createEntry, createSituation } from './testUtils';

test('formatCurrency formats cents to CAD', () => {
  assert.equal(formatCurrency(1234), '$12.34');
});

test('getWeekRange uses Monday to Sunday boundaries', () => {
  const range = getWeekRange(new Date('2026-08-19T12:00:00.000Z'));
  assert.deepEqual(range, { startDate: '2026-08-17', endDate: '2026-08-23' });
});

test('validateProfile rejects negative allowance', () => {
  const errors = validateProfile({ name: 'Avery', allowanceInCents: -1 });
  assert.equal(errors.allowanceInCents, 'Allowance must be CAD 0.00 or more.');
});

test('validateSituation requires positive amount', () => {
  const errors = validateSituation({ title: 'Missed chore', amountInCents: 0, type: 'penalty' });
  assert.equal(errors.amountInCents, 'Penalty amount must be greater than CAD 0.00.');
});

test('calculateCycleTotals uses base plus rewards minus penalties', () => {
  const totals = calculateCycleTotals(
    createCycle({ baseAmountCents: 1000 }),
    [
      createEntry({ type: 'reward', amountCents: 200 }),
      createEntry({ id: 'entry-2', type: 'penalty', amountCents: 50, situationId: 'situation-2' }),
    ],
  );

  assert.deepEqual(totals, {
    baseAmountCents: 1000,
    rewardTotalCents: 200,
    penaltyTotalCents: 50,
    netAdjustmentCents: 150,
    finalTotalCents: 1150,
  });
});

test('validateAppData rejects multiple open cycles', () => {
  assert.throws(
    () =>
      validateAppData(
        createAppData({
          cycles: [createCycle({ id: 'cycle-1', status: 'open' }), createCycle({ id: 'cycle-2', status: 'open', startDate: '2026-08-24', endDate: '2026-08-30' })],
        }),
      ),
    /more than one open cycle/,
  );
});

test('importAppData rejects corrupt JSON', () => {
  assert.throws(() => importAppData('{invalid'), /not valid JSON/);
});

test('validateAppData preserves foreign key relationships', () => {
  const data = createAppData({
    situations: [createSituation({ id: 'reward-1' })],
    entries: [createEntry({ situationId: 'reward-1' })],
  });

  assert.deepEqual(validateAppData(data), data);
});

test('createBackupFileName uses date-stamped naming convention', () => {
  assert.equal(createBackupFileName(new Date('2026-08-19T12:00:00.000Z')), 'allowance-backup-2026-08-19.json');
});
