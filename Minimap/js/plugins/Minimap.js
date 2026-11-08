//=============================================================================
// RPG Maker MZ - Minimap
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Draws a mini-map on the map scene.
 * @author nz_prism
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/Minimap/js/plugins/Minimap.js
 *
 * @help Minimap.js
 * ver. 1.1.0
 * 
 * [History]
 * 03/26/2022 1.0.0 Released
 * 04/01/2022 1.0.1 Fixed conflicts against other plugins
 * 04/03/2022 1.0.2 Fixed an error at the end of a battle test
 * 11/08/2026 1.1.0 Added a functionality to hide mini-map
 * 
 * This plugin shows a mini-map on the map scene. When a player moves, the
 * adjacent area will be drawn on the mini-map.
 * 
 * A mini-map is basically placed on the upper left of the screen but if a
 * player is close to it, it moves to the lower right.
 * 
 * When an event is running, the mini-map will be hidden.
 * 
 * There are several ways to draw an entire mini-map instantly. If a plugin
 * parameter "Instant Minimap for No Encounter Map" is true and a player
 * transfers to a map where no encounter is set, an entire mini-map will be
 * drawn at once. If you set it false, you can set maps with the same behavior
 * by inputting <instantMinimap> in the Note of the map. Also, if a plugin
 * command "Draw Entire Minimap" is invoked, an entire mini-map will be drawn.
 * 
 * A mini-map will be reset by transferring to another map. If you save the
 * mini-map on a given map, input <saveMinimap> in the Note of the map. By this
 * setting, a mini-map will be restored when the player visits the map again.
 * A save data stores the mini-map data. Although mini-map data can be saved
 * unlimitedly, to minimize the number of maps with <saveMinimap> is
 * recommended to save save files' volume.
 * 
 * Basically tiles which no characers can pass are drawn, events can also be
 * drawn by inputting <minimap:n> in the Note of the event with the "n"th
 * color. However, since the event pixels don't reflect the current position of
 * the events, inputting <minimap:n> for events which can move is not
 * recommended.
 * 
 * If you wish to make a map without a mini-map, input <saveMinimap> in the
 * Note of the map.
 * 
 * Players can control the minimap visibility by inputting a key. Use a plugin
 * parameter "Show/Hide Minimap Key" to assign the key. If "none" is set,
 * mini-maps can't be hidden by players.
 * 
 *
 *  ■ Formats (meta-tag)
 *   ● Map
 *     ・<instantMinimap>
 *     ・<saveMinimap>
 *     ・<noMinimap>
 * 
 *   ● Event
 *     ・<minimap:n>
 *     　replace n with a color index.
 * 
 * 
 * This plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 *
 * @param pixelsPerTile
 * @text Pixels per Tile
 * @desc The pixels which are drawn for a tile.
 * @type number
 * @default 5
 * 
 * @param hideMinimapKey
 * @text Show/Hide Minimap Key
 * @desc A key of a keyboard and a button of a gamepad assigned to hide the mini-map.
 * @type select
 * @option none
 * @value 
 * @option shift key/X button
 * @value shift
 * @option X key/Y button
 * @value menu
 * @option pageup key/LB button
 * @value pageup
 * @option pagedown key/RB button
 * @value pagedown
 * @option tab key/LT button
 * @value tab
 * @option control key/RT button
 * @value control
 * 
 * @param minimap
 * @text Minimap
 * @desc The settings for minimap.
 * 
 * @param minimapOffsetX
 * @text Minimap Offset X
 * @desc The horizontal offset value for a minimap.
 * @parent minimap
 * @type number
 * @default 8
 * 
 * @param minimapOffsetY
 * @text Minimap Offset Y
 * @desc The vertical offset value for a minimap.
 * @parent minimap
 * @type number
 * @default 8
 * 
 * @param minimapColorIndex
 * @text Minimap Color Index
 * @desc The color index with which a minimap is drawn.
 * @parent minimap
 * @type color
 * @default 9
 * 
 * @param minimapOpacity
 * @text Minimap Opacity
 * @desc The opacity for a minimap.
 * @parent minimap
 * @type number
 * @default 192
 * 
 * @param playerSymbol
 * @text Player Symbol
 * @desc The settings for a player symbol.
 * 
 * @param playerSymbolColorIndex
 * @text Player Symbol Color Index
 * @desc The color index with which a player symol is drawn.
 * @parent playerSymbol
 * @type color
 * @default 18
 * 
 * @param playerSymbolOpacity
 * @text Player Symbol Opacity
 * @desc The opacity for a player symbol.
 * @parent playerSymbol
 * @type number
 * @default 255
 * 
 * @param instantMinimapForCity
 * @text Instant Minimap for No Encounter Map
 * @desc If true, an entire minimap is drawn instantly on a map which has no encounter.
 * @type boolean
 * @default true
 * 
 * 
 * @command seeEntireMap
 * @text Draw Entire Minimap
 * @desc Draws an entire minimap.
 *
 */

