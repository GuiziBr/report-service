import * as axios from 'axios'
import { AuthService, IGetSessionTokenResponse } from '../domain/authService'

interface ExpensesSessionResponse {
  data: {
    user: {
      id: string
      name: string
      email: string
      avatar?: string
      created_at: string
      updated_at: string 
    },
    token: string
  }
}

class ExpensesAuthenticationService implements AuthService {

  private email: string
  
  private password: string

  private endpoint: string

  constructor() {
    this.email = "guizi189@gmail.com"
    this.password = "guizi2702"
    this.endpoint = 'http://localhost:3333/sessions'
  }
  
  async getSessionToken(): Promise<IGetSessionTokenResponse | null> {
    const { data }: ExpensesSessionResponse = await axios.default.post(this.endpoint, {
      email: this.email,
      password: this.password
    })
    return data.token 
    ? { 
      sessionToken: data.token, 
      userEmail: data.user.email,
      username: data.user.name
    } 
    : null
  }
}

export default ExpensesAuthenticationService