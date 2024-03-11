import { useRouter } from "next/router";
import WebSocketTest from "@/components/WebSocketTest";
import GameLobby from "@/components/GameLobby";
import EnterName from "@/components/EnterName";

export default function Page({ params }: { params: { roomId: string } }) {
  // return <GameLobby roomId={params.roomId} />;
  return <EnterName />;
}
