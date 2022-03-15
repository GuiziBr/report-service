export interface IReportData {
  text: string
  subject: string
  to: string
  html?: string
}

export interface IBalance {
  personalBalance: number
  sharedBalance: {
    payed: number
    paying: number
    total: number
  }
}

export interface ReportService {
  buildReport(balance: IBalance, to: string, name: string, reportDate: Date): IReportData
}