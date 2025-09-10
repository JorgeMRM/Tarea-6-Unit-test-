import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import { styled } from '@mui/material/styles';

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { evaluarSolicitud } from '../domain/tarea';

// --- Tipos ---
interface Solicitud {
  score: number;
  moraActiva: boolean;
  ingresosVerificados: boolean;
  dti: number;
  antiguedadMeses: number;
  perfil: 'estudiante' | 'empleado' | 'independiente' | 'retirado';
  garante: boolean;
}

// --- Botón con animación (react-bootstrap + estilo MUI) ---
const AnimatedButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#1976d2',
  color: '#fff',
  padding: '12px 20px',
  borderRadius: '12px',
  transition: 'all 0.25s ease',
  border: 'none',
  fontWeight: 600,
  letterSpacing: 0.3,
  '&:hover': {
    backgroundColor: '#1565c0',
    transform: 'translateY(-1px)',
    boxShadow: '0 8px 18px rgba(21,101,192,.25)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
}));

export const SolicitudForm = () => {
  const [formData, setFormData] = useState<Solicitud>({
    score: 600,
    moraActiva: false,
    ingresosVerificados: true,
    dti: 0,
    antiguedadMeses: 0,
    perfil: 'estudiante',
    garante: false,
  });

  const [resultado, setResultado] = useState<string | null>(null);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name?: string; value: any; type?: string; checked?: boolean } }
  ) => {
    const { name, value, type, checked } = 'target' in e ? e.target : (e as any);
    setFormData((prev) => ({
      ...prev,
      [name as string]:
        type === 'checkbox' ? checked : name === 'perfil' ? value : Number(value) || value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const evaluacion = evaluarSolicitud(formData);
    setResultado(evaluacion);
  };

  return (
    <Container
      fluid
      className="min-vh-100 d-flex align-items-center"
      style={{
        background: 'linear-gradient(135deg, #e3f2fd 0%, #f8f9fa 50%, #ffffff 100%)',
      }}
    >
      {/* Grilla responsive y centrado */}
      <Row className="w-100 justify-content-center px-3 px-md-4">
        {/* Ajusta el ancho por breakpoint: */}
        <Col xs={12} sm={11} md={10} lg={8} xl={7} xxl={6}>
          <h1
            className="text-center mb-4"
            style={{
              color: '#1976d2',
              fontFamily: 'Arial, sans-serif',
              fontWeight: 800,
              fontSize: '2.4rem',
              textShadow: '1px 2px 6px rgba(25,118,210,.25)',
              letterSpacing: 0.4,
            }}
          >
            Evaluador de Solicitudes
          </h1>

          {/* Acordeón de ayuda */}
          <Card
            className="shadow-sm border-0 rounded-4 mb-3"
            style={{ background: 'rgba(255,255,255,.95)' }}
          >
            <Card.Body className="p-0">
              <Accordion>
                <AccordionSummary>
                  <Typography sx={{ fontWeight: 700 }}>
                    ¿Qué significa cada condición?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ul className="mb-0" style={{ lineHeight: 1.6 }}>
                    <li>
                      <b>score:</b> puntaje de historial crediticio (300–900).
                    </li>
                    <li>
                      <b>moraActiva:</b> deudas vencidas/sin pago.
                    </li>
                    <li>
                      <b>ingresosVerificados:</b> ingreso comprobado con documentos.
                    </li>
                    <li>
                      <b>dti:</b> % de deuda sobre ingreso neto (≤ 35 es saludable).
                    </li>
                    <li>
                      <b>antiguedadMeses:</b> meses continuos con el mismo tipo de ingreso.
                    </li>
                    <li>
                      <b>perfil:</b> estudiante | empleado | independiente | retirado.
                    </li>
                    <li>
                      <b>garante:</b> respaldo (considerado para estudiantes).
                    </li>
                  </ul>
                </AccordionDetails>
              </Accordion>
            </Card.Body>
          </Card>

          <Card
            className="shadow-lg border-0 rounded-4"
            style={{ backdropFilter: 'blur(6px)', background: 'rgba(255,255,255,.95)' }}
          >
            <Card.Body className="p-4 p-md-5">
              <Form onSubmit={handleSubmit}>
                {/* SCORE sin límites */}
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Score de crédito*"
                    type="number"
                    name="score"
                    value={formData.score}
                    onChange={handleChange}
                    variant="outlined"
                    helperText="Cualquier número es válido; se evaluará con las reglas."
                    InputLabelProps={{ style: { fontFamily: 'Arial, sans-serif' } }}
                  />
                </FormControl>

                <div className="d-flex flex-wrap gap-4 mb-1">
                  <div>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="moraActiva"
                          checked={formData.moraActiva}
                          onChange={handleChange}
                          color="primary"
                        />
                      }
                      label="Mora activa"
                    />
                    <div className="text-muted" style={{ fontSize: 12, marginTop: -8 }}>
                      Deudas vencidas/sin pago.
                    </div>
                  </div>

                  <div>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="ingresosVerificados"
                          checked={formData.ingresosVerificados}
                          onChange={handleChange}
                          color="primary"
                        />
                      }
                      label="Ingresos verificados"
                    />
                    <div className="text-muted" style={{ fontSize: 12, marginTop: -8 }}>
                      Ingreso comprobado con documentos.
                    </div>
                  </div>
                </div>

                <FormControl fullWidth margin="normal">
                  <TextField
                    label="DTI (%) *"
                    type="number"
                    name="dti"
                    value={formData.dti}
                    onChange={handleChange}
                    inputProps={{ min: 0, max: 100 }}
                    required
                    variant="outlined"
                    helperText="Porcentaje de deuda sobre ingreso neto (≤ 35 es saludable)."
                    InputLabelProps={{ style: { fontFamily: 'Arial, sans-serif' } }}
                  />
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Antigüedad (meses) *"
                    type="number"
                    name="antiguedadMeses"
                    value={formData.antiguedadMeses}
                    onChange={handleChange}
                    inputProps={{ min: 0 }}
                    required
                    variant="outlined"
                    helperText="Meses continuos generando el mismo tipo de ingreso."
                    InputLabelProps={{ style: { fontFamily: 'Arial, sans-serif' } }}
                  />
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <InputLabel style={{ fontFamily: 'Arial, sans-serif' }}>Perfil</InputLabel>
                  <Select
                    name="perfil"
                    value={formData.perfil}
                    onChange={(e) =>
                      handleChange({
                        target: { name: 'perfil', value: (e.target as HTMLInputElement).value },
                      })
                    }
                    variant="outlined"
                    label="Perfil"
                  >
                    <MenuItem value="estudiante">Estudiante</MenuItem>
                    <MenuItem value="empleado">Empleado</MenuItem>
                    <MenuItem value="independiente">Independiente</MenuItem>
                    <MenuItem value="retirado">Retirado</MenuItem>
                  </Select>
                  <FormHelperText>Selecciona el tipo de solicitante.</FormHelperText>
                </FormControl>

                <FormControlLabel
                  control={
                    <Checkbox
                      name="garante"
                      checked={formData.garante}
                      onChange={handleChange}
                      color="primary"
                    />
                  }
                  label="Garante"
                />
                <div className="text-muted" style={{ fontSize: 12, marginTop: -8, marginBottom: 8 }}>
                  Respaldo del solicitante (considerado para estudiantes).
                </div>

                <AnimatedButton type="submit" className="w-100 mt-2" variant="primary">
                  Evaluar Solicitud
                </AnimatedButton>
              </Form>

              {resultado && (
                <MuiAlert
                  variant="filled"
                  severity={(resultado === 'Aprobado' ? 'success' : 'error') as AlertColor}
                  className="mt-4 text-center"
                  sx={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}
                >
                  Resultado: {resultado}
                </MuiAlert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
