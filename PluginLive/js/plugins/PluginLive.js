//=============================================================================
// RPG Maker MZ - PluginLive
//=============================================================================

/*:
 * @target MZ
 * @plugindesc It's a plugin template.
 * @author nz_prism
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/PluginLive/js/plugins/PluginLive.js
 *
 * @help PluginLive.js
 * ver. 1.0.0
 * 
 * [History]
 * 06/11/2022 1.0.0 Released
 * 
 * This is a plugin template.
 *
 * 
 * This plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 *
 * @param paramTemplate
 * @text Parameter Template
 * @desc It's a template for a plugin parameter.
 * @default 0
 * @type number
 * 
 * 
 * @command commandTemplate
 * @text Command Template
 * @desc It's a template for a plugin command.
 * 
 * @arg commandArg
 * @text Command Argument
 * @desc It's an argument for the plugin command.
 * @default 0
 * @type select
 * @option Value Template1
 * @value 0
 * @option Value Template2
 * @value 1
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc プラグインのテンプレートです。
 * @author nz_prism
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/PluginLive/js/plugins/PluginLive.js
 *
 * @help PluginLive.js
 * ver. 1.0.0
 * 
 * [バージョン履歴]
 * 2022/06/11 1.0.0 リリース
 * 
 * これはプラグインのテンプレートです。
 * 
 * 
 * このプラグインはMITライセンスにてリリースされています。
 * https://opensource.org/licenses/mit-license.php
 *
 * 
 * @param paramTemplate
 * @text パラメータテンプレート
 * @desc プラグインパラメータのテンプレートです。
 * @default 0
 * @type number
 * 
 * 
 * @command commandTemplate
 * @text コマンドテンプレート
 * @desc プラグインコマンドのテンプレートです。
 * 
 * @arg commandArg
 * @text コマンドテンプレート引数
 * @desc コマンドテンプレートの引数です。
 * @default 0
 * @type select
 * @option 値テンプレート1
 * @value 0
 * @option 値テンプレート2
 * @value 1
 * 
 */

(() => {
    'use strict';
    const PLUGIN_NAME = "PluginLive";
    const pluginParams = PluginManager.parameters(PLUGIN_NAME);

    const PARAM_TEMPLATE = Number(pluginParams.paramTemplate);


    PluginManager.registerCommand(PLUGIN_NAME, "commandTemplate", args => {
        Number(args.commandArg);
    });



})();
