export interface Vote {
  fullName: string;
  firstName: string;
  lastName: string;
  awardName: string;
  category: string;
  year: number;
}

export interface AwardResults {
  awardName: string;
  year: string;
  nomenees: Nominee[];
}

export interface Nominee {
  firstName: string;
  lastName: string;
  category: string;
  votes: number;
}

export interface DynamoDBConfigOptions {
  region: string;
  httpOptions: any;
  convertEmptyValues: boolean;
}
