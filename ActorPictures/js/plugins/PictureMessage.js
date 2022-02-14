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
 * ver 1.3.3
 *
 * [History]
 * 07/03/2021 1.0.0 Released
 * 07/05/2021 1.1.0 Added picture animation and inverse functionality
 * 07/06/2021 1.1.1 Fixed easing direction did not reflect the mirror settings
 * 07/10/2021 1.2.0 Added some commands and enabled picture states to be saved
 * 07/12/2021 1.3.0 Enabled an actor picture is shown in battle
 * 07/13/2021 1.3.1 Fixed battle picture issues on TPB
 * 12/28/2021 1.3.2 Fixed the balloon icon position
 * 02/14/2022 1.3.3 Changed the default balloon icon position
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
 * If a plugin parameter "Show Picture on Battle Command" is true,
 * when inputting the actor command, the actor picture will be shown.
 * If a picture is already shown at the same position, the actor for
 * the command will replace it.
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
 * @param bottomYOrigin
 * @text Use Bottom as Y Axis Origin
 * @desc If true, the bottom of the picture will be used as Y-axis origin. If false, the top will be the origin.
 * @type boolean
 * @default false
 * 
 * @param defaultPictureSettings
 * @text Default Picture Settings
 * @desc The default settings for each picture.
 * 
 * @param pictureCoordinates
 * @parent defaultPictureSettings
 * @text Coordinates
 * @desc The coordinates for the pictures.
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
 * @param pictureMirror
 * @parent defaultPictureSettings
 * @text Mirror
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
 * @param deactiveToneSettings
 * @text Deactive Tone Settings
 * @desc The tone settings for actors who aren't speaking.
 * 
 * @param deactiveTone
 * @parent deactiveToneSettings
 * @text Deactive Speaker Tone
 * @desc The tone for actors who aren't speaking.
 * @type struct<rgbg>
 * @default {"red":"0","green":"0","blue":"0","gray":"128"}
 * 
 * @param deactiveFrames
 * @parent deactiveToneSettings
 * @text Deactive Frames
 * @desc The duration of tone change.
 * @type number
 * @default 15
 * @min 1
 * 
 * @param showPictureOnBattleCommand
 * @text Show Picture on Battle Command
 * @desc If true, when inputting the battle actor command, the actor picture will be shown.
 * @type boolean
 * @default true
 * 
 * @param battleCommandPicturePosition
 * @parent showPictureOnBattleCommand
 * @text Battle Command Picture Position
 * @desc The position where the actor picture stands when inputting the battle actor command.
 * @default 2
 * @type select
 * @option Left
 * @value 0
 * @option Center
 * @value 1
 * @option Right
 * @value 2
 * 
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
 * @command activateAllPictures
 * @text Activate All Pictures
 * @desc Change tones for all the actor pictures into active tones.
 * 
 * @command showPicture
 * @text Show Picture
 * @desc Show an actor picture.
 * 
 * @arg position
 * @text Position
 * @desc The position where the picture stands.
 * @default 0
 * @type select
 * @option Left
 * @value 0
 * @option Center
 * @value 1
 * @option Right
 * @value 2
 * 
 * @arg actorId
 * @text Actor
 * @desc The actor whose picture will be shown.
 * @default 1
 * @type actor
 * 
 * @arg leaveX
 * @text Leave X
 * @desc Leave the x axis as it is.
 * @type boolean
 * @default true
 * 
 * @arg targetX
 * @parent leaveX
 * @text Target X
 * @desc The X axis to be moved to. Specify it if Leave X is false.
 * @type number
 * @default 0
 * @min -100000
 * 
 * @arg leaveY
 * @text Leave Y
 * @desc The Y axis to be moved to. Specify it if Leave Y is false.
 * @type boolean
 * @default true
 * 
 * @arg targetY
 * @parent leaveY
 * @text Target Y
 * @desc The Y axis to be moved to. Specify it if Leave Y is false.
 * @type number
 * @default 0
 * @min -100000
 * 
 * @arg scaleX
 * @text Width Scale
 * @desc The width scale in percentage. If it's negative value, the picture will be inverted horizontally.
 * @type number
 * @default 100
 * @min -2000
 * @max 2000
 * 
 * @arg scaleY
 * @text Height Scale
 * @desc The height scale in percentage. If it's negative value, the picture will be inverted vertically.
 * @type number
 * @default 100
 * @min -2000
 * @max 2000
 * 
 * @arg opacity
 * @text Opacity
 * @desc The opacity to be.
 * @type number
 * @default 255
 * @min -255
 * @max 255
 * 
 * @arg blendMode
 * @text Blend Mode
 * @desc The blend mode with which the picture will be drawn.
 * @default 0
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * 
 * @command movePicture
 * @text Move Picture
 * @desc Moves an actor picture.
 * 
 * @arg position
 * @text Position
 * @desc The position where the actor picture to be moved stands.
 * @default 0
 * @type select
 * @option Left
 * @value 0
 * @option Center
 * @value 1
 * @option Right
 * @value 2
 * 
 * @arg easingType
 * @text Easing Type
 * @desc The type of easing.
 * @default 0
 * @type select
 * @option Constant speed
 * @value 0
 * @option Slow start
 * @value 1
 * @option Slow end
 * @value 2
 * @option Slow start and end
 * @value 3
 * 
 * @arg leaveX
 * @text Leave X
 * @desc Leave the x axis as it is.
 * @type boolean
 * @default true
 * 
 * @arg targetX
 * @parent leaveX
 * @text Target X
 * @desc The X axis to be moved to. Specify it if Leave X is false.
 * @type number
 * @default 0
 * @min -100000
 * 
 * @arg leaveY
 * @text Leave Y
 * @desc The Y axis to be moved to. Specify it if Leave Y is false.
 * @type boolean
 * @default true
 * 
 * @arg targetY
 * @parent leaveY
 * @text Target Y
 * @desc The Y axis to be moved to. Specify it if Leave Y is false.
 * @type number
 * @default 0
 * @min -100000
 * 
 * @arg scaleX
 * @text Width Scale
 * @desc The width scale in percentage. If it's negative value, the picture will be inverted horizontally.
 * @type number
 * @default 100
 * @min -2000
 * @max 2000
 * 
 * @arg scaleY
 * @text Height Scale
 * @desc The height scale in percentage. If it's negative value, the picture will be inverted vertically.
 * @type number
 * @default 100
 * @min -2000
 * @max 2000
 * 
 * @arg opacity
 * @text Opacity
 * @desc The opacity to be.
 * @type number
 * @default 255
 * @min -255
 * @max 255
 * 
 * @arg blendMode
 * @text Blend Mode
 * @desc The blend mode with which the picture will be drawn.
 * @default 0
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * 
 * @arg duration
 * @text Duration
 * @desc The duration for move.
 * @type number
 * @default 60
 * @min 1
 * 
 * @arg waitForCompletion
 * @text Wait for Completion
 * @desc It waits until the move ends.
 * @type boolean
 * @default false
 * 
 * @command rotatePicture
 * @text Rotate Picture
 * @desc Rotates an actor picture.
 * 
 * @arg targetMessagePicture
 * @text Target Picture
 * @desc The picture to be rotated.
 * @default leftMessagePicture
 * @type select
 * @option Left Picture
 * @value leftMessagePicture
 * @option Center Picture
 * @value centerMessagePicture
 * @option Right Picture
 * @value rightMessagePicture
 * 
 * @arg speed
 * @text Speed
 * @desc The speed at which the picture rotation angle increments. Positive value represents counterclockwise.
 * @default 0
 * @type number
 * @min -90
 * @max 90
 * 
 * @command tintPicture
 * @text Tint Picture
 * @desc Tints an actor picture.
 * 
 * @arg targetMessagePicture
 * @text Target Picture
 * @desc The picture to be tinted.
 * @default leftMessagePicture
 * @type select
 * @option Left Picture
 * @value leftMessagePicture
 * @option Center Picture
 * @value centerMessagePicture
 * @option Right Picture
 * @value rightMessagePicture
 * 
 * @arg tone
 * @text Tone
 * @desc The tone to be.
 * @type struct<rgbg>
 * @default {"red":"0","green":"0","blue":"0","gray":"0"}
 * 
 * @arg duration
 * @text Dration
 * @desc The duration for tint.
 * @type number
 * @default 60
 * @min 1
 * @max 999
 * 
 * @arg waitForCompletion
 * @text Wait for Completion
 * @desc It waits until the tint ends.
 * @type boolean
 * @default false
 * 
 * @command initPicture
 * @text Initialize Picture
 * @desc Initializes the settings for an actor picture.
 * 
 * @arg position
 * @text Position
 * @desc The position where the actor picture to be initialized stands.
 * @default 0
 * @type select
 * @option Left
 * @value 0
 * @option Center
 * @value 1
 * @option Right
 * @value 2
 * 
 * @command showBalloon
 * @text Show Balloon Icon
 * @desc Shows a balloon icon for an actor picture.
 * 
 * @arg targetMessagePicture
 * @text Target Picture
 * @desc The picture at which the balloon icon to be shown.
 * @default leftMessagePicture
 * @type select
 * @option Left Picture
 * @value leftMessagePicture
 * @option Center Picture
 * @value centerMessagePicture
 * @option Right Picture
 * @value rightMessagePicture
 * 
 * @arg balloonId
 * @text Balloon Icon
 * @desc The balloon icon to be shown.
 * @default 1
 * @type select
 * @option Exclamation
 * @value 1
 * @option Question
 * @value 2
 * @option Music Note
 * @value 3
 * @option Heart
 * @value 4
 * @option Anger
 * @value 5
 * @option Sweat
 * @value 6
 * @option Frustration
 * @value 7
 * @option Silence
 * @value 8
 * @option Light Bulb
 * @value 9
 * @option Zzz
 * @value 10
 * @option User-defined 1
 * @value 11
 * @option User-defined 2
 * @value 12
 * @option User-defined 3
 * @value 13
 * @option User-defined 4
 * @value 14
 * @option User-defined 5
 * @value 15
 * 
 * @arg offsetX
 * @text Balloon Offset X
 * @desc The offset value from the standard X axis.
 * @type number
 * @default 0
 * @min -100000
 * 
 * @arg offsetY
 * @text Balloon Offset Y
 * @desc The offset value from the standard Y axis.
 * @type number
 * @default 0
 * @min -100000
 * 
 * @arg scaleX
 * @text Balloon Width Scale
 * @desc The width scale for the balloon icon in percentage.
 * @type number
 * @default 200
 * @min 10
 * 
 * @arg scaleY
 * @text Balloon Height Scale
 * @desc The height scale for the balloon icon in percentage.
 * @type number
 * @default 200
 * @min 10
 * 
 * @command showAnimation
 * @text Show Animation
 * @desc Shows an animation for an actor picture.
 * 
 * @arg targetMessagePicture
 * @text Target Picture
 * @desc The picture at which the animation to be shown.
 * @default leftMessagePicture
 * @type select
 * @option Left Picture
 * @value leftMessagePicture
 * @option Center Picture
 * @value centerMessagePicture
 * @option Right Picture
 * @value rightMessagePicture
 * 
 * @arg animationId
 * @text Animation
 * @desc The animation to be shown.
 * @type animation
 * @default 1
 * 
 * @arg mirror
 * @text Animation Mirror
 * @desc Inverts the animation horizontally.
 * @type boolean
 * @default false
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
 * ver 1.3.3
 *
 * [バージョン履歴]
 * 2021/07/03 1.0.0 リリース
 * 2021/07/05 1.1.0 アニメーションへの対応、位置ごとの反転設定の追加
 * 2021/07/06 1.1.1 イージングの方向が立ち絵反転設定を反映していなかった不具合を修正
 * 2021/07/10 1.2.0 多数のプラグインコマンドを追加、立ち絵状態をセーブ可能に
 * 2021/07/12 1.3.0 戦闘中コマンド入力時立ち絵表示機能を追加
 * 2021/07/13 1.3.1 タイムプログレスバトル時の立ち絵表示の不具合を修正
 * 2021/12/28 1.3.2 フキダシアイコンの位置がおかしかったのを修正
 * 2022/02/14 1.3.3 フキダシアイコンのデフォルト表示位置を変更
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
 * プラグインパラメータ「戦闘コマンド入力時立ち絵表示」をオンにすると、戦闘中
 * アクターコマンド入力時にそのアクターの立ち絵が表示されるようになります。同
 * じ位置に立ち絵が表示されていた場合、その立ち絵と入れ替わります。
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
 * @param bottomYOrigin
 * @text 立ち絵Y座標原点を下にする
 * @desc オンにすると画像の下端が立ち絵のY座標原点になります。オフにすると上端が原点になります。
 * @type boolean
 * @default false
 * 
 * @param defaultPictureSettings
 * @text 立ち絵デフォルト設定
 * @desc 各立ち絵のデフォルト設定です。
 * 
 * @param pictureCoordinates
 * @parent defaultPictureSettings
 * @text 座標
 * @desc 立ち絵の表示座標です。
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
 * @param pictureMirror
 * @parent defaultPictureSettings
 * @text 反転
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
 * @param deactiveToneSettings
 * @text 非アクティブ話者色調設定
 * @desc 話していないアクターの立ち絵にかかる色調の設定です。
 * 
 * @param deactiveTone
 * @parent deactiveToneSettings
 * @text 非アクティブ話者色調
 * @desc 話していないアクターの立ち絵にかかる色調です。
 * @type struct<rgbg>
 * @default {"red":"0","green":"0","blue":"0","gray":"128"}
 * 
 * @param deactiveFrames
 * @parent deactiveToneSettings
 * @text 非アクティブ話者色調変化フレーム数
 * @desc 話していないアクターの立ち絵にかかる色調変化のフレーム数です。
 * @type number
 * @default 15
 * @min 1
 * 
 * @param showPictureOnBattleCommand
 * @text 戦闘コマンド入力時立ち絵表示
 * @desc オンにすると戦闘中のアクターコマンド入力時、そのアクターの立ち絵が表示されます。
 * @type boolean
 * @default true
 * 
 * @param battleCommandPicturePosition
 * @parent showPictureOnBattleCommand
 * @text 戦闘コマンド入力時立ち絵位置
 * @desc 戦闘中のアクターコマンド入力時に表示されるアクターの立ち絵の位置です。
 * @default 2
 * @type select
 * @option 左側
 * @value 0
 * @option 中央
 * @value 1
 * @option 右側
 * @value 2
 * 
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
 * @command activateAllPictures
 * @text すべての立ち絵をアクティブ話者色調にする
 * @desc 表示されているすべての立ち絵の色調をアクティブ状態にします。
 * 
 * @command showPicture
 * @text 立ち絵の表示
 * @desc 立ち絵を表示させます。
 * 
 * @arg position
 * @text 立ち絵表示位置
 * @desc 立ち絵を表示させる位置です。
 * @default 0
 * @type select
 * @option 左側
 * @value 0
 * @option 中央
 * @value 1
 * @option 右側
 * @value 2
 * 
 * @arg actorId
 * @text アクター
 * @desc 立ち絵を表示させるアクターです。
 * @default 1
 * @type actor
 * 
 * @arg leaveX
 * @text X座標移動なし
 * @desc X座標を現在の値のままにします。
 * @type boolean
 * @default true
 * 
 * @arg targetX
 * @parent leaveX
 * @text 対象X座標
 * @desc 移動先のX座標です。X座標移動なしがオフの場合に設定してください。
 * @type number
 * @default 0
 * @min -100000
 * 
 * @arg leaveY
 * @text Y座標移動なし
 * @desc Y座標を現在の値のままにします。
 * @type boolean
 * @default true
 * 
 * @arg targetY
 * @parent leaveY
 * @text 対象Y座標
 * @desc 移動先のY座標です。Y座標移動なしがオフの場合に設定してください。
 * @type number
 * @default 0
 * @min -100000
 * 
 * @arg scaleX
 * @text 幅拡大率
 * @desc 立ち絵の幅の拡大率（パーセント）です。マイナスにすると水平方向に反転します。
 * @type number
 * @default 100
 * @min -2000
 * @max 2000
 * 
 * @arg scaleY
 * @text 高さ拡大率
 * @desc 立ち絵の高さの拡大率（パーセント）です。マイナスにすると垂直方向に反転します。
 * @type number
 * @default 100
 * @min -2000
 * @max 2000
 * 
 * @arg opacity
 * @text 不透明度
 * @desc 変化後の不透明度です。
 * @type number
 * @default 255
 * @min -255
 * @max 255
 * 
 * @arg blendMode
 * @text 合成方法
 * @desc 立ち絵の描画の合成方法です。
 * @default 0
 * @type select
 * @option 通常
 * @value 0
 * @option 加算
 * @value 1
 * @option 乗算
 * @value 2
 * @option スクリーン
 * @value 3
 * 
 * @command movePicture
 * @text 立ち絵の移動
 * @desc 表示されている立ち絵を移動させます。
 * 
 * @arg position
 * @text 移動対象立ち絵
 * @desc 移動させる立ち絵です。
 * @default 0
 * @type select
 * @option 左側立ち絵
 * @value 0
 * @option 中央立ち絵
 * @value 1
 * @option 右側立ち絵
 * @value 2
 * 
 * @arg easingType
 * @text イージングタイプ
 * @desc イージングの種類です。
 * @default 0
 * @type select
 * @option 一定速度
 * @value 0
 * @option ゆっくり始まる
 * @value 1
 * @option ゆっくり終わる
 * @value 2
 * @option ゆっくり始まってゆっくり終わる
 * @value 3
 * 
 * @arg leaveX
 * @text X座標移動なし
 * @desc X座標を現在の値のままにします。
 * @type boolean
 * @default false
 * 
 * @arg targetX
 * @parent leaveX
 * @text 対象X座標
 * @desc 移動先のX座標です。X座標移動なしがオフの場合に設定してください。
 * @type number
 * @default 0
 * @min -100000
 * 
 * @arg leaveY
 * @text Y座標移動なし
 * @desc Y座標を現在の値のままにします。
 * @type boolean
 * @default false
 * 
 * @arg targetY
 * @parent leaveY
 * @text 対象Y座標
 * @desc 移動先のY座標です。Y座標移動なしがオフの場合に設定してください。
 * @type number
 * @default 0
 * @min -100000
 * 
 * @arg scaleX
 * @text 幅拡大率
 * @desc 立ち絵の幅の拡大率（パーセント）です。マイナスにすると水平方向に反転します。
 * @type number
 * @default 100
 * @min -2000
 * @max 2000
 * 
 * @arg scaleY
 * @text 高さ拡大率
 * @desc 立ち絵の高さの拡大率（パーセント）です。マイナスにすると垂直方向に反転します。
 * @type number
 * @default 100
 * @min -2000
 * @max 2000
 * 
 * @arg opacity
 * @text 不透明度
 * @desc 変化後の不透明度です。
 * @type number
 * @default 255
 * @min -255
 * @max 255
 * 
 * @arg blendMode
 * @text 合成方法
 * @desc 立ち絵の描画の合成方法です。
 * @default 0
 * @type select
 * @option 通常
 * @value 0
 * @option 加算
 * @value 1
 * @option 乗算
 * @value 2
 * @option スクリーン
 * @value 3
 * 
 * @arg duration
 * @text 時間
 * @desc 持続フレームです。
 * @type number
 * @default 60
 * @min 1
 * 
 * @arg waitForCompletion
 * @text 完了までウェイト
 * @desc 効果が終わるまで待ちます。
 * @type boolean
 * @default false
 * 
 * @command rotatePicture
 * @text 立ち絵の回転
 * @desc 立ち絵を回転させます。
 * 
 * @arg targetMessagePicture
 * @text 回転対象立ち絵
 * @desc 回転させる立ち絵です。
 * @default leftMessagePicture
 * @type select
 * @option 左側立ち絵
 * @value leftMessagePicture
 * @option 中央立ち絵
 * @value centerMessagePicture
 * @option 右側立ち絵
 * @value rightMessagePicture
 * 
 * @arg speed
 * @text 速度
 * @desc 立ち絵を回転させる角度の増減値です。正の値が反時計回りです。
 * @default 0
 * @type number
 * @min -90
 * @max 90
 * 
 * @command tintPicture
 * @text 立ち絵の色調変更
 * @desc 立ち絵の色調を変更します。
 * 
 * @arg targetMessagePicture
 * @text 色調変更対象立ち絵
 * @desc 色調変更させる立ち絵です。
 * @default leftMessagePicture
 * @type select
 * @option 左側立ち絵
 * @value leftMessagePicture
 * @option 中央立ち絵
 * @value centerMessagePicture
 * @option 右側立ち絵
 * @value rightMessagePicture
 * 
 * @arg tone
 * @text 色調
 * @desc 変更する色調です。
 * @type struct<rgbg>
 * @default {"red":"0","green":"0","blue":"0","gray":"0"}
 * 
 * @arg duration
 * @text 時間
 * @desc 色調を変更する時間です。
 * @type number
 * @default 60
 * @min 1
 * @max 999
 * 
 * @arg waitForCompletion
 * @text 完了までウェイト
 * @desc 効果が終わるまで待ちます。
 * @type boolean
 * @default true
 * 
 * @command initPicture
 * @text 立ち絵の初期化
 * @desc 立ち絵の表示設定を初期化します。
 * 
 * @arg position
 * @text 初期化対象立ち絵
 * @desc 初期化させる立ち絵です。
 * @default 0
 * @type select
 * @option 左側立ち絵
 * @value 0
 * @option 中央立ち絵
 * @value 1
 * @option 右側立ち絵
 * @value 2
 * 
 * @command showBalloon
 * @text フキダシアイコンの表示
 * @desc 立ち絵にフキダシアイコンを表示します。
 * 
 * @arg targetMessagePicture
 * @text 対象立ち絵
 * @desc フキダシを表示する対象の立ち絵です。
 * @default leftMessagePicture
 * @type select
 * @option 左側立ち絵
 * @value leftMessagePicture
 * @option 中央立ち絵
 * @value centerMessagePicture
 * @option 右側立ち絵
 * @value rightMessagePicture
 * 
 * @arg balloonId
 * @text フキダシアイコンタイプ
 * @desc 表示する吹き出しの種類です。
 * @default 1
 * @type select
 * @option びっくり
 * @value 1
 * @option はてな
 * @value 2
 * @option 音符
 * @value 3
 * @option ハート
 * @value 4
 * @option 怒り
 * @value 5
 * @option 汗
 * @value 6
 * @option くしゃくしゃ
 * @value 7
 * @option 沈黙
 * @value 8
 * @option 電球
 * @value 9
 * @option Zzz
 * @value 10
 * @option ユーザー定義1
 * @value 11
 * @option ユーザー定義2
 * @value 12
 * @option ユーザー定義3
 * @value 13
 * @option ユーザー定義4
 * @value 14
 * @option ユーザー定義5
 * @value 15
 * 
 * @arg offsetX
 * @text フキダシオフセットX
 * @desc フキダシアイコンの基準X座標からのオフセット距離です。
 * @type number
 * @default 0
 * @min -100000
 * 
 * @arg offsetY
 * @text フキダシオフセットY
 * @desc フキダシアイコンの基準Y座標からのオフセット距離です。
 * @type number
 * @default 0
 * @min -100000
 * 
 * @arg scaleX
 * @text フキダシ幅拡大率
 * @desc フキダシアイコンの幅の拡大率（パーセント）です。マイナスにすると水平方向に反転します。
 * @type number
 * @default 200
 * @min -100000
 * 
 * @arg scaleY
 * @text フキダシ高さ拡大率
 * @desc フキダシアイコンの高さの拡大率（パーセント）です。マイナスにすると垂直方向に反転します。
 * @type number
 * @default 200
 * @min -100000
 * 
 * @command showAnimation
 * @text アニメーションの表示
 * @desc 立ち絵にアニメーションを表示します。
 * 
 * @arg targetMessagePicture
 * @text 対象立ち絵
 * @desc アニメーションを表示する対象の立ち絵です。
 * @default leftMessagePicture
 * @type select
 * @option 左側立ち絵
 * @value leftMessagePicture
 * @option 中央立ち絵
 * @value centerMessagePicture
 * @option 右側立ち絵
 * @value rightMessagePicture
 * 
 * @arg animationId
 * @text アニメーション
 * @desc 表示するアニメーションです。
 * @type animation
 * @default 1
 * 
 * @arg mirror
 * @text アニメーション反転
 * @desc 表示するアニメーションを反転させます。
 * @type boolean
 * @default false
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