/*:ja
 * @target MZ
 * @plugindesc マップ画面に小マップを描画します。
 * @author nz_prism
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/Minimap/js/plugins/Minimap.js
 *
 * @help Minimap.js
 * ver. 1.1.0
 * 
 * [バージョン履歴]
 * 2022/03/26 1.0.0 リリース
 * 2022/04/01 1.0.1 他プラグインとの競合回避対策を強化
 * 2022/04/03 1.0.2 戦闘テスト終了時のエラーを修正
 * 2026/11/08 1.1.0 ミニマップを非表示に切り替えられる機能を追加
 * 
 * このプラグインを導入すると、マップ画面に小マップが描画されるようになります。
 * 小マップはプレイヤーが付近を通過するごとに追加描画されます。
 * 
 * ミニマップは基本的に左上に表示されますが、プレイヤーキャラクターが画面左上付
 * 近に位置していてミニマップと重なりそうになるとミニマップは自動的に右下に移動
 * します。
 * 
 * イベントの実行中は、ミニマップは自動的に非表示になります。
 * 
 * ミニマップを一度に全描画する方法も用意されています。プラグインパラメータ「エ
 * ンカウントなしマップ全域描画」をオンにすると、エンカウントのないマップに移動
 * した瞬間にミニマップの全域が描画されます。シンボルエンカウントを採用している
 * などの理由によりこのパラメータをオフに設定する場合、マップのメモ欄に
 * <instantMinimap>と記述することでそのマップを全域描画に設定できます。また、プ
 * ラグインコマンド「ミニマップの全描画」を実行することでもミニマップが全描画さ
 * れます。
 * 
 * ミニマップはマップを切り替えると初期化されます。あるマップにて作成されたミニ
 * マップを保存したい場合、そのマップのメモ欄に<saveMinimap>と記述してくださ
 * い。ミニマップが保存されたマップに再度移動すると、前回のミニマップが反映され
 * ます。これはセーブデータにも保存されます。保存できる量に制限はありませんが、
 * あまりにも溜まりすぎるとセーブデータ容量が肥大化します。
 * 
 * ミニマップに描画されるのは基本的には通行不可タイルですが、イベントもメモ欄に
 * <minimap:n>と記述することで描画対象にすることができます。「n」はそのイベン
 * トを描画する色番号です（制御文字と同じ）。ただしイベントの座標が変わってもミ
 * ニマップには反映されないので、移動する可能性のあるイベントを描画対象にするこ
 * とは非推奨です。
 * 
 * ミニマップを表示しないマップに設定することもできます。そのマップのメモ欄に
 * <noMinimap>と記述してください。
 * 
 * ミニマップの表示をプレイヤーが操作することもできます。プラグインパラメータ
 * 「ミニマップ表示切り替えボタン」にて対応する入力を設定可能です。「なし」に
 * 設定すると、プレイヤー操作で表示状態が切り替わることがなくなります。
 * 
 *
 *  ■ 書式（メタタグ）
 *   ● マップ
 *     ・<instantMinimap>
 *     ・<saveMinimap>
 *     ・<noMinimap>
 * 
 *   ● イベント
 *     ・<minimap:n>
 *     　n は色番号に置き換えてください。
 * 
 * 
 * このプラグインはMITライセンスにてリリースされています。
 * https://opensource.org/licenses/mit-license.php
 * 
 *
 * @param pixelsPerTile
 * @text １タイルあたりのピクセル数
 * @desc ミニマップを描画する、１タイルあたりのピクセル数です。
 * @type number
 * @default 5
 * 
 * @param hideMinimapKey
 * @text ミニマップ表示切り替えボタン
 * @desc ミニマップの表示切り替えに割り当てるキーボード/ゲームパッドのキー/ボタンです。
 * @type select
 * @option なし
 * @value 
 * @option shiftキー/Xボタン
 * @value shift
 * @option Xキー/Yボタン
 * @value menu
 * @option pageupキー/LBボタン
 * @value pageup
 * @option pagedownキー/RBボタン
 * @value pagedown
 * @option tabキー/LTボタン
 * @value tab
 * @option controlキー/RTボタン
 * @value control
 * 
 * @param minimap
 * @text ミニマップ
 * @desc ミニマップの設定です。
 * 
 * @param minimapOffsetX
 * @text ミニマップX座標オフセット
 * @desc ミニマップを水平方向にずらす値です。
 * @parent minimap
 * @type number
 * @default 8
 * 
 * @param minimapOffsetY
 * @text ミニマップY座標オフセット
 * @desc ミニマップを垂直方向にずらす値です。
 * @parent minimap
 * @type number
 * @default 8
 * 
 * @param minimapColorIndex
 * @text ミニマップ色番号
 * @desc ミニマップを描画する色番号です（制御文字と同じ）。
 * @parent minimap
 * @type color
 * @default 9
 * 
 * @param minimapOpacity
 * @text ミニマップ不透明度
 * @desc ミニマップの不透明度です。
 * @parent minimap
 * @type number
 * @default 192
 * 
 * @param playerSymbol
 * @text プレイヤーシンボル
 * @desc プレイヤーシンボルの設定です。
 * 
 * @param playerSymbolColorIndex
 * @text プレイヤーシンボル色番号
 * @desc プレイヤーシンボルを描画する色番号です（制御文字と同じ）。
 * @parent playerSymbol
 * @type color
 * @default 18
 * 
 * @param playerSymbolOpacity
 * @text プレイヤーシンボル不透明度
 * @desc プレイヤーシンボルの不透明度です。
 * @parent playerSymbol
 * @type number
 * @default 255
 * 
 * @param instantMinimapForCity
 * @text エンカウントなしマップ全域描画
 * @desc オンにするとエンカウントのないマップの場合、ミニマップが即座に全描画されます。
 * @type boolean
 * @default true
 * 
 * 
 * @command seeEntireMap
 * @text ミニマップの全描画
 * @desc ミニマップをマップ全域描画します。
 * 
 */

