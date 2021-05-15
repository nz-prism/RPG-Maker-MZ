//=============================================================================
// RPG Maker MZ - MenuStatusPictures
//=============================================================================

/*:
 * @target MZ
 * @plugindesc メニューステータスでウィンドウの背景と前景を設定するプラグインです。
 * @author nz_prism
 *
 * @help メニューステータスでウィンドウの背景と前景を設定するプラグインです。
 *
 * @param backImage
 * @text 背面画像
 * @desc メニュー画面でアクターそれぞれの背面に表示される画像です。
 * @default 
 * @type struct<imageInfo>
 * 
 * @param frontImage
 * @text 前面画像
 * @desc メニュー画面でアクターそれぞれの前面に表示される画像です。
 * @default 
 * @type struct<imageInfo>
 * 
 */

/*~struct~imageInfo:
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
 * @type number
 * @min -10000
 * 
 * @param y
 * @text アクター枠内Y座標
 * @desc 画像のアクター枠内Y座標です。
 * @type number
 * @min -10000
 * 
 */

(() => {
    'use strict';


    const PLUGIN_NAME = "MenuStatusPictures";

    
    const BACK_IMAGE = {};
    for (let ary of Object.entries(JSON.parse(PluginManager.parameters(PLUGIN_NAME).backImage))) {
        let key = ary[0];
        BACK_IMAGE[key] = (key === "pictureName") ? ary[1] : Number(ary[1]);
    }

    const FRONT_IMAGE = {};
    for (let ary of Object.entries(JSON.parse(PluginManager.parameters(PLUGIN_NAME).frontImage))) {
        let key = ary[0];
        FRONT_IMAGE[key] = (key === "pictureName") ? ary[1] : Number(ary[1]);
    }

    const _Window_MenuStatus_prototype_drawItemImage = Window_MenuStatus.prototype.drawItemImage;
    Window_MenuStatus.prototype.drawItemImage = function(index) {
        this.drawBackImage(index);
        _Window_MenuStatus_prototype_drawItemImage.call(this, index);
        this.drawFrontImage(index);
    };
    
    Window_Base.prototype.drawBackImage = function(index) {
		const rect = this.itemRect(index);
		const bitmap = ImageManager.loadPicture(BACK_IMAGE.pictureName);
        this.contents.blt(bitmap, 0, 0, rect.width, rect.height, rect.x+BACK_IMAGE.x, rect.y+BACK_IMAGE.y);
	};

    Window_Base.prototype.drawFrontImage = function(index) {
		const rect = this.itemRect(index);
		const bitmap = ImageManager.loadPicture(FRONT_IMAGE.pictureName);
        this.contents.blt(bitmap, 0, 0, rect.width, rect.height, rect.x+FRONT_IMAGE.x, rect.y+FRONT_IMAGE.y);
	};

})();
