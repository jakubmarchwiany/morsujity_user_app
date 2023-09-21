import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { Box } from "@mui/material";
import mapboxgl, { Map, Marker } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Dispatch, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ENV } from "utils/validate_env";

const { VITE_MAPBOX_TOKEN } = ENV;
mapboxgl.accessToken = VITE_MAPBOX_TOKEN;

const INITIAL_STATE = {
    longitude: 19.222628,
    latitude: 52.214174,
    zoom: 5,
};

let marker: null | Marker;

type Props = {
    setCoordinate: Dispatch<React.SetStateAction<[number, number] | undefined>>;
};

export function CreateGroupMap({ setCoordinate }: Props) {
    const [lng, setLng] = useState(INITIAL_STATE.longitude);
    const [lat, setLat] = useState(INITIAL_STATE.latitude);

    const mapContainer = useRef(null);
    const map = useRef<null | Map>(null);

    useEffect(() => {
        if (map.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: "mapbox://styles/kvbik/clmqlvvri027u01qx275uetd0",
            center: [lng, lat],
            zoom: INITIAL_STATE.zoom,
        });

        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
            marker: false,
        });
        map.current.addControl(geocoder, "top-left");

        const navigation = new mapboxgl.NavigationControl({});
        map.current.addControl(navigation, "top-left");

        map.current.on("move", (event) => {
            const lngCenter = parseFloat(map.current!.getCenter().lng.toFixed(4));
            const latCenter = parseFloat(map.current!.getCenter().lat.toFixed(4));
            setLng(lngCenter);
            setLat(latCenter);
        });

        map.current.on("wheel", (event) => {
            toast.remove();
            if (event.originalEvent.ctrlKey) return;

            if (event.originalEvent.altKey) return;

            toast("Aby przybliżyć przytrzymaj Alt lub Ctrl + Scroll");
            event.preventDefault();
        });

        marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);
    }, []);

    useEffect(() => {
        marker?.setLngLat([lng, lat]);
        setCoordinate([lng, lat]);
    }, [lng, lat]);

    return (
        <Box>
            <div
                ref={mapContainer}
                className='map-container'
                style={{ minHeight: "40vh", width: "100%" }}
            />
        </Box>
    );
}
