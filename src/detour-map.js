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
      <p id="${descriptionId}"></p>
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
    button.style.setProperty("--w", `${area.width}%`);
    button.style.setProperty("--h", `${area.height}%`);
    if (area.shape) {
      button.style.setProperty("--shape", area.shape);
    }
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
    title.textContent = area.title;
    description.textContent = area.description;

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
  }
});
