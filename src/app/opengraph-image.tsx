import { ImageResponse } from "next/og";
import { LOGO_P, LOGO_SLASH, LOGO_VIEWBOX } from "@/components/logo-paths";
import { site } from "@/lib/site";

export const alt = `${site.name}: industrial manpower supply in Abu Dhabi, UAE`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0d0f12", position: "relative", padding: 72 }}>
        <div style={{ position: "absolute", top: -40, right: 150, width: 90, height: 760, background: "#d0021b", transform: "skewX(-22deg)" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <svg viewBox={LOGO_VIEWBOX} width={96} height={93}>
              <path d={LOGO_SLASH} fill="#ffffff" />
              <path d={LOGO_P} fill="#d0021b" fillRule="evenodd" />
            </svg>
            <div style={{ display: "flex", flexDirection: "column", color: "white" }}>
              <div style={{ fontSize: 38, fontWeight: 700, letterSpacing: 1 }}>PAK ARAB MANPOWER</div>
              <div style={{ fontSize: 22, color: "#d0021b", letterSpacing: 10, fontWeight: 700 }}>SUPPLY LLC</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", color: "white", maxWidth: 820 }}>
            <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1, letterSpacing: -1 }}>Industrial workforce for UAE oil, gas &amp; construction</div>
            <div style={{ fontSize: 28, marginTop: 28, color: "rgba(255,255,255,0.7)" }}>
              ICV certified · ADNOC approved · CICPA eligible · ISO 9001 / 14001 / 45001
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
