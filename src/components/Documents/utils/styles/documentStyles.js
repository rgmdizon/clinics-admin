import { StyleSheet, Font } from '@react-pdf/renderer'

Font.register({
    family: "Lato",
    fonts: [
      {
        src: "https://fonts.gstatic.com/s/lato/v11/h7rISIcQapZBpei-sXwIwg.ttf",
        fontWeight: 400,
      },
      {
        src: "https://fonts.gstatic.com/s/lato/v11/P_dJOFJylV3A870UIOtr0w.ttf",
        fontWeight: 400,
        fontStyle: "italic",
      },
      {
        src: "https://fonts.gstatic.com/s/lato/v11/iX_QxBBZLhNj5JHlTzHQzg.ttf",
        fontWeight: 700,
      },
      {
        src: "https://fonts.gstatic.com/s/lato/v11/WFcZakHrrCKeUJxHA4T_gw.ttf",
        fontWeight: 700,
        fontStyle: "italic",
      },
    ],
  })
  
Font.registerEmojiSource({
  format: 'png',
  url: 'https://twemoji.maxcdn.com/2/72x72/',
})

const isPrimary = "#0d6d6e"
const isSecondary = "#ee7423"
const lighterGrey = "#e8e8e8"
const white = "#ffffff"

export const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    marginLeft: 20,
    logo: {
      width: 100,
      marginBottom: 5
    },
  },
  body: {
    fontFamily: "Lato",
  },
  page: {
    flexDirection: "row" 
  },
  halfPage: {
    width: "50%",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20
  },
  line: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: isPrimary,
    width: "100%"
  },
  tick: {
    fontSize: 7
  },
  columns: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    column: { width: "auto" },
  },
  text: {
    fontSize: 9,
    isSize0: { fontSize: 30 },
    isSize1: { fontSize: 14 },
    isSize2: { fontSize: 12 },
    isSize3: { fontSize: 10 },
    isSize4: { fontSize: 9 },
    isBold: { fontWeight: "bold" },
    isPrimary: { color: isPrimary },
    isSecondary: { color: isSecondary },
    isWhite: { color: white },
    hasTextCentered: { textAlign: "center" },
    hasTextLeft: { textAlign: "left" },
    hasTextRight: { textAlign: "right" },
  },
  isCentered: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  isVCentered: {
    marginTop: "auto",
    marginBottom: "auto"
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: isPrimary,
    isSize0: { fontSize: 30, fontWeight: "bold", color: isPrimary },
    isSize1: { fontSize: 14, fontWeight: "bold", color: isPrimary },
    isSize2: { fontSize: 12, fontWeight: "bold", color: isPrimary },
    isSize3: { fontSize: 10, fontWeight: "bold", color: isPrimary },
  },
  subtitle: {
    color: isSecondary,
    fontSize: 14,
    fontWeight: "bold",
    isSize0: { fontSize: 30, fontWeight: "bold", color: isSecondary },
    isSize1: { fontSize: 14, fontWeight: "bold", color: isSecondary },
    isSize2: { fontSize: 12, fontWeight: "bold", color: isSecondary },
    isSize3: { fontSize: 10, fontWeight: "bold", color: isSecondary },
  },
  isDivider: {
    backgroundColor: isPrimary,
    width: "100%",
    height: "2pt",
    marginTop: "5pt",
    marginBottom: "5pt",
  },
  box: {
    borderStyle: "solid",
    borderColor: isPrimary,
    borderWidth: 1,
    isPrimary: {
      backgroundColor: isPrimary
    }
  },
  isRounded: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
  },
  table: {
    display: "table", 
    width: "100%", 
    borderColor: isPrimary,
    borderBottomWidth: 3,
    row: { 
      flexDirection: "row" 
    },
    column: {
      paddingTop: 5,
      paddingBottom: 5,
      borderStyle: "solid", 
      borderColor: isPrimary,
      borderBottomWidth: 1, 
      borderRightWidth: 0, 
      borderLeftWidth: 1, 
      borderTopWidth: 0,
      first: {
        borderLeftWidth: 0,
        paddingRight: 3
      }
    },
    columnHeader: {
      paddingTop: 10,
      paddingBottom: 10,
      borderStyle: "solid", 
      borderColor: isPrimary,
      borderBottomWidth: 3, 
      borderRightWidth: 0, 
      borderLeftWidth: 1, 
      borderTopWidth: 0,
    },
    isCellGrey: {
      backgroundColor: lighterGrey
    },
  },
  list: {
    item: {
    paddingRight: 0,
    textAlign: "left",
    marginTop: 2,
    marginBottom: 2
    }
  },
  width: {
    w100: { width: "100%" },
    w90: { width: "90%" },
    w80: { width: "80%" },
    w75: { width: "75%" },
    w50: { width: "50%" },
    w25: { width: "25%" },
    w10: { width: "10%" },
  },
  height: {
    h40: { height: 40 },
    h20: { height: 20}
  },
  margin: {
    mt60: { marginTop: 60 },
    mt40: { marginTop: 40 },
    mt25: { marginTop: 25 },
    mt20: { marginTop: 20 },
    mt15: { marginTop: 15 },
    mt10: { marginTop: 10 },
    mt5: { marginTop: 5 },
    mt1: { marginTop: 1 },
    mt0: { marginTop: 0.5 },
    mb60: { marginBottom: 60 },
    mb40: { marginBottom: 40 },
    mb25: { marginBottom: 25 },
    mb20: { marginBottom: 20 },
    mb10: { marginBottom: 10 },
    mb5: { marginBottom: 5 },
    mb1: { marginBottom: 1 },
    mb0: { marginBottom: 0.5 }
  },
  padding: {
    p10: { padding: 10 },
    pt3: { paddingTop: 3},
    pt10: { paddingTop: 10 },
    pl25: { paddingLeft: 25 },
    pl5: { paddingLeft: 5 },
    pr25: { paddingRight: 25 },
    pr5: { paddingRight: 5 }
  }
});