// main.js

let deferredPrompt;
const installButton = document.getElementById('installButton');

// Register the Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope: ', registration.scope);
      })
      .catch((error) => {
        console.log('Service Worker registration failed: ', error);
      });
  });
}

// Listen for the 'beforeinstallprompt' event
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the default mini-infobar or prompt from appearing
  e.preventDefault();
  // Save the event so it can be triggered later
  deferredPrompt = e;

  // Show the install button
  installButton.style.display = 'block';

  // When the user clicks the install button, trigger the install prompt
  installButton.addEventListener('click', () => {
    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      // Reset the deferred prompt so it can't be used again
      deferredPrompt = null;
      installButton.style.display = 'none'; // Optionally hide the button after install
    });
  });
}
