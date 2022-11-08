// @ts-nocheck

import signatures from './signatures.json';
import Jschardet from 'jschardet';
import Iconv from 'iconv-lite';

export interface Rule {
  type: string;
  start?: number;
  and?: number;
  bytes?: string;
  rules?: Rule[];
};

export interface Signature {
  type: string;
  ext?: string;
  mime?: string;
  rules: Rule[]
  desc?: string;
}

export interface FileTypeResult {
  ext: string;
  mime: string;
  iana?: string;
};

export type CustomFunction = (buffer: Buffer) => FileTypeResult | Boolean

const iconvOptions = {
  stripBOM: true,
};

/**
 * @typedef {Object} FileTypeResult
 * @property {string} ext
 * @property {string} mime
 * @property {string=} iana
 */
/** */

export class FileTypeDetector {

  private customFunctions: CustomFunction[] = []

  private validatedSignaturesCache = false

  fromBuffer(buffer: Buffer | Uint8Array): FileTypeResult | null {
    let result = null;

    if (!this.validatedSignaturesCache)
      this.validatedSignaturesCache = this._validateSignatures();

    if (!(buffer instanceof Buffer))
      buffer = Buffer.from(buffer);
      
    // Run custom functions first
    this.customFunctions.every((fn) => {
      const fnResult = fn(buffer);
      if (fnResult) {
        console.log(fnResult)
        result = fnResult;
        return false;
      };
      return true;
    });

    if(result)
      return result

    signatures.every((signature) => {
      let detection = this._detect(buffer, signature.rules);

      if (!detection && signature.recode_text === true) {
        let textBuffer = this._getTextBuffer(buffer);
        if (textBuffer !== null) {
          detection = this._detect(textBuffer, signature.rules);
        }
      }

      if (buffer.textRecoded !== undefined)
        delete buffer.textRecoded;

      if (detection) {
        result = this._getRuleDetection({}, signature, detection);
        return false;
      }

      return true;
    });

    // If no signatures found, the function returns null
    return result
  }

  addSignature(signature: Signature) {
    this.validatedSignaturesCache = false;
    signatures.push(signature);
  }

  /** @param {function(Buffer):FileTypeResult} fn */
  addCustomFunction(fn: (buffer: Buffer) => FileTypeResult | Boolean) {
    this.customFunctions.push(fn);
  }

  /** @private */
  private _detect(buffer, rules, type, searchData) {
    if (!type) {
      type = 'and';
    }

    let detectedRule = true;
    
    const ruleEvaluator = (rule) => {

      let result = true;

      // Process search rule
      if (typeof rule.search === 'object') {
        let searchRule = rule.search;

        // Elevate bytes into a buffer
        if (!(searchRule.bytes instanceof Buffer))
          searchRule.bytes = Buffer.from(searchRule.bytes, typeof searchRule.bytes === 'string' ? 'hex' : null);

        // Figure out start/end
        let start = searchRule.start || 0;
        let end = searchRule.end;

        // Offset start/end based on a previous search
        if (searchRule.hasOwnProperty('search_ref')) {
          const index = searchData ? searchData.get(searchRule.search_ref) : -1;
          if (index === -1) {
            start = -1;
          } else {
            start += index;
            end += index;
          }
        }

        // Limit end to buffer length (otherwise an error is thrown)
        end = Math.min(typeof end === 'number' ? end : buffer.length, buffer.length);

        // Search for those bytes
        let index = start === -1
          ? -1
          : buffer.indexOf(searchRule.bytes, undefined, undefined, start, end);
        if (index < 0) {
          detectedRule = this._getRuleDetection(detectedRule, false);
          return this._isReturnFalse(detectedRule, type);
        }

        searchData = searchData || new Map();
        searchData.set(searchRule.id, index);
      }

      if (rule.type === 'or') {
        result = this._detect(buffer, rule.rules, 'or', searchData);

        if (!result && rule.recode_text === true) {
          let textBuffer = this._getTextBuffer(buffer);
          if (textBuffer !== null) {
            result = this._detect(textBuffer, rule.rules, 'or', searchData);
          }
        }
      }
      else if (rule.type === 'and') {
        result = this._detect(buffer, rule.rules, 'and', searchData);

        if (!result && rule.recode_text === true) {
          let textBuffer = this._getTextBuffer(buffer);
          if (textBuffer !== null) {
            result = this._detect(textBuffer, rule.rules, 'and', searchData);
          }
        }
      }
      else if (rule.type === 'default') {
        result = rule;
      }
      else {
        // Elevate bytes into a buffer
        if (!(rule.bytes instanceof Buffer))
          rule.bytes = Buffer.from(rule.bytes, typeof rule.bytes === 'string' ? 'hex' : null);

        // Figure out start/end
        let start = rule.start || 0;
        let end = rule.end;

        // Offset start/end based on a previous search
        if (rule.hasOwnProperty('search_ref')) {
          const index = searchData ? searchData.get(rule.search_ref) : -1;
          if (index === -1) {
            start = -1;
          } else {
            start += index;
            end += index;
          }
        }

        // Limit end to buffer length (otherwise an error is thrown)
        end = Math.min(typeof end === 'number' ? end : buffer.length, buffer.length);

        if (start < 0) {
          result = false;
        }
        else if (rule.type === 'equal') {
          result = buffer.compare(rule.bytes, undefined, undefined, start, end) === 0;
        }
        else if (rule.type === 'notEqual') {
          result = buffer.compare(rule.bytes, undefined, undefined, rule.start || 0, end) !== 0;
        }
        else if (rule.type === 'contains') {
          result = buffer.slice(rule.start || 0, rule.end || buffer.length).includes(rule.bytes);
        }
        else if (rule.type === 'notContains') {
          result = !buffer.slice(rule.start || 0, rule.end || buffer.length).includes(rule.bytes);
        }
      }

      if (result === true)
        result = rule;

      detectedRule = this._getRuleDetection(detectedRule, result);
      return this._isReturnFalse(detectedRule, type);
    };

    rules.every(ruleEvaluator);

    return detectedRule;
  }

