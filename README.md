# detect-file-type

> Detect file type by signatures. Fork of [detect-file-type](https://github.com/dimapaloskin/detect-file-type).

Removed dependency on node's `fs` module to enable this package to be used on browsers.

### Supported types
  jpg, png, gif, webp, flif, cr2, tif, bmp, jxr, psd, zip, epub, xpi, tar, rar, gz, bz2, 7z, dmg, mov, mp4, m4v, m4a, 3g2, 3gp, avi, wav, qcp, mid, mkv, webm, wasm, asf, wmv, wma, mpg, mp3, opus, ogg, ogv, oga, ogm, ogx, spx, flac, ape, wv, amr, pdf, exe, swf, rtf, woff, woff2, eot, ttf, otf, ico, cur, flv, ps, xz, sqlite, nes, dex, crx, elf, cab, deb, ar, rpm, Z, lz, msi, mxf, mts, blend, bpg, jp2, jpx, jpm, mj2, aif, xml, svg, mobi, heic, ktx, dcm, mpc, ics, glb, pcap, html, dll, xlsx, xlsm, xlsb, xlam, docx, docm, dotm, dotx, pptx, pptm, ppsm, ppsx

## Installation

```
  npm i --save detect-file-type
```

## Usage

```js
  import { readFile } from 'fs/promises'
  import { fromBuffer } from 'detect-file-type-lite'

  const buffer = await readFile('img.jpg')
  const result = fromBuffer(buffer);
  console.log(result.ext)  // jpg
```

## API

### fromBuffer(buffer) => Promise\<FileTypeResult | null\>
Detect file type from buffer
- `buffer` - uint8array/Buffer

### addSignature(signature) => void
Add new signature for file type detecting
- `signature` - a signature. See section about it below

### addCustomFunction(fn) => void
Add custom function which receive buffer and trying to detect file type.
- `fn` - function which receive buffer

This method needed for more complicated cases like DLL for example. A DLL file will be detected as a normal EXE file, unless you perform deeper checks on its headers.

```js
const detect = require('detect-file-type');
const fs = require('fs/promises')

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

const buf = await fs.readFile('winrsmgr.dll')
const res = FileTypeDetector.fromBuffer(buf)
console.log(res)  // { ext: 'dll', mime: 'application/octet-stream' }
```

Some custom functions, including the above example on DLL file type detection, are already declared during object instantiation.
See [custom-functions.ts](https://github.com/georgeneokq/detect-file-type-lite/blob/main/src/custom-functions.ts) for more details.

Custom functions can be async.

## Signature and creating your own signatures
Detecting of file type work via signatures.
The simplest signature in JSON format looks like:

```json
{
  "type": "jpg",
  "ext": "jpg",
  "mime": "image/jpeg",
  "rules": [
    { "type": "equal", "start": 0, "end": 2, "bytes": "ffd8"  }
  ]
}
```
params:
- `type` - signature type, mostly it's the same as param 'ext'
- `ext` - file extension
- `iana` - optional iana registered mime type - will be added when actual used mime differs from iana, or when the old mime type we used was wrong
- `mime` - mime type of file
- `rules` - list of rules for detecting

More details about param `rules`:

**This param have to be array of objects**

- `type` - a rule type. There are available a few types: `equal`, `notEqual`, `contains`, `notContains`, `or`, `and`, `default`
- `search` - a searching rule, that keeps the offset of the searched bytes in a special id.
- `search_ref` - a reference to a previously performed search, `start` and `end` will be offset by it.

#### More details about: equal, notEqual, contains & notContains.

- `equal` - here is required field `bytes`. We get a dump of buffer from `start` (equals 0 by default) to `end` (equals buffer.length by default). After that we compare the dump with value in param `bytes`. If values are equal then this rule is correct.
- `notEqual` - here is required field `bytes`. We get a dump of buffer from `start` (equals 0 by default) to `end` (equals buffer.length by default). After that we compare the dump with value in param `bytes`. If values aren't equal then this rule is correct.
- `contains` - here is required field `bytes`. We get a dump of buffer from `start` (equals 0 by default) to `end` (equals buffer.length by default). After that we try to find the sequence from `bytes` in this dump. If the dump contains `bytes` then rules is correct.
- `notContains` - here is required field `bytes`. We get a dump of buffer from `start` (equals 0 by default) to `end` (equals buffer.length by default).  After that we try to find the sequence from `bytes` in this dump. If the dump contains `bytes` then rules is incorrect.

#### More details about the rule types `or` and `and`

Actually, these types are necessary when you work with complicated signatures. For example, when file contains few sequences of bytes in different parts of file. Here is required field 'rules', where you should define set of another rules. See example:

```json
{
  "type": "tif",
  "ext": "tif",
  "mime": "image/tiff",
  "rules": [
    { "type": "and", "rules":
      [
        { "type": "notEqual", "start": 8, "end": 10, "bytes": "4352" },
        { "type": "or", "rules":
            [
             { "type": "equal", "start": 0, "end": 4, "bytes": "49492a00" },
             { "type": "equal", "start": 0, "end": 4,  "bytes": "4d4d002a" }
           ]
          }
      ]
    }
   ]
 }
```

Explanation: If dump starts from 8th byte and ends to 10th byte isn't equal "4352", **and** dump starts from 0 and ends to 4th byte is equal "49492a00" **or** is equal "4d4d002a" then data looks like file with 'tif' format.

- `or` - means that any rules from `rules` should be correct. If at least 1 rule is correct then list are correct too.
- `and` - means that each rule from `rules` should be correct. If all rules are correct then list is correct. When at least 1 rule fail then all list is incorrect.

The rules `or` and `and` can be nested without restrictions.

The `default` type is special and is used as a fallback when a set of `or` rules did not match, inside a larger tree with multiple mime detections.

#### More details about the `search` object

- `id` - id to assign to the result (reference later with `search_ref`)
- `start`/`end` - range to search in
- `bytes` - bytes to search for

## License

WTFPL © [Dmitry Pavlovsky](http://paloskin.me)
