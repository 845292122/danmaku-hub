import { w as wrapByteBuffer, p as popByteBuffer, t as toUint8Array, i as isAtEnd, r as readVarint32, s as skipUnknownField, a as pushTemporaryLength, c as readByte, d as readString, e as writeVarint32, f as writeByteBuffer, g as writeString, h as writeByte, m as pushByteBuffer } from "./index-CnyZhh5D.js";
import { e as _decodeCommon, d as _decodeUser, f as _encodeCommon, g as _encodeUser } from "./base-C7fdq6v5.js";
function encodeRoomRankMessage(message) {
  let bb = popByteBuffer();
  _encodeRoomRankMessage(message, bb);
  return toUint8Array(bb);
}
function _encodeRoomRankMessage(message, bb) {
  let $common = message.common;
  if ($common !== void 0) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeCommon($common, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let array$ranks = message.ranks;
  if (array$ranks !== void 0) {
    for (let value of array$ranks) {
      writeVarint32(bb, 18);
      let nested = popByteBuffer();
      _encodeRoomRankMessage_RoomRank(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}
function decodeRoomRankMessage(binary) {
  return _decodeRoomRankMessage(wrapByteBuffer(binary));
}
function _decodeRoomRankMessage(bb) {
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
      // repeated RoomRankMessage_RoomRank ranks = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        let values = message.ranks || (message.ranks = []);
        values.push(_decodeRoomRankMessage_RoomRank(bb));
        bb.limit = limit;
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function encodeRoomRankMessage_RoomRank(message) {
  let bb = popByteBuffer();
  _encodeRoomRankMessage_RoomRank(message, bb);
  return toUint8Array(bb);
}
function _encodeRoomRankMessage_RoomRank(message, bb) {
  let $user = message.user;
  if ($user !== void 0) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeUser($user, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $scoreStr = message.scoreStr;
  if ($scoreStr !== void 0) {
    writeVarint32(bb, 18);
    writeString(bb, $scoreStr);
  }
  let $profileHidden = message.profileHidden;
  if ($profileHidden !== void 0) {
    writeVarint32(bb, 24);
    writeByte(bb, $profileHidden ? 1 : 0);
  }
}
function decodeRoomRankMessage_RoomRank(binary) {
  return _decodeRoomRankMessage_RoomRank(wrapByteBuffer(binary));
}
function _decodeRoomRankMessage_RoomRank(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional User user = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.user = _decodeUser(bb);
        bb.limit = limit;
        break;
      }
      // optional string scoreStr = 2;
      case 2: {
        message.scoreStr = readString(bb, readVarint32(bb));
        break;
      }
      // optional bool profileHidden = 3;
      case 3: {
        message.profileHidden = !!readByte(bb);
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
export {
  decodeRoomRankMessage,
  decodeRoomRankMessage_RoomRank,
  encodeRoomRankMessage,
  encodeRoomRankMessage_RoomRank
};
