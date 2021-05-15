//=============================================================================
// RPG Maker MZ - Cursor Application to Button Picture
//=============================================================================

/*:
 * @target MZ
 * @base ButtonPicture
 * @orderAfter ButtonPicture
 * @plugindesc Adds a cursor sptrite to a button picture when selected.
 * @author nz_prism
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/CursorApplicationToButtonPicture/js/plugins/CursorApplicationToButtonPicture.js
 *
 * @help CursorApplicationToButtonPicture.js
 * ver. 1.2.0
 * 
 * [History]
 * 02/24/2021 ver 1.0.0 Released
 * 02/25/2021 ver.1.1.0 Corrected some glitches and implemented Border line offset and Cursor SE.
 * 05/15/2021 ver.1.2.0 Added cursor SE plugin-parameters.
 *
 * This plugin provides a functionality to add a cursor sprite to
 * a button picture.
 * You can choose an image file (place an image in img/system) or an enclosing rectangle for a cursor.
 * 
 * This plugin requires ButtonPicture.js.
 * Place this plugin under ButtonPicture.js.
 *
 * Use it in the following procedure.
 *   1. Execute the procedure as described in ButonPicture.js.
 *   2. Configure the plugin parameters.
 *   3. When a mouse cursor enters a button picture, a cursor sprite appears.
 *
 * Special thanks to Yoji Ojima, who created ButtonPicture.js.
 * This plugin is released under the MIT License.
 * https://opensource.org/licenses/mit-license.php
 * 
 * 
 * @param useSystemCursorSe
 * @text Use System Cursor SE
 * @desc If ON, the system cursor SE will be used for the button pictures. If OFF, set the cursor SE.
 * @default true
 * @type boolean
 * 
 * @param buttonPictureCursorSe
 * @text Cursor SE
 * @desc If Use System Cursor SE is OFF, set an SE played for cursoring button pictures.
 * @default {"name":"","pan":"0","pitch":"100","volume":"90"}
 * @type struct<se>
 * 
 * @param useCursorImage
 * @text Use Cursor Image
 * @desc Set whether you use a cursor image.
 * @default false
 * @type boolean
 * 
 * @param cursorImageName
 * @text Cursor Image Name
 * @desc If you use a cursor image, choose a image file.
 * @default Cursor
 * @type file
 * @dir img/system/
 * 
 * @param isCursorXRight
 * @text Place Cursor Right
 * @desc If you use a cursor image, set whether you place the cursor at the right of the button picture. If false, it's placed at the left.
 * @default true
 * @type boolean
 * 
 * @param isCursorYDown
 * @text Place Cursor Down
 * @desc If you use a cursor image, set whether you place the cursor at the down of the button picture. If false, it's placed at the up.
 * @default true
 * @type boolean
 * 
 * @param borderWidth
 * @text Border Line Width
 * @desc If you don't use a cursor image, set the width of the border line.
 * @default 3
 * @type number
 * @min 0
 * 
 * @param isBorderOffset
 * @text Border Line Offset
 * @desc If you don't use a cursor image, specify whether the border line offsets outside the picture.
 * @default false
 * @type boolean
 * 
 * @param borderColor
 * @text Border Line Color
 * @desc If you don't use a cursor image, set the color of the border line.
 * @default {"red":"255","green":"255","blue":"255","alpha":"0.5"}
 * @type struct<rgba>
 * 
 */

/*~struct~se:
 *
 * @param name
 * @text SE File Name
 * @desc The file name for the SE.
 * @type file
 * @dir audio/se/
 *
 * @param pan
 * @text SE Pan
 * @desc The pan of the SE.
 * @default 0
 * @type number
 * @max 100
 * @min -100
 * 
 * @param pitch
 * @text SE Pitch
 * @desc The pitch for the SE.
 * @default 100
 * @type number
 * @max 150
 * @min 50
 * 
 * @param volume
 * @text SE Volume
 * @desc The volume for the SE.
 * @default 90
 * @type number
 * @max 100
 * @min 0
 * 
 */

/*~struct~rgba:
 *
 * @param red
 * @text Red
 * @desc The value of red.
 * @type number
 * @max 255
 * @min 0
 * 
 * @param green
 * @text Green
 * @desc The value of green.
 * @type number
 * @max 255
 * @min 0
 * 
 * @param blue
 * @text Blue
 * @desc The value of blue.
 * @type number
 * @max 255
 * @min 0
 * 
 * @param alpha
 * @text Alpha
 * @desc The value of alpha.
 * @type number
 * @max 255
 * @min 0
 * @decimals 1
 * 
 */

