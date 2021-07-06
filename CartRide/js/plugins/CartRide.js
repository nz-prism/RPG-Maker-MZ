//=============================================================================
// RPG Maker MZ - CartRide
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Displays a cart sprite upon a character when they get on a cart.
 * @author nz_prism
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/CartRide/js/plugins/CartRide.js
 *
 * @help CartRide.js
 * ver. 2.0.2
 * 
 * [History]
 * 09/26/2020 1.0.0 Released
 * 09/27/2020 1.0.1 Supported images which is not 48 x 48.
 * 02/25/2021 2.0.0 Excluded the cart image file from unused file exclusion. Not compatible with older versions.
 * 06/22/2021 2.0.1 Sub-folder compatibility for RMMZ 1.3.0 or later
 * 07/06/2021 2.0.2 Supported sub-folder improvement of RMMZ 1.3.2
 * 
 * This plugin provides a capability to force the player move along the rail
 * with a cart sprite.
 *
 * ■ How to Use
 *   1. Configure the Tileset (See below for the detail).
 *   2. Place rail tiles on a map. Although you MUST place at least the start and
 *      the end, you can place any other rails as you wish to.
 *   3. Copy & paste the Cart event (Start) on the sample map.
 *   4. Correct the direction of the sprite at the page1 of 3.
 *   5. Copy & paste the Cart event (End) on the sample map.
 *   6. Correct the direction of the sprite at the page2 of 5.
 *   7. When you click the Cart event (Start), the player goes along the rail
 *      with its sprite on the cart. It automatically stops at the end of the rail.
 *
 * ■ Tileset Configuration
 *   See the tab "C" of the Tileset ID 4 "Dungeon".
 *   Set the "Passage: 4 Directions" the same as the sample project.
 *   if you use the default tilesets, it's a best practice to copy & paste
 *   the sample tilemap.
 * 
 * ■ Cart Event
 *   There are 2 types of the Cart event for each of the start and the end.
 *   They reflect the setting for the followers. See the note of the events.
 * 
 * It does not provide plugin commands.
 * 
 * This plugin is released under the MIT License.
 * https://opensource.org/licenses/mit-license.php
 * 
 * 
 * @param cartCharacter
 * @text Cart Image
 * @desc Image information for a cart.
 * @type struct<character>
 * 
 */

/*~struct~character:
 *
 * @param fileName
 * @text Cart Character File Name
 * @desc The file name you want to use as a cart sprite.
 * @default Vehicle
 * @type file
 * @dir img/characters/
 *
 * @param characterIndex
 * @text Cart Character Index
 * @desc The characer index for the cart sprite. The starting index is 0.
 * @default 6
 * @type number
 * @max 7
 * @min 0
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc プレイヤーがトロッコに搭乗した状態のグラフィックに変化し、線路に沿って移動します。
 * @author nz_prism
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/CartRide/js/plugins/CartRide.js
 *
 * @help CartRide.js
 * ver. 2.0.2
 * 
 * [バージョン履歴]
 * 2020/09/26 1.0.0 リリース
 * 2020/09/27 1.0.1 48x48サイズでないトロッコのキャラクターグラフィックに対応
 * 2021/02/25 2.0.0 トロッコ画像が未使用素材削除対象にならないように修正。旧版との互換性なし
 * 2021/06/22 2.0.1 本体バージョン1.3.0以降のサブフォルダへの格納に対応
 * 2021/07/06 2.0.2 本体バージョン1.3.2のサブフォルダ機能改善に対応
 * 
 * このプラグインは、プレイヤーが自動的に線路に沿って移動する機能を提供します。
 * その際、グラフィックもトロッコに搭乗した状態に変化します。
 *
 * ■ 基本使用方法
 *   1. タイルセットの設定をしてください（詳細は下記を参照）。
 *   2. 任意のマップにレールタイルを敷いてください。始点と終点は必ず用意しなければ
 *      なりませんが、そのほかは自由に配置することができます。
 *   3. テストマップのトロッコイベント始点を、 2 のレール始点にコピー＆ペーストしてください。
 *   4. 3 のイベントの 1 ページ目のグラフィックの向きをレールに合わせてください。
 *   5. テストマップのトロッコイベント終点を、 2 のレール終点にコピー＆ペーストしてください。
 *   6. 5 のイベントの 2 ページ目のグラフィックの向きをレールに合わせてください。
 *   7. 始点トロッコを調べればプレイヤーキャラクターがトロッコに乗って走り出します。
 *      終点に到着すると停止します。
 *
 * ■ タイルセットの設定
 *   デフォルトのタイルセットの、ID 4 「ダンジョン」の C タブにレール状のタイル群
 *   があります。このタイルの「通行: 4 方向」を、テストプロジェクトと同じように設定
 *   すれば設定完了です。タイル素材がデフォルトと変わらなければ、テストプロジェクト
 *   からコピー＆ペーストするのがもっとも手軽です。
 * 
 * ■ トロッコイベントについて
 *   テストマップには始点、終点ともに 2 種類のトロッコイベントが存在します。これ
 *   は隊列歩行に合わせたオプションです。詳細はイベント内の注釈をお読みください。
 * 
 * ■ プラグインコマンドはありません。
 * 
 * このプラグインはMITライセンスにてリリースされています。
 * https://opensource.org/licenses/mit-license.php
 *
 *  
 * @param cartCharacter
 * @text トロッコ画像
 * @desc トロッコとして使用するキャラクター画像の情報です。
 * @type struct<character>
 * 
 */

 /*~struct~character:ja
 *
 * @param fileName
 * @text トロッコキャラクターファイル名
 * @desc トロッコとして使用するキャラクター画像のファイル名です。
 * @default Vehicle
 * @type file
 * @dir img/characters/
 *
 * @param characterIndex
 * @text トロッコキャラクターインデックス
 * @desc トロッコとして使用するキャラクターの画像のインデックスです。左上を0として数えます。
 * @default 6
 * @type number
 * @max 7
 * @min 0
 * 
 */

