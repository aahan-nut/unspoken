/** Shared class strings for the Unspoken Hero surfaces (frame, panels, pills). */

/** Horizontal gutter shared by the header, hero and every panel. */
export const panelGutterX = "px-[clamp(24px,6vw,112px)]";
export const panelRadius = "rounded-[clamp(18px,2.4vw,32px)]";

/** Pill buttons from the hero design. `Light` variants sit on dark/gradient surfaces. */
export const pillBase =
  "inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-[15px] text-[14px] font-semibold uppercase tracking-[0.08em] transition-opacity";

export const pillClasses = {
  solidLight: "bg-white text-ink [text-shadow:none] hover:opacity-90",
  outlineLight: "border border-white/85 bg-white/[0.08] text-white hover:opacity-75",
};
