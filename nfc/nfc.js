"use strict";

(() => {
  const params = new URLSearchParams(window.location.search);
  const registration = (params.get("reg") || "").trim().toUpperCase();
  const category = params.get("cat");
  const version = params.get("v");
  const aircraftType = (params.get("type") || "").trim();
  const expectedKeys = version === "2" ? ["v", "reg", "cat", "type"] : ["v", "reg", "cat"];
  const validType = version === "1" || (aircraftType.length > 0 &&
    Array.from(aircraftType).length <= 60 && !/[\u0000-\u001f\u007f-\u009f\u2028\u2029]/u.test(aircraftType));
  const categories = new Map([
    ["threeAxis", "Dreiachs"], ["gyroplane", "Tragschrauber"],
    ["helicopter", "Hubschrauber"], ["trike", "Trikes"]
  ]);
  const keys = Array.from(params.keys());
  const valid = window.location.hash === "" &&
    keys.length === expectedKeys.length && new Set(keys).size === keys.length &&
    keys.every(key => expectedKeys.includes(key)) &&
    (version === "1" || version === "2") && validType &&
    registration.length >= 3 && registration.length <= 16 &&
    /^[A-Z0-9]+(?:-[A-Z0-9]+)*$/.test(registration) && categories.has(category);

  if (!valid) {
    if (window.location.search) {
      document.getElementById("link-status").textContent =
        "Dieser NFC-Link ist ungültig oder noch nicht unterstützt. Bitte richte den Aufkleber in der App erneut ein.";
    }
    return;
  }

  document.getElementById("aircraft").textContent =
    [registration, aircraftType, categories.get(category)].filter(Boolean).join(" · ");
  document.getElementById("link-status").textContent =
    "Öffne die Maschine in deiner iPhone-App. Start oder Stopp über diesen Button werden dort noch einmal bestätigt.";
  const query = new URLSearchParams({ v: version, reg: registration, cat: category });
  if (version === "2") query.set("type", aircraftType);
  const button = document.getElementById("open-app");
  // Swift URLComponents expects %20 for spaces; a literal '+' is already %2B.
  button.href = "ulflugbuch://nfc/?" + query.toString().replace(/\+/g, "%20");
  button.hidden = false;
  // User interaction is required. Never trigger a flight from a page load.
})();
