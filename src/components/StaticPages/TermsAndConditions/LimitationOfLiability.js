import React, { Fragment } from "react"
import Collapsible from "elements/Collapsible"

const LimitationOfLiability = () => {
  return (
    <Fragment>
      <p className="is-size-3 has-text-weight-bold mb-1">
        Limitation of Liability
      </p>
      <Collapsible title="General" isOpen>
        <ol>
          <li>
            MedGrocer shall not be responsible or liable in any manner to the
            User for any losses, damage, injuries, or expenses incurred by the
            User as a result of any actions or decisions taken as a result of
            using the Website or services offered by MedGrocer
          </li>
          <li>
            In no event shall MedGrocer, or any of its directors, officers,
            employees, agents, or content or service providers be liable for any
            direct, indirect, special, incidental, consequential, exemplary, or
            punitive damages arising from, or directly or indirectly related to
            the use of or the inability to use the Website or the content,
            materials, and functions relations thereto and the User’s provision
            of information via the Website. In no event shall such be liable for
            lost business or lost sales, even if the User has been advised of
            the possibility of such damages. In no event shall MedGrocer be
            liable for any content posted, transmitted, exchanged, or received
            by or on behalf of any User or other person on or through the
            Website.
          </li>
        </ol>
      </Collapsible>

      <Collapsible title="Services on this Website">
        MedGrocer is not liable for any damages related to the use of our
        services, and products used through our services.
      </Collapsible>

      <Collapsible title="Third-party Websites">
        The Website may be linked to the website of third parties, affiliates,
        and business partners. MedGrocer has no control over and accepts no
        responsibility for the content of any site to which a link from the
        Website exists. Such linked sites are provided “as is” for the User’s
        convenience with no warranty, express or implied, for the information
        provided within them. Inclusion of any link on the Website does not
        imply that MedGrocer endorses the linked site. The User may use the
        links and these services at the User’s own risk. The User must not,
        without permission from MedGrocer, frame any of the Website onto another
        website.
      </Collapsible>
    </Fragment>
  )
}

export default LimitationOfLiability
