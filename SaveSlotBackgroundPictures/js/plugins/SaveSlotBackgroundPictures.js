//=============================================================================
// RPG Maker MZ - SaveSlotBackgroundPictures
//=============================================================================

/*:
 * @target MZ
 * @plugindesc It's a plugin template.
 * @author nz_prism
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/SaveSlotBackgroundPictures/js/plugins/SaveSlotBackgroundPictures.js
 *
 * @help SaveSlotBackgroundPictures.js
 * ver. 1.0.0
 * 
 * [History]
 * 06/27/2022 1.0.0 Released
 * 
 * This is a plugin template.
 *
 * 
 * This plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 *
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc セーブスロットの背景に進行度変数に応じたピクチャを表示します。
 * @author nz_prism
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/SaveSlotBackgroundPictures/js/plugins/SaveSlotBackgroundPictures.js
 *
 * @help SaveSlotBackgroundPictures.js
 * ver. 1.0.0
 * 
 * [バージョン履歴]
 * 2022/06/27 1.0.0 リリース
 * 
 * セーブスロットの背景に進行度変数に応じたピクチャを表示します。
 * まずプラグインパラメータ「ストーリー進行度変数」に、ストーリー進行度を表す変数
 * の番号を設定してください。
 * 次にプラグインパラメータ「背景ピクチャ」に、その変数の値と表示するピクチャのペ
 * アを必要な分だけ設定してください。
 * ストーリー進行度変数が「背景ピクチャ」に設定していない値になった場合、背景は表
 * 示されません。
 * 
 * このプラグインはMITライセンスにてリリースされています。
 * https://opensource.org/licenses/mit-license.php
 *
 * 
 * @param progressVariableId
 * @text ストーリー進行度変数
 * @desc ストーリーの進行度を表す変数の番号です。
 * @default 1
 * @type variable
 * 
 * @param progressPictures
 * @text 背景ピクチャ
 * @desc ストーリーの進行度に応じて表示されるピクチャです（複数設定可）。
 * @type struct<picture>[]
 * 
 * @param drawPartyCharacters
 * @text パーティキャラクター描画
 * @desc オフにするとパーティキャラクターが描画されなくなります。
 * @type boolean
 * @default true
 * 
 */

/*~struct~picture:ja
 *
 * @param variableValue
 * @text 進行度変数値
 * @desc 進行度を表す変数の値です。
 * @default 1
 * @type number
 * @min 0
 * 
 * @param pictureName
 * @text ピクチャ名
 * @desc 進行度に応じて表示されるピクチャ名です。
 * @type file
 * @dir img/pictures
 * 
 */

(() => {
    'use strict';
    const PLUGIN_NAME = "SaveSlotBackgroundPictures";
    const pluginParams = PluginManager.parameters(PLUGIN_NAME);

    const PROGRESS_VARIABLE_ID = pluginParams.progressVariableId;

    const DRAW_PARTY_CHARACTERS = pluginParams.drawPartyCharacters === "true";

    const PROGRESS_PICTURE_NAMES = [];
    for (const str of JSON.parse(pluginParams.progressPictures)) {
        const obj = JSON.parse(str);
        if (obj) PROGRESS_PICTURE_NAMES[Number(obj.variableValue)] = obj.pictureName;
    }

    const _DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
    DataManager.makeSavefileInfo = function() {
        const info = _DataManager_makeSavefileInfo.call(this);
        info.progressValue = $gameVariables.value(PROGRESS_VARIABLE_ID);
        return info;
    };

    Window_SavefileList.prototype.drawItemBackground = function(index) {
        this.drawBackgroundPicture(index);
    };

    Window_SavefileList.prototype.drawBackgroundPicture = function(index) {
        const rect = this.itemRect(index);
        const bitmap = this.backgroundBitmap(index);
        this.contentsBack.blt(bitmap, 0, 0, rect.width, rect.height, rect.x, rect.y);
    };

    Window_SavefileList.prototype.backgroundBitmap = function(index) {
        const savefileId = this.indexToSavefileId(index);
        const info = DataManager.savefileInfo(savefileId);
        const pictureName = PROGRESS_PICTURE_NAMES[info?.progressValue ?? 0];
        return ImageManager.loadPicture(pictureName);
    };

    const _Window_SavefileList_prototype_drawPartyCharacters = Window_SavefileList.prototype.drawPartyCharacters;
    Window_SavefileList.prototype.drawPartyCharacters = function(info, x, y) {
        if (DRAW_PARTY_CHARACTERS) _Window_SavefileList_prototype_drawPartyCharacters.apply(this, arguments);
    };

})();
