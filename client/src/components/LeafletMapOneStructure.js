import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const LeafletMapOneStructure = ({structureInfo}) => {
    return (
        <div>
            <MapContainer center={structureInfo.coordinates} zoom={17} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={structureInfo.coordinates}>
                    <Popup>
                        Parking Structure {structureInfo.number}
                    </Popup>
                </Marker>
            </MapContainer>
            <div className='map-container'></div>
        </div>
    )
}

export default LeafletMapOneStructure;