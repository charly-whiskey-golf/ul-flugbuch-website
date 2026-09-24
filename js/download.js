// Set the link before activation so keyboard and new-tab clicks work normally.
// Unknown devices keep the HTML fallback with both stores to choose from.
(() => {
  const userAgent = navigator.userAgent || '';
  let storeUrl;

  if (/Android/i.test(userAgent)) {
    storeUrl = 'https://play.google.com/store/apps/details?id=de.sebastianreich.ulflugbuch';
  } else if (/iPhone|iPad|iPod|Macintosh|Mac OS X/i.test(userAgent)) {
    // iPadOS in desktop mode identifies itself as a Mac; both use this store.
    storeUrl = 'https://apps.apple.com/de/app/ul-flugbuch/id6751782553';
  }

  if (storeUrl) {
    document.querySelectorAll('[data-device-download]').forEach(link => {
      link.href = storeUrl;
    });
  }
})();
