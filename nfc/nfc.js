"use strict";

(() => {
  const params = new URLSearchParams(window.location.search);
  const registration = (params.get("reg") || "").trim().toUpperCase();
  const category = params.get("cat");
  const categories = new Map([
    ["threeAxis", "Dreiachs"], ["gyroplane", "Tragschrauber"],
    ["helicopter", "Hubschrauber"], ["trike", "Trikes"]
  ]);
  const keys = Array.from(params.keys());
  const valid = window.location.hash === "" &&
    keys.length === 3 && new Set(keys).size === 3 &&
    keys.every(key => ["v", "reg", "cat"].includes(key)) &&
    params.get("v") === "1" && registration.length >= 3 && registration.length <= 16 &&
    /^[A-Z0-9]+(?:-[A-Z0-9]+)*$/.test(registration) && categories.has(category);

  if (!valid) {
    if (window.location.search) {
      document.getElementById("link-status").textContent =
        "Dieser NFC-Link ist ungültig oder noch nicht unterstützt. Bitte richte den Aufkleber in der App erneut ein.";
    }
    return;
  }

  document.getElementById("aircraft").textContent = registration + " · " + categories.get(category);
  document.getElementById("link-status").textContent =
    "Öffne die Maschine in deiner iPhone-App. Start oder Stopp über diesen Button werden dort noch einmal bestätigt.";
  const query = new URLSearchParams({ v: "1", reg: registration, cat: category });
  const button = document.getElementById("open-app");
  button.href = "ulflugbuch://nfc/?" + query.toString();
  button.hidden = false;
  // User interaction is required. Never trigger a flight from a page load.
})();
