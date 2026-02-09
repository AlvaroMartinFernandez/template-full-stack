import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Act1_WhatIsAgile } from './scenes/Act1_WhatIsAgile';
import { Act2_TeamAndSprint } from './scenes/Act2_TeamAndSprint';
import { Act3_BacklogAndEstimation } from './scenes/Act3_BacklogAndEstimation';
import { Act4_GitHubAndExample } from './scenes/Act4_GitHubAndExample';
import { AudioNarration } from './components/AudioNarration';
import { narrationScript } from './data/narrationScript';
import { TIMINGS } from './data/timings';
import { theme } from './styles/theme';

// Configuracion de audio
const AUDIO_CONFIG = {
  enabled: false, // Cambiar a true cuando tengas los archivos de audio generados
  volume: 1.0,
  fadeIn: 10,
};

export const Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>
      {/* ===== AUDIO NARRACION ===== */}
      {AUDIO_CONFIG.enabled &&
        narrationScript.map((segment) => (
          <Sequence
            key={segment.id}
            from={segment.startFrame}
            durationInFrames={segment.durationFrames}
          >
            <AudioNarration
              audioFile={segment.audioFile || `${segment.id}.mp3`}
              volume={AUDIO_CONFIG.volume}
              fadeIn={AUDIO_CONFIG.fadeIn}
            />
          </Sequence>
        ))}

      {/* ===== ESCENAS VISUALES ===== */}

      {/* Acto 1: Que es Agile + Manifiesto + Metodologias (0-120s) */}
      <Sequence
        from={TIMINGS.act1.start}
        durationInFrames={TIMINGS.act1.end - TIMINGS.act1.start}
        premountFor={30}
      >
        <Act1_WhatIsAgile />
      </Sequence>

      {/* Acto 2: Equipo, Sprint y Ceremonias (120-260s) */}
      <Sequence
        from={TIMINGS.act2.start}
        durationInFrames={TIMINGS.act2.end - TIMINGS.act2.start}
        premountFor={30}
      >
        <Act2_TeamAndSprint />
      </Sequence>

      {/* Acto 3: Backlog, User Stories, Estimacion, DoD (260-380s) */}
      <Sequence
        from={TIMINGS.act3.start}
        durationInFrames={TIMINGS.act3.end - TIMINGS.act3.start}
        premountFor={30}
      >
        <Act3_BacklogAndEstimation />
      </Sequence>

      {/* Acto 4: GitHub Projects + Ejemplo Practico (380-480s) */}
      <Sequence
        from={TIMINGS.act4.start}
        durationInFrames={TIMINGS.act4.end - TIMINGS.act4.start}
        premountFor={30}
      >
        <Act4_GitHubAndExample />
      </Sequence>
    </AbsoluteFill>
  );
};
