import { HttpError } from '../../../utils/httpError';

export interface SignatureInput {
  citizenName?: string;
  dni?: string;
  email?: string;
}

export interface ValidatedSignature {
  citizenName: string;
  dni: string;
  email: string;
}

export class SignatureValidatorAdapter {
  validate(data: SignatureInput): ValidatedSignature {
    if (!data.citizenName || !data.citizenName.trim()) {
      throw new HttpError(400, 'El nombre del ciudadano es obligatorio');
    }

    if (!data.dni || !/^\d{8}$/.test(data.dni.trim())) {
      throw new HttpError(400, 'El DNI debe tener 8 dígitos');
    }

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      throw new HttpError(400, 'El correo electrónico no es válido');
    }

    return {
      citizenName: data.citizenName.trim(),
      dni: data.dni.trim(),
      email: data.email.trim().toLowerCase()
    };
  }
}
