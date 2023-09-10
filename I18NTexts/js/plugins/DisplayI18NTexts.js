//=============================================================================
// RPG Maker MZ - DisplayI18NTexts
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Displays each text replacing a string referred from a JSON file based on the language option.
 * @author nz_prism
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/I18NTexts/js/plugins/DisplayI18NTexts.js
 * @base OptionEx
 * @orderAfter OptionEx
 *
 * @help DisplayI18NTexts.js
 * ver. 1.0.1
 * 
 * [History]
 * 06/04/2023 1.0.0 Released
 * 06/04/2023 1.0.1 Fixed locales (ja-JP=>ja_JP, en-US=>en_US, ru-RU=>ru_RU)
 * 
 * 
 * Displays each text replacing a string referred from a JSON file based on the
 * language option. It requires "OptionEx" plugin. Place this plugin under
 * OptionEx.
 * 
 * It provides 2 functionalities;
 * 1. Adds a language option.
 * 2. Displays each text replacing a string referred from a JSON file based on
 *    the Language option.
 * 
 * Funcionality 1 adds "Language" option on the config screen. For Language
 * option, players can choose a language from ones specified for the plugin
 * parameter "Supported Languages". The top language of the parameter will be the
 * default one. If single one is specified, the option will not appear on the
 * config screen.
 * 
 * Functionality 2 replaces escape characers "\I18N[n]" with corresponding
 * strings referred from a JSON file "I18NTexts.json". All the texts in the
 * game, such as names and profiles of actors, names and descriptions of items
 * or messages within events, will be replaced if they includes "\I18N[n]". For
 * I18NTexts.json, it refers a string whose "id" property meets "n" of the
 * \I18N[n]. The JSON file is generated by another plugin
 * "ConvertI18NTexts.js". See the description of the plugin for the detail.
 * Note if I18NTexts.json doesn't exist in "data" folder, it will fail.
 * 
 * 
 * This plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 *
 * 
 * @param supportedLanguages
 * @text Supported Languages
 * @desc Choose supported languages. If single one is chosen, the option will not appear. The top one will be the default.
 * @default ["en_US","ja_JP"]
 * @type select[]
 * @option English
 * @value en_US
 * @option Japanese
 * @value ja_JP
 * @option Simplified Chinese
 * @value zh_CN
 * @option Traditional Chinese
 * @value zh_TW
 * @option Korean
 * @value ko_KR
 * @option French
 * @value fr_FR
 * @option Italian
 * @value it_IT
 * @option German
 * @value de_DE
 * @option Spanish
 * @value es_ES
 * @option Portuguese
 * @value pt_BR
 * @option Russian
 * @value ru_RU
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc オプションで設定されている言語に応じて、専用制御文字を専用のJSONファイルから参照した文字列に変換して表示します。
 * @author nz_prism
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/I18NTexts/js/plugins/DisplayI18NTexts.js
 * @base OptionEx
 * @orderAfter OptionEx
 *
 * @help DisplayI18NTexts.js
 * ver. 1.0.1
 * 
 * [バージョン履歴]
 * 2023/06/04 1.0.0 リリース
 * 2023/06/04 1.0.1 ロケール名を修正 (ja-JP=>ja_JP, en-US=>en_US, ru-RU=>ru_RU)
 * 
 * オプションで設定されている言語に応じて、専用制御文字を変換して表示します。
 * 「OptionEx」プラグインの導入が前提となります。OptionExよりも後に配置してく
 * ださい。
 * 
 * 以下の二つの機能が用意されています。
 * 1. 言語オプションを追加
 * 2. 専用制御文字を、現在の言語に応じてJSONファイルから取得した文字列に置き換
 *    えて表示
 * 
 * 1はオプション画面に「言語」オプションを追加する機能です。言語オプションで
 * は、プラグインパラメータ「使用言語」に設定した言語から選択できます。このパ
 * ラメータの一番上に設定した言語がデフォルト言語になります。このパラメータに
 * 設定されている言語が一つしかない場合、言語オプションは表示されなくなります。
 * 
 * 2は専用制御文字「\I18N[n]」を「I18NTexts.json」から取得した文字列に置き換え
 * て表示する機能です。アクターの名前やプロフィール、アイテムの名前や説明といっ
 * たデータベースのテキストやイベント中の文章など、ゲーム中に使用される文字列
 * 中に「\I18N[n]」が含まれていれば、それを変換して表示します。専用のJSONファ
 * イル「I18NTexts.json」中の「id」が制御文字中の「n」と一致するデータを参照し
 * ます。このJSONファイルは別プラグイン「ConvertI18NTexts.js」によって生成され
 * ます。詳細はConvertI18NTexts.jsの説明をご覧ください。
 * なおI18NTexts.jsonが「data」フォルダに存在しない場合、本プラグインはエラーに
 * なりますのでご注意ください。
 * 
 * 
 * このプラグインはMITライセンスにてリリースされています。
 * https://opensource.org/licenses/mit-license.php
 *
 * 
 * @param supportedLanguages
 * @text 使用言語
 * @desc 使用言語を設定してください。1つ以下の場合このオプションは表示されなくなります。一番上がデフォルト言語になります。
 * @default ["ja_JP","en_US"]
 * @type select[]
 * @option 日本語
 * @value ja_JP
 * @option 英語
 * @value en_US
 * @option 中国語（簡体字）
 * @value zh_CN
 * @option 中国語（繁体字）
 * @value zh_TW
 * @option 韓国語
 * @value ko_KR
 * @option フランス語
 * @value fr_FR
 * @option イタリア語
 * @value it_IT
 * @option ドイツ語
 * @value de_DE
 * @option スペイン語
 * @value es_ES
 * @option ポルトガル語
 * @value pt_BR
 * @option ロシア語
 * @value ru_RU
 * 
 */