(() => {
    'use strict';


    const PLUGIN_NAME = "CartRide";


    const CART_CHARACTER = JSON.parse(PluginManager.parameters(PLUGIN_NAME)["cartCharacter"]);
    const CART_FILE_NAME = CART_CHARACTER["fileName"];
    const CART_CHARACTER_INDEX = Number(CART_CHARACTER["characterIndex"]);

    
    const _Game_Character_initMembers = Game_Character.prototype.initMembers;
    Game_Character.prototype.initMembers = function() {
        _Game_Character_initMembers.call(this);
        this._onCart = false;
    };

    Game_Character.prototype.isOnCart = function() {
        return this._onCart;
    };

    Game_Character.prototype.getOnCart = function() {
        this._onCart = true;
    };

    Game_Character.prototype.getOffCart = function() {
        this._onCart = false;
    };

    Game_Character.prototype.clearMoveRouteForcing = function() {
        this._moveRouteForcing = false;
    };

    Game_Character.prototype.moveAlong = function() {
        const oldX = this.x
        const oldY = this.y
        const ary = [2,4,6,8].filter(d => d !== this.direction() && (10-d) !== this.direction());
        this.moveForward();
        if (this.x === oldX && this.y === oldY) this.moveStraight(ary[0]);
        if (this.x === oldX && this.y === oldY) this.moveStraight(ary[1]);
    };

    const _Sprite_Character_updateOther = Sprite_Character.prototype.updateOther;
    Sprite_Character.prototype.updateOther = function() {
        _Sprite_Character_updateOther.call(this);
        this._onCart = this._character.isOnCart();
    };

    const _Sprite_Character_updateHalfBodySprites = Sprite_Character.prototype.updateHalfBodySprites;
    Sprite_Character.prototype.updateHalfBodySprites = function() {
        if (this._onCart) {
            this.createHalfBodySprites();
            this._upperBody.bitmap = this.bitmap;
            this._upperBody.visible = true;
            this._lowerBody.bitmap = ImageManager.loadCharacter(CART_FILE_NAME);
            this._lowerBody.visible = true;
            this._lowerBody.opacity = 255;
        } else {
            _Sprite_Character_updateHalfBodySprites.call(this);
        }
    };

    const _Sprite_Character_createHalfBodySprites = Sprite_Character.prototype.createHalfBodySprites;
    Sprite_Character.prototype.createHalfBodySprites = function() {
        if (this._onCart) {
            if (!this._lowerBody) {
                this._lowerBody = new Sprite();
                this._lowerBody.anchor.x = 0.5;
                this._lowerBody.anchor.y = 1;
                this.addChild(this._lowerBody);
            }
            if (!this._upperBody) {
                this._upperBody = new Sprite();
                this._upperBody.anchor.x = 0.5;
                this._upperBody.anchor.y = 1;
                this.addChild(this._upperBody);
            }
        } else {
            _Sprite_Character_createHalfBodySprites.call(this);
        }
    };

    const _Sprite_Character_updateCharacterFrame = Sprite_Character.prototype.updateCharacterFrame;
    Sprite_Character.prototype.updateCharacterFrame = function() {
        if (this._onCart) {
            const pw = this.patternWidth();
            const ph = this.patternHeight();
            const sx = (this.characterBlockX() + this.characterPatternX()) * pw;
            const sy = (this.characterBlockY() + this.characterPatternY()) * ph;
            const cx = ((CART_CHARACTER_INDEX % 4) * 3 + this.characterPatternX()) * pw;
            const cy = (Math.floor(CART_CHARACTER_INDEX / 4) * 4 + this.characterPatternY()) * ph;
            const cw = this.cartPatternWidth();
            const ch = this.cartPatternHeight();
            this.updateHalfBodySprites();
            this._upperBody.setFrame(sx, sy, pw, ph / 3 * 2);
            this._lowerBody.setFrame(cx, cy, cw, ch);
            this._upperBody.y = -(ph / 2);
            this.setFrame(sx, sy, 0, ph);
        } else {
            _Sprite_Character_updateCharacterFrame.call(this);
        }
    };

    Sprite_Character.prototype.cartPatternWidth = function() {
        if (this._onCart && !!this._lowerBody) {
            const n = (ImageManager.isBigCharacter(CART_FILE_NAME)) ? 3 : 12 
            return this._lowerBody.bitmap.width / n;
        } else {
            return 0;
        }
    };

    Sprite_Character.prototype.cartPatternHeight = function() {
        if (this._onCart && !!this._lowerBody) {
            const n = (ImageManager.isBigCharacter(CART_FILE_NAME)) ? 4 : 8 
            return this._lowerBody.bitmap.height / n;
        } else {
            return 0;
        }
    };

})();
