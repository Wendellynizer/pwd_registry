
import { Page, Text, View, Document, PDFViewer } from '@react-pdf/renderer';
import {Table, TR, TH, TD} from '@ag-media/react-pdf-table';
import { createTw } from "react-pdf-tailwind";
import { styles } from './styles';
 
 const Report1 = () => {

  // The 'theme' object is your Tailwind theme config
  const tw = createTw({
    theme: {
      fontFamily: {
        sans: ["Poppins"],
      },
      extend: {
        colors: {
          custom: "#bada55",
        },
      },
    },
  });

  const TableComponent = () => {
    <Table>
      <TH>
        <TD stylle={styles.black}>Speech and Language</TD>
      </TH>
    </Table>
  };


  // Create Document Component
  const ReportPDF = () => (
    <Document>
      <Page size="A4" style={tw("p-12 text-sans")}>
        <View style={styles.page}>
          <Table>
            <TH>
              <TD style={styles.td}>Speech and Language</TD>
              <TD style={styles.td}>Visual</TD>
              <TD style={styles.td}>Learning</TD>
              <TD style={styles.td}>Mental</TD>
              <TD style={styles.td}>Intellectual</TD>
              <TD style={styles.td}>Physical</TD>
              <TD style={styles.td}>Psychosocial</TD>
              <TD style={styles.td}>Hearing</TD>
              <TD style={styles.td}>Cancer</TD>
              <TD style={styles.td}>Rare Disease</TD>
            </TH>
          </Table>
        </View>
      </Page>
    </Document>
  );

   return (
     <div>
        <div className='w-full h-[750px]'>
          <PDFViewer width="100%" height="100%">
            <ReportPDF />
          </PDFViewer>
        </div>
     </div>
   )
 }
 
 export default Report1