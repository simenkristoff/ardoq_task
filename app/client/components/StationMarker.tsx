import React from 'react';

import { Card, Progress, Space, Row, Col, Typography, Descriptions } from 'antd';
import leaflet from 'leaflet';
import moment from 'moment';
import { renderToStaticMarkup } from 'react-dom/server';
import { Marker, Popup } from 'react-leaflet';

import markerGreen from '@/assets/images/marker-icon-green.png';
import markerRed from '@/assets/images/marker-icon-red.png';
import { StationEntity } from '@/store/ducks/stations/types';

interface IProps {
  data: StationEntity;
  innerRef?: React.Ref<leaflet.Marker>;
}

/**
 * Marker reperesenting a station on the map.
 * The marker is colored based on available bikes at the current station,
 * i.e. green if vacant, red if empty.
 */
const StationMarker: React.FC<IProps> = ({ data, innerRef }: IProps) => {
  const pctBikesAvailable = (data.status.num_bikes_available / data.capacity) * 100;
  const pctDocksAvailable = (data.status.num_docks_available / data.capacity) * 100;
  return (
    <Marker
      ref={innerRef}
      icon={new MapIcon(data)}
      title={data.name}
      position={{ lat: data.lat, lng: data.lon }}
    >
      <Popup className='station-marker'>
        <Card
          title={<Typography.Title level={4}>{data.name}</Typography.Title>}
          style={{ width: 300 }}
          bordered={false}
        >
          <Row gutter={[16, 16]} justify='space-between' align='middle'>
            <Col md={12} span={24}>
              <Space direction='vertical' align='center'>
                <Typography.Title level={5}>Ledige sykler</Typography.Title>
                <Progress
                  type='circle'
                  percent={pctBikesAvailable}
                  format={() => `${data.status.num_bikes_available}/${data.capacity}`}
                  strokeColor={pctBikesAvailable > 30 ? '#87d068' : '#ff4d4f'}
                  status={
                    pctBikesAvailable === 0
                      ? 'exception'
                      : data.status.num_bikes_available === data.capacity
                      ? 'success'
                      : 'normal'
                  }
                />
              </Space>
            </Col>
            <Col md={12} span={24}>
              <Space direction='vertical' align='center'>
                <Typography.Title level={5}>Ledige plasser</Typography.Title>
                <Progress
                  type='circle'
                  percent={pctDocksAvailable}
                  format={() => `${data.status.num_docks_available}/${data.capacity}`}
                  strokeColor={pctDocksAvailable > 30 ? '#87d068' : '#ff4d4f'}
                  status={
                    pctDocksAvailable === 0
                      ? 'exception'
                      : data.status.num_docks_available === data.capacity
                      ? 'success'
                      : 'normal'
                  }
                />
              </Space>
            </Col>
          </Row>
          <Descriptions
            style={{ paddingTop: '1rem' }}
            column={1}
            labelStyle={{ fontWeight: 'bold' }}
          >
            <Descriptions.Item span={1} label='Plassering'>
              {data.address}
            </Descriptions.Item>
            <Descriptions.Item span={1} label='Sist oppdatert'>
              {moment.unix(data.status.last_reported).format('DD.MMM, HH:mm:ss')}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Popup>
    </Marker>
  );
};

class MapIcon extends leaflet.DivIcon {
  constructor(data: StationEntity) {
    super({
      html: renderToStaticMarkup(
        <div data-station={data.station_id} className='station-marker-inner'>
          <span className='info'>{data.status.num_bikes_available}</span>
          <img src={data.status.num_bikes_available > 0 ? markerGreen : markerRed} />
        </div>,
      ),
      iconAnchor: new leaflet.Point(14, 60),
      popupAnchor: new leaflet.Point(0, -35),
      iconSize: new leaflet.Point(28, 41),
      className: 'station-marker',
    });
  }
}

export default StationMarker;
