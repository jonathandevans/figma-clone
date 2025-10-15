import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Color, Layer, Point } from "./lib/types";

declare global {
  interface Liveblocks {
    Presence: {
      cursor: Point | null;
      selection: string[];
      penColor: Color | null;
      pencilDraft: [x: number, y: number, pressure: number][] | null;
    };

    Storage: {
      roomColor: Color | null;
      layerIds: LiveList<string>;
      layers: LiveMap<string, LiveObject<Layer>>;
    };

    UserMeta: {
      id: string;
      info: {
        name: string;
      };
    };

    RoomEvent: {};

    ThreadMetadata: {};

    RoomInfo: {};
  }
}

export {};
