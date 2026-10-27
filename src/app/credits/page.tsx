import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Image credits",
  description:
    "Sources and credits for the imagery used in the Space Tourism orbital explorer.",
};

export default function CreditsPage() {
  return (
    <article className="credits-page page-container">
      <p className="eyebrow">THE PEOPLE BEHIND THE PICTURES</p>
      <h1>Worlds, with credit.</h1>
      <p className="body-copy">
        The orbital explorer uses imagery-based textures with illustrative
        lighting, atmosphere, and camera paths. World sizes, spacing, rotation
        speeds, and travel paths are arranged for exploration, rather than
        scientific measurement.
      </p>
      <section>
        <h2>Earth, clouds, Moon &amp; Mars</h2>
        <p>
          Textures by{" "}
          <a href="https://www.solarsystemscope.com/textures/">
            Solar System Scope / INOVE
          </a>
          , based on NASA imagery and elevation data. Used under{" "}
          <a href="https://creativecommons.org/licenses/by/4.0/">
            Creative Commons Attribution 4.0 International
          </a>
          . The original 2K maps were resized to 1536 × 768 pixels and converted
          to WebP. Source maps include adjusted colors and inferred terrain
          where imagery is incomplete.
        </p>
      </section>
      <section>
        <h2>Europa</h2>
        <p>
          NASA/JPL/USGS Voyager mosaic, distributed through{" "}
          <a href="https://github.com/nasa/NASA-3D-Resources/tree/master/Images%20and%20Textures/Jupiter%20-%20Europa">
            NASA’s 3D Resources collection
          </a>
          . Converted to WebP at 1440 × 720 pixels. The grayscale surface map is
          tinted for this illustrative view.
        </p>
      </section>
      <section>
        <h2>Titan</h2>
        <p>
          <a href="https://science.nasa.gov/resource/titan-global-map-june-2015/">
            Titan Global Map — June 2015 (PIA19658)
          </a>
          , NASA/JPL-Caltech/Space Science Institute. The map image was cropped
          to remove the legend, converted to WebP, and rendered with an
          illustrative amber haze. This near-infrared map reveals surface
          variations beneath Titan’s atmosphere; it is not a visible-light
          photograph.
        </p>
      </section>
      <p className="body-copy">
        No endorsement by NASA, JPL, USGS, Solar System Scope, or the source
        authors is implied.
      </p>
      <Link href="/destination" className="text-link">
        BACK TO THE WORLDS ↗
      </Link>
    </article>
  );
}
