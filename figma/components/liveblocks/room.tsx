"use client";

import { Layer } from "@/lib/types";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react";
import { ReactNode } from "react";
import Logo from "@/public/logo.png";
import Image from "next/image";

interface RoomProps {
  children: ReactNode;
  roomId: string;
}

export function Room({ children, roomId }: RoomProps) {
  return (
    <LiveblocksProvider authEndpoint={"/api/liveblocks-auth"}>
      <RoomProvider
        id={roomId}
        initialPresence={{
          selection: [],
          cursor: null,
          penColor: null,
          pencilDraft: null,
        }}
        initialStorage={{
          roomColor: { r: 30, g: 30, b: 30 },
          layers: new LiveMap<string, LiveObject<Layer>>(),
          layerIds: new LiveList([]),
        }}
      >
        <ClientSideSuspense
          fallback={
            <div className="flex justify-center items-center flex-col h-screen gap-2">
              <Image
                src={Logo}
                alt="Figma logo"
                className="w-[50px] h-[50px] animate-bounce"
              />
              <h1 className="text-sm font-normal text-gray-800">Loading...</h1>
            </div>
          }
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
