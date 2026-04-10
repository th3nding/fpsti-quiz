const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const xml2js = require('xml2js');

const docxPath = 'C:\\Users\\shenyue05\\Desktop\\FPSTI测试.docx';
const zip = new AdmZip(docxPath);
const xmlEntry = zip.getEntry('word/document.xml');
const xmlContent = xmlEntry.getData().toString('utf-8');

const parser = new xml2js.Parser();
parser.parseString(xmlContent, (err, result) => {
  if (err) {
    console.error('Error parsing XML:', err);
    return;
  }
  
  // Extract text from the document
  const text = JSON.stringify(result, null, 2);
  fs.writeFileSync('C:\\Users\\shenyue05\\Desktop\\docx_content.json', text);
  console.log('Content extracted to docx_content.json');
});
