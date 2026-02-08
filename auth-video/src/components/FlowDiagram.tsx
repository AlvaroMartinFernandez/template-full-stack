import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { theme } from '../styles/theme';

interface FlowStep {
  label: string;
  icon: string;
  color: string;
  description?: string;
}

interface FlowDiagramProps {
  steps: FlowStep[];
  title?: string;
  startFrame?: number;
  delayBetweenSteps?: number;
  direction?: 'horizontal' | 'vertical';
}

export const FlowDiagram: React.FC<FlowDiagramProps> = ({
  steps,
  title,
  startFrame = 0,
  delayBetweenSteps = 20,
  direction = 'horizontal',
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  const titleOpacity = interpolate(
    relativeFrame,
    [0, 15],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const isHorizontal = direction === 'horizontal';

  return (
    <div style={{ fontFamily: theme.fonts.sans }}>
      {title && (
        <div
          style={{
            textAlign: 'center',
            fontSize: theme.fontSizes.xl,
            color: theme.colors.primary,
            fontWeight: theme.fontWeights.bold,
            marginBottom: theme.spacing.xl,
            opacity: titleOpacity,
          }}
        >
          {title}
        </div>
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: isHorizontal ? 'row' : 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: theme.spacing.sm,
        }}
      >
        {steps.map((step, index) => {
          const stepStart = (index * delayBetweenSteps) + 15;

          const opacity = interpolate(
            relativeFrame,
            [stepStart, stepStart + 15],
            [0, 1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );

          const scale = interpolate(
            relativeFrame,
            [stepStart, stepStart + 15],
            [0.5, 1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );

          const arrowOpacity = interpolate(
            relativeFrame,
            [stepStart + 10, stepStart + 20],
            [0, 1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );

          return (
            <React.Fragment key={index}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  opacity,
                  transform: `scale(${scale})`,
                }}
              >
                {/* Icono circular */}
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: step.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '36px',
                    boxShadow: `0 4px 12px ${step.color}66`,
                  }}
                >
                  {step.icon}
                </div>
                {/* Label */}
                <div
                  style={{
                    marginTop: theme.spacing.sm,
                    fontSize: theme.fontSizes.sm,
                    color: theme.colors.text,
                    fontWeight: theme.fontWeights.semibold,
                    textAlign: 'center',
                    maxWidth: 140,
                  }}
                >
                  {step.label}
                </div>
                {/* Descripcion */}
                {step.description && (
                  <div
                    style={{
                      marginTop: theme.spacing.xs,
                      fontSize: theme.fontSizes.xs,
                      color: theme.colors.textDark,
                      textAlign: 'center',
                      maxWidth: 160,
                    }}
                  >
                    {step.description}
                  </div>
                )}
              </div>

              {/* Flecha entre pasos */}
              {index < steps.length - 1 && (
                <div
                  style={{
                    opacity: arrowOpacity,
                    fontSize: '32px',
                    color: theme.colors.textDark,
                    transform: isHorizontal ? 'none' : 'rotate(90deg)',
                  }}
                >
                  →
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
