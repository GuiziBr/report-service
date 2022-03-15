import * as axios from 'axios'
import { BalanceService, IExpensesBalance } from '../domain/balanceService'

interface IExpensesBalanceResponse {
  data: {
    personalBalance: number
    sharedBalance: {
      total: number
      paying: number
      payed: number
    }
  }
}

class ExpensesBalanceService implements BalanceService {
  private endpoint: string

  constructor() {
    this.endpoint = 'http://localhost:3333/balance'
  }

  async getBalance(sessionToken: string, reportDate: Date): Promise<IExpensesBalance | null> {
    const params = { date: reportDate }
    const { data }: IExpensesBalanceResponse = await axios.default.get(this.endpoint, {
      headers: { Authorization: `Bearer ${sessionToken}`},
      params
    })
    return data
  }
}

export default ExpensesBalanceService