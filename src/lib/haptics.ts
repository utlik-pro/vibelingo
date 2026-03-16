const tg = () => window.Telegram?.WebApp;

export function hapticImpact(style: 'light' | 'medium' | 'heavy' = 'light') {
  try { (tg() as any)?.HapticFeedback?.impactOccurred(style); } catch {}
}

export function hapticNotification(type: 'error' | 'success' | 'warning') {
  try { (tg() as any)?.HapticFeedback?.notificationOccurred(type); } catch {}
}

export function hapticSelection() {
  try { (tg() as any)?.HapticFeedback?.selectionChanged(); } catch {}
}
