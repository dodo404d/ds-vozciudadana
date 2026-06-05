import { SystemConfigSingleton } from '../patterns/creational/singleton/SystemConfigSingleton';

export function getSignatureLimit(): number {
  return SystemConfigSingleton.getInstance().getSignatureLimit();
}

export function getAvailableCommissions(): string[] {
  return SystemConfigSingleton.getInstance().getAvailableCommissions();
}
