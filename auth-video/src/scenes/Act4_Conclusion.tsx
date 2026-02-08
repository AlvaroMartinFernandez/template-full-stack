import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
} from 'remotion';
import { AnimatedTitle } from '../components/AnimatedTitle';
import { AnimatedList } from '../components/AnimatedList';
import { FlowDiagram } from '../components/FlowDiagram';
import { authFlows, authChecklist, securityConcepts } from '../data/authData';
import { TIMINGS } from '../data/timings';
import { theme } from '../styles/theme';

export const Act4_Conclusion: React.FC = () => {
  const { act4 } = TIMINGS;
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>

      {/* ============================================================= */}
      {/* Flujo completo de Registro (0-30s relativo)                   */}
      {/* ============================================================= */}
      <Sequence
        from={act4.flujoRegistro.start - act4.start}
        durationInFrames={act4.flujoRegistro.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: theme.spacing.xxl,
          }}
        >
          <FlowDiagram
            title="Flujo Completo: Signup (Registro)"
            steps={authFlows.signup}
            delayBetweenSteps={10}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================= */}
      {/* Flujo completo de Login (30-60s relativo)                     */}
      {/* ============================================================= */}
      <Sequence
        from={act4.flujoLogin.start - act4.start}
        durationInFrames={act4.flujoLogin.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: theme.spacing.xxl,
          }}
        >
          <FlowDiagram
            title="Flujo Completo: Login"
            steps={authFlows.login}
            delayBetweenSteps={10}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================= */}
      {/* Flujo ruta protegida (60-90s relativo)                        */}
      {/* ============================================================= */}
      <Sequence
        from={act4.flujoProtected.start - act4.start}
        durationInFrames={act4.flujoProtected.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: theme.spacing.xxl,
          }}
        >
          <FlowDiagram
            title="Flujo: Acceder a Ruta Protegida"
            steps={authFlows.protectedRoute}
            delayBetweenSteps={12}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================= */}
      {/* Conclusion y Checklist (90-120s relativo)                     */}
      {/* ============================================================= */}
      <Sequence
        from={act4.conclusion.start - act4.start}
        durationInFrames={act4.conclusion.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing.xxl,
            gap: theme.spacing.md,
          }}
        >
          <AnimatedTitle
            text="Checklist de Auth Completo"
            subtitle="Todo lo que implementamos"
            color={theme.colors.success}
            fontSize={theme.fontSizes.xl}
          />

          <div
            style={{
              display: 'flex',
              gap: theme.spacing.lg,
              flex: 1,
              marginTop: theme.spacing.sm,
            }}
          >
            {/* Backend checklist */}
            <div
              style={{
                flex: 1,
                backgroundColor: '#007acc12',
                border: `2px solid ${theme.colors.primary}`,
                borderRadius: theme.borderRadius.xl,
                padding: theme.spacing.lg,
              }}
            >
              <div
                style={{
                  fontFamily: theme.fonts.sans,
                  fontSize: theme.fontSizes.md,
                  color: theme.colors.primary,
                  fontWeight: theme.fontWeights.bold,
                  marginBottom: theme.spacing.md,
                }}
              >
                ⚙️ Backend (Flask)
              </div>
              <AnimatedList
                items={authChecklist.backend}
                icon="✅"
                delayBetweenItems={8}
                fontSize={theme.fontSizes.xs}
              />
            </div>

            {/* Frontend checklist */}
            <div
              style={{
                flex: 1,
                backgroundColor: '#c586c012',
                border: `2px solid ${theme.colors.jsx.keyword}`,
                borderRadius: theme.borderRadius.xl,
                padding: theme.spacing.lg,
              }}
            >
              <div
                style={{
                  fontFamily: theme.fonts.sans,
                  fontSize: theme.fontSizes.md,
                  color: theme.colors.jsx.keyword,
                  fontWeight: theme.fontWeights.bold,
                  marginBottom: theme.spacing.md,
                }}
              >
                ⚛️ Frontend (React)
              </div>
              <AnimatedList
                items={authChecklist.frontend}
                icon="✅"
                startFrame={10}
                delayBetweenItems={7}
                fontSize={theme.fontSizes.xs}
              />
            </div>
          </div>

          {/* Cierre */}
          <div
            style={{
              textAlign: 'center',
              fontFamily: theme.fonts.sans,
              opacity: interpolate(
                frame - (act4.conclusion.start - act4.start),
                [act4.conclusion.duration * 0.75, act4.conclusion.duration * 0.75 + 20],
                [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              ),
            }}
          >
            <div style={{ fontSize: '50px', marginBottom: theme.spacing.xs }}>
              🎉
            </div>
            <div
              style={{
                fontSize: theme.fontSizes.lg,
                color: theme.colors.auth.token,
                fontWeight: theme.fontWeights.bold,
              }}
            >
              Tu aplicacion ahora es segura!
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
