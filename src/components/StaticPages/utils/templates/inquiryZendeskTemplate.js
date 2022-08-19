export const inquiryTicketBody = request => {
  let { fullName, email, emailBody, subject } = request

  return `Name: ${fullName}
  Email: ${email}
  Subject: ${subject}
  Message: 
  ${emailBody} 
  `
}