/*:ja
 * @target MZ
 * @base ButtonPicture
 * @orderAfter ButtonPicture
 * @plugindesc ピクチャボタンにマウスカーソルが重なった時カーソルを表示します。
 * @author nz_prism
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/CursorApplicationToButtonPicture/js/plugins/CursorApplicationToButtonPicture.js
 *
 * @help CursorApplicationToButtonPicture.js
 * ver. 1.2.0
 *
 * [バージョン履歴]
 * 2021/02/24 ver 1.0.0 リリース
 * 2021/02/25 ver.1.1.0 軽微なバグ修正。枠線オフセット、カーソルSE演奏対応。
 * 2021/05/15 ver.1.2.0 カーソルSE選択プラグインパラメータの追加。
 * 
 * このプラグインは、ピクチャにマウスカーソルが重なった時にカーソルを
 * 表示する機能を提供します。
 * カーソルは画像（img/systemフォルダ）かピクチャを囲む枠線を選択できます。
 * 
 * このプラグインはButtonPicture.jsが導入されていることを前提とします。
 * ButtonPicture.jsよりも下に配置してください。
 *
 * 次の手順で使用してください。
 *   1. ButtonPicture.jsの手順通りに設定してください。
 *   2. プラグインパラメータを必要に応じて設定してください。
 *   3. ピクチャボタンにマウスカーソルが重なるとカーソルが表示されます。
 * 
 * ButtonPicture.jsの作者であるYoji Ojima氏に感謝いたします。
 * このプラグインはMITライセンスにてリリースされています。
 * https://opensource.org/licenses/mit-license.php
 * 
 * 
 * @param useSystemCursorSe
 * @text システムカーソルSEの使用
 * @desc オンにするとカーソル選択時のSEとして、システムカーソルSEが使用されます。オフの場合、カーソルSEを設定してください。
 * @default true
 * @type boolean
 * 
 * @param buttonPictureCursorSe
 * @text カーソルSE
 * @desc システムカーソルSEの使用がオフの場合に、カーソル選択時に鳴らす効果音を設定してください。
 * @default {"name":"","pan":"0","pitch":"100","volume":"90"}
 * @type struct<se>
 * 
 * @param useCursorImage
 * @text カーソル画像の使用
 * @desc カーソル画像を使用するかどうかを選択してください。
 * @default false
 * @type boolean
 * 
 * @param cursorImageName
 * @text カーソル画像
 * @desc カーソル画像を使用する場合、使用する画像を選択してください。画像はimg/systemフォルダに入れてください。
 * @default Cursor
 * @type file
 * @dir img/system/
 * 
 * @param isCursorXRight
 * @text カーソルX右寄せ
 * @desc カーソル画像を使用する場合、カーソル画像のX座標を画像本体の右端にするかどうかを設定してください。falseの場合、左端になります。
 * @default true
 * @type boolean
 * 
 * @param isCursorYDown
 * @text カーソルY下寄せ
 * @desc カーソル画像を使用する場合、カーソル画像のY座標を画像本体の下端にするかどうかを設定してください。falseの場合、上端になります。
 * @default true
 * @type boolean
 * 
 * @param borderWidth
 * @text 枠線太さ
 * @desc カーソル画像を使用しない場合、画像の外枠太さを指定してください。
 * @default 3
 * @type number
 * @min 0
 * 
 * @param isBorderOffset
 * @text 枠線オフセット
 * @desc カーソル画像を使用しない場合の外枠がピクチャからはみ出すかどうかを指定してください。
 * @default true
 * @type boolean
 * 
 * @param borderColor
 * @text 枠線色
 * @desc カーソル画像を使用しない場合、画像外枠の色を指定してください。
 * @default {"red":"255","green":"255","blue":"255","alpha":"0.5"}
 * @type struct<rgba>
 * 
 */

/*~struct~se:
 *
 * @param name
 * @text SEファイル名
 * @desc SEのファイル名です。
 * @type file
 * @dir audio/se/
 *
 * @param volume
 * @text SE音量
 * @desc SEの音量です。
 * @default 90
 * @type number
 * @max 100
 * @min 0
 * 
 * @param pitch
 * @text SEピッチ
 * @desc SEのピッチです。
 * @default 100
 * @type number
 * @max 150
 * @min 50
 * 
 * @param pan
 * @text SE位相（パン）
 * @desc SEの位相（パン）値です。
 * @default 0
 * @type number
 * @max 100
 * @min -100
 * 
 */

