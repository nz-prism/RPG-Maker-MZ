//=============================================================================
// RPG Maker MZ - PictureMessage
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Displays actor pictures on messages automatically.
 * @author nz_prism
 * @base ActorPictures
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ActorPictures/js/plugins/PictureMessage.js
 *
 * @help PictureMessage.js
 * ver 1.1.0
 *
 * [History]
 * 07/03/2021 1.0.0 Released
 * 07/05/2021 1.1.0 Added picture animation and inverse functionality
 *
 * This plugin displays actor pictures on messages automatically.
 * It requires ActorPictures.js. Configure pictures for each
 * actor with ActorPictures.js first.
 * 
 * To display actor pictures, input "\AP[nPOSITION]" into the
 * name field for the message command. "n" represents Actor ID,
 * whose picture will be displayed. "POSITION" represents the
 * position where the picture stands. It can be specified by
 * words, such as "L" or "Right". See below for the detail. For
 * example, if you want to show the picture of the No. 1 actor
 * at right, input \AP[1R]. When the game is running, these
 * control characters will be replaced with the actor's name.
 * 
 * You don't have to specify face images since they aren't
 * displayed when the actor picture is displayed. However, if
 * you specify a face image with its index, the index will be used
 * as picture index for the actor. It's the same as the plugin
 * command "Set Picture Index" of ActorPictures.js. See the
 * description of ActorPictures.js for the detail. Since this face
 * image will not be displayed, you don't have to prepare multiple
 * face images for each actor.
 * The displayed pictures reeflect damaged, stated and/or picture
 * index in accordance with the actor condition.
 * 
 * You can specify the coordinates of the picture display with the
 * plugin parameters. Note the X axis is aligned with the center of
 * the picture. If you have specified the center X for the picture
 * with the plugin parameter "Picture Calibrations" of
 * ActorPictures.js, that value will be used as the center.
 * If a plugin parameter "Use Bottom as Y Axis Origin" is true, the
 * bottom of the picture will be used as the Y Axis Origin. It's
 * useful if the scale of the pictures are aligned. If not, set it
 * false. If false, the Y axis will be decreased by the value for
 * the plugin parameter "Offset Y" of ActorPictures.js.
 * 
 * The actor pictures aren't erased automatically at the end of the
 * messages. Use a plugin command "Erase Picture" to erase them.
 * It can erase an individual picture or all the pictures at once.
 * 
 * Pictures can be animated. If plugin parameters of ActorPictures.js
 * are set, the pictures will be animated while they are displayed.
 * 
 * 
 * ■ Control Characters for the name field
 *   \AP[nPOSITION]
 * 
 *   Strings for POSITION (case-insensitive)
 *     Left:   L, Left, 左
 *     Center: C, Center, 中
 *     Right:  R, Right, 右
 * 
 *
 * This plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 * 
 * @param pictureMirror
 * @text PictureMirror
 * @desc Settings to invert pictures.
 * 
 * @param leftMirror
 * @parent pictureMirror
 * @text Left Picture Mirror
 * @desc If true, the left picture will be inverted horizontally.
 * @default true
 * @type boolean
 * 
 * @param centerMirror
 * @parent pictureMirror
 * @text Center Picture Mirror
 * @desc If true, the center picture will be inverted horizontally.
 * @default false
 * @type boolean
 * 
 * @param rightMirror
 * @parent pictureMirror
 * @text Right Picture Mirror
 * @desc If true, the right picture will be inverted horizontally.
 * @default false
 * @type boolean
 * 
 * @param pictureCoordinates
 * @text Picture Coordinates
 * @desc The coordinates for the pictures.
 * 
 * @param bottomYOrigin
 * @parent pictureCoordinates
 * @text Use Bottom as Y Axis Origin
 * @desc If true, the bottom of the picture will be used as Y-axis origin. If false, the top will be the origin.
 * @type boolean
 * @default false
 * 
 * @param leftPictureX
 * @parent pictureCoordinates
 * @text Left Picture X
 * @desc The X axis for the left picture. The center of the picture will be the origin.
 * @type number
 * @default 120
 * @min -100000
 * 
 * @param leftPictureY
 * @parent pictureCoordinates
 * @text Left Picture Y
 * @desc The Y axis for the left picture. Note the origin depends on "Use Bottom as Y Axis Origin".
 * @type number
 * @default 0
 * @min -100000
 * 
 * @param centerPictureX
 * @parent pictureCoordinates
 * @text Center Picture 
 * @desc The X axis for the center picture. The center of the picture will be the origin.
 * @type number
 * @default 408
 * @min -100000
 * 
 * @param centerPictureY
 * @parent pictureCoordinates
 * @text Center Picture Y
 * @desc The Y axis for the center picture. Note the origin depends on "Use Bottom as Y Axis Origin".
 * @type number
 * @default 0
 * @min -100000
 * 
 * @param rightPictureX
 * @parent pictureCoordinates
 * @text Right Picture X
 * @desc The X axis for the right picture. The center of the picture will be the origin.
 * @type number
 * @default 696
 * @min -100000
 * 
 * @param rightPictureY
 * @parent pictureCoordinates
 * @text Right Picture Y
 * @desc The Y axis for the right picture. Note the origin depends on "Use Bottom as Y Axis Origin".
 * @type number
 * @default 0
 * @min -100000
 * 
 * @param easing
 * @text Easing
 * @desc The easing values for the appearance/disappearance of pictures.
 * 
 * @param easingOffset
 * @parent easing
 * @text Easing Distance
 * @desc The distance of easing.
 * @type number
 * @default 64
 * @min 0
 * 
 * @param easingFrames
 * @parent easing
 * @text Easing Frames
 * @desc The duration of easing.
 * @type number
 * @default 30
 * @min 1
 * 
 * @param deactiveTone
 * @text Deactive Speaker Tone
 * @desc The tone for actors who aren't speaking.
 * @type struct<rgbg>
 * @default {"red":"0","green":"0","blue":"0","gray":"128"}
 * 
 * @command clearPictures
 * @text Erase Pictures
 * @desc Erases displayed pictures with easing.
 * 
 * @arg targetPosition
 * @text Erase Target
 * @desc The target pictures.
 * @default -1
 * @type select
 * @option All
 * @value -1
 * @option Left Picture
 * @value 0
 * @option Center Picture
 * @value 1
 * @option Right Picture
 * @value 2
 * 
 */

