//=============================================================================
// RPG Maker MZ - OptionEx
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Extends the option scene.
 * @author nz_prism
 * @url https://twitter.com/nz_prism
 *
 * @help OptionEx.js
 * ver. 1.1.0
 * 
 * [History]
 * 02/28/2021 1.0.0 Released
 * 03/03/2021 1.0.1 Corrected default tone glitches and calibrated the window height.
 * 03/05/2021 1.0.2 Fixed bugs when dash speed or fast message is unused.
 * 04/05/2021 1.1.0 Added Switch A/B Buttons and plugin parameters to disable standard items.
 * 
 * This plugin extends the option scene.
 * It adds window-cosmetics, dash-speed and fast-message options.
 * It also enables to show gauges for volume/tone options.
 * Pageup/Pagedown button (can also be push by UI buttons) is supported
 * to change values quickly.
 * Mouse-drag and swipe inputs can be used for the gauges.
 * Each option item can be unused by setting the plugin parameters.
 * 
 * 
 * This plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 *
 *
 * @param windowWidth
 * @text Option Window Width
 * @desc Specify the width for the option window.
 * @default 560
 * @type number
 * @min 400
 * @max 3840
 * 
 * @param itemHeight
 * @text Option Item Height
 * @desc Specify the height for the individual option items.
 * @default 28
 * @type number
 * @min 24
 * @max 64
 * 
 * @param fontSize
 * @text Font Size
 * @desc Specify the font size for the option window.
 * @default 23
 * @type number
 * @min 18
 * @max 48
 * 
 * @param defaultCommandOffset
 * @text Default Command Offset
 * @desc Specify the Y-axis offset for a command to reset to default.
 * @default 12
 * @type number
 * @min 0
 * @max 36
 * 
 * @param titleColor
 * @text Option Name Color
 * @desc Specify the color for each option name.
 * @default 6
 * @type number
 * @min 0
 * @max 31
 * 
 * @param useAlwaysDash
 * @text Use Always Dash
 * @desc Specify to enable an option to toggle auto-dash.
 * @default true
 * @type boolean
 * 
 * @param useCommandRemember
 * @text Use Command Remember
 * @desc Specify to enable an option to toggle command remember.
 * @default true
 * @type boolean
 * 
 * @param useTouchUI
 * @text Use Touch UI
 * @desc Specify to enable an option to toggle touch UI.
 * @default true
 * @type boolean
 * 
 * @param useBgmVolume
 * @text Use BGM Volume
 * @desc Specify to enable an option to tune BGM volume.
 * @default true
 * @type boolean
 * 
 * @param useBgsVolume
 * @text Use BGS Volume
 * @desc Specify to enable an option to tune BGS volume.
 * @default true
 * @type boolean
 * 
 * @param useMeVolume
 * @text Use ME Volume
 * @desc Specify to enable an option to tune ME volume.
 * @default true
 * @type boolean
 * 
 * @param useSeVolume
  * @text Use SE Volume
 * @desc Specify to enable an option to tune SE volume.
 * @default true
 * @type boolean
 * 
 * @param useSwitchABButtons
 * @text Use Switch A/B Buttons
 * @desc Specify to enable an option to switch A/B buttons.
 * @default true
 * @type boolean
 * 
 * @param useFastMessage
 * @text Use Fast Message
 * @desc Specify to enable an option to show messages immediately.
 * @default true
 * @type boolean
 * 
 * @param useDashSpeed
 * @text Use Dash Speed
 * @desc Specify to enable an option to change the player dash-speed.
 * @default true
 * @type boolean
 *  
 * @param useWindowskin
 * @text Use Windowskin
 * @desc Specify to enable an option to change the windowskin.
 * @default true
 * @type boolean
 * 
 * @param useWindowTone
 * @text Use Window Color
 * @desc Specify to enable options to change the window tone.
 * @default true
 * @type boolean
 * 
 * @param useWindowOpacity
 * @text Use Window Opacity
 * @desc Specify to enable an option to change the window opacity.
 * @default true
 * @type boolean
 * 
 * @param switchABButtonsName
 * @text Switch A/B Buttons Name
 * @desc Specify the name of an option to switch A/B buttons.
 * @default Switch A/B Buttons
 * @type string
 * 
 * @param fastMessageName
 * @text Fast Message Name
 * @desc Specify the name of an option to show messages immediately.
 * @default Fast Message
 * @type string
 * 
 * @param dashSpeedName
 * @text Dash Speed Name
 * @desc Specify the name of an option to change the player dash-speed.
 * @default Dash Speed
 * @type string
 * 
 * @param windowskinName
 * @text Windowskin Name
 * @desc Specify the name of an option to change the windowskin.
 * @default Windowskin
 * @type string
 * 
 * @param windowToneRedName
 * @text Window Color Red Name
 * @desc Specify the name of an option to change the red value of windows.
 * @default Window Color R
 * @type string
 * 
 * @param windowToneGreenName
 * @text Window Color Green Name
 * @desc Specify the name of an option to change the green value of windows.
 * @default Window Color G
 * @type string
 * 
 * @param windowToneBlueName
 * @text Window Color Blue Name
 * @desc Specify the name of an option to change the blue value of windows.
 * @default Window Color B
 * @type string
 * 
 * @param windowOpacityName
 * @text Window Opacity Name
 * @desc Specify the name of an option to change the opacity of windows.
 * @default Window Opacity
 * @type string
 * 
 * @param defaultCommandName
 * @text Default Command Name
 * @desc Specify the name of a command to reset to default.
 * @default Reset to Default
 * @type string
 * 
 * @param defaultVolume
 * @text Default Volume
 * @desc Specify the default volume for BGM, BGS, ME and SE.
 * @default 75
 * @type number
 * @min 0
 * @max 100
 * 
 * @param defaultSwitchABButtons
 * @text Default Switch A/B Buttons
 * @desc The default value for the switch A/B buttons option.
 * @default false
 * @type boolean
 * 
 * @param defaultFastMessage
 * @text Default Fast Message
 * @desc The default value for the fast message option.
 * @default false
 * @type boolean
 * 
 * @param defaultDashSpeed
 * @text Default Dash Speed
 * @desc Specify the default value for dash-speed (0-2). Note it appears +1 on the screen.
 * @default 0
 * @type number
 * @min 0
 * @max 2
 * 
 * @param defaultWindowOpacity
 * @text Default Window Opacity
 * @desc The defalt value for the window opacity.
 * @default 195
 * @type number
 * @min 0
 * @max 255
 * 
 * @param windowskins
 * @text Windowskins
 * @desc Add as many windowskin files as you want users to choose.
 * @default ["Window"]
 * @type file[]
 * @dir img/system
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc オプション画面を拡張します。
 * @author nz_prism
 * @url https://twitter.com/nz_prism
 *
 * @help OptionEx.js
 * ver. 1.1.0
 * 
 * [バージョン履歴]
 * 2021/02/28 1.0.0 リリース
 * 2021/03/03 1.0.1 Wカラーデフォルト値に関するバグ修正、ウィンドウ高さの微調整
 * 2021/03/05 1.0.2 ダッシュ速度やメッセージ瞬間表示が不使用の場合のバグを修正
 * 2021/04/05 1.1.0 A/Bボタン入れ替え機能、標準項目不使用設定追加
 * 
 * このプラグインは、オプション画面にさまざまな機能を追加します。
 * ウィンドウの外観を変更するオプションのほか、ダッシュ速度を変更するもの、
 * メッセージを瞬間的に表示するオプションも追加されます。
 * また、音量・ウィンドウカラーオプションにはゲージが表示されるようになります。
 * Pageup・Pagedownボタンで大きく値を変更できます（タッチUI用ボタンも
 * 用意されています）。
 * ゲージ系項目では、マウスでドラッグ、あるいはスワイプ操作でも値を
 * 操作できます。
 * なお、追加オプションは個別に使用するかどうかを設定できます。
 * 
 * 
 * このプラグインはMITライセンスにてリリースされています。
 * https://opensource.org/licenses/mit-license.php
 *
 *
 * @param windowWidth
 * @text オプションウィンドウ幅
 * @desc オプションウィンドウの幅を設定してください。
 * @default 560
 * @type number
 * @min 400
 * @max 3840
 * 
 * @param itemHeight
 * @text オプション項目高さ
 * @desc オプション項目の高さを設定してください。
 * @default 28
 * @type number
 * @min 24
 * @max 64
 * 
 * @param fontSize
 * @text フォントサイズ
 * @desc オプション画面のフォントサイズを設定してください。
 * @default 23
 * @type number
 * @min 18
 * @max 48
 * 
 * @param defaultCommandOffset
 * @text デフォルトコマンドオフセット
 * @desc デフォルトに戻すコマンドをY座標にずらす値を設定してください。
 * @default 12
 * @type number
 * @min 0
 * @max 36
 * 
 * @param titleColor
 * @text 項目名文字色
 * @desc オプションの項目名を描画する色番号を設定してください。
 * @default 6
 * @type number
 * @min 0
 * @max 31
 * 
 * @param useAlwaysDash
 * @text 常時ダッシュの使用
 * @desc 常時ダッシュオプションを使用するかどうかを設定してください。
 * @default true
 * @type boolean
 * 
 * @param useCommandRemember
 * @text コマンド記憶の使用
 * @desc コマンド記憶オプションを使用するかどうかを設定してください。
 * @default true
 * @type boolean
 * 
 * @param useTouchUI
 * @text タッチUIの使用
 * @desc タッチUIオプションを使用するかどうかを設定してください。
 * @default true
 * @type boolean
 * 
 * @param useBgmVolume
 * @text BGM音量の使用
 * @desc BGM音量オプションを使用するかどうかを設定してください。
 * @default true
 * @type boolean
 * 
 * @param useBgsVolume
 * @text BGS音量の使用
 * @desc BGS音量オプションを使用するかどうかを設定してください。
 * @default true
 * @type boolean
 * 
 * @param useMeVolume
 * @text ME音量の使用
 * @desc ME音量オプションを使用するかどうかを設定してください。
 * @default true
 * @type boolean
 * 
 * @param useSeVolume
 * @text SE音量の使用
 * @desc SE音量オプションを使用するかどうかを設定してください。
 * @default true
 * @type boolean
 * 
 * @param useSwitchABButtons
 * @text A/Bボタン入れ替えの使用
 * @desc A/Bボタン入れ替えオプションを使用するかどうかを設定してください。
 * @default true
 * @type boolean
 * 
 * @param useFastMessage
 * @text メッセージ瞬間表示の使用
 * @desc メッセージ瞬間表示オプションを使用するかどうかを設定してください。
 * @default true
 * @type boolean
 * 
 * @param useDashSpeed
 * @text ダッシュ速度の使用
 * @desc ダッシュ速度オプションを使用するかどうかを設定してください。
 * @default true
 * @type boolean
 *  
 * @param useWindowskin
 * @text ウィンドウスキンの使用
 * @desc ウィンドウスキンオプションを使用するかどうかを設定してください。
 * @default true
 * @type boolean
 * 
 * @param useWindowTone
 * @text ウィンドウカラーの使用
 * @desc ウィンドウカラーオプションを使用するかどうかを設定してください。
 * @default true
 * @type boolean
 * 
 * @param useWindowOpacity
 * @text ウィンドウ透明度の使用
 * @desc ウィンドウ透明度オプションを使用するかどうかを設定してください。
 * @default true
 * @type boolean
 * 
 * @param switchABButtonsName
 * @text A/Bボタン入れ替え名
 * @desc A/Bボタン入れ替えの表示名を設定してください。
 * @default A/Bボタン入れ替え
 * @type string
 * 
 * @param fastMessageName
 * @text メッセージ瞬間表示名
 * @desc メッセージ瞬間表示の表示名を設定してください。
 * @default メッセージ瞬間表示
 * @type string
 * 
 * @param dashSpeedName
 * @text ダッシュ速度名
 * @desc ダッシュ速度の表示名を設定してください。
 * @default ダッシュ速度
 * @type string
 * 
 * @param windowskinName
 * @text ウィンドウスキン名
 * @desc ウィンドウスキンの表示名を設定してください。
 * @default ウィンドウスキン
 * @type string
 * 
 * @param windowToneRedName
 * @text ウィンドウカラー（赤）名
 * @desc ウィンドウカラー（赤）の表示名を設定してください。
 * @default ウィンドウカラーR
 * @type string
 * 
 * @param windowToneGreenName
 * @text ウィンドウカラー（緑）名
 * @desc ウィンドウカラー（緑）の表示名を設定してください。
 * @default ウィンドウカラーG
 * @type string
 * 
 * @param windowToneBlueName
 * @text ウィンドウカラー（青）名
 * @desc ウィンドウカラー（青）の表示名を設定してください。
 * @default ウィンドウカラーB
 * @type string
 * 
 * @param windowOpacityName
 * @text ウィンドウ不透明度名
 * @desc ウィンドウ不透明度の表示名を設定してください（高いほど透明でなくなることに注意）。
 * @default ウィンドウ透明度
 * @type string
 * 
 * @param defaultCommandName
 * @text デフォルトコマンド名
 * @desc 全てをデフォルト値に戻すコマンドの名前を設定してください。
 * @default すべてデフォルトに戻す
 * @type string
 * 
 * @param defaultVolume
 * @text デフォルト音量
 * @desc 音量のデフォルト値です。BGM、BGS、ME、SE全て共通です。
 * @default 75
 * @type number
 * @min 0
 * @max 100
 * 
 * @param defaultSwitchABButtons
 * @text デフォルトA/Bボタン入れ替え
 * @desc A/Bボタン入れ替えのデフォルト値です。
 * @default false
 * @type boolean
 * 
 * @param defaultFastMessage
 * @text デフォルトメッセージ瞬間表示
 * @desc メッセージ瞬間表示のデフォルト値です。
 * @default false
 * @type boolean
 * 
 * @param defaultDashSpeed
 * @text デフォルトダッシュ速度
 * @desc ダッシュ速度のデフォルト値（0〜2）です。ゲーム内表示では +1 される点にご注意ください。
 * @default 0
 * @type number
 * @min 0
 * @max 2
 * 
 * @param defaultWindowOpacity
 * @text デフォルトウィンドウ不透明度
 * @desc ウィンドウ不透明度のデフォルト値です。
 * @default 195
 * @type number
 * @min 0
 * @max 255
 * 
 * @param windowskins
 * @text ウィンドウスキン
 * @desc オプションで選択可能にするウィンドウスキンを必要なだけ追加してください。一番上のものがデフォルトです。
 * @default ["Window"]
 * @type file[]
 * @dir img/system
 * 
 */

