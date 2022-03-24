import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const LeafletMap = () => {
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
                <Marker position={[42.356515, -83.073742]}>
                    <Popup>
                        Parking Structure 2
                    </Popup>
                </Marker>
                <Marker position={[42.357561, -83.063282]}>
                    <Popup>
                        Parking Structure 3
                    </Popup>
                </Marker>
                <Marker position={[42.355912, -83.055128]}>
                    <Popup>
                        Parking Structure 4
                    </Popup>
                </Marker>
                <Marker position={[42.358132, -83.074188]}>
                    <Popup>
                        Parking Structure 5
                    </Popup>
                </Marker>
                <Marker position={[42.356903, -83.066474]}>
                    <Popup>
                        Parking Structure 6
                    </Popup>
                </Marker>
                <Marker position={[42.349030, -83.057054]}>
                    <Popup>
                        Parking Structure 7
                    </Popup>
                </Marker>
                <Marker position={[42.353747, -83.063791]}>
                    <Popup>
                        Parking Structure 8
                    </Popup>
                </Marker>
            </MapContainer>
            <div className='map-container'></div>
        </div>
    )
}

export default LeafletMap