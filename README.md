# Specialization_AT_JS_Results_Reporting

Cross-cutting infrastructure for the test automation framework — covering test reporting, code quality tooling, and CI/CD pipelines. Built on a **6-layer stack** running Playwright tests inside a Dockerized Jenkins environment on Windows 11 with WSL2.

---

## Branch Overview

| Branch | Description |
|--------|-------------|
| `main` | Spec (console) + HTML reporters with Playwright; report files excluded from Git |
| `feature/formatting` | Prettier + ESLint with custom rules; linting scripts for UI and API |
| `feature/ci-jenkins` | Jenkins CI/CD pipelines for UI and API tests; scheduled execution; reporter plugin |

---

## Branch: `main` — Test Reporting

### What it demonstrates
- **Spec reporter** — outputs real-time test results to the console during execution
- **HTML reporter** — generates a full visual report after each run, browseable offline
- Generated report directories (`playwright-report/`, `test-results/`) excluded from Git via `.gitignore`
- Report configuration defined directly in `playwright.config.ts`

### Reporter configuration

```typescript
// playwright.config.ts
reporter: [
  ['list'],           // Spec-style console output
  ['html', {
    outputFolder: 'playwright-report',
    open: 'never'     // Don't auto-open browser in CI
  }]
],
```

### View the HTML report

```bash
npm test
npx playwright show-report
```

---

## Branch: `feature/formatting` — Code Quality

### What it demonstrates
- **Prettier** configured for consistent formatting across the entire codebase
- **ESLint** with 4+ custom rules enforcing code quality standards
- Both linters integrated for UI and API projects
- Scripts added to `package.json` for CI and local use

### ESLint rules configured

| Rule | Purpose |
|------|---------|
| `no-unused-vars` | Catch declared variables that are never used |
| `no-console` | Prevent accidental console logs left in production code |
| `eqeqeq` | Enforce `===` over `==` for type-safe comparisons |
| `prefer-const` | Require `const` when a variable is never reassigned |

### Run linters

```bash
# Format all files
npm run format

# Check formatting without writing
npm run format:check

# Lint UI tests
npm run lint

# Lint API tests
npm run lint:api

# Fix auto-fixable issues
npm run lint:fix
```

---

## Branch: `feature/ci-jenkins` — CI/CD Pipelines

### What it demonstrates
- Two independent Jenkins pipelines — one for UI tests, one for API tests
- Each pipeline clones the repository and runs the appropriate test suite
- Scheduled to execute automatically **every 2 hours**
- Results displayed inside Jenkins using the HTML Publisher plugin

---

## CI/CD Stack — 6-Layer Architecture

This branch runs inside the following infrastructure stack:

```
┌─────────────────────────────────────────┐
│  Layer 6 — Execution                    │
│  Chromium (Headless)                    │
│  Browser controlled by Playwright       │
├─────────────────────────────────────────┤
│  Layer 5 — Testing Framework            │
│  Playwright (API & UI)                  │
│  Single framework for both test types   │
├─────────────────────────────────────────┤
│  Layer 4 — Runtime                      │
│  Node.js (inside the container)         │
│  Test execution environment             │
├─────────────────────────────────────────┤
│  Layer 3 — CI Orchestration             │
│  Jenkins LTS (containerized)            │
│  Runs and schedules pipelines           │
├─────────────────────────────────────────┤
│  Layer 2 — Virtualization               │
│  Docker Desktop                         │
│  Manages containers and resources       │
├─────────────────────────────────────────┤
│  Layer 1 — Host OS                      │
│  Windows 11 + WSL2                      │
│  Provides Linux kernel and host env     │
└─────────────────────────────────────────┘
```

### Interaction flow

```
Windows 11 + WSL2
  └── provides host resources
        └── Docker Desktop
              └── deploys Jenkins LTS container
                    └── executes Node.js runtime
                          └── runs Playwright test suites
                                └── controls Chromium headless browser
                                      └── returns test results to Jenkins
```

---

### Jenkins setup

**Prerequisites**

- Windows 11 with WSL2 enabled
- Docker Desktop installed and running
- Jenkins LTS pulled as a Docker image

**Pull and run Jenkins**

```bash
docker pull jenkins/jenkins:lts

docker run -d \
  --name jenkins \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  jenkins/jenkins:lts
```

**Access Jenkins UI**

Open `http://localhost:8080` in your browser and complete the initial setup wizard.

---

### Pipeline: UI Tests

```groovy
pipeline {
  agent any

  triggers {
    cron('H */2 * * *')  // Every 2 hours
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'feature/typescript',
            url: 'https://github.com/ElianaMendez/Specialization_AT_JS_Scenarios.git'
      }
    }

    stage('Install') {
      steps {
        sh 'npm ci'
        sh 'npx playwright install chromium --with-deps'
      }
    }

    stage('Run UI Tests') {
      steps {
        sh 'npm run test:cucumber'
      }
    }
  }

  post {
    always {
      publishHTML(target: [
        reportDir: 'playwright-report',
        reportFiles: 'index.html',
        reportName: 'Playwright UI Report'
      ])
    }
  }
}
```

### Pipeline: API Tests

```groovy
pipeline {
  agent any

  triggers {
    cron('H */2 * * *')  // Every 2 hours
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main',
            url: 'https://github.com/ElianaMendez/Specialization_AT_JS_Testing_WebServices.git'
      }
    }

    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Run API Tests') {
      steps {
        sh 'npm run test:api'
      }
    }
  }

  post {
    always {
      publishHTML(target: [
        reportDir: 'playwright-report',
        reportFiles: 'index.html',
        reportName: 'Playwright API Report'
      ])
    }
  }
}
```

---

### Jenkins plugins required

| Plugin | Purpose |
|--------|---------|
| **HTML Publisher** | Displays Playwright HTML reports inside Jenkins |
| **Git** | Clones repositories from GitHub |
| **Pipeline** | Enables declarative `Jenkinsfile` syntax |
| **Credentials Binding** | Manages GitHub tokens securely |

---

## Stack benefits

| Benefit | Description |
|---------|-------------|
| **Native performance** | WSL2 + Docker Desktop provides near-native Linux performance on Windows |
| **Isolated environments** | Jenkins LTS containers ensure tests run in clean, reproducible environments |
| **Optimized runtime** | Node.js runs natively inside the container with no overhead |
| **Efficient execution** | Chromium headless runs tests without a display server |
| **Full coverage** | Playwright handles both UI and API test suites in a single framework |
| **Scalable architecture** | Modular container setup makes updates and scaling straightforward |

---

## Prerequisites

- Windows 11 with WSL2 enabled
- Docker Desktop 4.x+
- Node.js 18+ (inside Jenkins container)
- Jenkins LTS
- Playwright with Chromium

