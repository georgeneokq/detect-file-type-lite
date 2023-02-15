import type { CustomFunction } from "."
import JSZip from "jszip"

const customFunctions: CustomFunction[] = [
  async function zipBasedTypes(buffer) {
    // If its a zip file, unzip the contents
    const zipMagicBytes = Buffer.from([0x50, 0x4B, 0x03, 0x04])
    if(buffer.compare(zipMagicBytes, 0, zipMagicBytes.length, 0, zipMagicBytes.length) != 0)
      return false
    
    const jsZip = new JSZip()
    const zip = await jsZip.loadAsync(buffer)
    const entryNames = Object.keys(zip.files)

    // Detect JAR/APK
    if(entryNames.some(name => name.endsWith('.class')) || entryNames.includes('META-INF/MANIFEST.MF')) {
      if(entryNames.includes('AndroidManifest.xml')) {
        return {
          ext: 'apk',
          mime: 'application/vnd.android.package-archive'
        }
      }
      
      return {
        ext: 'jar',
        mime: 'application/java-archive'
      }
    }
    
    // https://learn.microsoft.com/ja-jp/archive/blogs/vsofficedeveloper/office-2007-file-format-mime-types-for-http-content-streaming-2
    // Excel file
    if(entryNames.some(name => name.startsWith('xl/')) && '[Content_Types].xml' in zip.files) {
      const contentTypesXml: string = await zip.files['[Content_Types].xml'].async('string')
      if(contentTypesXml.search('ContentType="application/vnd.ms-excel.sheet.binary.macroEnabled.main') != -1) {
        return {
          ext: 'xlsb',
          mime: 'application/vnd.ms-excel.sheet.binary.macroEnabled.12'
        }
      }
      if(contentTypesXml.search('ContentType="application/vnd.ms-excel.sheet.macroEnabled') != -1) {
        return {
          ext: 'xlsm',
          mime: 'application/vnd.ms-excel.sheet.macroEnabled.12'
        }
      }
      if(contentTypesXml.search('ContentType="application/vnd.ms-excel.addin.macroEnabled') != -1) {
        return {
          ext: 'xlam',
          mime: 'application/vnd.ms-excel.addin.macroEnabled.12'
        }
      }
      if(contentTypesXml.search('ContentType=\"application/vnd.ms-office.vbaProject') != -1) {
        return {
          ext: 'xlsm',
          mime: 'application/vnd.ms-excel.sheet.macroEnabled.12'
        }
      }
      return {
        ext: 'xlsx',
        mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
    }

    // Probably a word file
    if(entryNames.some(name => name.startsWith('word/')) && entryNames.includes('[Content_Types].xml')) {
      const contentTypesXml: string = await zip.files['[Content_Types].xml'].async('string')
      if(contentTypesXml.search('ContentType=\"application/vnd.ms-word.document.macroEnabled') != -1) {
        return {
          ext: 'docm',
          mime: 'application/vnd.ms-word.document.macroEnabled.12'
        }
      }
      if(contentTypesXml.search('ContentType="application/vnd.ms-word.template.macroEnabledTemplate') != -1) {
        return {
          ext: 'dotm',
          mime: 'application/vnd.ms-word.template.macroEnabled.12'
        }
      }
      if(contentTypesXml.search('ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.template') != -1) {
        return {
          ext: 'dotx',
          mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.template'
        }
      }
      return {
        ext: 'docx',
        mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      }
    }

    // Probably a powerpoint file
    if(entryNames.some(name => name.startsWith('ppt/')) && entryNames.includes('[Content_Types].xml')) {
      const contentTypesXml: string = await zip.files['[Content_Types].xml'].async('string')
      if(contentTypesXml.search('ContentType="application/vnd.ms-powerpoint.slideshow.macroEnabled') != -1) {
        return {
          ext: 'ppsm',
          mime: 'application/vnd.ms-word.document.macroEnabled.12'
        }
      }
      if(contentTypesXml.search('ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideshow') != -1) {
        return {
          ext: 'ppsx',
          mime: 'application/vnd.openxmlformats-officedocument.presentationml.slideshow'
        }
      }
      if(contentTypesXml.search('ContentType="application/vnd.ms-powerpoint.presentation.macroEnabled') != -1) {
        return {
          ext: 'pptm',
          mime: 'application/vnd.ms-word.document.macroEnabled.12'
        }
      }
      return {
        ext: 'pptx',
        mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      }
    }

    return false
  },
  function dll(buffer) {
      if(buffer.length < 2) return false
      
      const mzHeader = Buffer.from([0x4D, 0x5A])
      if(buffer.compare(mzHeader, 0, mzHeader.length, 0, mzHeader.length) != 0) return false

      const PE_HEADER_OFFSET = buffer.readUInt32LE(0x3c)
      const CHARACTERISTICS_OFFSET = PE_HEADER_OFFSET + 0x16
      const characteristics = buffer.readUInt16LE(CHARACTERISTICS_OFFSET)
      // IMAGE_FILE_DLL == 0x2000
      if((characteristics & 0x2000) === 0x2000) {
        return {
          ext: 'dll',
          mime: 'application/octet-stream'
        }
      }
      return false
  }
]

export default customFunctions