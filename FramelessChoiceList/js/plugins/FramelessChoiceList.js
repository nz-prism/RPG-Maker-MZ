//=============================================================================
// RPG Maker MZ - FramelessChoiceList
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Makes the choice window frameless.
 * @author nz_prism
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/FramelessChoiceList/js/plugins/FramelessChoiceList.js
 *
 * @help FramelessChoiceList.js
 * ver 1.1.0
 *
 * [History]
 * 06/26/2021 1.0.0 Released
 * 06/26/2021 1.1.0 Added a plugin parameter Y Axis Offset.
 * 
 * This plugin makes the choice window frameless and display black
 * backs with gradation for choices. It also display selection
 * images at the choice headers, which switch active/deactive
 * images. If you don't use images, cursor flash will be used
 * instead. You can configure the window width and item height
 * with the plugin parameters.
 * 
 * 
 * This plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 *
 * @param windowWidthPlus
 * @text Window Width Plus
 * @desc The value added to the choice window width.
 * @default 480
 * @type number
 * @min -10000
 * 
 * @param lineHeight
 * @text Line Height
 * @desc The height for the choice items.
 * @default 36
 * @type number
 * @min 1
 * 
 * @param rowSpacing
 * @text Row Spacing
 * @desc The height allowance for the choices.
 * @default 4
 * @type number
 * @min 0
 * 
 * @param offsetY
 * @text Y Axis Offset
 * @desc The distance between the message and the choice windows.
 * @default 24
 * @type number
 * @min 0
 * 
 * @param useSelectionImage
 * @text Use Selection Image
 * @desc If true, it uses selection images. If false, cursor will be used.
 * @default true
 * @type boolean
 * 
 * @param activeSelectionImage
 * @text Active Selection Image
 * @desc An image to be shown when the choice is selected.
 * @default Selection_Active
 * @type file
 * @dir img/system
 * @parent useSelectionImage
 * 
 * @param deactiveSelectionImage
 * @text Deactive Selection Image
 * @desc An image to be shown when the choice is NOT selected.
 * @default Selection_Deactive
 * @type file
 * @dir img/system
 * @parent useSelectionImage
 * 
 * @param imageAllowance
 * @text Image Allowance
 * @desc Width between the image and the text.
 * @default 8
 * @type number
 * @min 0
 * @parent useSelectionImage
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc 選択肢ウィンドウの外見を枠のない黒背景に変更します。
 * @author nz_prism
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/FramelessChoiceList/js/plugins/FramelessChoiceList.js
 *
 * @help FramelessChoiceList.js
 * ver 1.1.0
 *
 * [バージョン履歴]
 * 2021/06/26 1.0.0 リリース
 * 2021/06/26 1.1.0 プラグインパラメータ「Y座標オフセット」を追加
 * 
 * このプラグインは、選択肢ウィンドウの枠をなくして代わりに背景をグラデーション
 * 付き黒背景にします。選択肢の行頭には選択時・非選択時に表示が切り替わる選択画
 * 像を表示できます。画像を表示しない場合、カーソルが代わりに表示されます。ま
 * た、選択肢ウィンドウの幅や項目の高さをプラグインパラメータにて柔軟に変更可能
 * です。
 * 
 * 
 * このプラグインはMITライセンスにてリリースされています。
 * https://opensource.org/licenses/mit-license.php
 * 
 *
 * @param windowWidthPlus
 * @text ウィンドウ幅加算値
 * @desc 選択肢ウィンドウの幅に加算する値です。
 * @default 480
 * @type number
 * @min -10000
 * 
 * @param lineHeight
 * @text 行高さ
 * @desc 選択肢項目の高さです。
 * @default 36
 * @type number
 * @min 1
 * 
 * @param rowSpacing
 * @text 行間隔
 * @desc 選択肢項目間の余白の高さです。
 * @default 4
 * @type number
 * @min 0
 * 
 * @param offsetY
 * @text Y座標オフセット
 * @desc 選択肢ウィンドウとメッセージウィンドウの距離です。
 * @default 24
 * @type number
 * @min 0
 * 
 * @param useSelectionImage
 * @text 選択画像を使用
 * @desc オンにすると選択画像を使用します。オフにするとカーソル表示されます。
 * @default true
 * @type boolean
 * 
 * @param activeSelectionImage
 * @text アクティブ選択画像
 * @desc 選択肢が選ばれているときに表示される画像ファイルです。
 * @default Selection_Active
 * @type file
 * @dir img/system
 * @parent useSelectionImage
 * 
 * @param deactiveSelectionImage
 * @text 非アクティブ選択画像
 * @desc 選択肢が選ばれていないときに表示される画像ファイルです。
 * @default Selection_Deactive
 * @type file
 * @dir img/system
 * @parent useSelectionImage
 * 
 * @param imageAllowance
 * @text 画像テキスト間隔
 * @desc 選択画像とテキストの間の余白幅です。
 * @default 8
 * @type number
 * @min 0
 * @parent useSelectionImage
 * 
 */

