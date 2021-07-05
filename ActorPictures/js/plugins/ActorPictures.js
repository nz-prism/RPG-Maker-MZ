//=============================================================================
// RPG Maker MZ - ActorPictures
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Manages actor pictures.
 * @author nz_prism
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ActorPictures/js/plugins/ActorPictures.js
 *
 * @help ActorPictures.js
 * ver 1.3.0
 *
 * [History]
 * 06/20/2021 1.0.0 Released
 * 06/23/2021 1.1.0 Fixed the State Picture priority and preloading functionality
 * 07/01/2021 1.1.1 Added arguments for drawActorPicture function
 * 07/02/2021 1.2.0 Added a plugin parameter which calibrates picture positions
 * 07/05/2021 1.3.0 Added animation settings for pictures
 * 
 * This plugin manages pictures for actors.
 * You can set normal, stated and damaged pictures for each actor.
 * Stated pictures are shown when an actor is affected by a
 * specific state.
 * Damaged pictures are shown when the HP percentage of an actor is
 * at a specific rate or less.
 * Normal pictures are shown if none of the stated/damaged pictures
 * can be applied.
 * The priority is Stated > Damaged > Normal.
 * 
 * You can set multiple pictures for each of normal, stated and
 * damaged pictures in order to use as costumes or facial
 * expressions.
 * By setting Picture Index with a plugin command "Set Picture
 * Index", a corresponding picture out of the pictures is shown.
 * Picture Index is used in common with Normal, Stated and Damaged
 * pictures.
 * 
 * Some pictures don't locate their face at the horizontal center
 * or locate them lower because of upper accessories, such as
 * hats. If those are misaligned, use a plugin parameter
 * "Picture Calibrations" to calibrate the alignment for each
 * picture.
 * 
 * Actor pictures are sometimes not shown for the first time
 * they are displayed. In that case, preloading them may solve
 * the issue.
 * There are 2 ways to preload pictures; automatic method using
 * a plugin parameter and manual method using a plugin command.
 * If an plugin parameter "Preload All Pictures Automatically
 * at Every Scene" is set true, all the actor pictures will be
 * preloaded automatically at the start of every scene.
 * If there are so many pictures that the performance gets low,
 * set it false.
 * In this case, use a plugin command "Preload Pictures" to
 * preload actor pictures manually.
 * 
 * You can also configure animation settings for pictures. If you
 * want to animate a picture, create a image with as many patterns
 * aligned horizontally as you like. Specify that number of
 * patterns into a plugin parameter "Animation Patterns". Animation
 * frames can be calibrated with plugin parameters. Configure them
 * seeing actual animations in the game.
 * 
 * 
 * This plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 *
 * @param actorPictures
 * @text Actor Pictures
 * @desc Settings for actor pictures.
 * @default []
 * @type struct<picture>[]
 * 
 * @param pictureCalibrations
 * @text Picture Calibrations
 * @desc The calibration settings for each picture file which requires offsetting.
 * @default []
 * @type struct<calibration>[]
 * 
 * @param animationPictures
 * @text Picture Animation Settings
 * @desc The settings to animate pictures.
 * @default []
 * @type struct<animation>[]
 * 
 * @param preloadAllPicturesAtEveryScene
 * @text Preload All Pictures Automatically at Every Scene
 * @desc By setting it ON, all the actor pictures will be preloaded automatically at the start of every scene.
 * @default false
 * @type boolean
 * 
 * 
 * @command setPictureIndex
 * @text Set Picture Index
 * @desc Set the Picture Index for an actor in order to switch costumes/facial expressions.
 * 
 * @arg actorId
 * @text Actor ID
 * @desc Specify the Actor ID.
 * @type actor
 * @min 1
 * 
 * @arg pictureIndex
 * @text Picture Index
 * @desc Specify the Picture Index. Note it starts from 0.
 * @type number
 * @min 0
 * 
 * @command preloadPictures
 * @text Preload Pictures
 * @desc Preload actor pictures manually.
 * 
 * @arg pictureScope
 * @text Picture Scope
 * @desc Select the scope for pictures to be preloaded.
 * @default all
 * @type select
 * @option All
 * @value all
 * @option Party Actors
 * @value party
 * 
 */

