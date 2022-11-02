import {assert} from 'chai';
import detect from '../src/index';
import isHtml from 'is-html';
import { readFile } from 'fs/promises'

describe('custom function', () => {
  it(`should detect html without fixture`, async () => {
    detect.addCustomFunction((buffer) => {
      const str = buffer.toString();
      if (isHtml(str)) {
        return {
          ext: 'html',
          mime: 'text/html'
        }
      }
      return false
    });

    const buffer = await readFile('./files/fixture-strong-html.html')
    detect.fromBuffer(buffer, (err, result) => {
      assert.equal(err, null);
      assert.deepEqual(result, {
        ext: 'html',
        mime: 'text/html'
      });
    });
  });
});
