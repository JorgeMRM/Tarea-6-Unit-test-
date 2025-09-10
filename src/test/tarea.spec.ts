import { evaluarSolicitud } from '../doman/tarea';

describe('evaluarSolicitud', () => {
  // Pruebas para condiciones de rechazo inmediato
  test('retorna "NO aprobado" cuando moraActiva es verdadera', () => {
    const solicitud = {
      score: 700,
      moraActiva: true,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 12,
      perfil: 'empleado' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('NO aprobado');
  });

  test('retorna "NO aprobado" si el score es inferior a 600', () => {
    const solicitud = {
      score: 599,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 12,
      perfil: 'empleado' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('NO aprobado');
  });

  // Pruebas para reglas base: ingresosVerificados y dti
  test('retorna "NO aprobado" si ingresosVerificados es falso y no es estudiante con garante', () => {
    const solicitud = {
      score: 700,
      moraActiva: false,
      ingresosVerificados: false,
      dti: 30,
      antiguedadMeses: 12,
      perfil: 'empleado' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('NO aprobado');
  });

  test('retorna "NO aprobado" si dti supera 35 y no es estudiante con garante', () => {
    const solicitud = {
      score: 700,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 36,
      antiguedadMeses: 12,
      perfil: 'independiente' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('NO aprobado');
  });

  test('retorna "Aprobado" para estudiante con garante aunque ingresosVerificados sea falso', () => {
    const solicitud = {
      score: 650,
      moraActiva: false,
      ingresosVerificados: false,
      dti: 30,
      antiguedadMeses: 0,
      perfil: 'estudiante' as const,
      garante: true,
    };
    expect(evaluarSolicitud(solicitud)).toBe('Aprobado');
  });

  test('retorna "Aprobado" para estudiante con garante aunque dti sea mayor a 35', () => {
    const solicitud = {
      score: 650,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 36,
      antiguedadMeses: 0,
      perfil: 'estudiante' as const,
      garante: true,
    };
    expect(evaluarSolicitud(solicitud)).toBe('Aprobado');
  });

  // Pruebas para condiciones específicas de perfil: estudiante
  test('retorna "Aprobado" para estudiante con garante y score de al menos 650', () => {
    const solicitud = {
      score: 650,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 0,
      perfil: 'estudiante' as const,
      garante: true,
    };
    expect(evaluarSolicitud(solicitud)).toBe('Aprobado');
  });

  test('retorna "NO aprobado" para estudiante con garante pero score menor a 650', () => {
    const solicitud = {
      score: 649,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 0,
      perfil: 'estudiante' as const,
      garante: true,
    };
    expect(evaluarSolicitud(solicitud)).toBe('NO aprobado');
  });

  test('retorna "NO aprobado" para estudiante sin garante', () => {
    const solicitud = {
      score: 650,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 0,
      perfil: 'estudiante' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('NO aprobado');
  });

  // Pruebas para condiciones específicas de perfil: empleado
  test('retorna "Aprobado" para empleado con al menos 6 meses de antigüedad y score de 650 o más', () => {
    const solicitud = {
      score: 650,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 6,
      perfil: 'empleado' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('Aprobado');
  });

  test('retorna "NO aprobado" para empleado con menos de 6 meses de antigüedad', () => {
    const solicitud = {
      score: 650,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 5,
      perfil: 'empleado' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('NO aprobado');
  });

  test('retorna "NO aprobado" para empleado con score menor a 650', () => {
    const solicitud = {
      score: 649,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 6,
      perfil: 'empleado' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('NO aprobado');
  });

  // Pruebas para condiciones específicas de perfil: independiente
  test('retorna "Aprobado" para independiente con al menos 12 meses de antigüedad y score de 670 o más', () => {
    const solicitud = {
      score: 670,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 12,
      perfil: 'independiente' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('Aprobado');
  });

  test('retorna "NO aprobado" para independiente con menos de 12 meses de antigüedad', () => {
    const solicitud = {
      score: 670,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 11,
      perfil: 'independiente' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('NO aprobado');
  });

  test('retorna "NO aprobado" para independiente con score menor a 670', () => {
    const solicitud = {
      score: 669,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 12,
      perfil: 'independiente' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('NO aprobado');
  });

  // Pruebas para condiciones específicas de perfil: retirado
  test('retorna "Aprobado" para retirado con score de 640 o más', () => {
    const solicitud = {
      score: 640,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 0,
      perfil: 'retirado' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('Aprobado');
  });

  test('retorna "NO aprobado" para retirado con score menor a 640', () => {
    const solicitud = {
      score: 639,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 0,
      perfil: 'retirado' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('NO aprobado');
  });

  // Pruebas para casos de borde
  test('retorna "NO aprobado" en el límite exacto de score de 600', () => {
    const solicitud = {
      score: 600,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 12,
      perfil: 'independiente' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('NO aprobado');
  });

  test('retorna "Aprobado" para empleado en el límite exacto de 6 meses de antigüedad', () => {
    const solicitud = {
      score: 650,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 6,
      perfil: 'empleado' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('Aprobado');
  });

  test('retorna "Aprobado" para independiente en el límite exacto de 12 meses de antigüedad', () => {
    const solicitud = {
      score: 670,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 12,
      perfil: 'independiente' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('Aprobado');
  });

  test('retorna "Aprobado" para estudiante en el límite exacto de score de 650', () => {
    const solicitud = {
      score: 650,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 0,
      perfil: 'estudiante' as const,
      garante: true,
    };
    expect(evaluarSolicitud(solicitud)).toBe('Aprobado');
  });

  test('retorna "Aprobado" para retirado en el límite exacto de score de 640', () => {
    const solicitud = {
      score: 640,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 0,
      perfil: 'retirado' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('Aprobado');
  });

  test('retorna "Aprobado" para independiente en el límite exacto de score de 670', () => {
    const solicitud = {
      score: 670,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 30,
      antiguedadMeses: 12,
      perfil: 'independiente' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('Aprobado');
  });

  test('retorna "Aprobado" en el límite exacto de dti de 35', () => {
    const solicitud = {
      score: 650,
      moraActiva: false,
      ingresosVerificados: true,
      dti: 35,
      antiguedadMeses: 6,
      perfil: 'empleado' as const,
      garante: false,
    };
    expect(evaluarSolicitud(solicitud)).toBe('Aprobado');
  });
});
