/** Estado da intro do hero (splash → imagem sobe → menu). Compartilhado entre Layout e HomeHero. */

type Listener = (done: boolean) => void;

let introDone = false;
const listeners = new Set<Listener>();

export function isHomeHeroIntroDone() {
  return introDone;
}

export function resetHomeHeroIntro() {
  introDone = false;
  listeners.forEach((fn) => fn(false));
}

export function markHomeHeroIntroDone() {
  if (introDone) return;
  introDone = true;
  listeners.forEach((fn) => fn(true));
}

/** Se já terminou, chama o listener já no subscribe (evita miss do evento). */
export function subscribeHomeHeroIntro(listener: Listener) {
  listeners.add(listener);
  if (introDone) listener(true);
  return () => {
    listeners.delete(listener);
  };
}
