export function initAxe(React, ReactDOM) {
  if (import.meta.env.DEV) {
    import('@axe-core/react').then((axe) => {
      axe.default(React, ReactDOM, 1000, {});
    }).catch(err => {
      console.warn('Could not initialize axe-core', err);
    });
  }
}

export function announceToScreenReader(message) {
  const announcerId = 'a11y-announcer';
  let announcer = document.getElementById(announcerId);
  
  if (!announcer) {
    announcer = document.createElement('div');
    announcer.id = announcerId;
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    // visually hidden
    announcer.style.position = 'absolute';
    announcer.style.width = '1px';
    announcer.style.height = '1px';
    announcer.style.margin = '-1px';
    announcer.style.padding = '0';
    announcer.style.overflow = 'hidden';
    announcer.style.clip = 'rect(0, 0, 0, 0)';
    announcer.style.whiteSpace = 'nowrap';
    announcer.style.border = '0';
    document.body.appendChild(announcer);
  }
  
  // Clear and rewrite to force announcement
  announcer.textContent = '';
  setTimeout(() => {
    announcer.textContent = message;
  }, 50);
}
