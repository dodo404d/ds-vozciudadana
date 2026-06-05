import crypto from 'crypto';

export function sha256(value: string): string {
  return crypto.createHash('sha256').update(value).digest('hex');
}

export function hashDni(dni: string): string {
  return sha256(dni.trim());
}

export function buildLegislativeFileHash(payload: unknown): string {
  return sha256(JSON.stringify(payload));
}
