// Core formula (Section 8 of the DealCraft spec):
// Tarif per Jam = [ (Pengeluaran Bulanan + Target Profit) x (1 + Margin Buffer) ] / Jam Kerja Efektif Bulanan
//
// Jam Kerja Efektif Bulanan is derived from weekly hours x average weeks per month (4.3),
// with an optional "non-billable" haircut so the rate also covers admin/prospecting time.
// Optional tax is layered on top of the margin buffer since freelancers usually set aside
// tax from the same billed rate rather than paying it separately.

const WEEKS_PER_MONTH = 4.3
const STANDARD_PROJECT_HOURS = 20

export function calculateRates({
  monthlyExpense = 0,
  targetProfit = 0,
  hoursPerWeek = 0,
  marginBufferPct = 0,
  taxPct = 0,
  nonBillablePct = 0,
}) {
  const safeMonthlyExpense = Math.max(0, monthlyExpense)
  const safeTargetProfit = Math.max(0, targetProfit)
  const safeHoursPerWeek = Math.max(0, hoursPerWeek)
  const marginBuffer = Math.max(0, marginBufferPct) / 100
  const tax = Math.max(0, taxPct) / 100
  const nonBillable = Math.min(90, Math.max(0, nonBillablePct)) / 100

  const grossMonthlyHours = safeHoursPerWeek * WEEKS_PER_MONTH
  const effectiveMonthlyHours = grossMonthlyHours * (1 - nonBillable)

  const baseNeed = safeMonthlyExpense + safeTargetProfit
  const bufferedNeed = baseNeed * (1 + marginBuffer + tax)

  const hourlyRate =
    effectiveMonthlyHours > 0 ? bufferedNeed / effectiveMonthlyHours : 0

  const projectRateStandard = hourlyRate * STANDARD_PROJECT_HOURS

  return {
    hourlyRate,
    projectRateStandard,
    effectiveMonthlyHours,
    grossMonthlyHours,
    baseNeed,
    bufferedNeed,
    isValid: effectiveMonthlyHours > 0 && bufferedNeed >= 0,
  }
}

export { STANDARD_PROJECT_HOURS, WEEKS_PER_MONTH }
