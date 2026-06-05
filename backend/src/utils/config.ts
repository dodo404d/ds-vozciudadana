export function getSignatureLimit(): number {
  const parsedLimit = Number(process.env.SIGNATURE_LIMIT ?? 3);
  return Number.isFinite(parsedLimit) && parsedLimit > 0 ? parsedLimit : 3;
}
