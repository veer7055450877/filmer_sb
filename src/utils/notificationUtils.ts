// Utility to manage browser title and favicon notifications

let originalTitle = document.title;
let notificationCount = 0;

export const playNotificationSound = () => {
  const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'); // Simple beep
  audio.volume = 0.5;
  audio.play().catch(e => console.log("Audio play failed (interaction required)", e));
};

export const updateFavicon = (count: number) => {
  const favicon = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
  if (!favicon) return;

  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const img = new Image();
    img.src = '/vite.svg'; // Use your base icon
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 32, 32);

      if (count > 0) {
        // Draw red circle
        ctx.beginPath();
        ctx.arc(24, 8, 8, 0, 2 * Math.PI);
        ctx.fillStyle = '#ff0000';
        ctx.fill();

        // Draw number
        ctx.font = 'bold 10px sans-serif';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(count > 9 ? '9+' : count.toString(), 24, 8);
      }

      favicon.href = canvas.toDataURL('image/png');
    };
  }
};

export const addNotification = () => {
  notificationCount++;
  document.title = `(${notificationCount}) ${originalTitle}`;
  updateFavicon(notificationCount);
  playNotificationSound();
  return notificationCount;
};

export const clearNotifications = () => {
  notificationCount = 0;
  document.title = originalTitle;
  updateFavicon(0);
};
