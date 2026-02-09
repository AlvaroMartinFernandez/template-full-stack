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
import { backlogs, userStories, storyPointsData, definitionOfDone } from '../data/agileData';
import { TIMINGS } from '../data/timings';
import { theme } from '../styles/theme';

export const Act3_BacklogAndEstimation: React.FC = () => {
  const { act3 } = TIMINGS;
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>

      {/* ============================================================= */}
      {/* Intro Acto 3 (0-10s relativo)                                 */}
      {/* ============================================================= */}
      <Sequence from={act3.intro.start - act3.start} durationInFrames={act3.intro.duration}>
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
            📋
          </div>
          <AnimatedTitle
            text="Backlog, User Stories y Estimacion"
            subtitle="Como organizamos y estimamos el trabajo"
            color={theme.colors.backlog.product}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================= */}
      {/* Product Backlog vs Sprint Backlog (10-35s relativo)           */}
      {/* ============================================================= */}
      <Sequence
        from={act3.backlogs.start - act3.start}
        durationInFrames={act3.backlogs.duration}
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
            text={backlogs.title}
            fontSize={theme.fontSizes.xl}
            color={theme.colors.text}
          />

          <div
            style={{
              display: 'flex',
              gap: theme.spacing.lg,
              flex: 1,
              marginTop: theme.spacing.sm,
            }}
          >
            {/* Product Backlog */}
            <div
              style={{
                flex: 1,
                backgroundColor: `${backlogs.product.color}12`,
                border: `2px solid ${backlogs.product.color}`,
                borderRadius: theme.borderRadius.xl,
                padding: theme.spacing.lg,
              }}
            >
              <div
                style={{
                  fontFamily: theme.fonts.sans,
                  fontSize: theme.fontSizes.md,
                  color: backlogs.product.color,
                  fontWeight: theme.fontWeights.bold,
                  marginBottom: theme.spacing.xs,
                }}
              >
                {backlogs.product.icon} {backlogs.product.title}
              </div>
              <div
                style={{
                  fontFamily: theme.fonts.sans,
                  fontSize: theme.fontSizes.xs,
                  color: theme.colors.textDark,
                  marginBottom: theme.spacing.md,
                }}
              >
                {backlogs.product.subtitle}
              </div>
              <AnimatedList
                items={backlogs.product.points}
                icon="•"
                delayBetweenItems={10}
                fontSize={theme.fontSizes.xs}
              />

              {/* Ejemplo tabla */}
              <div
                style={{
                  marginTop: theme.spacing.md,
                  opacity: interpolate(
                    frame - (act3.backlogs.start - act3.start),
                    [80, 100],
                    [0, 1],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                  ),
                }}
              >
                {backlogs.product.example.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      gap: theme.spacing.sm,
                      fontFamily: theme.fonts.sans,
                      fontSize: theme.fontSizes.xs,
                      color: theme.colors.text,
                      padding: `${theme.spacing.xs / 2}px 0`,
                      borderBottom: idx < backlogs.product.example.length - 1 ? `1px solid ${theme.colors.textDark}33` : 'none',
                    }}
                  >
                    <span
                      style={{
                        color: item.priority === 'ALTA' ? theme.colors.error : item.priority === 'MEDIA' ? theme.colors.warning : theme.colors.info,
                        fontWeight: theme.fontWeights.bold,
                        minWidth: 55,
                      }}
                    >
                      {item.priority}
                    </span>
                    <span style={{ flex: 1 }}>{item.story}</span>
                    <span style={{ color: theme.colors.textDark }}>{item.sprint}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sprint Backlog */}
            <div
              style={{
                flex: 1,
                backgroundColor: `${backlogs.sprint.color}12`,
                border: `2px solid ${backlogs.sprint.color}`,
                borderRadius: theme.borderRadius.xl,
                padding: theme.spacing.lg,
                opacity: interpolate(
                  frame - (act3.backlogs.start - act3.start),
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
                  color: backlogs.sprint.color,
                  fontWeight: theme.fontWeights.bold,
                  marginBottom: theme.spacing.xs,
                }}
              >
                {backlogs.sprint.icon} {backlogs.sprint.title}
              </div>
              <div
                style={{
                  fontFamily: theme.fonts.sans,
                  fontSize: theme.fontSizes.xs,
                  color: theme.colors.textDark,
                  marginBottom: theme.spacing.md,
                }}
              >
                {backlogs.sprint.subtitle}
              </div>
              <AnimatedList
                items={backlogs.sprint.points}
                icon="•"
                startFrame={30}
                delayBetweenItems={10}
                fontSize={theme.fontSizes.xs}
              />

              {/* Ejemplo tareas */}
              <div
                style={{
                  marginTop: theme.spacing.md,
                  backgroundColor: `${backlogs.sprint.color}08`,
                  borderRadius: theme.borderRadius.lg,
                  padding: theme.spacing.md,
                  opacity: interpolate(
                    frame - (act3.backlogs.start - act3.start),
                    [100, 120],
                    [0, 1],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                  ),
                }}
              >
                <div
                  style={{
                    fontFamily: theme.fonts.sans,
                    fontSize: theme.fontSizes.xs,
                    color: backlogs.sprint.color,
                    fontWeight: theme.fontWeights.bold,
                    marginBottom: theme.spacing.xs,
                  }}
                >
                  Historia: "Registro con email"
                </div>
                {backlogs.sprint.tasks.map((task, idx) => (
                  <div
                    key={idx}
                    style={{
                      fontFamily: theme.fonts.sans,
                      fontSize: '20px',
                      color: theme.colors.text,
                      padding: `${theme.spacing.xs / 2}px 0`,
                    }}
                  >
                    ☐ {task}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================= */}
      {/* User Stories + INVEST (35-65s relativo)                       */}
      {/* ============================================================= */}
      <Sequence
        from={act3.userStories.start - act3.start}
        durationInFrames={act3.userStories.duration}
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
            text={userStories.title}
            subtitle={userStories.subtitle}
            fontSize={theme.fontSizes.xl}
            color={theme.colors.backlog.userStory}
          />

          {/* Formato template */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: theme.spacing.md,
              marginTop: theme.spacing.sm,
            }}
          >
            {userStories.format.parts.map((part, index) => {
              const sectionFrame = frame - (act3.userStories.start - act3.start);
              const delay = 20 + index * 20;
              const opacity = interpolate(
                sectionFrame, [delay, delay + 15], [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              );

              return (
                <div
                  key={index}
                  style={{
                    opacity,
                    backgroundColor: `${part.color}18`,
                    border: `2px solid ${part.color}`,
                    borderRadius: theme.borderRadius.lg,
                    padding: `${theme.spacing.sm}px ${theme.spacing.lg}px`,
                    fontFamily: theme.fonts.sans,
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: theme.fontSizes.xs,
                      color: part.color,
                      fontWeight: theme.fontWeights.bold,
                      marginBottom: theme.spacing.xs,
                    }}
                  >
                    {part.label}
                  </div>
                  <div style={{ fontSize: theme.fontSizes.sm, color: theme.colors.text }}>
                    {part.content}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            style={{
              display: 'flex',
              gap: theme.spacing.lg,
              flex: 1,
            }}
          >
            {/* Ejemplos de User Stories */}
            <div style={{ flex: 1.2 }}>
              {userStories.examples.map((example, index) => {
                const sectionFrame = frame - (act3.userStories.start - act3.start);
                const delay = 80 + index * 30;
                const opacity = interpolate(
                  sectionFrame, [delay, delay + 20], [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                );

                return (
                  <div
                    key={index}
                    style={{
                      opacity,
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: theme.spacing.sm,
                      padding: `${theme.spacing.sm}px 0`,
                      fontFamily: theme.fonts.sans,
                      fontSize: theme.fontSizes.xs,
                      borderBottom: index < userStories.examples.length - 1 ? `1px solid ${theme.colors.textDark}33` : 'none',
                    }}
                  >
                    <span style={{ fontSize: '28px' }}>{example.icon}</span>
                    <div>
                      <span style={{ color: '#3498DB' }}>Como </span>
                      <span style={{ color: theme.colors.text }}>{example.role}, </span>
                      <span style={{ color: '#2ECC71' }}>quiero </span>
                      <span style={{ color: theme.colors.text }}>{example.action}, </span>
                      <span style={{ color: '#F39C12' }}>para </span>
                      <span style={{ color: theme.colors.text }}>{example.benefit}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* INVEST */}
            <div
              style={{
                flex: 0.8,
                opacity: interpolate(
                  frame - (act3.userStories.start - act3.start),
                  [act3.userStories.duration * 0.5, act3.userStories.duration * 0.5 + 20],
                  [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                ),
              }}
            >
              <div
                style={{
                  fontFamily: theme.fonts.sans,
                  fontSize: theme.fontSizes.md,
                  color: theme.colors.backlog.userStory,
                  fontWeight: theme.fontWeights.bold,
                  marginBottom: theme.spacing.md,
                }}
              >
                Criterios INVEST
              </div>
              {userStories.invest.map((item, index) => {
                const sectionFrame = frame - (act3.userStories.start - act3.start);
                const delay = act3.userStories.duration * 0.5 + 20 + index * 12;
                const opacity = interpolate(
                  sectionFrame, [delay, delay + 10], [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                );

                return (
                  <div
                    key={index}
                    style={{
                      opacity,
                      display: 'flex',
                      alignItems: 'center',
                      gap: theme.spacing.sm,
                      marginBottom: theme.spacing.xs,
                      fontFamily: theme.fonts.sans,
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: theme.borderRadius.full,
                        backgroundColor: `${theme.colors.backlog.userStory}22`,
                        border: `2px solid ${theme.colors.backlog.userStory}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: theme.fontSizes.sm,
                        color: theme.colors.backlog.userStory,
                        fontWeight: theme.fontWeights.bold,
                        flexShrink: 0,
                      }}
                    >
                      {item.letter}
                    </div>
                    <div>
                      <div style={{ fontSize: theme.fontSizes.xs, color: theme.colors.text, fontWeight: theme.fontWeights.semibold }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '20px', color: theme.colors.textDark }}>
                        {item.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================= */}
      {/* Story Points + Planning Poker (65-95s relativo)               */}
      {/* ============================================================= */}
      <Sequence
        from={act3.storyPoints.start - act3.start}
        durationInFrames={act3.storyPoints.duration}
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
            text={storyPointsData.title}
            subtitle={storyPointsData.subtitle}
            fontSize={theme.fontSizes.xl}
            color={theme.colors.backlog.storyPoints}
          />

          <div style={{ display: 'flex', gap: theme.spacing.lg, flex: 1 }}>
            {/* Izquierda: Referencia */}
            <div style={{ flex: 1 }}>
              {/* Mide 3 cosas */}
              <div style={{ display: 'flex', gap: theme.spacing.md, marginBottom: theme.spacing.md }}>
                {storyPointsData.measures.map((m, idx) => (
                  <div
                    key={idx}
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      fontFamily: theme.fonts.sans,
                      opacity: interpolate(
                        frame - (act3.storyPoints.start - act3.start),
                        [10 + idx * 10, 20 + idx * 10],
                        [0, 1],
                        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                      ),
                    }}
                  >
                    <div style={{ fontSize: '32px' }}>{m.icon}</div>
                    <div style={{ fontSize: theme.fontSizes.xs, color: theme.colors.text, fontWeight: theme.fontWeights.bold }}>{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Tabla de referencia */}
              {storyPointsData.referenceTable.map((row, idx) => {
                const sectionFrame = frame - (act3.storyPoints.start - act3.start);
                const delay = 40 + idx * 12;
                const opacity = interpolate(
                  sectionFrame, [delay, delay + 10], [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                );

                return (
                  <div
                    key={idx}
                    style={{
                      opacity,
                      display: 'flex',
                      alignItems: 'center',
                      gap: theme.spacing.sm,
                      padding: `${theme.spacing.xs}px 0`,
                      borderBottom: idx < storyPointsData.referenceTable.length - 1 ? `1px solid ${theme.colors.textDark}22` : 'none',
                      fontFamily: theme.fonts.sans,
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: theme.borderRadius.lg,
                        backgroundColor: `${row.color}22`,
                        border: `2px solid ${row.color}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: theme.fontSizes.sm,
                        color: row.color,
                        fontWeight: theme.fontWeights.bold,
                        flexShrink: 0,
                      }}
                    >
                      {row.points}
                    </div>
                    <div style={{ flex: 0.5 }}>
                      <div style={{ fontSize: theme.fontSizes.xs, color: theme.colors.text }}>{row.difficulty}</div>
                    </div>
                    <div style={{ flex: 1, fontSize: '20px', color: theme.colors.textDark }}>
                      {row.example}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Derecha: Planning Poker */}
            <div
              style={{
                flex: 1,
                opacity: interpolate(
                  frame - (act3.storyPoints.start - act3.start),
                  [act3.storyPoints.duration * 0.4, act3.storyPoints.duration * 0.4 + 20],
                  [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                ),
              }}
            >
              <div
                style={{
                  fontFamily: theme.fonts.sans,
                  fontSize: theme.fontSizes.lg,
                  color: theme.colors.backlog.storyPoints,
                  fontWeight: theme.fontWeights.bold,
                  marginBottom: theme.spacing.md,
                }}
              >
                🃏 Planning Poker
              </div>
              <FlowDiagram
                steps={storyPointsData.planningPokerSteps}
                delayBetweenSteps={12}
                direction="vertical"
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================= */}
      {/* Definition of Done (95-120s relativo)                         */}
      {/* ============================================================= */}
      <Sequence
        from={act3.definitionOfDone.start - act3.start}
        durationInFrames={act3.definitionOfDone.duration}
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
            text={definitionOfDone.title}
            subtitle={definitionOfDone.subtitle}
            fontSize={theme.fontSizes.xl}
            color={theme.colors.backlog.dod}
          />

          <div style={{ display: 'flex', gap: theme.spacing.lg, flex: 1 }}>
            {/* Izquierda: El problema */}
            <div style={{ flex: 0.8, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: theme.spacing.md }}>
              <div
                style={{
                  fontFamily: theme.fonts.sans,
                  fontSize: theme.fontSizes.sm,
                  color: theme.colors.error,
                  fontWeight: theme.fontWeights.bold,
                  marginBottom: theme.spacing.sm,
                }}
              >
                Sin DoD, "terminado" significa algo diferente:
              </div>
              {definitionOfDone.problem.map((p, idx) => {
                const sectionFrame = frame - (act3.definitionOfDone.start - act3.start);
                const delay = 15 + idx * 18;
                const opacity = interpolate(
                  sectionFrame, [delay, delay + 12], [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                );

                return (
                  <div
                    key={idx}
                    style={{
                      opacity,
                      display: 'flex',
                      alignItems: 'center',
                      gap: theme.spacing.sm,
                      fontFamily: theme.fonts.sans,
                      backgroundColor: '#ffffff08',
                      borderRadius: theme.borderRadius.lg,
                      padding: theme.spacing.sm,
                    }}
                  >
                    <span style={{ fontSize: '28px' }}>{p.icon}</span>
                    <span style={{ fontSize: theme.fontSizes.xs, color: theme.colors.text, fontWeight: theme.fontWeights.bold }}>{p.role}:</span>
                    <span style={{ fontSize: theme.fontSizes.xs, color: theme.colors.textDark, fontStyle: 'italic' }}>{p.says}</span>
                  </div>
                );
              })}
            </div>

            {/* Derecha: Checklist */}
            <div
              style={{
                flex: 1.2,
                opacity: interpolate(
                  frame - (act3.definitionOfDone.start - act3.start),
                  [60, 80],
                  [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                ),
                backgroundColor: `${theme.colors.backlog.dod}08`,
                border: `2px solid ${theme.colors.backlog.dod}`,
                borderRadius: theme.borderRadius.xl,
                padding: theme.spacing.lg,
              }}
            >
              <div
                style={{
                  fontFamily: theme.fonts.sans,
                  fontSize: theme.fontSizes.md,
                  color: theme.colors.backlog.dod,
                  fontWeight: theme.fontWeights.bold,
                  marginBottom: theme.spacing.md,
                }}
              >
                ✅ Checklist DoD
              </div>
              {Object.entries(definitionOfDone.checklist).map(([category, items], catIdx) => (
                <div key={catIdx} style={{ marginBottom: theme.spacing.sm }}>
                  <div
                    style={{
                      fontFamily: theme.fonts.sans,
                      fontSize: theme.fontSizes.xs,
                      color: theme.colors.backlog.dod,
                      fontWeight: theme.fontWeights.semibold,
                      marginBottom: theme.spacing.xs / 2,
                      textTransform: 'capitalize',
                    }}
                  >
                    {category}:
                  </div>
                  {items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      style={{
                        fontFamily: theme.fonts.sans,
                        fontSize: '20px',
                        color: theme.colors.text,
                        paddingLeft: theme.spacing.sm,
                      }}
                    >
                      ☑ {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
