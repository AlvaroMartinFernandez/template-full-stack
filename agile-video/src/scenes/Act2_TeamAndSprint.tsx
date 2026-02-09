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
import { scrumTeam, sprintInfo, sprintCycle, ceremonies } from '../data/agileData';
import { TIMINGS } from '../data/timings';
import { theme } from '../styles/theme';

export const Act2_TeamAndSprint: React.FC = () => {
  const { act2 } = TIMINGS;
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>

      {/* ============================================================= */}
      {/* Intro Acto 2 (0-10s relativo)                                 */}
      {/* ============================================================= */}
      <Sequence from={act2.intro.start - act2.start} durationInFrames={act2.intro.duration}>
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
              fontSize: '100px',
              marginBottom: theme.spacing.lg,
              opacity: interpolate(frame, [0, 20], [0, 1], {
                extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
              }),
            }}
          >
            👥
          </div>
          <AnimatedTitle
            text="Equipo, Sprint y Ceremonias"
            subtitle="Roles, ciclos y reuniones con proposito"
            color={theme.colors.roles.dev}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================= */}
      {/* Roles del equipo (10-45s relativo)                            */}
      {/* ============================================================= */}
      <Sequence
        from={act2.roles.start - act2.start}
        durationInFrames={act2.roles.duration}
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
            text={scrumTeam.title}
            subtitle={scrumTeam.subtitle}
            fontSize={theme.fontSizes.xl}
            color={theme.colors.text}
          />

          <div
            style={{
              display: 'flex',
              gap: theme.spacing.md,
              flex: 1,
              marginTop: theme.spacing.sm,
            }}
          >
            {scrumTeam.roles.map((role, index) => {
              const sectionFrame = frame - (act2.roles.start - act2.start);
              const delay = 20 + index * 50;
              const opacity = interpolate(
                sectionFrame, [delay, delay + 25], [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              );
              const translateY = interpolate(
                sectionFrame, [delay, delay + 25], [30, 0],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              );

              return (
                <div
                  key={index}
                  style={{
                    flex: 1,
                    opacity,
                    transform: `translateY(${translateY}px)`,
                    backgroundColor: `${role.color}12`,
                    border: `2px solid ${role.color}`,
                    borderRadius: theme.borderRadius.xl,
                    padding: theme.spacing.lg,
                    fontFamily: theme.fonts.sans,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ fontSize: '44px', marginBottom: theme.spacing.xs }}>
                    {role.icon}
                  </div>
                  <div
                    style={{
                      fontSize: theme.fontSizes.md,
                      color: role.color,
                      fontWeight: theme.fontWeights.bold,
                    }}
                  >
                    {role.name}
                  </div>
                  <div
                    style={{
                      fontSize: theme.fontSizes.xs,
                      color: theme.colors.textDark,
                      fontStyle: 'italic',
                      marginBottom: theme.spacing.sm,
                    }}
                  >
                    {role.tagline}
                  </div>
                  <AnimatedList
                    items={role.responsibilities}
                    icon="•"
                    startFrame={delay + 15}
                    delayBetweenItems={12}
                    fontSize={theme.fontSizes.xs}
                  />
                </div>
              );
            })}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================= */}
      {/* Que es un Sprint? (45-70s relativo)                           */}
      {/* ============================================================= */}
      <Sequence
        from={act2.queEsSprint.start - act2.start}
        durationInFrames={act2.queEsSprint.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: theme.spacing.xxl,
            gap: theme.spacing.xl,
          }}
        >
          {/* Izquierda: Caracteristicas */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <AnimatedTitle
              text={sprintInfo.title}
              subtitle={sprintInfo.subtitle}
              fontSize={theme.fontSizes.xl}
              color={theme.colors.sprint.cycle}
            />
            <div style={{ marginTop: theme.spacing.xl }}>
              <AnimatedList
                items={sprintInfo.characteristics}
                icon="📌"
                delayBetweenItems={12}
                fontSize={theme.fontSizes.sm}
              />
            </div>
          </div>

          {/* Derecha: Reglas */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                backgroundColor: `${theme.colors.warning}12`,
                border: `2px solid ${theme.colors.warning}`,
                borderRadius: theme.borderRadius.xl,
                padding: theme.spacing.lg,
                opacity: interpolate(
                  frame - (act2.queEsSprint.start - act2.start),
                  [60, 80],
                  [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                ),
              }}
            >
              <div
                style={{
                  fontFamily: theme.fonts.sans,
                  fontSize: theme.fontSizes.lg,
                  color: theme.colors.warning,
                  fontWeight: theme.fontWeights.bold,
                  marginBottom: theme.spacing.md,
                }}
              >
                ⚠️ Reglas del Sprint
              </div>
              <AnimatedList
                items={sprintInfo.rules}
                icon="🚫"
                startFrame={70}
                delayBetweenItems={15}
                fontSize={theme.fontSizes.sm}
              />
            </div>

            {/* Por que 2 semanas */}
            <div
              style={{
                marginTop: theme.spacing.lg,
                textAlign: 'center',
                fontFamily: theme.fonts.sans,
                fontSize: theme.fontSizes.md,
                color: theme.colors.sprint.cycle,
                fontWeight: theme.fontWeights.bold,
                opacity: interpolate(
                  frame - (act2.queEsSprint.start - act2.start),
                  [act2.queEsSprint.duration * 0.7, act2.queEsSprint.duration * 0.7 + 20],
                  [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                ),
              }}
            >
              El 59% de los equipos prefiere sprints de 2 semanas
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================= */}
      {/* Ciclo del Sprint - FlowDiagram (70-85s relativo)              */}
      {/* ============================================================= */}
      <Sequence
        from={act2.cicloSprint.start - act2.start}
        durationInFrames={act2.cicloSprint.duration}
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
            title="Ciclo de un Sprint"
            steps={sprintCycle}
            delayBetweenSteps={10}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================= */}
      {/* Ceremonias Part 1: Planning + Daily (85-110s relativo)        */}
      {/* ============================================================= */}
      <Sequence
        from={act2.ceremonias1.start - act2.start}
        durationInFrames={act2.ceremonias1.duration}
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
            text="Ceremonias Scrum"
            subtitle="Reuniones con proposito"
            fontSize={theme.fontSizes.xl}
            color={theme.colors.text}
          />

          <div
            style={{
              display: 'flex',
              gap: theme.spacing.md,
              flex: 1,
              marginTop: theme.spacing.sm,
            }}
          >
            {/* Sprint Planning */}
            <div
              style={{
                flex: 1,
                backgroundColor: `${ceremonies.planning.color}12`,
                border: `2px solid ${ceremonies.planning.color}`,
                borderRadius: theme.borderRadius.xl,
                padding: theme.spacing.lg,
              }}
            >
              <div
                style={{
                  fontFamily: theme.fonts.sans,
                  fontSize: theme.fontSizes.md,
                  color: ceremonies.planning.color,
                  fontWeight: theme.fontWeights.bold,
                  marginBottom: theme.spacing.xs,
                }}
              >
                {ceremonies.planning.icon} {ceremonies.planning.name}
              </div>
              <div
                style={{
                  fontFamily: theme.fonts.sans,
                  fontSize: theme.fontSizes.xs,
                  color: theme.colors.textDark,
                  marginBottom: theme.spacing.md,
                }}
              >
                {ceremonies.planning.when} | {ceremonies.planning.duration}
              </div>
              <AnimatedList
                items={ceremonies.planning.steps}
                icon="▶"
                delayBetweenItems={10}
                fontSize={theme.fontSizes.xs}
              />
            </div>

            {/* Daily Standup */}
            <div
              style={{
                flex: 1,
                backgroundColor: `${ceremonies.daily.color}12`,
                border: `2px solid ${ceremonies.daily.color}`,
                borderRadius: theme.borderRadius.xl,
                padding: theme.spacing.lg,
                opacity: interpolate(
                  frame - (act2.ceremonias1.start - act2.start),
                  [30, 50],
                  [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                ),
              }}
            >
              <div
                style={{
                  fontFamily: theme.fonts.sans,
                  fontSize: theme.fontSizes.md,
                  color: ceremonies.daily.color,
                  fontWeight: theme.fontWeights.bold,
                  marginBottom: theme.spacing.xs,
                }}
              >
                {ceremonies.daily.icon} {ceremonies.daily.name}
              </div>
              <div
                style={{
                  fontFamily: theme.fonts.sans,
                  fontSize: theme.fontSizes.xs,
                  color: theme.colors.textDark,
                  marginBottom: theme.spacing.md,
                }}
              >
                {ceremonies.daily.when} | {ceremonies.daily.duration}
              </div>
              <div
                style={{
                  fontFamily: theme.fonts.sans,
                  fontSize: theme.fontSizes.sm,
                  color: theme.colors.text,
                  fontWeight: theme.fontWeights.semibold,
                  marginBottom: theme.spacing.sm,
                }}
              >
                3 preguntas:
              </div>
              <AnimatedList
                items={ceremonies.daily.questions}
                icon="❓"
                startFrame={40}
                delayBetweenItems={12}
                fontSize={theme.fontSizes.xs}
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================= */}
      {/* Ceremonias Part 2: Review + Retro (110-140s relativo)         */}
      {/* ============================================================= */}
      <Sequence
        from={act2.ceremonias2.start - act2.start}
        durationInFrames={act2.ceremonias2.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing.xxl,
            gap: theme.spacing.md,
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: theme.spacing.md,
              flex: 0.4,
            }}
          >
            {/* Sprint Review */}
            <div
              style={{
                flex: 1,
                backgroundColor: `${ceremonies.review.color}12`,
                border: `2px solid ${ceremonies.review.color}`,
                borderRadius: theme.borderRadius.xl,
                padding: theme.spacing.lg,
              }}
            >
              <div
                style={{
                  fontFamily: theme.fonts.sans,
                  fontSize: theme.fontSizes.md,
                  color: ceremonies.review.color,
                  fontWeight: theme.fontWeights.bold,
                  marginBottom: theme.spacing.xs,
                }}
              >
                {ceremonies.review.icon} {ceremonies.review.name}
              </div>
              <div
                style={{
                  fontFamily: theme.fonts.sans,
                  fontSize: theme.fontSizes.xs,
                  color: theme.colors.textDark,
                  marginBottom: theme.spacing.md,
                }}
              >
                {ceremonies.review.when} | {ceremonies.review.duration}
              </div>
              <AnimatedList
                items={ceremonies.review.steps}
                icon="🎬"
                delayBetweenItems={15}
                fontSize={theme.fontSizes.sm}
              />
            </div>
          </div>

          {/* Sprint Retro - 3 columnas */}
          <div
            style={{
              flex: 0.6,
              opacity: interpolate(
                frame - (act2.ceremonias2.start - act2.start),
                [40, 60],
                [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              ),
            }}
          >
            <div
              style={{
                fontFamily: theme.fonts.sans,
                fontSize: theme.fontSizes.md,
                color: ceremonies.retro.color,
                fontWeight: theme.fontWeights.bold,
                marginBottom: theme.spacing.sm,
              }}
            >
              {ceremonies.retro.icon} {ceremonies.retro.name}
              <span style={{ color: theme.colors.textDark, fontWeight: theme.fontWeights.normal, fontSize: theme.fontSizes.xs, marginLeft: theme.spacing.sm }}>
                {ceremonies.retro.when} | {ceremonies.retro.duration}
              </span>
            </div>

            <div style={{ display: 'flex', gap: theme.spacing.md }}>
              {ceremonies.retro.columns.map((col, index) => {
                const sectionFrame = frame - (act2.ceremonias2.start - act2.start);
                const delay = 50 + index * 30;
                const opacity = interpolate(
                  sectionFrame, [delay, delay + 20], [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                );

                return (
                  <div
                    key={index}
                    style={{
                      flex: 1,
                      opacity,
                      backgroundColor: `${col.color}12`,
                      border: `2px solid ${col.color}`,
                      borderRadius: theme.borderRadius.lg,
                      padding: theme.spacing.md,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: theme.fonts.sans,
                        fontSize: theme.fontSizes.sm,
                        color: col.color,
                        fontWeight: theme.fontWeights.bold,
                        marginBottom: theme.spacing.sm,
                      }}
                    >
                      {col.icon} {col.title}
                    </div>
                    <AnimatedList
                      items={col.items}
                      icon="•"
                      startFrame={delay + 10}
                      delayBetweenItems={10}
                      fontSize={theme.fontSizes.xs}
                    />
                  </div>
                );
              })}
            </div>

            {/* Accion de la retro */}
            <div
              style={{
                marginTop: theme.spacing.md,
                textAlign: 'center',
                fontFamily: theme.fonts.sans,
                fontSize: theme.fontSizes.sm,
                color: theme.colors.agile.manifesto,
                fontWeight: theme.fontWeights.bold,
                opacity: interpolate(
                  frame - (act2.ceremonias2.start - act2.start),
                  [act2.ceremonias2.duration * 0.7, act2.ceremonias2.duration * 0.7 + 20],
                  [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                ),
              }}
            >
              💡 Accion: {ceremonies.retro.columns[2].items[0]}
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