/*~struct~rgbg:
 *
 * @param red
 * @text Red
 * @desc The value of red.
 * @type number
 * @max 255
 * @min -255
 * 
 * @param green
 * @text Green
 * @desc The value of green.
 * @type number
 * @max 255
 * @min -255
 * 
 * @param blue
 * @text Blue
 * @desc The value of blue.
 * @type number
 * @max 255
 * @min -255
 * 
 * @param gray
 * @text Gray
 * @desc The value of gray.
 * @type number
 * @max 255
 * @min 0
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc 会話時に自動的に立ち絵を表示するプラグインです。
 * @author nz_prism
 * @base ActorPictures
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ActorPictures/js/plugins/PictureMessage.js
 *
 * @help PictureMessage.js
 * ver 1.1.0
 *
 * [バージョン履歴]
 * 2021/07/03 1.0.0 リリース
 * 2021/07/05 1.1.0 アニメーションへの対応、位置ごとの反転設定の追加
 *
 * このプラグインを使用すると、会話時に自動的に立ち絵が表示されるようになりま
 * す。ActorPictures.jsが前提プラグインとなります。使用にあたっては、まず
 * はActorPictures.jsにて各アクターに立ち絵を設定してください。
 * 
 * 立ち絵を表示させるには、メッセージの表示コマンドの「名前」欄に専用の制御文
 * 字「\AP[n位置]」と入力してください。「n」はアクターIDを表し、そのアク
 * ターに設定されている立ち絵が表示されます。「位置」は表示位置を表し、立ち絵
 * の表示位置の指定となります。左・右・中央などの文言にて指定できます。詳細は
 * 下記を参照してください。例えばアクターID 1番のアクターの立ち絵を右側に表
 * 示させたい場合、\AP[1右]と入力してください。実際のゲーム中の名前ウィンド
 * ウでは、この制御文字はそのアクターの名前に置き換えられます。
 * 
 * 立ち絵表示時は顔グラフィックが表示されません。そのため顔グラフィックは通常
 * は指定する必要がありませんが、立ち絵インデックスを変更したい場合に使用しま
 * す。顔グラフィックのインデックスによってアクターの立ち絵インデックスが変更
 * されます。これはActorPictures.jsのプラグインコマンド「立ち絵インデック
 * スの設定」とまったく同じ効果です。詳細はActorPictures.jsの説明を参考に
 * してください。なおここで使用する顔グラフィックは実際には表示されませんの
 * で、アクターごとに専用の画像を用意する必要はありません。
 * 表示される立ち絵はアクターの状態に応じてステート差分、ダメージ差分、立ち絵
 * インデックス（表情や衣装差分等）を反映します。
 * 
 * 立ち絵の表示座標はプラグインパラメータにて設定できます。X座標は、立ち絵のX
 * 座標の中心位置を参照することに注意してください。基本的には画像の幅の半分の
 * 値が中心位置になりますが、ActorPictures.jsのプラグインパラメータ「立ち
 * 絵位置調整」にて中心X座標を指定している場合、それが中心位置として使用され
 * ます。
 * プラグインパラメータ「立ち絵Y座標原点を下にする」をオンにすると、画像の下
 * 端がY座標の原点として使用されるようになります。これは、立ち絵素材のスケー
 * ルが統一されている場合に便利な設定です。そうでない場合はオフにしてくださ
 * い。オフにした場合、Y座標はActorPictures.jsのプラグインパラメータ「立ち
 * 絵位置調整」の「Y座標オフセット」にて設定した値の分だけマイナスされます。
 * 
 * 会話終了時、立ち絵は自動的に消えることはありません。イベントが終了しても残
 * り続けます。立ち絵を非表示にするには、プラグインコマンド「立ち絵退場」を使
 * 用してください。個別に退場させることも、全て一括で退場させることも可能です。
 * 
 * 立ち絵のアニメーションにも対応しています。ActorPictures.jsのプラグイン
 * パラメータ「立ち絵アニメ設定」にて設定した立ち絵は、表示されている間アニメ
 * するようになります。
 * 
 * 
 * ■ 名前欄に使用する制御文字
 *   \AP[n位置]
 * 
 *   位置に使用可能な文字列（大文字と小文字の区別なし）
 *     左側: L, Left, 左
 *     中央: C, Center, 中
 *     右側: R, Right, 右
 * 
 *
 * このプラグインはMITライセンスにてリリースされています。
 * https://opensource.org/licenses/mit-license.php
 * 
 * 
 * @param pictureMirror
 * @text 立ち絵反転
 * @desc 立ち絵を反転させるかどうかの設定です
 * 
 * @param leftMirror
 * @parent pictureMirror
 * @text 左立ち絵反転
 * @desc 左側の立ち絵を反転させるかどうかの設定です
 * @default true
 * @type boolean
 * 
 * @param centerMirror
 * @parent pictureMirror
 * @text 中央立ち絵反転
 * @desc 中央の立ち絵を反転させるかどうかの設定です
 * @default false
 * @type boolean
 * 
 * @param rightMirror
 * @parent pictureMirror
 * @text 右立ち絵反転
 * @desc 右側の立ち絵を反転させるかどうかの設定です
 * @default false
 * @type boolean
 * 
 * @param pictureCoordinates
 * @text 立ち絵座標
 * @desc 立ち絵の表示座標です
 * 
 * @param bottomYOrigin
 * @parent pictureCoordinates
 * @text 立ち絵Y座標原点を下にする
 * @desc オンにすると画像の下端が立ち絵のY座標原点になります。オフにすると上端が原点になります。
 * @type boolean
 * @default false
 * 
 * @param leftPictureX
 * @parent pictureCoordinates
 * @text 左立ち絵X座標
 * @desc 左側に表示する立ち絵のX座標です。立ち絵の中心を原点として設定してください。
 * @type number
 * @default 120
 * @min -100000
 * 
 * @param leftPictureY
 * @parent pictureCoordinates
 * @text 左立ち絵Y座標
 * @desc 左側に表示する立ち絵のY座標です。原点に注意して設定してください。
 * @type number
 * @default 0
 * @min -100000
 * 
 * @param centerPictureX
 * @parent pictureCoordinates
 * @text 中央立ち絵X座標
 * @desc 中央に表示する立ち絵のX座標です。立ち絵の中心を原点として設定してください。
 * @type number
 * @default 408
 * @min -100000
 * 
 * @param centerPictureY
 * @parent pictureCoordinates
 * @text 中央立ち絵Y座標
 * @desc 中央に表示する立ち絵のY座標です。原点に注意して設定してください。
 * @type number
 * @default 0
 * @min -100000
 * 
 * @param rightPictureX
 * @parent pictureCoordinates
 * @text 右立ち絵X座標
 * @desc 右側に表示する立ち絵のX座標です。立ち絵の中心を原点として設定してください。
 * @type number
 * @default 696
 * @min -100000
 * 
 * @param rightPictureY
 * @parent pictureCoordinates
 * @text 右立ち絵Y座標
 * @desc 右側に表示する立ち絵のY座標です。原点に注意して設定してください。
 * @type number
 * @default 0
 * @min -100000
 * 
 * @param easing
 * @text イージング
 * @desc 立ち絵の出入り時のイージングの設定です。
 * 
 * @param easingOffset
 * @parent easing
 * @text イージング距離
 * @desc イージングの距離です。
 * @type number
 * @default 64
 * @min 0
 * 
 * @param easingFrames
 * @parent easing
 * @text イージングフレーム数
 * @desc イージングのフレーム数です。
 * @type number
 * @default 30
 * @min 1
 * 
 * @param deactiveTone
 * @text 非アクティブ話者トーン
 * @desc 話していないアクターの立ち絵にかかる色調の設定です。
 * @type struct<rgbg>
 * @default {"red":"0","green":"0","blue":"0","gray":"128"}
 * 
 * @command clearPictures
 * @text 立ち絵退場
 * @desc 表示されている立ち絵をイージングしながら退場させます。
 * 
 * @arg targetPosition
 * @text 退場対象
 * @desc 退場させる立ち絵です。
 * @default -1
 * @type select
 * @option すべて
 * @value -1
 * @option 左側立ち絵
 * @value 0
 * @option 中央立ち絵
 * @value 1
 * @option 右側立ち絵
 * @value 2
 * 
 */

