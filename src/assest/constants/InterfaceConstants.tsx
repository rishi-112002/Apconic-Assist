export interface UserInfo {
    '@odata.context': string;
    businessPhones: string[];
    displayName: string;
    givenName: string;
    id: string;
    jobTitle: string | null;
    mail: string | null;
    mobilePhone: string | null;
    officeLocation: string | null;
    preferredLanguage: string | null;
    surname: string;
    userPrincipalName: string;
  }