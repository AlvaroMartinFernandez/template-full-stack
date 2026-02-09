import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
} from 'remotion';
import { AnimatedTitle } from '../components/AnimatedTitle';
import { AnimatedList } from '../components/AnimatedList';
import { TIMINGS } from '../data/timings';
import { agileConcepts, methodologies } from '../data/agileData';
import { theme } from '../styles/theme';

export const Act1_WhatIsAgile: React.FC = () => {
  const { act1 } = TIMINGS;
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>

      {/* ============================================================= */}
      {/* Intro - Titulo y hook (0-20s)                                 */}
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
            🔄
          </div>

          <AnimatedTitle
            text="Metodologias Agiles"
            subtitle="Scrum, Kanban, Sprints y Herramientas"
            color={theme.colors.agile.scrum}
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
            Como trabajan los equipos profesionales de desarrollo
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
            {['Scrum', 'Kanban', 'Sprint', 'GitHub Projects'].map((tag) => (
              <div
                key={tag}
                style={{
                  padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
                  backgroundColor: '#4A90D933',
                  border: `1px solid ${theme.colors.agile.scrum}`,
                  borderRadius: theme.borderRadius.full,
                  color: theme.colors.agile.scrum,
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
      {/* Que es Agile? Waterfall vs Agile (20-45s)                     */}
      {/* ============================================================= */}
      <Sequence from={act1.queEsAgile.start} durationInFrames={act1.queEsAgile.duration}>
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
              text={agileConcepts.queEsAgile.title}
              subtitle={agileConcepts.queEsAgile.subtitle}
              fontSize={theme.fontSizes.xl}
              color={theme.colors.agile.scrum}
            />
            <div style={{ marginTop: theme.spacing.xl }}>
              <AnimatedList
                items={agileConcepts.queEsAgile.points}
                icon=">"
                delayBetweenItems={12}
              />
            </div>
          </div>

          {/* Lado derecho: Waterfall vs Agile */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: theme.spacing.lg,
            }}
          >
            {/* Waterfall */}
            <div
              style={{
                opacity: interpolate(
                  frame - act1.queEsAgile.start,
                  [30, 50],
                  [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                ),
                transform: `translateX(${interpolate(
                  frame - act1.queEsAgile.start,
                  [30, 50],
                  [50, 0],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                )}px)`,
                backgroundColor: `${agileConcepts.waterfallVsAgile.waterfall.color}15`,
                border: `2px solid ${agileConcepts.waterfallVsAgile.waterfall.color}`,
                borderRadius: theme.borderRadius.xl,
                padding: theme.spacing.lg,
                fontFamily: theme.fonts.sans,
              }}
            >
              <div
                style={{
                  fontSize: theme.fontSizes.lg,
                  color: agileConcepts.waterfallVsAgile.waterfall.color,
                  fontWeight: theme.fontWeights.bold,
                  marginBottom: theme.spacing.sm,
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.sm,
                }}
              >
                🏗️ {agileConcepts.waterfallVsAgile.waterfall.title}
              </div>
              <AnimatedList
                items={agileConcepts.waterfallVsAgile.waterfall.points}
                icon="•"
                delayBetweenItems={10}
                fontSize={theme.fontSizes.xs}
              />
            </div>

            {/* VS */}
            <div
              style={{
                textAlign: 'center',
                fontSize: theme.fontSizes.lg,
                color: theme.colors.textDark,
                fontFamily: theme.fonts.sans,
                fontWeight: theme.fontWeights.bold,
                opacity: interpolate(
                  frame - act1.queEsAgile.start,
                  [60, 80],
                  [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                ),
              }}
            >
              VS
            </div>

            {/* Agile */}
            <div
              style={{
                opacity: interpolate(
                  frame - act1.queEsAgile.start,
                  [80, 100],
                  [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                ),
                transform: `translateX(${interpolate(
                  frame - act1.queEsAgile.start,
                  [80, 100],
                  [50, 0],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                )}px)`,
                backgroundColor: `${agileConcepts.waterfallVsAgile.agile.color}15`,
                border: `2px solid ${agileConcepts.waterfallVsAgile.agile.color}`,
                borderRadius: theme.borderRadius.xl,
                padding: theme.spacing.lg,
                fontFamily: theme.fonts.sans,
              }}
            >
              <div
                style={{
                  fontSize: theme.fontSizes.lg,
                  color: agileConcepts.waterfallVsAgile.agile.color,
                  fontWeight: theme.fontWeights.bold,
                  marginBottom: theme.spacing.sm,
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.sm,
                }}
              >
                🔄 {agileConcepts.waterfallVsAgile.agile.title}
              </div>
              <AnimatedList
                items={agileConcepts.waterfallVsAgile.agile.points}
                icon="•"
                startFrame={10}
                delayBetweenItems={10}
                fontSize={theme.fontSizes.xs}
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================= */}
      {/* Manifiesto Agil - 4 valores (45-70s)                          */}
      {/* ============================================================= */}
      <Sequence from={act1.manifiestoAgil.start} durationInFrames={act1.manifiestoAgil.duration}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing.xxl,
            gap: theme.spacing.md,
          }}
        >
          <AnimatedTitle
            text={agileConcepts.manifiestoAgil.title}
            subtitle={agileConcepts.manifiestoAgil.subtitle}
            fontSize={theme.fontSizes.xl}
            color={theme.colors.agile.manifesto}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: theme.spacing.md,
              flex: 1,
              marginTop: theme.spacing.sm,
            }}
          >
            {agileConcepts.manifiestoAgil.values.map((value, index) => {
              const sectionFrame = frame - act1.manifiestoAgil.start;
              const delay = 30 + index * 30;
              const opacity = interpolate(
                sectionFrame, [delay, delay + 20], [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              );
              const scale = interpolate(
                sectionFrame, [delay, delay + 20], [0.8, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              );

              return (
                <div
                  key={index}
                  style={{
                    opacity,
                    transform: `scale(${scale})`,
                    backgroundColor: `${value.color}12`,
                    border: `2px solid ${value.color}`,
                    borderRadius: theme.borderRadius.xl,
                    padding: theme.spacing.lg,
                    fontFamily: theme.fonts.sans,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <div style={{ fontSize: '48px', marginBottom: theme.spacing.sm }}>
                    {value.icon}
                  </div>
                  <div
                    style={{
                      fontSize: theme.fontSizes.md,
                      color: value.color,
                      fontWeight: theme.fontWeights.bold,
                      marginBottom: theme.spacing.xs,
                    }}
                  >
                    {value.valoramos}
                  </div>
                  <div
                    style={{
                      fontSize: theme.fontSizes.sm,
                      color: theme.colors.textDark,
                    }}
                  >
                    sobre {value.sobre}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            style={{
              textAlign: 'center',
              fontFamily: theme.fonts.sans,
              fontSize: theme.fontSizes.sm,
              color: theme.colors.agile.manifesto,
              fontWeight: theme.fontWeights.bold,
              opacity: interpolate(
                frame - act1.manifiestoAgil.start,
                [act1.manifiestoAgil.duration * 0.7, act1.manifiestoAgil.duration * 0.7 + 20],
                [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              ),
            }}
          >
            Los elementos de la derecha tienen valor, pero valoramos MAS los de la izquierda
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================= */}
      {/* Scrum vs Kanban vs XP (70-100s)                               */}
      {/* ============================================================= */}
      <Sequence from={act1.scrumKanbanXP.start} durationInFrames={act1.scrumKanbanXP.duration}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing.xxl,
            gap: theme.spacing.md,
          }}
        >
          <AnimatedTitle
            text={methodologies.title}
            subtitle={methodologies.subtitle}
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
            {methodologies.items.map((method, index) => {
              const sectionFrame = frame - act1.scrumKanbanXP.start;
              const delay = 20 + index * 40;
              const opacity = interpolate(
                sectionFrame, [delay, delay + 25], [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              );
              const translateY = interpolate(
                sectionFrame, [delay, delay + 25], [40, 0],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              );

              return (
                <div
                  key={index}
                  style={{
                    flex: 1,
                    opacity,
                    transform: `translateY(${translateY}px)`,
                    backgroundColor: `${method.color}12`,
                    border: `2px solid ${method.color}`,
                    borderRadius: theme.borderRadius.xl,
                    padding: theme.spacing.lg,
                    fontFamily: theme.fonts.sans,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ fontSize: '50px', marginBottom: theme.spacing.sm }}>
                    {method.icon}
                  </div>
                  <div
                    style={{
                      fontSize: theme.fontSizes.lg,
                      color: method.color,
                      fontWeight: theme.fontWeights.bold,
                    }}
                  >
                    {method.name}
                  </div>
                  <div
                    style={{
                      fontSize: theme.fontSizes.xs,
                      color: theme.colors.textDark,
                      marginBottom: theme.spacing.md,
                      fontStyle: 'italic',
                    }}
                  >
                    {method.tagline}
                  </div>
                  <AnimatedList
                    items={method.points}
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
      {/* Cual usar? (100-120s)                                         */}
      {/* ============================================================= */}
      <Sequence from={act1.cualUsar.start} durationInFrames={act1.cualUsar.duration}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: theme.spacing.xxl,
            gap: theme.spacing.lg,
          }}
        >
          <AnimatedTitle
            text="Cual usar?"
            subtitle="Depende de tu equipo y contexto"
            fontSize={theme.fontSizes.xl}
            color={theme.colors.text}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing.md,
              width: '80%',
              marginTop: theme.spacing.md,
            }}
          >
            {methodologies.recommendation.map((item, index) => {
              const sectionFrame = frame - act1.cualUsar.start;
              const delay = 20 + index * 25;
              const opacity = interpolate(
                sectionFrame, [delay, delay + 15], [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              );

              return (
                <div
                  key={index}
                  style={{
                    opacity,
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.spacing.md,
                    fontFamily: theme.fonts.sans,
                    fontSize: theme.fontSizes.md,
                  }}
                >
                  <div style={{ flex: 1, color: theme.colors.text }}>
                    {item.situation}
                  </div>
                  <div style={{ fontSize: theme.fontSizes.lg, color: theme.colors.textDark }}>→</div>
                  <div
                    style={{
                      padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
                      backgroundColor: `${item.color}22`,
                      border: `2px solid ${item.color}`,
                      borderRadius: theme.borderRadius.lg,
                      color: item.color,
                      fontWeight: theme.fontWeights.bold,
                      minWidth: 140,
                      textAlign: 'center',
                    }}
                  >
                    {item.rec}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            style={{
              marginTop: theme.spacing.lg,
              fontSize: theme.fontSizes.md,
              color: theme.colors.sprint.cycle,
              fontWeight: theme.fontWeights.bold,
              fontFamily: theme.fonts.sans,
              opacity: interpolate(
                frame - act1.cualUsar.start,
                [act1.cualUsar.duration * 0.6, act1.cualUsar.duration * 0.6 + 20],
                [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              ),
            }}
          >
            Nosotros nos enfocaremos en Scrum
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
