export interface IAction {
  type: string;

  [key: string]: any; // Payload could be any type or size
}

export interface ICountry {
  Country: string;
  Slug: string;
  ISO2: string;
}

export type ICountries = ICountry[];

export interface ICase {
  Active: number;
  City: string;
  CityCode: string;
  Confirmed: number;
  Country: string;
  CountryCode: string;
  Deaths: number;
  ID: string;
  Lat: string;
  Lon: string;
  Date: string;
  Province: string;
  Recovered: number;
}

export type ICases = ICase[];

export interface IState {
  countries: ICountries;
  cases: ICases;
}
