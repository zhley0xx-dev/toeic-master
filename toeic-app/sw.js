// TOEIC Master – Service Worker
const CACHE = 'toeic-v1';
const FILES = ['/', '/index.html', '/app.js', '/questions.js', '/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
      const clone = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, clone));
      return res;
    })).catch(() => caches.match('/index.html'))
  );
});

// Handle notification scheduling messages
self.addEventListener('message', e => {
  if (e.data?.type === 'SCHEDULE_NOTIF') {
    scheduleDaily(e.data.time);
  }
});

function scheduleDaily(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  const now = new Date();
  const next = new Date();
  next.setHours(h, m, 0, 0);
  if (next <= now) next.setDate(next.getDate() + 1);
  const delay = next - now;
  
  setTimeout(() => {
    self.registration.showNotification('📚 TOEIC Master', {
      body: "C'est l'heure de ton quiz quotidien ! Tu as 75 min pour 50 questions.",
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      vibrate: [200, 100, 200],
      tag: 'daily-quiz',
      actions: [{ action: 'open', title: 'Commencer le quiz' }]
    }).catch(() => {});
    // Reschedule for tomorrow
    scheduleDaily(timeStr);
  }, delay);
}

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('/'));
});
