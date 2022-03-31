//=============================================================================
// RPG Maker MZ - ShopTradein
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Enables to directly equip the purchased equipment items.
 * @author nz_prism
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ShopTradein/js/plugins/ShopTradein.js
 *
 * @help ShopTradein.js
 * ver. 1.0.1
 * 
 * [History]
 * 03/30/2022 1.0.0 Released
 * 03/31/2022 1.0.1 Fixed the tradein message X
 * 
 * This plugin enables players to directly equip an actor with the purchased
 * equipment on the shop scene. It also enables to tradein the old equipment.
 * 
 * The right window, "Status Window", on the shop scene shows actor names and
 * the equipments the actors currently equip. By selecting the equip slot, the
 * purchased equipment will be equipped for the slot. If the actor did not
 * equip any item for the slot, it's done. If did, a dialog to ask whether the
 * old equipment is sold or not will appear. The tradein price is the same as
 * usual; half of the purchasing price.
 * 
 * The status window shows "Possession" at the top just like MZ default. By
 * selecting it, the number windows to input the purchasing number will appear
 * and then the party will get the items, just like MZ default.
 * 
 * The workflow to purchase non-equipment items is all the same as MZ default.
 *
 * 
 * This plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 * 
 * @param statusWindow
 * @text Status Window
 * @desc The settings for the window which shows actor names and their equipments.
 * 
 * @param statusWindowWidth
 * @text Status Window Width
 * @desc The width of the window which shows actor names and their equipments.
 * @parent statusWindow
 * @type number
 * @default 420
 * 
 * @param statusItemOffsetX
 * @text Status Item Offset X
 * @desc The horizontal offset value for the equipment names on the status window.
 * @parent statusWindow
 * @type number
 * @default 68
 * 
 * @param tradeinWindow
 * @text Tradein Window
 * @desc The settings for the window which asks whether to tradein.
 * 
 * @param tradeinWindowWidth
 * @text Tradein Window Width
 * @desc The width of the window which asks whether to tradein.
 * @parent tradeinWindow
 * @type number
 * @default 480
 * 
 * @param tradeinText
 * @text Tradein Text
 * @desc The settings for texts drawn in the tradein window.
 * @parent tradeinWindow
 * 
 * @param tradeinQuestion
 * @text Tradein Question
 * @desc The confirmation text to tradein.
 * @parent tradeinText
 * @type string
 * @default Do you sell the old equipment?
 * 
 * @param tradeinOk
 * @text Tradein OK
 * @desc The text to determine to tradein.
 * @parent tradeinText
 * @type string
 * @default Yes
 * 
 * @param tradeinCancel
 * @text Tradein Cancel
 * @desc The text to determine not to tradein.
 * @parent tradeinText
 * @type string
 * @default No
 *
 */

