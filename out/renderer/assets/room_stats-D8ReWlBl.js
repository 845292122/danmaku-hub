import { w as wrapByteBuffer, p as popByteBuffer, t as toUint8Array, i as isAtEnd, r as readVarint32, s as skipUnknownField, b as readVarint64, c as readByte, d as readString, a as pushTemporaryLength, e as writeVarint32, f as writeByteBuffer, g as writeString, k as writeVarint64, h as writeByte, m as pushByteBuffer } from "./index-CnyZhh5D.js";
import { e as _decodeCommon, f as _encodeCommon } from "./base-C7fdq6v5.js";
function encodeRoomStatsMessage(message) {
  let bb = popByteBuffer();
  _encodeRoomStatsMessage(message, bb);
  return toUint8Array(bb);
}
function _encodeRoomStatsMessage(message, bb) {
  let $common = message.common;
  if ($common !== void 0) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeCommon($common, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $displayShort = message.displayShort;
  if ($displayShort !== void 0) {
    writeVarint32(bb, 18);
    writeString(bb, $displayShort);
  }
  let $displayMiddle = message.displayMiddle;
  if ($displayMiddle !== void 0) {
    writeVarint32(bb, 26);
    writeString(bb, $displayMiddle);
  }
  let $displayLong = message.displayLong;
  if ($displayLong !== void 0) {
    writeVarint32(bb, 34);
    writeString(bb, $displayLong);
  }
  let $displayValue = message.displayValue;
  if ($displayValue !== void 0) {
    writeVarint32(bb, 40);
    writeVarint64(bb, $displayValue);
  }
  let $displayVersion = message.displayVersion;
  if ($displayVersion !== void 0) {
    writeVarint32(bb, 48);
    writeVarint64(bb, $displayVersion);
  }
  let $incremental = message.incremental;
  if ($incremental !== void 0) {
    writeVarint32(bb, 56);
    writeByte(bb, $incremental ? 1 : 0);
  }
  let $isHidden = message.isHidden;
  if ($isHidden !== void 0) {
    writeVarint32(bb, 64);
    writeByte(bb, $isHidden ? 1 : 0);
  }
  let $total = message.total;
  if ($total !== void 0) {
    writeVarint32(bb, 72);
    writeVarint64(bb, $total);
  }
  let $displayType = message.displayType;
  if ($displayType !== void 0) {
    writeVarint32(bb, 80);
    writeVarint64(bb, $displayType);
  }
}
function decodeRoomStatsMessage(binary) {
  return _decodeRoomStatsMessage(wrapByteBuffer(binary));
}
function _decodeRoomStatsMessage(bb) {
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
      // optional string displayShort = 2;
      case 2: {
        message.displayShort = readString(bb, readVarint32(bb));
        break;
      }
      // optional string displayMiddle = 3;
      case 3: {
        message.displayMiddle = readString(bb, readVarint32(bb));
        break;
      }
      // optional string displayLong = 4;
      case 4: {
        message.displayLong = readString(bb, readVarint32(bb));
        break;
      }
      // optional int64 displayValue = 5;
      case 5: {
        message.displayValue = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 displayVersion = 6;
      case 6: {
        message.displayVersion = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional bool incremental = 7;
      case 7: {
        message.incremental = !!readByte(bb);
        break;
      }
      // optional bool isHidden = 8;
      case 8: {
        message.isHidden = !!readByte(bb);
        break;
      }
      // optional int64 total = 9;
      case 9: {
        message.total = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 displayType = 10;
      case 10: {
        message.displayType = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
export {
  decodeRoomStatsMessage,
  encodeRoomStatsMessage
};
