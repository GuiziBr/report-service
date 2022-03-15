export interface ISendEmail {
  sourceName: string
  sourceEmail: string
  toAddresses: Array<string>
  textData: string
  subjectData: string
}

export interface EmailService {
  sendEmail({}: ISendEmail): Promise<void>
}