(() => {
    'use strict';
    const PLUGIN_NAME = "FramelessChoiceList";
    const pluginParams = PluginManager.parameters(PLUGIN_NAME);


    const WINDOW_WIDTH_PLUS = Number(pluginParams.windowWidthPlus);
    const LINE_HEIGHT = Number(pluginParams.lineHeight);
    const ROW_SPACING = Number(pluginParams.rowSpacing);
    const OFFSET_Y = Number(pluginParams.offsetY);

    const USE_SELECTION_IMAGE = pluginParams.useSelectionImage === "true";
    const ACTIVE_SELECTION_IMAGE = pluginParams.activeSelectionImage;
    const DEACTIVE_SELECTION_IMAGE = pluginParams.deactiveSelectionImage;
    const IMAGE_ALLOWANCE = Number(pluginParams.imageAllowance);



    const _Scene_Boot_prototype_loadSystemImages = Scene_Boot.prototype.loadSystemImages;
    Scene_Boot.prototype.loadSystemImages = function() {
        _Scene_Boot_prototype_loadSystemImages.call(this);
        ImageManager.loadSystem(ACTIVE_SELECTION_IMAGE);
        ImageManager.loadSystem(DEACTIVE_SELECTION_IMAGE);
    };


    const _Window_ChoiceList_prototype_initialize = Window_ChoiceList.prototype.initialize;
    Window_ChoiceList.prototype.initialize = function() {
        _Window_ChoiceList_prototype_initialize.call(this);
        this.backOpacity = 0;
        this.frameVisible = false;
        this.upArrowVisible = false;
        this.downArrowVisible = false;
        this._isWindow = false;
    };
    
    Window_ChoiceList.prototype.drawBackgroundRect = function(rect) {
        const color1 = ColorManager.dimColor1();
        const color2 = ColorManager.dimColor2();
        const x = rect.x;
        const y = rect.y;
        const w = rect.width;
        const h = rect.height;
        const half = w / 2;
        this.contents.gradientFillRect(x, y, half, h, color2, color1);
        this.contents.gradientFillRect(x + half, y, half, h, color1, color2);
    };

    const _Window_ChoiceList_prototype_windowWidth = Window_ChoiceList.prototype.windowWidth;
    Window_ChoiceList.prototype.windowWidth = function() {
        return Math.min(_Window_ChoiceList_prototype_windowWidth.call(this) + WINDOW_WIDTH_PLUS, Graphics.boxWidth);
    };
    
    Window_ChoiceList.prototype.rowSpacing = function() {
        return ROW_SPACING;
    };
    
    Window_ChoiceList.prototype.windowX = function() {
        return Graphics.boxWidth / 2 - this.windowWidth() / 2;
    };

    Window_ChoiceList.prototype.windowY = function() {
        const messageY = this._messageWindow.y;
        if (messageY >= Graphics.boxHeight / 2) {
            return messageY - (this.windowHeight() + OFFSET_Y);
        } else {
            return messageY + this._messageWindow.height + OFFSET_Y;
        }
    };
    
    Window_ChoiceList.prototype.lineHeight = function() {
        return LINE_HEIGHT;
    };
    
    Window_ChoiceList.prototype.drawItem = function(index) {
        const rect = this.itemLineRect(index);
        rect.x = rect.x + rect.width / 2 - this.maxChoiceWidth() / 2;
        if (USE_SELECTION_IMAGE) this.drawSelectionImage((index === this._index), rect.x, rect.y)
        this.drawTextEx(this.commandName(index), rect.x, rect.y, rect.width);
    };
    
    Window_ChoiceList.prototype.drawSelectionImage = function(active, x, y) {
        const bitmap = ImageManager.loadSystem(active ? ACTIVE_SELECTION_IMAGE : DEACTIVE_SELECTION_IMAGE);
        const width = bitmap.width;
        const height = bitmap.height;
        const offsetX = x - (width + IMAGE_ALLOWANCE);
        const offsetY = y + (this.lineHeight() - height) / 2;
        this.contents.blt(bitmap, 0, 0, width, height, offsetX, offsetY);
    };

    const _Window_ChoiceList_prototype_select = Window_ChoiceList.prototype.select;
    Window_ChoiceList.prototype.select = function(index) {
        _Window_ChoiceList_prototype_select.call(this, index);
        if (this._list && this._list.length > 0) this.refresh();
    };
    
    const _Window_ChoiceList_prototype_refreshCursor = Window_ChoiceList.prototype.refreshCursor;
    Window_ChoiceList.prototype.refreshCursor = function() {
        if (!USE_SELECTION_IMAGE) _Window_ChoiceList_prototype_refreshCursor.call(this);
    };

})();
