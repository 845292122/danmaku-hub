import { w as wrapByteBuffer, p as popByteBuffer, t as toUint8Array, i as isAtEnd, r as readVarint32, s as skipUnknownField, d as readString, a as pushTemporaryLength, b as readVarint64, c as readByte, e as writeVarint32, f as writeByteBuffer, k as writeVarint64, h as writeByte, g as writeString, l as intToLong, m as pushByteBuffer } from "./index-CnyZhh5D.js";
import { c as _decodePublicAreaCommon, _ as _decodeText, b as _decodeImage, d as _decodeUser, e as _decodeCommon, f as _encodeCommon, g as _encodeUser, h as _encodeImage, k as _encodeText, i as _encodePublicAreaCommon } from "./base-C7fdq6v5.js";
function encodeMemberMessage(message) {
  let bb = popByteBuffer();
  _encodeMemberMessage(message, bb);
  return toUint8Array(bb);
}
function _encodeMemberMessage(message, bb) {
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
  let $memberCount = message.memberCount;
  if ($memberCount !== void 0) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $memberCount);
  }
  let $operator = message.operator;
  if ($operator !== void 0) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeUser($operator, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $isSetToAdmin = message.isSetToAdmin;
  if ($isSetToAdmin !== void 0) {
    writeVarint32(bb, 40);
    writeByte(bb, $isSetToAdmin ? 1 : 0);
  }
  let $isTopUser = message.isTopUser;
  if ($isTopUser !== void 0) {
    writeVarint32(bb, 48);
    writeByte(bb, $isTopUser ? 1 : 0);
  }
  let $rankScore = message.rankScore;
  if ($rankScore !== void 0) {
    writeVarint32(bb, 56);
    writeVarint64(bb, $rankScore);
  }
  let $topUserNo = message.topUserNo;
  if ($topUserNo !== void 0) {
    writeVarint32(bb, 64);
    writeVarint64(bb, $topUserNo);
  }
  let $enterType = message.enterType;
  if ($enterType !== void 0) {
    writeVarint32(bb, 72);
    writeVarint64(bb, $enterType);
  }
  let $action = message.action;
  if ($action !== void 0) {
    writeVarint32(bb, 80);
    writeVarint64(bb, $action);
  }
  let $actionDescription = message.actionDescription;
  if ($actionDescription !== void 0) {
    writeVarint32(bb, 90);
    writeString(bb, $actionDescription);
  }
  let $userId = message.userId;
  if ($userId !== void 0) {
    writeVarint32(bb, 96);
    writeVarint64(bb, $userId);
  }
  let $effectConfig = message.effectConfig;
  if ($effectConfig !== void 0) {
    writeVarint32(bb, 106);
    let nested = popByteBuffer();
    _encodeMemberMessage_EffectConfig($effectConfig, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $popStr = message.popStr;
  if ($popStr !== void 0) {
    writeVarint32(bb, 114);
    writeString(bb, $popStr);
  }
  let $enterEffectConfig = message.enterEffectConfig;
  if ($enterEffectConfig !== void 0) {
    writeVarint32(bb, 122);
    let nested = popByteBuffer();
    _encodeMemberMessage_EffectConfig($enterEffectConfig, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $backgroundImage = message.backgroundImage;
  if ($backgroundImage !== void 0) {
    writeVarint32(bb, 130);
    let nested = popByteBuffer();
    _encodeImage($backgroundImage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $backgroundImageV2 = message.backgroundImageV2;
  if ($backgroundImageV2 !== void 0) {
    writeVarint32(bb, 138);
    let nested = popByteBuffer();
    _encodeImage($backgroundImageV2, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $anchorDisplayText = message.anchorDisplayText;
  if ($anchorDisplayText !== void 0) {
    writeVarint32(bb, 146);
    let nested = popByteBuffer();
    _encodeText($anchorDisplayText, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $publicAreaCommon = message.publicAreaCommon;
  if ($publicAreaCommon !== void 0) {
    writeVarint32(bb, 154);
    let nested = popByteBuffer();
    _encodePublicAreaCommon($publicAreaCommon, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $userEnterTipType = message.userEnterTipType;
  if ($userEnterTipType !== void 0) {
    writeVarint32(bb, 160);
    writeVarint64(bb, $userEnterTipType);
  }
  let $anchorEnterTipType = message.anchorEnterTipType;
  if ($anchorEnterTipType !== void 0) {
    writeVarint32(bb, 168);
    writeVarint64(bb, $anchorEnterTipType);
  }
  let $picoEnterEffectConfig = message.picoEnterEffectConfig;
  if ($picoEnterEffectConfig !== void 0) {
    writeVarint32(bb, 194);
    let nested = popByteBuffer();
    _encodeMemberMessage_PicoEffectConfig($picoEnterEffectConfig, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $userOpenId = message.userOpenId;
  if ($userOpenId !== void 0) {
    writeVarint32(bb, 40002);
    writeString(bb, $userOpenId);
  }
}
function decodeMemberMessage(binary) {
  return _decodeMemberMessage(wrapByteBuffer(binary));
}
function _decodeMemberMessage(bb) {
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
      // optional int64 memberCount = 3;
      case 3: {
        message.memberCount = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional User operator = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.operator = _decodeUser(bb);
        bb.limit = limit;
        break;
      }
      // optional bool isSetToAdmin = 5;
      case 5: {
        message.isSetToAdmin = !!readByte(bb);
        break;
      }
      // optional bool isTopUser = 6;
      case 6: {
        message.isTopUser = !!readByte(bb);
        break;
      }
      // optional int64 rankScore = 7;
      case 7: {
        message.rankScore = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 topUserNo = 8;
      case 8: {
        message.topUserNo = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 enterType = 9;
      case 9: {
        message.enterType = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 action = 10;
      case 10: {
        message.action = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional string actionDescription = 11;
      case 11: {
        message.actionDescription = readString(bb, readVarint32(bb));
        break;
      }
      // optional int64 userId = 12;
      case 12: {
        message.userId = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional MemberMessage_EffectConfig effectConfig = 13;
      case 13: {
        let limit = pushTemporaryLength(bb);
        message.effectConfig = _decodeMemberMessage_EffectConfig(bb);
        bb.limit = limit;
        break;
      }
      // optional string popStr = 14;
      case 14: {
        message.popStr = readString(bb, readVarint32(bb));
        break;
      }
      // optional MemberMessage_EffectConfig enterEffectConfig = 15;
      case 15: {
        let limit = pushTemporaryLength(bb);
        message.enterEffectConfig = _decodeMemberMessage_EffectConfig(bb);
        bb.limit = limit;
        break;
      }
      // optional Image backgroundImage = 16;
      case 16: {
        let limit = pushTemporaryLength(bb);
        message.backgroundImage = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional Image backgroundImageV2 = 17;
      case 17: {
        let limit = pushTemporaryLength(bb);
        message.backgroundImageV2 = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional Text anchorDisplayText = 18;
      case 18: {
        let limit = pushTemporaryLength(bb);
        message.anchorDisplayText = _decodeText(bb);
        bb.limit = limit;
        break;
      }
      // optional PublicAreaCommon publicAreaCommon = 19;
      case 19: {
        let limit = pushTemporaryLength(bb);
        message.publicAreaCommon = _decodePublicAreaCommon(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 userEnterTipType = 20;
      case 20: {
        message.userEnterTipType = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 anchorEnterTipType = 21;
      case 21: {
        message.anchorEnterTipType = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional MemberMessage_PicoEffectConfig picoEnterEffectConfig = 24;
      case 24: {
        let limit = pushTemporaryLength(bb);
        message.picoEnterEffectConfig = _decodeMemberMessage_PicoEffectConfig(bb);
        bb.limit = limit;
        break;
      }
      // optional string userOpenId = 5000;
      case 5e3: {
        message.userOpenId = readString(bb, readVarint32(bb));
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function encodeMemberMessage_EffectConfig(message) {
  let bb = popByteBuffer();
  _encodeMemberMessage_EffectConfig(message, bb);
  return toUint8Array(bb);
}
function _encodeMemberMessage_EffectConfig(message, bb) {
  let $type = message.type;
  if ($type !== void 0) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $type);
  }
  let $icon = message.icon;
  if ($icon !== void 0) {
    writeVarint32(bb, 18);
    let nested = popByteBuffer();
    _encodeImage($icon, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $avatarPos = message.avatarPos;
  if ($avatarPos !== void 0) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $avatarPos);
  }
  let $text = message.text;
  if ($text !== void 0) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeText($text, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $textIcon = message.textIcon;
  if ($textIcon !== void 0) {
    writeVarint32(bb, 42);
    let nested = popByteBuffer();
    _encodeImage($textIcon, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $stayTime = message.stayTime;
  if ($stayTime !== void 0) {
    writeVarint32(bb, 48);
    writeVarint64(bb, intToLong($stayTime));
  }
  let $animAssetId = message.animAssetId;
  if ($animAssetId !== void 0) {
    writeVarint32(bb, 56);
    writeVarint64(bb, $animAssetId);
  }
  let $badge = message.badge;
  if ($badge !== void 0) {
    writeVarint32(bb, 66);
    let nested = popByteBuffer();
    _encodeImage($badge, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let array$flexSettingArray = message.flexSettingArray;
  if (array$flexSettingArray !== void 0) {
    let packed = popByteBuffer();
    for (let value of array$flexSettingArray) {
      writeVarint64(packed, value);
    }
    writeVarint32(bb, 74);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }
  let $textIconOverlay = message.textIconOverlay;
  if ($textIconOverlay !== void 0) {
    writeVarint32(bb, 82);
    let nested = popByteBuffer();
    _encodeImage($textIconOverlay, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $animatedBadge = message.animatedBadge;
  if ($animatedBadge !== void 0) {
    writeVarint32(bb, 90);
    let nested = popByteBuffer();
    _encodeImage($animatedBadge, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $hasSweepLight = message.hasSweepLight;
  if ($hasSweepLight !== void 0) {
    writeVarint32(bb, 96);
    writeByte(bb, $hasSweepLight ? 1 : 0);
  }
  let array$textFlexSettingArray = message.textFlexSettingArray;
  if (array$textFlexSettingArray !== void 0) {
    let packed = popByteBuffer();
    for (let value of array$textFlexSettingArray) {
      writeVarint64(packed, value);
    }
    writeVarint32(bb, 106);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }
  let $centerAnimAssetId = message.centerAnimAssetId;
  if ($centerAnimAssetId !== void 0) {
    writeVarint32(bb, 112);
    writeVarint64(bb, $centerAnimAssetId);
  }
}
function decodeMemberMessage_EffectConfig(binary) {
  return _decodeMemberMessage_EffectConfig(wrapByteBuffer(binary));
}
function _decodeMemberMessage_EffectConfig(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional int64 type = 1;
      case 1: {
        message.type = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional Image icon = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        message.icon = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 avatarPos = 3;
      case 3: {
        message.avatarPos = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional Text text = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.text = _decodeText(bb);
        bb.limit = limit;
        break;
      }
      // optional Image textIcon = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        message.textIcon = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional int32 stayTime = 6;
      case 6: {
        message.stayTime = readVarint32(bb);
        break;
      }
      // optional int64 animAssetId = 7;
      case 7: {
        message.animAssetId = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional Image badge = 8;
      case 8: {
        let limit = pushTemporaryLength(bb);
        message.badge = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // repeated int64 flexSettingArray = 9;
      case 9: {
        let values = message.flexSettingArray || (message.flexSettingArray = []);
        if ((tag & 7) === 2) {
          let outerLimit = pushTemporaryLength(bb);
          while (!isAtEnd(bb)) {
            values.push(readVarint64(
              bb,
              /* unsigned */
              false
            ));
          }
          bb.limit = outerLimit;
        } else {
          values.push(readVarint64(
            bb,
            /* unsigned */
            false
          ));
        }
        break;
      }
      // optional Image textIconOverlay = 10;
      case 10: {
        let limit = pushTemporaryLength(bb);
        message.textIconOverlay = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional Image animatedBadge = 11;
      case 11: {
        let limit = pushTemporaryLength(bb);
        message.animatedBadge = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional bool hasSweepLight = 12;
      case 12: {
        message.hasSweepLight = !!readByte(bb);
        break;
      }
      // repeated int64 textFlexSettingArray = 13;
      case 13: {
        let values = message.textFlexSettingArray || (message.textFlexSettingArray = []);
        if ((tag & 7) === 2) {
          let outerLimit = pushTemporaryLength(bb);
          while (!isAtEnd(bb)) {
            values.push(readVarint64(
              bb,
              /* unsigned */
              false
            ));
          }
          bb.limit = outerLimit;
        } else {
          values.push(readVarint64(
            bb,
            /* unsigned */
            false
          ));
        }
        break;
      }
      // optional int64 centerAnimAssetId = 14;
      case 14: {
        message.centerAnimAssetId = readVarint64(
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
function encodeMemberMessage_PicoEffectConfig(message) {
  let bb = popByteBuffer();
  _encodeMemberMessage_PicoEffectConfig(message, bb);
  return toUint8Array(bb);
}
function _encodeMemberMessage_PicoEffectConfig(message, bb) {
  let $type = message.type;
  if ($type !== void 0) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $type);
  }
  let $icon = message.icon;
  if ($icon !== void 0) {
    writeVarint32(bb, 18);
    let nested = popByteBuffer();
    _encodeImage($icon, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $text = message.text;
  if ($text !== void 0) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeText($text, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $textIcon = message.textIcon;
  if ($textIcon !== void 0) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeImage($textIcon, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $stayTime = message.stayTime;
  if ($stayTime !== void 0) {
    writeVarint32(bb, 40);
    writeVarint64(bb, intToLong($stayTime));
  }
  let $badge = message.badge;
  if ($badge !== void 0) {
    writeVarint32(bb, 50);
    let nested = popByteBuffer();
    _encodeImage($badge, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $centerAnimAssetId = message.centerAnimAssetId;
  if ($centerAnimAssetId !== void 0) {
    writeVarint32(bb, 56);
    writeVarint64(bb, $centerAnimAssetId);
  }
  let $dressId = message.dressId;
  if ($dressId !== void 0) {
    writeVarint32(bb, 74);
    writeString(bb, $dressId);
  }
}
function decodeMemberMessage_PicoEffectConfig(binary) {
  return _decodeMemberMessage_PicoEffectConfig(wrapByteBuffer(binary));
}
function _decodeMemberMessage_PicoEffectConfig(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional int64 type = 1;
      case 1: {
        message.type = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional Image icon = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        message.icon = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional Text text = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.text = _decodeText(bb);
        bb.limit = limit;
        break;
      }
      // optional Image textIcon = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.textIcon = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional int32 stayTime = 5;
      case 5: {
        message.stayTime = readVarint32(bb);
        break;
      }
      // optional Image badge = 6;
      case 6: {
        let limit = pushTemporaryLength(bb);
        message.badge = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 centerAnimAssetId = 7;
      case 7: {
        message.centerAnimAssetId = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional string dressId = 9;
      case 9: {
        message.dressId = readString(bb, readVarint32(bb));
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
export {
  decodeMemberMessage,
  decodeMemberMessage_EffectConfig,
  decodeMemberMessage_PicoEffectConfig,
  encodeMemberMessage,
  encodeMemberMessage_EffectConfig,
  encodeMemberMessage_PicoEffectConfig
};
