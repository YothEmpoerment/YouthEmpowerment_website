"use client";

import dynamic from "next/dynamic";

const PakistanPresenceMap = dynamic(() => import("@/components/PakistanPresenceMap"), {
  ssr: false,
});

type City = {
  name: string;
  lat: number;
  lng: number;
};

export default function PakistanPresenceMapDynamic({ cities }: { cities: City[] }) {
  return <PakistanPresenceMap cities={cities} />;
}
