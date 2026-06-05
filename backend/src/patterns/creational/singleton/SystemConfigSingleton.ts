export class SystemConfigSingleton {
  private static instance: SystemConfigSingleton;

  private constructor() {}

  static getInstance(): SystemConfigSingleton {
    if (!SystemConfigSingleton.instance) {
      SystemConfigSingleton.instance = new SystemConfigSingleton();
    }

    return SystemConfigSingleton.instance;
  }

  getSignatureLimit(): number {
    const parsedLimit = Number(process.env.SIGNATURE_LIMIT ?? 3);
    return Number.isFinite(parsedLimit) && parsedLimit > 0 ? parsedLimit : 3;
  }

  getCongressAccessToken(): string {
    return process.env.CONGRESS_ACCESS_TOKEN ?? 'demo-congreso';
  }

  getAvailableCommissions(): string[] {
    return [
      'Comisión de Constitución y Reglamento',
      'Comisión de Justicia y Derechos Humanos',
      'Comisión de Educación, Juventud y Deporte',
      'Comisión de Salud y Población',
      'Comisión de Economía, Banca, Finanzas e Inteligencia Financiera',
      'Comisión de Trabajo y Seguridad Social',
      'Comisión de Transportes y Comunicaciones',
      'Comisión de Ambiente y Ecología'
    ];
  }
}