$dataI18nTexts = null;

(() => {
    'use strict';
    const PLUGIN_NAME = "DisplayI18NTexts";
    const pluginParams = PluginManager.parameters(PLUGIN_NAME);

    const SUPPORTED_LANGUAGES = JSON.parse(pluginParams.supportedLanguages);

    const I18N_REGEXP = /\\I18N\[(\d+)\]/gi;
    
    const LANGUAGE_NAMES = {
        "ja_JP":"日本語",
        "en_US":"English",
        "zh_CN":"简体中文",
        "zh_TW":"繁体中文",
        "ko_KR":"한국어",
        "fr_FR":"Français",
        "it_IT":"Italiano",
        "de_DE":"Deutsch",
        "es_ES":"Español",
        "pt_BR":"Português",
        "ru_RU":"Русский"
    };

    
    DataManager._databaseFiles.push({ name: "$dataI18nTexts", src: "I18NTexts.json" });


    ConfigManager.languageIndex = 0;

    const _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        const config = _ConfigManager_makeData.call(this);
        config.languageIndex = this.languageIndex;
        return config;
    };
    
    const _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData.call(this, config);
        this.languageIndex = config["languageIndex"] || 0;
    };

    ConfigManager.language = function() {
        return SUPPORTED_LANGUAGES[this.languageIndex];
    };

    ConfigManager.useLanguageOption = function() {
        return SUPPORTED_LANGUAGES.length > 1;
    };


    TextManager.translate = function(text) {
        if (typeof(text) === "string") {
            return text.replace(I18N_REGEXP, function(_, p1){
                const obj = $dataI18nTexts[parseInt(p1)];
                return obj ? obj[ConfigManager.language()] : "";
            });
        } else {
            return text;
        }
    };


    const _String_prototype_format = String.prototype.format;
    String.prototype.format = function() {
        const text = TextManager.translate(this);
        return _String_prototype_format.apply(text, arguments);
    };


    const _Bitmap_prototype_drawText = Bitmap.prototype.drawText;
    Bitmap.prototype.drawText = function(text, x, y, maxWidth, lineHeight, align) {
        _Bitmap_prototype_drawText.call(this, TextManager.translate(text), x, y, maxWidth, lineHeight, align);
    };

    const _Bitmap_prototype_measureTextWidth = Bitmap.prototype.measureTextWidth;
    Bitmap.prototype.measureTextWidth = function(text) {
        return _Bitmap_prototype_measureTextWidth.call(this, TextManager.translate(text));
    };


    const _Scene_Options_prototype_maxCommands = Scene_Options.prototype.maxCommands;
    Scene_Options.prototype.maxCommands = function() {
        return _Scene_Options_prototype_maxCommands.call(this) + (ConfigManager.useLanguageOption() ? 1 : 0);
    };


    const _Window_Base_prototype_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
    Window_Base.prototype.convertEscapeCharacters = function(text) {
        text = TextManager.translate(text);
        text = _Window_Base_prototype_convertEscapeCharacters.call(this, text);
        return TextManager.translate(text);
    };


    const _Window_Options_prototype_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions = function() {
        if (ConfigManager.useLanguageOption()) this.addCommand("\\I18N[0]", "languageIndex");
        _Window_Options_prototype_addGeneralOptions.call(this);
    };

    const _Window_Options_prototype_isNumericSymbol = Window_Options.prototype.isNumericSymbol;
    Window_Options.prototype.isNumericSymbol = function(symbol) {
        return symbol === "languageIndex" || _Window_Options_prototype_isNumericSymbol.call(this, symbol);
    };

    const _Window_Options_prototype_statusText = Window_Options.prototype.statusText;
    Window_Options.prototype.statusText = function(index) {
        const symbol = this.commandSymbol(index);
        if (symbol === "languageIndex") {
            const lang = SUPPORTED_LANGUAGES[this.getConfigValue(symbol)];
            return LANGUAGE_NAMES[lang];
        } else {
            return _Window_Options_prototype_statusText.call(this, index);
        }
    };
    
    const _Window_Options_prototype_changeNumberBySymbol = Window_Options.prototype.changeNumberBySymbol;
    Window_Options.prototype.changeNumberBySymbol = function(symbol, forward, skip, wrap, offsetValue=null) {
        if (symbol === "languageIndex") {
            const offset = offsetValue ?? (skip ? 2 : 1);
            if (!offsetValue && !forward) offset *= -1;
            this.changeNumber(symbol, offset, SUPPORTED_LANGUAGES.length - 1, 0, wrap);
        } else {
            _Window_Options_prototype_changeNumberBySymbol.apply(this, arguments);
        }
    };

    const _Window_Options_prototype_changeValue = Window_Options.prototype.changeValue;
    Window_Options.prototype.changeValue = function(symbol, value) {
        if (symbol === "languageIndex") {
            const lastValue = this.getConfigValue(symbol);
            if (lastValue !== value) {
                this.setConfigValue(symbol, value);
                this.refresh();
                this.playCursorSound();
            }
        } else {
            _Window_Options_prototype_changeValue.apply(this, arguments);
        }
    };

    const _Window_Options_prototype_restoreDefaultValues = Window_Options.prototype.restoreDefaultValues;
    Window_Options.prototype.restoreDefaultValues = function() {
        _Window_Options_prototype_restoreDefaultValues.call(this);
        ConfigManager["languageIndex"] = 0;
    };


    Window_NameEdit.prototype.setup = function(actor, maxLength) {
        this._actor = actor;
        this._maxLength = maxLength;
        this._name = TextManager.translate(actor.name()).slice(0, this._maxLength);
        this._index = this._name.length;
        this._defaultName = this._name;
        ImageManager.loadFace(actor.faceName());
    };
    
    Window_NameInput.prototype.table = function() {
        switch (ConfigManager.language()) {
            case "ja_JP":
                return [
                    Window_NameInput.JAPAN1,
                    Window_NameInput.JAPAN2,
                    Window_NameInput.JAPAN3
                ];
            case "ru_RU":
                return [Window_NameInput.RUSSIA];
            default:
                return [Window_NameInput.LATIN1, Window_NameInput.LATIN2];
        }
    };


})();