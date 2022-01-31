import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'

const Map = () => {

    return (
        <div>
             <MapContainer center={[42.3591, -83.0665]} zoom={14} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[42.361439, -83.069901]}>
                    <Popup>
                        Parking Structure 1
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default Map