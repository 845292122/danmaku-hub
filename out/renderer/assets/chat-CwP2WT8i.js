import { w as wrapByteBuffer, p as popByteBuffer, t as toUint8Array, i as isAtEnd, r as readVarint32, s as skipUnknownField, a as pushTemporaryLength, b as readVarint64, c as readByte, d as readString, e as writeVarint32, f as writeByteBuffer, g as writeString, h as writeByte, k as writeVarint64, l as intToLong, m as pushByteBuffer } from "./index-CnyZhh5D.js";
import { _ as _decodeText, a as _decodeLandscapeAreaCommon, b as _decodeImage, c as _decodePublicAreaCommon, d as _decodeUser, e as _decodeCommon, f as _encodeCommon, g as _encodeUser, h as _encodeImage, i as _encodePublicAreaCommon, j as _encodeLandscapeAreaCommon, k as _encodeText } from "./base-C7fdq6v5.js";
function encodeChatMessage(message) {
  let bb = popByteBuffer();
  _encodeChatMessage(message, bb);
  return toUint8Array(bb);
}
function _encodeChatMessage(message, bb) {
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
  let $content = message.content;
  if ($content !== void 0) {
    writeVarint32(bb, 26);
    writeString(bb, $content);
  }
  let $visibleToSender = message.visibleToSender;
  if ($visibleToSender !== void 0) {
    writeVarint32(bb, 32);
    writeByte(bb, $visibleToSender ? 1 : 0);
  }
  let $backgroundImage = message.backgroundImage;
  if ($backgroundImage !== void 0) {
    writeVarint32(bb, 42);
    let nested = popByteBuffer();
    _encodeImage($backgroundImage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $fullScreenTextColor = message.fullScreenTextColor;
  if ($fullScreenTextColor !== void 0) {
    writeVarint32(bb, 50);
    writeString(bb, $fullScreenTextColor);
  }
  let $backgroundImageV2 = message.backgroundImageV2;
  if ($backgroundImageV2 !== void 0) {
    writeVarint32(bb, 58);
    let nested = popByteBuffer();
    _encodeImage($backgroundImageV2, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $publicAreaCommon = message.publicAreaCommon;
  if ($publicAreaCommon !== void 0) {
    writeVarint32(bb, 74);
    let nested = popByteBuffer();
    _encodePublicAreaCommon($publicAreaCommon, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $giftImage = message.giftImage;
  if ($giftImage !== void 0) {
    writeVarint32(bb, 82);
    let nested = popByteBuffer();
    _encodeImage($giftImage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $agreeMsgId = message.agreeMsgId;
  if ($agreeMsgId !== void 0) {
    writeVarint32(bb, 88);
    writeVarint64(bb, $agreeMsgId);
  }
  let $priorityLevel = message.priorityLevel;
  if ($priorityLevel !== void 0) {
    writeVarint32(bb, 96);
    writeVarint64(bb, intToLong($priorityLevel));
  }
  let $landscapeAreaCommon = message.landscapeAreaCommon;
  if ($landscapeAreaCommon !== void 0) {
    writeVarint32(bb, 106);
    let nested = popByteBuffer();
    _encodeLandscapeAreaCommon($landscapeAreaCommon, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $eventTime = message.eventTime;
  if ($eventTime !== void 0) {
    writeVarint32(bb, 120);
    writeVarint64(bb, $eventTime);
  }
  let $sendReview = message.sendReview;
  if ($sendReview !== void 0) {
    writeVarint32(bb, 128);
    writeByte(bb, $sendReview ? 1 : 0);
  }
  let $fromIntercom = message.fromIntercom;
  if ($fromIntercom !== void 0) {
    writeVarint32(bb, 136);
    writeByte(bb, $fromIntercom ? 1 : 0);
  }
  let $intercomHideUserCard = message.intercomHideUserCard;
  if ($intercomHideUserCard !== void 0) {
    writeVarint32(bb, 144);
    writeByte(bb, $intercomHideUserCard ? 1 : 0);
  }
  let $chatTags = message.chatTags;
  if ($chatTags !== void 0) {
    writeVarint32(bb, 152);
    writeVarint64(bb, intToLong($chatTags));
  }
  let $chatBy = message.chatBy;
  if ($chatBy !== void 0) {
    writeVarint32(bb, 160);
    writeVarint64(bb, $chatBy);
  }
  let $individualChatPriority = message.individualChatPriority;
  if ($individualChatPriority !== void 0) {
    writeVarint32(bb, 168);
    writeVarint64(bb, intToLong($individualChatPriority));
  }
  let $rtfContent = message.rtfContent;
  if ($rtfContent !== void 0) {
    writeVarint32(bb, 322);
    let nested = popByteBuffer();
    _encodeText($rtfContent, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $rtfContentV2 = message.rtfContentV2;
  if ($rtfContentV2 !== void 0) {
    writeVarint32(bb, 330);
    let nested = popByteBuffer();
    _encodeText($rtfContentV2, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}
function decodeChatMessage(binary) {
  return _decodeChatMessage(wrapByteBuffer(binary));
}
function _decodeChatMessage(bb) {
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
      // optional string content = 3;
      case 3: {
        message.content = readString(bb, readVarint32(bb));
        break;
      }
      // optional bool visibleToSender = 4;
      case 4: {
        message.visibleToSender = !!readByte(bb);
        break;
      }
      // optional Image backgroundImage = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        message.backgroundImage = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional string fullScreenTextColor = 6;
      case 6: {
        message.fullScreenTextColor = readString(bb, readVarint32(bb));
        break;
      }
      // optional Image backgroundImageV2 = 7;
      case 7: {
        let limit = pushTemporaryLength(bb);
        message.backgroundImageV2 = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional PublicAreaCommon publicAreaCommon = 9;
      case 9: {
        let limit = pushTemporaryLength(bb);
        message.publicAreaCommon = _decodePublicAreaCommon(bb);
        bb.limit = limit;
        break;
      }
      // optional Image giftImage = 10;
      case 10: {
        let limit = pushTemporaryLength(bb);
        message.giftImage = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 agreeMsgId = 11;
      case 11: {
        message.agreeMsgId = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int32 priorityLevel = 12;
      case 12: {
        message.priorityLevel = readVarint32(bb);
        break;
      }
      // optional LandscapeAreaCommon landscapeAreaCommon = 13;
      case 13: {
        let limit = pushTemporaryLength(bb);
        message.landscapeAreaCommon = _decodeLandscapeAreaCommon(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 eventTime = 15;
      case 15: {
        message.eventTime = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional bool sendReview = 16;
      case 16: {
        message.sendReview = !!readByte(bb);
        break;
      }
      // optional bool fromIntercom = 17;
      case 17: {
        message.fromIntercom = !!readByte(bb);
        break;
      }
      // optional bool intercomHideUserCard = 18;
      case 18: {
        message.intercomHideUserCard = !!readByte(bb);
        break;
      }
      // optional int32 chatTags = 19;
      case 19: {
        message.chatTags = readVarint32(bb);
        break;
      }
      // optional int64 chatBy = 20;
      case 20: {
        message.chatBy = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int32 individualChatPriority = 21;
      case 21: {
        message.individualChatPriority = readVarint32(bb);
        break;
      }
      // optional Text rtfContent = 40;
      case 40: {
        let limit = pushTemporaryLength(bb);
        message.rtfContent = _decodeText(bb);
        bb.limit = limit;
        break;
      }
      // optional Text rtfContentV2 = 41;
      case 41: {
        let limit = pushTemporaryLength(bb);
        message.rtfContentV2 = _decodeText(bb);
        bb.limit = limit;
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function encodeEmojiChatMessage(message) {
  let bb = popByteBuffer();
  _encodeEmojiChatMessage(message, bb);
  return toUint8Array(bb);
}
function _encodeEmojiChatMessage(message, bb) {
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
  let $emojiId = message.emojiId;
  if ($emojiId !== void 0) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $emojiId);
  }
  let $emojiContent = message.emojiContent;
  if ($emojiContent !== void 0) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeText($emojiContent, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $defaultContent = message.defaultContent;
  if ($defaultContent !== void 0) {
    writeVarint32(bb, 42);
    writeString(bb, $defaultContent);
  }
  let $backgroundImage = message.backgroundImage;
  if ($backgroundImage !== void 0) {
    writeVarint32(bb, 50);
    let nested = popByteBuffer();
    _encodeImage($backgroundImage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $fromIntercom = message.fromIntercom;
  if ($fromIntercom !== void 0) {
    writeVarint32(bb, 56);
    writeByte(bb, $fromIntercom ? 1 : 0);
  }
  let $intercomHideUserCard = message.intercomHideUserCard;
  if ($intercomHideUserCard !== void 0) {
    writeVarint32(bb, 64);
    writeByte(bb, $intercomHideUserCard ? 1 : 0);
  }
  let $publicAreaCommon = message.publicAreaCommon;
  if ($publicAreaCommon !== void 0) {
    writeVarint32(bb, 74);
    let nested = popByteBuffer();
    _encodePublicAreaCommon($publicAreaCommon, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}
function decodeEmojiChatMessage(binary) {
  return _decodeEmojiChatMessage(wrapByteBuffer(binary));
}
function _decodeEmojiChatMessage(bb) {
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
      // optional int64 emojiId = 3;
      case 3: {
        message.emojiId = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional Text emojiContent = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.emojiContent = _decodeText(bb);
        bb.limit = limit;
        break;
      }
      // optional string defaultContent = 5;
      case 5: {
        message.defaultContent = readString(bb, readVarint32(bb));
        break;
      }
      // optional Image backgroundImage = 6;
      case 6: {
        let limit = pushTemporaryLength(bb);
        message.backgroundImage = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional bool fromIntercom = 7;
      case 7: {
        message.fromIntercom = !!readByte(bb);
        break;
      }
      // optional bool intercomHideUserCard = 8;
      case 8: {
        message.intercomHideUserCard = !!readByte(bb);
        break;
      }
      // optional PublicAreaCommon publicAreaCommon = 9;
      case 9: {
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
  decodeChatMessage,
  decodeEmojiChatMessage,
  encodeChatMessage,
  encodeEmojiChatMessage
};
