import { useRouter } from "next/router";
import WebSocketTest from "@/components/WebSocketTest";
import GameLobby from "@/components/GameLobby";
import EnterName from "@/components/EnterName";

export default function Page({ params }: { params: { roomId: string } }) {
  return <EnterName roomId={params.roomId} />;
}
