import React, { useEffect, useState } from "react"
import { Page, Text, View, Document, Image } from '@react-pdf/renderer'
import * as svg from 'save-svg-as-png'

import { styles } from "../../../Documents/utils/styles/documentStyles.js"
import waiver from "../InformedConsent/utils/waiver.json"
import screeningQuestionnaire from "../InformedConsent/utils/screeningQuestionnaire.json"
import medgrocerLogo from "../../../../../static/images/logos/medgrocer-long.png"

function getBase64FromSVG(element) {
  return svg.svgAsPngUri(element, null)
}

const RegistrationQR = ({ vaccineeState, QRCodeValue }) => {
  const [QRCodePngURI, setQRCodePngURI] = useState("")

  const getQRCodePngURI = async (element) => {
    const URI = await getBase64FromSVG(element)
    setQRCodePngURI(URI)
  }

  useEffect(() => {
    if (QRCodeValue !== null) {
      const QRCodeSVGElement = QRCodeValue?.getElementsByTagName("svg")?.[0]
      getQRCodePngURI(QRCodeSVGElement)
    }
    
  }, [QRCodeValue])

  let waiverType = "non-covid"

  let { personalDetails, code, schedules, intakeForm } = vaccineeState || {
    personalDetails: {},
    code: {},
    schedules: {},
    intakeForm: {}
  }

  let { birthday, firstName, middleName, lastName, sex, mobileNumber } = personalDetails || {
    birthday: {},
    firstName: "",
    middleName: "",
    lastName: "",
    sex: "",
    mobileNumber: "",
  }

  sex = sex.charAt(0)

  var screeningQuestionsWithAnswers = {};
  screeningQuestionnaire.forEach((question, i) => screeningQuestionsWithAnswers[question] = Object.values(intakeForm)[i]);

  let lastNameCode = lastName?.slice(0, 3)
  let companyCode = code?.organization?.code
  let birthYearCode = birthday?.year?.value.toString().slice(2)
  let birthDateCode = String(birthday?.date?.value.toString()).padStart(2, "0")

  let vaccineeCode = `${companyCode} ${lastNameCode} ${birthDateCode}${birthYearCode}`
  vaccineeCode = vaccineeCode?.toUpperCase()

  let { organization } = code || {}

  return (
    <Document>
    <Page size="LETTER" orientation="landscape" style={[styles.body]}>
      <View style={[styles.isVCentered]}>
        <Text style={[styles.text.isSize1, styles.text.hasTextCentered]}>
          Please present this QR code at the venue.
        </Text>
        <Image cache={false} allowDangerousPaths="true" source={ {uri: QRCodePngURI} } style={[styles.margin.mt20, styles.margin.mb20, styles.isCentered, styles.width.w25]}/>
        <View>
          <Text style={[styles.title.isSize0, styles.text.hasTextCentered]}>
            {vaccineeCode}
          </Text>
        </View>
        <View style={[styles.margin.mb10]}>
          <Text style={[styles.text.isSize0, styles.text.isBold, styles.text.hasTextCentered]}>
            {firstName} {lastName}
          </Text>
          <Text style={[styles.text.isSize0, styles.text.isBold, styles.text.hasTextCentered]}>
            {organization?.tradeName}
          </Text>
        </View>
        <Text style={[styles.text.isSize1, styles.text.hasTextCentered]}>
            {schedules?.scheduleTime?.value}
          </Text>
        <Text style={[styles.text.isSize1, styles.text.hasTextCentered]}>
          {schedules?.venue?.value}
        </Text>
      </View>
    </Page>
    <Page size="LETTER" orientation="landscape" style={styles.body}> 
      <View style={[styles.header]}>
        <Image src={medgrocerLogo} style={[styles.header.logo]} />
        <Text style={[styles.title]}>
          VACCINATION SCREENING FORM
        </Text>
      </View>
      <View style={[styles.isDivider]}>
      </View>
      <View style={[styles.page]}>
        <View style={[styles.halfPage, styles.padding.pr25]}>     
          <View>
            <Text style={[styles.subtitle]}>
              VACCINATION INFORMATION
            </Text>
          </View>
          <View style={[styles.columns, styles.padding.pt10]}>
            <View style={[styles.columns.column, {width: "7.5%"}]}>
              <Text style={[styles.text, styles.hasTextLeft, styles.isVCentered]}>
                Name
              </Text>
            </View>
            <View style={[styles.columns.column, {width: "82.5%"}]}>
              <View style={[styles.box, styles.isRounded, styles.padding.pl5, styles.height.h20, {width: "92.5%"}]}>
                <Text style={[styles.text, styles.hasTextLeft, styles.isVCentered]}>
                {middleName ? `${firstName} ${middleName} ${lastName}` : `${firstName} ${lastName}` }
                </Text>
              </View>
            </View>
            <View style={[styles.columns.column, {width: "5.5%"}]}>
              <Text style={[styles.text, styles.hasTextLeft, styles.isVCentered]}>
                Sex
              </Text>
            </View>
            <View style={[styles.columns.column, {width: "4.5%"}]}>
              <View style={[styles.box, styles.isRounded, styles.padding.pl5, styles.height.h20, {width: "99.5%"}]}>
                <Text style={[styles.text, styles.hasTextLeft, styles.isVCentered]}>
                  {`${sex}`}
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.columns, styles.padding.pt10]}>
            <View style={[styles.columns.column, {width: "9%"}]}>
              <Text style={[styles.text, styles.hasTextLeft, styles.isVCentered]}>
                Mobile
              </Text>
            </View>
            <View style={[styles.columns.column, {width: "62%"}]}>
              <View style={[styles.box, styles.isRounded, styles.padding.pl5, styles.height.h20, {width: "92.5%"}]}>
                <Text style={[styles.text, styles.hasTextLeft, styles.isVCentered]}>
                {`${mobileNumber}`}
                </Text>
              </View>
            </View>
            <View style={[styles.columns.column, {width: "11%"}]}>
              <Text style={[styles.text, styles.hasTextLeft, styles.isVCentered]}>
                Birthday
              </Text>
            </View>
            <View style={[styles.columns.column, {width: "19%"}]}>
              <View style={[styles.box, styles.isRounded, styles.padding.pl5, styles.height.h20, {width: "99.5%"}]}>
                <Text style={[styles.text, styles.hasTextLeft, styles.isVCentered]}>
                  {`${birthday.month.value} ${birthday.date.value}, ${birthday.year.value}`}
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.table, styles.margin.mt15]}> 
            <View style={[styles.table.row]}> 
              <View style={[styles.table.columnHeader, styles.table.column.first, styles.width.w80]}>
                <Text style={[styles.hasTextLeft, styles.subtitle.isSize2, styles.isVCentered]}>
                  SCREENING QUESTIONNAIRE
                </Text>
              </View> 
              <View style={[styles.table.columnHeader, styles.width.w10]}>
                <Text style={[styles.title.isSize3, styles.text.hasTextCentered]}>YES</Text> 
              </View>
              <View style={[styles.title.isSize3, styles.table.columnHeader, styles.width.w10]}>
                <Text style={[styles.text.hasTextCentered]}>NO</Text> 
              </View>  
            </View>
            {Object.keys(screeningQuestionsWithAnswers).map((question) => (
              <View style={[styles.table.row]}> 
                <View style={[styles.table.column, styles.table.column.first, styles.width.w80]}> 
                  <Text style={[styles.text, styles.hasTextLeft]}>
                  {question}
                  </Text>
                </View> 
                <View style={[styles.table.column, styles.width.w10]}> 
                <Text style={[styles.tick, styles.isVCentered, styles.text.hasTextCentered]}>{screeningQuestionsWithAnswers[question] === "Yes"? "✔️" : ""}</Text> 
                </View>
                <View style={[styles.table.column, styles.width.w10]}> 
                <Text style={[styles.tick, styles.isVCentered, styles.text.hasTextCentered]}>{screeningQuestionsWithAnswers[question] === "No"? "✔️" : ""}</Text> 
                </View>  
              </View>
            ))}
          </View>
          <View style={[styles.table, styles.margin.mt15]}> 
            <View style={[styles.table.row, styles.height.h40]}> 
              <View style={[styles.width.w25]}>
              </View> 
              <View style={[styles.width.w25]}>
              </View>
              <View style={[styles.width.w50, styles.table.isCellGrey]}>
                <Text style={[styles.text, styles.text.hasTextCentered, styles.isVCentered]}>
                  To be filled by medical staff only
                </Text>
              </View>
            </View>
            <View style={[styles.table.row]}> 
              <View style={[styles.table.columnHeader, styles.table.column.first, styles.width.w25]}>
              </View> 
              <View style={[styles.table.columnHeader, styles.width.w25]}>
                <Text style={[styles.title.isSize3, styles.text.hasTextCentered]}>VACCINES</Text> 
                <Text style={[styles.title.isSize3, styles.text.hasTextCentered]}>ORDERED</Text> 
              </View>
              <View style={[styles.title.isSize3, styles.table.columnHeader, styles.width.w25, styles.table.isCellGrey]}>
                <Text style={[styles.title.isSize3, styles.text.hasTextCentered]}>PATIENT</Text> 
                <Text style={[styles.title.isSize3, styles.text.hasTextCentered]}>ORDERED</Text> 
              </View>
              <View style={[styles.title.isSize3, styles.table.columnHeader, styles.width.w25, styles.table.isCellGrey]}>
                <Text style={[styles.title.isSize3, styles.text.hasTextCentered]}>VACCINES</Text> 
                <Text style={[styles.title.isSize3, styles.text.hasTextCentered]}>ADMINISTERED</Text> 
              </View>  
            </View>
            <View style={[styles.table.row]}> 
              <View style={[styles.table.column, styles.table.column.first, styles.width.w25]}> 
                <Text style={[styles.text, styles.hasTextLeft]}>
                Flu (Trivalent)
                </Text>
              </View> 
              <View style={[styles.table.column, styles.width.w25]}> 
              </View>
              <View style={[styles.table.column, styles.width.w25, styles.table.isCellGrey]}> 
              </View>
              <View style={[styles.table.column, styles.width.w25, styles.table.isCellGrey]}> 
              </View>  
            </View>
            <View style={[styles.table.row]}> 
              <View style={[styles.table.column, styles.table.column.first, styles.width.w25]}> 
                <Text style={[styles.text, styles.hasTextLeft]}>
                Flu (Quadrivalent)
                </Text>
              </View> 
              <View style={[styles.table.column, styles.width.w25]}> 
              </View>
              <View style={[styles.table.column, styles.width.w25, styles.table.isCellGrey]}> 
              </View>
              <View style={[styles.table.column, styles.width.w25, styles.table.isCellGrey]}>   
              </View>  
            </View>
            <View style={[styles.table.row]}> 
              <View style={[styles.table.column, styles.table.column.first, styles.width.w25]}> 
                <Text style={[styles.text, styles.text.isWhite, styles.hasTextLeft]}>
                  Other vaccines
                </Text>
              </View> 
              <View style={[styles.table.column, styles.width.w25]}> 
              </View>
              <View style={[styles.table.column, styles.width.w25, styles.table.isCellGrey]}> 
              </View>
              <View style={[styles.table.column, styles.width.w25, styles.table.isCellGrey]}>                
              </View>  
            </View>
          </View>
        </View>
        <View style={[styles.halfPage, styles.padding.pl25]}>
          <View>
            <Text style={[styles.subtitle]}>
              VACCINEE WAIVER
            </Text>
          </View>
          <View>
            <Text style={[styles.text, styles.text.isBold, styles.text.isSize3, styles.margin.mt10, styles.margin.mb5]}>
                By signing this, I acknowledge that: 
            </Text>
            {waiver[waiverType].map((data) => (
              <Text style={[styles.list.item, styles.text, styles.text.isSize3, styles.isLight ]}>•    {data}</Text>
            ))}
          </View>
          <View style={[styles.box, styles.box.isPrimary, styles.isRounded, styles.margin.mt10, styles.padding.p10, styles.width.w90, styles.isCentered]}>
            <Text style={[styles.text, styles.text.isBold, styles.text.isWhite, styles.hasTextLeft, styles.margin.mt1, styles.margin.mb1]}>
              Please check only one circle. I request:
            </Text>
            <Text style={[styles.list.item, styles.text, styles.text.isWhite, styles.margin.mb0]}><span role="img" aria-label="white circle">⚪️</span>   to have the vaccine administered to me by MedGrocer’s medical staff.</Text>
            <Text style={[styles.list.item, styles.text, styles.text.isWhite, styles.margin.mb0]}><span role="img" aria-label="white circle">⚪️</span>    to have the vaccines administered by my own doctor.</Text>
            <Text style={[styles.list.item, styles.text, styles.text.isWhite, styles.margin.mb0]}><span role="img" aria-label="white circle">⚪️</span>    to cancel or defer my vaccine administration. I understand MedGrocer will reach out to me separately if there are any next steps needed.</Text>
          </View>
          <View style={[styles.table.row, styles.margin.mt60]}> 
            <View style={[styles.width.w50]}>
              <View style={[styles.line, styles.width.w75, styles.isCentered]}></View>
              <Text style={[styles.text, styles.text.hasTextCentered, styles.padding.pt3]}>
                  Vaccinee Signature
              </Text>
              <Text style={[styles.text, styles.text.hasTextCentered]}>
                above Complete Name
              </Text>
            </View> 
            <View style={[styles.width.w50]}>
              <View style={[styles.line, styles.width.w75, styles.isCentered]}></View>
              <Text style={[styles.text, styles.text.hasTextCentered, styles.padding.pt3]}>
                  Medical Staff Signature
              </Text>
              <Text style={[styles.text, styles.text.hasTextCentered]}>
                above Name
              </Text>
            </View>
          </View>
        </View> 
      </View>
    </Page>
  </Document>
  )
}

export default RegistrationQR
