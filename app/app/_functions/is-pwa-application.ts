// Vrací true, pokud je aplikace spuštěna jako PWA (na mobilu i desktopu)
export function isPwaApplication(): boolean {
  if (typeof window === "undefined") return false;

  // iOS PWA
  const isIosStandalone =
    typeof window.navigator === "object" &&
    // @ts-expect-error: standalone není v TS typu, ale na iOS existuje
    window.navigator.standalone === true;

  // Android/desktop PWA
  const isDisplayStandalone = window.matchMedia(
    "(display-mode: standalone)",
  ).matches;
  const isDisplayFullscreen = window.matchMedia(
    "(display-mode: fullscreen)",
  ).matches;
  const isDisplayMinimalUi = window.matchMedia(
    "(display-mode: minimal-ui)",
  ).matches;

  return (
    isIosStandalone ||
    isDisplayStandalone ||
    isDisplayFullscreen ||
    isDisplayMinimalUi
  );
}