/*:ja
 * @target MZ
 * @plugindesc ショップ画面にてその場で直接装備させることを可能にします。
 * @author nz_prism
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ShopTradein/js/plugins/ShopTradein.js
 *
 * @help ShopTradein.js
 * ver. 1.0.1
 * 
 * [バージョン履歴]
 * 2022/03/30 1.0.0 リリース
 * 2022/03/31 1.0.1 下取りメッセージX座標を修正
 * 
 * このプラグインはショップ画面にて、購入した装備品をその場で直接装備したり装備
 * していたアイテムを下取りに出したりすることを可能にします。
 * 
 * ショップ画面の右側に表示されるウィンドウ（以下「ステータスウィンドウ」）には
 * アクター名およびそのアクターが現在装備しているアイテムが表示されます。この装
 * 備アイテムの名前を選択することにより、購入したアイテムをそのスロットに装備さ
 * せます。そのスロットに何も装備していなければそれで完了ですが、装備しているア
 * イテムが存在する場合はそれを下取りに出すかどうかを確認するダイアログが表示さ
 * れます。下取り価格は通常の売却価格と同様、購入価格の半額です。
 * 
 * ステータスウィンドウ最上部にはMZデフォルトと同様「持っている数」が表示されま
 * すが、これを選択した場合MZデフォルトの購入手順と同様に購入する数量を入力し、
 * 完了するとパーティのアイテムに追加されます。
 * 
 * 装備品でないアイテムを購入する際の手順はMZデフォルトと全く同様です。
 *
 * 
 * このプラグインはMITライセンスにてリリースされています。
 * https://opensource.org/licenses/mit-license.php
 * 
 * 
 * @param statusWindow
 * @text ステータスウィンドウ
 * @desc アクターや装備アイテムを表示するウィンドウの設定です。
 * 
 * @param statusWindowWidth
 * @text ステータスウィンドウ幅
 * @desc アクターや装備アイテムを表示するウィンドウの幅です。
 * @parent statusWindow
 * @type number
 * @default 420
 * 
 * @param statusItemOffsetX
 * @text ステータスアイテムオフセットX
 * @desc ステータスウィンドウに描画するアイテム名を水平方向にずらす値です。
 * @parent statusWindow
 * @type number
 * @default 68
 * 
 * @param tradeinWindow
 * @text 下取りウィンドウ
 * @desc 下取りするかどうかを尋ねるウィンドウの設定です。
 * 
 * @param tradeinWindowWidth
 * @text 下取りウィンドウ幅
 * @desc 下取りするかどうかを尋ねるウィンドウの幅です。
 * @parent tradeinWindow
 * @type number
 * @default 480
 * 
 * @param tradeinText
 * @text 下取りテキスト
 * @desc 下取りウィンドウに描画するテキストの設定です。
 * @parent tradeinWindow
 * 
 * @param tradeinQuestion
 * @text 下取り確認テキスト
 * @desc 下取りするかどうかを確認するテキストです。
 * @parent tradeinText
 * @type string
 * @default 外した装備を売却しますか？
 * 
 * @param tradeinOk
 * @text 下取りOK
 * @desc 下取りすることを決定するテキストです。
 * @parent tradeinText
 * @type string
 * @default はい
 * 
 * @param tradeinCancel
 * @text 下取りキャンセル
 * @desc 下取りしないことを決定するテキストです。
 * @parent tradeinText
 * @type string
 * @default いいえ
 * 
 */

