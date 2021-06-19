//=============================================================================
// RPG Maker MZ - ActorPictures
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Manages actor pictures.
 * @author nz_prism
 *
 * @help ActorPictures.js
 *
 * 
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc アクターのピクチャを管理します。
 * @author nz_prism
 *
 * @help ActorPictures.js
 *
 * @param actorPictures
 * @text アクターピクチャ
 * @desc アクターのピクチャ設定です（複数設定可）
 * @default 
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

    const PLUGIN_NAME = "ActorPictures";


    const actorPictures = JSON.parse(PluginManager.parameters(PLUGIN_NAME).actorPictures);
    const ACTOR_PICTURES = [];
    for (const str of actorPictures) {
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
        const normals = ACTOR_PICTURES[this._actorId].normals;
        return normals[this._pictureIndex] || normals[0] || "";
    };

    Game_Actor.prototype.statePictureName = function() {
        const states = ACTOR_PICTURES[this._actorId].states;
        for (let i=0; i<states.length; i++) {
            const pictures = states[i];
            if (pictures && this.isStateAffected(i)) return pictures[this._pictureIndex];
        }
        return "";
    };
    
    Game_Actor.prototype.damagePictureName = function() {
        const damages = ACTOR_PICTURES[this._actorId].damages;
        const hpRate = this.hpRate() * 100;
        for (const obj of damages) {
            if (hpRate <= obj.damageRate) return obj.pictures[this._pictureIndex];
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
