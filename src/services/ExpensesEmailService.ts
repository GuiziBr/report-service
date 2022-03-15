import { SES } from 'aws-sdk'
import { Message } from 'aws-sdk/clients/ses'
import { EmailService, ISendEmail } from '../domain/emailService'

class ExpensesEmailService implements EmailService {

  private client: SES

  constructor() {
    this.client = new SES()
  }

  private buildMessage(textData: string, subjectData: string): Message {
    return {
      Body: { Text: { Data: textData }},
      Subject: { Data: subjectData }
    }
  }

  async sendEmail({ 
    sourceName, 
    sourceEmail, 
    toAddresses, 
    textData, 
    subjectData
  }: ISendEmail): Promise<void> {
     await this.client.sendEmail({
      Source: `${sourceName} <${sourceEmail}>`,
      Destination: { ToAddresses: toAddresses },
      Message: this.buildMessage(textData, subjectData),
    }).promise()
  }
}

export default ExpensesEmailService