  /** @private */
  private _isReturnFalse(isDetected, type) {
    if (!isDetected && type === 'and') {
      return false;
    }

    if (isDetected && type === 'or') {
      return false;
    }

    return true;
  }

  /** @private */
  private _validateRuleType(rule) {
    const types = ['or', 'and', 'contains', 'notContains', 'equal', 'notEqual', 'default'];
    return (types.indexOf(rule.type) !== -1);
  }

  /** @private */
  private _validateSignatures() {

    let invalidSignatures = signatures
        .map((signature) => {
          return this._validateSignature(signature);
        })
        .filter(Boolean);

    if (invalidSignatures.length) {
      return invalidSignatures;
    }

    return true;
  }

  /** @private */
  private _validateSignature(signature) {

    if (!('type' in signature)) {
      return {
        message: 'signature does not contain "type" field',
        signature
      };
    }

    if (!('rules' in signature)) {
      return {
        message: 'signature does not contain "rules" field',
        signature
      };
    }

    const validations = this._validateRules(signature.rules);

    if (!('ext' in signature) && !validations.hasExt) {
      return {
        message: 'signature does not contain "ext" field',
        signature
      };
    }

    if (!('mime' in signature) && !validations.hasMime) {
      return {
        message: 'signature does not contain "mime" field',
        signature
      };
    }

    if (Array.isArray(validations)) {
      return {
        message: 'signature has invalid rule',
        signature,
        rules: validations
      }
    }
  }

  /** @private */
  private _validateRules(rules) {

    let validations = rules.map((rule) => {
      let isRuleTypeValid = this._validateRuleType(rule);

      if (!isRuleTypeValid) {
        return {
          message: 'rule type not supported',
          rule
        };
      }

      if ((rule.type === 'or' || rule.type === 'and') && !('rules' in rule)) {
        return {
          message: 'rule should contains "rules" field',
          rule
        };
      }

      if (rule.type === 'or' || rule.type === 'and') {
        return this._validateRules(rule.rules);
      }

      return {
        hasExt: 'ext' in rule,
        hasMime: 'mime' in rule,
      };
    });

    let invalid = validations.filter(x => x.message);
    let valid = validations.filter(x => !x.message);

    if (!invalid)
      return invalid;

    return {
      hasExt: valid.some(x => x.hasExt),
      hasMime: valid.some(x => x.hasMime),
    };
  }

  /** @private */
  private _getRuleDetection() {
    let v = false;
  
    for (let i = 0, len = arguments.length; i < len; i++) {
      let detection = arguments[i];
  
      if (typeof detection === 'boolean') {
          v = detection ? v || detection : false;
      }
      else {
        v = typeof v === 'boolean' ? {} : v;
        if ('ext' in detection) v.ext = detection.ext;
        if ('mime' in detection) v.mime = detection.mime;
        if ('iana' in detection) v.iana = detection.iana;
      }
    }
  
    return v;
  }

  private _getTextBuffer(buffer) {
    if (buffer.textRecoded === undefined) {
      let textBuffer = null;

      try {
        let detected = Jschardet.detect(buffer);
        if (detected) {
          textBuffer = Buffer.from(Iconv.decode(buffer, detected.encoding, iconvOptions));
          if (buffer.equals(textBuffer))
            textBuffer = null;
        }
      } catch (ignored) {
      }

      buffer.textRecoded = textBuffer;
    }
    
    return buffer.textRecoded;
  }
}

export default FileTypeDetector