/*~struct~picture:
 *
 * @param actorId
 * @text Actor ID
 * @desc Specify the Actor ID.
 * @type actor
 * @min 1
 * 
 * @param normalPictures
 * @text Normal Pictures
 * @desc The normal pictures for an actor. The order corresponds to Picture Index. The top one is used as default.
 * @type file[]
 * @dir img/pictures
 * @default []
 * 
 * @param statePictures
 * @text Stated Pictures
 * @desc The stated pictures for an actor. The priority to be shown reflects the order.
 * @type struct<state>[]
 * @default []
 * 
 * @param damagePictures
 * @text Damaged Pictures
 * @desc The damaged pictures for an actor. Multiple HP percentages can be set.
 * @type struct<damage>[]
 * @default []
 * 
 */

/*~struct~state:
 *
 * @param stateId
 * @text State ID
 * @desc Specify a State ID for these pictures. If an actor has this state, one of them is shown.
 * @type state
 *
 * @param pictures
 * @text Pictures
 * @desc Specify pictures for this state. Multiple pictures corresponding to Picture Index can be set.
 * @dir img/pictures
 * @type file[]
 * 
 */

/*~struct~damage:
 *
 * @param damageRate
 * @text Damage Percentage
 * @desc Specify an HP percentage for these pictures. If the HP % is at this value or less, one of them is shown.
 * @type number
 * @min 0
 * @max 100
 *
 * @param pictures
 * @text Pictures
 * @desc Specify pictures for this HP %. Multiple pictures corresponding to Picture Index can be set.
 * @dir img/pictures
 * @type file[]
 * 
 */

/*~struct~calibration:
 *
 * @param pictureName
 * @text Picture Name
 * @desc The picture name which requires calibration.
 * @type file
 * @dir img/pictures
 * 
 * @param centerX
 * @text Center X
 * @desc The coordinate X at the center of the face. If it's negative value, half of the width will be used.
 * @type number
 * @default -1
 * @min -1
 * 
 * @param offsetY
 * @text Offset Y
 * @desc The vertical offset value. Can be set negative value.
 * @type number
 * @default 0
 * @min -100000
 * 
 */

