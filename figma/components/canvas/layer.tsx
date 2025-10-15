import { LayerType } from "@/lib/types";
import { useStorage } from "@liveblocks/react";
import { memo } from "react";
import { Rectangle } from "./rectangle";
import { Ellipse } from "./ellipse";

interface LayerProps {
  layerId: string;
}

export const Layer = memo(({ layerId }: LayerProps) => {
  const layer = useStorage((root) => root.layers.get(layerId));
  if (!layer) return null;

  switch (layer.type) {
    case LayerType.Rectangle:
      return <Rectangle id={layerId} layer={layer} />;
    case LayerType.Ellipse:
      return <Ellipse id={layerId} layer={layer} />;
    default:
      return null;
  }
});
