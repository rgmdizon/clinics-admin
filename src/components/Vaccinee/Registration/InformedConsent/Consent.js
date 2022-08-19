import React from "react"
import classNames from "classnames"

const Consent = ({ vaccineeState, styles }) => {
  return (
    <section
      className={classNames("columns is-mobile", styles["consentScaling"])}
    >
      <div className="column">
        <p
          className={classNames(
            "mb-1 has-text-justified",
            styles["consentScaling"]
          )}
        >
          I confirm that I have been provided with and have read the COVID-19
          Vaccine Moderna / Pfizer-BioNTech / AstraZeneca / Sinovac Emergency
          Use Authorization (EUA) Information Sheet and the same has been
          explained to me. The FDA has amended the Emergency Use Authorization
          for these COVID-19 Vaccines to allow its use as either primary or
          booster dose for specific populations in light of new scientific
          evidence.
        </p>
        <p
          className={classNames(
            "mb-1 has-text-justified",
            styles["consentScaling"]
          )}
        >
          I confirm that I have been screened for conditions that may merit
          deferment or special precautions for vaccinations as indicated in the
          Health Screening Questionnaire. The United States Center for Disease
          Control and Prevention (US CDC) and its partners are actively
          monitoring reports of myocarditis and pericarditis after COVID-19
          vaccination.
        </p>
        <p
          className={classNames(
            "mb-1 has-text-justified",
            styles["consentScaling"]
          )}
        >
          I have received sufficient information on the benefits and risks of
          receiving a dose of the COVID-19 vaccine and I understand the possible
          risks if I am not vaccinated with a dose of the vaccine.
        </p>
        <p
          className={classNames(
            "mb-1 has-text-justified",
            styles["consentScaling"]
          )}
        >
          I have received sufficient information on the benefits and risks of
          receiving a dose of the COVID-19 vaccine and I understand the possible
          risks if I am not vaccinated with a dose of the vaccine.
        </p>
        <p
          className={classNames(
            "mb-1 has-text-justified",
            styles["consentScaling"]
          )}
        >
          I was provided an opportunity to asks questions, all of which were
          adequately and clearly answered, I therefore voluntarily release the
          Government of the Philippines, the vaccine manufacturer, their agents,
          and employees, as well as the hospital, the medical doctors and
          vaccinators from all claims relating to the results of the use and
          administration of, or the ineffectiveness of a dose of COVID-19
          vaccines.
        </p>
        <p
          className={classNames(
            "mb-1 has-text-justified",
            styles["consentScaling"]
          )}
        >
          I understand that while most side effects are minor and resolve on
          their own, there is a small risk of a severe adverse reactions, such
          as, but not limited to allergies and blood clots associated with low
          platelet counts (vaccine-induced thrombotic thrombocytopenia), heart
          conditions (e.g myocarditis and pericarditis) and that should prompt
          medical attention be needed, referral to the nearest hospital shall be
          provided immediately by the Government of the Philippines. I have been
          given contact information for follow up for any symptoms which I may
          experience after vaccination.
        </p>
        <p
          className={classNames(
            "mb-1 has-text-justified",
            styles["consentScaling"]
          )}
        >
          understand that by signing this Form, I have the right to health
          benefit packages under the Philippine Health Insurance Corporation
          (PhilHealth), in case I suffer a severe and/or serious adverse event,
          which is found to be associated with these COVID-19 vaccines or its
          administration. I understand that the right to claim compensation is
          subject to the guidelines to the PhilHealth.
        </p>
      </div>
      <div className="column">
        <p
          className={classNames(
            "mb-1 has-text-justified",
            styles["consentScaling"]
          )}
        >
          I authorize releasing all information needed for public health
          purposes including reporting to applicable national vaccine
          registries, consistent with personal and health information storage
          protocols of the Data Privacy Act of 2012.
        </p>
        <p
          className={classNames(
            "mb-1 has-text-justified",
            styles["consentScaling"]
          )}
        >
          I hereby give my consent to receive a dose of the COVID-19 Vaccine
          Moderna / Pfizer-BioNTech / Sinovac / AstraZeneca.
        </p>
        <div
          className={classNames(
            "mb-1 has-text-justified",
            styles["consentScaling"]
          )}
        >
          <div
            className={classNames(
              "has-text-centered has-text-weight-bold is-size-6 mt-2",
              styles["hasBorderTop"],
              styles["hasTextOrange"]
            )}
          >
            Signature over printed name
          </div>
          <div
            className={classNames(
              "has-text-centered has-text-weight-bold is-size-6 mt-2",
              styles["hasBorderTop"],
              styles["hasTextOrange"]
            )}
          >
            Date
          </div>
        </div>
        <p
          className={classNames(
            "mb-1 has-text-justified",
            styles["consentScaling"]
          )}
        >
          I have witnessed the accurate reading of the consent form and
          liability waiver to the eligible individual; sufficient information
          was given and queries raised were adequately answered. I hereby
          confirm that he/she has given his/her consent to be vaccinated with
          the COVID-19 Vaccine Moderna / Pfizer-BioNTech / Sinovac /
          AstraZeneca.
        </p>
        <div
          className={classNames(
            "mb-1 has-text-justified",
            styles["consentScaling"]
          )}
        >
          <div
            className={classNames(
              "has-text-centered has-text-weight-bold is-size-6 mt-2",
              styles["hasBorderTop"],
              styles["hasTextOrange"]
            )}
          >
            Signature over printed name
          </div>
          <div
            className={classNames(
              "has-text-centered has-text-weight-bold is-size-6 mt-2",
              styles["hasBorderTop"],
              styles["hasTextOrange"]
            )}
          >
            Date
          </div>
        </div>
        <p
          className={classNames(
            "mb-1 has-text-justified",
            styles["consentScaling"]
          )}
        >
          If you chose not to get a dose of vaccine, please list down your
          reason/s:
        </p>
        <div className={classNames("mt-2", styles["hasBorderTop"])}></div>
        <div className={classNames("mt-2", styles["hasBorderTop"])}></div>
        <div className={classNames("mt-2", styles["hasBorderTop"])}></div>
        <div className={classNames("mt-2", styles["hasBorderTop"])}></div>
      </div>
    </section>
  )
}

export default Consent
