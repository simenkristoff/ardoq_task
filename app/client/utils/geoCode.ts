import Geocode from 'react-geocode';

const API_KEY = process.env.GEO_LOCATION_API ? process.env.GEO_LOCATION_API : '';
const LOCALE = process.env.LOCALE ? process.env.LOCALE : 'no';
const REGION = process.env.REGION ? process.env.REGION : 'no';

const geoCode = Geocode;
geoCode.setApiKey(API_KEY);
geoCode.setLanguage(LOCALE);
geoCode.setRegion(REGION);
geoCode.enableDebug();
export default geoCode;
