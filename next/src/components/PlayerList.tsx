"use client";

import React from "react";
import { Player } from "@/lib/types";

interface PlayerListProps {
  players: Player[];
}

const PlayerList: React.FC<PlayerListProps> = ({ players }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold">Players</h2>
      <ul>
        {players.map((p) => (
          <li key={p.name}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
