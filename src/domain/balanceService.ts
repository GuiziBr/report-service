export interface IExpensesBalance {
  personalBalance: number
  sharedBalance: {
    total: number
    paying: number
    payed: number
  }
}

export interface BalanceService {
  getBalance(sessionToken: string, reportDate: Date): Promise<IExpensesBalance | null>
}