(() => {
    'use strict';
    const PLUGIN_NAME = "ShopTradein";
    const pluginParams = PluginManager.parameters(PLUGIN_NAME);

    const STATUS_WINDOW_WIDTH = Number(pluginParams.statusWindowWidth);
    const STATUS_ITEM_OFFSET_X = Number(pluginParams.statusItemOffsetX);

    const TRADEIN_WINDOW_WIDTH = Number(pluginParams.tradeinWindowWidth);
    const TRADEIN_QUESTION = pluginParams.tradeinQuestion;
    const TRADEIN_OK = pluginParams.tradeinOk;
    const TRADEIN_CANCEL = pluginParams.tradeinCancel;


    Game_Actor.prototype.equipItems = function() {
        return this._equips;
    };


    Scene_Shop.prototype.statusWidth = function() {
        return STATUS_WINDOW_WIDTH;
    };

    const _Scene_Shop_prototype_create = Scene_Shop.prototype.create;
    Scene_Shop.prototype.create = function() {
        _Scene_Shop_prototype_create.call(this);
        this.createTradeinWindow();
    };

    const _Scene_Shop_prototype_onBuyOk = Scene_Shop.prototype.onBuyOk;
    Scene_Shop.prototype.onBuyOk = function() {
        this._item = this._buyWindow.item();
        if (this.isEquipItem()) {
            const statusWindow = this._statusWindow;
            statusWindow.select(0);
            statusWindow.activate();
        } else {
            _Scene_Shop_prototype_onBuyOk.call(this);
        }
    };

    Scene_Shop.prototype.isEquipItem = function() {
        return DataManager.isWeapon(this._item) || DataManager.isArmor(this._item);
    };

    const _Scene_Shop_prototype_createStatusWindow = Scene_Shop.prototype.createStatusWindow;
    Scene_Shop.prototype.createStatusWindow = function() {
        _Scene_Shop_prototype_createStatusWindow.call(this);
        this._statusWindow.setHandler("ok", this.onStatusOk.bind(this));
        this._statusWindow.setHandler("cancel", this.onStatusCancel.bind(this));
    };

    Scene_Shop.prototype.createTradeinWindow = function() {
        const rect = this.tradeinWindowRect();
        const tradeinWindow = new Window_ShopTradein(rect);
        tradeinWindow.setHandler("ok", this.onTradeinOk.bind(this));
        tradeinWindow.setHandler("cancel", this.onTradeinCancel.bind(this));
        this._tradeinWindow = tradeinWindow;
        this.addWindow(tradeinWindow);
    };

    Scene_Shop.prototype.tradeinWindowRect = function() {
        const ww = TRADEIN_WINDOW_WIDTH;
        const wh = this.calcWindowHeight(3.5, true);
        const wx = (Graphics.boxWidth - ww) / 2;
        const wy = (Graphics.boxHeight - wh) / 2;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Shop.prototype.onStatusOk = function() {
        const statusWindow = this._statusWindow;
        if (statusWindow.isPartyIndex()) {
            const numberWindow = this._numberWindow;
            this._buyWindow.hide();
            numberWindow.setup(this._item, this.maxBuy(), this.buyingPrice());
            numberWindow.setCurrencyUnit(this.currencyUnit());
            numberWindow.show();
            numberWindow.activate();
        } else if (statusWindow.isItemIndex()) {
            const tradeinWindow = this._tradeinWindow;
            const tradeinItem = statusWindow.item().object();
            this._tradeinItem = tradeinItem;
            if (tradeinItem) {
                tradeinWindow.setItem(tradeinItem, this.tradeinPrice());
            } else {
                this.endTradein(false);
            }
        }
    };

    Scene_Shop.prototype.endTradein = function(tradein) {
        const statusWindow = this._statusWindow;
        const tradeinWindow = this._tradeinWindow;
        SoundManager.playShop();
        this.doBuy(1);
        this.doChangeEquip();
        if (tradein) this.doTradein();
        this._goldWindow.refresh();
        statusWindow.refresh();
        statusWindow.deselect();
        tradeinWindow.close();
        tradeinWindow.deactivate();
        this.activateBuyWindow();
    };

    Scene_Shop.prototype.onStatusCancel = function() {
        const statusWindow = this._statusWindow;
        statusWindow.deselect();
        statusWindow.deactivate();
        this.activateBuyWindow();
    };

    Scene_Shop.prototype.doChangeEquip = function() {
        const statusWindow = this._statusWindow;
        statusWindow.actor().changeEquip(statusWindow.slotId(), this._item);
    };

    Scene_Shop.prototype.tradeinPrice = function() {
        return Math.floor(this._tradeinItem.price / 2);
    };

    Scene_Shop.prototype.doTradein = function() {
        $gameParty.gainGold(this.tradeinPrice());
        $gameParty.loseItem(this._tradeinItem, 1);
    };

    const _Scene_Shop_prototype_onNumberOk = Scene_Shop.prototype.onNumberOk;
    Scene_Shop.prototype.onNumberOk = function() {
        _Scene_Shop_prototype_onNumberOk.call(this);
        if (this._commandWindow.currentSymbol() === "buy") {
            const statusWindow = this._statusWindow;
            statusWindow.deselect();
            statusWindow.deactivate();
        }
    };
    
    const _Scene_Shop_prototype_onNumberCancel = Scene_Shop.prototype.onNumberCancel;
    Scene_Shop.prototype.onNumberCancel = function() {
        _Scene_Shop_prototype_onNumberCancel.call(this);
        if (this.isEquipItem() && this._commandWindow.currentSymbol() === "buy") {
            this._buyWindow.deactivate();
            this._statusWindow.activate();
        }
    };

    Scene_Shop.prototype.onTradeinOk = function() {
        this.endTradein(true);
    };

    Scene_Shop.prototype.onTradeinCancel = function() {
        this.endTradein(false);
    };


    const _Window_ShopStatus_prototype_initialize = Window_ShopStatus.prototype.initialize;
    Window_ShopStatus.prototype.initialize = function(rect) {
        this.clearData();
        _Window_ShopStatus_prototype_initialize.call(this, rect);
    };

    Window_ShopStatus.prototype.clearData = function() {
        this._data = [{item:null, actor:null, slotId:-1}];
    };

    Window_ShopStatus.prototype.maxItems = function() {
        return this._data.length;
    };

    Window_ShopStatus.prototype.etypeId = function() {
        return this._item.etypeId;
    };

    Window_ShopStatus.prototype.item = function() {
        return this.itemAt(this.index());
    };
    
    Window_ShopStatus.prototype.itemAt = function(index) {
        return index >= 0 ? this._data[index]?.item : null;
    };

    Window_ShopStatus.prototype.actor = function() {
        return this.actorAt(this.index());
    };

    Window_ShopStatus.prototype.actorAt = function(index) {
        return index >= 0 ? this._data[index]?.actor : null;
    };

    Window_ShopStatus.prototype.slotId = function() {
        return this.slotIdAt(this.index());
    };

    Window_ShopStatus.prototype.slotIdAt = function(index) {
        return index >= 0 ? this._data[index]?.slotId : -1;
    };

    Window_ShopStatus.prototype.makeItemList = function() {
        this.clearData();
        if (this.isEquipItem()) {
            const data = this._data;
            const actors = $gameParty.members();
            const etypeId = this.etypeId();
            for (let i=0; i<actors.length; i++) {
                const actor = actors[i];
                const slots = actor.equipSlots();
                const equips = actor.equipItems();
                data.push({item:null, actor:actor, slotId:-1});
                for (let j=0; j<slots.length; j++) {
                    if (slots[j] === etypeId) data.push({item:equips[j], actor:actor, slotId:j});
                }
            }
        }
    };

    Window_ShopStatus.prototype.isPartyIndex = function() {
        return this.isPartyIndexAt(this.index());
    };

    Window_ShopStatus.prototype.isPartyIndexAt = function(index) {
        return index === 0;
    };

    Window_ShopStatus.prototype.isItemIndex = function() {
        return this.isItemIndexAt(this.index());
    };

    Window_ShopStatus.prototype.isItemIndexAt = function(index) {
        return index > 0 && !!this.itemAt(index);
    };

    Window_ShopStatus.prototype.isActorIndexAt = function(index) {
        return index > 0 && !this.itemAt(index);
    };

    const _Window_ShopStatus_prototype_select = Window_ShopStatus.prototype.select;
    Window_ShopStatus.prototype.select = function(index) {
        const decrement = this._index > index;
        while (this.isActorIndexAt(index)) index += decrement ? -1 : 1;
        _Window_ShopStatus_prototype_select.call(this, index);
    };

    const _Window_ShopStatus_prototype_refreshCursor = Window_ShopStatus.prototype.refreshCursor;
    Window_ShopStatus.prototype.refreshCursor = function() {
        if (this.isActorIndexAt(this.index())) {
            this.setCursorRect(0, 0, 0, 0);
        } else {
            _Window_ShopStatus_prototype_refreshCursor.call(this);
        }
    };

    Window_ShopStatus.prototype.isEnabled = function(index) {
        if (this.isPartyIndexAt(index)) {
            return true;
        } else if (this.isItemIndexAt(index)) {
            const actor = this.actorAt(index);
            if (actor) return actor.isEquipChangeOk(this.slotIdAt(index)) && actor.canEquip(this._item);
        }
        return false;
    };

    Window_ShopStatus.prototype.isCurrentItemEnabled = function() {
        return this.isEnabled(this.index());
    };

    Window_ShopStatus.prototype.drawItem = function(index) {
        const rect = this.itemRectWithPadding(index);
        const x = rect.x;
        const y = rect.y;
        const width = rect.width;
        const actor = this.actorAt(index);
        const item = this.itemAt(index);
        if (this.isPartyIndexAt(index)) {
            this.drawPossession(rect.x, rect.y);
        } else if (item && this.isItemIndexAt(index)) {
            this.changePaintOpacity(this.isEnabled(index));
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(this.actorSlotName(actor, this.slotIdAt(index)), x, y, width);
            const obj = item.object();
            if (obj) {
                this.drawItemName(obj, x + STATUS_ITEM_OFFSET_X, y, width - STATUS_ITEM_OFFSET_X);
                this.drawActorParamChange(x, y, actor, obj);
            }
        } else if (actor && this.isActorIndexAt(index)) {
            this.changePaintOpacity(true);
            this.changeTextColor(ColorManager.normalColor());
            this.drawText(actor.name(), x, y, width)
        }
    };
    
    Window_ShopStatus.prototype.refresh = function() {
        if (this._item) {
            this.makeItemList();
            this.createContents();
            this.paint();
        } else if (this.contents) {
            this.contents.clear();
            this.contentsBack.clear();
        }
    };

    const _Window_ShopStatus_prototype_drawItemBackground = Window_ShopStatus.prototype.drawItemBackground;
    Window_ShopStatus.prototype.drawItemBackground = function(index) {
        if (!this.isActorIndexAt(index)) _Window_ShopStatus_prototype_drawItemBackground.call(this, index);
    };

    Window_ShopStatus.prototype.update = function() {
        Window_StatusBase.prototype.update.call(this);
    };


    function Window_ShopTradein() {
        this.initialize(...arguments);
    }
    
    Window_ShopTradein.prototype = Object.create(Window_HorzCommand.prototype);
    Window_ShopTradein.prototype.constructor = Window_ShopTradein;
    
    Window_ShopTradein.prototype.initialize = function(rect) {
        Window_Command.prototype.initialize.call(this, rect);
        this._isWindow = false;
        this.hide();
        this.close();
    };

    Window_ShopTradein.prototype.setItem = function(item, price) {
        this._item = item;
        this._price = price;
        this.refresh();
        this.show();
        this.open();
        this.select(0);
        this.activate();
    };

    Window_ShopTradein.prototype.maxCols = function() {
        return 2;
    };

    Window_ShopTradein.prototype.isTradable = function() {
        const item = this._item;
        return item && item.price > 0;
    };

    Window_ShopTradein.prototype.makeCommandList = function() {
        this.addCommand(TRADEIN_OK, "ok", this.isTradable());
        this.addCommand(TRADEIN_CANCEL, "cancel", true);
    };

    const _Window_ShopTradein_prototype_itemRect = Window_ShopTradein.prototype.itemRect;
    Window_ShopTradein.prototype.itemRect = function(index) {
        const rect = _Window_ShopTradein_prototype_itemRect.call(this, index);
        rect.y += this.lineHeight() * 2.5;
        return rect;
    };

    Window_ShopTradein.prototype.refresh = function() {
        Window_HorzCommand.prototype.refresh.call(this);
        if (this._item) {
            const x = this.itemPadding();
            const width = this.innerWidth;
            const lh = this.lineHeight();
            this.resetFontSettings();
            this.changePaintOpacity(true);
            this.drawText(TRADEIN_QUESTION, x, 0, width)
            this.drawItemName(this._item, x, lh, width);
            this.drawCurrencyValue(this._price, this.currencyUnit(), x, lh, width);
        }
    };

    Window_ShopTradein.prototype.currencyUnit = function() {
        return TextManager.currencyUnit;
    };
    
})();
