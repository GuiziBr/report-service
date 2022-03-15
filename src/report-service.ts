import { AuthService } from './domain/authService'
import { BalanceService } from './domain/balanceService'
import { ReportService } from './domain/reportService'
import { EmailService } from './domain/emailService'
import ExpensesAuthenticationService from './services/ExpensesAuthenticationService'
import ExpensesBalanceService from './services/ExpensesBalanceService'
import ExpensesReportService from './services/ExpensesReportService'
import ExpensesEmailService from './services/ExpensesEmailService'

class Handler {

  private AuthSvc: AuthService

  private balanceSvc: BalanceService

  private reportSvc: ReportService

  private emailSvc: EmailService

  private reportDate: Date

  constructor({ authSvc, balanceSvc, reportSvc, emailSvc, reportDate }) {
    this.AuthSvc = authSvc
    this.balanceSvc = balanceSvc
    this.reportSvc = reportSvc
    this.emailSvc = emailSvc
    this.reportDate = reportDate
  }

  async main() {
    try {
      const userSession = await this.AuthSvc.getSessionToken()
      if(!userSession) return 'Non Authorized'

      const { sessionToken, userEmail, username } = userSession

      const balance = await this.balanceSvc.getBalance(sessionToken, this.reportDate)
      if(!balance) return 'No balance found'

      const report = this.reportSvc.buildReport(balance, 'guizi189@gmail.com', 'Guizi', this.reportDate)

      await this.emailSvc.sendEmail({ 
        sourceEmail: userEmail, 
        sourceName: username,
        subjectData: report.subject, 
        textData: report.text,
        toAddresses: [report.to]
      })
    
    } catch (error) {
      console.log(error)
    }
    return {
      statusCode: 200
    }
  }
}

const handler = new Handler({
  authSvc: new ExpensesAuthenticationService(),
  balanceSvc: new ExpensesBalanceService(),
  reportSvc: new ExpensesReportService(),
  emailSvc: new ExpensesEmailService(),
  reportDate: new Date(2022,1)
})

export const reportService = handler.main.bind(handler)