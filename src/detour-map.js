const maps = document.querySelectorAll("[data-detour-map]");

maps.forEach((mapRoot, index) => {
  const imageSrc = mapRoot.dataset.mapSrc || "./assets/detour_map.png";
  const areas = window.detourMapAreas || [];
  const titleId = `area-title-${index}`;
  const descriptionId = `area-description-${index}`;

  mapRoot.innerHTML = `
    <div class="map-shell">
      <img class="map-image" src="${imageSrc}" alt="Illustrated Detour festival map at 100 Grove Street" />
      <div class="hotspot-layer" aria-label="Clickable festival areas"></div>
    </div>
    <dialog class="area-dialog" aria-labelledby="${titleId}" aria-describedby="${descriptionId}">
      <button class="dialog-close" type="button" aria-label="Close">x</button>
      <p class="area-kicker">Map area</p>
      <h2 id="${titleId}"></h2>
      <div class="area-description" id="${descriptionId}"></div>
    </dialog>
  `;

  const layer = mapRoot.querySelector(".hotspot-layer");
  const dialog = mapRoot.querySelector(".area-dialog");
  const title = mapRoot.querySelector(`#${titleId}`);
  const description = mapRoot.querySelector(`#${descriptionId}`);
  const close = mapRoot.querySelector(".dialog-close");

  areas.forEach((area) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "hotspot";
    button.style.setProperty("--x", `${area.x}%`);
    button.style.setProperty("--y", `${area.y}%`);
    button.style.setProperty("--size", `${area.width}%`);
    button.setAttribute("aria-label", `Open ${area.title} details`);
    button.dataset.areaId = area.id;
    button.innerHTML = `<span>${area.title}</span>`;
    button.addEventListener("click", () => openArea(area));
    layer.append(button);
  });

  close.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  function openArea(area) {
    if (area.titleUrl) {
      title.innerHTML = `<a href="${area.titleUrl}" target="_blank" rel="noopener">${area.title}</a>`;
    } else {
      title.textContent = area.title;
    }
    description.innerHTML = area.html || `<p>${area.description}</p>`;

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
  }
});
