import { w as wrapByteBuffer, p as popByteBuffer, t as toUint8Array, i as isAtEnd, r as readVarint32, s as skipUnknownField, d as readString, b as readVarint64, a as pushTemporaryLength, c as readByte, e as writeVarint32, f as writeByteBuffer, k as writeVarint64, g as writeString, h as writeByte, m as pushByteBuffer } from "./index-CnyZhh5D.js";
import { e as _decodeCommon, d as _decodeUser, f as _encodeCommon, g as _encodeUser } from "./base-C7fdq6v5.js";
function encodeRoomUserSeqMessage(message) {
  let bb = popByteBuffer();
  _encodeRoomUserSeqMessage(message, bb);
  return toUint8Array(bb);
}
function _encodeRoomUserSeqMessage(message, bb) {
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
      _encodeRoomUserSeqMessage_Contributor(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
  let $total = message.total;
  if ($total !== void 0) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $total);
  }
  let $popStr = message.popStr;
  if ($popStr !== void 0) {
    writeVarint32(bb, 34);
    writeString(bb, $popStr);
  }
  let array$seats = message.seats;
  if (array$seats !== void 0) {
    for (let value of array$seats) {
      writeVarint32(bb, 42);
      let nested = popByteBuffer();
      _encodeRoomUserSeqMessage_Contributor(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
  let $popularity = message.popularity;
  if ($popularity !== void 0) {
    writeVarint32(bb, 48);
    writeVarint64(bb, $popularity);
  }
  let $totalUser = message.totalUser;
  if ($totalUser !== void 0) {
    writeVarint32(bb, 56);
    writeVarint64(bb, $totalUser);
  }
  let $totalUserStr = message.totalUserStr;
  if ($totalUserStr !== void 0) {
    writeVarint32(bb, 66);
    writeString(bb, $totalUserStr);
  }
  let $totalStr = message.totalStr;
  if ($totalStr !== void 0) {
    writeVarint32(bb, 74);
    writeString(bb, $totalStr);
  }
  let $onlineUserForAnchor = message.onlineUserForAnchor;
  if ($onlineUserForAnchor !== void 0) {
    writeVarint32(bb, 82);
    writeString(bb, $onlineUserForAnchor);
  }
  let $totalPvForAnchor = message.totalPvForAnchor;
  if ($totalPvForAnchor !== void 0) {
    writeVarint32(bb, 90);
    writeString(bb, $totalPvForAnchor);
  }
  let $upRightStatsStr = message.upRightStatsStr;
  if ($upRightStatsStr !== void 0) {
    writeVarint32(bb, 98);
    writeString(bb, $upRightStatsStr);
  }
  let $upRightStatsStrComplete = message.upRightStatsStrComplete;
  if ($upRightStatsStrComplete !== void 0) {
    writeVarint32(bb, 106);
    writeString(bb, $upRightStatsStrComplete);
  }
}
function decodeRoomUserSeqMessage(binary) {
  return _decodeRoomUserSeqMessage(wrapByteBuffer(binary));
}
function _decodeRoomUserSeqMessage(bb) {
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
      // repeated RoomUserSeqMessage_Contributor ranks = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        let values = message.ranks || (message.ranks = []);
        values.push(_decodeRoomUserSeqMessage_Contributor(bb));
        bb.limit = limit;
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
      // optional string popStr = 4;
      case 4: {
        message.popStr = readString(bb, readVarint32(bb));
        break;
      }
      // repeated RoomUserSeqMessage_Contributor seats = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        let values = message.seats || (message.seats = []);
        values.push(_decodeRoomUserSeqMessage_Contributor(bb));
        bb.limit = limit;
        break;
      }
      // optional int64 popularity = 6;
      case 6: {
        message.popularity = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 totalUser = 7;
      case 7: {
        message.totalUser = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional string totalUserStr = 8;
      case 8: {
        message.totalUserStr = readString(bb, readVarint32(bb));
        break;
      }
      // optional string totalStr = 9;
      case 9: {
        message.totalStr = readString(bb, readVarint32(bb));
        break;
      }
      // optional string onlineUserForAnchor = 10;
      case 10: {
        message.onlineUserForAnchor = readString(bb, readVarint32(bb));
        break;
      }
      // optional string totalPvForAnchor = 11;
      case 11: {
        message.totalPvForAnchor = readString(bb, readVarint32(bb));
        break;
      }
      // optional string upRightStatsStr = 12;
      case 12: {
        message.upRightStatsStr = readString(bb, readVarint32(bb));
        break;
      }
      // optional string upRightStatsStrComplete = 13;
      case 13: {
        message.upRightStatsStrComplete = readString(bb, readVarint32(bb));
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function encodeRoomUserSeqMessage_Contributor(message) {
  let bb = popByteBuffer();
  _encodeRoomUserSeqMessage_Contributor(message, bb);
  return toUint8Array(bb);
}
function _encodeRoomUserSeqMessage_Contributor(message, bb) {
  let $score = message.score;
  if ($score !== void 0) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $score);
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
  let $rank = message.rank;
  if ($rank !== void 0) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $rank);
  }
  let $delta = message.delta;
  if ($delta !== void 0) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $delta);
  }
  let $isHidden = message.isHidden;
  if ($isHidden !== void 0) {
    writeVarint32(bb, 40);
    writeByte(bb, $isHidden ? 1 : 0);
  }
  let $scoreDescription = message.scoreDescription;
  if ($scoreDescription !== void 0) {
    writeVarint32(bb, 50);
    writeString(bb, $scoreDescription);
  }
  let $exactlyScore = message.exactlyScore;
  if ($exactlyScore !== void 0) {
    writeVarint32(bb, 58);
    writeString(bb, $exactlyScore);
  }
}
function decodeRoomUserSeqMessage_Contributor(binary) {
  return _decodeRoomUserSeqMessage_Contributor(wrapByteBuffer(binary));
}
function _decodeRoomUserSeqMessage_Contributor(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional int64 score = 1;
      case 1: {
        message.score = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional User user = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        message.user = _decodeUser(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 rank = 3;
      case 3: {
        message.rank = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 delta = 4;
      case 4: {
        message.delta = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional bool isHidden = 5;
      case 5: {
        message.isHidden = !!readByte(bb);
        break;
      }
      // optional string scoreDescription = 6;
      case 6: {
        message.scoreDescription = readString(bb, readVarint32(bb));
        break;
      }
      // optional string exactlyScore = 7;
      case 7: {
        message.exactlyScore = readString(bb, readVarint32(bb));
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
export {
  decodeRoomUserSeqMessage,
  decodeRoomUserSeqMessage_Contributor,
  encodeRoomUserSeqMessage,
  encodeRoomUserSeqMessage_Contributor
};
