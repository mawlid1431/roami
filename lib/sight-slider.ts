export function createSightSlider(section: HTMLElement, reduceMotion: MediaQueryList) {
  const track = section.querySelector<HTMLElement>(".sights-track")!;
  const originalCards = Array.from(track.querySelectorAll<HTMLElement>(".sight-card"));
  const originalSightCount = originalCards.length;
  let sightCards: HTMLElement[] = [];
  let activeSight = originalSightCount;
  const frames = new Set<number>();
  const controller = new AbortController();
  const options = { signal: controller.signal };
  const root = document.documentElement;

  function nextFrame(callback: () => void) {
    const id = requestAnimationFrame(() => { frames.delete(id); callback(); });
    frames.add(id);
  }

  function updateSightSlider() {
    const cardWidth = sightCards[0]?.offsetWidth ?? 0;
    const gap = parseFloat(getComputedStyle(track).columnGap || "0");
    root.style.setProperty("--sights-shift", `${-(cardWidth + gap) * activeSight}px`);
    sightCards.forEach((card, index) => {
      card.classList.toggle("is-active", index === activeSight);
      card.setAttribute("aria-pressed", String(index === activeSight));
    });
  }

  function jumpSightSlider(index: number) {
    track.classList.add("is-jumping");
    const focusedIndex = sightCards.indexOf(document.activeElement as HTMLElement);
    activeSight = index;
    updateSightSlider();
    if (focusedIndex >= 0) {
      const equivalentIndex = originalSightCount + focusedIndex % originalSightCount;
      sightCards[equivalentIndex]?.focus({ preventScroll: true });
    }
    nextFrame(() => nextFrame(() => track.classList.remove("is-jumping")));
  }

  function normalizeSightSlider() {
    if (activeSight >= originalSightCount * 2) jumpSightSlider(activeSight - originalSightCount);
    else if (activeSight < originalSightCount) jumpSightSlider(activeSight + originalSightCount);
  }

  function moveSightSlider(direction: number) {
    // Normalize before a rapid repeat can run beyond the three available sets.
    normalizeSightSlider();
    activeSight += direction;
    updateSightSlider();
    // Reduced motion has no transitionend event, so normalize synchronously.
    if (reduceMotion.matches) normalizeSightSlider();
  }

  function selectSightCard(card: HTMLElement) {
    const index = Number(card.dataset.sightIndex);
    if (!Number.isFinite(index)) return;
    activeSight = index;
    updateSightSlider();
    if (reduceMotion.matches) normalizeSightSlider();
  }

  // Selecting a card also opens its detail view; the event bubbles to the
  // React-owned <section> so it can update state (clones lose React's
  // synthetic event bindings, so this bridges back via a native DOM event).
  function openSightCard(card: HTMLElement) {
    selectSightCard(card);
    card.dispatchEvent(new CustomEvent("sight-open", { bubbles: true, detail: card.dataset.sightSlug }));
  }

  track.replaceChildren();
  for (let setIndex = 0; setIndex < 3; setIndex++) {
    originalCards.forEach((card, cardIndex) => {
      const clone = card.cloneNode(true) as HTMLElement;
      clone.dataset.sightIndex = String(setIndex * originalSightCount + cardIndex);
      track.append(clone);
    });
  }
  sightCards = Array.from(track.querySelectorAll<HTMLElement>(".sight-card"));
  sightCards.forEach((card) => {
    card.addEventListener("click", () => openSightCard(card), options);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openSightCard(card);
      }
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        moveSightSlider(event.key === "ArrowLeft" ? -1 : 1);
        sightCards[activeSight]?.focus({ preventScroll: true });
      }
    }, options);
  });
  track.addEventListener("transitionend", (event) => {
    if (event.target === track && event.propertyName === "transform") normalizeSightSlider();
  }, options);
  section.querySelector(".sight-prev")?.addEventListener("click", () => moveSightSlider(-1), options);
  section.querySelector(".sight-next")?.addEventListener("click", () => moveSightSlider(1), options);
  reduceMotion.addEventListener("change", normalizeSightSlider, options);
  track.classList.add("is-jumping");
  updateSightSlider();
  nextFrame(() => nextFrame(() => track.classList.remove("is-jumping")));

  return {
    updateSightSlider,
    destroy() {
      controller.abort();
      frames.forEach(cancelAnimationFrame);
      track.replaceChildren(...originalCards);
      track.classList.remove("is-jumping");
      root.style.removeProperty("--sights-shift");
    },
  };
}