/*~struct~animation:ja
 *
 * @param pictureName
 * @text Picture Name
 * @desc The picture name to be animated.
 * @type file
 * @dir img/pictures
 * 
 * @param numPattern
 * @text Animation Patterns
 * @desc The number of patterns for animation.
 * @type number
 * @default 3
 * @min 1
 * 
 * @param patternCounts
 * @parent numPattern
 * @text Pattern Counts
 * @desc The number of counts before the next pattern. Set as many as Animation Patterns.
 * @type number[]
 * @default ["1","2","2"]
 * @min 1
 * 
 * @param numRepeat
 * @text Pattern Repeats
 * @desc The number of pattern sets within an animation loop.
 * @type number
 * @default 4
 * @min 1
 * 
 * @param repeatDurations
 * @parent numRepeat
 * @text Repeat Durations
 * @desc The number of frames before the next pattern set. Set as many as Pattern Repeats.
 * @type number[]
 * @default ["30","24","10","6"]
 * @min 1
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc アクターの立ち絵を管理します。
 * @author nz_prism
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ActorPictures/js/plugins/ActorPictures.js
 *
 * @help ActorPictures.js
 * ver 1.3.0
 *
 * [バージョン履歴]
 * 2021/06/20 1.0.0 リリース
 * 2021/06/23 1.1.0 ステート立ち絵優先度の修正およびプリロード機能を変更
 * 2021/07/01 1.1.1 drawActorPicture関数の引数を追加
 * 2021/07/02 1.2.0 立ち絵のズレを調整するためのプラグインパラメータを追加
 * 2021/07/05 1.3.0 立ち絵のアニメーション設定を追加
 * 
 * このプラグインは、アクターの立ち絵を管理します。
 * 立ち絵はアクターごとに標準、ステート差分、ダメージ差分を設定できます。
 * ステート差分は特定のステートにかかっている際に表示される立ち絵です。
 * ダメージ差分はHPが一定割合以下になると表示される立ち絵であり、複数の割合を
 * 設定できます。
 * 標準はステート・ダメージ差分に適用可能な立ち絵が存在しない場合に表示される
 * デフォルト立ち絵です。
 * 優先度はステート > ダメージ > 標準です。
 * 
 * また、標準・ステート・ダメージのいずれにも立ち絵を複数設定することができ、
 * 衣装や表情差分等に利用できます。
 * 複数設定されている立ち絵のうち、プラグインコマンド「立ち絵インデックスの設定
 * 」にて設定した立ち絵インデックスに対応する立ち絵が表示されます。
 * 立ち絵インデックスは標準・ダメージ・ステート間で共通です。
 * 
 * 立ち絵によっては顔の位置が画像の中央に来ていなかったり、帽子などの装飾品によ
 * り画像が縦に長いこともあります。そうした立ち絵がズレて表示されてしまう場合、
 * プラグインパラメータ「立ち絵位置調整」を使用して表示位置を調整してください。
 * 画像ごとに設定することができます。
 * 
 * まれに立ち絵が初回表示時に描画されないことがあります。立ち絵をプリロード
 * （事前読み込み）することで解決できる可能性があります。
 * プリロードには自動的な方法と手動による方法の２種類が用意されています。
 * 自動的方法はプラグインパラメータを、手動的方法はプラグインコマンドを使用しま
 * す。
 * プラグインパラメータ「全ての立ち絵をシーン開始時にプリロード」をオンにする
 * と、各シーン開始時に全ての立ち絵がプリロードされるようになります。
 * もし立ち絵が非常に多く、そのために動作が重いと感じる場合、このパラメータをオ
 * フにしてください。
 * その場合、立ち絵表示の直前にプラグインコマンド「全ての立ち絵をプリロードす
 * る」を呼び出すことで手動プリロードできます。
 * 
 * 立ち絵のアニメーションも設定することができます。立ち絵をアニメさせたい場合、
 * 任意の数のパターンを横に並べてください。プラグインパラメータ「立ち絵アニメ設
 * 定」にてその立ち絵画像ファイルを指定し、「アニメパターン数」にて並べたパター
 * ンの数を指定してください。また、アニメのフレームもパラメータにて細かく指定す
 * ることが可能です。実際に動かしながら調整してください。
 * 
 * 
 * このプラグインはMITライセンスにてリリースされています。
 * https://opensource.org/licenses/mit-license.php
 *
 * @param actorPictures
 * @text アクター立ち絵
 * @desc アクターの立ち絵設定です（複数設定可）
 * @default []
 * @type struct<picture>[]
 * 
 * @param pictureCalibrations
 * @text 立ち絵位置調整
 * @desc 立ち絵ごとの表示座標調整設定です。設定されていない立ち絵はデフォルト設定が使用されます。
 * @default []
 * @type struct<calibration>[]
 * 
 * @param animationPictures
 * @text 立ち絵アニメ設定
 * @desc 立ち絵のアニメーション設定です。
 * @default []
 * @type struct<animation>[]
 * 
 * @param preloadAllPicturesAtEveryScene
 * @text 全ての立ち絵をシーン開始時に自動プリロード
 * @desc オンにすると全ての立ち絵がシーン開始時に自動的にプリロードされるようになります。
 * @default false
 * @type boolean
 * 
 * 
 * @command setPictureIndex
 * @text 立ち絵インデックスの設定
 * @desc アクターの現在の差分用立ち絵インデックス（衣装・表情等）を設定します。インデックスは標準、ステート、ダメージ共通です。
 * 
 * @arg actorId
 * @text アクターID
 * @desc アクターのIDです。
 * @type actor
 * @min 1
 * 
 * @arg pictureIndex
 * @text 立ち絵インデックス
 * @desc 立ち絵のインデックスです。0から始まる点にご注意ください。
 * @type number
 * @min 0
 * 
 * @command preloadPictures
 * @text 立ち絵をプリロードする
 * @desc 立ち絵を手動プリロードします。
 * 
 * @arg pictureScope
 * @text プリロード範囲
 * @desc プリロードする立ち絵の範囲を選択してください。
 * @default all
 * @type select
 * @option すべて
 * @value all
 * @option パーティ内アクター
 * @value party
 * 
 */

