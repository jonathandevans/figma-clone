"use client";

import { PointerEvent, useState } from "react";
import { pointerEventToCanvasPoint, rgbToHex } from "@/lib/utils";
import { useMutation, useStorage } from "@liveblocks/react";
import { Layer as LayerComponent } from "./layer";
import {
  Camera,
  CanvasMode,
  CanvasState,
  EllipseLayer,
  Layer,
  LayerType,
  Point,
  RectangleLayer,
} from "@/lib/types";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import { Toolbar } from "../toolbar/toolbar";

const MAX_LAYERS = 100;

export function Canvas() {
  const roomColor = useStorage((root) => root.roomColor);
  const layerIds = useStorage((root) => root.layerIds);

  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0, zoom: 1 });

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Text,
      position: Point
    ) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= MAX_LAYERS) return;

      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();

      let layer: LiveObject<Layer> | null = null;
      if (layerType === LayerType.Rectangle) {
        layer = new LiveObject<RectangleLayer>({
          type: LayerType.Rectangle,
          x: position.x,
          y: position.y,
          width: 100,
          height: 100,
          fill: { r: 217, g: 217, b: 217 },
          stroke: { r: 217, g: 217, b: 217 },
          opacity: 100,
        });
      } else if (layerType === LayerType.Ellipse) {
        layer = new LiveObject<EllipseLayer>({
          type: LayerType.Ellipse,
          x: position.x,
          y: position.y,
          width: 100,
          height: 100,
          fill: { r: 217, g: 217, b: 217 },
          stroke: { r: 217, g: 217, b: 217 },
          opacity: 100,
        });
      }

      if (layer) {
        liveLayerIds.push(layerId);
        liveLayers.set(layerId, layer);

        setMyPresence({ selection: [layerId] }, { addToHistory: true });
      }
    },
    []
  );

  const handlePointerUp = useMutation(({}, e: PointerEvent) => {
    const point = pointerEventToCanvasPoint(e, camera);
    insertLayer(LayerType.Ellipse, point);
  }, []);

  return (
    <div className="flex h-screen w-full">
      <main className="fixed left-0 right-0 h-screen overflow-y-auto">
        <div
          style={{
            backgroundColor: roomColor ? rgbToHex(roomColor) : "#1e1e1e",
          }}
          className="h-full w-full touch-none"
        >
          <svg onPointerUp={handlePointerUp} className="w-full h-full">
            <g>
              {layerIds?.map((layerId) => (
                <LayerComponent key={layerId} layerId={layerId} />
              ))}
            </g>
          </svg>
        </div>
      </main>

      <Toolbar canvasState={canvasState} setCanvasState={setCanvasState} />
    </div>
  );
}
