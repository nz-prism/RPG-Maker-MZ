//=============================================================================
// RPG Maker MZ - RandomDungeon
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Generates random maps.
 * @author nz_prism
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/RandomDungeon/js/plugins/RandomDungeon.js
 *
 * @help RandomDungeon.js
 * ver. 1.1.2
 * 
 * [History]
 * 05/01/2021 1.0.0 Released
 * 12/14/2021 1.0.1 Fixed the conflict with PluginCommonBase.js
 * 12/15/2021 1.0.2 Fixed a tile event error
 * 01/25/2022 1.0.3 Fixed an issue that unique events weren't chosen correctly
 * 03/21/2022 1.1.0 Added a functionality to embed a variable value in the map
 *                  display names.
 * 04/15/2022 1.1.1 Fixed a rare error
 * 09/17/2023 1.1.2 Fixed an error which happens when loading a save data in a
 *                  random map after project is updated.
 * 
 * This plugin enables to generate a random map when a player
 * moves to a map with "random" attribute.
 * It provides a functionality to make an event appear randomly.
 * It also provides a functionality to make an event appear exclusively.
 * A value of the variable can be embedded in the map display names.
 * 
 * This plugin has no plugin-command.
 * 
 * ■ How to Use
 *   ● Map Settings
 *     1. Enter <random> to a note of a map which you want to make a random
 *        map.
 *     2. Enter <size:n> to the note. "n" specifies the horizontal and vertical
 *        size of the random map.
 *        For example, if <size:5>, the 5 pieces horizontally, 5 pcs
 *        vertically, 25 pcs in total.
 *     3. Uner the random map, create a "Void" map and "Piece" maps as many as
 *        you need.
 *        You can drag and drop a map under a different map on the editor.
 *        "Void" represents a void section of a random map and a player can't
 *        walk into/from it.
 *        It will be used to make up spaces which no pieces were placed.
 *        "Piece" represents a part of a random map and has at least one route.
 *        The total combination number of 4 directions is 15, so you have to
 *        create at least 15 pieces each of which has a unique route pattern.
 *        The parent map is called "Base". A Base must be placed on a random
 *        map.
 *        If you make a player transfer into a random map from another map, you
 *        have to specify the Base.
 *        All the map settings, such as background, BGM or encounter, refers to
 *        those of Base.
 *        Therefore, you don't have to specify the settings for Voids and
 *        Pieces.
 *     4. Enter <routes> to notes of Base and all the Pieces.
 *        It represents routes the map has.
 *        Enter directions in accordance with the map geometry.
 *        For example, if a map has rightward and downward routes, specify
 *        <routes: right, down>.
 *        Split the directions by comma (,).
 *        You can input directions with various formats. See "Note Formats"
 *        below.
 *     5. Place events. See "Event Settings" below.
 *        You can set events on Base, Pieces and Void of a random map as usual.
 *        All the events on the maps which compose the random map will be
 *        placed.
 *        That means all the events on Base will be placed while the events on
 *        a Piece which was not chosen won't.
 *        You can use "random" and "unique" attributes for an event on a random
 *        map, both of which affect event appearance.
 *        These attributes are not used for non-random maps.
 *        An event with "random" attribute appears on a basis of percentage.
 *        If the are multiple events with "unique" attribute on Base, Pieces
 *        and Void, only one of them appears, chosen randomly.
 *        An event can have both "random" and "unique" attributes.
 *        Whether or not an event has "random" or "unique" attribute, when a
 *        player transfers into another map, all the self-switches of all the
 *        events on the random map will be turned off.
 *     6. (optional) Change the map display name. If it has "%1", these
 *        characters will be replaced with the value of the variable whose ID
 *        is specified by the plugin parameter "Map Name Variable ID".
 * 
 *   ● Event Settings
 *     ・random attribute
 *       Enter <random:n> to a note of an event you want to appear randomly.
 *       "n" represents the probability of appearance.
 *       For example, if you want to make an event appear for 70% probability,
 *       enter <random:70>.
 *     ・unique attribute
 *       Enter <unique:n> to a note of an event you want to appear exclusively.
 *       "n" represents a unique ID.
 *       For example, if you want to make one of stairs appear on a map,
 *       which will be chosen randomly, enter <unique:1> to all the stairs.
 *       If you want to make another exclusive group, enter <unique:2>,
 *       <unique:3>, and so on.
 * 
 * ■ Map Limitation
 *   There are limitations for maps used for a random map.
 *   Names of them have no limitations.
 *     ● Base
 *       ・Make at least one route. Number and combination has no limits.
 *     ● Piece
 *       ・The tileset must be the same as Base.
 *       ・All the combinations of the route directins (15 patterns. See
 *         Sample) must exist.
 *         Multiple Pieces with a route pattern can exist.
 *         For example, if there are 2 maps with downward and rightward routes,
 *         the probability of being chosen will be doubled compared to patterns
 *         with which only one map exists.
 *       ・The map width of all the Pieces must be the same as that of Base.
 *       ・The map height of all the Pieces must be the same as that of Base.
 *       ・The X coodinate of upward and downward routes must be coincident,
 *         including Base.
 *       ・The Y coodinate of rightward and leftward routes must be coincident,
 *         including Base.
 *     ● Void
 *       ・The tileset must be the same as Base.
 *       ・A void must exist for a random map.
 *       ・The map width must be the same as that of Base.
 *       ・The map height must be the same as that of Base.
 * 
 * ■ Note Format
 *   ● Map
 *     ・<random>
 *     ・<size:n>
 *     ・<routes:directions separated by comma>
 *     　You can specify directions with all the strings below.
 *     　Case insensitive and spaces will be ignored.
 *         Upward：   8,８,上,北,u,up,n,north
 *         Downward： 2,２,下,南,d,down,s,south
 *         Leftward： 4,４,左,西,l,left,w,west
 *         Rightward：6,６,右,東,r,right,e,east
 * 
 *   ● Event
 *     ・<random:n>
 *     ・<unique:n>
 * 
 * 
 * This plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 *
 * 
 * @param mapNameVariableId
 * @text Map Name Variable ID
 * @desc The variable ID whose value is embedded in the map display names.
 * @type variable
 * @default 1
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc ランダムダンジョンを自動生成します。
 * @author nz_prism
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/RandomDungeon/js/plugins/RandomDungeon.js
 *
 * @help RandomDungeon.js
 * ver. 1.1.2
 * 
 * [バージョン履歴]
 * 2021/05/01 1.0.0 リリース
 * 2021/12/14 1.0.1 PluginCommonBase.jsとの競合を修正
 * 2021/12/15 1.0.2 タイルイベントの不具合を修正
 * 2022/01/25 1.0.3 uniqueイベントが適切に抽選されない問題を修正
 * 2022/03/21 1.1.0 マップ表示名にプラグインパラメータで指定した変数の値を埋め
 *                  込む機能を追加
 * 2022/04/15 1.1.1 稀に発生するエラーを修正
 * 2023/09/17 1.1.2 プロジェクト更新後にランダムダンジョンでのセーブデータを
 *                  ロードすると発生するエラーを修正
 * 
 * このプラグインを導入すると、ランダム属性を持つマップに移動した際に
 * ダンジョンが自動生成されるようになります。
 * イベントのランダム出現機能があり、宝箱などに利用できます。
 * イベントの排他出現機能もあり、階段などに利用できます。
 * マップの表示名に変数を埋め込むことのできる機能が用意されており、階層などの表
 * 示に利用することができます。
 * 
 * プラグインコマンドはありません。
 * 
 * ■ 使用方法
 *   ● マップ設定
 *     1. ランダムマップにしたいマップのメモに<random>と入力。
 *     2. 同メモに<size:n>と入力。nは縦と横にピースを配置する数です（最低3）。
 *        例えば<size:5>と入力すると縦5ピース、横5ピースの計25ピースが配置され
 *        ます。
 *     3. ランダムマップの下位に「ボイド」マップを一つ、「ピース」マップを任意
 *        の数作成してください。
 *        マップはドラッグ&ドロップすることで別のマップの下位に配置できるので、
 *        それを利用してください。
 *        「ボイド」とはランダムマップの空白部を表し、移動不可区域です。
 *        ピースを配置できなかった部分を埋めるために使用されます。
 *        「ピース」とはランダムマップの部品であり、最低1方向の通路を持ちます。
 *        上下左右の全ての通路の組み合わせは15通りであり、それぞれ最低一つ用意
 *        します。
 *        なおランダムマップ本体は「ベース」と呼称します。
 *        ベースは必ず一つ配置されます。
 *        あるマップからイベントでランダムマップに移動させる場合、ベースを指定
 *        してください。
 *        ランダムマップの背景やBGM、敵出現歩数などあらゆる設定はベースのものが
 *        参照されます。
 *        そのためボイドやピースには設定不要です。
 *     4. ベースと全てのピースのメモに<routes:>と入力。
 *        これはそのマップの持つ通路の方向を表します。
 *        そのマップの実際の形状に合わせて入力してください。
 *        例えば右と下に通路を持つマップの場合、<routes:右,下>と入力します。
 *        方向はカンマ（,）で区切ってください。
 *        方向はさまざまな記述が可能です。下記「書式」を参照してください。
 *     5. 下記「イベント設定」を参考にイベントを配置してください。
 *        ランダムマップにはベース、ピース、ボイドのいずれにも通常どおりイベン
 *        トを設置できます。
 *        一つのランダムマップには、使用されている全てのマップのイベントが配置
 *        されます。
 *        つまりベースのイベントは全て配置されますし、選ばれなかったピースのイ
 *        ベントは配置されません。
 *        ランダムマップでは、random属性とunique属性という専用の設定が用意され
 *        ており、出現に関わります。
 *        これらの属性は非ランダムマップでは使用されません。
 *        random属性が設定されているイベントは確率で出現します。
 *        unique属性が設定されているイベントは、ランダムマップのベース・ボイ
 *        ド・ピースに配置されている同じunique IDを持つイベントのうちいずれか
 *        一つだけがランダムに選択されて出現します。
 *        つまりそのうちの一つは必ず出現します。
 *        random属性とunique属性は併用が可能であり、同じunique IDのイベントのう
 *        ちいずれか一つが確率で出現する、という挙動にもできます。
 *        なおrandom属性やunique属性が設定されているかに関わらず、ランダムマッ
 *        プから別のマップに移動するとランダムマップに配置されていた全てのイ
 *        ベントの全てのセルフスイッチが自動的にオフになります。
 *        この挙動により、同じマップにひたすら移動し続けても何度でも宝箱が開け
 *        られます。
 *        反対に、一回しか開けられない宝箱にしたい場合はゲームスイッチを使用し
 *        てください。
 *        ゲームスイッチはランダムマップによって自動的にリセットされることはあ
 *        りません。
 *     6. （任意）マップの表示名を設定してください。表示名の「%1」はプラグイン
 *        パラメータ「マップ表示名変数ID」で指定したIDの変数の値に置き換えられ
 *        ます。
 * 
 *   ● イベント設定
 *     ・random属性
 *       ランダムに出現させたいイベントのメモに<random:n>と入力。
 *       nは出現確率を表します。
 *       例えば70%の確率で出現させたいイベントには<random:70>と入力してくださ
 *       い。
 *     ・unique属性
 *       排他的に出現させたいイベントのメモに<unique:n>と入力。
 *       nはunique IDを表します。
 *       例えばランダムマップのどこかに階段をランダムで一つだけ出現させたい場
 *       合、全ての階段に<unique:1>と設定してください。
 *       階段とは別グループの排他出現イベントを設置したい場合、
 *       <unique:2>, <unique:3>...と設定してください。
 * 
 * ■ マップの制限
 *   ランダムダンジョンとして使用するマップには、以下のような設定の制限がありま
 *   す。
 *   なお名前には制限がありませんので、自由につけることができます。
 *     ● ベース
 *       ・通路を最低一つ配置すること。数や組み合わせに制限はありません。
 *     ● ピース
 *       ・タイルセットがベースと同一であること。
 *       ・上下左右の通路のあらゆる組み合わせ（15通り。サンプル参照）を最低一つ
 *         ずつ用意すること。
 *       　同じ通路パターンのマップを複数用意することもできます。
 *       　例えば下と右に通路を持つマップを2つ用意した場合、1つしかない通路パ
 *         ターンと比べて抽選確率が2倍になります。
 *       ・全てのピースのマップ幅がベースのマップ幅と一致していること。
 *       ・全てのピースのマップ高さがベースのマップ高さと一致していること。
 *       ・上と下の通路のX座標が全て一致していること（ベースとも合わせる）。
 *       ・右と左の通路のY座標が全て一致していること（ベースとも合わせる）。
 *     ● ボイド
 *       ・タイルセットがベースと同一であること。
 *       ・一つのランダムマップにつき必ず一つのボイドを用意すること。
 *       ・マップ幅がベースのマップ幅と一致していること。
 *       ・マップ高さがベースのマップ高さと一致していること。
 *       ・タイルの配置に制限はありませんが、サンプルのようにタイルA3上部タイル
 *         で塗りつぶすと自然な印象になります。
 * 
 * ■ 書式（メタタグ）
 *   ● マップ
 *     ・<random>
 *     ・<size:n>
 *     ・<routes:（方向カンマ区切り）>
 *     　方向は以下のいずれでも記述可能です（大文字と小文字区別なし）。
 *     　半角スペースは無視されます。
 *         上：8,８,上,北,u,up,n,north
 *         下：2,２,下,南,d,down,s,south
 *         左：4,４,左,西,l,left,w,west
 *         右：6,６,右,東,r,right,e,east
 * 
 *   ● イベント
 *     ・<random:n>
 *     ・<unique:n>
 * 
 * 
 * このプラグインはMITライセンスにてリリースされています。
 * https://opensource.org/licenses/mit-license.php
 *
 * 
 * @param mapNameVariableId
 * @text マップ表示名変数ID
 * @desc マップ表示名に値が埋め込まれる変数のIDです。
 * @type variable
 * @default 1
 * 
 */

