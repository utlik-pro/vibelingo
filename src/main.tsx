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
  // Match Telegram header to app background
  tgWebApp.setHeaderColor?.('secondary_bg_color');
  tgWebApp.setBackgroundColor?.('secondary_bg_color');
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
