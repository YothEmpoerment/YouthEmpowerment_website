"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";

const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

type City = {
  name: string;
  lat: number;
  lng: number;
};

type PakistanPresenceMapProps = {
  cities: City[];
};

export default function PakistanPresenceMap({ cities }: PakistanPresenceMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Guard against strict-mode/double-mount and hot-reload reusing the same DOM node.
    const existingLeafletId = (container as any)._leaflet_id;
    if (existingLeafletId) {
      (container as any)._leaflet_id = undefined;
    }

    const map = L.map(container, {
      center: [30.3753, 69.3451],
      zoom: 5,
      scrollWheelZoom: false,
    });
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    cities.forEach((city) => {
      const marker = L.marker([city.lat, city.lng], { icon: markerIcon }).addTo(map);
      marker.bindPopup(city.name);
      marker.bindTooltip(city.name, { direction: "top", offset: [0, -28], opacity: 0.95 });
    });

    return () => {
      if (map) {
        map.remove();
        mapRef.current = null;
      }

      if (containerRef.current) {
        (containerRef.current as any)._leaflet_id = undefined;
      }
    };
  }, [cities]);

  return (
    <div className="rounded-3xl overflow-hidden border border-[#dbe5f5] dark:border-[#0d2d6b] h-[360px] sm:h-[420px] bg-white dark:bg-[#081e50]">
      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
}