(() => {
    'use strict';


    const pluginName = "OptionEx";


    const WINDOW_WIDTH = Number(PluginManager.parameters(pluginName).windowWidth);
    const ITEM_HEIGHT = Number(PluginManager.parameters(pluginName).itemHeight);
    const FONT_SIZE = Number(PluginManager.parameters(pluginName).fontSize);
    const DEFAULT_COMMAND_OFFSET = Number(PluginManager.parameters(pluginName).defaultCommandOffset);
    const TITLE_COLOR = Number(PluginManager.parameters(pluginName).titleColor);

    const USE_ALWAYS_DASH = PluginManager.parameters(pluginName).useAlwaysDash === "true";
    const USE_COMMAND_REMEMBER = PluginManager.parameters(pluginName).useCommandRemember === "true";
    const USE_TOUCH_UI = PluginManager.parameters(pluginName).useTouchUI === "true";
    const USE_BGM_VOLUME = PluginManager.parameters(pluginName).useBgmVolume === "true";
    const USE_BGS_VOLUME = PluginManager.parameters(pluginName).useBgsVolume === "true";
    const USE_ME_VOLUME = PluginManager.parameters(pluginName).useMeVolume === "true";
    const USE_SE_VOLUME = PluginManager.parameters(pluginName).useSeVolume === "true";
    
    const USE_SWITCH_AB_BUTTONS = PluginManager.parameters(pluginName).useSwitchABButtons === "true";
    const USE_FAST_MESSAGE = PluginManager.parameters(pluginName).useFastMessage === "true";
    const USE_DASH_SPEED = PluginManager.parameters(pluginName).useDashSpeed === "true";
    const USE_WINDOWSKIN = PluginManager.parameters(pluginName).useWindowskin === "true";
    const USE_WINDOW_TONE = PluginManager.parameters(pluginName).useWindowTone === "true";
    const USE_WINDOW_OPACITY = PluginManager.parameters(pluginName).useWindowOpacity === "true";

    const SWITCH_AB_BUTTONS_NAME = PluginManager.parameters(pluginName).switchABButtonsName;
    const FAST_MESSAGE_NAME = PluginManager.parameters(pluginName).fastMessageName;
    const DASH_SPEED_NAME = PluginManager.parameters(pluginName).dashSpeedName;
    const WINDOWSKIN_NAME = PluginManager.parameters(pluginName).windowskinName;
    const WINDOW_TONE_RED_NAME = PluginManager.parameters(pluginName).windowToneRedName;
    const WINDOW_TONE_GREEN_NAME = PluginManager.parameters(pluginName).windowToneGreenName;
    const WINDOW_TONE_BLUE_NAME = PluginManager.parameters(pluginName).windowToneBlueName;
    const WINDOW_OPACITY_NAME = PluginManager.parameters(pluginName).windowOpacityName;
    const DEFAULT_COMMAND_NAME = PluginManager.parameters(pluginName).defaultCommandName;

    const DEFAULT_VOLUME = Number(PluginManager.parameters(pluginName).defaultVolume);
    const DEFAULT_SWITCH_AB_BUTTONS = PluginManager.parameters(pluginName).defaultSwitchABButtons === "true";
    const DEFAULT_FAST_MESSAGE = PluginManager.parameters(pluginName).defaultFastMessage === "true";
    const DEFAULT_DASH_SPEED = Number(PluginManager.parameters(pluginName).defaultDashSpeed);
    const DEFAULT_WINDOW_OPACITY = Number(PluginManager.parameters(pluginName).defaultWindowOpacity);

    const WINDOWSKINS = JSON.parse(PluginManager.parameters(pluginName).windowskins);


    ConfigManager.switchABButtons = false;
    ConfigManager.fastMessage = false;
    ConfigManager.dashSpeed = 0;
    ConfigManager.windowskin = 0;
    ConfigManager.windowToneRed = 0;
    ConfigManager.windowToneGreen = 0;
    ConfigManager.windowToneBlue = 0;
    ConfigManager.windowOpacity = 195;

    const _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        const config = _ConfigManager_makeData.call(this);
        config.switchABButtons = this.switchABButtons;
        config.fastMessage = this.fastMessage;
        config.dashSpeed = this.dashSpeed;
        config.windowskin = this.windowskin;
        config.windowToneRed = this.windowToneRed;
        config.windowToneGreen = this.windowToneGreen;
        config.windowToneBlue = this.windowToneBlue;
        config.windowOpacity = this.windowOpacity;
        return config;
    };

    const _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData.call(this, config);
        const tone = $dataSystem.windowTone;
        this.switchABButtons = this.readFlag(config, "switchABButtons", DEFAULT_SWITCH_AB_BUTTONS);
        this.fastMessage = this.readFlag(config, "fastMessage", DEFAULT_FAST_MESSAGE);
        this.dashSpeed = this.readNumber(config, "dashSpeed", 2, DEFAULT_DASH_SPEED);
        this.windowskin = this.readNumber(config, "windowskin", WINDOWSKINS.length-1, 0);
        this.windowToneRed = this.readTone(config, "windowToneRed", tone[0]);
        this.windowToneGreen = this.readTone(config, "windowToneGreen", tone[1]);
        this.windowToneBlue = this.readTone(config, "windowToneBlue", tone[2]);
        this.windowOpacity = this.readNumber(config, "windowOpacity", 255, DEFAULT_WINDOW_OPACITY);
    };

    ConfigManager.readNumber = function(config, name, maxValue, defaultValue) {
        if (name in config) {
            return Number(config[name]).clamp(0, maxValue);
        } else {
            return defaultValue;
        }
    };

    ConfigManager.readTone = function(config, name, defaultValue) {
        if (name in config) {
            return Number(config[name]).clamp(-255, 255);
        } else {
            return defaultValue;
        }
    };

    ConfigManager.readVolume = function(config, name) {
        if (name in config) {
            return Number(config[name]).clamp(0, 100);
        } else {
            return DEFAULT_VOLUME;
        }
    };

    ConfigManager.windowTone = function() {
        return [this.windowToneRed, this.windowToneGreen, this.windowToneBlue, 0];
    };


    Object.defineProperty(Input, "gamepadMapper", {
        get: function() {
            return (USE_SWITCH_AB_BUTTONS && ConfigManager.switchABButtons) ? this.switchedGamepadMapper : this.defaultGamepadMapper;
        },
        set: function(value) {
            this.defaultGamepadMapper = value;
        },
    });

    Input.defaultGamepadMapper = {
        0: "ok", // A
        1: "cancel", // B
        2: "shift", // X
        3: "menu", // Y
        4: "pageup", // LB
        5: "pagedown", // RB
        12: "up", // D-pad up
        13: "down", // D-pad down
        14: "left", // D-pad left
        15: "right" // D-pad right
    };

    Input.switchedGamepadMapper = {
        0: "cancel", // A
        1: "ok", // B
        2: "shift", // X
        3: "menu", // Y
        4: "pageup", // LB
        5: "pagedown", // RB
        12: "up", // D-pad up
        13: "down", // D-pad down
        14: "left", // D-pad left
        15: "right" // D-pad right
    };


    const _Game_System_prototype_windowTone = Game_System.prototype.windowTone;
    Game_System.prototype.windowTone = function() {
        if (USE_WINDOW_TONE) {
            if (!this._windowTone) {
                const tone = $dataSystem.windowTone;
                const red = ConfigManager.windowToneRed ?? tone[0];
                const green = ConfigManager.windowToneGreen ?? tone[1];
                const blue = ConfigManager.windowToneBlue ?? tone[2];
                this._windowTone = [red, green, blue, tone[3]];
            }
            return this._windowTone;
        } else {
            return _Game_System_prototype_windowTone.call(this);
        }
    };


    const _Game_Player_prototype_realMoveSpeed = Game_Player.prototype.realMoveSpeed;
    Game_Player.prototype.realMoveSpeed = function() {
        if (USE_DASH_SPEED) {
            if (this.isDashing()) {
                const speed = ConfigManager.dashSpeed;
                return this._moveSpeed + (speed ? speed + 1 : 1);
            } else {
                return this._moveSpeed;
            }
        } else {
            return _Game_Player_prototype_realMoveSpeed.call(this);
        }
    };


    Scene_Options.prototype.optionsWindowRect = function() {
        const n = Math.min(this.maxCommands(), this.maxVisibleCommands());
        const ww = WINDOW_WIDTH;
        const wh = this.calcWindowHeight(n) + DEFAULT_COMMAND_OFFSET;
        const wx = (Graphics.boxWidth - ww) / 2;
        const wy = (Graphics.boxHeight - wh) / 2;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Options.prototype.calcWindowHeight = function(numLines) {
        return Window_Options.prototype.fittingHeight(numLines);
    };

    Scene_Options.prototype.maxCommands = function() {
        let result = 1;
        if (USE_ALWAYS_DASH) result++;
        if (USE_COMMAND_REMEMBER) result++;
        if (USE_TOUCH_UI) result++;
        if (USE_BGM_VOLUME) result++;
        if (USE_BGS_VOLUME) result++;
        if (USE_ME_VOLUME) result++;
        if (USE_SE_VOLUME) result++;
        if (USE_SWITCH_AB_BUTTONS) result++;
        if (USE_FAST_MESSAGE) result++;
        if (USE_DASH_SPEED) result++;
        if (USE_WINDOWSKIN) result++;
        if (USE_WINDOW_TONE) result += 3;
        if (USE_WINDOW_OPACITY) result++;
        return result;
    };

    Scene_Options.prototype.maxVisibleCommands = function() {
        return 16;
    };

    Scene_Options.prototype.needsPageButtons = function() {
        return true;
    };

    Scene_Options.prototype.createPageButtons = function() {
        this._pageupButton = new Sprite_Button("pageup");
        this._pageupButton.x = 4;
        this._pageupButton.y = this.buttonY();
        const pageupRight = this._pageupButton.x + this._pageupButton.width;
        this._pagedownButton = new Sprite_Button("pagedown");
        this._pagedownButton.x = pageupRight + 4;
        this._pagedownButton.y = this.buttonY();
        this.addWindow(this._pageupButton);
        this.addWindow(this._pagedownButton);
        this._pageupButton.setClickHandler(this.cursorPageup.bind(this));
        this._pagedownButton.setClickHandler(this.cursorPagedown.bind(this));
    };

    Scene_Options.prototype.cursorPageup = function() {
        this._optionsWindow.cursorPageup();
    };

    Scene_Options.prototype.cursorPagedown = function() {
        this._optionsWindow.cursorPagedown();
    };


    const _Window_Base_prototype_loadWindowskin = Window_Base.prototype.loadWindowskin;
    Window_Base.prototype.loadWindowskin = function() {
        if (USE_WINDOWSKIN) {
            const index = ConfigManager.windowskin ?? 0;
            this.windowskin = ImageManager.loadSystem(WINDOWSKINS[index]);
        } else {
            _Window_Base_prototype_loadWindowskin.call(this);
        }
    };

    const _Window_Base_prototype_updateBackOpacity = Window_Base.prototype.updateBackOpacity;
    Window_Base.prototype.updateBackOpacity = function() {
        if (USE_WINDOW_OPACITY) {
            this.backOpacity = ConfigManager.windowOpacity ?? DEFAULT_WINDOW_OPACITY;
        } else {
            _Window_Base_prototype_updateBackOpacity.call(this);
        }
    };


    const _Window_Message_prototype_shouldBreakHere = Window_Message.prototype.shouldBreakHere;
    Window_Message.prototype.shouldBreakHere = function(textState) {
        if (USE_FAST_MESSAGE) {
            if (this.canBreakHere(textState)) {
                if (!(this._showFast || this._lineShowFast || ConfigManager.fastMessage)) {
                    return true;
                }
                if (this.pause || this._waitCount > 0) {
                    return true;
                }
            }
            return false;
        } else {
            return _Window_Message_prototype_shouldBreakHere.call(this, textState);
        }
    };


    const _Window_Options_prototype_initialize = Window_Options.prototype.initialize;
    Window_Options.prototype.initialize = function(rect) {
        _Window_Options_prototype_initialize.call(this, rect);
        this._touchX = 0;
        this._canRepeat = false;
    };

    Window_Options.prototype.itemWidth = function() {
        return this.contentsWidth() / 2;
    };

    Window_Options.prototype.lineHeight = function() {
        return ITEM_HEIGHT;
    };

    Window_Options.prototype.gaugeValueWidth = function() {
        return this.textWidth("100%");
    };

    const _Window_Options_prototype_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions = function() {
        if (USE_ALWAYS_DASH) this.addCommand(TextManager.alwaysDash, "alwaysDash");
        if (USE_COMMAND_REMEMBER) this.addCommand(TextManager.commandRemember, "commandRemember");
        if (USE_TOUCH_UI) this.addCommand(TextManager.touchUI, "touchUI");
        if (USE_SWITCH_AB_BUTTONS) this.addCommand(SWITCH_AB_BUTTONS_NAME, "switchABButtons");
        if (USE_FAST_MESSAGE) this.addCommand(FAST_MESSAGE_NAME, "fastMessage");
        if (USE_DASH_SPEED) this.addCommand(DASH_SPEED_NAME, "dashSpeed");
        if (USE_WINDOWSKIN) this.addCommand(WINDOWSKIN_NAME, "windowskin");
        if (USE_WINDOW_TONE) {
            this.addCommand(WINDOW_TONE_RED_NAME, "windowToneRed");
            this.addCommand(WINDOW_TONE_GREEN_NAME, "windowToneGreen");
            this.addCommand(WINDOW_TONE_BLUE_NAME, "windowToneBlue");
        }
        if (USE_WINDOW_OPACITY) this.addCommand(WINDOW_OPACITY_NAME, "windowOpacity");
    };

    Window_Options.prototype.addVolumeOptions = function() {
        if (USE_BGM_VOLUME) this.addCommand(TextManager.bgmVolume, "bgmVolume");
        if (USE_BGS_VOLUME) this.addCommand(TextManager.bgsVolume, "bgsVolume");
        if (USE_ME_VOLUME) this.addCommand(TextManager.meVolume, "meVolume");
        if (USE_SE_VOLUME) this.addCommand(TextManager.seVolume, "seVolume");
    };

    const _Window_Options_prototype_makeCommandList = Window_Options.prototype.makeCommandList;
    Window_Options.prototype.makeCommandList = function() {
        _Window_Options_prototype_makeCommandList.call(this);
        this.addExtraOptions();
    };

    Window_Options.prototype.addExtraOptions = function() {
        this.addCommand(DEFAULT_COMMAND_NAME, "defaultCommand");
    };

    Window_Options.prototype.drawGauge = function(x, y, width, rate, color1, color2) {
        const fillW = Math.floor(width * rate);
        this.contents.fillRect(x, y, width, 8, ColorManager.gaugeBackColor());
        this.contents.gradientFillRect(x, y, fillW, 8, color1, color2);
    };

    Window_Options.prototype.statusText = function(index) {
        const symbol = this.commandSymbol(index);
        const value = this.getConfigValue(symbol);
        if (this.isVolumeSymbol(symbol)) {
            return this.volumeStatusText(value);
        } else {
            switch (symbol) {
                case "dashSpeed":
                case "windowskin":
                    return this.numericStatusText(value, true);
                case "windowToneRed":
                case "windowToneGreen":
                case "windowToneBlue":
                case "windowOpacity":
                    return this.numericStatusText(value, false);
                default:
                    return this.booleanStatusText(value);        
            }
        }
    };

    Window_Options.prototype.gaugeColor1 = function(symbol) {
        if (this.isVolumeSymbol(symbol)) {
            return ColorManager.powerDownColor();
        } else {
            switch (symbol) {
                case "windowToneRed":
                    return "#640000";
                case "windowToneGreen":
                    return "#006400";
                case "windowToneBlue":
                    return "#000064";
                default:
                    return "#646464";
            }
        }
    };

    Window_Options.prototype.gaugeColor2 = function(symbol) {
        if (this.isVolumeSymbol(symbol)) {
            return ColorManager.powerUpColor();
        } else {
            switch (symbol) {
                case "windowToneRed":
                    return "#ff6464";
                case "windowToneGreen":
                    return "#64ff64";
                case "windowToneBlue":
                    return "#6464ff";
                default:
                    return "#ffffff";
            }
        }
    };

    Window_Options.prototype.numericStatusText = function(value, countFromOne) {
        const result = countFromOne ? value + 1 : value;
        return String(result);
    };

    Window_Options.prototype.isGaugeSymbol = function(symbol) {
        return this.isVolumeSymbol(symbol) || (symbol.includes("window") && symbol !== "windowskin");
    };

    Window_Options.prototype.isToneSymbol = function(symbol) {
        return symbol.includes("windowTone");
    };

    Window_Options.prototype.isBooleanSymbol = function(symbol) {
        return ["alwaysDash", "commandRemember", "touchUI", "switchABButtons", "fastMessage"].includes(symbol);
    };

    Window_Options.prototype.isDefaultSymbol = function(symbol) {
        return symbol === "defaultCommand";
    };

    const _Window_Options_prototype_select = Window_Options.prototype.select;
    Window_Options.prototype.select = function(index) {
        _Window_Options_prototype_select.call(this, index);
        this._touchX = TouchInput.x;
    };

    const _Window_Options_prototype_itemRect = Window_Options.prototype.itemRect;
    Window_Options.prototype.itemRect = function(index, forStatus=true) {
        const rect = _Window_Options_prototype_itemRect.call(this, index);
        if (this.isDefaultSymbol(this.commandSymbol(index))) {
            rect.y += DEFAULT_COMMAND_OFFSET;
            rect.width *= 2;
        } else {
            if (forStatus) rect.x += rect.width;
        }
        return rect;
    };

    Window_Options.prototype.itemRectWithPadding = function(index, forStatus=true) {
        const rect = this.itemRect(index, forStatus);
        const padding = this.itemPadding();
        rect.x += padding;
        rect.width -= padding * 2;
        return rect;
    };
    
    Window_Options.prototype.itemLineRect = function(index, forStatus=true) {
        const rect = this.itemRectWithPadding(index, forStatus);
        const padding = (rect.height - this.lineHeight()) / 2;
        rect.y += padding;
        rect.height -= padding * 2;
        return rect;
    };

    Window_Options.prototype.drawItem = function(index) {
        const symbol = this.commandSymbol(index);
        const title = this.commandName(index);
        const tRect = this.itemLineRect(index, false);
        this.contents.fontSize = FONT_SIZE;
        if (this.isDefaultSymbol(symbol)) {
            this.drawText(title, tRect.x, tRect.y, tRect.width, "center");
        } else {
            const status = this.statusText(index);
            const sRect = this.itemLineRect(index, true);
            this.changeTextColor(ColorManager.textColor(TITLE_COLOR));
            this.changePaintOpacity(this.isCommandEnabled(index));
            this.drawText(title, tRect.x, tRect.y, tRect.width, "left");
            this.resetTextColor();
            if (this.isGaugeSymbol(symbol)) {
                const value = this.getConfigValue(symbol);
                let rate;
                if (this.isVolumeSymbol(symbol)) {
                    rate = value / 100;
                } else if (this.isToneSymbol(symbol)) {
                    rate = (value + 255) / 510;
                } else {
                    rate = value / 255;
                }
                const gaugeValueWidth = this.gaugeValueWidth();
                const gaugeWidth = sRect.width - gaugeValueWidth;
                const gaugeY = sRect.y + sRect.height / 2 - 4;
                const c1 = this.gaugeColor1(symbol);
                const c2 = this.gaugeColor2(symbol);
                this.drawText(status, sRect.x, sRect.y, gaugeValueWidth, "right");
                this.drawGauge(sRect.x + gaugeValueWidth + 4, gaugeY, gaugeWidth, rate, c1, c2);
            } else {
                this.drawText(status, sRect.x, sRect.y, sRect.width, "center");
            }
        }
    };

    const _Window_Options_prototype_clearItem = Window_Options.prototype.clearItem;
    Window_Options.prototype.clearItem = function(index) {
        _Window_Options_prototype_clearItem.call(this, index);
        const rect = this.itemRect(index, false);
        this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
        this.contentsBack.clearRect(rect.x, rect.y, rect.width, rect.height);
    };

    Window_Options.prototype.changeValue = function(symbol, value) {
        const lastValue = this.getConfigValue(symbol);
        if (lastValue !== value) {
            this.setConfigValue(symbol, value);
            switch (symbol) {
                case "windowskin":
                    this.loadWindowskin();
                    break;
                case "windowToneRed":
                case "windowToneGreen":
                case "windowToneBlue":
                    $gameSystem.setWindowTone(ConfigManager.windowTone());
                    this.updateTone();
                    break;
                case "windowOpacity":
                    this.updateBackOpacity();
                    break;
            }
            this.redrawItem(this.findSymbol(symbol));
            this.playCursorSound();
        }
    };

    Window_Options.prototype.changeNumberBySymbol = function(symbol, forward, skip, wrap, offsetValue=null) {
        let offset, max, min;
        switch (symbol) {
            case "dashSpeed":
                offset = offsetValue ?? (skip ? 2 : 1);
                max = 2;
                min = 0;
                break;
            case "windowskin":
                offset = offsetValue ?? (skip ? 5 : 1);
                max = WINDOWSKINS.length - 1;
                min = 0;
                break;
            case "windowToneRed":
            case "windowToneGreen":
            case "windowToneBlue":
                offset = offsetValue ?? (skip ? 50 : 5);
                max = 255;
                min = -255;
                break;
            case "windowOpacity":
                offset = offsetValue ?? (skip ? 50 : 5);
                max = 255;
                min = 0;
                break;
            default:
                offset = offsetValue ?? (skip ? this.volumeOffset() : 5);
                max = 100;
                min = 0;
        }
        if (!offsetValue && !forward) offset *= -1;
        this.changeNumber(symbol, offset, max, min, wrap);
    };

    Window_Options.prototype.changeNumber = function(symbol, offset, max, min, wrap) {
        const lastValue = this.getConfigValue(symbol);
        const value = lastValue + offset;
        if (value > max && wrap) {
            this.changeValue(symbol, min);
        } else if (value < min && wrap) {
            this.changeValue(symbol, max);
        } else {
            this.changeValue(symbol, value.clamp(min, max));
        }
    };

    const _Window_Options_prototype_processCursorMove = Window_Options.prototype.processCursorMove;
    Window_Options.prototype.processCursorMove = function() {
        _Window_Options_prototype_processCursorMove.call(this);
        if (TouchInput.isPressed() && TouchInput.isMoved()) this.touchMove();
    };

    Window_Options.prototype.processOk = function() {
        const index = this.index();
        const symbol = this.commandSymbol(index);
        if (this.isDefaultSymbol(symbol)) {
            SoundManager.playOk();
            this.restoreDefaultValues();
            $gameSystem.setWindowTone(ConfigManager.windowTone());
            this.loadWindowskin();
            this.updateTone();
            this.updateBackOpacity();
            this.refresh();
        } else if (this.isBooleanSymbol(symbol)) {
            this.changeValue(symbol, !this.getConfigValue(symbol));
        } else {
            this.changeNumberBySymbol(symbol, true, false, true);
        }
    };
    
    Window_Options.prototype.cursorRight = function(wrap) {
        const index = this.index();
        const symbol = this.commandSymbol(index);
        if (!this.isDefaultSymbol(symbol)) {
            if (this.isBooleanSymbol(symbol)) {
                this.changeValue(symbol, true);
            } else {
                this.changeNumberBySymbol(symbol, true, false, wrap);
            }
        }
    };
    
    Window_Options.prototype.cursorLeft = function(wrap) {
        const index = this.index();
        const symbol = this.commandSymbol(index);
        if (!this.isDefaultSymbol(symbol)) {
            if (this.isBooleanSymbol(symbol)) {
                this.changeValue(symbol, false);
            } else {
                this.changeNumberBySymbol(symbol, false, false, wrap);
            }
        }
    };

    Window_Options.prototype.cursorPagedown = function() {
        const index = this.index();
        const symbol = this.commandSymbol(index);
        if (!this.isDefaultSymbol(symbol)) {
            if (this.isBooleanSymbol(symbol)) {
                this.changeValue(symbol, true);
            } else {
                this.changeNumberBySymbol(symbol, true, true, false);
            }
        }
    };
    
    Window_Options.prototype.cursorPageup = function() {
        const index = this.index();
        const symbol = this.commandSymbol(index);
        if (!this.isDefaultSymbol(symbol)) {
            if (this.isBooleanSymbol(symbol)) {
                this.changeValue(symbol, false);
            } else {
                this.changeNumberBySymbol(symbol, false, true, false);
            }
        }
    };

    Window_Options.prototype.touchMove = function() {
        const index = this.index();
        const symbol = this.commandSymbol(index);
        if (this.isGaugeSymbol(symbol)) {
            const touchX = TouchInput.x;
            if (this._touchX !== touchX) {
                const lastX = this._touchX;
                const diff = touchX - lastX;
                this._touchX = touchX;
                this.changeNumberBySymbol(symbol, false, false, false, diff - diff % 5);
            }
        }
    };

    Window_Options.prototype.restoreDefaultValues = function() {
        const tone = $dataSystem.windowTone;
        ConfigManager["alwaysDash"] = false;
        ConfigManager["commandRemember"] = false;
        ConfigManager["touchUI"] = true;
        ConfigManager["switchABButtons"] = DEFAULT_SWITCH_AB_BUTTONS;
        ConfigManager["fastMessage"] = DEFAULT_FAST_MESSAGE;
        ConfigManager["dashSpeed"] = DEFAULT_DASH_SPEED;
        ConfigManager["windowskin"] = 0;
        ConfigManager["windowToneRed"] = tone[0];
        ConfigManager["windowToneGreen"] = tone[1];
        ConfigManager["windowToneBlue"] = tone[2];
        ConfigManager["windowOpacity"] = DEFAULT_WINDOW_OPACITY;
        ConfigManager["bgmVolume"] = DEFAULT_VOLUME;
        ConfigManager["bgsVolume"] = DEFAULT_VOLUME;
        ConfigManager["meVolume"] = DEFAULT_VOLUME;
        ConfigManager["seVolume"] = DEFAULT_VOLUME;
    };

})();
