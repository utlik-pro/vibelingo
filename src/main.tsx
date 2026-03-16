import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { I18nProvider } from './lib/i18n.tsx'
import { AuthProvider } from './lib/auth.tsx'
import { ThemeProvider } from './lib/theme.tsx'

// Telegram Mini App: expand to full screen
const tgWebApp = window.Telegram?.WebApp;
if (tgWebApp) {
  tgWebApp.ready();
  tgWebApp.expand();
  tgWebApp.enableClosingConfirmation?.();
  tgWebApp.isVerticalSwipesEnabled = false;
  tgWebApp.setHeaderColor?.('#F8F7FC');
  tgWebApp.setBackgroundColor?.('#F8F7FC');
  // True fullscreen — hides Telegram header (WebApp v8.0+)
  try {
    tgWebApp.requestFullscreen?.();
  } catch {
    // Not supported in older Telegram versions
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <I18nProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  </StrictMode>,
)
