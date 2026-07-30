import { w as wrapByteBuffer, p as popByteBuffer, t as toUint8Array, i as isAtEnd, r as readVarint32, s as skipUnknownField, d as readString, b as readVarint64, c as readByte, a as pushTemporaryLength, e as writeVarint32, f as writeByteBuffer, k as writeVarint64, l as intToLong, g as writeString, h as writeByte, m as pushByteBuffer } from "./index-CnyZhh5D.js";
import { l as _decodeSeriesPlayGift, m as _decodeRoomHotInfo, n as _decodeExtraEffect, o as _decodeSendTogether, p as _decodeAnchorGiftData, q as _decodeAssetEffectMixInfo, r as _decodeGiftTrayInfo, _ as _decodeText, c as _decodePublicAreaCommon, s as _decodeGiftStruct, t as _decodeGiftIMPriority, d as _decodeUser, e as _decodeCommon, b as _decodeImage, f as _encodeCommon, g as _encodeUser, u as _encodeGiftIMPriority, v as _encodeGiftStruct, i as _encodePublicAreaCommon, k as _encodeText, w as _encodeGiftTrayInfo, x as _encodeAnchorGiftData, y as _encodeSendTogether, z as _encodeExtraEffect, A as _encodeRoomHotInfo, B as _encodeSeriesPlayGift, h as _encodeImage } from "./base-C7fdq6v5.js";
function encodeGiftMessage(message) {
  let bb = popByteBuffer();
  _encodeGiftMessage(message, bb);
  return toUint8Array(bb);
}
function _encodeGiftMessage(message, bb) {
  let $common = message.common;
  if ($common !== void 0) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeCommon($common, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $giftId = message.giftId;
  if ($giftId !== void 0) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $giftId);
  }
  let $fanTicketCount = message.fanTicketCount;
  if ($fanTicketCount !== void 0) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $fanTicketCount);
  }
  let $groupCount = message.groupCount;
  if ($groupCount !== void 0) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $groupCount);
  }
  let $repeatCount = message.repeatCount;
  if ($repeatCount !== void 0) {
    writeVarint32(bb, 40);
    writeVarint64(bb, $repeatCount);
  }
  let $comboCount = message.comboCount;
  if ($comboCount !== void 0) {
    writeVarint32(bb, 48);
    writeVarint64(bb, $comboCount);
  }
  let $user = message.user;
  if ($user !== void 0) {
    writeVarint32(bb, 58);
    let nested = popByteBuffer();
    _encodeUser($user, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $toUser = message.toUser;
  if ($toUser !== void 0) {
    writeVarint32(bb, 66);
    let nested = popByteBuffer();
    _encodeUser($toUser, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $repeatEnd = message.repeatEnd;
  if ($repeatEnd !== void 0) {
    writeVarint32(bb, 72);
    writeVarint64(bb, intToLong($repeatEnd));
  }
  let $textEffect = message.textEffect;
  if ($textEffect !== void 0) {
    writeVarint32(bb, 82);
    let nested = popByteBuffer();
    _encodeGiftMessage_TextEffect($textEffect, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $groupId = message.groupId;
  if ($groupId !== void 0) {
    writeVarint32(bb, 88);
    writeVarint64(bb, $groupId);
  }
  let $incomeTaskgifts = message.incomeTaskgifts;
  if ($incomeTaskgifts !== void 0) {
    writeVarint32(bb, 96);
    writeVarint64(bb, $incomeTaskgifts);
  }
  let $roomFanTicketCount = message.roomFanTicketCount;
  if ($roomFanTicketCount !== void 0) {
    writeVarint32(bb, 104);
    writeVarint64(bb, $roomFanTicketCount);
  }
  let $priority = message.priority;
  if ($priority !== void 0) {
    writeVarint32(bb, 114);
    let nested = popByteBuffer();
    _encodeGiftIMPriority($priority, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $gift = message.gift;
  if ($gift !== void 0) {
    writeVarint32(bb, 122);
    let nested = popByteBuffer();
    _encodeGiftStruct($gift, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $logId = message.logId;
  if ($logId !== void 0) {
    writeVarint32(bb, 130);
    writeString(bb, $logId);
  }
  let $sendType = message.sendType;
  if ($sendType !== void 0) {
    writeVarint32(bb, 136);
    writeVarint64(bb, $sendType);
  }
  let $publicAreaCommon = message.publicAreaCommon;
  if ($publicAreaCommon !== void 0) {
    writeVarint32(bb, 146);
    let nested = popByteBuffer();
    _encodePublicAreaCommon($publicAreaCommon, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $trayDisplayText = message.trayDisplayText;
  if ($trayDisplayText !== void 0) {
    writeVarint32(bb, 154);
    let nested = popByteBuffer();
    _encodeText($trayDisplayText, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $bannedDisplayEffects = message.bannedDisplayEffects;
  if ($bannedDisplayEffects !== void 0) {
    writeVarint32(bb, 160);
    writeVarint64(bb, $bannedDisplayEffects);
  }
  let $trayInfo = message.trayInfo;
  if ($trayInfo !== void 0) {
    writeVarint32(bb, 170);
    let nested = popByteBuffer();
    _encodeGiftTrayInfo($trayInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $assetEffectMixInfo = message.assetEffectMixInfo;
  if ($assetEffectMixInfo !== void 0) {
    writeVarint32(bb, 194);
    let nested = popByteBuffer();
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $displayForSelf = message.displayForSelf;
  if ($displayForSelf !== void 0) {
    writeVarint32(bb, 200);
    writeByte(bb, $displayForSelf ? 1 : 0);
  }
  let $interactGiftInfo = message.interactGiftInfo;
  if ($interactGiftInfo !== void 0) {
    writeVarint32(bb, 210);
    writeString(bb, $interactGiftInfo);
  }
  let $diyItemInfo = message.diyItemInfo;
  if ($diyItemInfo !== void 0) {
    writeVarint32(bb, 218);
    writeString(bb, $diyItemInfo);
  }
  let $minAssetSet = message.minAssetSet;
  if ($minAssetSet !== void 0) {
    writeVarint32(bb, 224);
    writeVarint64(bb, $minAssetSet);
  }
  let $totalCount = message.totalCount;
  if ($totalCount !== void 0) {
    writeVarint32(bb, 232);
    writeVarint64(bb, $totalCount);
  }
  let $clientGiftSource = message.clientGiftSource;
  if ($clientGiftSource !== void 0) {
    writeVarint32(bb, 240);
    writeVarint64(bb, intToLong($clientGiftSource));
  }
  let $anchorGift = message.anchorGift;
  if ($anchorGift !== void 0) {
    writeVarint32(bb, 250);
    let nested = popByteBuffer();
    _encodeAnchorGiftData($anchorGift, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $toUserIds = message.toUserIds;
  if ($toUserIds !== void 0) {
    writeVarint32(bb, 256);
    writeVarint64(bb, $toUserIds);
  }
  let $sendTime = message.sendTime;
  if ($sendTime !== void 0) {
    writeVarint32(bb, 264);
    writeVarint64(bb, $sendTime);
  }
  let $forceDisplayEffects = message.forceDisplayEffects;
  if ($forceDisplayEffects !== void 0) {
    writeVarint32(bb, 272);
    writeVarint64(bb, $forceDisplayEffects);
  }
  let $traceId = message.traceId;
  if ($traceId !== void 0) {
    writeVarint32(bb, 282);
    writeString(bb, $traceId);
  }
  let $effectDisplayTs = message.effectDisplayTs;
  if ($effectDisplayTs !== void 0) {
    writeVarint32(bb, 288);
    writeVarint64(bb, $effectDisplayTs);
  }
  let $sendTogether = message.sendTogether;
  if ($sendTogether !== void 0) {
    writeVarint32(bb, 298);
    let nested = popByteBuffer();
    _encodeSendTogether($sendTogether, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $extraEffect = message.extraEffect;
  if ($extraEffect !== void 0) {
    writeVarint32(bb, 306);
    let nested = popByteBuffer();
    _encodeExtraEffect($extraEffect, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $roomHotInfo = message.roomHotInfo;
  if ($roomHotInfo !== void 0) {
    writeVarint32(bb, 314);
    let nested = popByteBuffer();
    _encodeRoomHotInfo($roomHotInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $GiftPlayParam = message.GiftPlayParam;
  if ($GiftPlayParam !== void 0) {
    writeVarint32(bb, 322);
    writeString(bb, $GiftPlayParam);
  }
  let $multiSendEffectLevel = message.multiSendEffectLevel;
  if ($multiSendEffectLevel !== void 0) {
    writeVarint32(bb, 328);
    writeVarint64(bb, intToLong($multiSendEffectLevel));
  }
  let array$seriesGiftData = message.seriesGiftData;
  if (array$seriesGiftData !== void 0) {
    for (let value of array$seriesGiftData) {
      writeVarint32(bb, 338);
      let nested = popByteBuffer();
      _encodeSeriesPlayGift(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
  let $useRoomMessage = message.useRoomMessage;
  if ($useRoomMessage !== void 0) {
    writeVarint32(bb, 344);
    writeByte(bb, $useRoomMessage ? 1 : 0);
  }
  let $count = message.count;
  if ($count !== void 0) {
    writeVarint32(bb, 352);
    writeVarint64(bb, $count);
  }
  let $toOpenids = message.toOpenids;
  if ($toOpenids !== void 0) {
    writeVarint32(bb, 40002);
    writeString(bb, $toOpenids);
  }
}
function decodeGiftMessage(binary) {
  return _decodeGiftMessage(wrapByteBuffer(binary));
}
function _decodeGiftMessage(bb) {
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
      // optional int64 giftId = 2;
      case 2: {
        message.giftId = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 fanTicketCount = 3;
      case 3: {
        message.fanTicketCount = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 groupCount = 4;
      case 4: {
        message.groupCount = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 repeatCount = 5;
      case 5: {
        message.repeatCount = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 comboCount = 6;
      case 6: {
        message.comboCount = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional User user = 7;
      case 7: {
        let limit = pushTemporaryLength(bb);
        message.user = _decodeUser(bb);
        bb.limit = limit;
        break;
      }
      // optional User toUser = 8;
      case 8: {
        let limit = pushTemporaryLength(bb);
        message.toUser = _decodeUser(bb);
        bb.limit = limit;
        break;
      }
      // optional int32 repeatEnd = 9;
      case 9: {
        message.repeatEnd = readVarint32(bb);
        break;
      }
      // optional GiftMessage_TextEffect textEffect = 10;
      case 10: {
        let limit = pushTemporaryLength(bb);
        message.textEffect = _decodeGiftMessage_TextEffect(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 groupId = 11;
      case 11: {
        message.groupId = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 incomeTaskgifts = 12;
      case 12: {
        message.incomeTaskgifts = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 roomFanTicketCount = 13;
      case 13: {
        message.roomFanTicketCount = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional GiftIMPriority priority = 14;
      case 14: {
        let limit = pushTemporaryLength(bb);
        message.priority = _decodeGiftIMPriority(bb);
        bb.limit = limit;
        break;
      }
      // optional GiftStruct gift = 15;
      case 15: {
        let limit = pushTemporaryLength(bb);
        message.gift = _decodeGiftStruct(bb);
        bb.limit = limit;
        break;
      }
      // optional string logId = 16;
      case 16: {
        message.logId = readString(bb, readVarint32(bb));
        break;
      }
      // optional int64 sendType = 17;
      case 17: {
        message.sendType = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional PublicAreaCommon publicAreaCommon = 18;
      case 18: {
        let limit = pushTemporaryLength(bb);
        message.publicAreaCommon = _decodePublicAreaCommon(bb);
        bb.limit = limit;
        break;
      }
      // optional Text trayDisplayText = 19;
      case 19: {
        let limit = pushTemporaryLength(bb);
        message.trayDisplayText = _decodeText(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 bannedDisplayEffects = 20;
      case 20: {
        message.bannedDisplayEffects = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional GiftTrayInfo trayInfo = 21;
      case 21: {
        let limit = pushTemporaryLength(bb);
        message.trayInfo = _decodeGiftTrayInfo(bb);
        bb.limit = limit;
        break;
      }
      // optional AssetEffectMixInfo assetEffectMixInfo = 24;
      case 24: {
        let limit = pushTemporaryLength(bb);
        message.assetEffectMixInfo = _decodeAssetEffectMixInfo(bb);
        bb.limit = limit;
        break;
      }
      // optional bool displayForSelf = 25;
      case 25: {
        message.displayForSelf = !!readByte(bb);
        break;
      }
      // optional string interactGiftInfo = 26;
      case 26: {
        message.interactGiftInfo = readString(bb, readVarint32(bb));
        break;
      }
      // optional string diyItemInfo = 27;
      case 27: {
        message.diyItemInfo = readString(bb, readVarint32(bb));
        break;
      }
      // optional int64 minAssetSet = 28;
      case 28: {
        message.minAssetSet = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 totalCount = 29;
      case 29: {
        message.totalCount = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int32 clientGiftSource = 30;
      case 30: {
        message.clientGiftSource = readVarint32(bb);
        break;
      }
      // optional AnchorGiftData anchorGift = 31;
      case 31: {
        let limit = pushTemporaryLength(bb);
        message.anchorGift = _decodeAnchorGiftData(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 toUserIds = 32;
      case 32: {
        message.toUserIds = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 sendTime = 33;
      case 33: {
        message.sendTime = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 forceDisplayEffects = 34;
      case 34: {
        message.forceDisplayEffects = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional string traceId = 35;
      case 35: {
        message.traceId = readString(bb, readVarint32(bb));
        break;
      }
      // optional int64 effectDisplayTs = 36;
      case 36: {
        message.effectDisplayTs = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional SendTogether sendTogether = 37;
      case 37: {
        let limit = pushTemporaryLength(bb);
        message.sendTogether = _decodeSendTogether(bb);
        bb.limit = limit;
        break;
      }
      // optional ExtraEffect extraEffect = 38;
      case 38: {
        let limit = pushTemporaryLength(bb);
        message.extraEffect = _decodeExtraEffect(bb);
        bb.limit = limit;
        break;
      }
      // optional RoomHotInfo roomHotInfo = 39;
      case 39: {
        let limit = pushTemporaryLength(bb);
        message.roomHotInfo = _decodeRoomHotInfo(bb);
        bb.limit = limit;
        break;
      }
      // optional string GiftPlayParam = 40;
      case 40: {
        message.GiftPlayParam = readString(bb, readVarint32(bb));
        break;
      }
      // optional int32 multiSendEffectLevel = 41;
      case 41: {
        message.multiSendEffectLevel = readVarint32(bb);
        break;
      }
      // repeated SeriesPlayGift seriesGiftData = 42;
      case 42: {
        let limit = pushTemporaryLength(bb);
        let values = message.seriesGiftData || (message.seriesGiftData = []);
        values.push(_decodeSeriesPlayGift(bb));
        bb.limit = limit;
        break;
      }
      // optional bool useRoomMessage = 43;
      case 43: {
        message.useRoomMessage = !!readByte(bb);
        break;
      }
      // optional int64 count = 44;
      case 44: {
        message.count = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional string toOpenids = 5000;
      case 5e3: {
        message.toOpenids = readString(bb, readVarint32(bb));
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function encodeGiftMessage_TextEffect(message) {
  let bb = popByteBuffer();
  _encodeGiftMessage_TextEffect(message, bb);
  return toUint8Array(bb);
}
function _encodeGiftMessage_TextEffect(message, bb) {
  let $portrait = message.portrait;
  if ($portrait !== void 0) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeGiftMessage_TextEffect_Detail($portrait, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $landscape = message.landscape;
  if ($landscape !== void 0) {
    writeVarint32(bb, 18);
    let nested = popByteBuffer();
    _encodeGiftMessage_TextEffect_Detail($landscape, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}
function decodeGiftMessage_TextEffect(binary) {
  return _decodeGiftMessage_TextEffect(wrapByteBuffer(binary));
}
function _decodeGiftMessage_TextEffect(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional GiftMessage_TextEffect_Detail portrait = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.portrait = _decodeGiftMessage_TextEffect_Detail(bb);
        bb.limit = limit;
        break;
      }
      // optional GiftMessage_TextEffect_Detail landscape = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        message.landscape = _decodeGiftMessage_TextEffect_Detail(bb);
        bb.limit = limit;
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function encodeGiftMessage_TextEffect_Detail(message) {
  let bb = popByteBuffer();
  _encodeGiftMessage_TextEffect_Detail(message, bb);
  return toUint8Array(bb);
}
function _encodeGiftMessage_TextEffect_Detail(message, bb) {
  let $text = message.text;
  if ($text !== void 0) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeText($text, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $textFontSize = message.textFontSize;
  if ($textFontSize !== void 0) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($textFontSize));
  }
  let $background = message.background;
  if ($background !== void 0) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeImage($background, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $start = message.start;
  if ($start !== void 0) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($start));
  }
  let $duration = message.duration;
  if ($duration !== void 0) {
    writeVarint32(bb, 40);
    writeVarint64(bb, intToLong($duration));
  }
  let $x = message.x;
  if ($x !== void 0) {
    writeVarint32(bb, 48);
    writeVarint64(bb, intToLong($x));
  }
  let $y = message.y;
  if ($y !== void 0) {
    writeVarint32(bb, 56);
    writeVarint64(bb, intToLong($y));
  }
  let $width = message.width;
  if ($width !== void 0) {
    writeVarint32(bb, 64);
    writeVarint64(bb, intToLong($width));
  }
  let $height = message.height;
  if ($height !== void 0) {
    writeVarint32(bb, 72);
    writeVarint64(bb, intToLong($height));
  }
  let $shadowDx = message.shadowDx;
  if ($shadowDx !== void 0) {
    writeVarint32(bb, 80);
    writeVarint64(bb, intToLong($shadowDx));
  }
  let $shadowDy = message.shadowDy;
  if ($shadowDy !== void 0) {
    writeVarint32(bb, 88);
    writeVarint64(bb, intToLong($shadowDy));
  }
  let $shadowRadius = message.shadowRadius;
  if ($shadowRadius !== void 0) {
    writeVarint32(bb, 96);
    writeVarint64(bb, intToLong($shadowRadius));
  }
  let $shadowColor = message.shadowColor;
  if ($shadowColor !== void 0) {
    writeVarint32(bb, 106);
    writeString(bb, $shadowColor);
  }
  let $strokeColor = message.strokeColor;
  if ($strokeColor !== void 0) {
    writeVarint32(bb, 114);
    writeString(bb, $strokeColor);
  }
  let $strokeWidth = message.strokeWidth;
  if ($strokeWidth !== void 0) {
    writeVarint32(bb, 120);
    writeVarint64(bb, intToLong($strokeWidth));
  }
}
function decodeGiftMessage_TextEffect_Detail(binary) {
  return _decodeGiftMessage_TextEffect_Detail(wrapByteBuffer(binary));
}
function _decodeGiftMessage_TextEffect_Detail(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional Text text = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.text = _decodeText(bb);
        bb.limit = limit;
        break;
      }
      // optional int32 textFontSize = 2;
      case 2: {
        message.textFontSize = readVarint32(bb);
        break;
      }
      // optional Image background = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.background = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional int32 start = 4;
      case 4: {
        message.start = readVarint32(bb);
        break;
      }
      // optional int32 duration = 5;
      case 5: {
        message.duration = readVarint32(bb);
        break;
      }
      // optional int32 x = 6;
      case 6: {
        message.x = readVarint32(bb);
        break;
      }
      // optional int32 y = 7;
      case 7: {
        message.y = readVarint32(bb);
        break;
      }
      // optional int32 width = 8;
      case 8: {
        message.width = readVarint32(bb);
        break;
      }
      // optional int32 height = 9;
      case 9: {
        message.height = readVarint32(bb);
        break;
      }
      // optional int32 shadowDx = 10;
      case 10: {
        message.shadowDx = readVarint32(bb);
        break;
      }
      // optional int32 shadowDy = 11;
      case 11: {
        message.shadowDy = readVarint32(bb);
        break;
      }
      // optional int32 shadowRadius = 12;
      case 12: {
        message.shadowRadius = readVarint32(bb);
        break;
      }
      // optional string shadowColor = 13;
      case 13: {
        message.shadowColor = readString(bb, readVarint32(bb));
        break;
      }
      // optional string strokeColor = 14;
      case 14: {
        message.strokeColor = readString(bb, readVarint32(bb));
        break;
      }
      // optional int32 strokeWidth = 15;
      case 15: {
        message.strokeWidth = readVarint32(bb);
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
export {
  decodeGiftMessage,
  decodeGiftMessage_TextEffect,
  decodeGiftMessage_TextEffect_Detail,
  encodeGiftMessage,
  encodeGiftMessage_TextEffect,
  encodeGiftMessage_TextEffect_Detail
};
