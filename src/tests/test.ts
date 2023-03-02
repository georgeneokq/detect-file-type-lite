import { assert } from 'chai'
import { FileTypeDetector } from '../index'
import { readFile } from 'fs/promises'

describe('file formats', async function() {
  /* 
   * File type detection by signatures should not take too long.
   * If it does, it is most likely that one of the custom functions is taking too much time to process.
   */
  this.timeout(200)

  it('should detect jpg', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.jpg`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'jpg',
      mime: 'image/jpeg'
    })
  })

  it('should detect png', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.png`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'png',
      mime: 'image/png'
    })
  })

  it('should detect gif', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.gif`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'gif',
      mime: 'image/gif'
    })
  })

  it('should detect bmp', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.bmp`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'bmp',
      mime: 'image/bmp'
    })
 })

  it('should detect jxr', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.jxr`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'jxr',
      mime: 'image/vnd.ms-photo'
    })
  })

  it('should detect psd', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.psd`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'psd',
      mime: 'image/vnd.adobe.photoshop'
    })
  })

  it('should detect encrypted zip', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture-encrypted.zip`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'zip',
      mime: 'application/zip'
    })
  })

  it('should detect zip', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.zip`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'zip',
      mime: 'application/zip'
    })
  })

  it('should detect epub', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.epub`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'epub',
      mime: 'application/epub+zip'
    })
  })

  it('should detect xpi', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.xpi`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'xpi',
      mime: 'application/x-xpinstall'
    })
  })

  it('should detect tar', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.tar`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'tar',
      mime: 'application/x-tar'
    })
  })

  it('should detect rar', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.rar`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'rar',
      mime: 'application/x-rar-compressed'
    })
  })

  it('should detect gz', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.tar.gz`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'gz',
      mime: 'application/gzip'
    })
  })

  it('should detect bz2', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.bz2`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'bz2',
      mime: 'application/x-bzip2'
    })
  })

  it('should detect 7z', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.7z`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: '7z',
      mime: 'application/x-7z-compressed'
    })
  })

  it('should detect dmg', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.dmg`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'dmg',
      mime: 'application/x-apple-diskimage'
    })
  })

  it('should detect mp4 (M4V+M4A)', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.mp4`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'mp4',
      mime: 'video/mp4'
    })
  })

  it('should detect mp4 (mpeg42)', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture-mpeg42.mp4`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'mp4',
      mime: 'video/mp4'
    })
  })

  it('should detect mp4 (isom)', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture-isom.mp4`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'mp4',
      mime: 'video/mp4'
    })
  })

  it('should detect m4v', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.m4v`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'm4v',
      mime: 'video/mp4'
    })
  })

  it('should detect midi', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.mid`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'mid',
      mime: 'audio/midi'
    })
  })

  it('should detect mkv', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.mkv`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'mkv',
      mime: 'video/x-matroska'
    })
  })

  it('should detect webm', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.webm`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'webm',
      mime: 'video/webm'
    })
  })

  it('should detect wma', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.wma`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'wma',
      mime: 'audio/x-ms-wma'
    })
  })

  /* This file type not detecting correctly. */
  it.skip('should detect wmv', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.wmv`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'wmv',
      mime: 'video/x-ms-wmv'
    })
  })

  it('should detect mpg', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.mpg`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'mpg',
      mime: 'video/mpeg'
    })
  })

  it('should detect mp3', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.mp3`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'mp3',
      mime: 'audio/mpeg'
    })
  })

  it('should detect m4a', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.m4a`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'm4a',
      mime: 'audio/mp4'
    })
  })

  it('should detect 3gpp', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.3gp`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: '3gp',
      mime: 'video/3gpp'
    })
  })

  it('should detect opus', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.opus`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'opus',
      mime: 'audio/opus'
    })
  })

  it('should detect ogg', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.ogg`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'ogg',
      mime: 'audio/ogg'
    })
  })

  it('should detect oga', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.oga`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'oga',
      mime: 'audio/ogg'
    })
  })

  it('should detect ogv', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.ogv`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'ogv',
      mime: 'video/ogg'
    })
  })

  it('should detect spx', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.spx`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'spx',
      mime: 'audio/ogg'
    })
  })

  it('should detect flac', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.flac`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'flac',
      mime: 'audio/x-flac'
    })
  })

  it('should detect wav', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.wav`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'wav',
      mime: 'audio/x-wav'
    })
  })

  it('should detect amr', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.amr`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'amr',
      mime: 'audio/amr'
    })
  })

  it('should detect pdf', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.pdf`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'pdf',
      mime: 'application/pdf'
    })
  })

  it('should detect exe', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.exe`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'exe',
      mime: 'application/x-msdownload',
      iana: "application/vnd.microsoft.portable-executable"
      })
  })

  it('should detect swf', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.swf`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'swf',
      mime: 'application/x-shockwave-flash',
      iana: "application/vnd.adobe.flash.movie"
      })
  })

  it('should detect rtf', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.rtf`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'rtf',
      mime: 'application/rtf'
    })
  })

  it('should detect mov', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.mov`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'mov',
      mime: 'video/quicktime'
    })
  })

  it('should detect avi', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.avi`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'avi',
      mime: 'video/x-msvideo'
    })
  })

  it('should detect woff', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.woff`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'woff',
      mime: 'application/font-woff',
      iana: 'font/woff',
      })
  })

  it('should detect woff2', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.woff2`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'woff2',
      mime: 'application/font-woff',
      iana: 'font/woff2',
      })
  })

  it('should detect eot', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.eot`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'eot',
      mime: 'application/vnd.ms-fontobject'
    })
  })

  it('should detect ttf', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.ttf`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'ttf',
      mime: 'application/font-sfnt',
      iana: 'font/ttf',
      })
  })

  it('should detect otf', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.otf`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'otf',
      mime: 'application/font-sfnt',
      iana: 'font/otf',
      })
  })

  it('should detect ico', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.ico`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'ico',
      mime: 'image/x-icon',
      iana: 'image/vnd.microsoft.icon'
      })
  })

  it('should detect flv', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.flv`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'flv',
      mime: 'video/x-flv'
    })
  })

  it('should detect ps', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.ps`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'ps',
      mime: 'application/postscript'
    })
  })

  it('should detect xz', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.tar.xz`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'xz',
      mime: 'application/x-xz'
    })
  })

  it('should detect sqlite', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.sqlite`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'sqlite',
      mime: 'application/x-sqlite3',
      iana: 'application/vnd.sqlite3'
      })
  })

  it('should detect nes', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.nes`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'nes',
      mime: 'application/x-nintendo-nes-rom'
    })
  })

  it('should detect crx', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.crx`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'crx',
      mime: 'application/x-google-chrome-extension'
    })
  })

  it('should detect cab', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.cab`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'cab',
      mime: 'application/vnd.ms-cab-compressed'
    })
  })

  it('should detect deb', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.deb`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'deb',
      mime: 'application/x-deb'
    })
  })

  it('should detect ar', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.ar`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'ar',
      mime: 'application/x-unix-archive'
    })
  })

  it('should detect rpm', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.rpm`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'rpm',
      mime: 'application/x-rpm'
    })
  })

  it('should detect tar.Z', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.tar.Z`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'Z',
      mime: 'application/x-compress'
    })
  })

  it('should detect lz', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.tar.lz`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'lz',
      mime: 'application/x-lzip'
    })
  })

  it('should detect msi', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.msi`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'msi',
      mime: 'application/x-msi'
    })
  })

  it('should detect svg', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.svg`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'svg',
      mime: 'image/svg+xml'
    })
  })

  it('should detect svg with xml header', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture-header.svg`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'svg',
      mime: 'image/svg+xml'
    })
  })

  it('should detect xml', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.xml`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'xml',
      mime: 'application/xml'
    })
  })

  it('should detect flif', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture.flif`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'flif',
      mime: 'image/flif'
    })
  })

  it('should detect html started with html tag', async () => {
    const buffer = await readFile(`${__dirname}/test-files/fixture-simple-html.html`)
    const fileTypeDetector = new FileTypeDetector()
    const result = await fileTypeDetector.fromBuffer(buffer)
    assert.deepEqual(result, {
      ext: 'html',
      mime: 'text/html'
    })
  })

  it('should detect dll', async () => {
    const fileTypeDetector = new FileTypeDetector()
    const buf = await readFile(`${__dirname}/test-files/fixture.dll`)
    const result = await fileTypeDetector.fromBuffer(buf)
    assert.deepEqual(result, {
      ext: 'dll',
      mime: 'application/octet-stream'
    })
  })

  it('should detect docx', async() => {
    const fileTypeDetector = new FileTypeDetector()
    const buf = await readFile(`${__dirname}/test-files/fixture.docx`)
    const result = await fileTypeDetector.fromBuffer(buf)
    assert.deepEqual(result, {
      ext: 'docx',
      mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    })
  })

  it('should detect docm', async() => {
    const fileTypeDetector = new FileTypeDetector()
    const buf = await readFile(`${__dirname}/test-files/fixture.docm`)
    const result = await fileTypeDetector.fromBuffer(buf)
    assert.deepEqual(result, {
      ext: 'docm',
      mime: 'application/vnd.ms-word.document.macroEnabled.12'
    })
  })

  it('should detect xlsx', async() => {
    const fileTypeDetector = new FileTypeDetector()
    const buf = await readFile(`${__dirname}/test-files/fixture.xlsx`)
    const result = await fileTypeDetector.fromBuffer(buf)
    assert.deepEqual(result, {
      ext: 'xlsx',
      mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
  })

  it('should detect xlsm', async() => {
    const fileTypeDetector = new FileTypeDetector()
    const buf = await readFile(`${__dirname}/test-files/fixture.xlsm`)
    const result = await fileTypeDetector.fromBuffer(buf)
    assert.deepEqual(result, {
      ext: 'xlsm',
      mime: 'application/vnd.ms-excel.sheet.macroEnabled.12'
    })
  })

  it('should detect pptm', async() => {
    const fileTypeDetector = new FileTypeDetector()
    const buf = await readFile(`${__dirname}/test-files/fixture.pptm`)
    const result = await fileTypeDetector.fromBuffer(buf)
    assert.deepEqual(result, {
      ext: 'pptm',
      mime: 'application/vnd.ms-word.document.macroEnabled.12'
    })
  })

  it('should detect pptx', async() => {
    const fileTypeDetector = new FileTypeDetector()
    const buf = await readFile(`${__dirname}/test-files/fixture.pptx`)
    const result = await fileTypeDetector.fromBuffer(buf)
    assert.deepEqual(result, {
      ext: 'pptx',
      mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    })
  })

  it('should detect jar', async() => {
    const fileTypeDetector = new FileTypeDetector()
    const buf = await readFile(`${__dirname}/test-files/fixture.jar`)
    const result = await fileTypeDetector.fromBuffer(buf)
    assert.deepEqual(result, {
      ext: 'jar',
      mime: 'application/java-archive'
    })
  })

  it('should detect apk', async() => {
    const fileTypeDetector = new FileTypeDetector()
    const buf = await readFile(`${__dirname}/test-files/fixture.apk`)
    const result = await fileTypeDetector.fromBuffer(buf)
    assert.deepEqual(result, {
      ext: 'apk',
      mime: 'application/vnd.android.package-archive'
    })
  })
})
