//=============================================================================
// RPG Maker MZ - 
//=============================================================================

/*:
 * @target MZ
 * @plugindesc This plugin scrolls the windows' back.
 * @author nz_prism
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ScrollingWindowBack/js/plugins/ScrollingWindowBack.js
 *
 * @help ScrollingWindowBack.js
 * ver 1.0.0
 *
 * [History]
 * 09/09/2021 1.0.0 Released
 *
 * This plugin scrolls the windows' back.
 * You can controll the X & Y scroll rates with the plugin parameters.
 *
 * This plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 *
 * 
 * @param scrollX
 * @text Scroll X
 * @desc The value for the X scroll rate. Negative value acceptable.
 * @default 1
 * @type number
 * @min -999999999
 * 
 * @param scrollY
 * @text Scroll Y
 * @desc The value for the Y scroll rate. Negative value acceptable.
 * @default 1
 * @type number
 * @min -999999999
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc ウィンドウの背景をスクロールさせます。
 * @author nz_prism
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ScrollingWindowBack/js/plugins/ScrollingWindowBack.js
 *
 * @help ScrollingWindowBack.js
 * ver 1.0.0
 *
 * [バージョン履歴]
 * 2021/09/09 1.0.0 リリース
 * 
 * このプラグインは、ウィンドウの背景をスクロールさせます。
 * X軸とY軸それぞれにスクロール速度を設定可能です。
 * 
 * 
 * このプラグインはMITライセンスにてリリースされています。
 * https://opensource.org/licenses/mit-license.php
 * 
 *
 * @param scrollX
 * @text X軸スクロール速度
 * @desc X軸のスクロール速度です。マイナスにも設定可能です。
 * @default 1
 * @type number
 * @min -999999999
 * 
 * @param scrollY
 * @text Y軸スクロール速度
 * @desc Y軸のスクロール速度です。マイナスにも設定可能です。
 * @default 1
 * @type number
 * @min -999999999
 * 
 */

(() => {
    'use strict';
    const PLUGIN_NAME = "ScrollingWindowBack";
    const pluginParams = PluginManager.parameters(PLUGIN_NAME);

    const SCROLL_X = Number(pluginParams.scrollX);
    const SCROLL_Y = Number(pluginParams.scrollY);

    const _Window_Base_prototype_update = Window_Base.prototype.update;
    Window_Base.prototype.update = function() {
        _Window_Base_prototype_update.call(this);
        const sprite = this._backSprite;
        const tilingSprite = sprite.children[0];
        const x2 = tilingSprite.origin.x + SCROLL_X;
        const y2 = tilingSprite.origin.y - SCROLL_Y;
        tilingSprite.origin.x = x2 > sprite.width ? 0 : x2;
        tilingSprite.origin.y = y2 < 0 ? sprite.height : y2;
    };

})();
