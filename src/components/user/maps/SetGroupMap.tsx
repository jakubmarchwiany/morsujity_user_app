import { AcUnit } from "@mui/icons-material";
import { toast } from "react-hot-toast";
import Map, { FullscreenControl, GeolocateControl, Marker, NavigationControl } from "react-map-gl";

const { VITE_MAPBOX_TOKEN } = import.meta.env;

type Props = {
    coordinates: [number, number];
    setCoordinates: (coordinates: [number, number]) => void;
};

function SetGroupMap({ coordinates, setCoordinates }: Props) {
    const onWheel = (event: any) => {
        if (event.originalEvent.ctrlKey | event.originalEvent.altKey) {
            return;
        }
        toast.error("Aby zoomować użyj (ctrl lub alt) + scrolla ", {
            id: "scrollInfo",
            duration: 1000,
        });
        event.preventDefault();
    };

    return (
        <Map
            initialViewState={{
                longitude: 19,
                latitude: 52,
                zoom: 4.7,
            }}
            reuseMaps
            mapboxAccessToken={VITE_MAPBOX_TOKEN}
            mapStyle='mapbox://styles/mapbox/outdoors-v12'
            attributionControl={false}
            onWheel={onWheel}
            style={{ minHeight: "40vh" }}
            onMove={(event) => {
                setCoordinates([event.viewState.longitude, event.viewState.latitude]);
            }}
        >
            <GeolocateControl showAccuracyCircle={false} position='top-left' />
            <FullscreenControl position='bottom-right' />
            <NavigationControl position='bottom-right' />

            <Marker longitude={coordinates[0]} latitude={coordinates[1]} anchor='bottom'>
                <AcUnit fontSize='large' sx={{ color: "secondary.main" }} />
            </Marker>
        </Map>
    );
}
export default SetGroupMap;
