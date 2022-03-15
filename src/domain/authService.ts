export interface IGetSessionTokenResponse {
  sessionToken: string
  userEmail: string
  username: string
}

export interface AuthService {
  getSessionToken(): Promise<IGetSessionTokenResponse | null>
}