/** Soles: "S/ 25" for whole amounts, "S/ 6.50" otherwise. */
export function formatPrice(amount: number): string {
  const isWholeAmount = Number.isInteger(amount);
  return `S/ ${isWholeAmount ? amount.toString() : amount.toFixed(2)}`;
}

/** "10:00" → "10:00 a. m."; "19:30" → "7:30 p. m." */
export function formatHour(time: string): string {
  const [hourText, minuteText] = time.split(':');
  const hour = Number(hourText);
  const isMorning = hour < 12;
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${minuteText} ${isMorning ? 'a. m.' : 'p. m.'}`;
}