/*~struct~picture:ja
 *
 * @param actorId
 * @text アクターID
 * @desc アクターのIDです。
 * @type actor
 * @min 1
 * 
 * @param normalPictures
 * @text 標準立ち絵
 * @desc アクターの標準の立ち絵です。立ち絵インデックスに応じて複数指定できます。一番上のものがデフォルトです。
 * @type file[]
 * @dir img/pictures
 * @default []
 * 
 * @param statePictures
 * @text ステート立ち絵
 * @desc アクターのステート差分立ち絵です。上にあるものほど優先されます。
 * @type struct<state>[]
 * @default []
 * 
 * @param damagePictures
 * @text ダメージ立ち絵
 * @desc アクターのダメージ差分立ち絵です。HP割合に応じて複数指定できます。
 * @type struct<damage>[]
 * @default []
 * 
 */

/*~struct~state:ja
 *
 * @param stateId
 * @text ステートID
 * @desc ステートのIDです。このステートにかかっていると対応する立ち絵が表示されます。
 * @type state
 *
 * @param pictures
 * @text 画像ファイル
 * @desc ステートに対応する立ち絵です。立ち絵インデックスに応じて複数指定できます。
 * @dir img/pictures
 * @type file[]
 * 
 */

/*~struct~damage:ja
 *
 * @param damageRate
 * @text ダメージ割合%
 * @desc ダメージ差分の割合（パーセンテージ）です。HP割合がこの値以下になると対応する立ち絵が表示されます。
 * @type number
 * @min 0
 * @max 100
 *
 * @param pictures
 * @text 画像ファイル
 * @desc ダメージ割合に対応する立ち絵です。立ち絵インデックスに応じて複数指定できます。
 * @dir img/pictures
 * @type file[]
 * 
 */

/*~struct~calibration:ja
 *
 * @param pictureName
 * @text 立ち絵ファイル名
 * @desc 座標を調整したい画像ファイルです。
 * @type file
 * @dir img/pictures
 * 
 * @param centerX
 * @text 中心X座標
 * @desc 顔の中心部のX座標です。マイナスにした場合、画像の幅の半分が中心座標になります。
 * @type number
 * @default -1
 * @min -1
 * 
 * @param offsetY
 * @text Y座標オフセット
 * @desc 立ち絵を垂直方向にずらす値です。マイナスにもできます。
 * @type number
 * @default 0
 * @min -100000
 * 
 */

/*~struct~animation:ja
 *
 * @param pictureName
 * @text 立ち絵ファイル名
 * @desc アニメを設定したい画像ファイルです。
 * @type file
 * @dir img/pictures
 * 
 * @param numPattern
 * @text アニメパターン数
 * @desc アニメのパターン数（コマ数）です。
 * @type number
 * @default 3
 * @min 1
 * 
 * @param patternCounts
 * @parent numPattern
 * @text パターンカウント数
 * @desc 次のパターンまでの間、1フレームにカウントされる数です。アニメパターン数と同じ個数になるように設定してください。
 * @type number[]
 * @default ["1","2","2"]
 * @min 1
 * 
 * @param numRepeat
 * @text パターン繰り返し数
 * @desc 一つのアニメループ内で、パターンセットを繰り返す回数です。
 * @type number
 * @default 4
 * @min 1
 * 
 * @param repeatDurations
 * @parent numRepeat
 * @text 繰り返しフレーム数
 * @desc 次のパターンセットまでのフレーム数です。パターン繰り返し数と同じ個数になるように設定してください。
 * @type number[]
 * @default ["30","24","10","6"]
 * @min 1
 * 
 */

