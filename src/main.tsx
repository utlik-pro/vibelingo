import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { I18nProvider } from './lib/i18n.tsx'
import { AuthProvider } from './lib/auth.tsx'
import { ThemeProvider } from './lib/theme.tsx'
import { ErrorBoundary } from './components/error-boundary.tsx'

// Telegram Mini App: full screen mode
const tgWebApp = window.Telegram?.WebApp;
if (tgWebApp) {
  tgWebApp.ready();
  tgWebApp.expand();
  tgWebApp.enableClosingConfirmation?.();
  tgWebApp.isVerticalSwipesEnabled = false;
  try { (tgWebApp as any).disableVerticalSwipes?.(); } catch {}
  tgWebApp.setHeaderColor?.('secondary_bg_color');
  tgWebApp.setBackgroundColor?.('secondary_bg_color');

  // Request true fullscreen after ready
  setTimeout(() => {
    try {
      if (typeof tgWebApp.requestFullscreen === 'function') {
        tgWebApp.requestFullscreen();
      }
    } catch (e) {
      console.log('Fullscreen not available:', e);
    }
  }, 100);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <I18nProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </I18nProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
)
