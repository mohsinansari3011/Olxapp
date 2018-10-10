self.addEventListener('push', function (event) {
    console.log('Received a push message', event);
  
    var notification = event.data.json().notification
    console.log(notification)
    var title = notification.title || 'Yay a message.';
    var body = notification.body || 'We have received a push message.';
    var icon = notification.icon
    // var tag = 'simple-push-demo-notification-tag';
  
    event.waitUntil(
      self.registration.showNotification(title, {
        body: body,
        icon : icon,
        vibrate: [200, 100, 200, 100, 200, 100, 200]
        // tag: tag
      })
    );
  
  });




  // on Notification Click do whatever you want...
  self.addEventListener('notificationclick', function(event) {
    var notification = event.notification;
    var action = event.action;
  
    console.log(notification);
  
    if (action === 'confirm') {
      console.log('Confirm was chosen');
      notification.close();
    } else {
      console.log(action);
      event.waitUntil(
        clients.matchAll()
          .then(function(clis) {
            var client = clis.find(function(c) {
              return c.visibilityState === 'visible';
            });
  
            if (client !== undefined) {
              client.navigate("https://olxapp3011.firebaseapp.com/chatroom.html");
              client.focus();
            } else {
              clients.openWindow("https://olxapp3011.firebaseapp.com/chatroom.html");
            }
            notification.close();
          })
      );
    }
  });


var dataCacheName = 'Hackaton-3011-data-01.1';
var cacheName = 'Hackaton-3011-01.1';
var filesToCache = [
    '/',
    'index.html',
    'category.html',
    'signup.html',
    'postadd.html',
    'viewadvert.html',
    'favourite.html',
    'sellerchat.html',
    'login.html',
    'singleadd.html',
    'logo.png',
    'images/blackheart.png',
    'images/redheart.png',
    'olxlogo.png',
    'css/style.css',
    'css/bootstrap.min.css',
    'js/app.js',
    'js/jquery.min.js',
    'js/bootstrap.min.js'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});


self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== cacheName) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
    );
    return self.clients.claim();
  })


  self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  var dataUrl = 'https://query.yahooapis.com/v1/public/yql';
  if (e.request.url.indexOf(dataUrl) > -1) {
    /*
     * When the request URL contains dataUrl, the app is asking for fresh
     * weather data. In this case, the service worker always goes to the
     * network and then caches the response. This is called the "Cache then
     * network" strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
     */
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    /*
     * The app is asking for app shell files. In this scenario the app uses the
     * "Cache, falling back to the network" offline strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
     */
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});
