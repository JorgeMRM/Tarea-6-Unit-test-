interface Solicitud {
  score: number;
  moraActiva: boolean;
  ingresosVerificados: boolean;
  dti: number;
  antiguedadMeses: number;
  perfil: 'estudiante' | 'empleado' | 'independiente' | 'retirado';
  garante: boolean;
}

export function evaluarSolicitud(solicitud: Solicitud): string {
  // Rechazo inmediato
  if (solicitud.moraActiva || solicitud.score < 600) {
    return 'NO aprobado';
  }

  // Reglas base
  if (!solicitud.ingresosVerificados || solicitud.dti > 35) {
    if (solicitud.perfil !== 'estudiante' || !solicitud.garante) {
      return 'NO aprobado';
    }
  }

  // Umbrales por perfil
  switch (solicitud.perfil) {
    case 'estudiante':
      if (solicitud.garante && solicitud.score >= 650) {
        return 'Aprobado';
      }
      break;
    case 'empleado':
      if (solicitud.antiguedadMeses >= 6 && solicitud.score >= 650) {
        return 'Aprobado';
      }
      break;
    case 'independiente':
      if (solicitud.antiguedadMeses >= 12 && solicitud.score >= 670) {
        return 'Aprobado';
      }
      break;
    case 'retirado':
      if (solicitud.score >= 640) {
        return 'Aprobado';
      }
      break;
  }

  return 'NO aprobado';
}