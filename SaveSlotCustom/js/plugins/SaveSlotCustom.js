//=============================================================================
// RPG Maker MZ - SaveSlotCustom
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Customizes the display of the save slots depending on the story progress.
 * @author nz_prism
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/SaveSlotCustom/js/plugins/SaveSlotCustom.js
 *
 * @help SaveSlotCustom.js
 * ver. 1.0.0
 * 
 * [History]
 * 06/28/2022 1.0.0 Released
 * 
 * This plugin enables to display a picture and to draw a text on the save
 * slots depending on the value of the variable which represents the story
 * progress.
 * 
 * First, set the ID of the variable which represents the story progress for
 * the plugin parameter "Story Progress Variable ID".
 * Then, set the pictures and the texts shown on the save slots as many as
 * necessary for the plugin parameter "Slot Settings". Control characters can
 * be used for the text and its display coordinate can be changed.
 * If the value of the story-progress variable is something which doesn't exist
 * in the settings, no pictures and texts are displayed for the slots.
 * 
 * Plus, if the plugin parameter "Draw Party Characters" is set false, it will
 * not draw party characters on the save slots.
 *
 * 
 * This plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 * 
 * @param progressVariableId
 * @text Story Progress Variable ID
 * @desc The variable ID which represents the story progress.
 * @default 1
 * @type variable
 * 
 * @param slotSettings
 * @text Slot Settings
 * @desc The slot settings for each story progress.
 * @type struct<slot>[]
 * 
 * @param drawPartyCharacters
 * @text Draw Party Characters
 * @desc If false, it doesn't draw party characters on the save slots.
 * @type boolean
 * @default true
 * 
 */

/*~struct~slot:
 *
 * @param variableValue
 * @text Progress Variable Value
 * @desc The value for the variable which represents the story progress.
 * @default 1
 * @type number
 * @min 0
 * 
 * @param pictureName
 * @text Picture Name
 * @desc The picture name shown on the save slots.
 * @type file
 * @dir img/pictures
 * 
 * @param text
 * @text Display Text
 * @desc The text drawn on the save slots (control characters can be used).
 * @type string
 * 
 * @param textX
 * @text Display Text X
 * @desc The Text Display X.
 * @parent text
 * @default 144
 * @type number
 * 
 * @param textY
 * @text Display Text Y
 * @desc The Text Display Y.
 * @parent text
 * @default 48
 * @type number
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc ストーリーの進行度に応じてセーブスロットの表示をカスタマイズします。
 * @author nz_prism
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/SaveSlotCustom/js/plugins/SaveSlotCustom.js
 *
 * @help SaveSlotCustom.js
 * ver. 1.0.0
 * 
 * [バージョン履歴]
 * 2022/06/28 1.0.0 リリース
 * 
 * このプラグインを使用することで、ストーリーの進行度に応じてセーブスロットの背
 * 景にピクチャを表示したり文字列を描画したりすることができます。
 * 
 * まずプラグインパラメータ「ストーリー進行度変数」に、ストーリー進行度を表す変
 * 数の番号を設定してください。
 * 続いてプラグインパラメータ「スロット設定」に、その変数の値と表示するピクチャ
 * やテキストを必要な分だけ設定してください。テキストには制御文字を使用すること
 * ができ、また表示座標を変更できます。
 * なおストーリー進行度変数が「スロット設定」に設定していない値になった場合、ピ
 * クチャもテキストも表示されません。
 * 
 * また、プラグインパラメータ「パーティキャラクター描画」をオフに設定することで
 * パーティキャラクターが描画されなくなります。
 * 
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
 * @param slotSettings
 * @text スロット設定
 * @desc ストーリーの進行度に応じたスロットの設定です（複数設定可）。
 * @type struct<slot>[]
 * 
 * @param drawPartyCharacters
 * @text パーティキャラクター描画
 * @desc オフにするとパーティキャラクターが描画されなくなります。
 * @type boolean
 * @default true
 * 
 */

/*~struct~slot:ja
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
 * @param text
 * @text 表示文字列
 * @desc 進行度に応じて描画される文字列です（制御文字使用可）。
 * @type string
 * 
 * @param textX
 * @text 表示文字列X
 * @desc 文字列のX座標です。
 * @parent text
 * @default 144
 * @type number
 * 
 * @param textY
 * @text 表示文字列Y
 * @desc 文字列のY座標です。
 * @parent text
 * @default 48
 * @type number
 * 
 */

(() => {
    'use strict';
    const PLUGIN_NAME = "SaveSlotCustom";
    const pluginParams = PluginManager.parameters(PLUGIN_NAME);

    const PROGRESS_VARIABLE_ID = pluginParams.progressVariableId;

    const DRAW_PARTY_CHARACTERS = pluginParams.drawPartyCharacters === "true";

    const SLOT_SETTINGS = [];
    for (const str of JSON.parse(pluginParams.slotSettings)) {
        const obj = JSON.parse(str);
        if (obj) {
            const setting = {};
            setting.pictureName = obj.pictureName;
            setting.text = obj.text;
            setting.textX = Number(obj.textX);
            setting.textY = Number(obj.textY);
            SLOT_SETTINGS[Number(obj.variableValue)] = setting;
        }
    }


    const _DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
    DataManager.makeSavefileInfo = function() {
        const info = _DataManager_makeSavefileInfo.call(this);
        info.progressValue = $gameVariables.value(PROGRESS_VARIABLE_ID);
        return info;
    };


    const _Window_SavefileList_prototype_drawItem = Window_SavefileList.prototype.drawItem;
    Window_SavefileList.prototype.drawItem = function(index) {
        _Window_SavefileList_prototype_drawItem.call(this, index);
        this.drawSlotText(index);
    };

    Window_SavefileList.prototype.drawItemBackground = function(index) {
        this.drawBackgroundPicture(index);
    };

    Window_SavefileList.prototype.drawBackgroundPicture = function(index) {
        const rect = this.itemRect(index);
        const bitmap = this.backgroundBitmap(index);
        this.contentsBack.blt(bitmap, 0, 0, rect.width, rect.height, rect.x, rect.y);
    };

    Window_SavefileList.prototype.slotSetting = function(index) {
        const savefileId = this.indexToSavefileId(index);
        const info = DataManager.savefileInfo(savefileId);
        return SLOT_SETTINGS[info?.progressValue ?? 0];
    };

    Window_SavefileList.prototype.backgroundBitmap = function(index) {
        const setting = this.slotSetting(index);
        return ImageManager.loadPicture(setting?.pictureName);
    };

    Window_SavefileList.prototype.drawSlotText = function(index) {
        const setting = this.slotSetting(index);
        const text = setting?.text;
        if (text) {
            const rect = this.itemRectWithPadding(index);
            const width = this.textSizeEx(text).width;
            this.drawTextEx(text, rect.x + setting.textX, rect.y + setting.textY, width);
        }
    };

    const _Window_SavefileList_prototype_drawPartyCharacters = Window_SavefileList.prototype.drawPartyCharacters;
    Window_SavefileList.prototype.drawPartyCharacters = function(info, x, y) {
        if (DRAW_PARTY_CHARACTERS) _Window_SavefileList_prototype_drawPartyCharacters.apply(this, arguments);
    };

})();