/*~struct~rgbg:ja
 *
 * @param red
 * @text 赤
 * @desc 赤の値です。
 * @type number
 * @max 255
 * @min -255
 * 
 * @param green
 * @text 緑
 * @desc 緑の値です。
 * @type number
 * @max 255
 * @min -255
 * 
 * @param blue
 * @text 青
 * @desc 青の値です。
 * @type number
 * @max 255
 * @min -255
 * 
 * @param gray
 * @text グレー
 * @desc グレーの値です。
 * @type number
 * @max 255
 * @min 0
 * 
 */

(() => {
    'use strict';
    const PLUGIN_NAME = "PictureMessage";
    const pluginParams = PluginManager.parameters(PLUGIN_NAME);

    const PICTURE_MIRRORS = [
        pluginParams.leftMirror === "true",
        pluginParams.centerMirror === "true",
        pluginParams.rightMirror === "true"
    ];

    const BOTTOM_Y_ORIGIN = pluginParams.bottomYOrigin === "true";

    const PICTURE_COORDINATES = [
        {x: Number(pluginParams.leftPictureX),   y: Number(pluginParams.leftPictureY)},
        {x: Number(pluginParams.centerPictureX), y: Number(pluginParams.centerPictureY)},
        {x: Number(pluginParams.rightPictureX),  y: Number(pluginParams.rightPictureY)}
    ];

    const EASING_OFFSET = Number(pluginParams.easingOffset);
    const EASING_FRAMES = Number(pluginParams.easingFrames);

    const DEACTIVE_TONE = Object.values(JSON.parse(pluginParams.deactiveTone)).map(s => Number(s));


    PluginManager.registerCommand(PLUGIN_NAME, "clearPictures", args => {
        $gameMessage.clearSpeakerIds(Number(args.targetPosition));
    });


    const _Game_Message_prototype_initialize = Game_Message.prototype.initialize;
    Game_Message.prototype.initialize = function() {
        _Game_Message_prototype_initialize.call(this);
        this.clearSpeakerIds();
    };

    const _Game_Message_prototype_clear = Game_Message.prototype.clear;
    Game_Message.prototype.clear = function() {
        _Game_Message_prototype_clear.apply(this);
        this._currentPosition = -1;
    };

    Game_Message.prototype.clearSpeakerIds = function(position = -1) {
        if (position === -1) {
            this._speakerIds = [];
        } else {
            this._speakerIds[position] = null;
        }
    };
    
    Game_Message.prototype.currentPosition = function() {
        return this._currentPosition;
    };

    Game_Message.prototype.speaker = function(position) {
        return $gameActors.actor(this._speakerIds[position]);
    };
    
    const _Game_Message_prototype_setSpeakerName = Game_Message.prototype.setSpeakerName;
    Game_Message.prototype.setSpeakerName = function(speakerName) {
        const reg = /\\AP\[(\d+)\s*(.+?)\]/;
        const ary = reg.exec(speakerName);
        let actorId;
        let position = -1;
        if (ary) {
            actorId = ary[1];
            switch (ary[2].toLowerCase()) {
                case "l":
                case "left":
                case "左":
                    position = 0;
                    break;
                case "r":
                case "right":
                case "右":
                    position = 2;
                    break;
                default:
                    position = 1;
                    break;
            }
        }
        if (actorId && position >= 0) {
            const actor = $gameActors.actor(actorId);
            if (this._faceName) {
                actor.setPictureIndex(this._faceIndex);
                this._faceName = "";
            }
            this._currentPosition = position;
            this._speakerIds[position] = actorId;
            this._speakerName = speakerName.replace(reg, actor.name());
        } else {
            _Game_Message_prototype_setSpeakerName.call(this);
        }
    };

    
    const _Spriteset_Base_prototype_createUpperLayer = Spriteset_Base.prototype.createUpperLayer;
    Spriteset_Base.prototype.createUpperLayer = function() {
        _Spriteset_Base_prototype_createUpperLayer.call(this);
        this.createMessagePictureSprites();
    };

    Spriteset_Base.prototype.createMessagePictureSprites = function() {
        this._messagePictureContainer = new Sprite_PictureContainer();
        for (let i=0; i<3; i++) this._messagePictureContainer.addChild(new Sprite_MessagePicture(i));
        this.addChild(this._messagePictureContainer);
    };

    function Sprite_PictureContainer() {
        this.initialize(...arguments);
    }
    
    Sprite_PictureContainer.prototype = Object.create(Sprite.prototype);
    Sprite_PictureContainer.prototype.constructor = Sprite_PictureContainer;

    Sprite_PictureContainer.prototype.update = function() {
        Sprite.prototype.update.call(this);
        this.sortChildren();
    };

    Sprite_PictureContainer.prototype.sortChildren = function() {
        this.children.sort(this.compareChildOrder.bind(this));
    };
    
    Sprite_PictureContainer.prototype.compareChildOrder = function(a, b) {
        if (a.z !== b.z) {
            return a.z - b.z;
        } else if (a.y !== b.y) {
            return a.y - b.y;
        } else {
            return a.spriteId - b.spriteId;
        }
    };


    function Sprite_MessagePicture() {
        this.initialize(...arguments);
    }
    
    Sprite_MessagePicture.prototype = Object.create(Sprite_Clickable.prototype);
    Sprite_MessagePicture.prototype.constructor = Sprite_MessagePicture;
    
    Sprite_MessagePicture.prototype.initialize = function(position) {
        Sprite_Clickable.prototype.initialize.call(this);
        this._position = position;
        this._pictureName = "";
        this.scale.x = PICTURE_MIRRORS[position] ? -1 : 1;
        this.anchor.y = BOTTOM_Y_ORIGIN ? 1 : 0;
        this.setupAnimation("");
    };

    Sprite_MessagePicture.prototype.isSpeaking = function() {
        return this._position === $gameMessage.currentPosition();
    };

    Sprite_MessagePicture.prototype.update = function() {
        Sprite_Clickable.prototype.update.call(this);
        if (!this.updateEasing()) {
            this.updateSpeaker(this.updateBitmap());
            this.updateFrame();
            this.updateAnimation();
            this.updateSpeaking();
        }
    };

    Sprite_MessagePicture.prototype.updateBitmap = function() {
        if (this._changingBitmap) {
            this.changeBitmap(this._pictureName);
            this._changingBitmap = false;
            return true;
        } else {
            return false;
        }
    };

    Sprite_MessagePicture.prototype.updateSpeaker = function(bitmapChanged) {
        let actorChanged = false;
        let easingCondition = bitmapChanged ? 1 : 0;
        const lastActor = this._actor;
        const speaker = $gameMessage.speaker(this._position);
        const pictureName = speaker ? speaker.pictureName() : "";
        if (this._actor !== speaker) {
            this._actor = speaker;
            actorChanged = true;
        }
        if (!bitmapChanged) {
            if (this._pictureName !== pictureName) {
                this._pictureName = pictureName;
                if (actorChanged && lastActor) {
                    this._changingBitmap = true;
                } else {
                    this.changeBitmap(pictureName);
                }
            }
            if (speaker) {
                if (!lastActor) {
                    easingCondition = 1;
                } else {
                    easingCondition = actorChanged ? -1 : 0;
                }
            } else {
                easingCondition = -1;
            }
        }
        switch (easingCondition) {
            case 1:
                this.x = this.easingOffsetX();
                this.y = this.originalY();
                this.opacity = 0;
                this.appearWithEase(EASING_FRAMES);
                break;
            case -1:
                this.opacity = this.originalOpacity();
                this.disappearWithEase(EASING_FRAMES);
                break;
        }
    };

    Sprite_MessagePicture.prototype.updateSpeaking = function() {
        const isSpeaking = this.isSpeaking();
        if (this._isSpeaking !== isSpeaking) {
            this._isSpeaking = isSpeaking;
            if (isSpeaking) {
                this.z = 2;
                this.setColorTone([0, 0, 0, 0]);
            } else {
                this.z = 1;
                this.setColorTone(DEACTIVE_TONE);
            }
        }
    };

    Sprite_MessagePicture.prototype.updateFrame = function() {
        const bitmap = this.bitmap;
        if (bitmap) {
            let pw, px;
            if (this._hasAnimation) {
                const numPattern = this._animationNumPattern;
                const pattern = this._pattern < numPattern ? this._pattern : 0;
                pw = bitmap.width / numPattern;
                px = pw * pattern;
            } else {
                pw = bitmap.width;
                px = 0;
            }
            this.setFrame(px, 0, pw, bitmap.height);
        }
    };

    Sprite_MessagePicture.prototype.updateAnimation = function() {
        if (this._hasAnimation) {
            this._animationCount += this._animationPatternCounts[this._pattern];
            if (this._animationCount >= this._animationRepeatDurations[this._animationRepeatIndex]) {
                this._pattern = (this._pattern + 1) % this._animationNumPattern;
                this._animationCount = 0;
                if (this._pattern === 0) {
                    this._animationRepeatIndex++;
                    if (this._animationRepeatIndex >= this._animationNumRepeat) this._animationRepeatIndex = 0;
                }
            }
        }
    };
    
    Sprite_MessagePicture.prototype.changeBitmap = function(pictureName) {
        const bitmap = ImageManager.loadPicture(pictureName);
        const width = bitmap.width;
        const centerX = ImageManager.centerX(pictureName);
        const cx = (centerX > 0) ? centerX : (width / 2);
        this.bitmap = bitmap;
        this.anchor.x = cx / width;
        this.setupAnimation(pictureName);
    };

    Sprite_MessagePicture.prototype.setupAnimation = function(pictureName) {
        if (ImageManager.hasPictureAnimation(pictureName)) {
            this._hasAnimation = true;
            this._pattern = 0;
            this._animationCount = 0;
            this._animationRepeatIndex = 0;
            this._animationNumPattern = ImageManager.animationNumPattern(pictureName);
            this._animationPatternCounts = ImageManager.animationPatternCounts(pictureName);
            this._animationNumRepeat = ImageManager.animationNumRepeat(pictureName);
            this._animationRepeatDurations = ImageManager.animationRepeatDurations(pictureName);
        } else {
            this._hasAnimation = false;
        }
    };

    Sprite_MessagePicture.prototype.calcEasing = function(t) {
        return Game_Picture.prototype.calcEasing.call(this, t);
    };
    
    Sprite_MessagePicture.prototype.easeIn = function(t, exponent) {
        return Game_Picture.prototype.easeIn.call(this, t, exponent);
    };
    
    Sprite_MessagePicture.prototype.easeOut = function(t, exponent) {
        return Game_Picture.prototype.easeOut.call(this, t, exponent);
    };
    
    Sprite_MessagePicture.prototype.easeInOut = function(t, exponent) {
        return Game_Picture.prototype.easeInOut.call(this, t, exponent);
    };
    
    Sprite_MessagePicture.prototype.ease = function(x, y, opacity, duration, easingType) {
        this._targetX = x;
        this._targetY = y;
        this._targetOpacity = opacity;
        this._easingDuration = duration;
        this._wholeDuration = duration;
        this._easingType = easingType;
        this._easingExponent = 2;
    };
    
    Sprite_MessagePicture.prototype.updateEasing = function() {
        if (this._easingDuration > 0) {
            this.x = this.applyEasing(this.x, this._targetX);
            this.y = this.applyEasing(this.y, this._targetY);
            this.opacity = this.applyEasing(this.opacity, this._targetOpacity);
            this._easingDuration--;
            return true;
        } else {
            return false;
        }
    };
    
    Sprite_MessagePicture.prototype.applyEasing = function(current, target) {
        const d = this._easingDuration;
        const wd = this._wholeDuration;
        const lt = this.calcEasing((wd - d) / wd);
        const t = this.calcEasing((wd - d + 1) / wd);
        const start = (current - target * lt) / (1 - lt);
        return start + (target - start) * t;
    };
    
    Sprite_MessagePicture.prototype.isEasing = function() {
        return this._easingDuration > 0;
    };
    
    Sprite_MessagePicture.prototype.appearWithEase = function(duration=30) {
        this.ease(this.originalX(), this.originalY(), this.originalOpacity(), duration, 2);
    };
    
    Sprite_MessagePicture.prototype.disappearWithEase = function(duration=30) {
        this.ease(this.easingOffsetX(), this.easingOffsetY(), 0, duration, 1);
    };
    
    Sprite_MessagePicture.prototype.originalX = function() {
        return PICTURE_COORDINATES[this._position].x;
    };
    
    Sprite_MessagePicture.prototype.originalY = function() {
        let y = PICTURE_COORDINATES[this._position].y;
        if (!BOTTOM_Y_ORIGIN) y -= ImageManager.offsetY(this._pictureName);
        return y;
    };
    
    Sprite_MessagePicture.prototype.originalOpacity = function() {
        return 255;
    };
    
    Sprite_MessagePicture.prototype.easingOffsetX = function() {
        return this._position === 0 ? this.originalX() - EASING_OFFSET : this.originalX() + EASING_OFFSET;
    };
    
    Sprite_MessagePicture.prototype.easingOffsetY = function() {
        return this.y;
    };

})();
