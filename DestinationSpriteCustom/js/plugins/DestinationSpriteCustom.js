//=============================================================================
// RPG Maker MZ - DestinationSpriteCustom
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 
 * @author nz_prism
 * @url 
 *
 * @help DestinationSpriteCustom.js
 * ver. 1.0.0
 * 
 * [History]
 * 05/14/2022 1.0.0 Released
 * 
 * This plugin provides a functionality to customize the effect when a player
 * clicks on the map.
 * If the plugin parameter "Show Destination Effect" is set false, no effect
 * will be shown.
 * If you specify an image for the plugin parameter "Destination Image Name"
 * from system folder, it will be shown when the map is clicked.
 * If no image is specified, the figure specified by the plugin parameter
 * "Destination Figure" will be shown with color specified by the plugin
 * parameter "Figure Color".
 * You can specify the blend mode for the plugin parameter "Blend Mode" like
 * picture events.
 * The image opacity which increases every frame can be specified by the
 * plugin parameter "IncreasingOpacity per Frame".
 * The base scale for the image can be specified with the plugin parameter
 * "Base Scale". By default, the scale increases every frame just like MZ
 * default but if the plugin parameter "Fix Scale" is true, the scale will be
 * fixed.
 * 
 * 
 * This plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 * 
 * @param showDestinationSprite
 * @text Show Destination Effect
 * @desc If false, the destination effect will not be shown.
 * @default true
 * @type boolean
 * 
 * @param destinationSpriteSetting
 * @text Destination Effect Settings
 * @desc The settings for the destination effect.
 * 
 * @param destinationSpriteImage
 * @text Destination Image
 * @desc The settings for the destination image.
 * @parent destinationSpriteSetting
 * 
 * @param imageName
 * @text Destination Image Name
 * @desc The destination image file. If no image is set, alternative figure will be shown.
 * @parent destinationSpriteImage
 * @type file
 * @dir img/system/
 * 
 * @param bitmapFigure
 * @text Destination Figure
 * @desc Specify a figure shown when no image is set.
 * @parent destinationSpriteImage
 * @default square
 * @type select
 * @option Square
 * @value square
 * @option Circle
 * @value circle
 * 
 * @param bitmapColor
 * @text Figure Color
 * @desc Specify a figure color shown when no image is set.
 * @parent bitmapFigure
 * @default {"red":"255","green":"255","blue":"255"}
 * @type struct<rgb>
 * 
 * @param blendMode
 * @text Blend Mode
 * @desc The blend mode for the destination image.
 * @parent destinationSpriteSetting
 * @default 1
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * 
 * @param opacityPerFrame
 * @text Increasing Opacity per Frame
 * @desc The increasing image opacity per frame.
 * @parent destinationSpriteSetting
 * @default 6
 * @type number
 * @min 1
 * @max 14
 * 
 * @param baseScale
 * @text Base Scale
 * @desc The base scale for the image.
 * @parent destinationSpriteSetting
 * @default 1
 * @type number
 * @min 0
 * @decimals 2
 * 
 * @param fixScale
 * @text Fix Scale
 * @desc If true, the scale will be fixed.
 * @parent destinationSpriteSetting
 * @default false
 * @type boolean
 * 
 */

/*~struct~rgb:
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
 */

