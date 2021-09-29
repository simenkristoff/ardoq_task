import React, { useEffect, useRef } from 'react';

import { Layout } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { LatLngTuple, Marker } from 'leaflet';
import { MapContainer as Wrapper, TileLayer } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import socketClient from 'socket.io-client';

import Sidebar from '@/components/Sidebar';
import StationMarker from '@/components/StationMarker';
import { fetchStations, updateStationStatuses } from '@/store/ducks/stations/actions';
import { StationStatus } from '@/store/ducks/stations/types';
import { ApiSocketResponse, ApplicationState, StationFormValues } from '@/types';
import { findNearest, geoCode } from '@/utils';

/**
 * MapContainer handles logic behind what's displayed on the map.
 * It initializes the stations from a GET-request, and updates the
 * station statuses each 10s through a socket-stream.
 */
const MapContainer: React.FC = () => {
  const dispatch = useDispatch();
  const markerRef = useRef<{ [key: string]: Marker }>({});
  const [form] = useForm<StationFormValues>();
  const position: LatLngTuple = [59.925488, 10.746058];
  const { data, loading } = useSelector(({ station }: ApplicationState) => station);

  useEffect(() => {
    dispatch(fetchStations());
  }, []);

  useEffect(() => {
    if (!loading && Object.keys(data).length > 0) {
      const socket = socketClient('http://localhost:8000');
      socket.on('connect', () => {
        console.log('Connected');
      });
      socket.on('data', (res: ApiSocketResponse<{ stations: StationStatus[] }>) => {
        dispatch(updateStationStatuses(res.data.stations));
      });
      socket.on('error', (err) => {
        console.log(err);
      });
    }
  }, [loading]);

  const findClosest = (values: StationFormValues) => {
    form.setFields([{ name: 'submit', errors: [] }]);
    const { address, radius } = values;
    geoCode
      .fromAddress(`${address.replace(/(,?\s*?oslo+[,?\s*?A-Za-z]*$)/gim, '')}, Oslo`)
      .then((res) => {
        const { lat, lng } = res.results[0].geometry.location;
        const station = findNearest(lat, lng, radius, data);
        if (station) {
          const stationRef = markerRef.current[station.station_id];
          stationRef.openPopup();
        }
      })
      .catch(() => {
        form.setFields([
          {
            name: 'submit',
            errors: [
              'Kunne ikke finne nærmeste stasjon. Sjekk om adressen er skrevet inn riktig, hvis ikke kan du prøve og justere søkeradiusen.',
            ],
          },
        ]);
      });
  };

  return (
    <Layout>
      <Layout className='main-content'>
        <Layout.Content>
          <Wrapper id='map' preferCanvas={true} center={position} zoom={13} scrollWheelZoom={true}>
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
            {Object.keys(data).length > 0 &&
              Object.entries(data).map(([key, value]) => {
                return (
                  <StationMarker
                    innerRef={(el: Marker) => (markerRef.current[key] = el)}
                    key={key}
                    data={value}
                  />
                );
              })}
          </Wrapper>
        </Layout.Content>
      </Layout>
      <Sidebar form={form} onFinish={findClosest} />
    </Layout>
  );
};

export default MapContainer;
