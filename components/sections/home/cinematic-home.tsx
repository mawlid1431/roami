import { CinemaController } from "@/components/animations/cinema-controller";
import { SiteHeader } from "@/components/layout/site-header";
import { sceneAssets } from "@/data/scene";
import { RouteJourney } from "./route-journey";
import { SceneImage } from "./scene-image";
import { StoryPanels } from "./story-panels";

export function CinematicHome() {
  return <>
    <section className="cinema-scroll" id="cinema" aria-label="ROAMI cinematic scroll story">
      <div className="stage">
        <div className="world">
          <SceneImage className="sky-img" src={sceneAssets.sky} eager />
          <SiteHeader />
          <div className="back-stack">
            <SceneImage className="back-img back-four" src={sceneAssets.four} />
            <RouteJourney />
            <SceneImage className="back-img back-bazaar" src={sceneAssets.bazaar} />
          </div>
          <h1 className="hero-title">ROAMI</h1>
          <SceneImage className="splitframe-img splitframe-left" src={sceneAssets.left} eager />
          <SceneImage className="splitframe-img splitframe-right" src={sceneAssets.right} eager />
          <SceneImage className="bridge-img" src={sceneAssets.bridge} eager />
          <SceneImage className="frame-two-img" src={sceneAssets.river} />
          <div className="shade" />
        </div>
        <StoryPanels />
      </div>
    </section>
    <CinemaController />
  </>;
}
