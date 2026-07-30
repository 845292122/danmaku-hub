import { w as wrapByteBuffer, p as popByteBuffer, t as toUint8Array, i as isAtEnd, r as readVarint32, s as skipUnknownField, a as pushTemporaryLength, b as readVarint64, d as readString, e as writeVarint32, f as writeByteBuffer, k as writeVarint64, g as writeString, m as pushByteBuffer } from "./index-CnyZhh5D.js";
import { c as _decodePublicAreaCommon, d as _decodeUser, e as _decodeCommon, f as _encodeCommon, g as _encodeUser, i as _encodePublicAreaCommon } from "./base-C7fdq6v5.js";
function encodeSocialMessage(message) {
  let bb = popByteBuffer();
  _encodeSocialMessage(message, bb);
  return toUint8Array(bb);
}
function _encodeSocialMessage(message, bb) {
  let $common = message.common;
  if ($common !== void 0) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeCommon($common, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $user = message.user;
  if ($user !== void 0) {
    writeVarint32(bb, 18);
    let nested = popByteBuffer();
    _encodeUser($user, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $shareType = message.shareType;
  if ($shareType !== void 0) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $shareType);
  }
  let $action = message.action;
  if ($action !== void 0) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $action);
  }
  let $shareTarget = message.shareTarget;
  if ($shareTarget !== void 0) {
    writeVarint32(bb, 42);
    writeString(bb, $shareTarget);
  }
  let $followCount = message.followCount;
  if ($followCount !== void 0) {
    writeVarint32(bb, 48);
    writeVarint64(bb, $followCount);
  }
  let $publicAreaCommon = message.publicAreaCommon;
  if ($publicAreaCommon !== void 0) {
    writeVarint32(bb, 58);
    let nested = popByteBuffer();
    _encodePublicAreaCommon($publicAreaCommon, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}
function decodeSocialMessage(binary) {
  return _decodeSocialMessage(wrapByteBuffer(binary));
}
function _decodeSocialMessage(bb) {
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
      // optional User user = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        message.user = _decodeUser(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 shareType = 3;
      case 3: {
        message.shareType = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 action = 4;
      case 4: {
        message.action = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional string shareTarget = 5;
      case 5: {
        message.shareTarget = readString(bb, readVarint32(bb));
        break;
      }
      // optional int64 followCount = 6;
      case 6: {
        message.followCount = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional PublicAreaCommon publicAreaCommon = 7;
      case 7: {
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
export {
  decodeSocialMessage,
  encodeSocialMessage
};
