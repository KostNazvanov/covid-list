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
  Country: string;
  CountryCode: string;
  Lat: string;
  Lon: string;
  Cases: number;
  Status: string;
  Date: string;
}

export type ICases = ICase[];

export interface IState {
  countries: ICountries;
  cases: ICases;
}
