import { assert } from 'chai';
import { FileTypeDetector } from '../index';
import { readFile } from 'fs/promises'

describe('custom function', () => {
  it('should detect dll', async () => {
    FileTypeDetector.addCustomFunction((buffer: Buffer) => {
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
    })
    
    const buf = await readFile(`${__dirname}/test-files/fixture.dll`)
    const result = FileTypeDetector.fromBuffer(buf)
    assert.deepEqual(result, {
      ext: 'dll',
      mime: 'application/octet-stream'
    })
  })
});
