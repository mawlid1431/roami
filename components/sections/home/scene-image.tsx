/* eslint-disable @next/next/no-img-element -- Preserve original remote PNGs, intrinsic ratios, and exact layer DOM. */
export function SceneImage({ src, className, eager = false }: { src: string; className: string; eager?: boolean }) {
  return <img className={`scene-img ${className}`} src={src} alt="" draggable={false} decoding="async" fetchPriority={eager ? "high" : "auto"} />;
}
