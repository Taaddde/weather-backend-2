import { Weather } from './';

interface Coord {
  lat: number;
  lon: number;
}

interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface Forecast {
  cod: string;
  message: number;
  cnt?: number;
  city?: City;
  list?: Weather[];
}