/*~struct~rgba:ja
 *
 * @param red
 * @text 赤
 * @desc 赤の値です。
 * @type number
 * @max 255
 * @min 0
 * 
 * @param green
 * @text 緑
 * @desc 緑の値です。
 * @type number
 * @max 255
 * @min 0
 * 
 * @param blue
 * @text 青
 * @desc 青の値です。
 * @type number
 * @max 255
 * @min 0
 * 
 * @param alpha
 * @text アルファ
 * @desc アルファ値です。
 * @type number
 * @max 255
 * @min 0
 * @decimals 1
 * 
 */

(() => {
    'use strict';

    const pluginName = "CursorApplicationToButtonPicture";


    const USE_SYSTEM_CURSOR_SE = PluginManager.parameters(pluginName).useSystemCursorSe === "true";
    const USE_CURSOR_IMAGE = PluginManager.parameters(pluginName).useCursorImage === "true";
    const CURSOR_IMAGE_NAME = PluginManager.parameters(pluginName).cursorImageName;
    const IS_CURSOR_X_RIGHT = PluginManager.parameters(pluginName).isCursorXRight === "true";
    const IS_CURSOR_Y_DOWN = PluginManager.parameters(pluginName).isCursorYDown === "true";
    const BORDER_WIDTH = Number(PluginManager.parameters(pluginName).borderWidth);
    const IS_BORDER_OFFSET = PluginManager.parameters(pluginName).isBorderOffset === "true";
    const bordrColorObj = JSON.parse(PluginManager.parameters(pluginName).borderColor);
    const BORDER_COLOR = "rgba(" + bordrColorObj.red + "," + bordrColorObj.green + "," + bordrColorObj.blue + "," + bordrColorObj.alpha + ")";
    const BUTTON_PICTURE_CURSOR_SE = {};
    for (const ary of Object.entries(JSON.parse(PluginManager.parameters(pluginName).buttonPictureCursorSe))) {
        const key = ary[0];
        BUTTON_PICTURE_CURSOR_SE[key] = (key === "name") ? ary[1] : Number(ary[1]);
    }


    SoundManager.playButtonPictureCursor = function() {
        AudioManager.playStaticSe(BUTTON_PICTURE_CURSOR_SE);
    };


    Sprite_Picture.prototype.createCursorSprite = function() {
        const mainBitmap = this.bitmap;
        if (mainBitmap) {
            const sprite = new Sprite();
            this._cursorSprite = sprite;
            this.addChild(sprite);
            const width = mainBitmap.width;
            const height = mainBitmap.height;
            let cursorBitmap;
            if (USE_CURSOR_IMAGE) {
                cursorBitmap = ImageManager.loadSystem(CURSOR_IMAGE_NAME);
                sprite.x = IS_CURSOR_X_RIGHT ? width : 0;
                sprite.y = IS_CURSOR_Y_DOWN ? height : 0;
            } else {
                const diff = IS_BORDER_OFFSET ? BORDER_WIDTH : 0;
                const offsetWidth = width - BORDER_WIDTH + diff * 2;
                const offsetHeight = height - BORDER_WIDTH + diff * 2;
                cursorBitmap = new Bitmap(width + diff * 2, height + diff * 2);
                cursorBitmap.fillRect(0, 0, BORDER_WIDTH, offsetHeight, BORDER_COLOR);
                cursorBitmap.fillRect(BORDER_WIDTH, 0, offsetWidth, BORDER_WIDTH, BORDER_COLOR);
                cursorBitmap.fillRect(offsetWidth, BORDER_WIDTH, BORDER_WIDTH, offsetHeight, BORDER_COLOR);
                cursorBitmap.fillRect(0, offsetHeight, offsetWidth, BORDER_WIDTH, BORDER_COLOR);
                sprite.x = -diff;
                sprite.y = -diff;
            }
            sprite.bitmap = cursorBitmap;
        }
    };

    const _Sprite_Picture_prototype_onMouseEnter = Sprite_Picture.prototype.onMouseEnter;
    Sprite_Picture.prototype.onMouseEnter = function() {
        _Sprite_Picture_prototype_onMouseEnter.call(this);
        if (this.picture().mzkp_commonEventId) {
            if (!this._cursorSprite) this.createCursorSprite();
            if (USE_SYSTEM_CURSOR_SE) {
                SoundManager.playCursor();
            } else {
                SoundManager.playButtonPictureCursor();
            }
            this._cursorSprite.show();
            console.log("test")
        }
    };

    const _Sprite_Picture_prototype_onMouseExit = Sprite_Picture.prototype.onMouseExit;
    Sprite_Picture.prototype.onMouseExit = function() {
        _Sprite_Picture_prototype_onMouseExit.call(this);
        if (this._cursorSprite) this._cursorSprite.hide();
    };

})();
