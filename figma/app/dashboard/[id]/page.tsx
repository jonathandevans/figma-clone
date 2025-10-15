import { Canvas } from "@/components/canvas/canvas";
import { Room } from "@/components/liveblocks/room";
import { auth } from "@/lib/auth";

interface RouteProps {
  params: Promise<{ id: string }>;
}

export default async function IdRoute({ params }: RouteProps) {
  const { id } = await params;

  const session = await auth();

  return (
    <Room roomId={`room:${id}`}>
      <Canvas />
    </Room>
  );
}
