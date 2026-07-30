import { i as isAtEnd, r as readVarint32, s as skipUnknownField, a as pushTemporaryLength, d as readString, c as readByte, b as readVarint64, e as writeVarint32, g as writeString, k as writeVarint64, l as intToLong, h as writeByte, p as popByteBuffer, f as writeByteBuffer, m as pushByteBuffer, n as stringToLong, o as readFloat, q as writeFloat } from "./index-CnyZhh5D.js";
function _encodeCommon(message, bb) {
  let $method = message.method;
  if ($method !== void 0) {
    writeVarint32(bb, 10);
    writeString(bb, $method);
  }
  let $msgId = message.msgId;
  if ($msgId !== void 0) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $msgId);
  }
  let $roomId = message.roomId;
  if ($roomId !== void 0) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $roomId);
  }
  let $createTime = message.createTime;
  if ($createTime !== void 0) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $createTime);
  }
  let $monitor = message.monitor;
  if ($monitor !== void 0) {
    writeVarint32(bb, 40);
    writeVarint64(bb, intToLong($monitor));
  }
  let $isShowMsg = message.isShowMsg;
  if ($isShowMsg !== void 0) {
    writeVarint32(bb, 48);
    writeByte(bb, $isShowMsg ? 1 : 0);
  }
  let $describe = message.describe;
  if ($describe !== void 0) {
    writeVarint32(bb, 58);
    writeString(bb, $describe);
  }
  let $displayText = message.displayText;
  if ($displayText !== void 0) {
    writeVarint32(bb, 66);
    let nested = popByteBuffer();
    _encodeText($displayText, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $foldType = message.foldType;
  if ($foldType !== void 0) {
    writeVarint32(bb, 72);
    writeVarint64(bb, $foldType);
  }
  let $anchorFoldType = message.anchorFoldType;
  if ($anchorFoldType !== void 0) {
    writeVarint32(bb, 80);
    writeVarint64(bb, $anchorFoldType);
  }
  let $priorityScore = message.priorityScore;
  if ($priorityScore !== void 0) {
    writeVarint32(bb, 88);
    writeVarint64(bb, $priorityScore);
  }
  let $logId = message.logId;
  if ($logId !== void 0) {
    writeVarint32(bb, 98);
    writeString(bb, $logId);
  }
  let $msgProcessFilterK = message.msgProcessFilterK;
  if ($msgProcessFilterK !== void 0) {
    writeVarint32(bb, 106);
    writeString(bb, $msgProcessFilterK);
  }
  let $msgProcessFilterV = message.msgProcessFilterV;
  if ($msgProcessFilterV !== void 0) {
    writeVarint32(bb, 114);
    writeString(bb, $msgProcessFilterV);
  }
  let $user = message.user;
  if ($user !== void 0) {
    writeVarint32(bb, 122);
    let nested = popByteBuffer();
    _encodeUser($user, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $room = message.room;
  if ($room !== void 0) {
    writeVarint32(bb, 130);
    let nested = popByteBuffer();
    _encodeRoom($room, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $anchorFoldTypeV2 = message.anchorFoldTypeV2;
  if ($anchorFoldTypeV2 !== void 0) {
    writeVarint32(bb, 136);
    writeVarint64(bb, $anchorFoldTypeV2);
  }
  let $processAtSeiTimeMs = message.processAtSeiTimeMs;
  if ($processAtSeiTimeMs !== void 0) {
    writeVarint32(bb, 144);
    writeVarint64(bb, $processAtSeiTimeMs);
  }
  let $randomDispatchMs = message.randomDispatchMs;
  if ($randomDispatchMs !== void 0) {
    writeVarint32(bb, 152);
    writeVarint64(bb, $randomDispatchMs);
  }
  let $isDispatch = message.isDispatch;
  if ($isDispatch !== void 0) {
    writeVarint32(bb, 160);
    writeByte(bb, $isDispatch ? 1 : 0);
  }
  let $channelId = message.channelId;
  if ($channelId !== void 0) {
    writeVarint32(bb, 168);
    writeVarint64(bb, $channelId);
  }
  let $diffSei2absSecond = message.diffSei2absSecond;
  if ($diffSei2absSecond !== void 0) {
    writeVarint32(bb, 176);
    writeVarint64(bb, $diffSei2absSecond);
  }
  let $anchorFoldDuration = message.anchorFoldDuration;
  if ($anchorFoldDuration !== void 0) {
    writeVarint32(bb, 184);
    writeVarint64(bb, $anchorFoldDuration);
  }
  let $appId = message.appId;
  if ($appId !== void 0) {
    writeVarint32(bb, 192);
    writeVarint64(bb, $appId);
  }
}
function _decodeCommon(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional string method = 1;
      case 1: {
        message.method = readString(bb, readVarint32(bb));
        break;
      }
      // optional int64 msgId = 2;
      case 2: {
        message.msgId = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 roomId = 3;
      case 3: {
        message.roomId = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 createTime = 4;
      case 4: {
        message.createTime = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int32 monitor = 5;
      case 5: {
        message.monitor = readVarint32(bb);
        break;
      }
      // optional bool isShowMsg = 6;
      case 6: {
        message.isShowMsg = !!readByte(bb);
        break;
      }
      // optional string describe = 7;
      case 7: {
        message.describe = readString(bb, readVarint32(bb));
        break;
      }
      // optional Text displayText = 8;
      case 8: {
        let limit = pushTemporaryLength(bb);
        message.displayText = _decodeText(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 foldType = 9;
      case 9: {
        message.foldType = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 anchorFoldType = 10;
      case 10: {
        message.anchorFoldType = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 priorityScore = 11;
      case 11: {
        message.priorityScore = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional string logId = 12;
      case 12: {
        message.logId = readString(bb, readVarint32(bb));
        break;
      }
      // optional string msgProcessFilterK = 13;
      case 13: {
        message.msgProcessFilterK = readString(bb, readVarint32(bb));
        break;
      }
      // optional string msgProcessFilterV = 14;
      case 14: {
        message.msgProcessFilterV = readString(bb, readVarint32(bb));
        break;
      }
      // optional User user = 15;
      case 15: {
        let limit = pushTemporaryLength(bb);
        message.user = _decodeUser(bb);
        bb.limit = limit;
        break;
      }
      // optional Room room = 16;
      case 16: {
        let limit = pushTemporaryLength(bb);
        message.room = _decodeRoom(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 anchorFoldTypeV2 = 17;
      case 17: {
        message.anchorFoldTypeV2 = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 processAtSeiTimeMs = 18;
      case 18: {
        message.processAtSeiTimeMs = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 randomDispatchMs = 19;
      case 19: {
        message.randomDispatchMs = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional bool isDispatch = 20;
      case 20: {
        message.isDispatch = !!readByte(bb);
        break;
      }
      // optional int64 channelId = 21;
      case 21: {
        message.channelId = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 diffSei2absSecond = 22;
      case 22: {
        message.diffSei2absSecond = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 anchorFoldDuration = 23;
      case 23: {
        message.anchorFoldDuration = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 appId = 24;
      case 24: {
        message.appId = readVarint64(
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
function _encodeDoubleLikeDetail(message, bb) {
  let $doubleFlag = message.doubleFlag;
  if ($doubleFlag !== void 0) {
    writeVarint32(bb, 8);
    writeByte(bb, $doubleFlag ? 1 : 0);
  }
  let $seqId = message.seqId;
  if ($seqId !== void 0) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($seqId));
  }
  let $renewalsNum = message.renewalsNum;
  if ($renewalsNum !== void 0) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($renewalsNum));
  }
  let $triggersNum = message.triggersNum;
  if ($triggersNum !== void 0) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($triggersNum));
  }
}
function _decodeDoubleLikeDetail(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional bool doubleFlag = 1;
      case 1: {
        message.doubleFlag = !!readByte(bb);
        break;
      }
      // optional int32 seqId = 2;
      case 2: {
        message.seqId = readVarint32(bb);
        break;
      }
      // optional int32 renewalsNum = 3;
      case 3: {
        message.renewalsNum = readVarint32(bb);
        break;
      }
      // optional int32 triggersNum = 4;
      case 4: {
        message.triggersNum = readVarint32(bb);
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeDisplayControlInfo(message, bb) {
  let $showText = message.showText;
  if ($showText !== void 0) {
    writeVarint32(bb, 8);
    writeByte(bb, $showText ? 1 : 0);
  }
  let $showIcons = message.showIcons;
  if ($showIcons !== void 0) {
    writeVarint32(bb, 16);
    writeByte(bb, $showIcons ? 1 : 0);
  }
}
function _decodeDisplayControlInfo(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional bool showText = 1;
      case 1: {
        message.showText = !!readByte(bb);
        break;
      }
      // optional bool showIcons = 2;
      case 2: {
        message.showIcons = !!readByte(bb);
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeLandscapeAreaCommon(message, bb) {
  let $showHead = message.showHead;
  if ($showHead !== void 0) {
    writeVarint32(bb, 8);
    writeByte(bb, $showHead ? 1 : 0);
  }
  let $showNickname = message.showNickname;
  if ($showNickname !== void 0) {
    writeVarint32(bb, 16);
    writeByte(bb, $showNickname ? 1 : 0);
  }
  let $showFontColor = message.showFontColor;
  if ($showFontColor !== void 0) {
    writeVarint32(bb, 24);
    writeByte(bb, $showFontColor ? 1 : 0);
  }
  let $colorValue = message.colorValue;
  if ($colorValue !== void 0) {
    writeVarint32(bb, 34);
    writeString(bb, $colorValue);
  }
  let $commentTypeTags = message.commentTypeTags;
  if ($commentTypeTags !== void 0) {
    writeVarint32(bb, 40);
    writeVarint64(bb, intToLong($commentTypeTags));
  }
}
function _decodeLandscapeAreaCommon(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional bool showHead = 1;
      case 1: {
        message.showHead = !!readByte(bb);
        break;
      }
      // optional bool showNickname = 2;
      case 2: {
        message.showNickname = !!readByte(bb);
        break;
      }
      // optional bool showFontColor = 3;
      case 3: {
        message.showFontColor = !!readByte(bb);
        break;
      }
      // optional string colorValue = 4;
      case 4: {
        message.colorValue = readString(bb, readVarint32(bb));
        break;
      }
      // optional int32 commentTypeTags = 5;
      case 5: {
        message.commentTypeTags = readVarint32(bb);
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodePicoDisplayInfo(message, bb) {
  let $comboSumCount = message.comboSumCount;
  if ($comboSumCount !== void 0) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $comboSumCount);
  }
  let $emoji = message.emoji;
  if ($emoji !== void 0) {
    writeVarint32(bb, 18);
    writeString(bb, $emoji);
  }
  let $emojiIcon = message.emojiIcon;
  if ($emojiIcon !== void 0) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeImage($emojiIcon, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $emojiText = message.emojiText;
  if ($emojiText !== void 0) {
    writeVarint32(bb, 34);
    writeString(bb, $emojiText);
  }
}
function _decodePicoDisplayInfo(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional int64 comboSumCount = 1;
      case 1: {
        message.comboSumCount = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional string emoji = 2;
      case 2: {
        message.emoji = readString(bb, readVarint32(bb));
        break;
      }
      // optional Image emojiIcon = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.emojiIcon = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional string emojiText = 4;
      case 4: {
        message.emojiText = readString(bb, readVarint32(bb));
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeRoomHotInfo(message, bb) {
  let $localHotStrategy = message.localHotStrategy;
  if ($localHotStrategy !== void 0) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($localHotStrategy));
  }
  let $publicAreaLevel = message.publicAreaLevel;
  if ($publicAreaLevel !== void 0) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($publicAreaLevel));
  }
  let $giftLevel = message.giftLevel;
  if ($giftLevel !== void 0) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($giftLevel));
  }
}
function _decodeRoomHotInfo(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional int32 localHotStrategy = 1;
      case 1: {
        message.localHotStrategy = readVarint32(bb);
        break;
      }
      // optional int32 publicAreaLevel = 2;
      case 2: {
        message.publicAreaLevel = readVarint32(bb);
        break;
      }
      // optional int32 giftLevel = 3;
      case 3: {
        message.giftLevel = readVarint32(bb);
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeText(message, bb) {
  let $key = message.key;
  if ($key !== void 0) {
    writeVarint32(bb, 10);
    writeString(bb, $key);
  }
  let $defaultPattern = message.defaultPattern;
  if ($defaultPattern !== void 0) {
    writeVarint32(bb, 18);
    writeString(bb, $defaultPattern);
  }
  let $defaultFormat = message.defaultFormat;
  if ($defaultFormat !== void 0) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeTextFormat($defaultFormat, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let array$pieces = message.pieces;
  if (array$pieces !== void 0) {
    for (let value of array$pieces) {
      writeVarint32(bb, 34);
      let nested = popByteBuffer();
      _encodeTextPiece(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}
function _decodeText(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional string key = 1;
      case 1: {
        message.key = readString(bb, readVarint32(bb));
        break;
      }
      // optional string defaultPattern = 2;
      case 2: {
        message.defaultPattern = readString(bb, readVarint32(bb));
        break;
      }
      // optional TextFormat defaultFormat = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.defaultFormat = _decodeTextFormat(bb);
        bb.limit = limit;
        break;
      }
      // repeated TextPiece pieces = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        let values = message.pieces || (message.pieces = []);
        values.push(_decodeTextPiece(bb));
        bb.limit = limit;
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeRoom(message, bb) {
  let $id = message.id;
  if ($id !== void 0) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $id);
  }
  let $idStr = message.idStr;
  if ($idStr !== void 0) {
    writeVarint32(bb, 18);
    writeString(bb, $idStr);
  }
  let $status = message.status;
  if ($status !== void 0) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $status);
  }
  let $ownerUserId = message.ownerUserId;
  if ($ownerUserId !== void 0) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $ownerUserId);
  }
  let $title = message.title;
  if ($title !== void 0) {
    writeVarint32(bb, 42);
    writeString(bb, $title);
  }
  let $userCount = message.userCount;
  if ($userCount !== void 0) {
    writeVarint32(bb, 48);
    writeVarint64(bb, $userCount);
  }
  let $createTime = message.createTime;
  if ($createTime !== void 0) {
    writeVarint32(bb, 56);
    writeVarint64(bb, $createTime);
  }
  let $linkmicLayout = message.linkmicLayout;
  if ($linkmicLayout !== void 0) {
    writeVarint32(bb, 64);
    writeVarint64(bb, $linkmicLayout);
  }
  let $finishTime = message.finishTime;
  if ($finishTime !== void 0) {
    writeVarint32(bb, 72);
    writeVarint64(bb, $finishTime);
  }
  let $extra = message.extra;
  if ($extra !== void 0) {
    writeVarint32(bb, 82);
    let nested = popByteBuffer();
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $dynamicCoverUri = message.dynamicCoverUri;
  if ($dynamicCoverUri !== void 0) {
    writeVarint32(bb, 90);
    writeString(bb, $dynamicCoverUri);
  }
  let map$dynamicCoverDict = message.dynamicCoverDict;
  if (map$dynamicCoverDict !== void 0) {
    for (let key in map$dynamicCoverDict) {
      let nested = popByteBuffer();
      let value = map$dynamicCoverDict[key];
      writeVarint32(nested, 8);
      writeVarint64(nested, stringToLong(key));
      writeVarint32(nested, 18);
      writeString(nested, value);
      writeVarint32(bb, 98);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
  let $lastPingTime = message.lastPingTime;
  if ($lastPingTime !== void 0) {
    writeVarint32(bb, 104);
    writeVarint64(bb, $lastPingTime);
  }
  let $liveId = message.liveId;
  if ($liveId !== void 0) {
    writeVarint32(bb, 112);
    writeVarint64(bb, $liveId);
  }
  let $streamProvider = message.streamProvider;
  if ($streamProvider !== void 0) {
    writeVarint32(bb, 120);
    writeVarint64(bb, $streamProvider);
  }
  let $osType = message.osType;
  if ($osType !== void 0) {
    writeVarint32(bb, 128);
    writeVarint64(bb, $osType);
  }
  let $clientVersion = message.clientVersion;
  if ($clientVersion !== void 0) {
    writeVarint32(bb, 136);
    writeVarint64(bb, $clientVersion);
  }
  let $withLinkmic = message.withLinkmic;
  if ($withLinkmic !== void 0) {
    writeVarint32(bb, 144);
    writeByte(bb, $withLinkmic ? 1 : 0);
  }
  let $enableRoomPerspective = message.enableRoomPerspective;
  if ($enableRoomPerspective !== void 0) {
    writeVarint32(bb, 152);
    writeByte(bb, $enableRoomPerspective ? 1 : 0);
  }
  let $cover = message.cover;
  if ($cover !== void 0) {
    writeVarint32(bb, 162);
    let nested = popByteBuffer();
    _encodeImage($cover, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $dynamicCover = message.dynamicCover;
  if ($dynamicCover !== void 0) {
    writeVarint32(bb, 170);
    let nested = popByteBuffer();
    _encodeImage($dynamicCover, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $dynamicCoverLow = message.dynamicCoverLow;
  if ($dynamicCoverLow !== void 0) {
    writeVarint32(bb, 178);
    let nested = popByteBuffer();
    _encodeImage($dynamicCoverLow, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $shareUrl = message.shareUrl;
  if ($shareUrl !== void 0) {
    writeVarint32(bb, 186);
    writeString(bb, $shareUrl);
  }
  let $anchorShareText = message.anchorShareText;
  if ($anchorShareText !== void 0) {
    writeVarint32(bb, 194);
    writeString(bb, $anchorShareText);
  }
  let $userShareText = message.userShareText;
  if ($userShareText !== void 0) {
    writeVarint32(bb, 202);
    writeString(bb, $userShareText);
  }
  let $streamId = message.streamId;
  if ($streamId !== void 0) {
    writeVarint32(bb, 208);
    writeVarint64(bb, $streamId);
  }
  let $streamIdStr = message.streamIdStr;
  if ($streamIdStr !== void 0) {
    writeVarint32(bb, 218);
    writeString(bb, $streamIdStr);
  }
  let $streamUrl = message.streamUrl;
  if ($streamUrl !== void 0) {
    writeVarint32(bb, 226);
    let nested = popByteBuffer();
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $mosaicStatus = message.mosaicStatus;
  if ($mosaicStatus !== void 0) {
    writeVarint32(bb, 232);
    writeVarint64(bb, $mosaicStatus);
  }
  let $mosaicTip = message.mosaicTip;
  if ($mosaicTip !== void 0) {
    writeVarint32(bb, 242);
    writeString(bb, $mosaicTip);
  }
  let $cellStyle = message.cellStyle;
  if ($cellStyle !== void 0) {
    writeVarint32(bb, 248);
    writeVarint64(bb, $cellStyle);
  }
  let $linkMic = message.linkMic;
  if ($linkMic !== void 0) {
    writeVarint32(bb, 258);
    let nested = popByteBuffer();
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $luckymoneyNum = message.luckymoneyNum;
  if ($luckymoneyNum !== void 0) {
    writeVarint32(bb, 264);
    writeVarint64(bb, $luckymoneyNum);
  }
  let array$decoList = message.decoList;
  if (array$decoList !== void 0) {
    for (let value of array$decoList) {
      writeVarint32(bb, 274);
      let nested = popByteBuffer();
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
  let array$topFans = message.topFans;
  if (array$topFans !== void 0) {
    for (let value of array$topFans) {
      writeVarint32(bb, 282);
      let nested = popByteBuffer();
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
  let $stats = message.stats;
  if ($stats !== void 0) {
    writeVarint32(bb, 290);
    let nested = popByteBuffer();
    _encodeRoomStats($stats, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $sunDailyIconContent = message.sunDailyIconContent;
  if ($sunDailyIconContent !== void 0) {
    writeVarint32(bb, 298);
    writeString(bb, $sunDailyIconContent);
  }
  let $distance = message.distance;
  if ($distance !== void 0) {
    writeVarint32(bb, 306);
    writeString(bb, $distance);
  }
  let $distanceCity = message.distanceCity;
  if ($distanceCity !== void 0) {
    writeVarint32(bb, 314);
    writeString(bb, $distanceCity);
  }
  let $location = message.location;
  if ($location !== void 0) {
    writeVarint32(bb, 322);
    writeString(bb, $location);
  }
  let $realDistance = message.realDistance;
  if ($realDistance !== void 0) {
    writeVarint32(bb, 330);
    writeString(bb, $realDistance);
  }
  let $feedRoomLabel = message.feedRoomLabel;
  if ($feedRoomLabel !== void 0) {
    writeVarint32(bb, 338);
    let nested = popByteBuffer();
    _encodeImage($feedRoomLabel, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $commonLabelList = message.commonLabelList;
  if ($commonLabelList !== void 0) {
    writeVarint32(bb, 346);
    writeString(bb, $commonLabelList);
  }
  let $livingRoomAttrs = message.livingRoomAttrs;
  if ($livingRoomAttrs !== void 0) {
    writeVarint32(bb, 354);
    let nested = popByteBuffer();
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let array$adminUserIds = message.adminUserIds;
  if (array$adminUserIds !== void 0) {
    let packed = popByteBuffer();
    for (let value of array$adminUserIds) {
      writeVarint64(packed, value);
    }
    writeVarint32(bb, 362);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }
  let $owner = message.owner;
  if ($owner !== void 0) {
    writeVarint32(bb, 370);
    let nested = popByteBuffer();
    _encodeUser($owner, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $privateInfo = message.privateInfo;
  if ($privateInfo !== void 0) {
    writeVarint32(bb, 378);
    writeString(bb, $privateInfo);
  }
}
function _decodeRoom(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional int64 id = 1;
      case 1: {
        message.id = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional string idStr = 2;
      case 2: {
        message.idStr = readString(bb, readVarint32(bb));
        break;
      }
      // optional int64 status = 3;
      case 3: {
        message.status = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 ownerUserId = 4;
      case 4: {
        message.ownerUserId = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional string title = 5;
      case 5: {
        message.title = readString(bb, readVarint32(bb));
        break;
      }
      // optional int64 userCount = 6;
      case 6: {
        message.userCount = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 createTime = 7;
      case 7: {
        message.createTime = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 linkmicLayout = 8;
      case 8: {
        message.linkmicLayout = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 finishTime = 9;
      case 9: {
        message.finishTime = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional RoomExtra extra = 10;
      case 10: {
        let limit = pushTemporaryLength(bb);
        message.extra = _decodeRoomExtra(bb);
        bb.limit = limit;
        break;
      }
      // optional string dynamicCoverUri = 11;
      case 11: {
        message.dynamicCoverUri = readString(bb, readVarint32(bb));
        break;
      }
      // optional map<int64, string> dynamicCoverDict = 12;
      case 12: {
        let values = message.dynamicCoverDict || (message.dynamicCoverDict = {});
        let outerLimit = pushTemporaryLength(bb);
        let key;
        let value;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag2 = readVarint32(bb);
          switch (tag2 >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readVarint64(
                bb,
                /* unsigned */
                false
              );
              break;
            }
            case 2: {
              value = readString(bb, readVarint32(bb));
              break;
            }
            default:
              skipUnknownField(bb, tag2 & 7);
          }
        }
        if (key === void 0 || value === void 0) throw new Error("Invalid data for map: dynamicCoverDict");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }
      // optional int64 lastPingTime = 13;
      case 13: {
        message.lastPingTime = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 liveId = 14;
      case 14: {
        message.liveId = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 streamProvider = 15;
      case 15: {
        message.streamProvider = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 osType = 16;
      case 16: {
        message.osType = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 clientVersion = 17;
      case 17: {
        message.clientVersion = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional bool withLinkmic = 18;
      case 18: {
        message.withLinkmic = !!readByte(bb);
        break;
      }
      // optional bool enableRoomPerspective = 19;
      case 19: {
        message.enableRoomPerspective = !!readByte(bb);
        break;
      }
      // optional Image cover = 20;
      case 20: {
        let limit = pushTemporaryLength(bb);
        message.cover = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional Image dynamicCover = 21;
      case 21: {
        let limit = pushTemporaryLength(bb);
        message.dynamicCover = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional Image dynamicCoverLow = 22;
      case 22: {
        let limit = pushTemporaryLength(bb);
        message.dynamicCoverLow = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional string shareUrl = 23;
      case 23: {
        message.shareUrl = readString(bb, readVarint32(bb));
        break;
      }
      // optional string anchorShareText = 24;
      case 24: {
        message.anchorShareText = readString(bb, readVarint32(bb));
        break;
      }
      // optional string userShareText = 25;
      case 25: {
        message.userShareText = readString(bb, readVarint32(bb));
        break;
      }
      // optional int64 streamId = 26;
      case 26: {
        message.streamId = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional string streamIdStr = 27;
      case 27: {
        message.streamIdStr = readString(bb, readVarint32(bb));
        break;
      }
      // optional StreamUrl streamUrl = 28;
      case 28: {
        let limit = pushTemporaryLength(bb);
        message.streamUrl = _decodeStreamUrl(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 mosaicStatus = 29;
      case 29: {
        message.mosaicStatus = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional string mosaicTip = 30;
      case 30: {
        message.mosaicTip = readString(bb, readVarint32(bb));
        break;
      }
      // optional int64 cellStyle = 31;
      case 31: {
        message.cellStyle = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional LinkMic linkMic = 32;
      case 32: {
        let limit = pushTemporaryLength(bb);
        message.linkMic = _decodeLinkMic(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 luckymoneyNum = 33;
      case 33: {
        message.luckymoneyNum = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // repeated Decoration decoList = 34;
      case 34: {
        let limit = pushTemporaryLength(bb);
        let values = message.decoList || (message.decoList = []);
        values.push(_decodeDecoration(bb));
        bb.limit = limit;
        break;
      }
      // repeated TopFan topFans = 35;
      case 35: {
        let limit = pushTemporaryLength(bb);
        let values = message.topFans || (message.topFans = []);
        values.push(_decodeTopFan(bb));
        bb.limit = limit;
        break;
      }
      // optional RoomStats stats = 36;
      case 36: {
        let limit = pushTemporaryLength(bb);
        message.stats = _decodeRoomStats(bb);
        bb.limit = limit;
        break;
      }
      // optional string sunDailyIconContent = 37;
      case 37: {
        message.sunDailyIconContent = readString(bb, readVarint32(bb));
        break;
      }
      // optional string distance = 38;
      case 38: {
        message.distance = readString(bb, readVarint32(bb));
        break;
      }
      // optional string distanceCity = 39;
      case 39: {
        message.distanceCity = readString(bb, readVarint32(bb));
        break;
      }
      // optional string location = 40;
      case 40: {
        message.location = readString(bb, readVarint32(bb));
        break;
      }
      // optional string realDistance = 41;
      case 41: {
        message.realDistance = readString(bb, readVarint32(bb));
        break;
      }
      // optional Image feedRoomLabel = 42;
      case 42: {
        let limit = pushTemporaryLength(bb);
        message.feedRoomLabel = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional string commonLabelList = 43;
      case 43: {
        message.commonLabelList = readString(bb, readVarint32(bb));
        break;
      }
      // optional RoomUserAttr livingRoomAttrs = 44;
      case 44: {
        let limit = pushTemporaryLength(bb);
        message.livingRoomAttrs = _decodeRoomUserAttr(bb);
        bb.limit = limit;
        break;
      }
      // repeated int64 adminUserIds = 45;
      case 45: {
        let values = message.adminUserIds || (message.adminUserIds = []);
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
      // optional User owner = 46;
      case 46: {
        let limit = pushTemporaryLength(bb);
        message.owner = _decodeUser(bb);
        bb.limit = limit;
        break;
      }
      // optional string privateInfo = 47;
      case 47: {
        message.privateInfo = readString(bb, readVarint32(bb));
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _decodeRoomExtra(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeRoomStats(message, bb) {
  let $id = message.id;
  if ($id !== void 0) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $id);
  }
  let $idStr = message.idStr;
  if ($idStr !== void 0) {
    writeVarint32(bb, 18);
    writeString(bb, $idStr);
  }
  let $fanTicket = message.fanTicket;
  if ($fanTicket !== void 0) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $fanTicket);
  }
  let $money = message.money;
  if ($money !== void 0) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $money);
  }
  let $totalUser = message.totalUser;
  if ($totalUser !== void 0) {
    writeVarint32(bb, 40);
    writeVarint64(bb, $totalUser);
  }
  let $giftUvCount = message.giftUvCount;
  if ($giftUvCount !== void 0) {
    writeVarint32(bb, 48);
    writeVarint64(bb, $giftUvCount);
  }
  let $followCount = message.followCount;
  if ($followCount !== void 0) {
    writeVarint32(bb, 56);
    writeVarint64(bb, $followCount);
  }
  let $userCountComposition = message.userCountComposition;
  if ($userCountComposition !== void 0) {
    writeVarint32(bb, 66);
    let nested = popByteBuffer();
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $watermelon = message.watermelon;
  if ($watermelon !== void 0) {
    writeVarint32(bb, 72);
    writeVarint64(bb, $watermelon);
  }
  let $diggCount = message.diggCount;
  if ($diggCount !== void 0) {
    writeVarint32(bb, 80);
    writeVarint64(bb, $diggCount);
  }
  let $enterCount = message.enterCount;
  if ($enterCount !== void 0) {
    writeVarint32(bb, 88);
    writeVarint64(bb, $enterCount);
  }
  let $douPlusPromotion = message.douPlusPromotion;
  if ($douPlusPromotion !== void 0) {
    writeVarint32(bb, 98);
    writeString(bb, $douPlusPromotion);
  }
  let $totalUserDesp = message.totalUserDesp;
  if ($totalUserDesp !== void 0) {
    writeVarint32(bb, 106);
    writeString(bb, $totalUserDesp);
  }
  let $likeCount = message.likeCount;
  if ($likeCount !== void 0) {
    writeVarint32(bb, 112);
    writeVarint64(bb, $likeCount);
  }
  let $totalUserStr = message.totalUserStr;
  if ($totalUserStr !== void 0) {
    writeVarint32(bb, 122);
    writeString(bb, $totalUserStr);
  }
  let $userCountStr = message.userCountStr;
  if ($userCountStr !== void 0) {
    writeVarint32(bb, 130);
    writeString(bb, $userCountStr);
  }
  let $commentCount = message.commentCount;
  if ($commentCount !== void 0) {
    writeVarint32(bb, 136);
    writeVarint64(bb, $commentCount);
  }
  let $welfareDonationAmount = message.welfareDonationAmount;
  if ($welfareDonationAmount !== void 0) {
    writeVarint32(bb, 144);
    writeVarint64(bb, $welfareDonationAmount);
  }
  let $upRightStatsStr = message.upRightStatsStr;
  if ($upRightStatsStr !== void 0) {
    writeVarint32(bb, 154);
    writeString(bb, $upRightStatsStr);
  }
  let $upRightStatsStrComplete = message.upRightStatsStrComplete;
  if ($upRightStatsStrComplete !== void 0) {
    writeVarint32(bb, 162);
    writeString(bb, $upRightStatsStrComplete);
  }
}
function _decodeRoomStats(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional int64 id = 1;
      case 1: {
        message.id = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional string idStr = 2;
      case 2: {
        message.idStr = readString(bb, readVarint32(bb));
        break;
      }
      // optional int64 fanTicket = 3;
      case 3: {
        message.fanTicket = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 money = 4;
      case 4: {
        message.money = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 totalUser = 5;
      case 5: {
        message.totalUser = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 giftUvCount = 6;
      case 6: {
        message.giftUvCount = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 followCount = 7;
      case 7: {
        message.followCount = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional RoomStats_UserCountComposition userCountComposition = 8;
      case 8: {
        let limit = pushTemporaryLength(bb);
        message.userCountComposition = _decodeRoomStats_UserCountComposition(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 watermelon = 9;
      case 9: {
        message.watermelon = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 diggCount = 10;
      case 10: {
        message.diggCount = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 enterCount = 11;
      case 11: {
        message.enterCount = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional string douPlusPromotion = 12;
      case 12: {
        message.douPlusPromotion = readString(bb, readVarint32(bb));
        break;
      }
      // optional string totalUserDesp = 13;
      case 13: {
        message.totalUserDesp = readString(bb, readVarint32(bb));
        break;
      }
      // optional int64 likeCount = 14;
      case 14: {
        message.likeCount = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional string totalUserStr = 15;
      case 15: {
        message.totalUserStr = readString(bb, readVarint32(bb));
        break;
      }
      // optional string userCountStr = 16;
      case 16: {
        message.userCountStr = readString(bb, readVarint32(bb));
        break;
      }
      // optional int64 commentCount = 17;
      case 17: {
        message.commentCount = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 welfareDonationAmount = 18;
      case 18: {
        message.welfareDonationAmount = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional string upRightStatsStr = 19;
      case 19: {
        message.upRightStatsStr = readString(bb, readVarint32(bb));
        break;
      }
      // optional string upRightStatsStrComplete = 20;
      case 20: {
        message.upRightStatsStrComplete = readString(bb, readVarint32(bb));
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _decodeRoomStats_UserCountComposition(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _decodeRoomUserAttr(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _decodeStreamUrl(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _decodeLinkMic(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _decodeDecoration(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _decodeTopFan(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeUser(message, bb) {
  let $id = message.id;
  if ($id !== void 0) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $id);
  }
  let $shortId = message.shortId;
  if ($shortId !== void 0) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $shortId);
  }
  let $nickname = message.nickname;
  if ($nickname !== void 0) {
    writeVarint32(bb, 26);
    writeString(bb, $nickname);
  }
  let $gender = message.gender;
  if ($gender !== void 0) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($gender));
  }
  let $signature = message.signature;
  if ($signature !== void 0) {
    writeVarint32(bb, 42);
    writeString(bb, $signature);
  }
  let $level = message.level;
  if ($level !== void 0) {
    writeVarint32(bb, 48);
    writeVarint64(bb, intToLong($level));
  }
  let $birthday = message.birthday;
  if ($birthday !== void 0) {
    writeVarint32(bb, 56);
    writeVarint64(bb, $birthday);
  }
  let $telephone = message.telephone;
  if ($telephone !== void 0) {
    writeVarint32(bb, 66);
    writeString(bb, $telephone);
  }
  let $avatarThumb = message.avatarThumb;
  if ($avatarThumb !== void 0) {
    writeVarint32(bb, 74);
    let nested = popByteBuffer();
    _encodeImage($avatarThumb, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $avatarMedium = message.avatarMedium;
  if ($avatarMedium !== void 0) {
    writeVarint32(bb, 82);
    let nested = popByteBuffer();
    _encodeImage($avatarMedium, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $avatarLarge = message.avatarLarge;
  if ($avatarLarge !== void 0) {
    writeVarint32(bb, 90);
    let nested = popByteBuffer();
    _encodeImage($avatarLarge, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $verified = message.verified;
  if ($verified !== void 0) {
    writeVarint32(bb, 96);
    writeByte(bb, $verified ? 1 : 0);
  }
  let $experience = message.experience;
  if ($experience !== void 0) {
    writeVarint32(bb, 104);
    writeVarint64(bb, intToLong($experience));
  }
  let $city = message.city;
  if ($city !== void 0) {
    writeVarint32(bb, 114);
    writeString(bb, $city);
  }
  let $status = message.status;
  if ($status !== void 0) {
    writeVarint32(bb, 120);
    writeVarint64(bb, intToLong($status));
  }
  let $createTime = message.createTime;
  if ($createTime !== void 0) {
    writeVarint32(bb, 128);
    writeVarint64(bb, $createTime);
  }
  let $modifyTime = message.modifyTime;
  if ($modifyTime !== void 0) {
    writeVarint32(bb, 136);
    writeVarint64(bb, $modifyTime);
  }
  let $secret = message.secret;
  if ($secret !== void 0) {
    writeVarint32(bb, 144);
    writeVarint64(bb, intToLong($secret));
  }
  let $shareQrcodeUri = message.shareQrcodeUri;
  if ($shareQrcodeUri !== void 0) {
    writeVarint32(bb, 154);
    writeString(bb, $shareQrcodeUri);
  }
  let $incomeSharePercent = message.incomeSharePercent;
  if ($incomeSharePercent !== void 0) {
    writeVarint32(bb, 160);
    writeVarint64(bb, intToLong($incomeSharePercent));
  }
  let $badgeImageList = message.badgeImageList;
  if ($badgeImageList !== void 0) {
    writeVarint32(bb, 170);
    let nested = popByteBuffer();
    _encodeImage($badgeImageList, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $followInfo = message.followInfo;
  if ($followInfo !== void 0) {
    writeVarint32(bb, 178);
    let nested = popByteBuffer();
    _encodeUser_FollowInfo($followInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $payGrade = message.payGrade;
  if ($payGrade !== void 0) {
    writeVarint32(bb, 186);
    let nested = popByteBuffer();
    _encodeUser_PayGrade($payGrade, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $fansClub = message.fansClub;
  if ($fansClub !== void 0) {
    writeVarint32(bb, 194);
    let nested = popByteBuffer();
    _encodeUser_FansClub($fansClub, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $border = message.border;
  if ($border !== void 0) {
    writeVarint32(bb, 202);
    let nested = popByteBuffer();
    _encodeUser_Border($border, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $specialId = message.specialId;
  if ($specialId !== void 0) {
    writeVarint32(bb, 210);
    writeString(bb, $specialId);
  }
  let $avatarBorder = message.avatarBorder;
  if ($avatarBorder !== void 0) {
    writeVarint32(bb, 218);
    let nested = popByteBuffer();
    _encodeImage($avatarBorder, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $medal = message.medal;
  if ($medal !== void 0) {
    writeVarint32(bb, 226);
    let nested = popByteBuffer();
    _encodeImage($medal, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let array$realTimeIcons = message.realTimeIcons;
  if (array$realTimeIcons !== void 0) {
    for (let value of array$realTimeIcons) {
      writeVarint32(bb, 234);
      let nested = popByteBuffer();
      _encodeImage(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
  let array$newRealTimeIcons = message.newRealTimeIcons;
  if (array$newRealTimeIcons !== void 0) {
    for (let value of array$newRealTimeIcons) {
      writeVarint32(bb, 242);
      let nested = popByteBuffer();
      _encodeImage(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
  let $topVipNo = message.topVipNo;
  if ($topVipNo !== void 0) {
    writeVarint32(bb, 248);
    writeVarint64(bb, $topVipNo);
  }
  let $userAttr = message.userAttr;
  if ($userAttr !== void 0) {
    writeVarint32(bb, 258);
    let nested = popByteBuffer();
    _encodeUser_UserAttr($userAttr, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $ownRoom = message.ownRoom;
  if ($ownRoom !== void 0) {
    writeVarint32(bb, 266);
    let nested = popByteBuffer();
    _encodeUser_OwnRoom($ownRoom, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $payScore = message.payScore;
  if ($payScore !== void 0) {
    writeVarint32(bb, 272);
    writeVarint64(bb, $payScore);
  }
  let $ticketCount = message.ticketCount;
  if ($ticketCount !== void 0) {
    writeVarint32(bb, 280);
    writeVarint64(bb, $ticketCount);
  }
  let $anchorInfo = message.anchorInfo;
  if ($anchorInfo !== void 0) {
    writeVarint32(bb, 290);
    let nested = popByteBuffer();
    _encodeUser_AnchorInfo($anchorInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $linkMicStats = message.linkMicStats;
  if ($linkMicStats !== void 0) {
    writeVarint32(bb, 296);
    writeVarint64(bb, intToLong($linkMicStats));
  }
  let $displayId = message.displayId;
  if ($displayId !== void 0) {
    writeVarint32(bb, 306);
    writeString(bb, $displayId);
  }
  let $withCommercePermission = message.withCommercePermission;
  if ($withCommercePermission !== void 0) {
    writeVarint32(bb, 312);
    writeByte(bb, $withCommercePermission ? 1 : 0);
  }
  let $withFusionShopEntry = message.withFusionShopEntry;
  if ($withFusionShopEntry !== void 0) {
    writeVarint32(bb, 320);
    writeByte(bb, $withFusionShopEntry ? 1 : 0);
  }
  let $totalRechargeDiamondCount = message.totalRechargeDiamondCount;
  if ($totalRechargeDiamondCount !== void 0) {
    writeVarint32(bb, 328);
    writeVarint64(bb, $totalRechargeDiamondCount);
  }
  let $webcastAnchorLevel = message.webcastAnchorLevel;
  if ($webcastAnchorLevel !== void 0) {
    writeVarint32(bb, 338);
    let nested = popByteBuffer();
    _encodeUser_AnchorLevel($webcastAnchorLevel, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $verifiedContent = message.verifiedContent;
  if ($verifiedContent !== void 0) {
    writeVarint32(bb, 346);
    writeString(bb, $verifiedContent);
  }
  let $authorStats = message.authorStats;
  if ($authorStats !== void 0) {
    writeVarint32(bb, 354);
    let nested = popByteBuffer();
    _encodeUser_AuthorStats($authorStats, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $topFans = message.topFans;
  if ($topFans !== void 0) {
    writeVarint32(bb, 362);
    let nested = popByteBuffer();
    _encodeUser($topFans, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $secUid = message.secUid;
  if ($secUid !== void 0) {
    writeVarint32(bb, 370);
    writeString(bb, $secUid);
  }
  let $userRole = message.userRole;
  if ($userRole !== void 0) {
    writeVarint32(bb, 376);
    writeVarint64(bb, intToLong($userRole));
  }
  let $xiguaInfo = message.xiguaInfo;
  if ($xiguaInfo !== void 0) {
    writeVarint32(bb, 386);
    let nested = popByteBuffer();
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $activityReward = message.activityReward;
  if ($activityReward !== void 0) {
    writeVarint32(bb, 394);
    let nested = popByteBuffer();
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $nobleInfo = message.nobleInfo;
  if ($nobleInfo !== void 0) {
    writeVarint32(bb, 402);
    let nested = popByteBuffer();
    _encodeUser_NobleLevelInfo($nobleInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $brotherhoodInfo = message.brotherhoodInfo;
  if ($brotherhoodInfo !== void 0) {
    writeVarint32(bb, 410);
    let nested = popByteBuffer();
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $personalCard = message.personalCard;
  if ($personalCard !== void 0) {
    writeVarint32(bb, 418);
    let nested = popByteBuffer();
    _encodeImage($personalCard, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $authenticationInfo = message.authenticationInfo;
  if ($authenticationInfo !== void 0) {
    writeVarint32(bb, 426);
    let nested = popByteBuffer();
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $authorizationInfo = message.authorizationInfo;
  if ($authorizationInfo !== void 0) {
    writeVarint32(bb, 432);
    writeVarint64(bb, intToLong($authorizationInfo));
  }
  let $adversaryAuthorizationInfo = message.adversaryAuthorizationInfo;
  if ($adversaryAuthorizationInfo !== void 0) {
    writeVarint32(bb, 440);
    writeVarint64(bb, intToLong($adversaryAuthorizationInfo));
  }
  let $poiInfo = message.poiInfo;
  if ($poiInfo !== void 0) {
    writeVarint32(bb, 450);
    let nested = popByteBuffer();
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $mediaBadgeImageList = message.mediaBadgeImageList;
  if ($mediaBadgeImageList !== void 0) {
    writeVarint32(bb, 458);
    let nested = popByteBuffer();
    _encodeImage($mediaBadgeImageList, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $adversaryUserStatus = message.adversaryUserStatus;
  if ($adversaryUserStatus !== void 0) {
    writeVarint32(bb, 464);
    writeVarint64(bb, intToLong($adversaryUserStatus));
  }
  let $userVipInfo = message.userVipInfo;
  if ($userVipInfo !== void 0) {
    writeVarint32(bb, 474);
    let nested = popByteBuffer();
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $commerceWebcastConfigIds = message.commerceWebcastConfigIds;
  if ($commerceWebcastConfigIds !== void 0) {
    writeVarint32(bb, 480);
    writeVarint64(bb, $commerceWebcastConfigIds);
  }
  let $badgeImageListV2 = message.badgeImageListV2;
  if ($badgeImageListV2 !== void 0) {
    writeVarint32(bb, 490);
    let nested = popByteBuffer();
    _encodeImage($badgeImageListV2, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $industryCertification = message.industryCertification;
  if ($industryCertification !== void 0) {
    writeVarint32(bb, 498);
    let nested = popByteBuffer();
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $locationCity = message.locationCity;
  if ($locationCity !== void 0) {
    writeVarint32(bb, 506);
    writeString(bb, $locationCity);
  }
  let $fansGroupInfo = message.fansGroupInfo;
  if ($fansGroupInfo !== void 0) {
    writeVarint32(bb, 514);
    let nested = popByteBuffer();
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $remarkName = message.remarkName;
  if ($remarkName !== void 0) {
    writeVarint32(bb, 522);
    writeString(bb, $remarkName);
  }
  let $mysteryMan = message.mysteryMan;
  if ($mysteryMan !== void 0) {
    writeVarint32(bb, 528);
    writeVarint64(bb, intToLong($mysteryMan));
  }
  let $webRid = message.webRid;
  if ($webRid !== void 0) {
    writeVarint32(bb, 538);
    writeString(bb, $webRid);
  }
  let $desensitizedNickname = message.desensitizedNickname;
  if ($desensitizedNickname !== void 0) {
    writeVarint32(bb, 546);
    writeString(bb, $desensitizedNickname);
  }
  let $jAccreditInfo = message.jAccreditInfo;
  if ($jAccreditInfo !== void 0) {
    writeVarint32(bb, 554);
    let nested = popByteBuffer();
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $subscribe = message.subscribe;
  if ($subscribe !== void 0) {
    writeVarint32(bb, 562);
    let nested = popByteBuffer();
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $isAnonymous = message.isAnonymous;
  if ($isAnonymous !== void 0) {
    writeVarint32(bb, 568);
    writeByte(bb, $isAnonymous ? 1 : 0);
  }
  let $consumeDiamondLevel = message.consumeDiamondLevel;
  if ($consumeDiamondLevel !== void 0) {
    writeVarint32(bb, 576);
    writeVarint64(bb, intToLong($consumeDiamondLevel));
  }
  let $webcastUid = message.webcastUid;
  if ($webcastUid !== void 0) {
    writeVarint32(bb, 586);
    writeString(bb, $webcastUid);
  }
  let $profileStyleParams = message.profileStyleParams;
  if ($profileStyleParams !== void 0) {
    writeVarint32(bb, 594);
    let nested = popByteBuffer();
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $userDressInfo = message.userDressInfo;
  if ($userDressInfo !== void 0) {
    writeVarint32(bb, 602);
    let nested = popByteBuffer();
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $bizRelation = message.bizRelation;
  if ($bizRelation !== void 0) {
    writeVarint32(bb, 610);
    let nested = popByteBuffer();
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $memberEntranceInfo = message.memberEntranceInfo;
  if ($memberEntranceInfo !== void 0) {
    writeVarint32(bb, 618);
    let nested = popByteBuffer();
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $publicAreaBadgeInfo = message.publicAreaBadgeInfo;
  if ($publicAreaBadgeInfo !== void 0) {
    writeVarint32(bb, 626);
    let nested = popByteBuffer();
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $extraInfo = message.extraInfo;
  if ($extraInfo !== void 0) {
    writeVarint32(bb, 634);
    let nested = popByteBuffer();
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $userSettingInfo = message.userSettingInfo;
  if ($userSettingInfo !== void 0) {
    writeVarint32(bb, 642);
    let nested = popByteBuffer();
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $publicAreaOperFreq = message.publicAreaOperFreq;
  if ($publicAreaOperFreq !== void 0) {
    writeVarint32(bb, 648);
    writeVarint64(bb, $publicAreaOperFreq);
  }
  let $userPermissionGrantInfo = message.userPermissionGrantInfo;
  if ($userPermissionGrantInfo !== void 0) {
    writeVarint32(bb, 658);
    let nested = popByteBuffer();
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $userCanceled = message.userCanceled;
  if ($userCanceled !== void 0) {
    writeVarint32(bb, 664);
    writeByte(bb, $userCanceled ? 1 : 0);
  }
}
function _decodeUser(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional int64 id = 1;
      case 1: {
        message.id = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 shortId = 2;
      case 2: {
        message.shortId = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional string nickname = 3;
      case 3: {
        message.nickname = readString(bb, readVarint32(bb));
        break;
      }
      // optional int32 gender = 4;
      case 4: {
        message.gender = readVarint32(bb);
        break;
      }
      // optional string signature = 5;
      case 5: {
        message.signature = readString(bb, readVarint32(bb));
        break;
      }
      // optional int32 level = 6;
      case 6: {
        message.level = readVarint32(bb);
        break;
      }
      // optional int64 birthday = 7;
      case 7: {
        message.birthday = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional string telephone = 8;
      case 8: {
        message.telephone = readString(bb, readVarint32(bb));
        break;
      }
      // optional Image avatarThumb = 9;
      case 9: {
        let limit = pushTemporaryLength(bb);
        message.avatarThumb = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional Image avatarMedium = 10;
      case 10: {
        let limit = pushTemporaryLength(bb);
        message.avatarMedium = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional Image avatarLarge = 11;
      case 11: {
        let limit = pushTemporaryLength(bb);
        message.avatarLarge = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional bool verified = 12;
      case 12: {
        message.verified = !!readByte(bb);
        break;
      }
      // optional int32 experience = 13;
      case 13: {
        message.experience = readVarint32(bb);
        break;
      }
      // optional string city = 14;
      case 14: {
        message.city = readString(bb, readVarint32(bb));
        break;
      }
      // optional int32 status = 15;
      case 15: {
        message.status = readVarint32(bb);
        break;
      }
      // optional int64 createTime = 16;
      case 16: {
        message.createTime = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 modifyTime = 17;
      case 17: {
        message.modifyTime = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int32 secret = 18;
      case 18: {
        message.secret = readVarint32(bb);
        break;
      }
      // optional string shareQrcodeUri = 19;
      case 19: {
        message.shareQrcodeUri = readString(bb, readVarint32(bb));
        break;
      }
      // optional int32 incomeSharePercent = 20;
      case 20: {
        message.incomeSharePercent = readVarint32(bb);
        break;
      }
      // optional Image badgeImageList = 21;
      case 21: {
        let limit = pushTemporaryLength(bb);
        message.badgeImageList = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional User_FollowInfo followInfo = 22;
      case 22: {
        let limit = pushTemporaryLength(bb);
        message.followInfo = _decodeUser_FollowInfo(bb);
        bb.limit = limit;
        break;
      }
      // optional User_PayGrade payGrade = 23;
      case 23: {
        let limit = pushTemporaryLength(bb);
        message.payGrade = _decodeUser_PayGrade(bb);
        bb.limit = limit;
        break;
      }
      // optional User_FansClub fansClub = 24;
      case 24: {
        let limit = pushTemporaryLength(bb);
        message.fansClub = _decodeUser_FansClub(bb);
        bb.limit = limit;
        break;
      }
      // optional User_Border border = 25;
      case 25: {
        let limit = pushTemporaryLength(bb);
        message.border = _decodeUser_Border(bb);
        bb.limit = limit;
        break;
      }
      // optional string specialId = 26;
      case 26: {
        message.specialId = readString(bb, readVarint32(bb));
        break;
      }
      // optional Image avatarBorder = 27;
      case 27: {
        let limit = pushTemporaryLength(bb);
        message.avatarBorder = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional Image medal = 28;
      case 28: {
        let limit = pushTemporaryLength(bb);
        message.medal = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // repeated Image realTimeIcons = 29;
      case 29: {
        let limit = pushTemporaryLength(bb);
        let values = message.realTimeIcons || (message.realTimeIcons = []);
        values.push(_decodeImage(bb));
        bb.limit = limit;
        break;
      }
      // repeated Image newRealTimeIcons = 30;
      case 30: {
        let limit = pushTemporaryLength(bb);
        let values = message.newRealTimeIcons || (message.newRealTimeIcons = []);
        values.push(_decodeImage(bb));
        bb.limit = limit;
        break;
      }
      // optional int64 topVipNo = 31;
      case 31: {
        message.topVipNo = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional User_UserAttr userAttr = 32;
      case 32: {
        let limit = pushTemporaryLength(bb);
        message.userAttr = _decodeUser_UserAttr(bb);
        bb.limit = limit;
        break;
      }
      // optional User_OwnRoom ownRoom = 33;
      case 33: {
        let limit = pushTemporaryLength(bb);
        message.ownRoom = _decodeUser_OwnRoom(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 payScore = 34;
      case 34: {
        message.payScore = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 ticketCount = 35;
      case 35: {
        message.ticketCount = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional User_AnchorInfo anchorInfo = 36;
      case 36: {
        let limit = pushTemporaryLength(bb);
        message.anchorInfo = _decodeUser_AnchorInfo(bb);
        bb.limit = limit;
        break;
      }
      // optional int32 linkMicStats = 37;
      case 37: {
        message.linkMicStats = readVarint32(bb);
        break;
      }
      // optional string displayId = 38;
      case 38: {
        message.displayId = readString(bb, readVarint32(bb));
        break;
      }
      // optional bool withCommercePermission = 39;
      case 39: {
        message.withCommercePermission = !!readByte(bb);
        break;
      }
      // optional bool withFusionShopEntry = 40;
      case 40: {
        message.withFusionShopEntry = !!readByte(bb);
        break;
      }
      // optional int64 totalRechargeDiamondCount = 41;
      case 41: {
        message.totalRechargeDiamondCount = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional User_AnchorLevel webcastAnchorLevel = 42;
      case 42: {
        let limit = pushTemporaryLength(bb);
        message.webcastAnchorLevel = _decodeUser_AnchorLevel(bb);
        bb.limit = limit;
        break;
      }
      // optional string verifiedContent = 43;
      case 43: {
        message.verifiedContent = readString(bb, readVarint32(bb));
        break;
      }
      // optional User_AuthorStats authorStats = 44;
      case 44: {
        let limit = pushTemporaryLength(bb);
        message.authorStats = _decodeUser_AuthorStats(bb);
        bb.limit = limit;
        break;
      }
      // optional User topFans = 45;
      case 45: {
        let limit = pushTemporaryLength(bb);
        message.topFans = _decodeUser(bb);
        bb.limit = limit;
        break;
      }
      // optional string secUid = 46;
      case 46: {
        message.secUid = readString(bb, readVarint32(bb));
        break;
      }
      // optional int32 userRole = 47;
      case 47: {
        message.userRole = readVarint32(bb);
        break;
      }
      // optional User_XiguaParams xiguaInfo = 48;
      case 48: {
        let limit = pushTemporaryLength(bb);
        message.xiguaInfo = _decodeUser_XiguaParams(bb);
        bb.limit = limit;
        break;
      }
      // optional User_ActivityInfo activityReward = 49;
      case 49: {
        let limit = pushTemporaryLength(bb);
        message.activityReward = _decodeUser_ActivityInfo(bb);
        bb.limit = limit;
        break;
      }
      // optional User_NobleLevelInfo nobleInfo = 50;
      case 50: {
        let limit = pushTemporaryLength(bb);
        message.nobleInfo = _decodeUser_NobleLevelInfo(bb);
        bb.limit = limit;
        break;
      }
      // optional User_BrotherhoodInfo brotherhoodInfo = 51;
      case 51: {
        let limit = pushTemporaryLength(bb);
        message.brotherhoodInfo = _decodeUser_BrotherhoodInfo(bb);
        bb.limit = limit;
        break;
      }
      // optional Image personalCard = 52;
      case 52: {
        let limit = pushTemporaryLength(bb);
        message.personalCard = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional User_AuthenticationInfo authenticationInfo = 53;
      case 53: {
        let limit = pushTemporaryLength(bb);
        message.authenticationInfo = _decodeUser_AuthenticationInfo(bb);
        bb.limit = limit;
        break;
      }
      // optional int32 authorizationInfo = 54;
      case 54: {
        message.authorizationInfo = readVarint32(bb);
        break;
      }
      // optional int32 adversaryAuthorizationInfo = 55;
      case 55: {
        message.adversaryAuthorizationInfo = readVarint32(bb);
        break;
      }
      // optional User_PoiInfo poiInfo = 56;
      case 56: {
        let limit = pushTemporaryLength(bb);
        message.poiInfo = _decodeUser_PoiInfo(bb);
        bb.limit = limit;
        break;
      }
      // optional Image mediaBadgeImageList = 57;
      case 57: {
        let limit = pushTemporaryLength(bb);
        message.mediaBadgeImageList = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional int32 adversaryUserStatus = 58;
      case 58: {
        message.adversaryUserStatus = readVarint32(bb);
        break;
      }
      // optional UserVIPInfo userVipInfo = 59;
      case 59: {
        let limit = pushTemporaryLength(bb);
        message.userVipInfo = _decodeUserVIPInfo(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 commerceWebcastConfigIds = 60;
      case 60: {
        message.commerceWebcastConfigIds = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional Image badgeImageListV2 = 61;
      case 61: {
        let limit = pushTemporaryLength(bb);
        message.badgeImageListV2 = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional IndustryCertification industryCertification = 62;
      case 62: {
        let limit = pushTemporaryLength(bb);
        message.industryCertification = _decodeIndustryCertification(bb);
        bb.limit = limit;
        break;
      }
      // optional string locationCity = 63;
      case 63: {
        message.locationCity = readString(bb, readVarint32(bb));
        break;
      }
      // optional User_FansGroupInfo fansGroupInfo = 64;
      case 64: {
        let limit = pushTemporaryLength(bb);
        message.fansGroupInfo = _decodeUser_FansGroupInfo(bb);
        bb.limit = limit;
        break;
      }
      // optional string remarkName = 65;
      case 65: {
        message.remarkName = readString(bb, readVarint32(bb));
        break;
      }
      // optional int32 mysteryMan = 66;
      case 66: {
        message.mysteryMan = readVarint32(bb);
        break;
      }
      // optional string webRid = 67;
      case 67: {
        message.webRid = readString(bb, readVarint32(bb));
        break;
      }
      // optional string desensitizedNickname = 68;
      case 68: {
        message.desensitizedNickname = readString(bb, readVarint32(bb));
        break;
      }
      // optional User_JAccreditInfo jAccreditInfo = 69;
      case 69: {
        let limit = pushTemporaryLength(bb);
        message.jAccreditInfo = _decodeUser_JAccreditInfo(bb);
        bb.limit = limit;
        break;
      }
      // optional User_Subscribe subscribe = 70;
      case 70: {
        let limit = pushTemporaryLength(bb);
        message.subscribe = _decodeUser_Subscribe(bb);
        bb.limit = limit;
        break;
      }
      // optional bool isAnonymous = 71;
      case 71: {
        message.isAnonymous = !!readByte(bb);
        break;
      }
      // optional int32 consumeDiamondLevel = 72;
      case 72: {
        message.consumeDiamondLevel = readVarint32(bb);
        break;
      }
      // optional string webcastUid = 73;
      case 73: {
        message.webcastUid = readString(bb, readVarint32(bb));
        break;
      }
      // optional User_ProfileStyleParams profileStyleParams = 74;
      case 74: {
        let limit = pushTemporaryLength(bb);
        message.profileStyleParams = _decodeUser_ProfileStyleParams(bb);
        bb.limit = limit;
        break;
      }
      // optional User_UserDressInfo userDressInfo = 75;
      case 75: {
        let limit = pushTemporaryLength(bb);
        message.userDressInfo = _decodeUser_UserDressInfo(bb);
        bb.limit = limit;
        break;
      }
      // optional User_BizRelation bizRelation = 76;
      case 76: {
        let limit = pushTemporaryLength(bb);
        message.bizRelation = _decodeUser_BizRelation(bb);
        bb.limit = limit;
        break;
      }
      // optional MemberEntranceInfo memberEntranceInfo = 77;
      case 77: {
        let limit = pushTemporaryLength(bb);
        message.memberEntranceInfo = _decodeMemberEntranceInfo(bb);
        bb.limit = limit;
        break;
      }
      // optional User_PublicAreaBadgeInfo publicAreaBadgeInfo = 78;
      case 78: {
        let limit = pushTemporaryLength(bb);
        message.publicAreaBadgeInfo = _decodeUser_PublicAreaBadgeInfo(bb);
        bb.limit = limit;
        break;
      }
      // optional User_ExtraInfo extraInfo = 79;
      case 79: {
        let limit = pushTemporaryLength(bb);
        message.extraInfo = _decodeUser_ExtraInfo(bb);
        bb.limit = limit;
        break;
      }
      // optional User_UserSettingInfo userSettingInfo = 80;
      case 80: {
        let limit = pushTemporaryLength(bb);
        message.userSettingInfo = _decodeUser_UserSettingInfo(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 publicAreaOperFreq = 81;
      case 81: {
        message.publicAreaOperFreq = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional User_UserPermissionGrant userPermissionGrantInfo = 82;
      case 82: {
        let limit = pushTemporaryLength(bb);
        message.userPermissionGrantInfo = _decodeUser_UserPermissionGrant(bb);
        bb.limit = limit;
        break;
      }
      // optional bool userCanceled = 83;
      case 83: {
        message.userCanceled = !!readByte(bb);
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeUser_UserAttr(message, bb) {
  let $isMuted = message.isMuted;
  if ($isMuted !== void 0) {
    writeVarint32(bb, 8);
    writeByte(bb, $isMuted ? 1 : 0);
  }
  let $isAdmin = message.isAdmin;
  if ($isAdmin !== void 0) {
    writeVarint32(bb, 16);
    writeByte(bb, $isAdmin ? 1 : 0);
  }
  let $isSuperAdmin = message.isSuperAdmin;
  if ($isSuperAdmin !== void 0) {
    writeVarint32(bb, 24);
    writeByte(bb, $isSuperAdmin ? 1 : 0);
  }
  let array$adminPrivileges = message.adminPrivileges;
  if (array$adminPrivileges !== void 0) {
    let packed = popByteBuffer();
    for (let value of array$adminPrivileges) {
      writeVarint64(packed, intToLong(value));
    }
    writeVarint32(bb, 34);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }
}
function _decodeUser_UserAttr(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional bool isMuted = 1;
      case 1: {
        message.isMuted = !!readByte(bb);
        break;
      }
      // optional bool isAdmin = 2;
      case 2: {
        message.isAdmin = !!readByte(bb);
        break;
      }
      // optional bool isSuperAdmin = 3;
      case 3: {
        message.isSuperAdmin = !!readByte(bb);
        break;
      }
      // repeated int32 adminPrivileges = 4;
      case 4: {
        let values = message.adminPrivileges || (message.adminPrivileges = []);
        if ((tag & 7) === 2) {
          let outerLimit = pushTemporaryLength(bb);
          while (!isAtEnd(bb)) {
            values.push(readVarint32(bb));
          }
          bb.limit = outerLimit;
        } else {
          values.push(readVarint32(bb));
        }
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeUser_OwnRoom(message, bb) {
  let array$roomIds = message.roomIds;
  if (array$roomIds !== void 0) {
    let packed = popByteBuffer();
    for (let value of array$roomIds) {
      writeVarint64(packed, value);
    }
    writeVarint32(bb, 10);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }
  let array$roomIdsStr = message.roomIdsStr;
  if (array$roomIdsStr !== void 0) {
    for (let value of array$roomIdsStr) {
      writeVarint32(bb, 18);
      writeString(bb, value);
    }
  }
  let array$roomIdsDisplay = message.roomIdsDisplay;
  if (array$roomIdsDisplay !== void 0) {
    let packed = popByteBuffer();
    for (let value of array$roomIdsDisplay) {
      writeVarint64(packed, intToLong(value));
    }
    writeVarint32(bb, 26);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }
}
function _decodeUser_OwnRoom(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // repeated int64 roomIds = 1;
      case 1: {
        let values = message.roomIds || (message.roomIds = []);
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
      // repeated string roomIdsStr = 2;
      case 2: {
        let values = message.roomIdsStr || (message.roomIdsStr = []);
        values.push(readString(bb, readVarint32(bb)));
        break;
      }
      // repeated int32 roomIdsDisplay = 3;
      case 3: {
        let values = message.roomIdsDisplay || (message.roomIdsDisplay = []);
        if ((tag & 7) === 2) {
          let outerLimit = pushTemporaryLength(bb);
          while (!isAtEnd(bb)) {
            values.push(readVarint32(bb));
          }
          bb.limit = outerLimit;
        } else {
          values.push(readVarint32(bb));
        }
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeUser_AnchorInfo(message, bb) {
  let $level = message.level;
  if ($level !== void 0) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $level);
  }
}
function _decodeUser_AnchorInfo(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional int64 level = 1;
      case 1: {
        message.level = readVarint64(
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
function _encodeUser_FollowInfo(message, bb) {
  let $followingCount = message.followingCount;
  if ($followingCount !== void 0) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $followingCount);
  }
  let $followerCount = message.followerCount;
  if ($followerCount !== void 0) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $followerCount);
  }
  let $followStatus = message.followStatus;
  if ($followStatus !== void 0) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $followStatus);
  }
  let $pushStatus = message.pushStatus;
  if ($pushStatus !== void 0) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $pushStatus);
  }
  let $remarkName = message.remarkName;
  if ($remarkName !== void 0) {
    writeVarint32(bb, 42);
    writeString(bb, $remarkName);
  }
}
function _decodeUser_FollowInfo(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional int64 followingCount = 1;
      case 1: {
        message.followingCount = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 followerCount = 2;
      case 2: {
        message.followerCount = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 followStatus = 3;
      case 3: {
        message.followStatus = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 pushStatus = 4;
      case 4: {
        message.pushStatus = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional string remarkName = 5;
      case 5: {
        message.remarkName = readString(bb, readVarint32(bb));
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeUser_FansClub(message, bb) {
  let $data = message.data;
  if ($data !== void 0) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeUser_FansClub_FansClubData($data, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let map$preferData = message.preferData;
  if (map$preferData !== void 0) {
    for (let key in map$preferData) {
      let nested = popByteBuffer();
      let value = map$preferData[key];
      writeVarint32(nested, 8);
      writeVarint64(nested, intToLong(+key));
      writeVarint32(nested, 18);
      let nestedValue = popByteBuffer();
      _encodeUser_FansClub_FansClubData(value, nestedValue);
      writeVarint32(nested, nestedValue.limit);
      writeByteBuffer(nested, nestedValue);
      pushByteBuffer(nestedValue);
      writeVarint32(bb, 18);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}
function _decodeUser_FansClub(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional User_FansClub_FansClubData data = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.data = _decodeUser_FansClub_FansClubData(bb);
        bb.limit = limit;
        break;
      }
      // optional map<int32, User_FansClub_FansClubData> preferData = 2;
      case 2: {
        let values = message.preferData || (message.preferData = {});
        let outerLimit = pushTemporaryLength(bb);
        let key;
        let value;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag2 = readVarint32(bb);
          switch (tag2 >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readVarint32(bb);
              break;
            }
            case 2: {
              let valueLimit = pushTemporaryLength(bb);
              value = _decodeUser_FansClub_FansClubData(bb);
              bb.limit = valueLimit;
              break;
            }
            default:
              skipUnknownField(bb, tag2 & 7);
          }
        }
        if (key === void 0 || value === void 0) throw new Error("Invalid data for map: preferData");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeUser_FansClub_FansClubData(message, bb) {
  let $clubName = message.clubName;
  if ($clubName !== void 0) {
    writeVarint32(bb, 10);
    writeString(bb, $clubName);
  }
  let $level = message.level;
  if ($level !== void 0) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($level));
  }
  let $userFansClubStatus = message.userFansClubStatus;
  if ($userFansClubStatus !== void 0) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($userFansClubStatus));
  }
  let $badge = message.badge;
  if ($badge !== void 0) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeUser_FansClub_FansClubData_UserBadge($badge, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let array$availableGiftIds = message.availableGiftIds;
  if (array$availableGiftIds !== void 0) {
    let packed = popByteBuffer();
    for (let value of array$availableGiftIds) {
      writeVarint64(packed, value);
    }
    writeVarint32(bb, 42);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }
  let $anchorId = message.anchorId;
  if ($anchorId !== void 0) {
    writeVarint32(bb, 48);
    writeVarint64(bb, $anchorId);
  }
}
function _decodeUser_FansClub_FansClubData(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional string clubName = 1;
      case 1: {
        message.clubName = readString(bb, readVarint32(bb));
        break;
      }
      // optional int32 level = 2;
      case 2: {
        message.level = readVarint32(bb);
        break;
      }
      // optional int32 userFansClubStatus = 3;
      case 3: {
        message.userFansClubStatus = readVarint32(bb);
        break;
      }
      // optional User_FansClub_FansClubData_UserBadge badge = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.badge = _decodeUser_FansClub_FansClubData_UserBadge(bb);
        bb.limit = limit;
        break;
      }
      // repeated int64 availableGiftIds = 5;
      case 5: {
        let values = message.availableGiftIds || (message.availableGiftIds = []);
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
      // optional int64 anchorId = 6;
      case 6: {
        message.anchorId = readVarint64(
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
function _encodeUser_FansClub_FansClubData_UserBadge(message, bb) {
  let map$icons = message.icons;
  if (map$icons !== void 0) {
    for (let key in map$icons) {
      let nested = popByteBuffer();
      let value = map$icons[key];
      writeVarint32(nested, 8);
      writeVarint64(nested, intToLong(+key));
      writeVarint32(nested, 18);
      let nestedValue = popByteBuffer();
      _encodeImage(value, nestedValue);
      writeVarint32(nested, nestedValue.limit);
      writeByteBuffer(nested, nestedValue);
      pushByteBuffer(nestedValue);
      writeVarint32(bb, 10);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
  let $title = message.title;
  if ($title !== void 0) {
    writeVarint32(bb, 18);
    writeString(bb, $title);
  }
}
function _decodeUser_FansClub_FansClubData_UserBadge(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional map<int32, Image> icons = 1;
      case 1: {
        let values = message.icons || (message.icons = {});
        let outerLimit = pushTemporaryLength(bb);
        let key;
        let value;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag2 = readVarint32(bb);
          switch (tag2 >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readVarint32(bb);
              break;
            }
            case 2: {
              let valueLimit = pushTemporaryLength(bb);
              value = _decodeImage(bb);
              bb.limit = valueLimit;
              break;
            }
            default:
              skipUnknownField(bb, tag2 & 7);
          }
        }
        if (key === void 0 || value === void 0) throw new Error("Invalid data for map: icons");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }
      // optional string title = 2;
      case 2: {
        message.title = readString(bb, readVarint32(bb));
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeUser_Border(message, bb) {
  let $icon = message.icon;
  if ($icon !== void 0) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeImage($icon, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $level = message.level;
  if ($level !== void 0) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $level);
  }
  let $thumbIcon = message.thumbIcon;
  if ($thumbIcon !== void 0) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeImage($thumbIcon, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $dressId = message.dressId;
  if ($dressId !== void 0) {
    writeVarint32(bb, 34);
    writeString(bb, $dressId);
  }
}
function _decodeUser_Border(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional Image icon = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.icon = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 level = 2;
      case 2: {
        message.level = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional Image thumbIcon = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.thumbIcon = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional string dressId = 4;
      case 4: {
        message.dressId = readString(bb, readVarint32(bb));
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeUser_GradeBuffInfo(message, bb) {
  let $buffLevel = message.buffLevel;
  if ($buffLevel !== void 0) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $buffLevel);
  }
  let $status = message.status;
  if ($status !== void 0) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($status));
  }
  let $endTime = message.endTime;
  if ($endTime !== void 0) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $endTime);
  }
  let map$statsInfo = message.statsInfo;
  if (map$statsInfo !== void 0) {
    for (let key in map$statsInfo) {
      let nested = popByteBuffer();
      let value = map$statsInfo[key];
      writeVarint32(nested, 8);
      writeVarint64(nested, stringToLong(key));
      writeVarint32(nested, 16);
      writeVarint64(nested, value);
      writeVarint32(bb, 34);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
  let $buffBadge = message.buffBadge;
  if ($buffBadge !== void 0) {
    writeVarint32(bb, 42);
    let nested = popByteBuffer();
    _encodeImage($buffBadge, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}
function _decodeUser_GradeBuffInfo(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional int64 buffLevel = 1;
      case 1: {
        message.buffLevel = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int32 status = 2;
      case 2: {
        message.status = readVarint32(bb);
        break;
      }
      // optional int64 endTime = 3;
      case 3: {
        message.endTime = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional map<int64, int64> statsInfo = 4;
      case 4: {
        let values = message.statsInfo || (message.statsInfo = {});
        let outerLimit = pushTemporaryLength(bb);
        let key;
        let value;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag2 = readVarint32(bb);
          switch (tag2 >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readVarint64(
                bb,
                /* unsigned */
                false
              );
              break;
            }
            case 2: {
              value = readVarint64(
                bb,
                /* unsigned */
                false
              );
              break;
            }
            default:
              skipUnknownField(bb, tag2 & 7);
          }
        }
        if (key === void 0 || value === void 0) throw new Error("Invalid data for map: statsInfo");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }
      // optional Image buffBadge = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        message.buffBadge = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeUser_PayGrade(message, bb) {
  let $totalDiamondCount = message.totalDiamondCount;
  if ($totalDiamondCount !== void 0) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $totalDiamondCount);
  }
  let $diamondIcon = message.diamondIcon;
  if ($diamondIcon !== void 0) {
    writeVarint32(bb, 18);
    let nested = popByteBuffer();
    _encodeImage($diamondIcon, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $name = message.name;
  if ($name !== void 0) {
    writeVarint32(bb, 26);
    writeString(bb, $name);
  }
  let $icon = message.icon;
  if ($icon !== void 0) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeImage($icon, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $nextName = message.nextName;
  if ($nextName !== void 0) {
    writeVarint32(bb, 42);
    writeString(bb, $nextName);
  }
  let $level = message.level;
  if ($level !== void 0) {
    writeVarint32(bb, 48);
    writeVarint64(bb, $level);
  }
  let $nextIcon = message.nextIcon;
  if ($nextIcon !== void 0) {
    writeVarint32(bb, 58);
    let nested = popByteBuffer();
    _encodeImage($nextIcon, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $nextDiamond = message.nextDiamond;
  if ($nextDiamond !== void 0) {
    writeVarint32(bb, 64);
    writeVarint64(bb, $nextDiamond);
  }
  let $nowDiamond = message.nowDiamond;
  if ($nowDiamond !== void 0) {
    writeVarint32(bb, 72);
    writeVarint64(bb, $nowDiamond);
  }
  let $thisGradeMinDiamond = message.thisGradeMinDiamond;
  if ($thisGradeMinDiamond !== void 0) {
    writeVarint32(bb, 80);
    writeVarint64(bb, $thisGradeMinDiamond);
  }
  let $thisGradeMaxDiamond = message.thisGradeMaxDiamond;
  if ($thisGradeMaxDiamond !== void 0) {
    writeVarint32(bb, 88);
    writeVarint64(bb, $thisGradeMaxDiamond);
  }
  let $payDiamondBak = message.payDiamondBak;
  if ($payDiamondBak !== void 0) {
    writeVarint32(bb, 96);
    writeVarint64(bb, $payDiamondBak);
  }
  let $gradeDescribe = message.gradeDescribe;
  if ($gradeDescribe !== void 0) {
    writeVarint32(bb, 106);
    writeString(bb, $gradeDescribe);
  }
  let array$gradeIconList = message.gradeIconList;
  if (array$gradeIconList !== void 0) {
    for (let value of array$gradeIconList) {
      writeVarint32(bb, 114);
      let nested = popByteBuffer();
      _encodeUser_PayGrade_GradeIcon(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
  let $screenChatType = message.screenChatType;
  if ($screenChatType !== void 0) {
    writeVarint32(bb, 120);
    writeVarint64(bb, $screenChatType);
  }
  let $imIcon = message.imIcon;
  if ($imIcon !== void 0) {
    writeVarint32(bb, 130);
    let nested = popByteBuffer();
    _encodeImage($imIcon, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $imIconWithLevel = message.imIconWithLevel;
  if ($imIconWithLevel !== void 0) {
    writeVarint32(bb, 138);
    let nested = popByteBuffer();
    _encodeImage($imIconWithLevel, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $liveIcon = message.liveIcon;
  if ($liveIcon !== void 0) {
    writeVarint32(bb, 146);
    let nested = popByteBuffer();
    _encodeImage($liveIcon, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $newImIconWithLevel = message.newImIconWithLevel;
  if ($newImIconWithLevel !== void 0) {
    writeVarint32(bb, 154);
    let nested = popByteBuffer();
    _encodeImage($newImIconWithLevel, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $newLiveIcon = message.newLiveIcon;
  if ($newLiveIcon !== void 0) {
    writeVarint32(bb, 162);
    let nested = popByteBuffer();
    _encodeImage($newLiveIcon, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $upgradeNeedConsume = message.upgradeNeedConsume;
  if ($upgradeNeedConsume !== void 0) {
    writeVarint32(bb, 168);
    writeVarint64(bb, $upgradeNeedConsume);
  }
  let $nextPrivileges = message.nextPrivileges;
  if ($nextPrivileges !== void 0) {
    writeVarint32(bb, 178);
    writeString(bb, $nextPrivileges);
  }
  let $background = message.background;
  if ($background !== void 0) {
    writeVarint32(bb, 186);
    let nested = popByteBuffer();
    _encodeImage($background, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $backgroundBack = message.backgroundBack;
  if ($backgroundBack !== void 0) {
    writeVarint32(bb, 194);
    let nested = popByteBuffer();
    _encodeImage($backgroundBack, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $score = message.score;
  if ($score !== void 0) {
    writeVarint32(bb, 200);
    writeVarint64(bb, $score);
  }
  let $buffInfo = message.buffInfo;
  if ($buffInfo !== void 0) {
    writeVarint32(bb, 210);
    let nested = popByteBuffer();
    _encodeUser_GradeBuffInfo($buffInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $gradeBanner = message.gradeBanner;
  if ($gradeBanner !== void 0) {
    writeVarint32(bb, 8010);
    writeString(bb, $gradeBanner);
  }
  let $profileDialogBg = message.profileDialogBg;
  if ($profileDialogBg !== void 0) {
    writeVarint32(bb, 8018);
    let nested = popByteBuffer();
    _encodeImage($profileDialogBg, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $profileDialogBgBack = message.profileDialogBgBack;
  if ($profileDialogBgBack !== void 0) {
    writeVarint32(bb, 8026);
    let nested = popByteBuffer();
    _encodeImage($profileDialogBgBack, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}
function _decodeUser_PayGrade(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional int64 totalDiamondCount = 1;
      case 1: {
        message.totalDiamondCount = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional Image diamondIcon = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        message.diamondIcon = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional string name = 3;
      case 3: {
        message.name = readString(bb, readVarint32(bb));
        break;
      }
      // optional Image icon = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.icon = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional string nextName = 5;
      case 5: {
        message.nextName = readString(bb, readVarint32(bb));
        break;
      }
      // optional int64 level = 6;
      case 6: {
        message.level = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional Image nextIcon = 7;
      case 7: {
        let limit = pushTemporaryLength(bb);
        message.nextIcon = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 nextDiamond = 8;
      case 8: {
        message.nextDiamond = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 nowDiamond = 9;
      case 9: {
        message.nowDiamond = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 thisGradeMinDiamond = 10;
      case 10: {
        message.thisGradeMinDiamond = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 thisGradeMaxDiamond = 11;
      case 11: {
        message.thisGradeMaxDiamond = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 payDiamondBak = 12;
      case 12: {
        message.payDiamondBak = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional string gradeDescribe = 13;
      case 13: {
        message.gradeDescribe = readString(bb, readVarint32(bb));
        break;
      }
      // repeated User_PayGrade_GradeIcon gradeIconList = 14;
      case 14: {
        let limit = pushTemporaryLength(bb);
        let values = message.gradeIconList || (message.gradeIconList = []);
        values.push(_decodeUser_PayGrade_GradeIcon(bb));
        bb.limit = limit;
        break;
      }
      // optional int64 screenChatType = 15;
      case 15: {
        message.screenChatType = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional Image imIcon = 16;
      case 16: {
        let limit = pushTemporaryLength(bb);
        message.imIcon = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional Image imIconWithLevel = 17;
      case 17: {
        let limit = pushTemporaryLength(bb);
        message.imIconWithLevel = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional Image liveIcon = 18;
      case 18: {
        let limit = pushTemporaryLength(bb);
        message.liveIcon = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional Image newImIconWithLevel = 19;
      case 19: {
        let limit = pushTemporaryLength(bb);
        message.newImIconWithLevel = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional Image newLiveIcon = 20;
      case 20: {
        let limit = pushTemporaryLength(bb);
        message.newLiveIcon = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 upgradeNeedConsume = 21;
      case 21: {
        message.upgradeNeedConsume = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional string nextPrivileges = 22;
      case 22: {
        message.nextPrivileges = readString(bb, readVarint32(bb));
        break;
      }
      // optional Image background = 23;
      case 23: {
        let limit = pushTemporaryLength(bb);
        message.background = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional Image backgroundBack = 24;
      case 24: {
        let limit = pushTemporaryLength(bb);
        message.backgroundBack = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 score = 25;
      case 25: {
        message.score = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional User_GradeBuffInfo buffInfo = 26;
      case 26: {
        let limit = pushTemporaryLength(bb);
        message.buffInfo = _decodeUser_GradeBuffInfo(bb);
        bb.limit = limit;
        break;
      }
      // optional string gradeBanner = 1001;
      case 1001: {
        message.gradeBanner = readString(bb, readVarint32(bb));
        break;
      }
      // optional Image profileDialogBg = 1002;
      case 1002: {
        let limit = pushTemporaryLength(bb);
        message.profileDialogBg = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional Image profileDialogBgBack = 1003;
      case 1003: {
        let limit = pushTemporaryLength(bb);
        message.profileDialogBgBack = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeUser_PayGrade_GradeIcon(message, bb) {
  let $icon = message.icon;
  if ($icon !== void 0) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeImage($icon, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $iconDiamond = message.iconDiamond;
  if ($iconDiamond !== void 0) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $iconDiamond);
  }
  let $level = message.level;
  if ($level !== void 0) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $level);
  }
  let $levelStr = message.levelStr;
  if ($levelStr !== void 0) {
    writeVarint32(bb, 34);
    writeString(bb, $levelStr);
  }
}
function _decodeUser_PayGrade_GradeIcon(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional Image icon = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.icon = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 iconDiamond = 2;
      case 2: {
        message.iconDiamond = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 level = 3;
      case 3: {
        message.level = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional string levelStr = 4;
      case 4: {
        message.levelStr = readString(bb, readVarint32(bb));
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeUser_AnchorLevel(message, bb) {
  let $level = message.level;
  if ($level !== void 0) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $level);
  }
  let $experience = message.experience;
  if ($experience !== void 0) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $experience);
  }
  let $lowestExperienceThisLevel = message.lowestExperienceThisLevel;
  if ($lowestExperienceThisLevel !== void 0) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $lowestExperienceThisLevel);
  }
  let $highestExperienceThisLevel = message.highestExperienceThisLevel;
  if ($highestExperienceThisLevel !== void 0) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $highestExperienceThisLevel);
  }
  let $taskStartExperience = message.taskStartExperience;
  if ($taskStartExperience !== void 0) {
    writeVarint32(bb, 40);
    writeVarint64(bb, $taskStartExperience);
  }
  let $taskStartTime = message.taskStartTime;
  if ($taskStartTime !== void 0) {
    writeVarint32(bb, 48);
    writeVarint64(bb, $taskStartTime);
  }
  let $taskDecreaseExperience = message.taskDecreaseExperience;
  if ($taskDecreaseExperience !== void 0) {
    writeVarint32(bb, 56);
    writeVarint64(bb, $taskDecreaseExperience);
  }
  let $taskTargetExperience = message.taskTargetExperience;
  if ($taskTargetExperience !== void 0) {
    writeVarint32(bb, 64);
    writeVarint64(bb, $taskTargetExperience);
  }
  let $taskEndTime = message.taskEndTime;
  if ($taskEndTime !== void 0) {
    writeVarint32(bb, 72);
    writeVarint64(bb, $taskEndTime);
  }
  let $profileDialogBg = message.profileDialogBg;
  if ($profileDialogBg !== void 0) {
    writeVarint32(bb, 82);
    let nested = popByteBuffer();
    _encodeImage($profileDialogBg, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $profileDialogBgBack = message.profileDialogBgBack;
  if ($profileDialogBgBack !== void 0) {
    writeVarint32(bb, 90);
    let nested = popByteBuffer();
    _encodeImage($profileDialogBgBack, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $stageLevel = message.stageLevel;
  if ($stageLevel !== void 0) {
    writeVarint32(bb, 98);
    let nested = popByteBuffer();
    _encodeImage($stageLevel, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $smallIcon = message.smallIcon;
  if ($smallIcon !== void 0) {
    writeVarint32(bb, 106);
    let nested = popByteBuffer();
    _encodeImage($smallIcon, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}
function _decodeUser_AnchorLevel(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional int64 level = 1;
      case 1: {
        message.level = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 experience = 2;
      case 2: {
        message.experience = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 lowestExperienceThisLevel = 3;
      case 3: {
        message.lowestExperienceThisLevel = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 highestExperienceThisLevel = 4;
      case 4: {
        message.highestExperienceThisLevel = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 taskStartExperience = 5;
      case 5: {
        message.taskStartExperience = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 taskStartTime = 6;
      case 6: {
        message.taskStartTime = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 taskDecreaseExperience = 7;
      case 7: {
        message.taskDecreaseExperience = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 taskTargetExperience = 8;
      case 8: {
        message.taskTargetExperience = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 taskEndTime = 9;
      case 9: {
        message.taskEndTime = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional Image profileDialogBg = 10;
      case 10: {
        let limit = pushTemporaryLength(bb);
        message.profileDialogBg = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional Image profileDialogBgBack = 11;
      case 11: {
        let limit = pushTemporaryLength(bb);
        message.profileDialogBgBack = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional Image stageLevel = 12;
      case 12: {
        let limit = pushTemporaryLength(bb);
        message.stageLevel = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional Image smallIcon = 13;
      case 13: {
        let limit = pushTemporaryLength(bb);
        message.smallIcon = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeUser_AuthorStats(message, bb) {
  let $videoTotalCount = message.videoTotalCount;
  if ($videoTotalCount !== void 0) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $videoTotalCount);
  }
  let $videoTotalPlayCount = message.videoTotalPlayCount;
  if ($videoTotalPlayCount !== void 0) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $videoTotalPlayCount);
  }
  let $videoTotalShareCount = message.videoTotalShareCount;
  if ($videoTotalShareCount !== void 0) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $videoTotalShareCount);
  }
  let $videoTotalSeriesCount = message.videoTotalSeriesCount;
  if ($videoTotalSeriesCount !== void 0) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $videoTotalSeriesCount);
  }
  let $varietyShowPlayCount = message.varietyShowPlayCount;
  if ($varietyShowPlayCount !== void 0) {
    writeVarint32(bb, 40);
    writeVarint64(bb, $varietyShowPlayCount);
  }
  let $videoTotalFavoriteCount = message.videoTotalFavoriteCount;
  if ($videoTotalFavoriteCount !== void 0) {
    writeVarint32(bb, 48);
    writeVarint64(bb, $videoTotalFavoriteCount);
  }
}
function _decodeUser_AuthorStats(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional int64 videoTotalCount = 1;
      case 1: {
        message.videoTotalCount = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 videoTotalPlayCount = 2;
      case 2: {
        message.videoTotalPlayCount = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 videoTotalShareCount = 3;
      case 3: {
        message.videoTotalShareCount = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 videoTotalSeriesCount = 4;
      case 4: {
        message.videoTotalSeriesCount = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 varietyShowPlayCount = 5;
      case 5: {
        message.varietyShowPlayCount = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 videoTotalFavoriteCount = 6;
      case 6: {
        message.videoTotalFavoriteCount = readVarint64(
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
function _decodeUser_XiguaParams(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _decodeUser_ActivityInfo(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeUser_NobleLevelInfo(message, bb) {
  let $nobleBackground = message.nobleBackground;
  if ($nobleBackground !== void 0) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeImage($nobleBackground, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $nobleLevel = message.nobleLevel;
  if ($nobleLevel !== void 0) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $nobleLevel);
  }
  let $nobleIcon = message.nobleIcon;
  if ($nobleIcon !== void 0) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeImage($nobleIcon, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $nobleName = message.nobleName;
  if ($nobleName !== void 0) {
    writeVarint32(bb, 34);
    writeString(bb, $nobleName);
  }
  let $expireTime = message.expireTime;
  if ($expireTime !== void 0) {
    writeVarint32(bb, 40);
    writeVarint64(bb, $expireTime);
  }
  let $nobleBigIcon = message.nobleBigIcon;
  if ($nobleBigIcon !== void 0) {
    writeVarint32(bb, 50);
    let nested = popByteBuffer();
    _encodeImage($nobleBigIcon, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $nobleIconWithBack = message.nobleIconWithBack;
  if ($nobleIconWithBack !== void 0) {
    writeVarint32(bb, 58);
    let nested = popByteBuffer();
    _encodeImage($nobleIconWithBack, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $nobleBoarder = message.nobleBoarder;
  if ($nobleBoarder !== void 0) {
    writeVarint32(bb, 66);
    let nested = popByteBuffer();
    _encodeImage($nobleBoarder, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $nobleBackgroundColor = message.nobleBackgroundColor;
  if ($nobleBackgroundColor !== void 0) {
    writeVarint32(bb, 74);
    writeString(bb, $nobleBackgroundColor);
  }
}
function _decodeUser_NobleLevelInfo(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional Image nobleBackground = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.nobleBackground = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 nobleLevel = 2;
      case 2: {
        message.nobleLevel = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional Image nobleIcon = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.nobleIcon = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional string nobleName = 4;
      case 4: {
        message.nobleName = readString(bb, readVarint32(bb));
        break;
      }
      // optional int64 expireTime = 5;
      case 5: {
        message.expireTime = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional Image nobleBigIcon = 6;
      case 6: {
        let limit = pushTemporaryLength(bb);
        message.nobleBigIcon = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional Image nobleIconWithBack = 7;
      case 7: {
        let limit = pushTemporaryLength(bb);
        message.nobleIconWithBack = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional Image nobleBoarder = 8;
      case 8: {
        let limit = pushTemporaryLength(bb);
        message.nobleBoarder = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional string nobleBackgroundColor = 9;
      case 9: {
        message.nobleBackgroundColor = readString(bb, readVarint32(bb));
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _decodeUser_BrotherhoodInfo(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _decodeUser_AuthenticationInfo(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _decodeUser_PoiInfo(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _decodeUser_FansGroupInfo(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _decodeUser_JAccreditInfo(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _decodeUser_Subscribe(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _decodeUser_ProfileStyleParams(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _decodeUser_UserDressInfo(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _decodeUser_BizRelation(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _decodeUser_PublicAreaBadgeInfo(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _decodeUser_ExtraInfo(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _decodeUser_UserSettingInfo(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _decodeUser_UserPermissionGrant(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeTextFormat(message, bb) {
  let $color = message.color;
  if ($color !== void 0) {
    writeVarint32(bb, 10);
    writeString(bb, $color);
  }
  let $bold = message.bold;
  if ($bold !== void 0) {
    writeVarint32(bb, 16);
    writeByte(bb, $bold ? 1 : 0);
  }
  let $italic = message.italic;
  if ($italic !== void 0) {
    writeVarint32(bb, 24);
    writeByte(bb, $italic ? 1 : 0);
  }
  let $weight = message.weight;
  if ($weight !== void 0) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($weight));
  }
  let $italicAngle = message.italicAngle;
  if ($italicAngle !== void 0) {
    writeVarint32(bb, 40);
    writeVarint64(bb, intToLong($italicAngle));
  }
  let $fontSize = message.fontSize;
  if ($fontSize !== void 0) {
    writeVarint32(bb, 48);
    writeVarint64(bb, intToLong($fontSize));
  }
  let $userHeightLightColor = message.userHeightLightColor;
  if ($userHeightLightColor !== void 0) {
    writeVarint32(bb, 56);
    writeByte(bb, $userHeightLightColor ? 1 : 0);
  }
  let $useRemoteClor = message.useRemoteClor;
  if ($useRemoteClor !== void 0) {
    writeVarint32(bb, 64);
    writeByte(bb, $useRemoteClor ? 1 : 0);
  }
}
function _decodeTextFormat(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional string color = 1;
      case 1: {
        message.color = readString(bb, readVarint32(bb));
        break;
      }
      // optional bool bold = 2;
      case 2: {
        message.bold = !!readByte(bb);
        break;
      }
      // optional bool italic = 3;
      case 3: {
        message.italic = !!readByte(bb);
        break;
      }
      // optional int32 weight = 4;
      case 4: {
        message.weight = readVarint32(bb);
        break;
      }
      // optional int32 italicAngle = 5;
      case 5: {
        message.italicAngle = readVarint32(bb);
        break;
      }
      // optional int32 fontSize = 6;
      case 6: {
        message.fontSize = readVarint32(bb);
        break;
      }
      // optional bool userHeightLightColor = 7;
      case 7: {
        message.userHeightLightColor = !!readByte(bb);
        break;
      }
      // optional bool useRemoteClor = 8;
      case 8: {
        message.useRemoteClor = !!readByte(bb);
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeTextPiece(message, bb) {
  let $type = message.type;
  if ($type !== void 0) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($type));
  }
  let $format = message.format;
  if ($format !== void 0) {
    writeVarint32(bb, 18);
    let nested = popByteBuffer();
    _encodeTextFormat($format, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $valueRef = message.valueRef;
  if ($valueRef !== void 0) {
    writeVarint32(bb, 26);
    writeString(bb, $valueRef);
  }
  let $stringValue = message.stringValue;
  if ($stringValue !== void 0) {
    writeVarint32(bb, 90);
    writeString(bb, $stringValue);
  }
  let $userValue = message.userValue;
  if ($userValue !== void 0) {
    writeVarint32(bb, 170);
    let nested = popByteBuffer();
    _encodeTextPieceUser($userValue, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $giftValue = message.giftValue;
  if ($giftValue !== void 0) {
    writeVarint32(bb, 178);
    let nested = popByteBuffer();
    _encodeTextPieceGift($giftValue, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $heartValue = message.heartValue;
  if ($heartValue !== void 0) {
    writeVarint32(bb, 186);
    let nested = popByteBuffer();
    _encodeTextPieceHeart($heartValue, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $patternRefValue = message.patternRefValue;
  if ($patternRefValue !== void 0) {
    writeVarint32(bb, 194);
    let nested = popByteBuffer();
    _encodeTextPiecePatternRef($patternRefValue, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $imageValue = message.imageValue;
  if ($imageValue !== void 0) {
    writeVarint32(bb, 202);
    let nested = popByteBuffer();
    _encodeTextPieceImage($imageValue, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $schemaKey = message.schemaKey;
  if ($schemaKey !== void 0) {
    writeVarint32(bb, 802);
    writeString(bb, $schemaKey);
  }
}
function _decodeTextPiece(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional int32 type = 1;
      case 1: {
        message.type = readVarint32(bb);
        break;
      }
      // optional TextFormat format = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        message.format = _decodeTextFormat(bb);
        bb.limit = limit;
        break;
      }
      // optional string valueRef = 3;
      case 3: {
        message.valueRef = readString(bb, readVarint32(bb));
        break;
      }
      // optional string stringValue = 11;
      case 11: {
        message.stringValue = readString(bb, readVarint32(bb));
        break;
      }
      // optional TextPieceUser userValue = 21;
      case 21: {
        let limit = pushTemporaryLength(bb);
        message.userValue = _decodeTextPieceUser(bb);
        bb.limit = limit;
        break;
      }
      // optional TextPieceGift giftValue = 22;
      case 22: {
        let limit = pushTemporaryLength(bb);
        message.giftValue = _decodeTextPieceGift(bb);
        bb.limit = limit;
        break;
      }
      // optional TextPieceHeart heartValue = 23;
      case 23: {
        let limit = pushTemporaryLength(bb);
        message.heartValue = _decodeTextPieceHeart(bb);
        bb.limit = limit;
        break;
      }
      // optional TextPiecePatternRef patternRefValue = 24;
      case 24: {
        let limit = pushTemporaryLength(bb);
        message.patternRefValue = _decodeTextPiecePatternRef(bb);
        bb.limit = limit;
        break;
      }
      // optional TextPieceImage imageValue = 25;
      case 25: {
        let limit = pushTemporaryLength(bb);
        message.imageValue = _decodeTextPieceImage(bb);
        bb.limit = limit;
        break;
      }
      // optional string schemaKey = 100;
      case 100: {
        message.schemaKey = readString(bb, readVarint32(bb));
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeTextPieceGift(message, bb) {
  let $giftId = message.giftId;
  if ($giftId !== void 0) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $giftId);
  }
  let $nameRef = message.nameRef;
  if ($nameRef !== void 0) {
    writeVarint32(bb, 18);
    let nested = popByteBuffer();
    _encodePatternRef($nameRef, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}
function _decodeTextPieceGift(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional int64 giftId = 1;
      case 1: {
        message.giftId = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional PatternRef nameRef = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        message.nameRef = _decodePatternRef(bb);
        bb.limit = limit;
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeTextPieceHeart(message, bb) {
  let $color = message.color;
  if ($color !== void 0) {
    writeVarint32(bb, 10);
    writeString(bb, $color);
  }
}
function _decodeTextPieceHeart(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional string color = 1;
      case 1: {
        message.color = readString(bb, readVarint32(bb));
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeTextPiecePatternRef(message, bb) {
  let $key = message.key;
  if ($key !== void 0) {
    writeVarint32(bb, 10);
    writeString(bb, $key);
  }
  let $defaultPattern = message.defaultPattern;
  if ($defaultPattern !== void 0) {
    writeVarint32(bb, 18);
    writeString(bb, $defaultPattern);
  }
}
function _decodeTextPiecePatternRef(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional string key = 1;
      case 1: {
        message.key = readString(bb, readVarint32(bb));
        break;
      }
      // optional string defaultPattern = 2;
      case 2: {
        message.defaultPattern = readString(bb, readVarint32(bb));
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeTextPieceImage(message, bb) {
  let $image = message.image;
  if ($image !== void 0) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeImage($image, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $scalingRate = message.scalingRate;
  if ($scalingRate !== void 0) {
    writeVarint32(bb, 21);
    writeFloat(bb, $scalingRate);
  }
}
function _decodeTextPieceImage(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional Image image = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.image = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional float scalingRate = 2;
      case 2: {
        message.scalingRate = readFloat(bb);
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodePatternRef(message, bb) {
  let $key = message.key;
  if ($key !== void 0) {
    writeVarint32(bb, 10);
    writeString(bb, $key);
  }
  let $defaultPattern = message.defaultPattern;
  if ($defaultPattern !== void 0) {
    writeVarint32(bb, 18);
    writeString(bb, $defaultPattern);
  }
}
function _decodePatternRef(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional string key = 1;
      case 1: {
        message.key = readString(bb, readVarint32(bb));
        break;
      }
      // optional string defaultPattern = 2;
      case 2: {
        message.defaultPattern = readString(bb, readVarint32(bb));
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeImage(message, bb) {
  let array$urlList = message.urlList;
  if (array$urlList !== void 0) {
    for (let value of array$urlList) {
      writeVarint32(bb, 10);
      writeString(bb, value);
    }
  }
  let $uri = message.uri;
  if ($uri !== void 0) {
    writeVarint32(bb, 18);
    writeString(bb, $uri);
  }
  let $height = message.height;
  if ($height !== void 0) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $height);
  }
  let $width = message.width;
  if ($width !== void 0) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $width);
  }
  let $avgColor = message.avgColor;
  if ($avgColor !== void 0) {
    writeVarint32(bb, 42);
    writeString(bb, $avgColor);
  }
  let $imageType = message.imageType;
  if ($imageType !== void 0) {
    writeVarint32(bb, 48);
    writeVarint64(bb, intToLong($imageType));
  }
  let $openWebUrl = message.openWebUrl;
  if ($openWebUrl !== void 0) {
    writeVarint32(bb, 58);
    writeString(bb, $openWebUrl);
  }
  let $content = message.content;
  if ($content !== void 0) {
    writeVarint32(bb, 66);
    let nested = popByteBuffer();
    _encodeImage_Content($content, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $isAnimated = message.isAnimated;
  if ($isAnimated !== void 0) {
    writeVarint32(bb, 72);
    writeByte(bb, $isAnimated ? 1 : 0);
  }
}
function _decodeImage(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // repeated string urlList = 1;
      case 1: {
        let values = message.urlList || (message.urlList = []);
        values.push(readString(bb, readVarint32(bb)));
        break;
      }
      // optional string uri = 2;
      case 2: {
        message.uri = readString(bb, readVarint32(bb));
        break;
      }
      // optional int64 height = 3;
      case 3: {
        message.height = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 width = 4;
      case 4: {
        message.width = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional string avgColor = 5;
      case 5: {
        message.avgColor = readString(bb, readVarint32(bb));
        break;
      }
      // optional int32 imageType = 6;
      case 6: {
        message.imageType = readVarint32(bb);
        break;
      }
      // optional string openWebUrl = 7;
      case 7: {
        message.openWebUrl = readString(bb, readVarint32(bb));
        break;
      }
      // optional Image_Content content = 8;
      case 8: {
        let limit = pushTemporaryLength(bb);
        message.content = _decodeImage_Content(bb);
        bb.limit = limit;
        break;
      }
      // optional bool isAnimated = 9;
      case 9: {
        message.isAnimated = !!readByte(bb);
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeImage_Content(message, bb) {
  let $name = message.name;
  if ($name !== void 0) {
    writeVarint32(bb, 10);
    writeString(bb, $name);
  }
  let $fontColor = message.fontColor;
  if ($fontColor !== void 0) {
    writeVarint32(bb, 18);
    writeString(bb, $fontColor);
  }
  let $level = message.level;
  if ($level !== void 0) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $level);
  }
  let $alternativeText = message.alternativeText;
  if ($alternativeText !== void 0) {
    writeVarint32(bb, 34);
    writeString(bb, $alternativeText);
  }
}
function _decodeImage_Content(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional string name = 1;
      case 1: {
        message.name = readString(bb, readVarint32(bb));
        break;
      }
      // optional string fontColor = 2;
      case 2: {
        message.fontColor = readString(bb, readVarint32(bb));
        break;
      }
      // optional int64 level = 3;
      case 3: {
        message.level = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional string alternativeText = 4;
      case 4: {
        message.alternativeText = readString(bb, readVarint32(bb));
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _decodeUserVIPInfo(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _decodeIndustryCertification(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _decodeMemberEntranceInfo(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeTextPieceUser(message, bb) {
  let $user = message.user;
  if ($user !== void 0) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeUser($user, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $withColon = message.withColon;
  if ($withColon !== void 0) {
    writeVarint32(bb, 16);
    writeByte(bb, $withColon ? 1 : 0);
  }
}
function _decodeTextPieceUser(bb) {
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
      // optional bool withColon = 2;
      case 2: {
        message.withColon = !!readByte(bb);
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodePublicAreaCommon(message, bb) {
  let $userLabel = message.userLabel;
  if ($userLabel !== void 0) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeImage($userLabel, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $userConsumeInRoom = message.userConsumeInRoom;
  if ($userConsumeInRoom !== void 0) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $userConsumeInRoom);
  }
  let $userSendGiftCntInRoom = message.userSendGiftCntInRoom;
  if ($userSendGiftCntInRoom !== void 0) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $userSendGiftCntInRoom);
  }
  let $individualPriority = message.individualPriority;
  if ($individualPriority !== void 0) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $individualPriority);
  }
  let $supportPin = message.supportPin;
  if ($supportPin !== void 0) {
    writeVarint32(bb, 48);
    writeVarint64(bb, $supportPin);
  }
  let $suffixText = message.suffixText;
  if ($suffixText !== void 0) {
    writeVarint32(bb, 58);
    let nested = popByteBuffer();
    _encodeSuffixText($suffixText, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $imAction = message.imAction;
  if ($imAction !== void 0) {
    writeVarint32(bb, 64);
    writeVarint64(bb, intToLong($imAction));
  }
  let $forbiddenProfile = message.forbiddenProfile;
  if ($forbiddenProfile !== void 0) {
    writeVarint32(bb, 72);
    writeVarint64(bb, intToLong($forbiddenProfile));
  }
  let $replyResp = message.replyResp;
  if ($replyResp !== void 0) {
    writeVarint32(bb, 82);
    let nested = popByteBuffer();
    _encodeChatReplyRespInfo($replyResp, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $isFeatured = message.isFeatured;
  if ($isFeatured !== void 0) {
    writeVarint32(bb, 96);
    writeVarint64(bb, $isFeatured);
  }
  let $needFilterDisplay = message.needFilterDisplay;
  if ($needFilterDisplay !== void 0) {
    writeVarint32(bb, 104);
    writeByte(bb, $needFilterDisplay ? 1 : 0);
  }
}
function _decodePublicAreaCommon(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional Image userLabel = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.userLabel = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 userConsumeInRoom = 2;
      case 2: {
        message.userConsumeInRoom = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 userSendGiftCntInRoom = 3;
      case 3: {
        message.userSendGiftCntInRoom = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 individualPriority = 4;
      case 4: {
        message.individualPriority = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 supportPin = 6;
      case 6: {
        message.supportPin = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional SuffixText suffixText = 7;
      case 7: {
        let limit = pushTemporaryLength(bb);
        message.suffixText = _decodeSuffixText(bb);
        bb.limit = limit;
        break;
      }
      // optional int32 imAction = 8;
      case 8: {
        message.imAction = readVarint32(bb);
        break;
      }
      // optional int32 forbiddenProfile = 9;
      case 9: {
        message.forbiddenProfile = readVarint32(bb);
        break;
      }
      // optional ChatReplyRespInfo replyResp = 10;
      case 10: {
        let limit = pushTemporaryLength(bb);
        message.replyResp = _decodeChatReplyRespInfo(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 isFeatured = 12;
      case 12: {
        message.isFeatured = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional bool needFilterDisplay = 13;
      case 13: {
        message.needFilterDisplay = !!readByte(bb);
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeAnchorGiftData(message, bb) {
  let $anchorDiyOriginImg = message.anchorDiyOriginImg;
  if ($anchorDiyOriginImg !== void 0) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeImage($anchorDiyOriginImg, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}
function _decodeAnchorGiftData(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional Image anchorDiyOriginImg = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.anchorDiyOriginImg = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _decodeAssetEffectMixInfo(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeBuffLockInfo(message, bb) {
  let $locked = message.locked;
  if ($locked !== void 0) {
    writeVarint32(bb, 8);
    writeByte(bb, $locked ? 1 : 0);
  }
  let $toast = message.toast;
  if ($toast !== void 0) {
    writeVarint32(bb, 18);
    writeString(bb, $toast);
  }
  let $schema = message.schema;
  if ($schema !== void 0) {
    writeVarint32(bb, 26);
    writeString(bb, $schema);
  }
  let $cellText = message.cellText;
  if ($cellText !== void 0) {
    writeVarint32(bb, 34);
    writeString(bb, $cellText);
  }
}
function _decodeBuffLockInfo(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional bool locked = 1;
      case 1: {
        message.locked = !!readByte(bb);
        break;
      }
      // optional string toast = 2;
      case 2: {
        message.toast = readString(bb, readVarint32(bb));
        break;
      }
      // optional string schema = 3;
      case 3: {
        message.schema = readString(bb, readVarint32(bb));
        break;
      }
      // optional string cellText = 4;
      case 4: {
        message.cellText = readString(bb, readVarint32(bb));
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeChatReplyRespInfo(message, bb) {
  let $replyMsgId = message.replyMsgId;
  if ($replyMsgId !== void 0) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $replyMsgId);
  }
  let $replyId = message.replyId;
  if ($replyId !== void 0) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $replyId);
  }
  let $replyText = message.replyText;
  if ($replyText !== void 0) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeText($replyText, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $replyUid = message.replyUid;
  if ($replyUid !== void 0) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $replyUid);
  }
  let $replyWebcastUid = message.replyWebcastUid;
  if ($replyWebcastUid !== void 0) {
    writeVarint32(bb, 42);
    writeString(bb, $replyWebcastUid);
  }
}
function _decodeChatReplyRespInfo(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional int64 replyMsgId = 1;
      case 1: {
        message.replyMsgId = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 replyId = 2;
      case 2: {
        message.replyId = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional Text replyText = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.replyText = _decodeText(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 replyUid = 4;
      case 4: {
        message.replyUid = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional string replyWebcastUid = 5;
      case 5: {
        message.replyWebcastUid = readString(bb, readVarint32(bb));
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeExtraEffect(message, bb) {
  let $assetId = message.assetId;
  if ($assetId !== void 0) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $assetId);
  }
  let $displayForm = message.displayForm;
  if ($displayForm !== void 0) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($displayForm));
  }
}
function _decodeExtraEffect(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional int64 assetId = 1;
      case 1: {
        message.assetId = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int32 displayForm = 2;
      case 2: {
        message.displayForm = readVarint32(bb);
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeEmojiInteractResource(message, bb) {
  let $fromImage = message.fromImage;
  if ($fromImage !== void 0) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeSendInteractEmojiConfig($fromImage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $passImage = message.passImage;
  if ($passImage !== void 0) {
    writeVarint32(bb, 18);
    let nested = popByteBuffer();
    _encodeSendInteractEmojiConfig($passImage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $toImage = message.toImage;
  if ($toImage !== void 0) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeSendInteractEmojiConfig($toImage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}
function _decodeEmojiInteractResource(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional SendInteractEmojiConfig fromImage = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.fromImage = _decodeSendInteractEmojiConfig(bb);
        bb.limit = limit;
        break;
      }
      // optional SendInteractEmojiConfig passImage = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        message.passImage = _decodeSendInteractEmojiConfig(bb);
        bb.limit = limit;
        break;
      }
      // optional SendInteractEmojiConfig toImage = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.toImage = _decodeSendInteractEmojiConfig(bb);
        bb.limit = limit;
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeGiftIMPriority(message, bb) {
  let array$queueSizes = message.queueSizes;
  if (array$queueSizes !== void 0) {
    let packed = popByteBuffer();
    for (let value of array$queueSizes) {
      writeVarint64(packed, value);
    }
    writeVarint32(bb, 10);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }
  let $selfQueuePriority = message.selfQueuePriority;
  if ($selfQueuePriority !== void 0) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $selfQueuePriority);
  }
  let $priority = message.priority;
  if ($priority !== void 0) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $priority);
  }
}
function _decodeGiftIMPriority(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // repeated int64 queueSizes = 1;
      case 1: {
        let values = message.queueSizes || (message.queueSizes = []);
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
      // optional int64 selfQueuePriority = 2;
      case 2: {
        message.selfQueuePriority = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 priority = 3;
      case 3: {
        message.priority = readVarint64(
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
function _encodeGiftTrayInfo(message, bb) {
  let $trayDisplayText = message.trayDisplayText;
  if ($trayDisplayText !== void 0) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeText($trayDisplayText, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $trayBaseImg = message.trayBaseImg;
  if ($trayBaseImg !== void 0) {
    writeVarint32(bb, 18);
    let nested = popByteBuffer();
    _encodeImage($trayBaseImg, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $trayHeadImg = message.trayHeadImg;
  if ($trayHeadImg !== void 0) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeImage($trayHeadImg, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $trayRightImg = message.trayRightImg;
  if ($trayRightImg !== void 0) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeImage($trayRightImg, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $trayLevel = message.trayLevel;
  if ($trayLevel !== void 0) {
    writeVarint32(bb, 40);
    writeVarint64(bb, $trayLevel);
  }
  let $trayDynamicImg = message.trayDynamicImg;
  if ($trayDynamicImg !== void 0) {
    writeVarint32(bb, 50);
    let nested = popByteBuffer();
    _encodeImage($trayDynamicImg, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}
function _decodeGiftTrayInfo(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional Text trayDisplayText = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.trayDisplayText = _decodeText(bb);
        bb.limit = limit;
        break;
      }
      // optional Image trayBaseImg = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        message.trayBaseImg = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional Image trayHeadImg = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.trayHeadImg = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional Image trayRightImg = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.trayRightImg = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 trayLevel = 5;
      case 5: {
        message.trayLevel = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional Image trayDynamicImg = 6;
      case 6: {
        let limit = pushTemporaryLength(bb);
        message.trayDynamicImg = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeGiftStruct(message, bb) {
  let $image = message.image;
  if ($image !== void 0) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeImage($image, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $describe = message.describe;
  if ($describe !== void 0) {
    writeVarint32(bb, 18);
    writeString(bb, $describe);
  }
  let $notify = message.notify;
  if ($notify !== void 0) {
    writeVarint32(bb, 24);
    writeByte(bb, $notify ? 1 : 0);
  }
  let $duration = message.duration;
  if ($duration !== void 0) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $duration);
  }
  let $id = message.id;
  if ($id !== void 0) {
    writeVarint32(bb, 40);
    writeVarint64(bb, $id);
  }
  let $fansclubInfo = message.fansclubInfo;
  if ($fansclubInfo !== void 0) {
    writeVarint32(bb, 50);
    let nested = popByteBuffer();
    _encodeGiftStruct_GiftStructFansClubInfo($fansclubInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $forLinkmic = message.forLinkmic;
  if ($forLinkmic !== void 0) {
    writeVarint32(bb, 56);
    writeByte(bb, $forLinkmic ? 1 : 0);
  }
  let $doodle = message.doodle;
  if ($doodle !== void 0) {
    writeVarint32(bb, 64);
    writeByte(bb, $doodle ? 1 : 0);
  }
  let $forFansclub = message.forFansclub;
  if ($forFansclub !== void 0) {
    writeVarint32(bb, 72);
    writeByte(bb, $forFansclub ? 1 : 0);
  }
  let $combo = message.combo;
  if ($combo !== void 0) {
    writeVarint32(bb, 80);
    writeByte(bb, $combo ? 1 : 0);
  }
  let $type = message.type;
  if ($type !== void 0) {
    writeVarint32(bb, 88);
    writeVarint64(bb, intToLong($type));
  }
  let $diamondCount = message.diamondCount;
  if ($diamondCount !== void 0) {
    writeVarint32(bb, 96);
    writeVarint64(bb, intToLong($diamondCount));
  }
  let $isDisplayedOnPanel = message.isDisplayedOnPanel;
  if ($isDisplayedOnPanel !== void 0) {
    writeVarint32(bb, 104);
    writeVarint64(bb, intToLong($isDisplayedOnPanel));
  }
  let $primaryEffectId = message.primaryEffectId;
  if ($primaryEffectId !== void 0) {
    writeVarint32(bb, 112);
    writeVarint64(bb, $primaryEffectId);
  }
  let $giftLabelIcon = message.giftLabelIcon;
  if ($giftLabelIcon !== void 0) {
    writeVarint32(bb, 122);
    let nested = popByteBuffer();
    _encodeImage($giftLabelIcon, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $name = message.name;
  if ($name !== void 0) {
    writeVarint32(bb, 130);
    writeString(bb, $name);
  }
  let $region = message.region;
  if ($region !== void 0) {
    writeVarint32(bb, 138);
    writeString(bb, $region);
  }
  let $manual = message.manual;
  if ($manual !== void 0) {
    writeVarint32(bb, 146);
    writeString(bb, $manual);
  }
  let $forCustom = message.forCustom;
  if ($forCustom !== void 0) {
    writeVarint32(bb, 152);
    writeByte(bb, $forCustom ? 1 : 0);
  }
  let map$specialEffects = message.specialEffects;
  if (map$specialEffects !== void 0) {
    for (let key in map$specialEffects) {
      let nested = popByteBuffer();
      let value = map$specialEffects[key];
      writeVarint32(nested, 10);
      writeString(nested, key);
      writeVarint32(nested, 16);
      writeVarint64(nested, value);
      writeVarint32(bb, 162);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
  let $icon = message.icon;
  if ($icon !== void 0) {
    writeVarint32(bb, 170);
    let nested = popByteBuffer();
    _encodeImage($icon, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $actionType = message.actionType;
  if ($actionType !== void 0) {
    writeVarint32(bb, 176);
    writeVarint64(bb, intToLong($actionType));
  }
  let $watermelonSeeds = message.watermelonSeeds;
  if ($watermelonSeeds !== void 0) {
    writeVarint32(bb, 184);
    writeVarint64(bb, intToLong($watermelonSeeds));
  }
  let $goldEffect = message.goldEffect;
  if ($goldEffect !== void 0) {
    writeVarint32(bb, 194);
    writeString(bb, $goldEffect);
  }
  let array$subs = message.subs;
  if (array$subs !== void 0) {
    for (let value of array$subs) {
      writeVarint32(bb, 202);
      let nested = popByteBuffer();
      _encodeLuckyMoneyGiftMeta(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
  let $goldenBeans = message.goldenBeans;
  if ($goldenBeans !== void 0) {
    writeVarint32(bb, 208);
    writeVarint64(bb, $goldenBeans);
  }
  let $honorLevel = message.honorLevel;
  if ($honorLevel !== void 0) {
    writeVarint32(bb, 216);
    writeVarint64(bb, $honorLevel);
  }
  let $itemType = message.itemType;
  if ($itemType !== void 0) {
    writeVarint32(bb, 224);
    writeVarint64(bb, intToLong($itemType));
  }
  let $schemeUrl = message.schemeUrl;
  if ($schemeUrl !== void 0) {
    writeVarint32(bb, 234);
    writeString(bb, $schemeUrl);
  }
  let $giftOperation = message.giftOperation;
  if ($giftOperation !== void 0) {
    writeVarint32(bb, 242);
    let nested = popByteBuffer();
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $eventName = message.eventName;
  if ($eventName !== void 0) {
    writeVarint32(bb, 250);
    writeString(bb, $eventName);
  }
  let $nobleLevel = message.nobleLevel;
  if ($nobleLevel !== void 0) {
    writeVarint32(bb, 256);
    writeVarint64(bb, $nobleLevel);
  }
  let $guideUrl = message.guideUrl;
  if ($guideUrl !== void 0) {
    writeVarint32(bb, 266);
    writeString(bb, $guideUrl);
  }
  let $punishMedicine = message.punishMedicine;
  if ($punishMedicine !== void 0) {
    writeVarint32(bb, 272);
    writeByte(bb, $punishMedicine ? 1 : 0);
  }
  let $forPortal = message.forPortal;
  if ($forPortal !== void 0) {
    writeVarint32(bb, 280);
    writeByte(bb, $forPortal ? 1 : 0);
  }
  let $businessText = message.businessText;
  if ($businessText !== void 0) {
    writeVarint32(bb, 290);
    writeString(bb, $businessText);
  }
  let $cnyGift = message.cnyGift;
  if ($cnyGift !== void 0) {
    writeVarint32(bb, 296);
    writeByte(bb, $cnyGift ? 1 : 0);
  }
  let $appId = message.appId;
  if ($appId !== void 0) {
    writeVarint32(bb, 304);
    writeVarint64(bb, $appId);
  }
  let $vipLevel = message.vipLevel;
  if ($vipLevel !== void 0) {
    writeVarint32(bb, 312);
    writeVarint64(bb, $vipLevel);
  }
  let $isGray = message.isGray;
  if ($isGray !== void 0) {
    writeVarint32(bb, 320);
    writeByte(bb, $isGray ? 1 : 0);
  }
  let $graySchemeUrl = message.graySchemeUrl;
  if ($graySchemeUrl !== void 0) {
    writeVarint32(bb, 330);
    writeString(bb, $graySchemeUrl);
  }
  let $giftScene = message.giftScene;
  if ($giftScene !== void 0) {
    writeVarint32(bb, 336);
    writeVarint64(bb, $giftScene);
  }
  let $giftBanner = message.giftBanner;
  if ($giftBanner !== void 0) {
    writeVarint32(bb, 346);
    let nested = popByteBuffer();
    _encodeGiftBanner($giftBanner, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let array$triggerWords = message.triggerWords;
  if (array$triggerWords !== void 0) {
    for (let value of array$triggerWords) {
      writeVarint32(bb, 354);
      writeString(bb, value);
    }
  }
  let array$giftBuffInfos = message.giftBuffInfos;
  if (array$giftBuffInfos !== void 0) {
    for (let value of array$giftBuffInfos) {
      writeVarint32(bb, 362);
      let nested = popByteBuffer();
      _encodeGiftBuffInfo(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
  let $forFirstRecharge = message.forFirstRecharge;
  if ($forFirstRecharge !== void 0) {
    writeVarint32(bb, 368);
    writeByte(bb, $forFirstRecharge ? 1 : 0);
  }
  let $dynamicImgForSelected = message.dynamicImgForSelected;
  if ($dynamicImgForSelected !== void 0) {
    writeVarint32(bb, 378);
    let nested = popByteBuffer();
    _encodeImage($dynamicImgForSelected, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $afterSendAction = message.afterSendAction;
  if ($afterSendAction !== void 0) {
    writeVarint32(bb, 384);
    writeVarint64(bb, intToLong($afterSendAction));
  }
  let $giftOfflineTime = message.giftOfflineTime;
  if ($giftOfflineTime !== void 0) {
    writeVarint32(bb, 392);
    writeVarint64(bb, $giftOfflineTime);
  }
  let $topBarText = message.topBarText;
  if ($topBarText !== void 0) {
    writeVarint32(bb, 402);
    writeString(bb, $topBarText);
  }
  let $topRightAvatar = message.topRightAvatar;
  if ($topRightAvatar !== void 0) {
    writeVarint32(bb, 410);
    let nested = popByteBuffer();
    _encodeImage($topRightAvatar, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $bannerSchemeUrl = message.bannerSchemeUrl;
  if ($bannerSchemeUrl !== void 0) {
    writeVarint32(bb, 418);
    writeString(bb, $bannerSchemeUrl);
  }
  let $isLocked = message.isLocked;
  if ($isLocked !== void 0) {
    writeVarint32(bb, 424);
    writeByte(bb, $isLocked ? 1 : 0);
  }
  let $reqExtraType = message.reqExtraType;
  if ($reqExtraType !== void 0) {
    writeVarint32(bb, 432);
    writeVarint64(bb, $reqExtraType);
  }
  let array$assetIds = message.assetIds;
  if (array$assetIds !== void 0) {
    let packed = popByteBuffer();
    for (let value of array$assetIds) {
      writeVarint64(packed, value);
    }
    writeVarint32(bb, 442);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }
  let $giftPreviewInfo = message.giftPreviewInfo;
  if ($giftPreviewInfo !== void 0) {
    writeVarint32(bb, 450);
    let nested = popByteBuffer();
    _encodeGiftPreviewInfo($giftPreviewInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $giftTip = message.giftTip;
  if ($giftTip !== void 0) {
    writeVarint32(bb, 458);
    let nested = popByteBuffer();
    _encodeGiftTip($giftTip, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $needSweepLightCount = message.needSweepLightCount;
  if ($needSweepLightCount !== void 0) {
    writeVarint32(bb, 464);
    writeVarint64(bb, intToLong($needSweepLightCount));
  }
  let array$groupInfo = message.groupInfo;
  if (array$groupInfo !== void 0) {
    for (let value of array$groupInfo) {
      writeVarint32(bb, 474);
      let nested = popByteBuffer();
      _encodeGiftGroupInfo(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
  let $bottomText = message.bottomText;
  if ($bottomText !== void 0) {
    writeVarint32(bb, 482);
    let nested = popByteBuffer();
    _encodeText($bottomText, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $mysteryShopStatus = message.mysteryShopStatus;
  if ($mysteryShopStatus !== void 0) {
    writeVarint32(bb, 488);
    writeVarint64(bb, intToLong($mysteryShopStatus));
  }
  let array$optionalAssetIds = message.optionalAssetIds;
  if (array$optionalAssetIds !== void 0) {
    let packed = popByteBuffer();
    for (let value of array$optionalAssetIds) {
      writeVarint64(packed, value);
    }
    writeVarint32(bb, 498);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }
  let $disableWishList = message.disableWishList;
  if ($disableWishList !== void 0) {
    writeVarint32(bb, 504);
    writeByte(bb, $disableWishList ? 1 : 0);
  }
  let $giftMsgBoard = message.giftMsgBoard;
  if ($giftMsgBoard !== void 0) {
    writeVarint32(bb, 514);
    let nested = popByteBuffer();
    _encodeGiftStruct_GiftMsgBoard($giftMsgBoard, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $emojiInteractResource = message.emojiInteractResource;
  if ($emojiInteractResource !== void 0) {
    writeVarint32(bb, 522);
    let nested = popByteBuffer();
    _encodeEmojiInteractResource($emojiInteractResource, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $trayDynamicImgFlippable = message.trayDynamicImgFlippable;
  if ($trayDynamicImgFlippable !== void 0) {
    writeVarint32(bb, 528);
    writeByte(bb, $trayDynamicImgFlippable ? 1 : 0);
  }
  let $picoShowAction = message.picoShowAction;
  if ($picoShowAction !== void 0) {
    writeVarint32(bb, 536);
    writeVarint64(bb, $picoShowAction);
  }
  let $selectedDynamicEffect = message.selectedDynamicEffect;
  if ($selectedDynamicEffect !== void 0) {
    writeVarint32(bb, 544);
    writeVarint64(bb, $selectedDynamicEffect);
  }
  let $giftTouchLabel = message.giftTouchLabel;
  if ($giftTouchLabel !== void 0) {
    writeVarint32(bb, 554);
    let nested = popByteBuffer();
    _encodeGiftTouchLabel($giftTouchLabel, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $unselectedBottomInfo = message.unselectedBottomInfo;
  if ($unselectedBottomInfo !== void 0) {
    writeVarint32(bb, 562);
    let nested = popByteBuffer();
    _encodeGiftUnselectedBottomInfo($unselectedBottomInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $giftConfirmInfo = message.giftConfirmInfo;
  if ($giftConfirmInfo !== void 0) {
    writeVarint32(bb, 570);
    let nested = popByteBuffer();
    _encodeGiftConfirmInfo($giftConfirmInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $bizType = message.bizType;
  if ($bizType !== void 0) {
    writeVarint32(bb, 576);
    writeVarint64(bb, intToLong($bizType));
  }
  let $bizItem = message.bizItem;
  if ($bizItem !== void 0) {
    writeVarint32(bb, 586);
    let nested = popByteBuffer();
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $webpImage = message.webpImage;
  if ($webpImage !== void 0) {
    writeVarint32(bb, 594);
    let nested = popByteBuffer();
    _encodeImage($webpImage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $giftSource = message.giftSource;
  if ($giftSource !== void 0) {
    writeVarint32(bb, 600);
    writeVarint64(bb, intToLong($giftSource));
  }
  let array$requiredAssets = message.requiredAssets;
  if (array$requiredAssets !== void 0) {
    let packed = popByteBuffer();
    for (let value of array$requiredAssets) {
      writeVarint64(packed, value);
    }
    writeVarint32(bb, 610);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }
  let $selectedLabel = message.selectedLabel;
  if ($selectedLabel !== void 0) {
    writeVarint32(bb, 618);
    let nested = popByteBuffer();
    _encodeImage($selectedLabel, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $sortScore = message.sortScore;
  if ($sortScore !== void 0) {
    writeVarint32(bb, 624);
    writeVarint64(bb, $sortScore);
  }
  let $topicId = message.topicId;
  if ($topicId !== void 0) {
    writeVarint32(bb, 632);
    writeVarint64(bb, $topicId);
  }
  let $sortExtra = message.sortExtra;
  if ($sortExtra !== void 0) {
    writeVarint32(bb, 642);
    writeString(bb, $sortExtra);
  }
}
function _decodeGiftStruct(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional Image image = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.image = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional string describe = 2;
      case 2: {
        message.describe = readString(bb, readVarint32(bb));
        break;
      }
      // optional bool notify = 3;
      case 3: {
        message.notify = !!readByte(bb);
        break;
      }
      // optional int64 duration = 4;
      case 4: {
        message.duration = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 id = 5;
      case 5: {
        message.id = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional GiftStruct_GiftStructFansClubInfo fansclubInfo = 6;
      case 6: {
        let limit = pushTemporaryLength(bb);
        message.fansclubInfo = _decodeGiftStruct_GiftStructFansClubInfo(bb);
        bb.limit = limit;
        break;
      }
      // optional bool forLinkmic = 7;
      case 7: {
        message.forLinkmic = !!readByte(bb);
        break;
      }
      // optional bool doodle = 8;
      case 8: {
        message.doodle = !!readByte(bb);
        break;
      }
      // optional bool forFansclub = 9;
      case 9: {
        message.forFansclub = !!readByte(bb);
        break;
      }
      // optional bool combo = 10;
      case 10: {
        message.combo = !!readByte(bb);
        break;
      }
      // optional int32 type = 11;
      case 11: {
        message.type = readVarint32(bb);
        break;
      }
      // optional int32 diamondCount = 12;
      case 12: {
        message.diamondCount = readVarint32(bb);
        break;
      }
      // optional int32 isDisplayedOnPanel = 13;
      case 13: {
        message.isDisplayedOnPanel = readVarint32(bb);
        break;
      }
      // optional int64 primaryEffectId = 14;
      case 14: {
        message.primaryEffectId = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional Image giftLabelIcon = 15;
      case 15: {
        let limit = pushTemporaryLength(bb);
        message.giftLabelIcon = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional string name = 16;
      case 16: {
        message.name = readString(bb, readVarint32(bb));
        break;
      }
      // optional string region = 17;
      case 17: {
        message.region = readString(bb, readVarint32(bb));
        break;
      }
      // optional string manual = 18;
      case 18: {
        message.manual = readString(bb, readVarint32(bb));
        break;
      }
      // optional bool forCustom = 19;
      case 19: {
        message.forCustom = !!readByte(bb);
        break;
      }
      // optional map<string, int64> specialEffects = 20;
      case 20: {
        let values = message.specialEffects || (message.specialEffects = {});
        let outerLimit = pushTemporaryLength(bb);
        let key;
        let value;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag2 = readVarint32(bb);
          switch (tag2 >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readString(bb, readVarint32(bb));
              break;
            }
            case 2: {
              value = readVarint64(
                bb,
                /* unsigned */
                false
              );
              break;
            }
            default:
              skipUnknownField(bb, tag2 & 7);
          }
        }
        if (key === void 0 || value === void 0) throw new Error("Invalid data for map: specialEffects");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }
      // optional Image icon = 21;
      case 21: {
        let limit = pushTemporaryLength(bb);
        message.icon = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional int32 actionType = 22;
      case 22: {
        message.actionType = readVarint32(bb);
        break;
      }
      // optional int32 watermelonSeeds = 23;
      case 23: {
        message.watermelonSeeds = readVarint32(bb);
        break;
      }
      // optional string goldEffect = 24;
      case 24: {
        message.goldEffect = readString(bb, readVarint32(bb));
        break;
      }
      // repeated LuckyMoneyGiftMeta subs = 25;
      case 25: {
        let limit = pushTemporaryLength(bb);
        let values = message.subs || (message.subs = []);
        values.push(_decodeLuckyMoneyGiftMeta(bb));
        bb.limit = limit;
        break;
      }
      // optional int64 goldenBeans = 26;
      case 26: {
        message.goldenBeans = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 honorLevel = 27;
      case 27: {
        message.honorLevel = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int32 itemType = 28;
      case 28: {
        message.itemType = readVarint32(bb);
        break;
      }
      // optional string schemeUrl = 29;
      case 29: {
        message.schemeUrl = readString(bb, readVarint32(bb));
        break;
      }
      // optional GiftPanelOperation giftOperation = 30;
      case 30: {
        let limit = pushTemporaryLength(bb);
        message.giftOperation = _decodeGiftPanelOperation(bb);
        bb.limit = limit;
        break;
      }
      // optional string eventName = 31;
      case 31: {
        message.eventName = readString(bb, readVarint32(bb));
        break;
      }
      // optional int64 nobleLevel = 32;
      case 32: {
        message.nobleLevel = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional string guideUrl = 33;
      case 33: {
        message.guideUrl = readString(bb, readVarint32(bb));
        break;
      }
      // optional bool punishMedicine = 34;
      case 34: {
        message.punishMedicine = !!readByte(bb);
        break;
      }
      // optional bool forPortal = 35;
      case 35: {
        message.forPortal = !!readByte(bb);
        break;
      }
      // optional string businessText = 36;
      case 36: {
        message.businessText = readString(bb, readVarint32(bb));
        break;
      }
      // optional bool cnyGift = 37;
      case 37: {
        message.cnyGift = !!readByte(bb);
        break;
      }
      // optional int64 appId = 38;
      case 38: {
        message.appId = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 vipLevel = 39;
      case 39: {
        message.vipLevel = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional bool isGray = 40;
      case 40: {
        message.isGray = !!readByte(bb);
        break;
      }
      // optional string graySchemeUrl = 41;
      case 41: {
        message.graySchemeUrl = readString(bb, readVarint32(bb));
        break;
      }
      // optional int64 giftScene = 42;
      case 42: {
        message.giftScene = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional GiftBanner giftBanner = 43;
      case 43: {
        let limit = pushTemporaryLength(bb);
        message.giftBanner = _decodeGiftBanner(bb);
        bb.limit = limit;
        break;
      }
      // repeated string triggerWords = 44;
      case 44: {
        let values = message.triggerWords || (message.triggerWords = []);
        values.push(readString(bb, readVarint32(bb)));
        break;
      }
      // repeated GiftBuffInfo giftBuffInfos = 45;
      case 45: {
        let limit = pushTemporaryLength(bb);
        let values = message.giftBuffInfos || (message.giftBuffInfos = []);
        values.push(_decodeGiftBuffInfo(bb));
        bb.limit = limit;
        break;
      }
      // optional bool forFirstRecharge = 46;
      case 46: {
        message.forFirstRecharge = !!readByte(bb);
        break;
      }
      // optional Image dynamicImgForSelected = 47;
      case 47: {
        let limit = pushTemporaryLength(bb);
        message.dynamicImgForSelected = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional int32 afterSendAction = 48;
      case 48: {
        message.afterSendAction = readVarint32(bb);
        break;
      }
      // optional int64 giftOfflineTime = 49;
      case 49: {
        message.giftOfflineTime = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional string topBarText = 50;
      case 50: {
        message.topBarText = readString(bb, readVarint32(bb));
        break;
      }
      // optional Image topRightAvatar = 51;
      case 51: {
        let limit = pushTemporaryLength(bb);
        message.topRightAvatar = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional string bannerSchemeUrl = 52;
      case 52: {
        message.bannerSchemeUrl = readString(bb, readVarint32(bb));
        break;
      }
      // optional bool isLocked = 53;
      case 53: {
        message.isLocked = !!readByte(bb);
        break;
      }
      // optional int64 reqExtraType = 54;
      case 54: {
        message.reqExtraType = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // repeated int64 assetIds = 55;
      case 55: {
        let values = message.assetIds || (message.assetIds = []);
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
      // optional GiftPreviewInfo giftPreviewInfo = 56;
      case 56: {
        let limit = pushTemporaryLength(bb);
        message.giftPreviewInfo = _decodeGiftPreviewInfo(bb);
        bb.limit = limit;
        break;
      }
      // optional GiftTip giftTip = 57;
      case 57: {
        let limit = pushTemporaryLength(bb);
        message.giftTip = _decodeGiftTip(bb);
        bb.limit = limit;
        break;
      }
      // optional int32 needSweepLightCount = 58;
      case 58: {
        message.needSweepLightCount = readVarint32(bb);
        break;
      }
      // repeated GiftGroupInfo groupInfo = 59;
      case 59: {
        let limit = pushTemporaryLength(bb);
        let values = message.groupInfo || (message.groupInfo = []);
        values.push(_decodeGiftGroupInfo(bb));
        bb.limit = limit;
        break;
      }
      // optional Text bottomText = 60;
      case 60: {
        let limit = pushTemporaryLength(bb);
        message.bottomText = _decodeText(bb);
        bb.limit = limit;
        break;
      }
      // optional int32 mysteryShopStatus = 61;
      case 61: {
        message.mysteryShopStatus = readVarint32(bb);
        break;
      }
      // repeated int64 optionalAssetIds = 62;
      case 62: {
        let values = message.optionalAssetIds || (message.optionalAssetIds = []);
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
      // optional bool disableWishList = 63;
      case 63: {
        message.disableWishList = !!readByte(bb);
        break;
      }
      // optional GiftStruct_GiftMsgBoard giftMsgBoard = 64;
      case 64: {
        let limit = pushTemporaryLength(bb);
        message.giftMsgBoard = _decodeGiftStruct_GiftMsgBoard(bb);
        bb.limit = limit;
        break;
      }
      // optional EmojiInteractResource emojiInteractResource = 65;
      case 65: {
        let limit = pushTemporaryLength(bb);
        message.emojiInteractResource = _decodeEmojiInteractResource(bb);
        bb.limit = limit;
        break;
      }
      // optional bool trayDynamicImgFlippable = 66;
      case 66: {
        message.trayDynamicImgFlippable = !!readByte(bb);
        break;
      }
      // optional int64 picoShowAction = 67;
      case 67: {
        message.picoShowAction = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 selectedDynamicEffect = 68;
      case 68: {
        message.selectedDynamicEffect = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional GiftTouchLabel giftTouchLabel = 69;
      case 69: {
        let limit = pushTemporaryLength(bb);
        message.giftTouchLabel = _decodeGiftTouchLabel(bb);
        bb.limit = limit;
        break;
      }
      // optional GiftUnselectedBottomInfo unselectedBottomInfo = 70;
      case 70: {
        let limit = pushTemporaryLength(bb);
        message.unselectedBottomInfo = _decodeGiftUnselectedBottomInfo(bb);
        bb.limit = limit;
        break;
      }
      // optional GiftConfirmInfo giftConfirmInfo = 71;
      case 71: {
        let limit = pushTemporaryLength(bb);
        message.giftConfirmInfo = _decodeGiftConfirmInfo(bb);
        bb.limit = limit;
        break;
      }
      // optional int32 bizType = 72;
      case 72: {
        message.bizType = readVarint32(bb);
        break;
      }
      // optional GoodsBizItem bizItem = 73;
      case 73: {
        let limit = pushTemporaryLength(bb);
        message.bizItem = _decodeGoodsBizItem(bb);
        bb.limit = limit;
        break;
      }
      // optional Image webpImage = 74;
      case 74: {
        let limit = pushTemporaryLength(bb);
        message.webpImage = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional int32 giftSource = 75;
      case 75: {
        message.giftSource = readVarint32(bb);
        break;
      }
      // repeated int64 requiredAssets = 76;
      case 76: {
        let values = message.requiredAssets || (message.requiredAssets = []);
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
      // optional Image selectedLabel = 77;
      case 77: {
        let limit = pushTemporaryLength(bb);
        message.selectedLabel = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 sortScore = 78;
      case 78: {
        message.sortScore = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 topicId = 79;
      case 79: {
        message.topicId = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional string sortExtra = 80;
      case 80: {
        message.sortExtra = readString(bb, readVarint32(bb));
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeGiftStruct_GiftStructFansClubInfo(message, bb) {
  let $minLevel = message.minLevel;
  if ($minLevel !== void 0) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($minLevel));
  }
  let $insertPos = message.insertPos;
  if ($insertPos !== void 0) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($insertPos));
  }
}
function _decodeGiftStruct_GiftStructFansClubInfo(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional int32 minLevel = 1;
      case 1: {
        message.minLevel = readVarint32(bb);
        break;
      }
      // optional int32 insertPos = 2;
      case 2: {
        message.insertPos = readVarint32(bb);
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeGiftStruct_GiftMsgBoard(message, bb) {
  let $forMsgBoard = message.forMsgBoard;
  if ($forMsgBoard !== void 0) {
    writeVarint32(bb, 8);
    writeByte(bb, $forMsgBoard ? 1 : 0);
  }
  let $promptText = message.promptText;
  if ($promptText !== void 0) {
    writeVarint32(bb, 18);
    writeString(bb, $promptText);
  }
}
function _decodeGiftStruct_GiftMsgBoard(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional bool forMsgBoard = 1;
      case 1: {
        message.forMsgBoard = !!readByte(bb);
        break;
      }
      // optional string promptText = 2;
      case 2: {
        message.promptText = readString(bb, readVarint32(bb));
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeGiftTouchLabel(message, bb) {
  let $icon = message.icon;
  if ($icon !== void 0) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeImage($icon, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $uniqueKey = message.uniqueKey;
  if ($uniqueKey !== void 0) {
    writeVarint32(bb, 18);
    writeString(bb, $uniqueKey);
  }
}
function _decodeGiftTouchLabel(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional Image icon = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.icon = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional string uniqueKey = 2;
      case 2: {
        message.uniqueKey = readString(bb, readVarint32(bb));
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeGiftUnselectedBottomInfo(message, bb) {
  let $text = message.text;
  if ($text !== void 0) {
    writeVarint32(bb, 10);
    writeString(bb, $text);
  }
}
function _decodeGiftUnselectedBottomInfo(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional string text = 1;
      case 1: {
        message.text = readString(bb, readVarint32(bb));
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeGiftConfirmInfo(message, bb) {
  let $title = message.title;
  if ($title !== void 0) {
    writeVarint32(bb, 10);
    writeString(bb, $title);
  }
  let $text = message.text;
  if ($text !== void 0) {
    writeVarint32(bb, 18);
    writeString(bb, $text);
  }
  let $cancelButtonText = message.cancelButtonText;
  if ($cancelButtonText !== void 0) {
    writeVarint32(bb, 26);
    writeString(bb, $cancelButtonText);
  }
  let $confirmButtonText = message.confirmButtonText;
  if ($confirmButtonText !== void 0) {
    writeVarint32(bb, 34);
    writeString(bb, $confirmButtonText);
  }
  let $confirmType = message.confirmType;
  if ($confirmType !== void 0) {
    writeVarint32(bb, 40);
    writeVarint64(bb, intToLong($confirmType));
  }
}
function _decodeGiftConfirmInfo(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional string title = 1;
      case 1: {
        message.title = readString(bb, readVarint32(bb));
        break;
      }
      // optional string text = 2;
      case 2: {
        message.text = readString(bb, readVarint32(bb));
        break;
      }
      // optional string cancelButtonText = 3;
      case 3: {
        message.cancelButtonText = readString(bb, readVarint32(bb));
        break;
      }
      // optional string confirmButtonText = 4;
      case 4: {
        message.confirmButtonText = readString(bb, readVarint32(bb));
        break;
      }
      // optional int32 confirmType = 5;
      case 5: {
        message.confirmType = readVarint32(bb);
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeGiftPreviewInfo(message, bb) {
  let $lockStatus = message.lockStatus;
  if ($lockStatus !== void 0) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $lockStatus);
  }
  let $clientBlockUseSchemeUrl = message.clientBlockUseSchemeUrl;
  if ($clientBlockUseSchemeUrl !== void 0) {
    writeVarint32(bb, 16);
    writeByte(bb, $clientBlockUseSchemeUrl ? 1 : 0);
  }
  let $blockSchemeUrl = message.blockSchemeUrl;
  if ($blockSchemeUrl !== void 0) {
    writeVarint32(bb, 26);
    writeString(bb, $blockSchemeUrl);
  }
  let $clientCheckLeftDiamond = message.clientCheckLeftDiamond;
  if ($clientCheckLeftDiamond !== void 0) {
    writeVarint32(bb, 32);
    writeByte(bb, $clientCheckLeftDiamond ? 1 : 0);
  }
  let $blockToast = message.blockToast;
  if ($blockToast !== void 0) {
    writeVarint32(bb, 42);
    writeString(bb, $blockToast);
  }
}
function _decodeGiftPreviewInfo(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional int64 lockStatus = 1;
      case 1: {
        message.lockStatus = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional bool clientBlockUseSchemeUrl = 2;
      case 2: {
        message.clientBlockUseSchemeUrl = !!readByte(bb);
        break;
      }
      // optional string blockSchemeUrl = 3;
      case 3: {
        message.blockSchemeUrl = readString(bb, readVarint32(bb));
        break;
      }
      // optional bool clientCheckLeftDiamond = 4;
      case 4: {
        message.clientCheckLeftDiamond = !!readByte(bb);
        break;
      }
      // optional string blockToast = 5;
      case 5: {
        message.blockToast = readString(bb, readVarint32(bb));
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeGiftTip(message, bb) {
  let $displayText = message.displayText;
  if ($displayText !== void 0) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeText($displayText, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $backgroundColor = message.backgroundColor;
  if ($backgroundColor !== void 0) {
    writeVarint32(bb, 18);
    writeString(bb, $backgroundColor);
  }
  let $prefixImage = message.prefixImage;
  if ($prefixImage !== void 0) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeImage($prefixImage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $remainingDuration = message.remainingDuration;
  if ($remainingDuration !== void 0) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $remainingDuration);
  }
  let $remainingDurationSuffixText = message.remainingDurationSuffixText;
  if ($remainingDurationSuffixText !== void 0) {
    writeVarint32(bb, 42);
    let nested = popByteBuffer();
    _encodeText($remainingDurationSuffixText, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $countdownDeadlineTime = message.countdownDeadlineTime;
  if ($countdownDeadlineTime !== void 0) {
    writeVarint32(bb, 48);
    writeVarint64(bb, $countdownDeadlineTime);
  }
}
function _decodeGiftTip(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional Text displayText = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.displayText = _decodeText(bb);
        bb.limit = limit;
        break;
      }
      // optional string backgroundColor = 2;
      case 2: {
        message.backgroundColor = readString(bb, readVarint32(bb));
        break;
      }
      // optional Image prefixImage = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.prefixImage = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 remainingDuration = 4;
      case 4: {
        message.remainingDuration = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional Text remainingDurationSuffixText = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        message.remainingDurationSuffixText = _decodeText(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 countdownDeadlineTime = 6;
      case 6: {
        message.countdownDeadlineTime = readVarint64(
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
function _encodeGiftGroupInfo(message, bb) {
  let $groupCount = message.groupCount;
  if ($groupCount !== void 0) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($groupCount));
  }
  let $groupText = message.groupText;
  if ($groupText !== void 0) {
    writeVarint32(bb, 18);
    writeString(bb, $groupText);
  }
}
function _decodeGiftGroupInfo(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional int32 groupCount = 1;
      case 1: {
        message.groupCount = readVarint32(bb);
        break;
      }
      // optional string groupText = 2;
      case 2: {
        message.groupText = readString(bb, readVarint32(bb));
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _decodeGiftPanelOperation(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeGiftBanner(message, bb) {
  let $displayText = message.displayText;
  if ($displayText !== void 0) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeText($displayText, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $displayTextBgColor = message.displayTextBgColor;
  if ($displayTextBgColor !== void 0) {
    writeVarint32(bb, 18);
    writeString(bb, $displayTextBgColor);
  }
  let $boxImg = message.boxImg;
  if ($boxImg !== void 0) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeImage($boxImg, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $bgImg = message.bgImg;
  if ($bgImg !== void 0) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeImage($bgImg, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $schemeUrl = message.schemeUrl;
  if ($schemeUrl !== void 0) {
    writeVarint32(bb, 42);
    writeString(bb, $schemeUrl);
  }
  let $animate = message.animate;
  if ($animate !== void 0) {
    writeVarint32(bb, 48);
    writeByte(bb, $animate ? 1 : 0);
  }
  let $boxId = message.boxId;
  if ($boxId !== void 0) {
    writeVarint32(bb, 56);
    writeVarint64(bb, $boxId);
  }
  let $availableBoxCount = message.availableBoxCount;
  if ($availableBoxCount !== void 0) {
    writeVarint32(bb, 64);
    writeVarint64(bb, $availableBoxCount);
  }
}
function _decodeGiftBanner(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional Text displayText = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.displayText = _decodeText(bb);
        bb.limit = limit;
        break;
      }
      // optional string displayTextBgColor = 2;
      case 2: {
        message.displayTextBgColor = readString(bb, readVarint32(bb));
        break;
      }
      // optional Image boxImg = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.boxImg = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional Image bgImg = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.bgImg = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional string schemeUrl = 5;
      case 5: {
        message.schemeUrl = readString(bb, readVarint32(bb));
        break;
      }
      // optional bool animate = 6;
      case 6: {
        message.animate = !!readByte(bb);
        break;
      }
      // optional int64 boxId = 7;
      case 7: {
        message.boxId = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 availableBoxCount = 8;
      case 8: {
        message.availableBoxCount = readVarint64(
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
function _encodeGiftBuffInfo(message, bb) {
  let $text = message.text;
  if ($text !== void 0) {
    writeVarint32(bb, 10);
    writeString(bb, $text);
  }
  let $textColor = message.textColor;
  if ($textColor !== void 0) {
    writeVarint32(bb, 18);
    writeString(bb, $textColor);
  }
  let $bgImg = message.bgImg;
  if ($bgImg !== void 0) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeImage($bgImg, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $sweepLightImg = message.sweepLightImg;
  if ($sweepLightImg !== void 0) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeImage($sweepLightImg, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $buffGiftDescribeImg = message.buffGiftDescribeImg;
  if ($buffGiftDescribeImg !== void 0) {
    writeVarint32(bb, 42);
    let nested = popByteBuffer();
    _encodeImage($buffGiftDescribeImg, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $buffGiftId = message.buffGiftId;
  if ($buffGiftId !== void 0) {
    writeVarint32(bb, 48);
    writeVarint64(bb, $buffGiftId);
  }
  let $buffLevel = message.buffLevel;
  if ($buffLevel !== void 0) {
    writeVarint32(bb, 56);
    writeVarint64(bb, intToLong($buffLevel));
  }
  let $buffCanSend = message.buffCanSend;
  if ($buffCanSend !== void 0) {
    writeVarint32(bb, 64);
    writeByte(bb, $buffCanSend ? 1 : 0);
  }
  let $buffDiamondCount = message.buffDiamondCount;
  if ($buffDiamondCount !== void 0) {
    writeVarint32(bb, 72);
    writeVarint64(bb, $buffDiamondCount);
  }
  let $lockToast = message.lockToast;
  if ($lockToast !== void 0) {
    writeVarint32(bb, 82);
    writeString(bb, $lockToast);
  }
  let $defaultChoseAction = message.defaultChoseAction;
  if ($defaultChoseAction !== void 0) {
    writeVarint32(bb, 88);
    writeVarint64(bb, $defaultChoseAction);
  }
  let $startTime = message.startTime;
  if ($startTime !== void 0) {
    writeVarint32(bb, 96);
    writeVarint64(bb, $startTime);
  }
  let $buffLockInfo = message.buffLockInfo;
  if ($buffLockInfo !== void 0) {
    writeVarint32(bb, 106);
    let nested = popByteBuffer();
    _encodeBuffLockInfo($buffLockInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $bgImgV2 = message.bgImgV2;
  if ($bgImgV2 !== void 0) {
    writeVarint32(bb, 114);
    let nested = popByteBuffer();
    _encodeImage($bgImgV2, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}
function _decodeGiftBuffInfo(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional string text = 1;
      case 1: {
        message.text = readString(bb, readVarint32(bb));
        break;
      }
      // optional string textColor = 2;
      case 2: {
        message.textColor = readString(bb, readVarint32(bb));
        break;
      }
      // optional Image bgImg = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.bgImg = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional Image sweepLightImg = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.sweepLightImg = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional Image buffGiftDescribeImg = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        message.buffGiftDescribeImg = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 buffGiftId = 6;
      case 6: {
        message.buffGiftId = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int32 buffLevel = 7;
      case 7: {
        message.buffLevel = readVarint32(bb);
        break;
      }
      // optional bool buffCanSend = 8;
      case 8: {
        message.buffCanSend = !!readByte(bb);
        break;
      }
      // optional int64 buffDiamondCount = 9;
      case 9: {
        message.buffDiamondCount = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional string lockToast = 10;
      case 10: {
        message.lockToast = readString(bb, readVarint32(bb));
        break;
      }
      // optional int64 defaultChoseAction = 11;
      case 11: {
        message.defaultChoseAction = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 startTime = 12;
      case 12: {
        message.startTime = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional BuffLockInfo buffLockInfo = 13;
      case 13: {
        let limit = pushTemporaryLength(bb);
        message.buffLockInfo = _decodeBuffLockInfo(bb);
        bb.limit = limit;
        break;
      }
      // optional Image bgImgV2 = 14;
      case 14: {
        let limit = pushTemporaryLength(bb);
        message.bgImgV2 = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _decodeGoodsBizItem(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeLuckyMoneyGiftMeta(message, bb) {
  let $image = message.image;
  if ($image !== void 0) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeImage($image, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $describe = message.describe;
  if ($describe !== void 0) {
    writeVarint32(bb, 18);
    writeString(bb, $describe);
  }
  let $id = message.id;
  if ($id !== void 0) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $id);
  }
  let $diamondCount = message.diamondCount;
  if ($diamondCount !== void 0) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($diamondCount));
  }
  let $icon = message.icon;
  if ($icon !== void 0) {
    writeVarint32(bb, 42);
    let nested = popByteBuffer();
    _encodeImage($icon, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}
function _decodeLuckyMoneyGiftMeta(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional Image image = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.image = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional string describe = 2;
      case 2: {
        message.describe = readString(bb, readVarint32(bb));
        break;
      }
      // optional int64 id = 3;
      case 3: {
        message.id = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int32 diamondCount = 4;
      case 4: {
        message.diamondCount = readVarint32(bb);
        break;
      }
      // optional Image icon = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        message.icon = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeSendTogether(message, bb) {
  let $id = message.id;
  if ($id !== void 0) {
    writeVarint32(bb, 10);
    writeString(bb, $id);
  }
  let $startTime = message.startTime;
  if ($startTime !== void 0) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $startTime);
  }
  let $endTime = message.endTime;
  if ($endTime !== void 0) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $endTime);
  }
}
function _decodeSendTogether(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional string id = 1;
      case 1: {
        message.id = readString(bb, readVarint32(bb));
        break;
      }
      // optional int64 startTime = 2;
      case 2: {
        message.startTime = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 endTime = 3;
      case 3: {
        message.endTime = readVarint64(
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
function _encodeSeriesPlayGift(message, bb) {
  let $giftStruct = message.giftStruct;
  if ($giftStruct !== void 0) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeGiftStruct($giftStruct, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $seriesTrayInfo = message.seriesTrayInfo;
  if ($seriesTrayInfo !== void 0) {
    writeVarint32(bb, 18);
    let nested = popByteBuffer();
    _encodeSeriesTrayInfo($seriesTrayInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $sendTogether = message.sendTogether;
  if ($sendTogether !== void 0) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeSendTogether($sendTogether, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $diyItemInfo = message.diyItemInfo;
  if ($diyItemInfo !== void 0) {
    writeVarint32(bb, 34);
    writeString(bb, $diyItemInfo);
  }
  let $anchorGift = message.anchorGift;
  if ($anchorGift !== void 0) {
    writeVarint32(bb, 42);
    let nested = popByteBuffer();
    _encodeAnchorGiftData($anchorGift, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $assetEffectMixInfo = message.assetEffectMixInfo;
  if ($assetEffectMixInfo !== void 0) {
    writeVarint32(bb, 50);
    let nested = popByteBuffer();
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}
function _decodeSeriesPlayGift(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional GiftStruct giftStruct = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.giftStruct = _decodeGiftStruct(bb);
        bb.limit = limit;
        break;
      }
      // optional SeriesTrayInfo seriesTrayInfo = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        message.seriesTrayInfo = _decodeSeriesTrayInfo(bb);
        bb.limit = limit;
        break;
      }
      // optional SendTogether sendTogether = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.sendTogether = _decodeSendTogether(bb);
        bb.limit = limit;
        break;
      }
      // optional string diyItemInfo = 4;
      case 4: {
        message.diyItemInfo = readString(bb, readVarint32(bb));
        break;
      }
      // optional AnchorGiftData anchorGift = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        message.anchorGift = _decodeAnchorGiftData(bb);
        bb.limit = limit;
        break;
      }
      // optional AssetEffectMixInfo assetEffectMixInfo = 6;
      case 6: {
        let limit = pushTemporaryLength(bb);
        message.assetEffectMixInfo = _decodeAssetEffectMixInfo(bb);
        bb.limit = limit;
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeSeriesTrayInfo(message, bb) {
  let $duration = message.duration;
  if ($duration !== void 0) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $duration);
  }
  let $staticImg = message.staticImg;
  if ($staticImg !== void 0) {
    writeVarint32(bb, 18);
    let nested = popByteBuffer();
    _encodeImage($staticImg, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $dynamicImg = message.dynamicImg;
  if ($dynamicImg !== void 0) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeImage($dynamicImg, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}
function _decodeSeriesTrayInfo(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional int64 duration = 1;
      case 1: {
        message.duration = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional Image staticImg = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        message.staticImg = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional Image dynamicImg = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.dynamicImg = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeSuffixText(message, bb) {
  let $bizType = message.bizType;
  if ($bizType !== void 0) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $bizType);
  }
  let $text = message.text;
  if ($text !== void 0) {
    writeVarint32(bb, 18);
    let nested = popByteBuffer();
    _encodeText($text, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}
function _decodeSuffixText(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional int64 bizType = 1;
      case 1: {
        message.bizType = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional Text text = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        message.text = _decodeText(bb);
        bb.limit = limit;
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _encodeSendInteractEmojiConfig(message, bb) {
  let $interactEmoji = message.interactEmoji;
  if ($interactEmoji !== void 0) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeImage($interactEmoji, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $durationMs = message.durationMs;
  if ($durationMs !== void 0) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $durationMs);
  }
  let $start = message.start;
  if ($start !== void 0) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $start);
  }
  let $ownEmoji = message.ownEmoji;
  if ($ownEmoji !== void 0) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeImage($ownEmoji, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
  let $ownEmojiDurationMs = message.ownEmojiDurationMs;
  if ($ownEmojiDurationMs !== void 0) {
    writeVarint32(bb, 40);
    writeVarint64(bb, $ownEmojiDurationMs);
  }
  let $offset = message.offset;
  if ($offset !== void 0) {
    writeVarint32(bb, 48);
    writeVarint64(bb, $offset);
  }
  let $scaleUp = message.scaleUp;
  if ($scaleUp !== void 0) {
    writeVarint32(bb, 56);
    writeVarint64(bb, $scaleUp);
  }
  let $reshape = message.reshape;
  if ($reshape !== void 0) {
    writeVarint32(bb, 64);
    writeByte(bb, $reshape ? 1 : 0);
  }
  let $soundUrl = message.soundUrl;
  if ($soundUrl !== void 0) {
    writeVarint32(bb, 74);
    writeString(bb, $soundUrl);
  }
  let $reshapeStart = message.reshapeStart;
  if ($reshapeStart !== void 0) {
    writeVarint32(bb, 80);
    writeVarint64(bb, $reshapeStart);
  }
}
function _decodeSendInteractEmojiConfig(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional Image interactEmoji = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.interactEmoji = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 durationMs = 2;
      case 2: {
        message.durationMs = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 start = 3;
      case 3: {
        message.start = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional Image ownEmoji = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.ownEmoji = _decodeImage(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 ownEmojiDurationMs = 5;
      case 5: {
        message.ownEmojiDurationMs = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 offset = 6;
      case 6: {
        message.offset = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 scaleUp = 7;
      case 7: {
        message.scaleUp = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional bool reshape = 8;
      case 8: {
        message.reshape = !!readByte(bb);
        break;
      }
      // optional string soundUrl = 9;
      case 9: {
        message.soundUrl = readString(bb, readVarint32(bb));
        break;
      }
      // optional int64 reshapeStart = 10;
      case 10: {
        message.reshapeStart = readVarint64(
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
  _encodeRoomHotInfo as A,
  _encodeSeriesPlayGift as B,
  _decodePicoDisplayInfo as C,
  _decodeDisplayControlInfo as D,
  _decodeDoubleLikeDetail as E,
  _encodeDoubleLikeDetail as F,
  _encodeDisplayControlInfo as G,
  _encodePicoDisplayInfo as H,
  _decodeText as _,
  _decodeLandscapeAreaCommon as a,
  _decodeImage as b,
  _decodePublicAreaCommon as c,
  _decodeUser as d,
  _decodeCommon as e,
  _encodeCommon as f,
  _encodeUser as g,
  _encodeImage as h,
  _encodePublicAreaCommon as i,
  _encodeLandscapeAreaCommon as j,
  _encodeText as k,
  _decodeSeriesPlayGift as l,
  _decodeRoomHotInfo as m,
  _decodeExtraEffect as n,
  _decodeSendTogether as o,
  _decodeAnchorGiftData as p,
  _decodeAssetEffectMixInfo as q,
  _decodeGiftTrayInfo as r,
  _decodeGiftStruct as s,
  _decodeGiftIMPriority as t,
  _encodeGiftIMPriority as u,
  _encodeGiftStruct as v,
  _encodeGiftTrayInfo as w,
  _encodeAnchorGiftData as x,
  _encodeSendTogether as y,
  _encodeExtraEffect as z
};
