import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
} from 'remotion';
import { AnimatedTitle } from '../components/AnimatedTitle';
import { AnimatedList } from '../components/AnimatedList';
import { CodeBlock } from '../components/CodeBlock';
import { Terminal } from '../components/Terminal';
import { codeSnippets } from '../data/codeSnippets';
import { terminalCommands } from '../data/authData';
import { TIMINGS } from '../data/timings';
import { theme } from '../styles/theme';

export const Act2_Backend: React.FC = () => {
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
            ⚙️
          </div>
          <AnimatedTitle
            text="Backend: Flask + JWT"
            subtitle="Modelo, Configuracion, Servicio y Controlador"
            color={theme.colors.secondary}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================= */}
      {/* JWT Config en app.py (10-50s relativo)                        */}
      {/* ============================================================= */}
      <Sequence
        from={act2.jwtConfig.start - act2.start}
        durationInFrames={act2.jwtConfig.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: theme.spacing.xxl,
            gap: theme.spacing.xl,
          }}
        >
          {/* Explicacion */}
          <div
            style={{
              flex: 0.8,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <AnimatedTitle
              text="Configuracion JWT"
              subtitle="app.py - El punto de partida"
              fontSize={theme.fontSizes.xl}
              color={theme.colors.auth.key}
            />

            <div style={{ marginTop: theme.spacing.xl }}>
              <AnimatedList
                items={[
                  'JWT_SECRET_KEY: Clave secreta para firmar tokens',
                  'JWT_ACCESS_TOKEN_EXPIRES: Duracion del token (1h)',
                  'JWTManager(app): Inicializar JWT en Flask',
                  'Error handlers: expired, invalid, unauthorized',
                  'Todos devuelven status 401 con mensaje',
                ]}
                icon="⚙️"
                delayBetweenItems={15}
                fontSize={theme.fontSizes.sm}
              />
            </div>
          </div>

          {/* Codigo */}
          <div
            style={{
              flex: 1.2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div style={{ width: '100%' }}>
              <CodeBlock
                code={codeSnippets.jwtConfig}
                language="python"
                highlightLines={[2, 3, 4, 7, 8, 11, 12, 15, 16]}
                animateLines
                durationInFrames={act2.jwtConfig.duration * 0.8}
                fontSize={theme.fontSizes.codeSmall}
                annotation="La SECRET_KEY SIEMPRE debe estar en variables de entorno (.env)"
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================= */}
      {/* User Model (50-90s relativo)                                  */}
      {/* ============================================================= */}
      <Sequence
        from={act2.userModel.start - act2.start}
        durationInFrames={act2.userModel.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: theme.spacing.xxl,
            gap: theme.spacing.xl,
          }}
        >
          {/* Codigo del modelo */}
          <div
            style={{
              flex: 1.2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                marginBottom: theme.spacing.md,
                fontFamily: theme.fonts.sans,
                fontSize: theme.fontSizes.lg,
                color: theme.colors.primary,
                fontWeight: theme.fontWeights.bold,
              }}
            >
              📋 User Model (user.py)
            </div>
            <CodeBlock
              code={codeSnippets.userModel}
              language="python"
              highlightLines={[4, 5, 6, 7]}
              animateLines
              durationInFrames={act2.userModel.duration * 0.5}
              fontSize={theme.fontSizes.codeSmall}
              annotation="email y username son UNIQUE - la DB rechaza duplicados"
            />
          </div>

          {/* Explicacion + serialize */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: theme.spacing.lg,
            }}
          >
            <AnimatedList
              items={[
                'id: Primary key autoincremental',
                'email: String(120), unique, NOT NULL',
                'username: String(80), unique, NOT NULL',
                'password: String(256) para el hash bcrypt',
                'is_active: Boolean para desactivar sin borrar',
                'created_at: Fecha de creacion automatica',
              ]}
              icon="📌"
              delayBetweenItems={12}
              fontSize={theme.fontSizes.sm}
            />

            <div
              style={{
                opacity: interpolate(
                  frame - (act2.userModel.start - act2.start),
                  [act2.userModel.duration * 0.5, act2.userModel.duration * 0.5 + 15],
                  [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                ),
              }}
            >
              <CodeBlock
                code={codeSnippets.userSerialize}
                language="python"
                highlightLines={[]}
                startFrame={Math.floor(act2.userModel.duration * 0.5)}
                durationInFrames={act2.userModel.duration * 0.4}
                fontSize="20px"
                annotation="serialize() NUNCA incluye el password!"
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================= */}
      {/* Bcrypt detallado (90-120s relativo)                           */}
      {/* ============================================================= */}
      <Sequence
        from={act2.userModelBcrypt.start - act2.start}
        durationInFrames={act2.userModelBcrypt.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: theme.spacing.xxl,
            gap: theme.spacing.xl,
          }}
        >
          {/* Codigo bcrypt */}
          <div
            style={{
              flex: 1.2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                marginBottom: theme.spacing.md,
                fontFamily: theme.fonts.sans,
                fontSize: theme.fontSizes.lg,
                color: theme.colors.auth.lock,
                fontWeight: theme.fontWeights.bold,
              }}
            >
              🔒 Bcrypt: Hashear y Verificar Passwords
            </div>
            <CodeBlock
              code={codeSnippets.userModelBcrypt}
              language="python"
              highlightLines={[3, 4, 5, 9, 10, 11]}
              animateLines
              durationInFrames={act2.userModelBcrypt.duration * 0.7}
              annotation="bcrypt genera un salt unico por cada password hasheado"
            />
          </div>

          {/* Explicacion visual del proceso */}
          <div
            style={{
              flex: 0.8,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: theme.spacing.lg,
            }}
          >
            {/* Proceso set_password */}
            <div
              style={{
                backgroundColor: '#ff6b6b15',
                border: `2px solid ${theme.colors.auth.lock}`,
                borderRadius: theme.borderRadius.xl,
                padding: theme.spacing.lg,
                fontFamily: theme.fonts.sans,
              }}
            >
              <div style={{ fontSize: theme.fontSizes.md, color: theme.colors.auth.lock, fontWeight: theme.fontWeights.bold, marginBottom: theme.spacing.sm }}>
                set_password (Registro)
              </div>
              <AnimatedList
                items={[
                  '"miPassword123" -> bytes',
                  'bcrypt.gensalt() -> salt unico',
                  'bcrypt.hashpw() -> hash largo',
                  'Se guarda el hash en la DB',
                ]}
                icon="→"
                delayBetweenItems={12}
                fontSize={theme.fontSizes.xs}
              />
            </div>

            {/* Proceso check_password */}
            <div
              style={{
                backgroundColor: '#51cf6615',
                border: `2px solid ${theme.colors.auth.unlock}`,
                borderRadius: theme.borderRadius.xl,
                padding: theme.spacing.lg,
                fontFamily: theme.fonts.sans,
                opacity: interpolate(
                  frame - (act2.userModelBcrypt.start - act2.start),
                  [act2.userModelBcrypt.duration * 0.4, act2.userModelBcrypt.duration * 0.4 + 15],
                  [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                ),
              }}
            >
              <div style={{ fontSize: theme.fontSizes.md, color: theme.colors.auth.unlock, fontWeight: theme.fontWeights.bold, marginBottom: theme.spacing.sm }}>
                check_password (Login)
              </div>
              <AnimatedList
                items={[
                  'Password ingresado -> bytes',
                  'Hash almacenado -> bytes',
                  'bcrypt.checkpw() -> True/False',
                ]}
                icon="→"
                startFrame={Math.floor(act2.userModelBcrypt.duration * 0.4)}
                delayBetweenItems={12}
                fontSize={theme.fontSizes.xs}
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================= */}
      {/* AuthService Signup (120-160s relativo)                        */}
      {/* ============================================================= */}
      <Sequence
        from={act2.authServiceSignup.start - act2.start}
        durationInFrames={act2.authServiceSignup.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: theme.spacing.xxl,
            gap: theme.spacing.xl,
          }}
        >
          {/* Codigo signup */}
          <div
            style={{
              flex: 1.3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                marginBottom: theme.spacing.md,
                fontFamily: theme.fonts.sans,
                fontSize: theme.fontSizes.lg,
                color: theme.colors.http.post,
                fontWeight: theme.fontWeights.bold,
              }}
            >
              📝 AuthService.signup(data)
            </div>
            <CodeBlock
              code={codeSnippets.authServiceSignup}
              language="python"
              highlightLines={[5, 10, 15, 19, 20, 23]}
              animateLines
              durationInFrames={act2.authServiceSignup.duration * 0.7}
              fontSize="19px"
              annotation="4 pasos: validar -> verificar duplicados -> crear user -> generar token"
            />
          </div>

          {/* Pasos numerados */}
          <div
            style={{
              flex: 0.7,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <AnimatedList
              items={[
                '1. Validar campos obligatorios (400)',
                '2. Verificar duplicados email/username (409)',
                '3. Crear User + hashear password',
                '4. db.session.add() + commit()',
                '5. create_access_token(identity=id)',
                '6. Retornar { user, token }',
              ]}
              icon="📋"
              delayBetweenItems={15}
              fontSize={theme.fontSizes.sm}
            />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================= */}
      {/* AuthService Login (160-190s relativo)                         */}
      {/* ============================================================= */}
      <Sequence
        from={act2.authServiceLogin.start - act2.start}
        durationInFrames={act2.authServiceLogin.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: theme.spacing.xxl,
            gap: theme.spacing.xl,
          }}
        >
          {/* Pasos del login */}
          <div
            style={{
              flex: 0.7,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                marginBottom: theme.spacing.md,
                fontFamily: theme.fonts.sans,
                fontSize: theme.fontSizes.lg,
                color: theme.colors.http.get,
                fontWeight: theme.fontWeights.bold,
              }}
            >
              🔑 AuthService.login(data)
            </div>
            <AnimatedList
              items={[
                '1. Validar email y password presentes',
                '2. Buscar user por email (filter_by)',
                '3. Verificar cuenta activa (is_active)',
                '4. Comparar password (bcrypt.checkpw)',
                '5. Generar JWT y retornar',
              ]}
              icon="▶"
              delayBetweenItems={15}
              fontSize={theme.fontSizes.sm}
            />

            <div
              style={{
                marginTop: theme.spacing.lg,
                padding: theme.spacing.md,
                backgroundColor: '#f4433615',
                border: `1px solid ${theme.colors.error}`,
                borderRadius: theme.borderRadius.md,
                fontFamily: theme.fonts.sans,
                fontSize: theme.fontSizes.xs,
                color: theme.colors.error,
                opacity: interpolate(
                  frame - (act2.authServiceLogin.start - act2.start),
                  [act2.authServiceLogin.duration * 0.6, act2.authServiceLogin.duration * 0.6 + 15],
                  [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                ),
              }}
            >
              Seguridad: Siempre decir "Email o password incorrectos" sin especificar cual fallo
            </div>
          </div>

          {/* Codigo login */}
          <div
            style={{
              flex: 1.3,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div style={{ width: '100%' }}>
              <CodeBlock
                code={codeSnippets.authServiceLogin}
                language="python"
                highlightLines={[7, 8, 11, 14, 17, 18]}
                animateLines
                durationInFrames={act2.authServiceLogin.duration * 0.7}
                fontSize="20px"
                annotation="Mensaje generico de error por seguridad"
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================= */}
      {/* AuthController (190-220s relativo)                            */}
      {/* ============================================================= */}
      <Sequence
        from={act2.authController.start - act2.start}
        durationInFrames={act2.authController.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: theme.spacing.xxl,
            gap: theme.spacing.xl,
          }}
        >
          {/* Codigo del controlador */}
          <div
            style={{
              flex: 1.3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                marginBottom: theme.spacing.md,
                fontFamily: theme.fonts.sans,
                fontSize: theme.fontSizes.lg,
                color: theme.colors.primary,
                fontWeight: theme.fontWeights.bold,
              }}
            >
              🎮 Auth Controller (auth_controller.py)
            </div>
            <CodeBlock
              code={codeSnippets.authController}
              language="python"
              highlightLines={[3, 10, 17, 18, 20]}
              animateLines
              durationInFrames={act2.authController.duration * 0.7}
              fontSize="19px"
              annotation="Tres endpoints: /signup (publico), /login (publico), /me (protegido)"
            />
          </div>

          {/* Terminal con demo */}
          <div
            style={{
              flex: 0.7,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Terminal
              commands={[terminalCommands.signup, terminalCommands.login, terminalCommands.me]}
              startFrame={Math.floor(act2.authController.duration * 0.3)}
              title="Auth API Demo"
            />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================= */}
      {/* Proteger rutas (220-240s relativo)                            */}
      {/* ============================================================= */}
      <Sequence
        from={act2.protegerRutas.start - act2.start}
        durationInFrames={act2.protegerRutas.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: theme.spacing.xxl,
            gap: theme.spacing.xl,
          }}
        >
          {/* Codigo */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <AnimatedTitle
              text="Proteger Rutas"
              subtitle="@jwt_required() es tu guardian"
              fontSize={theme.fontSizes.xl}
              color={theme.colors.auth.shield}
            />
            <div style={{ marginTop: theme.spacing.lg }}>
              <CodeBlock
                code={codeSnippets.protegerRutas}
                language="python"
                highlightLines={[9, 10]}
                animateLines
                durationInFrames={act2.protegerRutas.duration * 0.7}
                annotation="Solo agrega @jwt_required() y la ruta queda protegida"
              />
            </div>
          </div>

          {/* Terminal mostrando 401 */}
          <div
            style={{
              flex: 0.8,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Terminal
              commands={[terminalCommands.unauthorized, terminalCommands.me]}
              startFrame={15}
              title="Sin Token vs Con Token"
            />
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
