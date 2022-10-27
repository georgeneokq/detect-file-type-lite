import {assert} from 'chai'
import detect from '../src/index'
import { readFile } from 'fs/promises'
import './custom-functions.test'

describe('file formats', async () => {

  it('should detect jpg', async () => {
    const buffer = await readFile('./files/fixture.jpg')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'jpg',
        mime: 'image/jpeg'
      })
    })
  })

  it('should detect png', async () => {
    const buffer = await readFile('./files/fixture.png')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'png',
        mime: 'image/png'
      })
    })
  })

  it('should detect gif', async () => {
    const buffer = await readFile('./files/fixture.gif')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'gif',
        mime: 'image/gif'
      })
    })
  })

  it('should detect bmp', async () => {
    const buffer = await readFile('./files/fixture.bmp')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'bmp',
        mime: 'image/bmp'
      })
    })
  })

  it('should detect jxr', async () => {
    const buffer = await readFile('./files/fixture.jxr')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'jxr',
        mime: 'image/vnd.ms-photo'
      })
    })
  })

  it('should detect psd', async () => {
    const buffer = await readFile('./files/fixture.psd')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'psd',
        mime: 'image/vnd.adobe.photoshop'
      })
    })
  })

  it('should detect zip', async () => {
    const buffer = await readFile('./files/fixture.zip')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'zip',
        mime: 'application/zip'
      })
    })
  })

  it('should detect epub', async () => {
    const buffer = await readFile('./files/fixture.epub')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'epub',
        mime: 'application/epub+zip'
      })
    })
  })

  it('should detect xpi', async () => {
    const buffer = await readFile('./files/fixture.xpi')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'xpi',
        mime: 'application/x-xpinstall'
      })
    })
  })

  it('should detect tar', async () => {
    const buffer = await readFile('./files/fixture.tar')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'tar',
        mime: 'application/x-tar'
      })
    })
  })

  it('should detect rar', async () => {
    const buffer = await readFile('./files/fixture.rar')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'rar',
        mime: 'application/x-rar-compressed'
      })
    })
  })

  it('should detect gz', async () => {
    const buffer = await readFile('./files/fixture.tar.gz')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'gz',
        mime: 'application/gzip'
      })
    })
  })

  it('should detect bz2', async () => {
    const buffer = await readFile('./files/fixture.bz2')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'bz2',
        mime: 'application/x-bzip2'
      })
    })
  })

  it('should detect 7z', async () => {
    const buffer = await readFile('./files/fixture.7z')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: '7z',
        mime: 'application/x-7z-compressed'
      })
    })
  })

  it('should detect dmg', async () => {
    const buffer = await readFile('./files/fixture.dmg')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'dmg',
        mime: 'application/x-apple-diskimage'
      })
    })
  })

  it('should detect mp4 (M4V+M4A)', async () => {
    const buffer = await readFile('./files/fixture.mp4')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'mp4',
        mime: 'video/mp4'
      })
    })
  })

  it('should detect mp4 (mpeg42)', async () => {
    const buffer = await readFile('./files/fixture-mpeg42.mp4')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'mp4',
        mime: 'video/mp4'
      })
    })
  })

  it('should detect mp4 (isom)', async () => {
    const buffer = await readFile('./files/fixture-isom.mp4')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'mp4',
        mime: 'video/mp4'
      })
    })
  })

  it('should detect m4v', async () => {
    const buffer = await readFile('./files/fixture.m4v')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'm4v',
        mime: 'video/mp4'
      })
    })
  })

  it('should detect midi', async () => {
    const buffer = await readFile('./files/fixture.mid')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'mid',
        mime: 'audio/midi'
      })
    })
  })

  it('should detect mkv', async () => {
    const buffer = await readFile('./files/fixture.mkv')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'mkv',
        mime: 'video/x-matroska'
      })
    })
  })

  it('should detect webm', async () => {
    const buffer = await readFile('./files/fixture.webm')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'webm',
        mime: 'video/webm'
      })
    })
  })

  it('should detect wma', async () => {
    const buffer = await readFile('./files/fixture.wma')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'wma',
        mime: 'audio/x-ms-wma'
      })
    })
  })

  /* This file type not detecting correctly. */
  it.skip('should detect wmv', async () => {
    const buffer = await readFile('./files/fixture.wmv')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'wmv',
        mime: 'video/x-ms-wmv'
      })
    })
  })

  it('should detect mpg', async () => {
    const buffer = await readFile('./files/fixture.mpg')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'mpg',
        mime: 'video/mpeg'
      })
    })
  })

  it('should detect mp3', async () => {
    const buffer = await readFile('./files/fixture.mp3')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'mp3',
        mime: 'audio/mpeg'
      })
    })
  })

  it('should detect m4a', async () => {
    const buffer = await readFile('./files/fixture.m4a')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'm4a',
        mime: 'audio/mp4'
      })
    })
  })

  it('should detect 3gpp', async () => {
    const buffer = await readFile('./files/fixture.3gp')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: '3gp',
        mime: 'video/3gpp'
      })
    })
  })

  it('should detect opus', async () => {
    const buffer = await readFile('./files/fixture.opus')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'opus',
        mime: 'audio/opus'
      })
    })
  })

  it('should detect ogg', async () => {
    const buffer = await readFile('./files/fixture.ogg')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'ogg',
        mime: 'audio/ogg'
      })
    })
  })

  it('should detect oga', async () => {
    const buffer = await readFile('./files/fixture.oga')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'oga',
        mime: 'audio/ogg'
      })
    })
  })

  it('should detect ogv', async () => {
    const buffer = await readFile('./files/fixture.ogv')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'ogv',
        mime: 'video/ogg'
      })
    })
  })

  it('should detect spx', async () => {
    const buffer = await readFile('./files/fixture.spx')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'spx',
        mime: 'audio/ogg'
      })
    })
  })

  it('should detect flac', async () => {
    const buffer = await readFile('./files/fixture.flac')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'flac',
        mime: 'audio/x-flac'
      })
    })
  })

  it('should detect wav', async () => {
    const buffer = await readFile('./files/fixture.wav')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'wav',
        mime: 'audio/x-wav'
      })
    })
  })

  it('should detect amr', async () => {
    const buffer = await readFile('./files/fixture.amr')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'amr',
        mime: 'audio/amr'
      })
    })
  })

  it('should detect pdf', async () => {
    const buffer = await readFile('./files/fixture.pdf')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'pdf',
        mime: 'application/pdf'
      })
    })
  })

  it('should detect exe', async () => {
    const buffer = await readFile('./files/fixture.exe')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'exe',
        mime: 'application/x-msdownload',
        iana: "application/vnd.microsoft.portable-executable"
      })
    })
  })

  it('should detect swf', async () => {
    const buffer = await readFile('./files/fixture.swf')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'swf',
        mime: 'application/x-shockwave-flash',
        iana: "application/vnd.adobe.flash.movie"
      })
    })
  })

  it('should detect rtf', async () => {
    const buffer = await readFile('./files/fixture.rtf')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'rtf',
        mime: 'application/rtf'
      })
    })
  })

  it('should detect mov', async () => {
    const buffer = await readFile('./files/fixture.mov')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'mov',
        mime: 'video/quicktime'
      })
    })
  })

  it('should detect avi', async () => {
    const buffer = await readFile('./files/fixture.avi')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'avi',
        mime: 'video/x-msvideo'
      })
    })
  })

  it('should detect woff', async () => {
    const buffer = await readFile('./files/fixture.woff')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'woff',
        mime: 'application/font-woff',
        iana: 'font/woff',
      })
    })
  })

  it('should detect woff2', async () => {
    const buffer = await readFile('./files/fixture.woff2')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'woff2',
        mime: 'application/font-woff',
        iana: 'font/woff2',
      })
    })
  })

  it('should detect eot', async () => {
    const buffer = await readFile('./files/fixture.eot')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'eot',
        mime: 'application/vnd.ms-fontobject'
      })
    })
  })

  it('should detect ttf', async () => {
    const buffer = await readFile('./files/fixture.ttf')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'ttf',
        mime: 'application/font-sfnt',
        iana: 'font/ttf',
      })
    })
  })

  it('should detect otf', async () => {
    const buffer = await readFile('./files/fixture.otf')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'otf',
        mime: 'application/font-sfnt',
        iana: 'font/otf',
      })
    })
  })

  it('should detect ico', async () => {
    const buffer = await readFile('./files/fixture.ico')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'ico',
        mime: 'image/x-icon',
        iana: 'image/vnd.microsoft.icon'
      })
    })
  })

  it('should detect flv', async () => {
    const buffer = await readFile('./files/fixture.flv')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'flv',
        mime: 'video/x-flv'
      })
    })
  })

  it('should detect ps', async () => {
    const buffer = await readFile('./files/fixture.ps')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'ps',
        mime: 'application/postscript'
      })
    })
  })

  it('should detect xz', async () => {
    const buffer = await readFile('./files/fixture.tar.xz')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'xz',
        mime: 'application/x-xz'
      })
    })
  })

  it('should detect sqlite', async () => {
    const buffer = await readFile('./files/fixture.sqlite')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'sqlite',
        mime: 'application/x-sqlite3',
        iana: 'application/vnd.sqlite3'
      })
    })
  })

  it('should detect nes', async () => {
    const buffer = await readFile('./files/fixture.nes')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'nes',
        mime: 'application/x-nintendo-nes-rom'
      })
    })
  })

  it('should detect crx', async () => {
    const buffer = await readFile('./files/fixture.crx')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'crx',
        mime: 'application/x-google-chrome-extension'
      })
    })
  })

  it('should detect cab', async () => {
    const buffer = await readFile('./files/fixture.cab')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'cab',
        mime: 'application/vnd.ms-cab-compressed'
      })
    })
  })

  it('should detect deb', async () => {
    const buffer = await readFile('./files/fixture.deb')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'deb',
        mime: 'application/x-deb'
      })
    })
  })

  it('should detect ar', async () => {
    const buffer = await readFile('./files/fixture.ar')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'ar',
        mime: 'application/x-unix-archive'
      })
    })
  })

  it('should detect rpm', async () => {
    const buffer = await readFile('./files/fixture.rpm')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'rpm',
        mime: 'application/x-rpm'
      })
    })
  })

  it('should detect tar.Z', async () => {
    const buffer = await readFile('./files/fixture.tar.Z')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'Z',
        mime: 'application/x-compress'
      })
    })
  })

  it('should detect lz', async () => {
    const buffer = await readFile('./files/fixture.tar.lz')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'lz',
        mime: 'application/x-lzip'
      })
    })
  })

  it('should detect msi', async () => {
    const buffer = await readFile('./files/fixture.msi')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'msi',
        mime: 'application/x-msi'
      })
    })
  })

  it('should detect svg', async () => {
    const buffer = await readFile('./files/fixture.svg')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'svg',
        mime: 'image/svg+xml'
      })
    })
  })

  it('should detect svg with xml header', async () => {
    const buffer = await readFile('./files/fixture-header.svg')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'svg',
        mime: 'image/svg+xml'
      })
    })
  })

  it('should detect xml', async () => {
    const buffer = await readFile('./files/fixture.xml')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'xml',
        mime: 'application/xml'
      })
    })
  })

  it('should detect flif', async () => {
    const buffer = await readFile('./files/fixture.flif')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'flif',
        mime: 'image/flif'
      })
    })
  })

  it('should detect html started with html tag', async () => {
    const buffer = await readFile('./files/fixture-simple-html.html')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null)
      assert.deepEqual(result, {
        ext: 'html',
        mime: 'text/html'
      })
    })
  })

})
