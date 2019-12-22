export interface ApiResponse {
  LanguageCode: string;
  SearchParameters: object;
  SearchResult: SearchResult;
}

export interface SearchResult {
  SearchResultCount: number;
  SearchResultCountAll: number;
  SearchResultItems: ResultItem[];
  UserArea: object;
}

export interface ResultItem {
  MatchedObjectId: string;
  MatchedObjectDescriptor: JobDetails;
  RelevanceRank: number;
}

export interface JobDetails {
  PositionID: string;
  PositionTitle: string;
  PositionURI: string;
  PositionLocation: Location[];
  OrganizationName: string;
  PositionRemuneration: Remuneration[];
  PositionStartDate: string;
  PositionEndDate: string;
  PublicationStartDate: string;
  ApplicationCloseDate: string;
  QualificationSummary: string;
  [additionalProperties: string]: any;
}

export interface Location {
  LocationName: string;
  [additionalProperties: string]: any;
}

export interface Remuneration {
  MinimumRange: string;
  MaximumRange: string;
  RateIntervalCode: RateInterval.PerYear | RateInterval.PerHour ;
}

export const enum RateInterval {
  PerYear = "Per Year",
  PerHour = "Per Hour"
}
