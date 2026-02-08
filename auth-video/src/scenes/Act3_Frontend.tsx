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
import { codeSnippets } from '../data/codeSnippets';
import { TIMINGS } from '../data/timings';
import { theme } from '../styles/theme';

export const Act3_Frontend: React.FC = () => {
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
            ⚛️
          </div>
          <AnimatedTitle
            text="Frontend: React"
            subtitle="Store, Servicios, Paginas y Rutas Protegidas"
            color={theme.colors.jsx.keyword}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================= */}
      {/* Global Store (10-50s relativo)                                */}
      {/* ============================================================= */}
      <Sequence
        from={act3.globalStore.start - act3.start}
        durationInFrames={act3.globalStore.duration}
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
              text="Global Store"
              subtitle="Estado global de autenticacion"
              fontSize={theme.fontSizes.xl}
              color={theme.colors.jsx.hook}
            />

            <div style={{ marginTop: theme.spacing.xl }}>
              <AnimatedList
                items={[
                  'token: JWT guardado en localStorage',
                  'user: Datos del usuario logueado',
                  'isAuthenticated: Boolean true/false',
                  'action "login": Guarda token + user + localStorage',
                  'action "logout": Limpia todo',
                  'action "set_user": Actualiza datos del user',
                ]}
                icon="📦"
                delayBetweenItems={12}
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
                code={codeSnippets.globalStore}
                language="javascript"
                highlightLines={[4, 5, 6, 12, 13, 14, 15, 18, 19, 20]}
                animateLines
                durationInFrames={act3.globalStore.duration * 0.8}
                fontSize="18px"
                annotation="localStorage persiste la sesion aunque el usuario recargue la pagina"
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================= */}
      {/* Auth Service Frontend (50-90s relativo)                       */}
      {/* ============================================================= */}
      <Sequence
        from={act3.authServiceFront.start - act3.start}
        durationInFrames={act3.authServiceFront.duration}
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
            text="Auth Service (Frontend)"
            subtitle="Funciones que llaman a la API del backend"
            fontSize={theme.fontSizes.xl}
            color={theme.colors.jsx.function}
          />

          <div
            style={{
              flex: 1,
              display: 'flex',
              gap: theme.spacing.xl,
              marginTop: theme.spacing.sm,
            }}
          >
            {/* Codigo */}
            <div style={{ flex: 1.3, display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '100%' }}>
                <CodeBlock
                  code={codeSnippets.authServiceFront}
                  language="javascript"
                  highlightLines={[3, 5, 6, 8, 16, 18, 19, 29, 31]}
                  animateLines
                  durationInFrames={act3.authServiceFront.duration * 0.8}
                  fontSize="17px"
                  annotation="Patron [data, error]: siempre retorna tupla con datos o error"
                />
              </div>
            </div>

            {/* Explicacion lateral */}
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
                  'loginService: POST /api/auth/login',
                  'signupService: POST /api/auth/signup',
                  'getMeService: GET /api/auth/me + token',
                  'Patron tupla: [data, null] o [null, error]',
                  'Bearer token en header Authorization',
                ]}
                icon="🔗"
                delayBetweenItems={15}
                fontSize={theme.fontSizes.sm}
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================= */}
      {/* Login Page (90-130s relativo)                                 */}
      {/* ============================================================= */}
      <Sequence
        from={act3.loginPage.start - act3.start}
        durationInFrames={act3.loginPage.duration}
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
              text="Pagina de Login"
              subtitle="Formulario + dispatch al store"
              fontSize={theme.fontSizes.xl}
              color={theme.colors.primary}
            />

            <div style={{ marginTop: theme.spacing.xl }}>
              <AnimatedList
                items={[
                  '1. useState para email y password',
                  '2. handleSubmit previene default',
                  '3. Llama a loginService(form)',
                  '4. Si error -> alert(error)',
                  '5. Si OK -> dispatch({ type: "login" })',
                  '6. navigate("/") redirige al home',
                ]}
                icon="▶"
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
                code={codeSnippets.loginPage}
                language="jsx"
                highlightLines={[7, 9, 12, 13, 14, 15, 16]}
                animateLines
                durationInFrames={act3.loginPage.duration * 0.8}
                fontSize="20px"
                annotation="dispatch({ type: 'login' }) guarda token en store + localStorage"
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================= */}
      {/* Signup Page (130-160s relativo)                               */}
      {/* ============================================================= */}
      <Sequence
        from={act3.signupPage.start - act3.start}
        durationInFrames={act3.signupPage.duration}
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
              flex: 1.2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div style={{ width: '100%' }}>
              <CodeBlock
                code={codeSnippets.signupPage}
                language="jsx"
                highlightLines={[4, 8, 9, 12, 13, 14, 15]}
                animateLines
                durationInFrames={act3.signupPage.duration * 0.8}
                fontSize="20px"
                annotation="Despues de registrarse, auto-login: mismo dispatch que login"
              />
            </div>
          </div>

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
              text="Pagina de Signup"
              subtitle="Registro + auto-login inmediato"
              fontSize={theme.fontSizes.xl}
              color={theme.colors.http.post}
            />

            <div style={{ marginTop: theme.spacing.xl }}>
              <AnimatedList
                items={[
                  'Campos: email, username, password',
                  'Password minimo 6 caracteres',
                  'Llama a signupService(form)',
                  'Hace auto-login al registrarse',
                  'Mismo dispatch({ type: "login" })',
                  'Redirige al home automaticamente',
                ]}
                icon="✍️"
                delayBetweenItems={12}
                fontSize={theme.fontSizes.sm}
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================= */}
      {/* PrivateRoute (160-190s relativo)                              */}
      {/* ============================================================= */}
      <Sequence
        from={act3.privateRoute.start - act3.start}
        durationInFrames={act3.privateRoute.duration}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: theme.spacing.xxl,
            gap: theme.spacing.xl,
          }}
        >
          {/* Codigo PrivateRoute + routes */}
          <div
            style={{
              flex: 1.2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: theme.spacing.md,
            }}
          >
            <div
              style={{
                fontFamily: theme.fonts.sans,
                fontSize: theme.fontSizes.lg,
                color: theme.colors.auth.shield,
                fontWeight: theme.fontWeights.bold,
              }}
            >
              🛡️ PrivateRoute Component
            </div>
            <CodeBlock
              code={codeSnippets.privateRoute}
              language="jsx"
              highlightLines={[6, 7, 8, 11]}
              animateLines
              durationInFrames={act3.privateRoute.duration * 0.4}
              fontSize="20px"
            />

            <div
              style={{
                opacity: interpolate(
                  frame - (act3.privateRoute.start - act3.start),
                  [act3.privateRoute.duration * 0.35, act3.privateRoute.duration * 0.35 + 15],
                  [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                ),
              }}
            >
              <CodeBlock
                code={codeSnippets.routesConfig}
                language="jsx"
                highlightLines={[8, 9, 10]}
                startFrame={Math.floor(act3.privateRoute.duration * 0.4)}
                durationInFrames={act3.privateRoute.duration * 0.5}
                fontSize="18px"
                annotation="<PrivateRoute> envuelve las rutas que quieres proteger"
              />
            </div>
          </div>

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
              text="Proteger Rutas"
              subtitle="en React"
              fontSize={theme.fontSizes.xl}
              color={theme.colors.auth.shield}
            />

            <div style={{ marginTop: theme.spacing.xl }}>
              <AnimatedList
                items={[
                  'Recibe children como prop',
                  'Lee store.isAuthenticated',
                  'Si NO auth -> Navigate to /login',
                  'Si auth -> renderiza children',
                  'Envuelve rutas en routes.jsx',
                  '/demo requiere estar logueado',
                ]}
                icon="🛡️"
                delayBetweenItems={12}
                fontSize={theme.fontSizes.sm}
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================= */}
      {/* Layout + Navbar (190-220s relativo)                           */}
      {/* ============================================================= */}
      <Sequence
        from={act3.layoutNavbar.start - act3.start}
        durationInFrames={act3.layoutNavbar.duration}
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
            text="Layout + Navbar"
            subtitle="Validacion de token y UI reactiva"
            fontSize={theme.fontSizes.xl}
            color={theme.colors.secondary}
          />

          <div
            style={{
              display: 'flex',
              gap: theme.spacing.md,
              flex: 1,
              marginTop: theme.spacing.sm,
            }}
          >
            {/* Layout */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: theme.fonts.sans,
                  fontSize: theme.fontSizes.md,
                  color: theme.colors.secondary,
                  fontWeight: theme.fontWeights.bold,
                  marginBottom: theme.spacing.sm,
                }}
              >
                🔄 Layout: Validar token al cargar
              </div>
              <CodeBlock
                code={codeSnippets.layoutValidation}
                language="jsx"
                highlightLines={[5, 8, 10, 13]}
                animateLines
                durationInFrames={act3.layoutNavbar.duration * 0.6}
                fontSize="17px"
                annotation="useEffect valida token al cargar la app"
              />
            </div>

            {/* Navbar */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: theme.fonts.sans,
                  fontSize: theme.fontSizes.md,
                  color: theme.colors.jsx.component,
                  fontWeight: theme.fontWeights.bold,
                  marginBottom: theme.spacing.sm,
                  opacity: interpolate(
                    frame - (act3.layoutNavbar.start - act3.start),
                    [act3.layoutNavbar.duration * 0.25, act3.layoutNavbar.duration * 0.25 + 15],
                    [0, 1],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                  ),
                }}
              >
                🧭 Navbar: UI segun estado auth
              </div>
              <CodeBlock
                code={codeSnippets.navbarAuth}
                language="jsx"
                highlightLines={[6, 7, 11, 12, 13, 16, 17]}
                animateLines
                startFrame={Math.floor(act3.layoutNavbar.duration * 0.25)}
                durationInFrames={act3.layoutNavbar.duration * 0.65}
                fontSize="17px"
                annotation="isAuthenticated ? Username+Logout : Login+Signup"
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