(() => {
    'use strict';
    const PLUGIN_NAME = "Minimap";
    const pluginParams = PluginManager.parameters(PLUGIN_NAME);


    const PIXELS_PER_TILE = Number(pluginParams.pixelsPerTile);
    const HIDE_MINIMAP_KEY = pluginParams.hideMinimapKey;

    const MINIMAP_OFFSET_X = Number(pluginParams.minimapOffsetX);
    const MINIMAP_OFFSET_Y = Number(pluginParams.minimapOffsetY);
    const MINIMAP_COLOR_INDEX = Number(pluginParams.minimapColorIndex);
    const MINIMAP_OPACITY = Number(pluginParams.minimapOpacity);

    const PLAYER_SYMBOL_COLOR_INDEX = Number(pluginParams.playerSymbolColorIndex);
    const PLAYER_SYMBOL_OPACITY = Number(pluginParams.playerSymbolOpacity);
    
    const INSTNT_MINIMAP_FOR_CITY = pluginParams.instantMinimapForCity === "true";


    PluginManager.registerCommand(PLUGIN_NAME, "seeEntireMap", args => {
        $gameMap.seeEntire();
    });


    const _BattleManager_processVictory = BattleManager.processVictory;
    BattleManager.processVictory = function() {
        _BattleManager_processVictory.call(this);
        if (!DataManager.isBattleTest()) $gameMap.updateInstantMinimap();
    };


    const _Game_System_prototype_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_prototype_initialize.call(this);
        this._savedMinimapData = [];
    };

    Game_System.prototype.saveMinimapData = function(mapId, data) {
        this._savedMinimapData[mapId] = data;
    };

    Game_System.prototype.minimapData = function(mapId) {
        return this._savedMinimapData[mapId] || [];
    };


    Game_Event.prototype.minimapColor = function() {
        return Number(this.event().meta.minimap) ?? -1;
    };


    const _Game_Map_prototype_initialize = Game_Map.prototype.initialize;
    Game_Map.prototype.initialize = function() {
        _Game_Map_prototype_initialize.call(this);
        this._minimapData = [];
    };

    const _Game_Map_prototype_setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function(mapId) {
        _Game_Map_prototype_setup.call(this, mapId);
        this._minimapData = $gameSystem.minimapData(mapId);
        this.updateInstantMinimap();
    };

    Game_Map.prototype.saveMinimapData = function() {
        if ($dataMap?.meta?.saveMinimap) $gameSystem.saveMinimapData(this._mapId, this._minimapData);
    };

    Game_Map.prototype.updateInstantMinimap = function() {
        if ($dataMap?.meta?.instantMinimap || (INSTNT_MINIMAP_FOR_CITY && !this.hasAnyEncounter())) this.seeEntire();
    };

    Game_Map.prototype.hasAnyEncounter = function() {
        return this.encounterList().some(encounter => encounter.weight > 0);
    };
    
    Game_Map.prototype.addMinimapData = function(x, y, width, height) {
        const x1 = Math.max(0, x);
        const x2 = Math.min(width, this.width());
        const y1 = Math.max(0, y);
        const y2 = Math.min(height, this.height());
        const data = this._minimapData;
        for (let i=x1; i<x2; i++) {
            for (let j=y1; j<y2; j++) {
                if (!data.some(obj => obj.x === i && obj.y === j)) {
                    const event = this.eventsXy(i, j).filter(e => e.minimapColor() >= 0)[0];
                    if (event) {
                        data.push({x: i, y: j, minimapColor: event.minimapColor(), drawn: false});
                    } else if ([2,4,6,8].every(d => !this.isPassable(i, j, d))) {
                        data.push({x: i, y: j, minimapColor: MINIMAP_COLOR_INDEX, drawn: false});
                    }
                }
            }
        }
    };

    Game_Map.prototype.seeAround = function(centerX, centerY) {
        const width = Math.floor(this.screenTileX() / 2);
        const height = Math.floor(this.screenTileY() / 2);
        this.addMinimapData(centerX-width, centerY-height, centerX+width, centerY+height);
    };

    Game_Map.prototype.seeEntire = function() {
        this.addMinimapData(0, 0, this.width(), this.height());
    };

    Game_Map.prototype.minimapData = function() {
        return this._minimapData.filter(obj => !obj.drawn);
    };

    Game_Map.prototype.unseeObjects = function() {
        this._minimapData.forEach(obj => obj.drawn = false);
    };


    const _Game_Player_prototype_center = Game_Player.prototype.center;
    Game_Player.prototype.center = function(x, y) {
        _Game_Player_prototype_center.call(this, x, y);
        $gameMap.seeAround(x, y);
    };

    const _Game_Player_prototype_increaseSteps = Game_Player.prototype.increaseSteps;
    Game_Player.prototype.increaseSteps = function() {
        _Game_Player_prototype_increaseSteps.call(this);
        $gameMap.seeAround(this.x, this.y);
    };

    const _Game_Player_prototype_reserveTransfer = Game_Player.prototype.reserveTransfer;
    Game_Player.prototype.reserveTransfer = function(mapId, x, y, d, fadeType) {
        _Game_Player_prototype_reserveTransfer.apply(this, arguments);
        $gameMap.saveMinimapData();
    };


    const _Scene_Map_prototype_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
    Scene_Map.prototype.createDisplayObjects = function() {
        _Scene_Map_prototype_createDisplayObjects.call(this);
        this.createMinimap();
        this.createPlayerSymbol();
    };

    const _Scene_Map_prototype_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_prototype_update.call(this);
        this.updateMinimap();
    };

    Scene_Map.prototype.createMinimap = function() {
        const sprite = new Sprite();
        const width = $gameMap.width();
        const height = $gameMap.height();
        const pixels = Math.min(
            PIXELS_PER_TILE,
            Math.floor((Graphics.width / width) / 2),
            Math.floor((Graphics.height / height) / 2)
        );
        const bitmapWidth = width * pixels;
        const bitmapHeight = height * pixels;
        const bitmap = new Bitmap(bitmapWidth, bitmapHeight);
        bitmap.fillRect(0, 0, bitmapWidth, bitmapHeight, ColorManager.dimColor1());
        sprite.bitmap = bitmap;
        sprite.opacity = MINIMAP_OPACITY;
        this._minimapSprite = sprite;
        this._minimapPixels = pixels;
        this.addWindow(sprite);
        $gameMap.unseeObjects();
    };

    Scene_Map.prototype.updateMinimap = function() {
        this.drawMinimap();
        this.updatePlayerSymbol();
        this.updateMinimapPosition();
        this.updateMinimapVisiblity();
    };

    Scene_Map.prototype.updateMinimapPosition = function() {
        const sprite = this._minimapSprite;
        const spriteWidth = sprite.width;
        const spriteHeight = sprite.height;
        if (
            $gamePlayer.screenX() <= MINIMAP_OFFSET_X + spriteWidth + 48 &&
            $gamePlayer.screenY() <= MINIMAP_OFFSET_Y + spriteHeight + 48 // allowance for player and minimap collision.
        ) {
            sprite.x = Graphics.boxWidth - (spriteWidth + MINIMAP_OFFSET_X);
            sprite.y = Graphics.boxHeight - (spriteHeight + MINIMAP_OFFSET_Y);
        } else {
            sprite.x = MINIMAP_OFFSET_X;
            sprite.y = MINIMAP_OFFSET_Y;
        }
    };

    Scene_Map.prototype.updateMinimapVisiblity = function() {
        if (Input.isTriggered(HIDE_MINIMAP_KEY)) {
            this._minimapHidden = !this._minimapHidden;
        }
        this._minimapSprite.visible = (
            !$dataMap?.meta?.noMinimap &&
            !this._minimapHidden &&
            !this._mapNameWindow.isVisible() &&
            !$gameMap.isEventRunning()
        );
    };

    Scene_Map.prototype.drawMinimap = function() {
        const data = $gameMap.minimapData();
        if (data.length > 0) {
            const pixels = this._minimapPixels;
            const bitmap = this._minimapSprite.bitmap;
            data.forEach(function(obj) {
                bitmap.fillRect(obj.x * pixels, obj.y * pixels, pixels, pixels, ColorManager.textColor(obj.minimapColor));
                obj.drawn = true;
            });
        }
    };

    Scene_Map.prototype.createPlayerSymbol = function() {
        const sprite = new Sprite();
        const pixels = this._minimapPixels;
        const color = ColorManager.textColor(PLAYER_SYMBOL_COLOR_INDEX);
        const bitmap = new Bitmap(pixels, pixels);
        bitmap.fillRect(0, 0, pixels, pixels, color);
        sprite.bitmap = bitmap;
        sprite.opacity = PLAYER_SYMBOL_OPACITY;
        this._playerSymbolSprite = sprite;
        this._minimapSprite.addChild(sprite);
    };

    Scene_Map.prototype.updatePlayerSymbol = function() {
        const pixels = this._minimapPixels;
        this._playerSymbolSprite.x = $gamePlayer.x * pixels;
        this._playerSymbolSprite.y = $gamePlayer.y * pixels;
    };

    
    Window_MapName.prototype.isVisible = function() {
        return this.contentsOpacity > 0;
    };


})();
