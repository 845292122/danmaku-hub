import { w as wrapByteBuffer, p as popByteBuffer, t as toUint8Array, i as isAtEnd, r as readVarint32, s as skipUnknownField, a as pushTemporaryLength, d as readString, b as readVarint64, e as writeVarint32, f as writeByteBuffer, k as writeVarint64, g as writeString, m as pushByteBuffer } from "./index-CnyZhh5D.js";
import { c as _decodePublicAreaCommon, e as _decodeCommon, _ as _decodeText, f as _encodeCommon, i as _encodePublicAreaCommon, k as _encodeText } from "./base-C7fdq6v5.js";
function encodeControlMessage(message) {
  let bb = popByteBuffer();
  _encodeControlMessage(message, bb);
  return toUint8Array(bb);
}
function _encodeControlMessage(message, bb) {
  let $common = message.common;
  if ($common !== void 0) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeCommon($common, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $action = message.action;
  if ($action !== void 0) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $action);
  }
  let $tips = message.tips;
  if ($tips !== void 0) {
    writeVarint32(bb, 26);
    writeString(bb, $tips);
  }
  let $extra = message.extra;
  if ($extra !== void 0) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeControlMessage_Extra($extra, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $publicAreaCommon = message.publicAreaCommon;
  if ($publicAreaCommon !== void 0) {
    writeVarint32(bb, 42);
    let nested = popByteBuffer();
    _encodePublicAreaCommon($publicAreaCommon, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}
function decodeControlMessage(binary) {
  return _decodeControlMessage(wrapByteBuffer(binary));
}
function _decodeControlMessage(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional Common common = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.common = _decodeCommon(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 action = 2;
      case 2: {
        message.action = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional string tips = 3;
      case 3: {
        message.tips = readString(bb, readVarint32(bb));
        break;
      }
      // optional ControlMessage_Extra extra = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.extra = _decodeControlMessage_Extra(bb);
        bb.limit = limit;
        break;
      }
      // optional PublicAreaCommon publicAreaCommon = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        message.publicAreaCommon = _decodePublicAreaCommon(bb);
        bb.limit = limit;
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function encodeControlMessage_Extra(message) {
  let bb = popByteBuffer();
  _encodeControlMessage_Extra(message, bb);
  return toUint8Array(bb);
}
function _encodeControlMessage_Extra(message, bb) {
  let $banInfoUrl = message.banInfoUrl;
  if ($banInfoUrl !== void 0) {
    writeVarint32(bb, 10);
    writeString(bb, $banInfoUrl);
  }
  let $reasonNo = message.reasonNo;
  if ($reasonNo !== void 0) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $reasonNo);
  }
  let $title = message.title;
  if ($title !== void 0) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeText($title, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $violationReason = message.violationReason;
  if ($violationReason !== void 0) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeText($violationReason, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $content = message.content;
  if ($content !== void 0) {
    writeVarint32(bb, 42);
    let nested = popByteBuffer();
    _encodeText($content, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $gotItButton = message.gotItButton;
  if ($gotItButton !== void 0) {
    writeVarint32(bb, 50);
    let nested = popByteBuffer();
    _encodeText($gotItButton, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $banDetailButton = message.banDetailButton;
  if ($banDetailButton !== void 0) {
    writeVarint32(bb, 58);
    let nested = popByteBuffer();
    _encodeText($banDetailButton, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $source = message.source;
  if ($source !== void 0) {
    writeVarint32(bb, 66);
    writeString(bb, $source);
  }
}
function decodeControlMessage_Extra(binary) {
  return _decodeControlMessage_Extra(wrapByteBuffer(binary));
}
function _decodeControlMessage_Extra(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional string banInfoUrl = 1;
      case 1: {
        message.banInfoUrl = readString(bb, readVarint32(bb));
        break;
      }
      // optional int64 reasonNo = 2;
      case 2: {
        message.reasonNo = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional Text title = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.title = _decodeText(bb);
        bb.limit = limit;
        break;
      }
      // optional Text violationReason = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.violationReason = _decodeText(bb);
        bb.limit = limit;
        break;
      }
      // optional Text content = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        message.content = _decodeText(bb);
        bb.limit = limit;
        break;
      }
      // optional Text gotItButton = 6;
      case 6: {
        let limit = pushTemporaryLength(bb);
        message.gotItButton = _decodeText(bb);
        bb.limit = limit;
        break;
      }
      // optional Text banDetailButton = 7;
      case 7: {
        let limit = pushTemporaryLength(bb);
        message.banDetailButton = _decodeText(bb);
        bb.limit = limit;
        break;
      }
      // optional string source = 8;
      case 8: {
        message.source = readString(bb, readVarint32(bb));
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
export {
  decodeControlMessage,
  decodeControlMessage_Extra,
  encodeControlMessage,
  encodeControlMessage_Extra
};
