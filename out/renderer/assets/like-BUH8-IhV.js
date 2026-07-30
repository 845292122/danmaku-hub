import { w as wrapByteBuffer, p as popByteBuffer, t as toUint8Array, i as isAtEnd, r as readVarint32, s as skipUnknownField, a as pushTemporaryLength, d as readString, b as readVarint64, e as writeVarint32, f as writeByteBuffer, k as writeVarint64, g as writeString, m as pushByteBuffer } from "./index-CnyZhh5D.js";
import { c as _decodePublicAreaCommon, C as _decodePicoDisplayInfo, D as _decodeDisplayControlInfo, E as _decodeDoubleLikeDetail, d as _decodeUser, e as _decodeCommon, f as _encodeCommon, g as _encodeUser, F as _encodeDoubleLikeDetail, G as _encodeDisplayControlInfo, H as _encodePicoDisplayInfo, i as _encodePublicAreaCommon } from "./base-C7fdq6v5.js";
function encodeLikeMessage(message) {
  let bb = popByteBuffer();
  _encodeLikeMessage(message, bb);
  return toUint8Array(bb);
}
function _encodeLikeMessage(message, bb) {
  let $common = message.common;
  if ($common !== void 0) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeCommon($common, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $count = message.count;
  if ($count !== void 0) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $count);
  }
  let $total = message.total;
  if ($total !== void 0) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $total);
  }
  let $color = message.color;
  if ($color !== void 0) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $color);
  }
  let $user = message.user;
  if ($user !== void 0) {
    writeVarint32(bb, 42);
    let nested = popByteBuffer();
    _encodeUser($user, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $icon = message.icon;
  if ($icon !== void 0) {
    writeVarint32(bb, 50);
    writeString(bb, $icon);
  }
  let $doubleLikeDetail = message.doubleLikeDetail;
  if ($doubleLikeDetail !== void 0) {
    writeVarint32(bb, 58);
    let nested = popByteBuffer();
    _encodeDoubleLikeDetail($doubleLikeDetail, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $displayControlInfo = message.displayControlInfo;
  if ($displayControlInfo !== void 0) {
    writeVarint32(bb, 66);
    let nested = popByteBuffer();
    _encodeDisplayControlInfo($displayControlInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $linkmicGuestUid = message.linkmicGuestUid;
  if ($linkmicGuestUid !== void 0) {
    writeVarint32(bb, 72);
    writeVarint64(bb, $linkmicGuestUid);
  }
  let $scene = message.scene;
  if ($scene !== void 0) {
    writeVarint32(bb, 82);
    writeString(bb, $scene);
  }
  let $picoDisplayInfo = message.picoDisplayInfo;
  if ($picoDisplayInfo !== void 0) {
    writeVarint32(bb, 90);
    let nested = popByteBuffer();
    _encodePicoDisplayInfo($picoDisplayInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $publicAreaCommon = message.publicAreaCommon;
  if ($publicAreaCommon !== void 0) {
    writeVarint32(bb, 98);
    let nested = popByteBuffer();
    _encodePublicAreaCommon($publicAreaCommon, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}
function decodeLikeMessage(binary) {
  return _decodeLikeMessage(wrapByteBuffer(binary));
}
function _decodeLikeMessage(bb) {
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
      // optional int64 count = 2;
      case 2: {
        message.count = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 total = 3;
      case 3: {
        message.total = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 color = 4;
      case 4: {
        message.color = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional User user = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        message.user = _decodeUser(bb);
        bb.limit = limit;
        break;
      }
      // optional string icon = 6;
      case 6: {
        message.icon = readString(bb, readVarint32(bb));
        break;
      }
      // optional DoubleLikeDetail doubleLikeDetail = 7;
      case 7: {
        let limit = pushTemporaryLength(bb);
        message.doubleLikeDetail = _decodeDoubleLikeDetail(bb);
        bb.limit = limit;
        break;
      }
      // optional DisplayControlInfo displayControlInfo = 8;
      case 8: {
        let limit = pushTemporaryLength(bb);
        message.displayControlInfo = _decodeDisplayControlInfo(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 linkmicGuestUid = 9;
      case 9: {
        message.linkmicGuestUid = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional string scene = 10;
      case 10: {
        message.scene = readString(bb, readVarint32(bb));
        break;
      }
      // optional PicoDisplayInfo picoDisplayInfo = 11;
      case 11: {
        let limit = pushTemporaryLength(bb);
        message.picoDisplayInfo = _decodePicoDisplayInfo(bb);
        bb.limit = limit;
        break;
      }
      // optional PublicAreaCommon publicAreaCommon = 12;
      case 12: {
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
  decodeLikeMessage,
  encodeLikeMessage
};