/*:ja
 * @target MZ
 * @plugindesc マップクリック時の点滅をカスタマイズします。
 * @author nz_prism
 * @url 
 *
 * @help DestinationSpriteCustom.js
 * ver. 1.0.0
 * 
 * [バージョン履歴]
 * 2022/05/14 1.0.0 リリース
 * 
 * このプラグインはマップをクリックした際に表示される点滅をカスタマイズする機能
 * を提供します。
 * プラグインパラメータ「目的地点滅を表示する」をオフにすると何も表示されなくな
 * ります。
 * プラグインパラメータ「点滅画像ファイル」にてsystemフォルダ内の画像ファイルを
 * 指定するとその画像が表示されるようになります。
 * 画像を指定しない場合、プラグインパラメータ「点滅図形」にてを指定した図形が表
 * 示されます（デフォルトは標準と同様の正方形です）。図形の色はプラグインパラ
 * メータ「図形色」にて指定できます。
 * プラグインパラメータ「合成方法」にて、ピクチャと同様の合成方法が指定できま
 * す。
 * プラグインパラメータ「1フレームあたり増加画像不透明度」にて点滅時毎フレーム
 * 増加する不透明度を指定できます。
 * プラグインパラメータ「基本拡大率」にて拡大率の初期値を指定できます。デフォル
 * トでは標準と同様毎フレーム拡大率が増加しますが、プラグインパラメータ「拡大率
 * を固定する」をオンにすると拡大率が「基本拡大率」に固定されます。
 * 
 * 
 * このプラグインはMITライセンスにてリリースされています。
 * https://opensource.org/licenses/mit-license.php
 * 
 * 
 * @param showDestinationSprite
 * @text 目的地点滅を表示する
 * @desc オフにした場合、目的地点滅が表示されなくなります。
 * @default true
 * @type boolean
 * 
 * @param destinationSpriteSetting
 * @text 目的地点滅設定
 * @desc マップクリック時の点滅に関する設定です。
 * 
 * @param destinationSpriteImage
 * @text 目的地点滅画像
 * @desc マップクリック時に点滅する画像に関する設定です。
 * @parent destinationSpriteSetting
 * 
 * @param imageName
 * @text 点滅画像ファイル
 * @desc 点滅する画像ファイルです。未指定の場合、以下で指定する図形が使用されます。
 * @parent destinationSpriteImage
 * @type file
 * @dir img/system/
 * 
 * @param bitmapFigure
 * @text 点滅図形
 * @desc 画像ファイル未指定時の図形の形状を選択してください。
 * @parent destinationSpriteImage
 * @default square
 * @type select
 * @option 正方形
 * @value square
 * @option 円形
 * @value circle
 * 
 * @param bitmapColor
 * @text 図形色
 * @desc 画像ファイルを指定しなかった場合に表示される図形の色です。
 * @parent bitmapFigure
 * @default {"red":"255","green":"255","blue":"255"}
 * @type struct<rgb>
 * 
 * @param blendMode
 * @text 合成方法
 * @desc 点滅する画像の合成方法です。
 * @parent destinationSpriteSetting
 * @default 1
 * @type select
 * @option 通常
 * @value 0
 * @option 加算
 * @value 1
 * @option 乗算
 * @value 2
 * @option スクリーン
 * @value 3
 * 
 * @param opacityPerFrame
 * @text 1フレームあたり増加画像不透明度
 * @desc 1フレームあたりに増加する画像の不透明度です。
 * @parent destinationSpriteSetting
 * @default 6
 * @type number
 * @min 1
 * @max 14
 * 
 * @param baseScale
 * @text 基本拡大率
 * @desc 画像の基本拡大率です。
 * @parent destinationSpriteSetting
 * @default 1
 * @type number
 * @min 0
 * @decimals 2
 * 
 * @param fixScale
 * @text 拡大率を固定する
 * @desc オンにすると拡大率が基本値のまま固定されます。
 * @parent destinationSpriteSetting
 * @default false
 * @type boolean
 * 
 */

/*~struct~rgb:ja
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
 */

(() => {
    'use strict';
    const PLUGIN_NAME = "DestinationSpriteCustom";
    const pluginParams = PluginManager.parameters(PLUGIN_NAME);

    const SHOW_DESTINATION_SPRITE = pluginParams.showDestinationSprite === "true";
    const IMAGE_NAME = pluginParams.imageName;
    const BITMAP_FIGURE = pluginParams.bitmapFigure;
    const BLEND_MODE = Number(pluginParams.blendMode);
    const OPACITY_PER_FRAME = Number(pluginParams.opacityPerFrame);
    const BASE_SCALE = Number(pluginParams.baseScale);
    const FIX_SCALE = pluginParams.fixScale === "true";

    const bitmapColor = JSON.parse(pluginParams.bitmapColor);
    const BITMAP_COLOR = "rgba(" + bitmapColor.red + "," + bitmapColor.green + "," + bitmapColor.blue + ")";


    const _Sprite_Destination_prototype_update = Sprite_Destination.prototype.update;
    Sprite_Destination.prototype.update = function() {
        _Sprite_Destination_prototype_update.call(this);
        if (!SHOW_DESTINATION_SPRITE) this.visible = false;
    };
    
    Sprite_Destination.prototype.createBitmap = function() {
        if (IMAGE_NAME) {
            this.bitmap = ImageManager.loadSystem(IMAGE_NAME);
        } else {
            const tileWidth = $gameMap.tileWidth();
            const tileHeight = $gameMap.tileHeight();
            const bitmap = new Bitmap(tileWidth, tileHeight);
            switch (BITMAP_FIGURE) {
                case "circle":
                    const r = tileWidth / 2;
                    bitmap.drawCircle(r, r, r, BITMAP_COLOR);
                    break;
                default:
                    bitmap.fillAll(BITMAP_COLOR);
                    break;
            }
            this.bitmap = bitmap;
            
        }
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.blendMode = BLEND_MODE;
    };
    
    Sprite_Destination.prototype.updateAnimation = function() {
        this._frameCount++;
        this._frameCount %= 20;
        this.opacity = (20 - this._frameCount) * OPACITY_PER_FRAME;
        this.scale.x = BASE_SCALE + (FIX_SCALE ? 0 : this._frameCount / 20);
        this.scale.y = this.scale.x;
    };

})();
