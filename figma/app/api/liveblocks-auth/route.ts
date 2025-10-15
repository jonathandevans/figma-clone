import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { Liveblocks } from "@liveblocks/node";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(req: Request) {
  const userSession = await auth();
  const user = await db.user.findUniqueOrThrow({
    where: { id: userSession?.user?.id },
  });

  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name: user.email ?? "Anonymous",
    },
  });
  session.allow(`room:${"testpage"}`, session.FULL_ACCESS);
  const { status, body } = await session.authorize();

  return new Response(body, { status });
}
