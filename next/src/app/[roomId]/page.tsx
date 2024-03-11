import { useRouter } from "next/router";
import WebSocketTest from "@/components/WebSocketTest";
import GameLobby from "@/components/GameLobby";

export default function Page({ params }: { params: { roomId: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24">
      <GameLobby roomId={params.roomId} />
    </main>
  );
}
