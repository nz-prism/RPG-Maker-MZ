//=============================================================================
// RPG Maker MZ - MenuStatusPictures
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Shows back and fore images on a menu status window.
 * @author nz_prism
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/MenuStatusPictures/js/plugins/MenuStatusPictures.js
 *
 * @help MenuStatusPictures.js
 * ver 1.0.2
 *
 * [History]
 * 05/15/2021 1.0.0 Released
 * 06/22/2021 1.0.1 Sub-folder compatibility for RMMZ 1.3.0 or later
 * 07/06/2021 1.0.2 Supported sub-folder improvement of RMMZ 1.3.2
 * 
 * This plugin enables to show back and fore images on a menu status window.
 * You can specify XY coordinates for the pictures.
 * 
 * 
 * This plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 * 
 * @param backImage
 * @text Back Image
 * @desc A back image shown on a menu status window for each actor.
 * @type struct<imageInfo>
 * 
 * @param frontImage
 * @text Front Image
 * @desc A fore image shown on a menu status window for each actor.
 * @type struct<imageInfo>
 * 
 */

/*~struct~imageInfo:
 *
 * @param pictureName
 * @text Picture File Name
 * @desc The file name of the picture.
 * @type file
 * @dir img/pictures
 * 
 * @param x
 * @text Actor Rect X
 * @desc The coordinate X within an actor rect.
 * @default 0
 * @type number
 * @min -10000
 * 
 * @param y
 * @text Actor Rect Y
 * @desc The coordinate Y within an actor rect.
 * @default 0
 * @type number
 * @min -10000
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc メニューステータスでウィンドウの背景と前景を設定するプラグインです。
 * @author nz_prism
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/MenuStatusPictures/js/plugins/MenuStatusPictures.js
 *
 * @help MenuStatusPictures.js
 * ver 1.0.2
 *
 * [バージョン履歴]
 * 2021/05/15 1.0.0 リリース
 * 2021/06/22 1.0.1 本体バージョン1.3.0以降のサブフォルダへの格納に対応
 * 2021/07/06 1.0.2 本体バージョン1.3.2のサブフォルダ機能改善に対応
 * 
 * このプラグインは、メニューステータスにてウィンドウの背面と前面に画像を表示します。
 * 画像はそれぞれ座標を指定することができます。
 * 
 * 
 * このプラグインはMITライセンスにてリリースされています。
 * https://opensource.org/licenses/mit-license.php
 * 
 * 
 * @param backImage
 * @text 背面画像
 * @desc メニュー画面でアクターそれぞれの背面に表示される画像です。
 * @type struct<imageInfo>
 * 
 * @param frontImage
 * @text 前面画像
 * @desc メニュー画面でアクターそれぞれの前面に表示される画像です。
 * @type struct<imageInfo>
 * 
 */

/*~struct~imageInfo:ja
 *
 * @param pictureName
 * @text 画像ファイル名
 * @desc 画像のファイル名です。
 * @type file
 * @dir img/pictures
 * 
 * @param x
 * @text アクター枠内X座標
 * @desc 画像のアクター枠内X座標です。
 * @default 0
 * @type number
 * @min -10000
 * 
 * @param y
 * @text アクター枠内Y座標
 * @desc 画像のアクター枠内Y座標です。
 * @default 0
 * @type number
 * @min -10000
 * 
 */

(() => {
    'use strict';
    const PLUGIN_NAME = "MenuStatusPictures";
    const pluginParams = PluginManager.parameters(PLUGIN_NAME);

    
    const BACK_IMAGE = {};
    for (let ary of Object.entries(JSON.parse(pluginParams.backImage))) {
        let key = ary[0];
        BACK_IMAGE[key] = (key === "pictureName") ? ary[1] : Number(ary[1]);
    }

    const FRONT_IMAGE = {};
    for (let ary of Object.entries(JSON.parse(pluginParams.frontImage))) {
        let key = ary[0];
        FRONT_IMAGE[key] = (key === "pictureName") ? ary[1] : Number(ary[1]);
    }

    const _Window_MenuStatus_prototype_drawItemImage = Window_MenuStatus.prototype.drawItemImage;
    Window_MenuStatus.prototype.drawItemImage = function(index) {
        this.drawBackImage(index);
        _Window_MenuStatus_prototype_drawItemImage.call(this, index);
        this.drawFrontImage(index);
    };
    
    Window_MenuStatus.prototype.drawBackImage = function(index) {
		const rect = this.itemRect(index);
		const bitmap = ImageManager.loadPicture(BACK_IMAGE.pictureName);
        this.contents.blt(bitmap, 0, 0, rect.width, rect.height, rect.x+BACK_IMAGE.x, rect.y+BACK_IMAGE.y);
	};

    Window_MenuStatus.prototype.drawFrontImage = function(index) {
		const rect = this.itemRect(index);
		const bitmap = ImageManager.loadPicture(FRONT_IMAGE.pictureName);
        this.contents.blt(bitmap, 0, 0, rect.width, rect.height, rect.x+FRONT_IMAGE.x, rect.y+FRONT_IMAGE.y);
	};

})();