(() => {
    'use strict';
    const PLUGIN_NAME = "RandomDungeon";
    const pluginParams = PluginManager.parameters(PLUGIN_NAME);

    const MAP_NAME_VARIABLE_ID = Number(pluginParams.mapNameVariableId);


    DataManager.loadDataFileSynchronously = function(name, src) {
        const xhr = new XMLHttpRequest();
        const url = "data/" + src;
        window[name] = null;
        // By default, XMLHttpRequest opens asynchronously.
        // The third argument, false, makes it open synchronously.
        xhr.open("GET", url, false);
        xhr.overrideMimeType("application/json");
        xhr.onload = () => this.onXhrLoad(xhr, name, src, url);
        xhr.onerror = () => this.onXhrError(name, src, url);
        xhr.send();
    };

    DataManager.loadMapDataSynchronously = function(mapId) {
        if (mapId > 0) {
            const filename = "Map%1.json".format(mapId.padZero(3));
            this.loadDataFileSynchronously("$dataMap", filename);
        } else {
            this.makeEmptyMap();
        }
    };

    DataManager.mapRoutes = function(map) {
        const result = [];
        const routes = map.meta.routes;
        if (routes) {
            for (const string of routes.replace(/\s/g, "").split(",")) {
                switch (string.toLowerCase()) {
                    case "2":
                    case "２":
                    case "下":
                    case "南":
                    case "s":
                    case "d":
                    case "south":
                    case "down":
                        result.push(2);
                        break;
                    case "4":
                    case "４":
                    case "左":
                    case "西":
                    case "w":
                    case "l":
                    case "west":
                    case "left":
                        result.push(4);
                        break;
                    case "6":
                    case "６":
                    case "右":
                    case "東":
                    case "e":
                    case "r":
                    case "east":
                    case "right":
                        result.push(6);
                        break;
                    case "8":
                    case "８":
                    case "上":
                    case "北":
                    case "n":
                    case "u":
                    case "north":
                    case "up":
                        result.push(8);
                        break;
                }
            }
        }
        return result;
    };


    const _Game_Map_prototype_displayName = Game_Map.prototype.displayName;
    Game_Map.prototype.displayName = function() {
        return _Game_Map_prototype_displayName.call(this).format($gameVariables.value(MAP_NAME_VARIABLE_ID));
    };

    Game_Map.prototype.isRandom = function() {
        return this._random;
    };

    Game_Map.prototype.playerOffsetX = function() {
        return this._playerOffsetX;
    };

    Game_Map.prototype.playerOffsetY = function() {
        return this._playerOffsetY;
    };

    const _Game_Map_prototype_width = Game_Map.prototype.width;
    Game_Map.prototype.width = function() {
        return this._width || _Game_Map_prototype_width.call(this);
    };

    const _Game_Map_prototype_height = Game_Map.prototype.height;
    Game_Map.prototype.height = function() {
        return this._height || _Game_Map_prototype_height.call(this);
    };
    
    const _Game_Map_prototype_data = Game_Map.prototype.data;
    Game_Map.prototype.data = function() {
        return this._data || _Game_Map_prototype_data.call(this);
    };
    
    Game_Map.prototype.setup = function(mapId) {
        if (!$dataMap) {
            throw new Error("The map data is not available");
        }
        this._mapId = mapId;
        this._tilesetId = $dataMap.tilesetId;
        this._displayX = 0;
        this._displayY = 0;
        this.refereshVehicles();
        this.setupData();
        this.setupScroll();
        this.setupParallax();
        this.setupBattleback();
        this._needsRefresh = false;
    };
    
    Game_Map.prototype.setupData = function() {
        const isRandom = $dataMap.meta.random;
        if (isRandom) {
            this._random = true;
            const mapId = this._mapId;
            const pieceIds = $dataMapInfos.filter(mi => mi && mi.parentId === mapId).map(mi => mi.id);
            const maps = new Map;
            let voidMap;
            maps.set(mapId, {...$dataMap});
            for (const pieceId of pieceIds) {
                DataManager.loadMapDataSynchronously(pieceId)
                if (DataManager.mapRoutes($dataMap).length === 0) {
                    voidMap = {...$dataMap};
                } else {
                    maps.set(pieceId, {...$dataMap});
                }
            }
            DataManager.loadMapDataSynchronously(mapId)
            voidMap = voidMap || $dataMap;
            const size = Math.max((Number($dataMap.meta.size) || 5), 3);
            const bigMap = [];
            const keepings = [];
            const sw = $dataMap.width;
            const sh = $dataMap.height;
            const routes = DataManager.mapRoutes($dataMap);
            const arrayMaps = Array.from(maps.entries());
            while (true) {
                const initialX = Math.floor(Math.random() * size);
                const initialY = Math.floor(Math.random() * size);
                if (initialX === 0 && routes.includes(4)) continue;
                if (initialY === 0 && routes.includes(8)) continue;
                if (initialX === size - 1 && routes.includes(6)) continue;
                if (initialY === size - 1 && routes.includes(2)) continue;
                bigMap[initialX + initialY * size] = $dataMap;
                this._playerOffsetX = sw * initialX;
                this._playerOffsetY = sh * initialY;
                for (const d of routes) {
                    switch (d) {
                        case 2: keepings.push([initialX, initialY+1, 2]); break;
                        case 4: keepings.push([initialX-1, initialY, 4]); break;
                        case 6: keepings.push([initialX+1, initialY, 6]); break;
                        case 8: keepings.push([initialX, initialY-1, 8]); break;
                    }
                }
                break;
            }
            let count = 0;
            while (keepings.length > 0) {
                const k = keepings.pop();
                const kx = k[0];
                const ky = k[1];
                const kd = k[2];
                if (bigMap[kx + ky * size]) continue;
                const paths = [10 - kd];
                const walls = [];
                for (const d of [2, 4, 6, 8]) {
                    if (d === 10 - kd) continue;
                    let map;
                    switch (d) {
                        case 2: if (ky + 1 < size) map = bigMap[kx + (ky+1) * size]; break;
                        case 4: if (kx - 1 >= 0)   map = bigMap[(kx-1) + ky * size]; break;
                        case 6: if (kx + 1 < size) map = bigMap[(kx+1) + ky * size]; break;
                        case 8: if (ky - 1 >= 0)   map = bigMap[kx + (ky-1) * size]; break;
                    }
                    if (map) {
                        if (DataManager.mapRoutes(map).includes(10 - d)) {
                            paths.push(d);
                        } else {
                            walls.push(d);
                        }
                    }
                }
                let choices = [];
                for (const ary of arrayMaps) {
                    const id = ary[0];
                    const map = ary[1];
                    if (id === mapId) continue;
                    const rts = DataManager.mapRoutes(map);
                    if (paths.some(d => !rts.includes(d))) continue;
                    if (walls.some(d => rts.includes(d))) continue;
                    if (kx === 0 && rts.includes(4)) continue;
                    if (ky === 0 && rts.includes(8)) continue;
                    if (kx === size - 1 && rts.includes(6)) continue;
                    if (ky === size - 1 && rts.includes(2)) continue;
                    choices.push(map);
                }
                if (choices.length === 0) break;
                if (count < size && choices.length > 1) {
                    const filteredChoices = choices.filter(map => DataManager.mapRoutes(map).length > 1);
                    if (filteredChoices.length > 0) choices = filteredChoices;
                }
                const pieceMap = choices[Math.floor(Math.random() * choices.length)];
                bigMap[kx + ky * size] = pieceMap;
                count++;
                for (const d of DataManager.mapRoutes(pieceMap)) {
                    let ary;
                    switch (d) {
                        case 2: ary = [kx, ky+1, 2]; break;
                        case 4: ary = [kx-1, ky, 4]; break;
                        case 6: ary = [kx+1, ky, 6]; break;
                        case 8: ary = [kx, ky-1, 8]; break;
                    }
                    if (!bigMap[ary[0] + ary[1] * size]) keepings.unshift(ary);
                }
            }
            const ary = [];
            for (let i=0; i<size; i++) {
                for (let j=0; j<size; j++) {
                    const map = bigMap[j + i * size] || voidMap;
                    ary.push(map.data);
                }
            }
            this._data = this.aggregateMapData(ary, size, sw, sh);
            this._width = sw * size;
            this._height = sh * size;
            this.setupEvents();
            this._events = [];
            let eventId = 1;
            const uniques = new Map;
            for (let i=0; i<size; i++) {
                for (let j=0; j<size; j++) {
                    const map = bigMap[i + j * size] || voidMap;
                    const xPlus = sw * i;
                    const yPlus = sh * j;
                    const events = map.events;
                    for (let k=0; k<events.length; k++) {
                        const event = events[k];
                        if (!event) continue;
                        const meta = event.meta;
                        const prob = Number(meta.random);
                        if (prob && Math.floor(Math.random() * 100) + 1 > prob) continue;
                        const uniqueId = Number(meta.unique);
                        if (uniqueId) {
                            const ary = uniques.get(uniqueId);
                            const uniqueEvent = [event, xPlus, yPlus];
                            if (ary) {
                                ary.push(uniqueEvent);
                            } else {
                                uniques.set(uniqueId, [uniqueEvent])
                            }
                        } else {
                            const newEvent = new Game_Event(mapId, eventId, event);
                            this._events[eventId] = newEvent;
                            newEvent.locate(newEvent.x + xPlus, newEvent.y + yPlus);
                            eventId++;
                        }
                    }
                }
            }
            for (const group of uniques.values()) {
                if (group.length > 0) {
                    const unique = group[Math.floor(Math.random() * group.length)];
                    const newEvent = new Game_Event(mapId, eventId, unique[0]);
                    this._events[eventId] = newEvent;
                    newEvent.locate(newEvent.x + unique[1], newEvent.y + unique[2]);
                    eventId++;
                }
            }
            this.refreshTileEvents();
        } else {
            this._random = false;
            this._playerOffsetX = 0;
            this._playerOffsetY = 0;
            this._data = null;
            this._width = null;
            this._height = null;
            this.setupEvents();
        }
    };

    Game_Map.prototype.splitMapData = function(data, width, height) {
        const result = [];
        for (let i=0; i<height*6; i++) {
            result.push(data.slice(width * i, width * (i + 1)));
        }
        return result;
    };

    Game_Map.prototype.aggregateMapData = function(allData, size, unitWidth, unitHeight) {
        const result = [];
        const temp = [];
        for (const data of allData) {
            temp.push(this.splitMapData(data, unitWidth, unitHeight))
        }
        for (let i=0; i<6; i++) {
            for (let j=0; j<unitHeight*size; j++) {
                for (let k=0; k<size; k++) {
                    const data = temp[k + Math.floor(j / unitHeight) * size];
                    result.push(data.shift());
                }
            }   
        }
        return result.flat(2);
    };

    Game_Map.prototype.adjustX = function(x) {
        const width = this.width();
        if (this.isLoopHorizontal() && x < this._displayX - (width - this.screenTileX()) / 2) {
            return x - this._displayX + width;
        } else {
            return x - this._displayX;
        }
    };
    
    Game_Map.prototype.adjustY = function(y) {
        const height = this.height();
        if (this.isLoopVertical() && y < this._displayY - (height - this.screenTileY()) / 2) {
            return y - this._displayY + height;
        } else {
            return y - this._displayY;
        }
    };
    
    Game_Map.prototype.scrollDown = function(distance) {
        const height = this.height();
        if (this.isLoopVertical()) {
            this._displayY += distance;
            this._displayY %= height;
            if (this._parallaxLoopY) {
                this._parallaxY += distance;
            }
        } else if (height >= this.screenTileY()) {
            const lastY = this._displayY;
            this._displayY = Math.min(
                this._displayY + distance,
                this.height() - this.screenTileY()
            );
            this._parallaxY += this._displayY - lastY;
        }
    };
    
    Game_Map.prototype.scrollLeft = function(distance) {
        const width = this.width();
        if (this.isLoopHorizontal()) {
            this._displayX += width - distance;
            this._displayX %= width;
            if (this._parallaxLoopX) {
                this._parallaxX -= distance;
            }
        } else if (width >= this.screenTileX()) {
            const lastX = this._displayX;
            this._displayX = Math.max(this._displayX - distance, 0);
            this._parallaxX += this._displayX - lastX;
        }
    };
    
    Game_Map.prototype.scrollRight = function(distance) {
        const width = this.width();
        if (this.isLoopHorizontal()) {
            this._displayX += distance;
            this._displayX %= width;
            if (this._parallaxLoopX) {
                this._parallaxX += distance;
            }
        } else if (width >= this.screenTileX()) {
            const lastX = this._displayX;
            this._displayX = Math.min(
                this._displayX + distance,
                width - this.screenTileX()
            );
            this._parallaxX += this._displayX - lastX;
        }
    };
    
    Game_Map.prototype.scrollUp = function(distance) {
        const height = this.height();
        if (this.isLoopVertical()) {
            this._displayY += height - distance;
            this._displayY %= height;
            if (this._parallaxLoopY) {
                this._parallaxY -= distance;
            }
        } else if (height >= this.screenTileY()) {
            const lastY = this._displayY;
            this._displayY = Math.max(this._displayY - distance, 0);
            this._parallaxY += this._displayY - lastY;
        }
    };

    Game_Map.prototype.tileId = function(x, y, z) {
        const width = this.width();
        const height = this.height();
        return this.data()[(z * height + y) * width + x] || 0;
    };

    Game_Map.prototype.clearAllSelfSwitches = function() {
        this._events.forEach(event => event.clearSelfSwitches());
    };


    Game_Player.prototype.locate = function(x1, y1) {
        const x2 = x1 + $gameMap.playerOffsetX();
        const y2 = y1 + $gameMap.playerOffsetY();
        Game_Character.prototype.locate.call(this, x2, y2);
        this.center(x2, y2);
        this.makeEncounterCount();
        if (this.isInVehicle()) {
            this.vehicle().refresh();
        }
        this._followers.synchronize(x2, y2, this.direction());
    };

    Game_Player.prototype.performTransfer = function() {
        if (this.isTransferring()) {
            this.setDirection(this._newDirection);
            if ($gameMap.isRandom()) $gameMap.clearAllSelfSwitches();
            if (this._newMapId !== $gameMap.mapId() || this._needsMapReload) {
                $gameMap.setup(this._newMapId);
                this._needsMapReload = false;
            }
            this.locate(this._newX, this._newY);
            this.refresh();
            this.clearTransferInfo();
        }
    };


    Game_Event.prototype.initialize = function(mapId, eventId, event=null) {
        Game_Character.prototype.initialize.call(this);
        this._mapId = mapId;
        this._eventId = eventId;
        this._event = event;
        const eventData = this.event();
        this.locate(eventData.x, eventData.y);
        this.refresh();
    };

    const _Game_Event_prototype_event = Game_Event.prototype.event;
    Game_Event.prototype.event = function() {
        return this._event || _Game_Event_prototype_event.call(this);
    };

    Game_Event.prototype.clearSelfSwitches = function() {
        ["A","B","C","D"].forEach(c => $gameSelfSwitches.setValue([this._mapId, this._eventId, c], false));
    };


    const _Scene_Load_prototype_reloadMapIfUpdated = Scene_Load.prototype.reloadMapIfUpdated;
    Scene_Load.prototype.reloadMapIfUpdated = function() {
        if (!$gameMap.isRandom()) _Scene_Load_prototype_reloadMapIfUpdated.call(this);
    };


})();
