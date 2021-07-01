//=============================================================================
// RPG Maker MZ - ActorPictureOnAltMenuScreen
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Changes actor faces into pictures on AltMenuScreen.
 * @author nz_prism
 * @base ActorPictures
 * @base AltMenuScreen
 *
 * @help ActorPictureOnAltMenuScreen.js
 *
 * This plugin changes actor faces into pictures on AltMenuScreen.
 * It reequires both ActorPictures.js and AltMenuScreen.js.
 * If the pictures aren't at right place, use plugin parameters
 * "Picture Offset X" and "Picture Offset Y".
 *
 * This plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param pictureSx
 * @text Picture Offset X
 * @desc Specify the X offset value for pictures.
 * @default 56
 * @type number
 * @min -10000
 * 
 * @param pictureSy
 * @text Picture Offset Y
 * @desc Specify the Y offset value for pictures.
 * @default 0
 * @type number
 * @min -10000
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc AltMenuScreenの顔グラフィックを立ち絵に変更します。
 * @author nz_prism
 * @base ActorPictures
 * @base AltMenuScreen
 *
 * @help ActorPictureOnAltMenuScreen.js
 *
 * このプラグインは、AltMenuScreenにて描画される顔グラフィックをアクターの立ち絵
 * に変更します。
 * ActorPictures.jsおよびAltMenuScreen.jsが前提プラグインとなります。
 * 立ち絵がずれる場合、プラグインパラメータ「立ち絵オフセットX」「立ち絵オフセッ
 * トY」にて調整してください。
 *
 * このプラグインはMITライセンスにてリリースされています。
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param pictureSx
 * @text 立ち絵オフセットX
 * @desc アクターの立ち絵のX座標オフセット値です。
 * @default 56
 * @type number
 * @min -10000
 * 
 * @param pictureSy
 * @text 立ち絵オフセットY
 * @desc アクターの立ち絵のY座標オフセット値です。
 * @default 0
 * @type number
 * @min -10000
 * 
 */

(() => {
    'use strict';
    const PLUGIN_NAME = "ActorPictureOnAltMenuScreen";
    const pluginParams = PluginManager.parameters(PLUGIN_NAME);

    const PICTURE_SX = Number(pluginParams.pictureSx);
    const PICTURE_SY = Number(pluginParams.pictureSy);


    Window_MenuStatus.prototype.drawItemImage = function(index) {
        const actor = this.actor(index);
        const rect = this.itemRectWithPadding(index);
        const w = rect.width;
        const h = rect.height;
        this.changePaintOpacity(actor.isBattleMember());
        this.drawActorPicture(actor, rect.x, rect.y, w, h, PICTURE_SX, PICTURE_SY);
        this.changePaintOpacity(true);
    };

    
})();
