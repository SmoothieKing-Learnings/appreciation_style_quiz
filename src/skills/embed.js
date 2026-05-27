// Detect whether the app is running embedded (e.g. inside a Rise 360 iframe).
// Triggers via ?embed=1 URL param OR auto-detected when running inside any iframe.
export function isEmbedded() {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  if (params.get('embed') === '1') return true;
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}
