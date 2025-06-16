import React, { useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { DATABIT } from '../../config/constant';
import { Decode64 } from '../../utils/crypto';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Maps = (props) => {
  const { latcenter, lngcenter, zoom, items } = props;

  useEffect(() => {
    console.log(latcenter);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: Decode64(localStorage.getItem('apikey_maps')) }}
        defaultCenter={{ lat: latcenter, lng: lngcenter }}
        defaultZoom={zoom}
      >
        {items.map((item, index) => (
          <AnyReactComponent key={index} lat={item.lat} lng={item.lng} text={item.text} />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Maps;
