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
import { authConcepts, authFlows } from '../data/authData';
import { TIMINGS } from '../data/timings';
import { theme } from '../styles/theme';

export const Act1_WhatIsAuth: React.FC = () => {
  const { act1 } = TIMINGS;
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>

      {/* ============================================================= */}
      {/* Seccion 1: Intro - Titulo y hook (0-30s)                      */}
      {/* ============================================================= */}
      <Sequence from={act1.intro.start} durationInFrames={act1.intro.duration}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: theme.spacing.xxl,
          }}
        >
          <div
            style={{
              fontSize: '120px',
              marginBottom: theme.spacing.lg,
              opacity: interpolate(frame, [0, 20], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              transform: `scale(${interpolate(frame, [0, 25], [0.3, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })})`,
            }}
          >
            🔐
          </div>

          <AnimatedTitle
            text="Autenticacion con JWT"
            subtitle="Flask + React | Full-Stack"
            color={theme.colors.auth.token}
          />

          <div
            style={{
              marginTop: theme.spacing.xl,
              fontSize: theme.fontSizes.md,
              color: theme.colors.secondary,
              opacity: interpolate(frame, [60, 90], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              fontFamily: theme.fonts.sans,
              textAlign: 'center',
            }}
          >
            Login, Signup, Proteccion de Rutas y mas
          </div>

          <div
            style={{
              marginTop: theme.spacing.xl,
              display: 'flex',
              gap: theme.spacing.lg,
              opacity: interpolate(frame, [120, 150], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            {['bcrypt', 'JWT', 'localStorage', 'PrivateRoute'].map((tag) => (
              <div
                key={tag}
                style={{
                  padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
                  backgroundColor: '#007acc33',
                  border: `1px solid ${theme.colors.primary}`,
                  borderRadius: theme.borderRadius.full,
                  color: theme.colors.primary,
                  fontFamily: theme.fonts.code,
                  fontSize: theme.fontSizes.sm,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================= */}
      {/* Seccion 2: Que es Autenticacion? (30-70s)                     */}
      {/* ============================================================= */}
      <Sequence from={act1.queEsAuth.start} durationInFrames={act1.queEsAuth.duration}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: theme.spacing.xxl,
            gap: theme.spacing.xl,
          }}
        >
          {/* Lado izquierdo: Explicacion */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <AnimatedTitle
              text={authConcepts.queEsAuth.title}
              subtitle={authConcepts.queEsAuth.subtitle}
              fontSize={theme.fontSizes.xl}
              color={theme.colors.primary}
            />

            <div style={{ marginTop: theme.spacing.xl }}>
              <AnimatedList
                items={authConcepts.queEsAuth.points}
                icon=">"
                delayBetweenItems={18}
              />
            </div>
          </div>

          {/* Lado derecho: AuthN vs AuthZ */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: theme.spacing.lg,
            }}
          >
            {authConcepts.authVsAuthz.items.map((item, index) => {
              const itemFrame = frame - act1.queEsAuth.start;
              const delay = 80 + index * 35;
              const opacity = interpolate(
                itemFrame, [delay, delay + 20], [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              );
              const translateX = interpolate(
                itemFrame, [delay, delay + 20], [50, 0],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              );

              return (
                <div
                  key={index}
                  style={{
                    opacity,
                    transform: `translateX(${translateX}px)`,
                    backgroundColor: index === 0 ? '#007acc22' : '#4ec9b022',
                    border: `2px solid ${index === 0 ? theme.colors.primary : theme.colors.secondary}`,
                    borderRadius: theme.borderRadius.xl,
                    padding: theme.spacing.lg,
                    width: '90%',
                    fontFamily: theme.fonts.sans,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
                    <span style={{ fontSize: '40px' }}>{item.icon}</span>
                    <div
                      style={{
                        fontSize: theme.fontSizes.lg,
                        color: index === 0 ? theme.colors.primary : theme.colors.secondary,
                        fontWeight: theme.fontWeights.bold,
                      }}
                    >
                      {item.concept}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: theme.fontSizes.md,
                      color: theme.colors.text,
                      marginTop: theme.spacing.sm,
                      marginLeft: 56,
                    }}
                  >
                    {item.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================= */}
      {/* Seccion 3: Sessions vs Tokens (70-110s)                       */}
      {/* ============================================================= */}
      <Sequence from={act1.sessionVsToken.start} durationInFrames={act1.sessionVsToken.duration}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing.xxl,
            gap: theme.spacing.lg,
          }}
        >
          <AnimatedTitle
            text={authConcepts.sessionVsToken.title}
            subtitle={authConcepts.sessionVsToken.subtitle}
            fontSize={theme.fontSizes.xl}
            color={theme.colors.text}
          />

          <div
            style={{
              display: 'flex',
              gap: theme.spacing.xl,
              flex: 1,
              marginTop: theme.spacing.md,
            }}
          >
            {/* Sessions */}
            <div
              style={{
                flex: 1,
                backgroundColor: `${authConcepts.sessionVsToken.session.color}15`,
                border: `2px solid ${authConcepts.sessionVsToken.session.color}`,
                borderRadius: theme.borderRadius.xl,
                padding: theme.spacing.lg,
                opacity: interpolate(
                  frame - act1.sessionVsToken.start, [0, 20], [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                ),
              }}
            >
              <div
                style={{
                  fontSize: theme.fontSizes.lg,
                  color: authConcepts.sessionVsToken.session.color,
                  fontWeight: theme.fontWeights.bold,
                  fontFamily: theme.fonts.sans,
                  marginBottom: theme.spacing.md,
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.sm,
                }}
              >
                🍪 {authConcepts.sessionVsToken.session.title}
              </div>
              <AnimatedList
                items={authConcepts.sessionVsToken.session.points}
                icon="•"
                delayBetweenItems={15}
                fontSize={theme.fontSizes.sm}
              />
            </div>

            {/* VS */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: theme.fontSizes.xl,
                color: theme.colors.textDark,
                fontFamily: theme.fonts.sans,
                fontWeight: theme.fontWeights.bold,
                opacity: interpolate(
                  frame - act1.sessionVsToken.start, [30, 50], [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                ),
              }}
            >
              VS
            </div>

            {/* Tokens */}
            <div
              style={{
                flex: 1,
                backgroundColor: `${authConcepts.sessionVsToken.token.color}15`,
                border: `2px solid ${authConcepts.sessionVsToken.token.color}`,
                borderRadius: theme.borderRadius.xl,
                padding: theme.spacing.lg,
                opacity: interpolate(
                  frame - act1.sessionVsToken.start, [20, 40], [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                ),
              }}
            >
              <div
                style={{
                  fontSize: theme.fontSizes.lg,
                  color: authConcepts.sessionVsToken.token.color,
                  fontWeight: theme.fontWeights.bold,
                  fontFamily: theme.fonts.sans,
                  marginBottom: theme.spacing.md,
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.sm,
                }}
              >
                🎫 {authConcepts.sessionVsToken.token.title}
              </div>
              <AnimatedList
                items={authConcepts.sessionVsToken.token.points}
                icon="•"
                startFrame={10}
                delayBetweenItems={15}
                fontSize={theme.fontSizes.sm}
              />
            </div>
          </div>

          {/* Nosotros usamos JWT */}
          <div
            style={{
              textAlign: 'center',
              fontFamily: theme.fonts.sans,
              fontSize: theme.fontSizes.lg,
              color: theme.colors.auth.token,
              fontWeight: theme.fontWeights.bold,
              opacity: interpolate(
                frame - act1.sessionVsToken.start,
                [act1.sessionVsToken.duration * 0.7, act1.sessionVsToken.duration * 0.7 + 20],
                [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              ),
            }}
          >
            Nosotros usamos JWT (Tokens)
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================= */}
      {/* Seccion 4: Que es JWT? detallado (110-160s)                   */}
      {/* ============================================================= */}
      <Sequence from={act1.queEsJWT.start} durationInFrames={act1.queEsJWT.duration}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing.xxl,
            gap: theme.spacing.md,
          }}
        >
          <AnimatedTitle
            text={authConcepts.queEsJWT.title}
            subtitle={authConcepts.queEsJWT.subtitle}
            fontSize={theme.fontSizes.xl}
            color={theme.colors.auth.token}
          />

          <div style={{ marginTop: theme.spacing.sm }}>
            <AnimatedList
              items={authConcepts.queEsJWT.points}
              icon="🎫"
              delayBetweenItems={12}
              fontSize={theme.fontSizes.md}
            />
          </div>

          {/* Estructura JWT visual */}
          <div
            style={{
              marginTop: theme.spacing.lg,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              gap: theme.spacing.sm,
            }}
          >
            {authConcepts.jwtStructure.parts.map((part, index) => {
              const sectionFrame = frame - act1.queEsJWT.start;
              const delay = 90 + index * 25;
              const opacity = interpolate(
                sectionFrame, [delay, delay + 20], [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              );
              const translateY = interpolate(
                sectionFrame, [delay, delay + 20], [40, 0],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              );

              return (
                <React.Fragment key={index}>
                  <div
                    style={{
                      opacity,
                      transform: `translateY(${translateY}px)`,
                      backgroundColor: `${part.color}18`,
                      border: `3px solid ${part.color}`,
                      borderRadius: theme.borderRadius.lg,
                      padding: theme.spacing.md,
                      minWidth: 300,
                      fontFamily: theme.fonts.sans,
                    }}
                  >
                    <div
                      style={{
                        fontSize: theme.fontSizes.lg,
                        color: part.color,
                        fontWeight: theme.fontWeights.bold,
                        marginBottom: theme.spacing.xs,
                      }}
                    >
                      {part.name}
                    </div>
                    <div
                      style={{
                        fontSize: theme.fontSizes.codeSmall,
                        color: theme.colors.text,
                        fontFamily: theme.fonts.code,
                        marginBottom: theme.spacing.sm,
                      }}
                    >
                      {part.content}
                    </div>
                    <div style={{ fontSize: theme.fontSizes.xs, color: theme.colors.textDark }}>
                      {part.description}
                    </div>
                    {/* Detalle extra */}
                    <div
                      style={{
                        fontSize: theme.fontSizes.xs,
                        color: part.color,
                        marginTop: theme.spacing.xs,
                        fontStyle: 'italic',
                        opacity: interpolate(
                          sectionFrame, [delay + 30, delay + 45], [0, 1],
                          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                        ),
                      }}
                    >
                      {part.detail}
                    </div>
                  </div>

                  {index < authConcepts.jwtStructure.parts.length - 1 && (
                    <div
                      style={{
                        fontSize: '48px',
                        color: theme.colors.textDark,
                        opacity,
                        fontWeight: theme.fontWeights.bold,
                        marginTop: theme.spacing.xl,
                      }}
                    >
                      .
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================= */}
      {/* Seccion 5: Flujo de autenticacion (160-200s)                  */}
      {/* ============================================================= */}
      <Sequence from={act1.flujoAuth.start} durationInFrames={act1.flujoAuth.duration}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: theme.spacing.xxl,
            gap: theme.spacing.xl,
          }}
        >
          <FlowDiagram
            title="Flujo de Login Completo"
            steps={authFlows.login}
            delayBetweenSteps={12}
          />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