(() => {
    'use strict';
    const PLUGIN_NAME = document.currentScript.src.replace(/^.*\/plugins\/(.*).js$/, (s, a1)=> decodeURIComponent(a1));
    const pluginParams = PluginManager.parameters(PLUGIN_NAME);

    const ACTOR_PICTURES = [];
    for (const str of JSON.parse(pluginParams.actorPictures)) {
        const obj = JSON.parse(str);
        const actorId = Number(obj.actorId);
        const normalPictures = JSON.parse(obj.normalPictures);
        const statePictures = [];
        const stateArray = JSON.parse(obj.statePictures);
        for (const stateStr of stateArray) {
            const stateObj = JSON.parse(stateStr);
            stateObj.stateId = Number(stateObj.stateId);
            stateObj.pictures = JSON.parse(stateObj.pictures);
            statePictures.push(stateObj);
        }
        const damagePictures = [];
        const damageArray = JSON.parse(obj.damagePictures);
        for (const damageStr of damageArray) {
            const damageObj = JSON.parse(damageStr);
            damageObj.damageRate = Number(damageObj.damageRate);
            damageObj.pictures = JSON.parse(damageObj.pictures);
            damagePictures.push(damageObj);
        }
        damagePictures.sort((a, b) => a.damageRate - b.damageRate);
        ACTOR_PICTURES[actorId] = {
            normals: normalPictures,
            states:  statePictures,
            damages: damagePictures
        };
    }

    const PICTURE_CALIBRATIONS = {};
    for (const str of JSON.parse(pluginParams.pictureCalibrations)) {
        const obj = JSON.parse(str);
        PICTURE_CALIBRATIONS[obj.pictureName] = {centerX: Number(obj.centerX), offsetY: Number(obj.offsetY)};
    }

    const ANIMATION_PICTURES = {};
    for (const str of JSON.parse(pluginParams.animationPictures)) {
        const obj = JSON.parse(str);
        ANIMATION_PICTURES[obj.pictureName] = {
            numPattern: Number(obj.numPattern),
            patternCounts: JSON.parse(obj.patternCounts).map(n => Number(n)),
            numRepeat: Number(obj.numRepeat),
            repeatDurations: JSON.parse(obj.repeatDurations).map(n => Number(n)),
        }
    }

    const PRELOAD_ALL_PICTURES_AT_EVERY_SCENE = pluginParams.preloadAllPicturesAtEveryScene === "true";


    PluginManager.registerCommand(PLUGIN_NAME, "setPictureIndex", args => {
        $gameActors.actor(Number(args.actorId)).setPictureIndex(Number(args.pictureIndex));
    });

    PluginManager.registerCommand(PLUGIN_NAME, "preloadPictures", args => {
        ImageManager.preloadActorPictures(args.pictureScope);
    });



    ImageManager.preloadActorPictures = function(scope) {
        let objects;
        switch (scope) {
            case "party":
                objects = $gameParty.allMembers().map(actor => ACTOR_PICTURES[actor.actorId()]);
                break;
            default:
                objects = ACTOR_PICTURES;
                break;
        }
        let ary = [];
        for (const obj of objects) {
            if (!obj) continue;
            ary = ary.concat(obj.normals, obj.states.map(o => o.pictures), obj.damages.map(o => o.pictures));
        }
        ary.flat().filter(name => !!name).forEach(name => this.loadPicture(name));
    };

    ImageManager.centerX = function(pictureName) {
        const obj = PICTURE_CALIBRATIONS[pictureName];
        return obj ? obj.centerX : -1;
    };

    ImageManager.offsetY = function(pictureName) {
        const obj = PICTURE_CALIBRATIONS[pictureName];
        return obj ? obj.offsetY : 0;
    };

    ImageManager.hasPictureAnimation = function(pictureName) {
        return !!ANIMATION_PICTURES[pictureName];
    };

    ImageManager.animationNumPattern = function(pictureName) {
        const obj = ANIMATION_PICTURES[pictureName];
        return obj ? obj.numPattern : 0;
    };

    ImageManager.animationPatternCounts = function(pictureName) {
        const obj = ANIMATION_PICTURES[pictureName];
        return obj ? obj.patternCounts : [];
    };

    ImageManager.animationNumRepeat = function(pictureName) {
        const obj = ANIMATION_PICTURES[pictureName];
        return obj ? obj.numRepeat : 0;
    };

    ImageManager.animationRepeatDurations = function(pictureName) {
        const obj = ANIMATION_PICTURES[pictureName];
        return obj ? obj.repeatDurations : [];
    };


    const _Game_Actor_prototype_initMembers = Game_Actor.prototype.initMembers;
    Game_Actor.prototype.initMembers = function() {
        _Game_Actor_prototype_initMembers.call(this);
        this._pictureIndex = 0;
    };

    
    Game_Actor.prototype.normalPictureName = function() {
        const obj = ACTOR_PICTURES[this._actorId];
        if (obj) {
            const normals = obj.normals;
            if (normals) return normals[this._pictureIndex] || normals[0];
        }
        return "";
    };

    Game_Actor.prototype.statePictureName = function() {
        const obj = ACTOR_PICTURES[this._actorId];
        if (obj) {
            const states = obj.states;
            for (const stateObj of states) {
                if (stateObj && this.isStateAffected(stateObj.stateId)) return stateObj.pictures[this._pictureIndex];
            }
        }
        return "";
    };
    
    Game_Actor.prototype.damagePictureName = function() {
        const obj = ACTOR_PICTURES[this._actorId];
        if (obj) {
            const damages = obj.damages;
            const hpRate = this.hpRate() * 100;
            for (const damageObj of damages) {
                if (damageObj && hpRate <= damageObj.damageRate) return damageObj.pictures[this._pictureIndex];
            }
        }
        return "";
    };
    
    Game_Actor.prototype.pictureName = function() {
        return this.statePictureName() || this.damagePictureName() || this.normalPictureName() || "";
    };

    Game_Actor.prototype.setPictureIndex = function(value) {
        this._pictureIndex = value;
    };


    const _Scene_Base_prototype_create = Scene_Base.prototype.create;
    Scene_Base.prototype.create = function() {
        _Scene_Base_prototype_create.call(this);
        if (this.shouldPreloadActorPictures()) ImageManager.preloadActorPictures("all");
    };

    Scene_Base.prototype.shouldPreloadActorPictures = function() {
        return PRELOAD_ALL_PICTURES_AT_EVERY_SCENE;
    };

    
    Scene_Boot.prototype.shouldPreloadActorPictures = function() {
        return false;
    };


    Window_Base.prototype.drawActorPicture = function(actor, x, y, width, height, alignCenter=false, offsetVertically=false) {
        const pictureName = actor.pictureName();
        const bitmap = ImageManager.loadPicture(pictureName);
        let bw = bitmap.width;
        const bh = bitmap.height;
        if (ImageManager.hasPictureAnimation(pictureName)) bw /= ImageManager.animationNumPattern(pictureName);
        const w = width || bw;
        const h = height || bh;
        let sx = 0;
        if (alignCenter && w < bw) {
            const centerX = ImageManager.centerX(pictureName);
            const cx = (centerX > 0) ? centerX : (bw / 2);
            sx = (cx - w / 2).clamp(0, bw);
        }
        const sy = offsetVertically ? ImageManager.offsetY(pictureName) : 0;
        this.contents.blt(bitmap, sx, sy, w, h, x, y);
    };

})();
