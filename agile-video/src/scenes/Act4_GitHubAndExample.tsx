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
import { githubProjectsData, githubIssuesData, sprintSimulation, agileChecklist } from '../data/agileData';
import { TIMINGS } from '../data/timings';
import { theme } from '../styles/theme';

export const Act4_GitHubAndExample: React.FC = () => {
  const { act4 } = TIMINGS;
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>

      {/* ============================================================= */}
      {/* Intro Acto 4 (0-10s relativo)                                 */}
      {/* ============================================================= */}
      <Sequence from={act4.intro.start - act4.start} durationInFrames={act4.intro.duration}>
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
            🐙
          </div>
          <AnimatedTitle
            text="GitHub Projects y Ejemplo Practico"
            subtitle="Llevando Scrum a la practica"
            color={theme.colors.github.blue}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================= */}
      {/* GitHub Projects (10-35s relativo)                             */}
      {/* ============================================================= */}
      <Sequence
        from={act4.githubProjects.start - act4.start}
        durationInFrames={act4.githubProjects.duration}
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
            text={githubProjectsData.title}
            subtitle={githubProjectsData.subtitle}
            fontSize={theme.fontSizes.xl}
            color={theme.colors.github.blue}
          />

          {/* Kanban Board Visual */}
          <div
            style={{
              display: 'flex',
              gap: theme.spacing.sm,
              flex: 0.5,
              marginTop: theme.spacing.sm,
            }}
          >
            {githubProjectsData.boardColumns.map((col, index) => {
              const sectionFrame = frame - (act4.githubProjects.start - act4.start);
              const delay = 15 + index * 12;
              const opacity = interpolate(
                sectionFrame, [delay, delay + 15], [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              );

              return (
                <div
                  key={index}
                  style={{
                    flex: 1,
                    opacity,
                    backgroundColor: `${col.color}22`,
                    border: `2px solid ${col.color}`,
                    borderRadius: theme.borderRadius.lg,
                    padding: theme.spacing.md,
                    fontFamily: theme.fonts.sans,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: theme.spacing.xs,
                  }}
                >
                  <div
                    style={{
                      fontSize: theme.fontSizes.sm,
                      color: col.color === '#30363D' ? theme.colors.text : col.color,
                      fontWeight: theme.fontWeights.bold,
                    }}
                  >
                    {col.name}
                  </div>
                  <div style={{ fontSize: '20px', color: theme.colors.textDark }}>
                    {col.description}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', gap: theme.spacing.lg, flex: 0.5 }}>
            {/* Campos personalizados */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: theme.fonts.sans,
                  fontSize: theme.fontSizes.sm,
                  color: theme.colors.github.purple,
                  fontWeight: theme.fontWeights.bold,
                  marginBottom: theme.spacing.sm,
                  opacity: interpolate(
                    frame - (act4.githubProjects.start - act4.start),
                    [80, 100],
                    [0, 1],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                  ),
                }}
              >
                ⚙️ Campos Personalizados
              </div>
              {githubProjectsData.customFields.map((field, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    gap: theme.spacing.sm,
                    fontFamily: theme.fonts.sans,
                    fontSize: '20px',
                    color: theme.colors.text,
                    padding: `${theme.spacing.xs / 2}px 0`,
                    opacity: interpolate(
                      frame - (act4.githubProjects.start - act4.start),
                      [90 + idx * 10, 100 + idx * 10],
                      [0, 1],
                      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                    ),
                  }}
                >
                  <span style={{ color: theme.colors.github.blue, fontWeight: theme.fontWeights.bold, minWidth: 110 }}>
                    {field.name}
                  </span>
                  <span style={{ color: theme.colors.textDark }}>{field.type}</span>
                  <span style={{ color: theme.colors.text }}>({field.values})</span>
                </div>
              ))}
            </div>

            {/* Automatizaciones */}
            <div
              style={{
                flex: 1,
                opacity: interpolate(
                  frame - (act4.githubProjects.start - act4.start),
                  [130, 150],
                  [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                ),
              }}
            >
              <div
                style={{
                  fontFamily: theme.fonts.sans,
                  fontSize: theme.fontSizes.sm,
                  color: theme.colors.github.green,
                  fontWeight: theme.fontWeights.bold,
                  marginBottom: theme.spacing.sm,
                }}
              >
                🤖 Automatizaciones
              </div>
              {githubProjectsData.automations.map((auto, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.spacing.sm,
                    fontFamily: theme.fonts.sans,
                    fontSize: '22px',
                    color: theme.colors.text,
                    padding: `${theme.spacing.xs}px 0`,
                  }}
                >
                  <span style={{ fontSize: '24px' }}>{auto.icon}</span>
                  <span style={{ color: theme.colors.textDark }}>{auto.trigger}</span>
                  <span style={{ color: theme.colors.github.green }}>→</span>
                  <span>{auto.action}</span>
                </div>
              ))}
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================= */}
      {/* GitHub Issues (35-55s relativo)                               */}
      {/* ============================================================= */}
      <Sequence
        from={act4.githubIssues.start - act4.start}
        durationInFrames={act4.githubIssues.duration}
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
            text={githubIssuesData.title}
            subtitle={githubIssuesData.subtitle}
            fontSize={theme.fontSizes.xl}
            color={theme.colors.github.purple}
          />

          <div style={{ display: 'flex', gap: theme.spacing.lg, flex: 0.4 }}>
            {/* Labels */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: theme.fonts.sans,
                  fontSize: theme.fontSizes.sm,
                  color: theme.colors.text,
                  fontWeight: theme.fontWeights.bold,
                  marginBottom: theme.spacing.sm,
                }}
              >
                🏷️ Labels
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: theme.spacing.sm }}>
                {githubIssuesData.labels.map((label, idx) => {
                  const sectionFrame = frame - (act4.githubIssues.start - act4.start);
                  const delay = 15 + idx * 8;
                  const opacity = interpolate(
                    sectionFrame, [delay, delay + 10], [0, 1],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                  );

                  return (
                    <div
                      key={idx}
                      style={{
                        opacity,
                        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
                        backgroundColor: `${label.color}33`,
                        border: `1px solid ${label.color}`,
                        borderRadius: theme.borderRadius.full,
                        fontFamily: theme.fonts.code,
                        fontSize: theme.fontSizes.xs,
                        color: label.color,
                      }}
                    >
                      {label.name}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Milestone */}
            <div
              style={{
                flex: 1,
                opacity: interpolate(
                  frame - (act4.githubIssues.start - act4.start),
                  [60, 80],
                  [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                ),
              }}
            >
              <div
                style={{
                  fontFamily: theme.fonts.sans,
                  fontSize: theme.fontSizes.sm,
                  color: theme.colors.text,
                  fontWeight: theme.fontWeights.bold,
                  marginBottom: theme.spacing.sm,
                }}
              >
                🏁 Milestone: {githubIssuesData.milestone.name}
              </div>

              {/* Progress bar */}
              <div
                style={{
                  width: '100%',
                  height: 12,
                  backgroundColor: theme.colors.github.gray,
                  borderRadius: theme.borderRadius.full,
                  marginBottom: theme.spacing.sm,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${githubIssuesData.milestone.progress}%`,
                    height: '100%',
                    backgroundColor: theme.colors.github.green,
                    borderRadius: theme.borderRadius.full,
                  }}
                />
              </div>
              <div style={{ fontSize: '20px', color: theme.colors.textDark, fontFamily: theme.fonts.sans, marginBottom: theme.spacing.sm }}>
                {githubIssuesData.milestone.progress}% completado
              </div>

              {githubIssuesData.milestone.issues.map((issue, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    gap: theme.spacing.sm,
                    fontFamily: theme.fonts.sans,
                    fontSize: '20px',
                    color: theme.colors.text,
                    padding: `2px 0`,
                  }}
                >
                  <span>{issue.done ? '✅' : '⬜'}</span>
                  <span style={{ color: issue.done ? theme.colors.textDark : theme.colors.text, textDecoration: issue.done ? 'line-through' : 'none' }}>
                    {issue.title}
                  </span>
                  <span style={{ color: theme.colors.backlog.storyPoints, fontWeight: theme.fontWeights.bold }}>
                    {issue.points}pts
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Issue Workflow */}
          <div
            style={{
              flex: 0.4,
              display: 'flex',
              alignItems: 'center',
              opacity: interpolate(
                frame - (act4.githubIssues.start - act4.start),
                [act4.githubIssues.duration * 0.45, act4.githubIssues.duration * 0.45 + 20],
                [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              ),
            }}
          >
            <FlowDiagram
              title="Flujo de trabajo con Issues"
              steps={githubIssuesData.workflow}
              delayBetweenSteps={8}
            />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================= */}
      {/* Sprint Simulation (55-85s relativo)                           */}
      {/* ============================================================= */}
      <Sequence
        from={act4.sprintSimulation.start - act4.start}
        durationInFrames={act4.sprintSimulation.duration}
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
            text={sprintSimulation.title}
            subtitle={`Sprint Goal: "${sprintSimulation.sprintGoal}"`}
            fontSize={theme.fontSizes.xl}
            color={theme.colors.sprint.cycle}
          />

          <div style={{ display: 'flex', gap: theme.spacing.lg, flex: 1 }}>
            {/* Issues del Sprint */}
            <div style={{ flex: 0.6 }}>
              <div
                style={{
                  fontFamily: theme.fonts.sans,
                  fontSize: theme.fontSizes.sm,
                  color: theme.colors.sprint.planning,
                  fontWeight: theme.fontWeights.bold,
                  marginBottom: theme.spacing.sm,
                }}
              >
                📋 Sprint Backlog ({sprintSimulation.totalPoints} pts)
              </div>
              {sprintSimulation.issues.map((issue, idx) => {
                const sectionFrame = frame - (act4.sprintSimulation.start - act4.start);
                const delay = 15 + idx * 10;
                const opacity = interpolate(
                  sectionFrame, [delay, delay + 10], [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                );
                // Si estamos en la segunda mitad, mostrar como completado
                const isDone = sectionFrame > act4.sprintSimulation.duration * 0.7;

                return (
                  <div
                    key={idx}
                    style={{
                      opacity,
                      display: 'flex',
                      alignItems: 'center',
                      gap: theme.spacing.sm,
                      padding: theme.spacing.sm,
                      backgroundColor: isDone ? `${theme.colors.success}12` : '#ffffff06',
                      border: `1px solid ${isDone ? theme.colors.success : theme.colors.textDark}44`,
                      borderRadius: theme.borderRadius.lg,
                      marginBottom: theme.spacing.xs,
                      fontFamily: theme.fonts.sans,
                    }}
                  >
                    <span style={{ fontSize: '24px' }}>{isDone ? '✅' : issue.icon}</span>
                    <span style={{ flex: 1, fontSize: theme.fontSizes.xs, color: theme.colors.text }}>
                      #{issue.id} {issue.title}
                    </span>
                    <span style={{ fontSize: '20px', color: theme.colors.backlog.storyPoints }}>{issue.points}pts</span>
                    <span style={{ fontSize: '20px', color: theme.colors.textDark }}>{issue.assignee}</span>
                  </div>
                );
              })}
            </div>

            {/* Daily Standups */}
            <div style={{ flex: 1 }}>
              {/* Dia 1 */}
              <div
                style={{
                  opacity: interpolate(
                    frame - (act4.sprintSimulation.start - act4.start),
                    [80, 100],
                    [0, 1],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                  ),
                  marginBottom: theme.spacing.md,
                }}
              >
                <div
                  style={{
                    fontFamily: theme.fonts.sans,
                    fontSize: theme.fontSizes.sm,
                    color: theme.colors.sprint.daily,
                    fontWeight: theme.fontWeights.bold,
                    marginBottom: theme.spacing.sm,
                  }}
                >
                  ☀️ Daily - Dia 1
                </div>
                {sprintSimulation.dailyDay1.map((update, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      gap: theme.spacing.sm,
                      fontFamily: theme.fonts.sans,
                      fontSize: theme.fontSizes.xs,
                      color: theme.colors.text,
                      padding: `${theme.spacing.xs / 2}px 0`,
                    }}
                  >
                    <span>{update.icon}</span>
                    <span style={{ fontWeight: theme.fontWeights.bold, color: theme.colors.roles.dev }}>{update.name}:</span>
                    <span>{update.task}</span>
                  </div>
                ))}
              </div>

              {/* Dia 7 */}
              <div
                style={{
                  opacity: interpolate(
                    frame - (act4.sprintSimulation.start - act4.start),
                    [act4.sprintSimulation.duration * 0.4, act4.sprintSimulation.duration * 0.4 + 20],
                    [0, 1],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                  ),
                  marginBottom: theme.spacing.md,
                }}
              >
                <div
                  style={{
                    fontFamily: theme.fonts.sans,
                    fontSize: theme.fontSizes.sm,
                    color: theme.colors.sprint.daily,
                    fontWeight: theme.fontWeights.bold,
                    marginBottom: theme.spacing.sm,
                  }}
                >
                  ☀️ Daily - Dia 7
                </div>
                {sprintSimulation.dailyDay7.map((update, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      gap: theme.spacing.sm,
                      fontFamily: theme.fonts.sans,
                      fontSize: theme.fontSizes.xs,
                      color: theme.colors.text,
                      padding: `${theme.spacing.xs / 2}px 0`,
                    }}
                  >
                    <span>{update.icon}</span>
                    <span style={{ fontWeight: theme.fontWeights.bold, color: theme.colors.roles.dev }}>{update.name}:</span>
                    <span>{update.task}</span>
                  </div>
                ))}
              </div>

              {/* Review + Retro */}
              <div
                style={{
                  opacity: interpolate(
                    frame - (act4.sprintSimulation.start - act4.start),
                    [act4.sprintSimulation.duration * 0.6, act4.sprintSimulation.duration * 0.6 + 20],
                    [0, 1],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                  ),
                }}
              >
                <div
                  style={{
                    backgroundColor: `${theme.colors.sprint.review}12`,
                    border: `1px solid ${theme.colors.sprint.review}`,
                    borderRadius: theme.borderRadius.lg,
                    padding: theme.spacing.md,
                    fontFamily: theme.fonts.sans,
                    marginBottom: theme.spacing.sm,
                  }}
                >
                  <span style={{ color: theme.colors.sprint.review, fontWeight: theme.fontWeights.bold, fontSize: theme.fontSizes.xs }}>
                    🎬 Review:
                  </span>
                  <span style={{ fontSize: theme.fontSizes.xs, color: theme.colors.text, marginLeft: theme.spacing.sm }}>
                    {sprintSimulation.reviewResult}
                  </span>
                </div>
                <div
                  style={{
                    backgroundColor: `${theme.colors.sprint.retro}12`,
                    border: `1px solid ${theme.colors.sprint.retro}`,
                    borderRadius: theme.borderRadius.lg,
                    padding: theme.spacing.md,
                    fontFamily: theme.fonts.sans,
                  }}
                >
                  <span style={{ color: theme.colors.sprint.retro, fontWeight: theme.fontWeights.bold, fontSize: theme.fontSizes.xs }}>
                    🔄 Retro:
                  </span>
                  <span style={{ fontSize: theme.fontSizes.xs, color: theme.colors.text, marginLeft: theme.spacing.sm }}>
                    {sprintSimulation.retroAction}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================= */}
      {/* Conclusion y Resumen (85-100s relativo)                       */}
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
            text="Resumen Final"
            subtitle="Todo lo que aprendimos"
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
            {/* Conceptos */}
            <div
              style={{
                flex: 1,
                backgroundColor: '#4A90D912',
                border: `2px solid ${theme.colors.agile.scrum}`,
                borderRadius: theme.borderRadius.xl,
                padding: theme.spacing.lg,
              }}
            >
              <div
                style={{
                  fontFamily: theme.fonts.sans,
                  fontSize: theme.fontSizes.md,
                  color: theme.colors.agile.scrum,
                  fontWeight: theme.fontWeights.bold,
                  marginBottom: theme.spacing.md,
                }}
              >
                💡 Conceptos
              </div>
              <AnimatedList
                items={agileChecklist.conceptos}
                icon="✅"
                delayBetweenItems={8}
                fontSize={theme.fontSizes.xs}
              />
            </div>

            {/* Proceso */}
            <div
              style={{
                flex: 1,
                backgroundColor: '#2ECC7112',
                border: `2px solid ${theme.colors.sprint.review}`,
                borderRadius: theme.borderRadius.xl,
                padding: theme.spacing.lg,
              }}
            >
              <div
                style={{
                  fontFamily: theme.fonts.sans,
                  fontSize: theme.fontSizes.md,
                  color: theme.colors.sprint.review,
                  fontWeight: theme.fontWeights.bold,
                  marginBottom: theme.spacing.md,
                }}
              >
                🔄 Proceso
              </div>
              <AnimatedList
                items={agileChecklist.proceso}
                icon="✅"
                startFrame={10}
                delayBetweenItems={8}
                fontSize={theme.fontSizes.xs}
              />
            </div>

            {/* Herramientas */}
            <div
              style={{
                flex: 1,
                backgroundColor: '#8957E512',
                border: `2px solid ${theme.colors.github.purple}`,
                borderRadius: theme.borderRadius.xl,
                padding: theme.spacing.lg,
              }}
            >
              <div
                style={{
                  fontFamily: theme.fonts.sans,
                  fontSize: theme.fontSizes.md,
                  color: theme.colors.github.purple,
                  fontWeight: theme.fontWeights.bold,
                  marginBottom: theme.spacing.md,
                }}
              >
                🛠️ Herramientas
              </div>
              <AnimatedList
                items={agileChecklist.herramientas}
                icon="✅"
                startFrame={20}
                delayBetweenItems={8}
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
                [act4.conclusion.duration * 0.5, act4.conclusion.duration * 0.5 + 20],
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
                color: theme.colors.agile.manifesto,
                fontWeight: theme.fontWeights.bold,
              }}
            >
              Ahora ya sabes como trabajan los equipos profesionales!
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
