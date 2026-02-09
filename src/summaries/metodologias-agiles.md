# Metodologias Agiles - Guia Completa para Principiantes

> Como trabajan los equipos de desarrollo profesionales: roles, sprints, tareas, y herramientas.

---

## Tabla de Contenidos

1. [Que son las Metodologias Agiles?](#1-que-son-las-metodologias-agiles)
2. [El Manifiesto Agil](#2-el-manifiesto-agil)
3. [Scrum, Kanban y XP](#3-scrum-kanban-y-xp)
4. [Roles del Equipo Scrum](#4-roles-del-equipo-scrum)
5. [Que es un Sprint?](#5-que-es-un-sprint)
6. [Ceremonias Scrum](#6-ceremonias-scrum)
7. [Product Backlog vs Sprint Backlog](#7-product-backlog-vs-sprint-backlog)
8. [Historias de Usuario (User Stories)](#8-historias-de-usuario-user-stories)
9. [Estimacion: Story Points y Planning Poker](#9-estimacion-story-points-y-planning-poker)
10. [Definition of Done (DoD)](#10-definition-of-done-dod)
11. [GitHub Projects: Gestion de Proyectos](#11-github-projects-gestion-de-proyectos)
12. [GitHub Issues: Crear y Gestionar Tareas](#12-github-issues-crear-y-gestionar-tareas)
13. [Ejemplo Practico Completo](#13-ejemplo-practico-completo)

---

## 1. Que son las Metodologias Agiles?

Imaginate que te piden construir una casa. La forma **tradicional** (cascada/waterfall) seria: hacer TODO el plano completo, luego TODO el cemento, luego TODAS las paredes, luego TODO el techo... y al final entregas la casa. Si el cliente queria algo diferente, ya es tarde.

La forma **agil** es: construyes una habitacion completa y funcional, se la muestras al cliente, el te da feedback, y con eso construyes la siguiente habitacion. Asi, **entregas valor constantemente** y puedes adaptarte a cambios.

```
WATERFALL (Cascada):
Requisitos --> Diseno --> Desarrollo --> Testing --> Entrega
    6 meses de trabajo... y rezar que al cliente le guste

AGILE:
Sprint 1 --> Entrega pequena --> Feedback
Sprint 2 --> Entrega pequena --> Feedback
Sprint 3 --> Entrega pequena --> Feedback
...cada 2 semanas hay algo funcional
```

### Por que existe Agile?

En los 90s, el **70% de los proyectos de software fallaban**. Los equipos pasaban meses planificando todo al detalle, pero cuando entregaban, el cliente decia: "esto no es lo que queria". El problema era que **los requisitos cambian** constantemente y no puedes predecir todo desde el inicio.

---

## 2. El Manifiesto Agil

En febrero de 2001, 17 desarrolladores se reunieron en Snowbird, Utah, y crearon el **Manifiesto Agil** con 4 valores fundamentales:

### Los 4 Valores

| Valoramos mas...                          | ...sobre esto                        |
|-------------------------------------------|--------------------------------------|
| **Individuos e interacciones**            | Procesos y herramientas              |
| **Software funcionando**                  | Documentacion extensiva              |
| **Colaboracion con el cliente**           | Negociacion contractual              |
| **Respuesta ante el cambio**              | Seguir un plan rigido                |

> Los elementos de la derecha tienen valor, pero valoramos **mas** los de la izquierda.

### Los 12 Principios (resumidos)

| #  | Principio                                                                    |
|----|-----------------------------------------------------------------------------|
| 1  | Satisfacer al cliente con **entregas tempranas y continuas**                 |
| 2  | **Aceptar cambios** en los requisitos, incluso tarde en el desarrollo        |
| 3  | Entregar software funcionando **frecuentemente** (semanas, no meses)         |
| 4  | Negocio y desarrolladores trabajan **juntos diariamente**                    |
| 5  | Construir proyectos con personas **motivadas** y darles confianza            |
| 6  | La comunicacion mas efectiva es **cara a cara**                              |
| 7  | **Software funcionando** es la medida principal de progreso                  |
| 8  | Promover un ritmo de desarrollo **sostenible** (no crunches)                 |
| 9  | Atencion continua a la **excelencia tecnica**                                |
| 10 | **Simplicidad**: maximizar el trabajo NO realizado                           |
| 11 | Las mejores soluciones emergen de **equipos autoorganizados**                |
| 12 | El equipo **reflexiona y mejora** regularmente                               |

---

## 3. Scrum, Kanban y XP

Existen varias metodologias agiles. Las 3 mas usadas son:

### Scrum (La mas popular)

```
Product Backlog --> Sprint Planning --> Sprint (2 semanas) --> Review --> Retro
                                           |
                                     Daily Standup
                                     (cada dia)
```

- Divide el trabajo en **Sprints** (iteraciones de 1-4 semanas)
- Roles definidos: Product Owner, Scrum Master, Dev Team
- Ceremonias estructuradas (reuniones con proposito)
- Cada Sprint produce un **incremento funcional** del producto

### Kanban (Flujo continuo)

Kanban significa **"senal visual"** en japones. Se basa en un tablero visual:

```
|  TO DO   | IN PROGRESS |  REVIEW  |   DONE   |
|----------|-------------|----------|----------|
| Tarea 5  | Tarea 3     | Tarea 2  | Tarea 1  |
| Tarea 6  | Tarea 4     |          |          |
| Tarea 7  |             |          |          |
|          |  MAX: 3     |  MAX: 2  |          |
```

- **Visualizar** el flujo de trabajo en un tablero
- **Limitar el WIP** (Work In Progress) - no hacer demasiadas cosas a la vez
- **No hay sprints** fijos, el flujo es continuo
- Ideal para equipos de soporte o mantenimiento

![Tablero Kanban](https://upload.wikimedia.org/wikipedia/commons/b/b4/Abstract_Kanban_Board.svg)

### Extreme Programming (XP)

- **Pair Programming**: dos programadores en una computadora
- **TDD** (Test-Driven Development): escribir tests ANTES del codigo
- **Integracion continua**: integrar codigo frecuentemente
- **Refactoring**: mejorar codigo sin cambiar su comportamiento
- Releases pequenos y frecuentes

### Cual usar?

| Situacion                          | Recomendacion |
|-----------------------------------|---------------|
| Equipo nuevo aprendiendo Agile    | **Scrum**     |
| Soporte / mantenimiento continuo  | **Kanban**    |
| Proyecto con requisitos cambiantes| **Scrum**     |
| Equipo muy tecnico y disciplinado | **XP**        |
| Quieres combinar                  | **Scrumban**  |

> En la practica, muchos equipos usan una **combinacion** de Scrum + Kanban (llamada **Scrumban**): sprints de Scrum con el tablero visual de Kanban.

---

## 4. Roles del Equipo Scrum

Un equipo Scrum tiene **3 roles** fundamentales. El tamano ideal es de **3 a 9 desarrolladores** (sin contar PO y SM).

### Product Owner (PO) - "El Que"

El Product Owner es la **voz del cliente**. Define QUE se construye y en que orden.

```
Stakeholders / Clientes
         |
         v
  [Product Owner]  <-- Unica persona que decide QUE se construye
         |
         v
   Product Backlog (lista priorizada de funcionalidades)
         |
         v
   Development Team
```

**Responsabilidades:**
- Crear y **priorizar** el Product Backlog
- Comunicar la **vision** del producto al equipo
- **Representar** a los stakeholders (clientes, jefes, usuarios)
- Decidir que se construye y en que orden
- Aceptar o rechazar el trabajo del equipo
- Saber **decir "no"** a peticiones que no aportan valor

**Ejemplo real:** "Esta semana la prioridad es el sistema de login porque sin el, nadie puede usar la app. La pagina de perfil puede esperar al proximo sprint."

### Scrum Master (SM) - "El Como"

El Scrum Master es un **lider servicial**. No es un jefe, es un facilitador.

**Responsabilidades:**
- **Facilitar** las ceremonias Scrum
- **Eliminar impedimentos** que bloquean al equipo
- **Proteger** al equipo de interrupciones externas
- **Coaching** del proceso Scrum a todo el equipo
- Promover la **mejora continua**
- Asegurar que se siguen las practicas agiles

**Ejemplo real:** "El equipo necesita acceso a la base de datos de staging y nadie responde. El SM habla con el equipo de infraestructura y lo resuelve para que los devs no pierdan tiempo."

> **NO es un jefe.** No asigna tareas. No toma decisiones tecnicas. No dice a nadie que hacer.

### Development Team (Devs) - "Quienes lo construyen"

El equipo de desarrollo son los profesionales que **construyen** el producto.

**Responsabilidades:**
- Decidir **como** construir los items del Sprint
- **Estimar** el esfuerzo de las tareas
- **Entregar** incrementos funcionales cada Sprint
- **Autoorganizarse** - ellos deciden como dividir el trabajo
- Mantener la **calidad** del codigo

**Composicion tipica:**
- Frontend developers
- Backend developers
- QA / Testers
- Disenadores UX/UI
- DevOps (a veces)

> El equipo es **multifuncional**: colectivamente tiene todas las habilidades necesarias para entregar el producto.

### Diagrama del Equipo

```
                    STAKEHOLDERS
                    (Clientes, Jefes, Usuarios)
                         |
                         | feedback / requisitos
                         v
                  +--------------+
                  | Product Owner|  <-- Define QUE construir
                  +--------------+
                         |
                         | Product Backlog
                         v
+---------------------------------------------------+
|                  SCRUM TEAM                        |
|                                                    |
|   +---------------+     +----------------------+  |
|   | Scrum Master  | --> | Development Team     |  |
|   | (Facilitador) |     | - Frontend devs      |  |
|   +---------------+     | - Backend devs       |  |
|         |               | - QA / Testers       |  |
|         |               | - Disenadores        |  |
|         v               +----------------------+  |
|   Elimina bloqueos            |                    |
|   Facilita ceremonias         | Construye el       |
|   Protege al equipo           | producto           |
+---------------------------------------------------+
                         |
                         v
                   INCREMENTO
                (Software funcionando)
```

---

## 5. Que es un Sprint?

Un Sprint es un **periodo de tiempo fijo** (time-box) donde el equipo trabaja para completar un conjunto definido de tareas.

### Caracteristicas

| Aspecto          | Detalle                                           |
|-----------------|---------------------------------------------------|
| **Duracion**    | 1 a 4 semanas (lo mas comun: **2 semanas**)       |
| **Es fijo**     | Una vez empezado, la duracion NO cambia            |
| **Tiene meta**  | Cada Sprint tiene un **Sprint Goal** claro         |
| **Entregable**  | Produce un incremento **potencialmente desplegable**|
| **Consecutivo** | Un Sprint empieza inmediatamente despues del otro  |

### Ciclo de un Sprint

```
 Dia 1                                                      Dia 10
  |                                                           |
  v                                                           v
+--------+  +-------------------------------------------+  +--------+  +--------+
| Sprint |  |            DESARROLLO                     |  | Sprint |  | Sprint |
| Plann. |  |                                           |  | Review |  | Retro  |
| (2h)   |  |  Daily   Daily   Daily   Daily   Daily    |  | (1h)   |  | (1h)   |
|        |  | Standup Standup Standup Standup Standup ... |  |        |  |        |
+--------+  |  (15m)  (15m)  (15m)   (15m)  (15m)      |  +--------+  +--------+
             +-------------------------------------------+
                                                                          |
                                                           Siguiente Sprint -->
```

### Por que 2 semanas?

- **Suficiente tiempo** para completar trabajo significativo
- **Suficientemente corto** para obtener feedback rapido
- Equilibra **planificacion vs ejecucion**
- El 59% de los equipos lo prefieren (segun encuestas de la industria)

### Reglas importantes

1. **No se agregan tareas** a mitad del Sprint (salvo emergencias)
2. **No se cambia el Sprint Goal** una vez empezado
3. **Solo el PO** puede cancelar un Sprint (situacion extrema)
4. Si una tarea no se termina, **vuelve al Product Backlog**

---

## 6. Ceremonias Scrum

Las ceremonias (o "eventos") son reuniones con proposito especifico que crean el ritmo de Scrum.

### 6.1 Sprint Planning (Planificacion del Sprint)

| | |
|---|---|
| **Cuando** | Primer dia del Sprint |
| **Duracion** | ~1 hora por semana de Sprint (Sprint de 2 semanas = 2h) |
| **Quienes** | Product Owner + Scrum Master + Dev Team |
| **Resultado** | Sprint Backlog + Sprint Goal |

**Como funciona:**

```
1. El PO presenta los items mas importantes del Product Backlog
                    |
                    v
2. El equipo pregunta, aclara dudas
                    |
                    v
3. El equipo estima y selecciona lo que puede completar
                    |
                    v
4. Se define el Sprint Goal:
   "Al final de este Sprint, un usuario podra registrarse y loguearse"
                    |
                    v
5. Se descomponen los items en tareas concretas
                    |
                    v
6. Se crea el Sprint Backlog
```

**Ejemplo de Sprint Goal:**
> "Al final de este Sprint, los usuarios pueden crear cuenta, iniciar sesion y ver su perfil."

### 6.2 Daily Standup (Scrum Diario)

| | |
|---|---|
| **Cuando** | Cada dia, misma hora, mismo lugar |
| **Duracion** | **15 minutos** maximo (en serio, 15) |
| **Quienes** | Dev Team (SM facilita si es necesario) |
| **Resultado** | Plan para las proximas 24 horas |

**Cada persona responde 3 preguntas:**

```
1. Que hice AYER que ayudo al Sprint Goal?
   "Ayer termine el endpoint de login y sus tests"

2. Que hare HOY para avanzar al Sprint Goal?
   "Hoy empiezo con el formulario de login en React"

3. Hay algun IMPEDIMENTO que me bloquee?
   "Si, necesito las credenciales de la API de email para el signup"
```

**Reglas:**
- Se hace **de pie** (para que sea rapido)
- **No es un reporte** al jefe - es coordinacion entre el equipo
- Si un tema necesita discusion larga, se agenda **despues** del daily
- **15 minutos**. Si te pasas, algo esta mal

### 6.3 Sprint Review (Revision del Sprint)

| | |
|---|---|
| **Cuando** | Ultimo dia del Sprint |
| **Duracion** | 30-60 minutos |
| **Quienes** | Equipo Scrum + Stakeholders |
| **Resultado** | Feedback del cliente/stakeholders |

**Como funciona:**

```
1. El equipo DEMUESTRA funcionalidad real (no slides, no mockups)
   "Miren, aqui el usuario pone su email y password, clickea login,
    y el sistema le muestra su dashboard"

2. Los stakeholders prueban y dan FEEDBACK
   "Me gusta, pero necesitamos un boton de 'recordar password'"

3. Se ajustan prioridades del Product Backlog
   "OK, 'recordar password' se agrega al backlog con prioridad alta"
```

### 6.4 Sprint Retrospective (Retrospectiva)

| | |
|---|---|
| **Cuando** | Despues del Review, antes del siguiente Sprint |
| **Duracion** | 30-45 minutos |
| **Quienes** | Solo el Equipo Scrum (sin stakeholders) |
| **Resultado** | Acciones de mejora para el proximo Sprint |

**El equipo reflexiona sobre 3 preguntas:**

```
+---------------------------+---------------------------+---------------------------+
|     QUE SALIO BIEN?       |    QUE NO SALIO BIEN?     |   QUE PODEMOS MEJORAR?    |
+---------------------------+---------------------------+---------------------------+
| - Code reviews rapidos    | - Deploy fallo 2 veces    | - Agregar tests e2e al CI |
| - Buena comunicacion      | - Faltaron tests          | - Pair programming en     |
| - Sprint Goal cumplido    | - Daily muy largo (25m)   |   tareas complejas        |
| - Poco scope creep        | - PR reviews lentos       | - Timer para el daily     |
+---------------------------+---------------------------+---------------------------+

ACCION CONCRETA: "En el proximo Sprint, cada PR debe tener review en <24h"
```

> La retrospectiva es el **motor de mejora continua**. Sin ella, el equipo repite los mismos errores.

---

## 7. Product Backlog vs Sprint Backlog

### Product Backlog (Backlog del Producto)

Es la **lista maestra** de TODO lo que necesita el producto. Vive durante toda la vida del proyecto.

```
PRODUCT BACKLOG (lo gestiona el Product Owner)
================================================
Prioridad | Historia de Usuario                              | Estado
----------|--------------------------------------------------|--------
ALTA      | Como usuario quiero registrarme con email         | Sprint 1
ALTA      | Como usuario quiero iniciar sesion               | Sprint 1
ALTA      | Como usuario quiero ver mi perfil                | Sprint 1
MEDIA     | Como admin quiero ver lista de usuarios          | Sprint 2
MEDIA     | Como usuario quiero editar mi perfil             | Sprint 2
MEDIA     | Como usuario quiero recuperar mi password        | Sprint 2
BAJA      | Como usuario quiero modo oscuro                  | Futuro
BAJA      | Como usuario quiero notificaciones push          | Futuro
BAJA      | Como admin quiero exportar datos a CSV           | Futuro
```

**Caracteristicas:**
- Lo gestiona el **Product Owner**
- Esta **priorizado** (lo mas importante arriba)
- Es **dinamico** - cambia constantemente
- Los items de arriba estan mas **detallados** que los de abajo
- Existe **toda la vida** del proyecto

### Sprint Backlog (Backlog del Sprint)

Es el **subconjunto** del Product Backlog seleccionado para el Sprint actual, descompuesto en tareas.

```
SPRINT BACKLOG - Sprint 1 (lo gestiona el Dev Team)
=====================================================
Historia: "Como usuario quiero registrarme con email"
  [ ] Crear modelo User en la BD
  [ ] Crear endpoint POST /api/auth/signup
  [ ] Agregar validaciones (email, password min 6)
  [ ] Hash de password con bcrypt
  [ ] Crear formulario de Signup en React
  [ ] Conectar formulario con API
  [ ] Tests unitarios backend
  [ ] Tests del componente frontend

Historia: "Como usuario quiero iniciar sesion"
  [ ] Crear endpoint POST /api/auth/login
  [ ] Generar JWT token en respuesta
  [ ] Crear formulario de Login en React
  [ ] Guardar token en localStorage
  [ ] Redirigir al home despues del login
  [ ] Tests

Sprint Goal: "Los usuarios pueden registrarse e iniciar sesion"
```

**Caracteristicas:**
- Lo gestiona el **equipo de desarrollo**
- Solo existe durante **un Sprint**
- Tareas **muy detalladas** y concretas
- **Relativamente fijo** durante el Sprint

### Relacion Visual

```
+------------------------------------------+
|           PRODUCT BACKLOG                |
|        (TODO lo del producto)            |
|                                          |
|  +------------------------------------+  |
|  |        SPRINT BACKLOG              |  |
|  |   (lo que hacemos ESTE Sprint)     |  |
|  |                                    |  |
|  |   Historia A --> tarea, tarea      |  |
|  |   Historia B --> tarea, tarea      |  |
|  |   Historia C --> tarea, tarea      |  |
|  +------------------------------------+  |
|                                          |
|  Historia D (proximo sprint)             |
|  Historia E (proximo sprint)             |
|  Historia F (futuro)                     |
|  Historia G (futuro)                     |
|  ...                                     |
+------------------------------------------+
```

---

## 8. Historias de Usuario (User Stories)

Las historias de usuario son la forma en que describimos funcionalidades **desde la perspectiva del usuario**.

### Formato

```
Como [tipo de usuario],
quiero [accion / funcionalidad],
para [beneficio / valor que obtengo].
```

### Por que este formato?

Cada parte responde una pregunta clave:

```
QUIEN? --> Como [usuario registrado]
QUE?   --> quiero [cambiar mi password]
POR QUE? --> para [mantener mi cuenta segura]
```

El **"para"** es lo mas importante: si no puedes explicar el valor, quizas no vale la pena construirlo.

### Ejemplos para nuestro proyecto (template-full-stack)

**Autenticacion:**
```
Como visitante del sitio,
quiero registrarme con email, username y password,
para poder acceder a las funcionalidades protegidas de la app.
```

```
Como usuario registrado,
quiero iniciar sesion con mi email y password,
para acceder a mi cuenta y datos personales.
```

```
Como usuario logueado,
quiero que mi sesion persista al recargar la pagina,
para no tener que iniciar sesion cada vez que entro.
```

```
Como usuario logueado,
quiero cerrar sesion con un boton en la navbar,
para proteger mi cuenta en computadoras compartidas.
```

**Rutas protegidas:**
```
Como usuario no autenticado,
quiero ser redirigido al login si intento acceder a una ruta protegida,
para entender que necesito una cuenta para ver ese contenido.
```

**Perfil:**
```
Como usuario logueado,
quiero ver mi perfil con mi email y username,
para verificar que mis datos son correctos.
```

**Administracion:**
```
Como administrador,
quiero ver una lista de todos los usuarios registrados,
para gestionar la plataforma y detectar cuentas sospechosas.
```

### Criterios de Aceptacion

Cada historia necesita **criterios de aceptacion**: condiciones especificas que deben cumplirse para considerar la historia "terminada".

```
Historia: Como visitante, quiero registrarme con email y password

Criterios de Aceptacion:
  - El formulario tiene campos: email, username, password
  - El email debe ser valido (contener @)
  - El password debe tener minimo 6 caracteres
  - Si el email ya existe, muestra error "Email ya registrado"
  - Si el registro es exitoso, el usuario queda logueado automaticamente
  - Despues del registro exitoso, redirige al home
  - El password se guarda hasheado con bcrypt (nunca en texto plano)
```

### Criterios INVEST

Una buena historia de usuario cumple con **INVEST**:

| Letra | Significado     | Explicacion                                      |
|-------|----------------|--------------------------------------------------|
| **I** | Independiente   | No depende de otras historias para funcionar      |
| **N** | Negociable      | Se puede discutir y ajustar, no es un contrato   |
| **V** | Valiosa         | Aporta valor real al usuario o al negocio         |
| **E** | Estimable       | El equipo puede estimar cuanto esfuerzo requiere  |
| **S** | Small (Pequena) | Es lo suficientemente pequena para caber en 1 Sprint |
| **T** | Testeable       | Se puede verificar que esta completa y funciona   |

---

## 9. Estimacion: Story Points y Planning Poker

### Que son los Story Points?

Los Story Points son una forma de **estimar la dificultad relativa** de una tarea. NO representan horas ni dias.

Miden 3 cosas combinadas:
- **Complejidad**: Que tan dificil es tecnicamente?
- **Esfuerzo**: Cuanto trabajo implica?
- **Incertidumbre**: Cuanto riesgo/desconocido hay?

### Secuencia de Fibonacci

Se usa la secuencia de Fibonacci para los valores: **1, 2, 3, 5, 8, 13, 21**

```
POR QUE FIBONACCI?

La secuencia:  1  2  3  5  8  13  21
Los saltos:      +1 +1 +2 +3  +5  +8

A medida que la tarea es mas grande, la INCERTIDUMBRE crece.
No tiene sentido diferenciar entre un "21" y un "22".
Los saltos reflejan esa imprecision natural.
```

### Tabla de Referencia

| Points | Dificultad                  | Ejemplo en nuestro proyecto                  |
|--------|-----------------------------|----------------------------------------------|
| **1**  | Trivial, minutos            | Cambiar texto de un boton                    |
| **2**  | Simple, pocas horas         | Agregar un campo al modelo User               |
| **3**  | Moderada, medio dia         | Crear endpoint GET /api/auth/me               |
| **5**  | Compleja, 1-2 dias          | Implementar login completo (back+front)       |
| **8**  | Muy compleja, casi 1 semana | Sistema de recuperacion de password            |
| **13** | Enorme, deberia dividirse   | Sistema completo de roles y permisos           |
| **21** | Demasiado grande, DIVIDIR   | Integracion con OAuth (Google, GitHub, etc.)   |

### Planning Poker

El Planning Poker es un juego de estimacion en equipo:

```
PASO 1: El PO lee la historia de usuario
        "Como usuario quiero recuperar mi password por email"

PASO 2: El equipo discute y hace preguntas
        "Necesitamos un servicio de email?"
        "Tiene que funcionar en movil?"

PASO 3: Cada uno elige su carta EN SECRETO
        Ana: [5]  Carlos: [8]  Maria: [5]  Pedro: [13]

PASO 4: Todos revelan AL MISMO TIEMPO
        Ana: 5  |  Carlos: 8  |  Maria: 5  |  Pedro: 13

PASO 5: Los extremos EXPLICAN su razonamiento
        Pedro (13): "Nunca hemos integrado un servicio de email,
                     hay mucha incertidumbre"
        Ana (5):    "Podemos usar SendGrid, ya lo he hecho antes,
                     no es tan complicado"

PASO 6: Se RE-ESTIMA hasta llegar a consenso
        Ana: 8  |  Carlos: 8  |  Maria: 8  |  Pedro: 8
        Consenso: 8 puntos
```

**Por que funciona:**
- **Evita el sesgo de anclaje** (nadie copia al primero que habla)
- **Las diferencias revelan riesgos** que nadie habia considerado
- Usa la **inteligencia colectiva** del equipo

---

## 10. Definition of Done (DoD)

La Definition of Done es un **checklist compartido** por todo el equipo que define cuando una tarea esta REALMENTE terminada.

### Por que es importante?

Sin DoD, "terminado" significa algo diferente para cada persona:
- Dev: "Escribi el codigo"
- QA: "Pero no tiene tests"
- PO: "Pero no lo puedo probar en staging"
- DevOps: "Pero no pasa el CI/CD"

### Ejemplo de DoD para nuestro proyecto

```
DEFINITION OF DONE - Checklist
================================

CODIGO:
  [x] El codigo cumple con el linter (ESLint / flake8)
  [x] No hay warnings ni errores del compilador
  [x] Code Review aprobado por al menos 1 companero

TESTING:
  [x] Tests unitarios escritos y pasando
  [x] Tests de integracion si aplica
  [x] Pruebas manuales realizadas en staging

DOCUMENTACION:
  [x] Codigo documentado donde sea necesario
  [x] README actualizado si hay cambios de config

DESPLIEGUE:
  [x] Pipeline de CI/CD pasa completamente
  [x] Funciona en el ambiente de staging
  [x] No hay regresiones (nada que funcionaba se rompio)

PRODUCTO:
  [x] Criterios de aceptacion de la historia cumplidos
  [x] Product Owner ha revisado y aprobado
```

### DoD vs Criterios de Aceptacion

| | Definition of Done | Criterios de Aceptacion |
|---|---|---|
| **Alcance** | Aplica a TODAS las historias | Aplica a UNA historia especifica |
| **Tipo** | Estandares de **calidad** | Requisitos **funcionales** |
| **Ejemplo** | "Code review aprobado" | "El login acepta email y password" |
| **Quien** | El equipo Scrum | El Product Owner |

---

## 11. GitHub Projects: Gestion de Proyectos

GitHub Projects es la herramienta integrada de GitHub para gestionar proyectos agiles directamente junto a tu codigo.

### Paso 1: Crear un Proyecto

```
1. Ve a tu perfil de GitHub o a tu organizacion
2. Click en la pestana "Projects"
3. Click en "New project"
4. Elige una plantilla:
   - Table  (vista de hoja de calculo)
   - Board  (vista Kanban - RECOMENDADA para empezar)
   - Roadmap (vista de timeline)
5. Ponle nombre: "Sprint Board - Mi Proyecto"
6. Click en "Create project"
```

### Paso 2: Configurar Columnas del Board

Para un tablero Scrum basico, configura estas columnas:

```
|  BACKLOG  |   TO DO   | IN PROGRESS |  IN REVIEW  |    DONE    |
|-----------|-----------|-------------|-------------|------------|
| Historias | Tareas    | Trabajando  | Esperando   | Completado |
| futuras   | del Sprint| activamente | code review |            |
|           | actual    |             |             |            |
```

### Paso 3: Campos Personalizados

Agrega campos para gestionar tu Sprint:

| Campo           | Tipo            | Valores                            |
|----------------|-----------------|-------------------------------------|
| **Priority**    | Single Select   | Alta, Media, Baja                   |
| **Story Points**| Number          | 1, 2, 3, 5, 8, 13...               |
| **Sprint**      | Iteration       | Sprint 1, Sprint 2, Sprint 3...     |
| **Type**        | Single Select   | Feature, Bug, Chore, Spike          |
| **Assignee**    | Default field   | Miembros del equipo                 |

**Para crear un campo de Iteracion (Sprint):**

```
1. En vista de tabla, click en "+" (nuevo campo)
2. Nombre: "Sprint"
3. Tipo: "Iteration"
4. Duracion: 2 semanas
5. Fecha de inicio: [fecha del primer Sprint]
6. Las iteraciones futuras se generan automaticamente
```

### Paso 4: Crear Vistas

Puedes tener multiples vistas del mismo proyecto:

```
Vista 1: "Sprint Board" (Board)
  - Agrupado por Status
  - Filtrado por Sprint actual

Vista 2: "Todo el Backlog" (Table)
  - Sin filtros
  - Ordenado por prioridad

Vista 3: "Roadmap" (Roadmap)
  - Timeline por Sprint
  - Para ver el panorama general

Vista 4: "Mi trabajo" (Table)
  - Filtrado por Assignee = yo
```

### Paso 5: Automatizaciones

GitHub Projects tiene automatizaciones integradas:

```
Automatizacion 1: Cuando un Issue se abre --> moverlo a "Backlog"
Automatizacion 2: Cuando un PR se linkea  --> moverlo a "In Progress"
Automatizacion 3: Cuando un PR se mergea  --> moverlo a "Done"
Automatizacion 4: Cuando un Issue se cierra --> moverlo a "Done"
```

Para configurarlas:
1. En el proyecto, click en "..." (menu) > "Workflows"
2. Activa los workflows deseados

---

## 12. GitHub Issues: Crear y Gestionar Tareas

Los Issues de GitHub son las **tareas** de tu proyecto. Cada historia de usuario se convierte en un Issue.

### Crear un Issue (Historia de Usuario)

```
Titulo: [Feature] Registro de usuario con email y password

Descripcion:
## Historia de Usuario
Como visitante del sitio,
quiero registrarme con email, username y password,
para poder acceder a las funcionalidades protegidas.

## Criterios de Aceptacion
- [ ] Formulario con campos: email, username, password
- [ ] Validacion: email valido, password minimo 6 caracteres
- [ ] Si email ya existe, error "Email ya registrado"
- [ ] Registro exitoso -> auto-login -> redirigir a home
- [ ] Password hasheado con bcrypt

## Tareas Tecnicas
- [ ] Backend: modelo User + endpoint POST /signup
- [ ] Backend: validaciones y hash bcrypt
- [ ] Frontend: componente SignupForm
- [ ] Frontend: conectar con API + manejar errores
- [ ] Tests unitarios backend
- [ ] Tests componente frontend

## Notas
Referencia: auth.md seccion de Signup
```

### Labels (Etiquetas)

Las etiquetas categorizan tus issues:

```
LABELS RECOMENDADAS PARA SCRUM:

Tipo:
  feature     (verde)    - Nueva funcionalidad
  bug         (rojo)     - Algo no funciona
  chore       (gris)     - Tarea tecnica / mantenimiento
  docs        (azul)     - Documentacion
  spike       (morado)   - Investigacion / prototipo

Prioridad:
  priority: critical  (rojo oscuro)
  priority: high      (naranja)
  priority: medium    (amarillo)
  priority: low       (azul claro)

Area:
  frontend    (cyan)
  backend     (azul)
  database    (verde oscuro)
  devops      (naranja)

Estado:
  blocked     (rojo)     - Esperando algo externo
  in-review   (morado)   - En code review
  needs-info  (amarillo) - Falta informacion
```

### Milestones (Hitos)

Los Milestones agrupan issues por Sprint o release:

```
Milestone: "Sprint 1 - Auth MVP"
  Fecha limite: 2 semanas desde hoy
  Issues:
    [x] Registro de usuario        (5 pts)
    [x] Login de usuario           (5 pts)
    [ ] Pagina de perfil           (3 pts)
    [ ] PrivateRoute               (3 pts)
    [ ] Navbar con estado auth     (2 pts)
  ============================================
  Progreso: [=========>--------] 55% (3/5 cerrados)
  Total Story Points: 18
```

### Sub-Issues (Sub-tareas)

Puedes descomponer un Issue grande en sub-tareas:

```
Issue #1: Registro de usuario (Historia padre)
  |
  |-- Sub-issue #2: Crear modelo User en BD
  |-- Sub-issue #3: Endpoint POST /api/auth/signup
  |-- Sub-issue #4: Formulario Signup en React
  |-- Sub-issue #5: Conectar front con API
  |-- Sub-issue #6: Tests del signup
```

### Linkear Issues con Pull Requests

Cuando haces un PR, linkea el Issue para que se cierre automaticamente:

```
# En el mensaje del PR o commit:
Closes #1
Fixes #3
Resolves #5

# Esto cierra automaticamente el Issue cuando el PR se mergea
```

### Flujo Completo con Issues

```
1. PO crea Issues (Historias de Usuario) con labels y criterios
                    |
                    v
2. Sprint Planning: equipo selecciona Issues para el Sprint
   - Se asignan Assignees
   - Se estiman Story Points
   - Se asocian al Milestone del Sprint
                    |
                    v
3. Issues se agregan al GitHub Project Board
   Estado: "To Do"
                    |
                    v
4. Dev toma un Issue y crea una branch
   git checkout -b feature/signup
   Estado: "In Progress"
                    |
                    v
5. Dev termina, crea PR con "Closes #issue-number"
   Estado: "In Review"
                    |
                    v
6. Code Review aprobado --> Merge PR
   Issue se cierra automaticamente
   Estado: "Done"
```

---

## 13. Ejemplo Practico Completo

Vamos a simular un Sprint completo para nuestro proyecto template-full-stack.

### Sprint 0: Preparacion

**El Product Owner crea el Product Backlog:**

| # | Historia de Usuario | Prioridad | Points |
|---|---|---|---|
| 1 | Como visitante, quiero registrarme con email y password, para acceder a la app | Alta | 5 |
| 2 | Como usuario, quiero iniciar sesion, para acceder a mi cuenta | Alta | 5 |
| 3 | Como usuario logueado, quiero ver mi perfil, para verificar mis datos | Alta | 3 |
| 4 | Como usuario, quiero que rutas protegidas me redirijan al login, para saber que necesito cuenta | Alta | 3 |
| 5 | Como usuario, quiero una navbar que muestre mi estado de login, para saber si estoy autenticado | Media | 2 |
| 6 | Como usuario, quiero cerrar sesion, para proteger mi cuenta | Media | 1 |
| 7 | Como usuario, quiero que mi sesion persista al recargar, para no logearme cada vez | Media | 3 |
| 8 | Como admin, quiero ver todos los usuarios, para gestionar la plataforma | Media | 5 |
| 9 | Como usuario, quiero recuperar mi password por email, para no perder acceso | Baja | 8 |
| 10 | Como usuario, quiero editar mi perfil, para mantener mis datos actualizados | Baja | 5 |

### Sprint 1: Planning

**Sprint Goal:** "Los usuarios pueden registrarse, iniciar sesion y navegar rutas protegidas"

**Issues seleccionados:** #1, #2, #4, #5, #6 = **16 Story Points**

```
SPRINT 1 BOARD
|  TO DO            |  IN PROGRESS  |  IN REVIEW  |  DONE  |
|-------------------|---------------|-------------|--------|
| #1 Signup    (5)  |               |             |        |
| #2 Login     (5)  |               |             |        |
| #4 Private   (3)  |               |             |        |
| #5 Navbar    (2)  |               |             |        |
| #6 Logout    (1)  |               |             |        |
```

### Sprint 1: Dia a dia

**Dia 1 - Daily:**
```
Ana:    "Hoy empiezo con #1 (Signup backend)"
Carlos: "Hoy empiezo con #2 (Login backend)"
Maria:  "Hoy preparo la estructura del frontend (store, routes)"
```

**Dia 3 - Daily:**
```
Ana:    "Termine signup backend. Hoy empiezo signup frontend"
Carlos: "Termine login backend. Hoy empiezo login frontend"
Maria:  "Store y PrivateRoute listos. Empiezo navbar"
        Impedimento: "Necesito definir los colores del navbar con diseno"
```

**Dia 7 - Daily:**
```
Ana:    "Signup completo, PR abierto para review"
Carlos: "Login completo, PR abierto para review"
Maria:  "Navbar y logout listos. Reviso PRs de Ana y Carlos"
```

### Sprint 1: Review

```
DEMO al Product Owner y Stakeholders:
1. "Miren, aqui registro un usuario nuevo..." (funciona!)
2. "Ahora inicio sesion..." (funciona!)
3. "Si intento ir a /dashboard sin login, me redirige..." (funciona!)
4. "En la navbar se ve mi username y el boton de logout..." (funciona!)
5. "Al hacer logout, desaparece mi username..." (funciona!)

PO: "Excelente! Para el proximo Sprint necesitamos la pagina de perfil
     y la persistencia de sesion"
```

### Sprint 1: Retrospectiva

```
QUE SALIO BIEN?              QUE NO SALIO BIEN?         QUE MEJORAR?
- Terminamos todo el Sprint  - PRs tardaron 2 dias       - Revisar PRs en <24h
- Buena division del trabajo - Faltaron tests e2e        - Agregar tests e2e al DoD
- Zero bugs en la demo       - Daily se paso de 15 min   - Usar timer de 15 min

ACCION: "Regla de <24h para code reviews en Sprint 2"
```

### Sprint 2: Planning

**Sprint Goal:** "Los usuarios pueden ver su perfil y su sesion persiste al recargar"

**Issues seleccionados:** #3, #7, #8 = **11 Story Points**

(Y el ciclo continua...)

---

## Diagrama Visual: El Ciclo Scrum Completo

![Proceso Scrum](https://upload.wikimedia.org/wikipedia/commons/5/58/Scrum_process.svg)

```
+------------------------------------------------------------------+
|                     CICLO SCRUM COMPLETO                         |
|                                                                  |
|   PRODUCT        SPRINT         SPRINT        SPRINT    SPRINT   |
|   BACKLOG  --->  PLANNING  -->  (2 sem)  -->  REVIEW -> RETRO   |
|     |                            |    |                   |      |
|     |                          Daily  Daily               |      |
|     |                         Standup Standup              |      |
|     |                          (15m)  (15m)               |      |
|     |                                                     |      |
|     |<--- Items no terminados vuelven ---|                |      |
|     |<--- Nuevos items del feedback -----|                |      |
|     |<--- Mejoras del proceso ----------------------------|      |
|                                                                  |
|   Resultado: INCREMENTO (software funcionando)                   |
+------------------------------------------------------------------+
        |
        | Siguiente Sprint empieza inmediatamente
        v
      REPETIR
```

---

## Resumen Final

| Concepto | Definicion rapida |
|---|---|
| **Agile** | Filosofia de trabajo iterativa e incremental |
| **Scrum** | Framework agil con sprints, roles y ceremonias |
| **Sprint** | Periodo fijo de 2 semanas para completar trabajo |
| **Product Owner** | Define QUE construir (prioriza el backlog) |
| **Scrum Master** | Facilita el proceso (elimina bloqueos) |
| **Dev Team** | Construye el producto (autoorganizado) |
| **Product Backlog** | Lista de TODO lo que necesita el producto |
| **Sprint Backlog** | Tareas seleccionadas para ESTE Sprint |
| **User Story** | "Como [usuario] quiero [accion] para [beneficio]" |
| **Story Points** | Estimacion relativa de dificultad (Fibonacci) |
| **DoD** | Checklist de cuando algo esta REALMENTE terminado |
| **Daily Standup** | Reunion diaria de 15 min (que hice, que hare, bloqueos) |
| **Sprint Review** | Demo de lo construido al final del Sprint |
| **Retrospectiva** | Reflexion del equipo: que mejorar? |
| **GitHub Projects** | Tablero Kanban integrado con tu codigo |
| **GitHub Issues** | Tareas/historias con labels, milestones y assignees |

---

> **Recuerda:** Agile no es un conjunto rigido de reglas. Es una **mentalidad** de entregar valor constantemente, adaptarse al cambio y mejorar como equipo. Empieza simple, experimenta, y adapta el proceso a lo que funcione para tu equipo.
