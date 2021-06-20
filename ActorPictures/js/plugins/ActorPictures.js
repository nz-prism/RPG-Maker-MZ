//=============================================================================
// RPG Maker MZ - ActorPictures
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Manages actor pictures.
 * @author nz_prism
 *
 * @help ActorPictures.js
 * ver 1.0.0
 *
 * [History]
 * 06/20/2021 1.0.0 Released
 * 
 * This plugin manages pictures for actors.
 * You can set normal, stated and damaged pictures for each actor.
 * Stated pictures are shown when an actor is affected by a specific state.
 * Damaged pictures are shown when the hp percentage of an actor is at a specific rate or less.
 * Normal pictures are shown if none of the stated/damaged pictures can be applied.
 * The priority is Stated > Damaged > Normal.
 * You can set multiple pictures for each of normal, stated and damaged pictures in order to use as costumes or facial expressions.
 * By setting Picture ID with a plugin command "Set Picture ID", a corresponding picture out of the pictures is shown.
 * Picture ID is used in common with Normal, Stated and Damaged pictures.
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
 * 
 * @command setPictureIndex
 * @text Set Picture ID
 * @desc Set the Picture ID for an actor in order to switch costumes/facial expressions.
 * 
 * @arg actorId
 * @text Actor ID
 * @desc Specify the Actor ID.
 * @type actor
 * @min 1
 * 
 * @arg pictureIndex
 * @text Picture ID
 * @desc Specify the Picture ID. Note it starts from 0.
 * @type number
 * @min 0
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
 * @desc The normal pictures for an actor. The order corresponds to Picture ID. The top one is used as default.
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
 * @desc Specify pictures for this state. Multiple pictures corresponding to Picture ID can be set.
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
 * @desc Specify pictures for this HP %. Multiple pictures corresponding to Picture ID can be set.
 * @dir img/pictures
 * @type file[]
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc アクターのピクチャを管理します。
 * @author nz_prism
 *
 * @help ActorPictures.js
 * ver 1.0.0
 *
 * [バージョン履歴]
 * 2021/06/20 1.0.0 リリース
 * 
 * このプラグインは、アクターの立ち絵を管理します。
 * 立ち絵はアクターごとに標準、ステート差分、ダメージ差分を設定できます。
 * ステート差分は特定のステートにかかっている際に表示される立ち絵です。
 * ダメージ差分はHPが一定割合以下になると表示される立ち絵であり、複数の割合を設定できます。
 * 標準はステート・ダメージ差分に適用可能な立ち絵が存在しない場合に表示されるデフォルトピクチャです。
 * 優先度はステート > ダメージ > 標準です。
 * また、標準・ステート・ダメージのいずれにも立ち絵を複数設定することができ、衣装や表情差分等に利用できます。
 * 複数設定されている立ち絵のうち、プラグインコマンド「ピクチャIDの設定」にて設定したピクチャIDに対応する立ち絵が表示されます。
 * ピクチャIDは標準・ダメージ・ステート間で共通です。
 * 
 * 
 * このプラグインはMITライセンスにてリリースされています。
 * https://opensource.org/licenses/mit-license.php
 *
 * @param actorPictures
 * @text アクターピクチャ
 * @desc アクターのピクチャ設定です（複数設定可）
 * @default []
 * @type struct<picture>[]
 * 
 * 
 * @command setPictureIndex
 * @text ピクチャIDの設定
 * @desc アクターの現在の差分用ピクチャID（衣装・表情等）を設定します。IDは標準、ステート、ダメージ共通です。
 * 
 * @arg actorId
 * @text アクターID
 * @desc アクターのIDです。
 * @type actor
 * @min 1
 * 
 * @arg pictureIndex
 * @text ピクチャID
 * @desc ピクチャのIDです。0から始まる点にご注意ください。
 * @type number
 * @min 0
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
 * @text 標準ピクチャ
 * @desc アクターの標準のピクチャです。ピクチャIDに応じて複数指定できます。一番上のものがデフォルトです。
 * @type file[]
 * @dir img/pictures
 * @default []
 * 
 * @param statePictures
 * @text ステートピクチャ
 * @desc アクターのステート差分ピクチャです。上にあるものほど優先されます。
 * @type struct<state>[]
 * @default []
 * 
 * @param damagePictures
 * @text ダメージピクチャ
 * @desc アクターのダメージ差分ピクチャです。HP割合に応じて複数指定できます。
 * @type struct<damage>[]
 * @default []
 * 
 */

/*~struct~state:ja
 *
 * @param stateId
 * @text ステートID
 * @desc ステートのIDです。このステートにかかっていると対応するピクチャが表示されます。
 * @type state
 *
 * @param pictures
 * @text 画像ファイル
 * @desc ステートに対応するピクチャです。ピクチャIDに応じて複数指定できます。
 * @dir img/pictures
 * @type file[]
 * 
 */

/*~struct~damage:ja
 *
 * @param damageRate
 * @text ダメージ割合%
 * @desc ダメージ差分の割合（パーセンテージ）です。HP割合がこの値以下になると対応するピクチャが表示されます。
 * @type number
 * @min 0
 * @max 100
 *
 * @param pictures
 * @text 画像ファイル
 * @desc ダメージ割合に対応するピクチャです。ピクチャIDに応じて複数指定できます。
 * @dir img/pictures
 * @type file[]
 * 
 */

(() => {
    'use strict';

    const PLUGIN_NAME = "ActorPictures";


    const ACTOR_PICTURES = [];
    for (const str of JSON.parse(PluginManager.parameters(PLUGIN_NAME).actorPictures)) {
        const obj = JSON.parse(str);
        const actorId = Number(obj.actorId);
        const normalPictures = JSON.parse(obj.normalPictures);
        const statePictures = [];
        const stateArray = JSON.parse(obj.statePictures);
        for (const stateStr of stateArray) {
            const stateObj = JSON.parse(stateStr);
            statePictures[Number(stateObj.stateId)] = JSON.parse(stateObj.pictures);
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


    PluginManager.registerCommand(PLUGIN_NAME, "setPictureIndex", args => {
        $gameActors.actor(Number(args.actorId)).setPictureIndex(Number(args.pictureIndex));
    });



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
            for (let i=0; i<states.length; i++) {
                const pictures = states[i];
                if (pictures && this.isStateAffected(i)) return pictures[this._pictureIndex];
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
        let ary = [];
        for (const obj of ACTOR_PICTURES) {
            if (!obj) continue;
            ary = ary.concat(obj.normals, obj.states.flat(), obj.damages.map(damageObj => damageObj.pictures).flat());
        }
        ary.filter(name => !!name).forEach(name => ImageManager.loadPicture(name));
    };

    Window_Base.prototype.drawActorPicture = function(actor, x, y) {
        const bitmap = ImageManager.loadPicture(actor.pictureName());
        const width = bitmap.width;
        const height = bitmap.height;
        this.contentsBack.blt(bitmap, x, y, width, height, 0, 0);
    };

})();
