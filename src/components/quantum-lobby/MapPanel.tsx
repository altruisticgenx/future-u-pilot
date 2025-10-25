import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import LayerControl from "./LayerControl";
import { Activity, Loader2 } from "lucide-react";
import { explainImpact } from "@/lib/impactExplainer";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type DistrictStats = {
  id: string;
  name: string;
  county?: string;
  broadband_poor?: number;
  median_income?: number;
  pop?: number;
};

export default function MapPanel() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [layers, setLayers] = useState<Record<string, boolean>>({
    "NWS Alerts": true,
    "USGS Quakes": true,
    "PA Historical Markers": false,
    "PA House": true,
    "PA Senate": false,
    "Impact Heat": true
  });
  const [lastRefreshed, setLastRefreshed] = useState<{nws?: number; usgs?: number}>({});
  const [stats, setStats] = useState<Record<string, DistrictStats>>({});
  const [hovered, setHovered] = useState<DistrictStats | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    
    mapRef.current = new maplibregl.Map({
      container: containerRef.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "© OpenStreetMap contributors"
          }
        },
        layers: [{ id: "osm", type: "raster", source: "osm" }]
      },
      center: [-77.0, 40.9],
      zoom: 6
    });
    
    mapRef.current.addControl(new maplibregl.NavigationControl(), "top-right");
    mapRef.current.on("load", () => setLoaded(true));
    
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Load district stats
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/data/pa_district_stats.json");
        const arr: DistrictStats[] = await response.json();
        const byId: Record<string, DistrictStats> = {};
        for (const s of arr) byId[s.id] = s;
        setStats(byId);
      } catch (e) {
        console.error("Failed to load district stats", e);
      }
    })();
  }, []);

  // Helper functions
  function ensureSource(id: string, def: any) {
    const map = mapRef.current!;
    if (map.getSource(id)) return;
    map.addSource(id, def);
  }

  function addOrReplaceLayer(layer: any) {
    const map = mapRef.current!;
    if (map.getLayer(layer.id)) map.removeLayer(layer.id);
    map.addLayer(layer);
  }

  // Load PA districts and impact heat
  useEffect(() => {
    if (!loaded || !mapRef.current) return;
    const map = mapRef.current;

    (async () => {
      try {
        // House districts
        ensureSource("pa_house", { type: "geojson", data: "/data/pa_house.geojson" });
        addOrReplaceLayer({
          id: "pa_house_outline",
          type: "line",
          source: "pa_house",
          paint: { "line-color": "hsl(var(--primary))", "line-width": layers["PA House"] ? 1.5 : 0 }
        });
        addOrReplaceLayer({
          id: "pa_house_fill",
          type: "fill",
          source: "pa_house",
          paint: { "fill-color": "hsl(var(--primary))", "fill-opacity": layers["PA House"] ? 0.05 : 0 }
        });

        // Senate districts
        ensureSource("pa_senate", { type: "geojson", data: "/data/pa_senate.geojson" });
        addOrReplaceLayer({
          id: "pa_senate_outline",
          type: "line",
          source: "pa_senate",
          paint: { "line-color": "hsl(var(--accent))", "line-width": layers["PA Senate"] ? 1.5 : 0 }
        });
        addOrReplaceLayer({
          id: "pa_senate_fill",
          type: "fill",
          source: "pa_senate",
          paint: { "fill-color": "hsl(var(--accent))", "fill-opacity": layers["PA Senate"] ? 0.05 : 0 }
        });

        // Impact heat map (choropleth)
        if (Object.keys(stats).length > 0 && layers["Impact Heat"]) {
          const expr: any[] = ["match", ["get", "id"]];
          Object.values(stats).forEach(s => {
            expr.push(s.id, s.broadband_poor ?? 0);
          });
          expr.push(0.0); // default

          addOrReplaceLayer({
            id: "impact_heat",
            type: "fill",
            source: "pa_house",
            paint: {
              "fill-color": [
                "interpolate",
                ["linear"],
                expr,
                0.00, "#0ea5e9",
                0.10, "#22c55e",
                0.20, "#eab308",
                0.30, "#f97316",
                0.40, "#ef4444"
              ],
              "fill-opacity": 0.35
            }
          });
        }

        // Hover tooltip
        map.on("mousemove", "pa_house_fill", (e) => {
          const f = e.features?.[0];
          if (!f) return;
          const id = (f.properties as any)?.id;
          const s = stats[id];
          setHovered(s || null);
          map.getCanvas().style.cursor = "pointer";
        });

        map.on("mouseleave", "pa_house_fill", () => {
          setHovered(null);
          map.getCanvas().style.cursor = "";
        });
      } catch (e) {
        console.error("Failed to load districts", e);
      }
    })();
  }, [loaded, layers, stats]);

  // Live data overlays
  async function loadNWS() {
    if (!mapRef.current) return;
    try {
      const res = await fetch("https://api.weather.gov/alerts/active?area=PA");
      const data = await res.json();
      ensureSource("nws", { type: "geojson", data });
      addOrReplaceLayer({
        id: "nws",
        type: "fill",
        source: "nws",
        paint: layers["NWS Alerts"]
          ? { "fill-color": "#f59e0b", "fill-opacity": 0.25 }
          : { "fill-opacity": 0 }
      });
      setLastRefreshed(s => ({ ...s, nws: Date.now() }));
    } catch (e) {
      console.error("NWS load failed", e);
    }
  }

  async function loadUSGS() {
    if (!mapRef.current) return;
    try {
      const res = await fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson");
      const data = await res.json();
      ensureSource("usgs", { type: "geojson", data });
      addOrReplaceLayer({
        id: "usgs",
        type: "circle",
        source: "usgs",
        paint: layers["USGS Quakes"]
          ? { "circle-radius": 5, "circle-opacity": 0.8, "circle-color": "#22d3ee" }
          : { "circle-opacity": 0 }
      });
      setLastRefreshed(s => ({ ...s, usgs: Date.now() }));
    } catch (e) {
      console.error("USGS load failed", e);
    }
  }

  async function loadMarkers() {
    if (!mapRef.current) return;
    try {
      const rows = await fetch("https://data.pa.gov/resource/xt8f-pzzz.json?$limit=4000").then(r => r.json());
      const fc = {
        type: "FeatureCollection",
        features: rows
          .filter((r: any) => r.location?.latitude && r.location?.longitude)
          .map((r: any) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [+r.location.longitude, +r.location.latitude]
            },
            properties: { title: r.title, county: r.county }
          }))
      };
      ensureSource("pa_markers", { type: "geojson", data: fc });
      addOrReplaceLayer({
        id: "pa_markers",
        type: "circle",
        source: "pa_markers",
        paint: layers["PA Historical Markers"]
          ? { "circle-radius": 4, "circle-color": "#8b5cf6", "circle-opacity": 0.7 }
          : { "circle-opacity": 0 }
      });
    } catch (e) {
      console.error("PA markers load failed", e);
    }
  }

  useEffect(() => {
    if (loaded) {
      loadNWS();
      loadUSGS();
      loadMarkers();
    }
  }, [loaded, layers]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    if (!loaded) return;
    const id = setInterval(() => {
      loadNWS();
      loadUSGS();
    }, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, [loaded]);

  // Click-to-proximity (Overpass API for nearby facilities)
  useEffect(() => {
    if (!loaded || !mapRef.current) return;
    const map = mapRef.current;

    async function queryOverpass(lng: number, lat: number) {
      const radius = 1200; // meters
      const q = `
        [out:json][timeout:25];
        (
          node["amenity"~"clinic|hospital|shelter|social_facility"](around:${radius},${lat},${lng});
          node["public_transport"="stop_position"](around:${radius},${lat},${lng});
        );
        out center 20;
      `;
      
      try {
        toast.info("Searching for nearby facilities...");
        const res = await fetch("https://overpass-api.de/api/interpreter", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ data: q })
        });
        
        const j = await res.json();
        const fc: GeoJSON.FeatureCollection = {
          type: "FeatureCollection",
          features: (j.elements || []).map((e: any) => ({
            type: "Feature",
            geometry: { type: "Point", coordinates: [e.lon, e.lat] },
            properties: { 
              name: e.tags?.name || "Unnamed", 
              amenity: e.tags?.amenity, 
              transport: e.tags?.public_transport 
            }
          }))
        };
        
        const id = "proximity";
        if (!map.getSource(id)) {
          map.addSource(id, { type: "geojson", data: fc });
        } else {
          (map.getSource(id) as any).setData(fc);
        }

        if (map.getLayer(id)) map.removeLayer(id);
        map.addLayer({
          id,
          type: "circle",
          source: id,
          paint: { "circle-radius": 6, "circle-color": "#10b981", "circle-opacity": 0.85 }
        });
        
        toast.success(`Found ${fc.features.length} nearby facilities`);
      } catch (error) {
        toast.error("Failed to query nearby facilities");
        console.error("Overpass query failed", error);
      }
    }

    map.on("click", (e) => {
      // Only query if not clicking on a district
      const features = map.queryRenderedFeatures(e.point, { layers: ["pa_house_fill"] });
      if (features.length === 0) {
        queryOverpass(e.lngLat.lng, e.lngLat.lat);
      }
    });
  }, [loaded]);

  // Handle impact explainer button click
  async function handleExplainImpact() {
    if (!hovered || isGenerating) return;
    
    setIsGenerating(true);
    toast.info("Generating impact explanation... (first time may take a moment to load model)");
    
    try {
      const explanation = await explainImpact(hovered);
      toast.success("Impact explanation generated!", {
        description: explanation,
        duration: 10000
      });
    } catch (error) {
      toast.error("Failed to generate explanation");
      console.error("Impact explainer failed", error);
    } finally {
      setIsGenerating(false);
    }
  }

  function toggleLayer(key: string) {
    setLayers(s => ({ ...s, [key]: !s[key] }));
  }

  return (
    <div className="relative rounded-2xl overflow-hidden border border-primary/20 shadow-xl">
      <div ref={containerRef} className="h-[60vh] sm:h-[70vh] bg-background/50" />
      
      {/* Layer Control */}
      <div className="absolute top-3 left-3 pointer-events-none z-10">
        <LayerControl layers={layers} onToggle={toggleLayer} />
      </div>

      {/* Live Status Badge */}
      <div className="absolute top-3 right-3 rounded-xl bg-card/90 backdrop-blur-md border border-primary/20 p-2 text-xs shadow-lg z-10">
        <div className="flex items-center gap-2 text-foreground font-medium">
          <Activity className="h-3 w-3 text-cmd-success animate-pulse" />
          <span>Live</span>
        </div>
        <div className="mt-1 space-y-0.5 text-muted-foreground">
          <div>NWS: {lastRefreshed.nws ? new Date(lastRefreshed.nws).toLocaleTimeString() : "—"}</div>
          <div>USGS: {lastRefreshed.usgs ? new Date(lastRefreshed.usgs).toLocaleTimeString() : "—"}</div>
        </div>
      </div>

      {/* District Tooltip */}
      {hovered && (
        <div className="absolute bottom-3 left-3 max-w-sm rounded-xl bg-card/95 backdrop-blur-md border border-primary/30 p-4 text-xs shadow-xl z-10">
          <div className="font-semibold text-base text-foreground mb-2">{hovered.name}</div>
          <div className="space-y-1 text-muted-foreground mb-3">
            <div><span className="font-medium text-foreground">County:</span> {hovered.county ?? "—"}</div>
            <div><span className="font-medium text-foreground">Population:</span> {hovered.pop?.toLocaleString() ?? "—"}</div>
            <div>
              <span className="font-medium text-foreground">Poor Broadband:</span>{" "}
              {hovered.broadband_poor != null ? `${Math.round(hovered.broadband_poor * 100)}%` : "—"}
            </div>
            <div>
              <span className="font-medium text-foreground">Median Income:</span>{" "}
              {hovered.median_income ? `$${hovered.median_income.toLocaleString()}` : "—"}
            </div>
          </div>
          <Button
            size="sm"
            onClick={handleExplainImpact}
            disabled={isGenerating}
            className="w-full text-xs"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-3 w-3 mr-1.5 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Impact Explainer"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
