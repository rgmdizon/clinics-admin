import { inquiryTicketBody } from "../utils/templates/inquiryZendeskTemplate"
import { sendToZendesk } from "../../../services/zendeskService"

const generateTags = () => {
  const templateTags = ["concentrix", "inquiry"]
  let subject
  subject = "Contact Us Inquiry"
  if (process.env.GATSBY_ENV !== "production") templateTags.push("test")
  return { tags: templateTags, subject }
}

const generateInquiryTicket = (ticketData, template) => {
  const TEST_PREFIX = process.env.GATSBY_ENV !== "production" ? "[TEST] " : ""

  return {
    type: "inquiry",
    subject: `${TEST_PREFIX}${ticketData.subject}`,
    requester: { name: ticketData.email, email: ticketData.email },
    comment: { body: template(ticketData) },
    tags: ticketData.tags,
  }
}

export const sendInquiry = async (
  formData,
  callback,
  errorCallback,
  module
) => {
  try {
    let { tags, subject } = generateTags()

    let inquiryTicket = generateInquiryTicket(
      { ...formData, tags, subject },
      inquiryTicketBody
    )
    await sendToZendesk(inquiryTicket, [], module)
    if (callback) callback()
  } catch (error) {
    if (errorCallback) errorCallback()
  }
}
