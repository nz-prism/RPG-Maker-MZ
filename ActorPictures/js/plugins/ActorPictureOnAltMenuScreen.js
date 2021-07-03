//=============================================================================
// RPG Maker MZ - ActorPictureOnAltMenuScreen
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Changes actor faces into pictures on AltMenuScreen.
 * @author nz_prism
 * @base ActorPictures
 * @base AltMenuScreen
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ActorPictures/js/plugins/ActorPictureOnAltMenuScreen.js
 *
 * @help ActorPictureOnAltMenuScreen.js
 * ver 1.1.0
 *
 * [History]
 * 07/01/2021 1.0.0 Released
 * 07/02/2021 1.1.0 Updated in accordance with ActorPictures.js
 *
 * This plugin changes actor faces into pictures on AltMenuScreen.
 * It requires both ActorPictures.js and AltMenuScreen.js.
 *
 * This plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc AltMenuScreenの顔グラフィックを立ち絵に変更します。
 * @author nz_prism
 * @base ActorPictures
 * @base AltMenuScreen
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ActorPictures/js/plugins/ActorPictureOnAltMenuScreen.js
 *
 * @help ActorPictureOnAltMenuScreen.js
 * ver 1.1.0
 *
 * [バージョン履歴]
 * 2021/07/01 1.0.0 リリース
 * 2021/07/02 1.1.0 ActorPictures.jsに合わせて更新
 *
 * このプラグインは、AltMenuScreenにて描画される顔グラフィックをアクターの立ち絵
 * に変更します。
 * ActorPictures.jsおよびAltMenuScreen.jsが前提プラグインとなります。
 *
 * このプラグインはMITライセンスにてリリースされています。
 * https://opensource.org/licenses/mit-license.php
 * 
 */

(() => {
    'use strict';


    Window_MenuStatus.prototype.drawItemImage = function(index) {
        const actor = this.actor(index);
        const rect = this.itemRectWithPadding(index);
        const w = rect.width;
        const h = rect.height;
        this.changePaintOpacity(actor.isBattleMember());
        this.drawActorPicture(actor, rect.x, rect.y, w, h, true, true);
        this.changePaintOpacity(true);
    };

})();
