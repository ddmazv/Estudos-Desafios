import { GOOGLE_MAPS_API } from "@/envProps";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";

export function Bgmap() {
  const position = { lat: 53.54992, lng: 10.00678 };

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API}>
      <Map
        defaultCenter={position}
        defaultZoom={10}
        mapId="DEMO_MAP_ID"
        mapTypeId="hybrid"
        disableDefaultUI={true}
        colorScheme="FOLLOW_SYSTEM"
      >
        <AdvancedMarker position={position} />
      </Map>
    </APIProvider>
  );
}