function Game_MessagePicture() {
    this.initialize(...arguments);
}
Game_MessagePicture.prototype = Object.create(Game_Picture.prototype);
Game_MessagePicture.prototype.constructor = Game_MessagePicture;


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
    const DEACTIVE_FRAMES = Number(pluginParams.deactiveFrames);

    const SHOW_PICTURE_ON_BATTLE_COMMAND = pluginParams.showPictureOnBattleCommand === "true";
    const BATTLE_COMMAND_PICTURE_POSITION = Number(pluginParams.battleCommandPicturePosition);


    PluginManager.registerCommand(PLUGIN_NAME, "clearPictures", args => {
        $gameScreen.clearSpeaker(Number(args.targetPosition));
    });

    PluginManager.registerCommand(PLUGIN_NAME, "activateAllPictures", args => {
        $gameScreen.clearSpeakerIndex();
    });

    PluginManager.registerCommand(PLUGIN_NAME, "showPicture", function(args) {
        const position = Number(args.position);
        const picture = $gameScreen.messagePicture(position);
        const actorId = Number(args.actorId);
        const x = (args.leaveX === "true") ? picture.x() : Number(args.targetX);
        const y = (args.leaveY === "true") ? picture.y() : Number(args.targetY);
        let scaleX = Number(args.scaleX);
        if (PICTURE_MIRRORS[position]) scaleX *= -1;
        const scaleY = Number(args.scaleY);
        const opacity = Number(args.opacity);
        const blend = Number(args.blendMode);
        $gameScreen.setSpeaker(position, actorId);
        picture.movePosition(0, x, y, scaleX, scaleY, opacity, blend, 1, 0);
    });

    PluginManager.registerCommand(PLUGIN_NAME, "movePicture", function(args) {
        const position = Number(args.position);
        const picture = $gameScreen.messagePicture(position);
        const x = (args.leaveX === "true") ? picture.x() : Number(args.targetX);
        const y = (args.leaveY === "true") ? picture.y() : Number(args.targetY);
        let scaleX = Number(args.scaleX);
        if (PICTURE_MIRRORS[position]) scaleX *= -1;
        const scaleY = Number(args.scaleY);
        const opacity = Number(args.opacity);
        const blend = Number(args.blendMode);
        const duration = Number(args.duration);
        picture.movePosition(0, x, y, scaleX, scaleY, opacity, blend, duration, Number(args.easingType));
        if (args.waitForCompletion === "true") this.wait(duration);
    });

    PluginManager.registerCommand(PLUGIN_NAME, "rotatePicture", args => {
        $gameScreen.rotatePicture(args.targetMessagePicture, Number(args.speed));
    });

    PluginManager.registerCommand(PLUGIN_NAME, "tintPicture", function(args) {
        const tone = Object.values(JSON.parse(args.tone)).map(s => Number(s));
        const duration = Number(args.duration);
        $gameScreen.tintPicture(args.targetMessagePicture, tone, duration);
        if (args.waitForCompletion === "true") this.wait(duration);
    });

    PluginManager.registerCommand(PLUGIN_NAME, "initPicture", args => {
        const picture = $gameScreen.messagePicture(Number(args.position));
        picture.applyDefaultBasic();
        picture.initRotation();
    });

    PluginManager.registerCommand(PLUGIN_NAME, "showBalloon", args => {
        const offsetX = Number(args.offsetX);
        const offsetY = Number(args.offsetY);
        const scaleX = Number(args.scaleX) / 100;
        const scaleY = Number(args.scaleY) / 100;
        $gameTemp.requestBalloon(args.targetMessagePicture, Number(args.balloonId), offsetX, offsetY, scaleX, scaleY);
    });

    PluginManager.registerCommand(PLUGIN_NAME, "showAnimation", args => {
        $gameTemp.requestAnimation([args.targetMessagePicture], Number(args.animationId), args.mirror === "true");
    });


    const _BattleManager_startActorInput = BattleManager.startActorInput;
    BattleManager.startActorInput = function() {
        _BattleManager_startActorInput.call(this);
        if (SHOW_PICTURE_ON_BATTLE_COMMAND && this._currentActor) {
            $gameScreen.setSpeaker(BATTLE_COMMAND_PICTURE_POSITION, this._currentActor.actorId());
        }
    };

    const _BattleManager_finishActorInput = BattleManager.finishActorInput;
    BattleManager.finishActorInput = function() {
        _BattleManager_finishActorInput.call(this);
        if (SHOW_PICTURE_ON_BATTLE_COMMAND) $gameScreen.clearSpeaker(BATTLE_COMMAND_PICTURE_POSITION);
    };


    Game_Temp.prototype.requestBalloon = function(target, balloonId, offsetX, offsetY, scaleX, scaleY) {
        const request = {
            target: target,
            balloonId: balloonId,
            offsetX: offsetX,
            offsetY: offsetY,
            scaleX: scaleX,
            scaleY: scaleY
        };
        this._balloonQueue.push(request);
        if (target.startBalloon) target.startBalloon();
    };

    const _Game_Screen_prototype_clear = Game_Screen.prototype.clear;
    Game_Screen.prototype.clear = function() {
        _Game_Screen_prototype_clear.call(this);
        this.clearMessagePictureSettings();
    };

    Game_Screen.prototype.clearMessagePictureSettings = function() {
        this._messagePictures = [];
        for (let i=0; i<3; i++) {
            this._messagePictures[i] = new Game_MessagePicture(i);
        }
        this._speakers = [];
        this._speakerIndex = -1;
    };

    Game_Screen.prototype.messagePicture = function(position) {
        return this._messagePictures[position];
    };

    Game_Screen.prototype.speaker = function(position) {
        return $gameActors.actor(this._speakers[position]);
    };

    Game_Screen.prototype.clearSpeakerIndex = function() {
        this._speakerIndex = -1;
    };

    Game_Screen.prototype.speakerIndex = function() {
        return this._speakerIndex;
    };

    Game_Screen.prototype.clearSpeaker = function(position = -1) {
        if (position === -1) {
            this._speakers = [];
        } else {
            this._speakers[position] = null;
        }
    };

    Game_Screen.prototype.setSpeaker = function(position, actorId) {
        this._speakers[position] = actorId;
        this._speakerIndex = position;
    };

    const _Game_Screen_prototype_update = Game_Screen.prototype.update;
    Game_Screen.prototype.update = function() {
        _Game_Screen_prototype_update.call(this);
        this.updateMessagePictures();
    };

    Game_Screen.prototype.updateMessagePictures = function() {
        for (const picture of this._messagePictures) {
            if (picture) picture.update();
        }
    };

    const _Game_Screen_prototype_rotatePicture = Game_Screen.prototype.rotatePicture;
    Game_Screen.prototype.rotatePicture = function(pictureId, speed) {
        switch (pictureId) {
            case "leftMessagePicture":
                this._messagePictures[0].rotate(speed);
                break;
            case "centerMessagePicture":
                this._messagePictures[1].rotate(speed);
                break;
            case "rightMessagePicture":
                this._messagePictures[2].rotate(speed);
                break;
            default:
                return _Game_Screen_prototype_rotatePicture.apply(this, arguments);
        }
    };
    
    const _Game_Screen_prototype_tintPicture = Game_Screen.prototype.tintPicture;
    Game_Screen.prototype.tintPicture = function(pictureId, tone, duration) {
        switch (pictureId) {
            case "leftMessagePicture":
                this._messagePictures[0].tint(tone, duration);
                break;
            case "centerMessagePicture":
                this._messagePictures[1].tint(tone, duration);
                break;
            case "rightMessagePicture":
                this._messagePictures[2].tint(tone, duration);
                break;
            default:
                return _Game_Screen_prototype_tintPicture.apply(this, arguments);
        }
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
            $gameScreen.setSpeaker(position, actorId);
            this._speakerName = speakerName.replace(reg, actor.name());
        } else {
            _Game_Message_prototype_setSpeakerName.call(this, speakerName);
        }
    };


    Game_MessagePicture.prototype.initialize = function(position) {
        Game_Picture.prototype.initialize.call(this);
        this.initPrimaryMembers(position);
        this.initAnimation();
        this.applyDefaultBasic();
    };

    Game_MessagePicture.prototype.initPrimaryMembers = function(position) {
        this._position = position;
        this._width = 1;
        this._height = 1;
        this._offsetY = 0;
        this._changingName = "";
    };

    Game_MessagePicture.prototype.applyDefaultBasic = function() {
        this._x = PICTURE_COORDINATES[this._position].x;
        this._y = PICTURE_COORDINATES[this._position].y;
        this._z = 5;
        if (!BOTTOM_Y_ORIGIN) this._y -= this._offsetY;
        this._scaleX = PICTURE_MIRRORS[this._position] ? -100 : 100;
        this._scaleY = 100;
        this._opacity = 255;
        this._blendMode = 0;
        this._tone = [0, 0, 0, 0];
        this._originalX = this._x;
        this._originalY = this._y;
        this._originalOpacity = this._opacity;
        this._originalTone = [0, 0, 0, 0];
    };

    Game_MessagePicture.prototype.initAnimation = function() {
        this._hasAnimation = false;
        this._pattern = 0;
        this._animationCount = 0;
        this._animationRepeatIndex = 0;
        this._animationNumPattern = 1;
        this._animationPatternCounts = [0];
        this._animationNumRepeat = 1;
        this._animationRepeatDurations = [0];
    };

    Game_MessagePicture.prototype.z = function() {
        return this._z;
    };

    Game_MessagePicture.prototype.offsetY = function() {
        return this._offsetY;
    };

    Game_MessagePicture.prototype.hasAnimation = function() {
        return this._hasAnimation;
    };

    Game_MessagePicture.prototype.pattern = function() {
        return this._pattern;
    };

    Game_MessagePicture.prototype.animationNumPattern = function() {
        return this._animationNumPattern;
    };

    Game_MessagePicture.prototype.isSpeaking = function() {
        return [this._position, -1].includes($gameScreen.speakerIndex());
    };

    Game_MessagePicture.prototype.setName = function(name) {
        const offsetY = ImageManager.offsetY(name);
        if (!BOTTOM_Y_ORIGIN) {
            this._y += this._offsetY;
            this._y -= offsetY;
            this._originalY = this._y;
        }
        this._name = name;
        this._width = ImageManager.pictureWidth(name);
        this._height = ImageManager.pictureHeight(name);
        this._offsetY = offsetY;
        this.setupAnimation(name);
    };

    Game_MessagePicture.prototype.update = function() {
        Game_Picture.prototype.update.call(this);
        if (!this.isMoving()) {
            this.updateSpeaker();
            this.updateAnimation();
            this.updateSpeaking();
        }
    };

    Game_MessagePicture.prototype.updateSpeaker = function() {
        const lastActorId = this._actorId;
        const speaker = $gameScreen.speaker(this._position);
        const speakerId = speaker ? speaker.actorId() : 0;
        const pictureName = speaker ? speaker.pictureName() : "";
        let actorChanged;
        let easingCondition;
        if (this._actorId !== speakerId) {
            this._actorId = speakerId;
            actorChanged = true;
        } else {
            actorChanged = false;
        }
        if (this._changingName) {
            this.setName(this._changingName);
            this._changingName = "";
            easingCondition = 1;
        } else {
            if (this._name !== pictureName) {
                if (actorChanged && lastActorId) {
                    this._changingName = pictureName;
                } else {
                    this.setName(pictureName);
                }
            }
            if (lastActorId) {
                if (speaker) {
                    easingCondition = actorChanged ? -1 : 0;
                } else {
                    easingCondition = -1;
                }
            } else {
                if (speaker) {
                    easingCondition = 1;
                } else {
                    easingCondition = 0;
                }
            }
        }
        switch (easingCondition) {
            case 1:
                this._x = this.easingOffsetX();
                this._y = this.easingOffsetY();
                this._opacity = 0;
                this.appearWithEase(EASING_FRAMES);
                break;
            case -1:
                this._originalX = this._x;
                this._originalY = this._y;
                this._originalOpacity = this._opacity;
                this.disappearWithEase(EASING_FRAMES);
                break;
        }
    };

    Game_MessagePicture.prototype.updateSpeaking = function() {
        const isSpeaking = this.isSpeaking();
        if (this._isSpeaking !== isSpeaking) {
            this._isSpeaking = isSpeaking;
            if (isSpeaking) {
                this._z = 6;
                this.tint(this._originalTone, DEACTIVE_FRAMES);
            } else {
                this._z = 5;
                this._originalTone = this._tone.clone();
                this.tint(DEACTIVE_TONE, DEACTIVE_FRAMES);
            }
        }
    };

    Game_MessagePicture.prototype.updateAnimation = function() {
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

    Game_MessagePicture.prototype.setupAnimation = function(pictureName) {
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
            this.initAnimation();
        }
    };

    Game_MessagePicture.prototype.movePosition = function(origin, x, y, scaleX, scaleY, opacity, blendMode, duration, easingType) {
        this._originalX = x;
        this._originalY = y;
        this._originalOpacity = opacity;
        this.move(origin, x, y, scaleX, scaleY, opacity, blendMode, duration, easingType);
    };

    Game_MessagePicture.prototype.isMoving = function() {
        return this._duration > 0;
    };
    
    Game_MessagePicture.prototype.appearWithEase = function(duration=30) {
        this.move(0, this._originalX, this._originalY, this._scaleX, this._scaleY, this._originalOpacity, this._blendMode, duration, 2);
    };

    Game_MessagePicture.prototype.disappearWithEase = function(duration=30) {
        this.move(0, this.easingOffsetX(), this.easingOffsetY(), this._scaleX, this._scaleY, 0, this._blendMode, duration, 1);
    };
    
    Game_MessagePicture.prototype.easingOffsetX = function() {
        return this._scaleX < 0 ? this._x - EASING_OFFSET : this._x + EASING_OFFSET;
    };
    
    Game_MessagePicture.prototype.easingOffsetY = function() {
        return this._y;
    };

    Game_MessagePicture.prototype.balloonX = function(mirror=false) {
        return mirror ? (this._x - this._width / 4) : (this._x + this._width / 4);
    };

    Game_MessagePicture.prototype.balloonY = function() {
        const height = this._height;
        const offsetY = this._offsetY;
        const y = BOTTOM_Y_ORIGIN ? this._y - height : this._y + offsetY;
        return y + (height - this._offsetY) / 7;
    };


    const _Sprite_Balloon_prototype_setup = Sprite_Balloon.prototype.setup;
    Sprite_Balloon.prototype.setup = function(targetSprite, balloonId, offsetX, offsetY, scaleX, scaleY) {
        _Sprite_Balloon_prototype_setup.call(this, targetSprite, balloonId);
        this._offsetX = offsetX || 0;
        this._offsetY = offsetY || 0;
        this.scale.x = scaleX || 1;
        this.scale.y = scaleY || 1;
        this.z = 7;
    };

    const _Sprite_Balloon_prototype_updatePosition = Sprite_Balloon.prototype.updatePosition;
    Sprite_Balloon.prototype.updatePosition = function() {
        if (this._target.balloonX && this._target.balloonY) {
            if (this.scale.x < 0) {
                this.x = this._target.balloonX(true) - this._offsetX;
            } else {
                this.x = this._target.balloonX(false) + this._offsetX;
            }
            this.y = this._target.balloonY() + this._offsetY;
        } else {
            _Sprite_Balloon_prototype_updatePosition.call(this);
        }
    };


    const _Sprite_Animation_prototype_targetSpritePosition = Sprite_Animation.prototype.targetSpritePosition;
    Sprite_Animation.prototype.targetSpritePosition = function(sprite) {
        if (sprite instanceof Sprite_MessagePicture) {
            const point = new Point(0, sprite.offsetY() + sprite.height / 4);
            if (this._animation.alignBottom) point.y = Graphics.height;
            sprite.updateTransform();
            return sprite.worldTransform.apply(point);
        } else {
            return _Sprite_Animation_prototype_targetSpritePosition.call(this, sprite);
        }
    };


    function Sprite_MessagePicture() {
        this.initialize(...arguments);
    }
    
    Sprite_MessagePicture.prototype = Object.create(Sprite_Picture.prototype);
    Sprite_MessagePicture.prototype.constructor = Sprite_MessagePicture;
    
    Sprite_MessagePicture.prototype.initialize = function(position) {
        Sprite_Clickable.prototype.initialize.call(this);
        this._position = position;
        this._pictureName = "";
        this.update();
    };

    Sprite_MessagePicture.prototype.picture = function() {
        return $gameScreen.messagePicture(this._position);
    };

    Sprite_MessagePicture.prototype.offsetY = function() {
        return this.picture().offsetY();
    };

    Sprite_MessagePicture.prototype.balloonX = function(mirror=false) {
        return this.picture().balloonX(mirror);
    };

    Sprite_MessagePicture.prototype.balloonY = function() {
        return this.picture().balloonY();
    };

    Sprite_MessagePicture.prototype.update = function() {
        Sprite_Clickable.prototype.update.call(this);
        this.updateBitmap();
        if (this.visible) {
            this.updateFrame();
            this.updateOrigin();
            this.updatePosition();
            this.updateScale();
            this.updateTone();
            this.updateOther();
        }
    };

    Sprite_MessagePicture.prototype.updateFrame = function() {
        const bitmap = this.bitmap;
        const picture = this.picture();
        if (bitmap && picture) {
            const pw = bitmap.width / picture.animationNumPattern();
            this.setFrame(pw * picture.pattern(), 0, pw, bitmap.height);
        }
    };

    Sprite_MessagePicture.prototype.updateOrigin = function() {
        const bitmap = this.bitmap;
        if (bitmap) {
            const width = bitmap.width;
            const centerX = ImageManager.centerX(this._pictureName);
            const cx = (centerX > 0) ? centerX : (width / 2);
            this.anchor.x = cx / width;
            this.anchor.y = BOTTOM_Y_ORIGIN ? 1 : 0;
        }
    };

    Sprite_MessagePicture.prototype.updatePosition = function() {
        const picture = this.picture();
        this.x = Math.round(picture.x());
        this.y = Math.round(picture.y());
        this.z = Math.round(picture.z());
    };


    Spriteset_Base.prototype.createMessagePictureSprites = function() {
        this._messagePictureSprites = [];
        for (let i=0; i<3; i++) {
            const sprite = new Sprite_MessagePicture(i)
            this._messagePictureSprites[i] = sprite;
            this._tilemap.addChild(sprite);
        }
    };


    const _Spriteset_Map_prototype_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
    Spriteset_Map.prototype.createLowerLayer = function() {
        _Spriteset_Map_prototype_createLowerLayer.call(this);
        this.createMessagePictureSprites();
    };

    Spriteset_Map.prototype.createBalloon = function(request) {
        const targetSprite = this.findTargetSprite(request.target);
        if (targetSprite) {
            const sprite = new Sprite_Balloon();
            sprite.targetObject = request.target;
            sprite.setup(targetSprite, request.balloonId, request.offsetX, request.offsetY, request.scaleX, request.scaleY);
            this._effectsContainer.addChild(sprite);
            this._balloonSprites.push(sprite);
        }
    };

    const _Spriteset_Map_prototype_findTargetSprite = Spriteset_Map.prototype.findTargetSprite;
    Spriteset_Map.prototype.findTargetSprite = function(target) {
        switch (target) {
            case "leftMessagePicture":
                return this._messagePictureSprites[0];
            case "centerMessagePicture":
                return this._messagePictureSprites[1];
            case "rightMessagePicture":
                return this._messagePictureSprites[2];
            default:
                return _Spriteset_Map_prototype_findTargetSprite.call(this, target);
        }
    };


    const _Spriteset_Battle_prototype_initialize = Spriteset_Battle.prototype.initialize;
    Spriteset_Battle.prototype.initialize = function() {
        _Spriteset_Battle_prototype_initialize.call(this);
        this._balloonSprites = [];
    };

    const _Spriteset_Battle_prototype_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
    Spriteset_Battle.prototype.createLowerLayer = function() {
        _Spriteset_Battle_prototype_createLowerLayer.call(this);
        this.createTilemap();
        this.createMessagePictureSprites();
    };

    Spriteset_Battle.prototype.createTilemap = function() {
        const tilemap = new Tilemap();
        this._battleField.addChild(tilemap);
        this._tilemap = tilemap;
    };

    Spriteset_Battle.prototype.destroy = function(options) {
        this.removeAllBalloons();
        Spriteset_Base.prototype.destroy.call(this, options);
    };

    const _Spriteset_Battle_prototype_findTargetSprite = Spriteset_Battle.prototype.findTargetSprite;
    Spriteset_Battle.prototype.findTargetSprite = function(target) {
        switch (target) {
            case "leftMessagePicture":
                return this._messagePictureSprites[0];
            case "centerMessagePicture":
                return this._messagePictureSprites[1];
            case "rightMessagePicture":
                return this._messagePictureSprites[2];
            default:
                return _Spriteset_Battle_prototype_findTargetSprite.call(this, target);
        }
    };

    const _Spriteset_Battle_prototype_update = Spriteset_Battle.prototype.update;
    Spriteset_Battle.prototype.update = function() {
        _Spriteset_Battle_prototype_update.call(this);
        this.updateBalloons();
    };

    Spriteset_Battle.prototype.updateBalloons = function() {
        Spriteset_Map.prototype.updateBalloons.call(this);
    };
    
    Spriteset_Battle.prototype.processBalloonRequests = function() {
        Spriteset_Map.prototype.processBalloonRequests.call(this);
    };
    
    Spriteset_Battle.prototype.createBalloon = function(request) {
        Spriteset_Map.prototype.createBalloon.call(this, request);
    };
    
    Spriteset_Battle.prototype.removeBalloon = function(sprite) {
        Spriteset_Map.prototype.removeBalloon.call(this, sprite);
    };
    
    Spriteset_Battle.prototype.removeAllBalloons = function() {
        Spriteset_Map.prototype.removeAllBalloons.call(this);
    };

})();
