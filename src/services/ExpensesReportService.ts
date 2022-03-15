import { format } from 'date-fns'
import { ReportService, IBalance, IReportData } from '../domain/reportService'

class ExpensesReportService implements ReportService {

  private formatAmount(valueInCents: number = 0): string {
    return Intl.NumberFormat('pt-BR',{ 
      style: 'currency', currency: 'BRL' 
    }).format(valueInCents / 100)
  }
  
  buildReport(balance: IBalance, to: string, name: string, reportDate: Date): IReportData {
    const text = `
      Dear ${name},

      Monthly Report - ${format(reportDate, 'yyyy/MM')}

      Shared Balance:
      Your Incomes are ${this.formatAmount(balance.sharedBalance.paying)}
      Your Outcomes are ${this.formatAmount(balance.sharedBalance.payed)}
      Your Current Balance is ${this.formatAmount(balance.sharedBalance.total)}

      Your Current Personal Balance is ${this.formatAmount(balance.personalBalance)}

      Please bear in mind that your deadline for registering new expenses is up to today at 23h59, consider taking a moment to check your expenses

      To see more details visit https://expenses-portal.herokuapp.com/

      Regards,

      Admin
    `
    console.log(text)
    return { to, subject: 'Expenses Portal - Monthly Report', text } 
  }
}

export default ExpensesReportService