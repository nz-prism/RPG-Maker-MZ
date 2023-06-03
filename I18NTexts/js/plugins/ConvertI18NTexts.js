//=============================================================================
// RPG Maker MZ - ConvertI18NTexts
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Converts all the texts used in a game to escape characers and generates a JSON file with the original texts.
 * @author nz_prism
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/I18NTexts/js/plugins/ConvertI18NTexts.js
 *
 * @help ConvertI18NTexts.js
 * ver. 1.0.0
 * 
 * [History]
 * 06/04/2023 1.0.0 Released
 * 
 * Converts all the texts used in a game to escape characers and generates a
 * JSON file with the original texts. It makes changes to the database files
 * directly. Make sure to make a backup before run this plugin. Note the
 * author does not take any responsibilities for any damages caused by this
 * plugin.
 * 
 * When you run playtest with this plugin enabled, it will convert texts
 * automatically and then terminate the app when it finishes converting. If
 * MZ displays a dialog "Project data has been modified exernally.", click
 * "Yes" (if you clicked "No", restart MZ). Then, the new texts will appear
 * on MZ. Note you must keep this plugin disabled unless you intend to convert
 * texts. If you deployed a game with this plugin left enabled, it does not
 * matter since it works only in playtest.
 * After converting, all the target texts, such as database or event ones, are
 * replaced with the corresponding texts. Plus, for the first time, a JSON file
 * "I18NTexts.json" will be generated in "data" folder. For the second time or
 * later, the JSON file will be updated. It contains all the texts which had
 * been populated on the database. By using another plugin
 * "DisplayI18NTexts.js", texts referred from the JSON file based on the
 * language option will be displayed.
 * 
 * Make sure to set the plugin parameters below before running;
 * Source Language: Specify a language in which the database texts are written.
 *   It will be used to specify the language under which the original texts are
 *   populated in the JSON file.
 * Target Language: Specify the language whose texts will be replaced with
 *   after converting. Make sure to choose "Escape Character" for the first
 *   time. The texts on the database will be replaced with the corresponding
 *   ones in a language specified to this parameter. If Escape Characer is
 *   specified, the texts will be replaced with "\I18N[n]" (n is its ID). If
 *   another language is specified and I18NTexts.json contains the language,
 *   the texts will be replaced with the corresponding texts. Otherwise, the
 *   JSON file will be updated with the language keys.
 * Languages to be Supported: Specify all the languages to be supported
 *   including the one used on the database. For the first time, all the
 *   language keys will be set in I18NTexts.json. Values other than those of
 *   Source Language will be populated with temporary texts "temp[n]".
 * Convert Game Title: If you want to convert game title as well, set this
 *   parameter to true. However, since the title shown on the title bar
 *   remains as an escape character, you are recommended to leave it false.
 * Convert Unused Texts: If true, texts which are not shown in a game by MZ
 *   default, such as troop or animation names, excluding notes and comments,
 *   will be converted as well.
 * Convert Notes: If true, the notes on the database and the comments in event
 *   pages will be converted as well.
 * Plugin Parameters: By specifying plugin names and their parameter names,
 *   the texts populated for the parameters will be converted as well. Note
 *   it converts only simple texts (string). String lists (string[]) and
 *   strings within structures (struct) can't be converted. The text type
 *   plugin parameter names of OptionEx, required by DisplayI18NTexts.js, are
 *   populated by default.
 * 
 * Note once you ran this plugin, do not change the values of plugin parameters
 * below Target Texts afterwards. Plus, though it doesn't matter to add items
 * for the database or events, including event commands, do not delete items or
 * change the order. Otherwise, it doesn't work correctly due to ID changes.
 * If you want to delete items or change orders, delete I18NTexts.json in data
 * folder. It will be initialized by running this plugin.
 * 
 * You are recommended to follow the examples below (these represent 2-language
 * translation model: English and Japanese);
 *  1. Make a backup of the project folder.
 *  2. Specify "English" and "Japanese" for the plugin parameter "Languages to
 *     be Supported".
 *  3. Specify "English" for the plugin parameter "Source Language".
 *  4. Specify "Escape Character" for the plugin parameter "Target Language".
 *  5. Set the plugin parameters under "Target Texts" to values you wish.
 *  6. Enable ConvertI18NTexts.js.
 *  7. Run playtest.
 *  8. Confirm all the target texts have been converted to escape characters.
 *  9. Confirm I18NTexts.json has been generated in data folder.
 * 10. Open I18NTexts.json and confirm the texts which had been populated on
 *     the database are populated for the values for "en-US" keys and temporary
 *     texts "temp[n]" are populated for "ja-JP" keys.
 * 11. Disable ConvertI18NTexts.js.
 * 12. Specify "English" and "Japanese" for the plugin parameter "Supported
 *     Languages" of DisplayI18NTexts.js.
 * 13. Enable DisplayI18NTexts.js.
 * 14. In I18NTexts.json, populate some texts for "en-US" keys translated from
 *     those for "ja-JP" keys (the texts shown on the option screen are
 *     recommended).
 * 15. Run playtest and open the option screen.
 * 16. For "Language", switch English and Japanese and confirm the texts you
 *     populated in 14 are correctly translated.
 * 17. Repeat 14 - 16 until all the texts are translated.
 * 
 * Leave the temporary texts (temp[n]) as they are until you translate them.
 * If they are empty string, this plugin doesn't work correctly.
 * 
 * You can restore original texts from the escape characters by running this
 * plugin with "Escape Character" set for "Source Language" and the original
 * language for "Target Language". Confirm texts on the database or events
 * are correctly restored.
 * You can also update I18NTexts.json. For example, the databese language is
 * English. Even if you made some changes to the database texts, the texts
 * within I18NTexts.json are yet to be changed. By running this plugin with
 * "English" set for both "Source Language" and "Target Language",
 * I18NTexts.json will be updated.
 * 
 * The language keys for I18NTexts.json
 * English: en-US
 * Japanese: ja-JP
 * Simplified Chinese: zh_CN
 * Traditional Chinese: zh_TW
 * Korean: ko_KR
 * French: fr_FR
 * Italian: it_IT
 * German: de_DE
 * Spanish: es_ES
 * Portuguese: pt_BR
 * Russian: ru-RU
 * 
 * 
 * This plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 * 
 * @param sourceLanguage
 * @text Source Language
 * @desc Choose the source language, which is currently populated on the database.
 * @default ja-JP
 * @type select
 * @option Escape Character (\I18N[n])
 * @value escape
 * @option English
 * @value en-US
 * @option Japanese
 * @value ja-JP
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
 * @value ru-RU
 * 
 * @param targetLanguage
 * @text Target Language
 * @desc Choose the target language which will take place on the database after converting.
 * @default escape
 * @type select
 * @option Escape Character (\I18N[n])
 * @value escape
 * @option English
 * @value en-US
 * @option Japanese
 * @value ja-JP
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
 * @value ru-RU
 * 
 * @param languagesToBeSupported
 * @text Languages to be Supported
 * @desc Specify all the languages to be translated. The languages will be used for the keys in I18NTexts.json.
 * @default ["en-US","ja-JP"]
 * @type select[]
 * @option English
 * @value en-US
 * @option Japanese
 * @value ja-JP
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
 * @value ru-RU
 * 
 * @param targetText
 * @text Target Texts
 * @desc Settings whether specific texts are to be converted.
 * 
 * @param convertGameTitle
 * @text Convert Game Title
 * @desc If true, the game title will be converted. Leaving it false is recommended.
 * @parent targetText
 * @default false
 * @type boolean
 * 
 * @param convertUnusedTexts
 * @text Convert Unused Texts
 * @desc If true, texts unused in a game, such as troop or animation names, will be converted.
 * @parent targetText
 * @default false
 * @type boolean
 * 
 * @param convertNotes
 * @text Convert Notes
 * @desc If true, the "Note" on the database items and an event command "Comment" will be converted.
 * @parent targetText
 * @default false
 * @type boolean
 * 
 * @param pluginParameters
 * @text Plugin Parameters
 * @desc Specify plugin names and their parameter names, which will be converted.
 * @parent targetText
 * @default ["{\"pluginName\":\"OptionEx\",\"parameterNames\":\"[\\\"switchABButtonsName\\\",\\\"fastMessageName\\\",\\\"dashSpeedName\\\",\\\"windowskinName\\\",\\\"windowToneRedName\\\",\\\"windowToneGreenName\\\",\\\"windowToneBlueName\\\",\\\"windowOpacityName\\\",\\\"defaultCommandName\\\"]\"}"]
 * @type struct<pluginParameter>[]
 *
 */

/*~struct~pluginParameter:
 *
 * @param pluginName
 * @text Plugin Name
 * @desc Specify the plugin name which contains texts to be converted as parameter values.
 * @type string
 * 
 * @param parameterNames
 * @text Parameter Names
 * @desc Specify plugin parameter names whose value will be converted.
 * @type string[]
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc ゲーム中に使用されるあらゆる文字列を専用制御文字に変換し、元の文字列をJSONファイルとして出力します。
 * @author nz_prism
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/I18NTexts/js/plugins/ConvertI18NTexts.js
 *
 * @help ConvertI18NTexts.js
 * ver. 1.0.0
 * 
 * [バージョン履歴]
 * 2023/06/04 1.0.0 リリース
 * 
 * ゲーム中に使用されるあらゆる文字列を専用制御文字に変換し、元の文字列をJSON
 * ファイルとして出力します。本プラグインはデータベースの文字列を直接変更しま
 * す。ご使用前に必ずバックアップをお取りください。本プラグインを使用したこと
 * で生じたあらゆる不具合や損失について、作者は一切責任を負いません。
 * 
 * 本プラグインを有効にした状態でテストプレイを起動すると文字列自動変換が始ま
 * り、完了するとそのままテストプレイが終了します。その後ツクールで「プロジェ
 * クトデータが外部で変更されました」というダイアログが表示されたら「はい」を
 * 選択してください（「いいえ」を選択した場合はツクールを再起動してください）。
 * これによって文字列の変更がツクールに反映されます。実際に文字列を変換すると
 * き以外は本プラグインを無効にしてください。なお有効にしたままデプロイメント
 * してしまったとしても、本プラグインはテストプレイ時にしか機能しませんので問
 * 題ありません。
 * 変換が完了するとデータベースやイベントのあらゆる変換対象文字列が、対応する
 * 文字列に変換されます。また初回起動時、「I18NTexts.json」ファイルがdataフォ
 * ルダ内に生成されます。二回目以降の起動の場合、同ファイルが更新されます。こ
 * のファイルには変換前、データベースに入力されていた全ての文字列が出力されま
 * す。別プラグインである「DisplayI18NTexts.js」を使用することで、オプション
 * で選択されている言語に応じた文字列を表示することが可能です。
 * 
 * 起動前に必ず以下のプラグインパラメータの設定を確認してください。
 * ・「ソース言語」には、現在データベースに実際に入力されているテキストの言語
 * 　（例：日本語）を指定します。これは変換完了後、JSONファイルに書き込まれる
 * 　文字列の言語の指定になります。
 * ・「ターゲット言語」には、置換先言語を指定します。初回起動時は必ず「制御文
 * 　字」を選択してください。データベース等の文字列は変換完了後、ここで選択し
 * 　た言語に対応する文字列に置き換わります。「制御文字」の場合は専用の数字が
 * 　割り振られた制御文字「\I18N[n]」に置換されます。それ以外の言語の場合、
 * 　I18NTexts.jsonにターゲット言語が含まれていれば対応する文字列に置き換わ
 * 　ります。含まれていない場合、新しくその言語のデータ枠が用意されます。
 * ・「翻訳候補言語リスト」には、現在使用されている言語も含めて翻訳を検討して
 * 　いる全ての言語を指定してください。初回起動時、ここで設定した全ての言語が
 * 　I18NTexts.jsonのキーとして設定されます。ソース言語以外の言語の値には
 * 　「temp[n]」という仮文字列が入力されます。
 * ・ゲームタイトルも変換対象にしたい場合「ゲームタイトルの変換」をオンにして
 * 　ください。ただしタイトルバーに表示されるタイトルは翻訳されないので、この
 * 　パラメータをオンにすることは推奨されません。
 * ・「未使用文字列の変換」をオンにすると、敵グループの名前やアニメーションの
 * 　名前、イベントの名前といったツクール標準ではゲーム中表示されることのない
 * 　文字列（メモ・注釈以外）も変換対象になります。
 * ・「メモの変換」をオンにすると、データベースの各種「メモ」およびイベントの
 * 　「注釈」も変換対象になります。
 * ・「プラグインパラメータ」にプラグイン名およびそのプラグインのプラグインパ
 * 　ラメータ名を指定することで、プラグインパラメータに入力されている文字列も
 * 　変換対象になります。ただし変換できるのは通常の文字列（string）のみであり、
 * 　文字列のリスト（string[]）や構造体（struct）の中の文字列は変換できません
 * 　のでご注意ください。なおDisplayI18NTexts.jsの前提プラグインであるOptionEx
 * 　の各種オプション項目名のプラグインパラメータ名は、あらかじめ指定されていま
 * 　す。
 * 
 * 本プラグインを一度実行した後、次回以降の起動では「変換対象文字列」以下のパ
 * ラメータを変更しないでください。また、データベース項目やイベント（イベント
 * 中のイベントコマンドも含む）を追加することは問題ありませんが、削除したり順
 * 番を変更したりしないでください。IDがずれて正常に変換できなくなってしまいま
 * す。そうした変更を加える必要がある場合は、dataフォルダ内のI18NTexts.jsonを
 * 削除してください。これにより初期化されます。
 * 
 * 本プラグインは以下の手順にて使用することを推奨します（ゲーム中の文字列とし
 * て日本語と英語の2ヶ国語を使用する場合の例です）。
 *  1. プロジェクトフォルダのバックアップを取る
 *  2. プラグインパラメータ「翻訳候補言語リスト」に「日本語」と「英語」を指定
 *     する
 *  3. プラグインパラメータ「ソース言語」に「日本語」を選択する
 *  4. プラグインパラメータ「ターゲット言語」に「制御文字」を選択する
 *  5. 「変換対象文字列」以下のプラグインパラメータ設定をよく確認する
 *  6. ConvertI18NTexts.jsを有効にする
 *  7. テストプレイを実行する
 *  8. 全ての変換対象の文字列が制御文字に変換されていることを確認する
 *  9. dataフォルダ内にI18NTexts.jsonが生成されていることを確認する
 * 10. I18NTexts.jsonを開き、「ja-JP」というキーの値にツクール上に入力されてい
 *     た文字列が、「en-US」というキーの値に「temp[n]」という仮文字列が設定さ
 *     れていることを確認する
 * 11. ConvertI18NTexts.jsを無効にする
 * 12. DisplayI18NTexts.jsのプラグインパラメータ「使用言語」に「日本語」と「英
 *     語」を指定する
 * 13. DisplayI18NTexts.jsを有効にする
 * 14. I18NTexts.json内の任意のデータの「en-US」キーの値に、「ja-JP」キーの値
 *     の文字列を翻訳した文字列を入力する（オプション画面にて表示される文字列
 *     推奨）
 * 15. テストプレイを実行し、オプション画面を開く
 * 16. 「言語」にて日本語と英語を切り替え、14で入力した文字列が正常に翻訳され
 *     ていることを確認する
 * 17. 全ての文字列の翻訳が完了するまで14〜16を繰り返す
 * 
 * 仮文字列（temp[n]）は正式に翻訳するまでの間はそのままにしてください。
 * 削除して空文字列にしてしまうと不具合が生じます。
 * 
 * なおデータベース等の文字列を制御文字から元の言語の文字列に戻すこともできま
 * す。その場合「ソース言語」に「制御文字」を、「ターゲット言語」に制御文字以
 * 外の言語を指定してテストプレイを実行してください。その後、データベースやイ
 * ベントの文字列が正常に変換されていることを確認してください。
 * また、I18NTexts.jsonの内容を更新することもできます。例えばデータベース文字
 * 列が日本語であるとします。データベース上で何らかの文字列に変更を加えたとし
 * ても、I18NTexts.jsonのそれに対応する文字列はまだ古いままです。「ソース言語」
 * と「ターゲット言語」の両方に「日本語」を指定してテストプレイを実行すると、
 * I18NTexts.jsonに変更が反映されます。
 * 
 * I18NTexts.jsonの言語別キー一覧
 * 日本語: ja-JP
 * 英語: en-US
 * 中国語（簡体字）: zh_CN
 * 中国語（繁体字）: zh_TW
 * 韓国語: ko_KR
 * フランス語: fr_FR
 * イタリア語: it_IT
 * ドイツ語: de_DE
 * スペイン語: es_ES
 * ポルトガル語: pt_BR
 * ロシア語: ru-RU
 * 
 * 
 * このプラグインはMITライセンスにてリリースされています。
 * https://opensource.org/licenses/mit-license.php
 * 
 * 
 * @param sourceLanguage
 * @text ソース言語
 * @desc 現在データベースやイベントに入力されている文字列の言語を選択してください。
 * @default ja-JP
 * @type select
 * @option 制御文字（\I18N[n]）
 * @value escape
 * @option 日本語
 * @value ja-JP
 * @option 英語
 * @value en-US
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
 * @value ru-RU
 * 
 * @param targetLanguage
 * @text ターゲット言語
 * @desc テストプレイ起動後に変換する、データベースやイベントの文字列の言語を選択してください。
 * @default escape
 * @type select
 * @option 制御文字（\I18N[n]）
 * @value escape
 * @option 日本語
 * @value ja-JP
 * @option 英語
 * @value en-US
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
 * @value ru-RU
 * 
 * @param languagesToBeSupported
 * @text 翻訳候補言語リスト
 * @desc すべての翻訳候補言語を設定してください。ここで指定した言語がI18NTexts.jsonのキーとして追加されます。
 * @default ["ja-JP","en-US"]
 * @type select[]
 * @option 日本語
 * @value ja-JP
 * @option 英語
 * @value en-US
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
 * @value ru-RU
 * 
 * @param targetText
 * @text 変換対象文字列
 * @desc 特定の文字列を変換対象にするかどうかの設定です。
 * 
 * @param convertGameTitle
 * @text ゲームタイトルの変換
 * @desc オンにするとゲームタイトルも変換対象になります。タイトルバーに表示されるタイトルがおかしくなるため、非推奨です。
 * @parent targetText
 * @default false
 * @type boolean
 * 
 * @param convertUnusedTexts
 * @text 未使用文字列の変換
 * @desc オンにすると敵グループやアニメーションの名前など、ゲーム中に表示されない文字列も変換対象になります。
 * @parent targetText
 * @default false
 * @type boolean
 * 
 * @param convertNotes
 * @text メモの変換
 * @desc オンにするとデータベース項目の「メモ」、イベントコマンド「注釈」も変換対象になります。
 * @parent targetText
 * @default false
 * @type boolean
 * 
 * @param pluginParameters
 * @text プラグインパラメータ
 * @desc 各種プラグインのプラグインパラメータを変換対象に指定します（複数設定可能）。
 * @parent targetText
 * @default ["{\"pluginName\":\"OptionEx\",\"parameterNames\":\"[\\\"switchABButtonsName\\\",\\\"fastMessageName\\\",\\\"dashSpeedName\\\",\\\"windowskinName\\\",\\\"windowToneRedName\\\",\\\"windowToneGreenName\\\",\\\"windowToneBlueName\\\",\\\"windowOpacityName\\\",\\\"defaultCommandName\\\"]\"}"]
 * @type struct<pluginParameter>[]
 *
 */

/*~struct~pluginParameter:ja
 *
 * @param pluginName
 * @text プラグイン名
 * @desc 変換したいパラメータのプラグイン名を入力してください。
 * @type string
 * 
 * @param parameterNames
 * @text パラメータ名
 * @desc プラグインパラメータ名を入力してください（複数設定可能）。
 * @type string[]
 * 
 */

if (Utils.isNwjs() && Utils.isOptionValid("test")) {
    $dataI18nTexts = null;
    (() => {
        'use strict';
        const PLUGIN_NAME = "ConvertI18NTexts";
        const pluginParams = PluginManager.parameters(PLUGIN_NAME);
    
        const SOURCE_LANGUAGE = pluginParams.sourceLanguage;
        const TARGET_LANGUAGE = pluginParams.targetLanguage;
        const CONVERTING_TO_ESCAPE = TARGET_LANGUAGE === "escape";
        const UPDATING_TEXTS = TARGET_LANGUAGE === SOURCE_LANGUAGE;

        const LANGUAGES_TO_BE_SUPPORTED = JSON.parse(pluginParams.languagesToBeSupported);
        if (!LANGUAGES_TO_BE_SUPPORTED.includes(SOURCE_LANGUAGE)) LANGUAGES_TO_BE_SUPPORTED.unshift(SOURCE_LANGUAGE);
    
        const CONVERT_GAME_TITLE = pluginParams.convertGameTitle === "true";
        const CONVERT_UNUSED_TEXTS = pluginParams.convertUnusedTexts === "true";
        const CONVERT_NOTES = pluginParams.convertNotes === "true";
    
        const PLUGIN_PARAMETERS = {};
        for (const str of JSON.parse(pluginParams.pluginParameters)) {
            const obj = JSON.parse(str);
            PLUGIN_PARAMETERS[obj.pluginName] = JSON.parse(obj.parameterNames);
        }
    
    
        const FILE_PATH = "data/I18NTexts.json";
        const ESCAPE_TEXT = "\\I18N[%1]";
    
        const LANGUAGE_OPTION_NAMES = {
            "ja-JP":"言語",
            "en-US":"Language",
            "zh_CN":"语言",
            "zh_TW":"語言",
            "ko_KR":"언어",
            "fr_FR":"Langue",
            "it_IT":"Lingua",
            "de_DE":"Sprache",
            "es_ES":"Idioma",
            "pt_BR":"Linguagem",
            "ru-RU":"Язык"
        };
    
        const ALERT_INVALID_SOURCE_JP = "「ソース言語」が無効な値です。プラグインパラメータを再設定してください。";
        const ALERT_INVALID_SOURCE_EN = "\"Source Language\" is set to invalid value. Reset the plugin parameter.";
        const ALERT_INVALID_TARGET_JP = "「ターゲット言語」が無効な値です。プラグインパラメータを再設定してください。";
        const ALERT_INVALID_TARGET_EN = "\"Target Language\" is set to invalid value. Reset the plugin parameter.";
        const ALERT_INITIAL_SOURCE_ESCAPE_JP = "初回起動時は「ソース言語」に「制御文字」以外の言語を設定してください。";
        const ALERT_INITIAL_SOURCE_ESCAPE_EN = "For the first time, you must not choose \"Escape Character\" for \"Source Language\".";
        const ALERT_INITIAL_TARGET_NOT_ESCAPE_JP = "初回起動時は「ターゲット言語」に「制御文字」を設定してください。";
        const ALERT_INITIAL_TARGET_NOT_ESCAPE_EN = "For the first time, you must choose \"Escape Character\" for \"Target Language\".";
    
    
        const fs = require("fs");
        if (fs.existsSync(FILE_PATH)) DataManager._databaseFiles.push({ name: "$dataI18nTexts", src: "I18NTexts.json" });
    
    
        StorageManager.processSystemTexts = function(id, texts, update=false) {
            const systemHeader = "system-";
    
            if (CONVERT_GAME_TITLE) {
                const title = $dataSystem.gameTitle;
                if (title) {
                    const titleEscape = ESCAPE_TEXT.format(id);
                    if (update) {
                        if (UPDATING_TEXTS) {
                            texts[id][SOURCE_LANGUAGE] = title;
                        } else {
                            $dataSystem.gameTitle = CONVERTING_TO_ESCAPE ? titleEscape : texts[id][TARGET_LANGUAGE];
                        }
                    } else {
                        const titleObj = {"id":id, "identifier": systemHeader+"gameTitle"};
                        titleObj[SOURCE_LANGUAGE] = title;
                        $dataSystem.gameTitle = titleEscape;
                        texts.push(titleObj);
                    }
                    id++;
                }
            }
    
            const currency = $dataSystem.currencyUnit;
            if (currency) {
                const currencyEscape = ESCAPE_TEXT.format(id);
                if (update) {
                    if (UPDATING_TEXTS) {
                        texts[id][SOURCE_LANGUAGE] = currency;
                    } else {
                        $dataSystem.currencyUnit = CONVERTING_TO_ESCAPE ? currencyEscape : texts[id][TARGET_LANGUAGE];
                    }
                } else {
                    const currencyObj = {"id":id, "identifier": systemHeader+"currencyUnit"};
                    currencyObj[SOURCE_LANGUAGE] = currency;
                    $dataSystem.currencyUnit = currencyEscape;
                    texts.push(currencyObj);
                }
                id++;
            }
    
            const elementHeader = systemHeader + "element";
            const elements = $dataSystem.elements;
            for (let i=1; i<elements.length; i++) {
                const str = elements[i];
                if (str) {
                    const escapeText = ESCAPE_TEXT.format(id);
                    if (update) {
                        if (UPDATING_TEXTS) {
                            texts[id][SOURCE_LANGUAGE] = str;
                        } else {
                            elements[i] = CONVERTING_TO_ESCAPE ? escapeText : texts[id][TARGET_LANGUAGE];
                        }
                    } else {
                        const obj = {"id":id, "identifier": elementHeader+i};
                        obj[SOURCE_LANGUAGE] = str;
                        elements[i] = escapeText;
                        texts.push(obj);
                    }
                    id++;
                }
            }
    
            const skillHeader = systemHeader + "skillType";
            const skillTypes = $dataSystem.skillTypes;
            for (let i=1; i<skillTypes.length; i++) {
                const str = skillTypes[i];
                if (str) {
                    const escapeText = ESCAPE_TEXT.format(id);
                    if (update) {
                        if (UPDATING_TEXTS) {
                            texts[id][SOURCE_LANGUAGE] = str;
                        } else {
                            skillTypes[i] = CONVERTING_TO_ESCAPE ? escapeText : texts[id][TARGET_LANGUAGE];
                        }
                    } else {
                        const obj = {"id":id, "identifier": skillHeader+i};
                        obj[SOURCE_LANGUAGE] = str;
                        skillTypes[i] = escapeText;
                        texts.push(obj);
                    }
                    id++;
                }
            }
    
            const weaponHeader = systemHeader + "weaponType";
            const weaponTypes = $dataSystem.weaponTypes;
            for (let i=1; i<weaponTypes.length; i++) {
                const str = weaponTypes[i];
                if (str) {
                    const escapeText = ESCAPE_TEXT.format(id);
                    if (update) {
                        if (UPDATING_TEXTS) {
                            texts[id][SOURCE_LANGUAGE] = str;
                        } else {
                            weaponTypes[i] = CONVERTING_TO_ESCAPE ? escapeText : texts[id][TARGET_LANGUAGE];
                        }
                    } else {
                        const obj = {"id":id, "identifier": weaponHeader+i};
                        obj[SOURCE_LANGUAGE] = str;
                        weaponTypes[i] = escapeText;
                        texts.push(obj);
                    }
                    id++;
                }
            }
    
            const armorHeader = systemHeader + "armorType";
            const armorTypes = $dataSystem.armorTypes;
            for (let i=1; i<armorTypes.length; i++) {
                const str = armorTypes[i];
                if (str) {
                    const escapeText = ESCAPE_TEXT.format(id);
                    if (update) {
                        if (UPDATING_TEXTS) {
                            texts[id][SOURCE_LANGUAGE] = str;
                        } else {
                            armorTypes[i] = CONVERTING_TO_ESCAPE ? escapeText : texts[id][TARGET_LANGUAGE];
                        }
                    } else {
                        const obj = {"id":id, "identifier": armorHeader+i};
                        obj[SOURCE_LANGUAGE] = str;
                        armorTypes[i] = escapeText;
                        texts.push(obj);
                    }
                    id++;
                }
            }
    
            const equipHeader = systemHeader + "equipType";
            const equipTypes = $dataSystem.equipTypes;
            for (let i=1; i<equipTypes.length; i++) {
                const str = equipTypes[i];
                if (str) {
                    const escapeText = ESCAPE_TEXT.format(id);
                    if (update) {
                        if (UPDATING_TEXTS) {
                            texts[id][SOURCE_LANGUAGE] = str;
                        } else {
                            equipTypes[i] = CONVERTING_TO_ESCAPE ? escapeText : texts[id][TARGET_LANGUAGE];
                        }
                    } else {
                        const obj = {"id":id, "identifier": equipHeader+i};
                        obj[SOURCE_LANGUAGE] = str;
                        equipTypes[i] = escapeText;
                        texts.push(obj);
                    }
                    id++;
                }
            }
    
            const terms = $dataSystem.terms;
            const termHeader = systemHeader + "term-";
    
            const basic = terms.basic;
            const basicHeader = termHeader + "basic";
            for (let i=0; i<basic.length; i++) {
                const str = basic[i];
                if (str) {
                    const escapeText = ESCAPE_TEXT.format(id);
                    if (update) {
                        if (UPDATING_TEXTS) {
                            texts[id][SOURCE_LANGUAGE] = str;
                        } else {
                            basic[i] = CONVERTING_TO_ESCAPE ? escapeText : texts[id][TARGET_LANGUAGE];
                        }
                    } else {
                        const obj = {"id":id, "identifier": basicHeader+i};
                        obj[SOURCE_LANGUAGE] = str;
                        basic[i] = escapeText;
                        texts.push(obj);
                    }
                    id++;
                }
            }
    
            const commands = terms.commands;
            const commandHeader = termHeader + "command";
            for (let i=0; i<commands.length; i++) {
                const str = commands[i];
                if (str) {
                    const escapeText = ESCAPE_TEXT.format(id);
                    if (update) {
                        if (UPDATING_TEXTS) {
                            texts[id][SOURCE_LANGUAGE] = str;
                        } else {
                            commands[i] = CONVERTING_TO_ESCAPE ? escapeText : texts[id][TARGET_LANGUAGE];
                        }
                    } else {
                        const obj = {"id":id, "identifier": commandHeader+i};
                        obj[SOURCE_LANGUAGE] = str;
                        commands[i] = escapeText;
                        texts.push(obj);
                    }
                    id++;
                }
            }
    
            const params = terms.params;
            const paramHeader = termHeader + "param";
            for (let i=0; i<params.length; i++) {
                const str = params[i];
                if (str) {
                    const escapeText = ESCAPE_TEXT.format(id);
                    if (update) {
                        if (UPDATING_TEXTS) {
                            texts[id][SOURCE_LANGUAGE] = str;
                        } else {
                            params[i] = CONVERTING_TO_ESCAPE ? escapeText : texts[id][TARGET_LANGUAGE];
                        }
                    } else {
                        const obj = {"id":id, "identifier": paramHeader+i};
                        obj[SOURCE_LANGUAGE] = str;
                        params[i] = escapeText;
                        texts.push(obj);
                    }
                    id++;
                }
            }
    
            const messages = terms.messages;
            const messageHeader = termHeader + "message-";
            for (const ary of Object.entries(messages)) {
                const str = ary[1];
                if (str) {
                    const escapeText = ESCAPE_TEXT.format(id);
                    const name = ary[0];
                    if (update) {
                        if (UPDATING_TEXTS) {
                            texts[id][SOURCE_LANGUAGE] = str;
                        } else {
                            messages[name] = CONVERTING_TO_ESCAPE ? escapeText : texts[id][TARGET_LANGUAGE];
                        }
                    } else {
                        const obj = {"id":id, "identifier": messageHeader+name};
                        obj[SOURCE_LANGUAGE] = str;
                        messages[name] = escapeText;
                        texts.push(obj);
                    }
                    id++;
                }
            }
    
            this.fsWriteFile("data/System.json", JsonEx.stringify($dataSystem));
            return id;
        };
    
        StorageManager.processActorTexts = function(id, texts, update=false) {
            for (let i=1; i<$dataActors.length; i++) {
                const actor = $dataActors[i];
                if (!actor) continue;
                const properties = ["name", "nickname", "profile"];
                if (CONVERT_NOTES) properties.push("note");
                const header = "actor" + i + "-";
                for (const property of properties) {
                    const str = actor[property];
                    if (str) {
                        const escapeText = ESCAPE_TEXT.format(id);
                        if (update) {
                            if (UPDATING_TEXTS) {
                                texts[id][SOURCE_LANGUAGE] = str;
                            } else {
                                actor[property] = CONVERTING_TO_ESCAPE ? escapeText : texts[id][TARGET_LANGUAGE];
                            }
                        } else {
                            const obj = {"id":id, "identifier": header+property};
                            obj[SOURCE_LANGUAGE] = str;
                            actor[property] = escapeText;
                            texts.push(obj);
                        }
                        id++;
                    }
                }
            }
            this.fsWriteFile("data/Actors.json", JsonEx.stringify($dataActors));
            return id;
        };
    
        StorageManager.processClassTexts = function(id, texts, update=false) {
            for (let i=1; i<$dataClasses.length; i++) {
                const dclass = $dataClasses[i];
                if (!dclass) continue;
                const properties = ["name"];
                if (CONVERT_NOTES) properties.push("note");
                const header = "class" + i + "-";
                for (const property of properties) {
                    const str = dclass[property];
                    if (str) {
                        const escapeText = ESCAPE_TEXT.format(id);
                        if (update) {
                            if (UPDATING_TEXTS) {
                                texts[id][SOURCE_LANGUAGE] = str;
                            } else {
                                dclass[property] = CONVERTING_TO_ESCAPE ? escapeText : texts[id][TARGET_LANGUAGE];
                            }
                        } else {
                            const obj = {"id":id, "identifier": header+property};
                            obj[SOURCE_LANGUAGE] = str;
                            dclass[property] = escapeText;
                            texts.push(obj);
                        }
                        id++;
                    }
                }
            }
            this.fsWriteFile("data/Classes.json", JsonEx.stringify($dataClasses));
            return id;
        };
    
        StorageManager.processSkillTexts = function(id, texts, update=false) {
            for (let i=1; i<$dataSkills.length; i++) {
                const skill = $dataSkills[i];
                if (!skill) continue;
                const properties = ["name", "description", "message1", "message2"];
                if (CONVERT_NOTES) properties.push("note");
                const header = "skill" + i + "-";
                for (const property of properties) {
                    const str = skill[property];
                    if (str) {
                        const escapeText = ESCAPE_TEXT.format(id);
                        if (update) {
                            if (UPDATING_TEXTS) {
                                texts[id][SOURCE_LANGUAGE] = str;
                            } else {
                                skill[property] = CONVERTING_TO_ESCAPE ? escapeText : texts[id][TARGET_LANGUAGE];
                            }
                        } else {
                            const obj = {"id":id, "identifier": header+property};
                            obj[SOURCE_LANGUAGE] = str;
                            skill[property] = escapeText;
                            texts.push(obj);
                        }
                        id++;
                    }
                }
            }
            this.fsWriteFile("data/Skills.json", JsonEx.stringify($dataSkills));
            return id;
        };
    
        StorageManager.processItemTexts = function(id, texts, update=false) {
            for (let i=1; i<$dataItems.length; i++) {
                const item = $dataItems[i];
                if (!item) continue;
                const properties = ["name", "description"];
                if (CONVERT_NOTES) properties.push("note");
                const header = "item" + i + "-";
                for (const property of properties) {
                    const str = item[property];
                    if (str) {
                        const escapeText = ESCAPE_TEXT.format(id);
                        if (update) {
                            if (UPDATING_TEXTS) {
                                texts[id][SOURCE_LANGUAGE] = str;
                            } else {
                                item[property] = CONVERTING_TO_ESCAPE ? escapeText : texts[id][TARGET_LANGUAGE];
                            }
                        } else {
                            const obj = {"id":id, "identifier": header+property};
                            obj[SOURCE_LANGUAGE] = str;
                            item[property] = escapeText;
                            texts.push(obj);
                        }
                        id++;
                    }
                }
            }
            this.fsWriteFile("data/Items.json", JsonEx.stringify($dataItems));
            return id;
        };
    
        StorageManager.processWeaponTexts = function(id, texts, update=false) {
            for (let i=1; i<$dataWeapons.length; i++) {
                const weapon = $dataWeapons[i];
                if (!weapon) continue;
                const properties = ["name", "description"];
                if (CONVERT_NOTES) properties.push("note");
                const header = "weapon" + i + "-";
                for (const property of properties) {
                    const str = weapon[property];
                    if (str) {
                        const escapeText = ESCAPE_TEXT.format(id);
                        if (update) {
                            if (UPDATING_TEXTS) {
                                texts[id][SOURCE_LANGUAGE] = str;
                            } else {
                                weapon[property] = CONVERTING_TO_ESCAPE ? escapeText : texts[id][TARGET_LANGUAGE];
                            }
                        } else {
                            const obj = {"id":id, "identifier": header+property};
                            obj[SOURCE_LANGUAGE] = str;
                            weapon[property] = escapeText;
                            texts.push(obj);
                        }
                        id++;
                    }
                }
            }
            this.fsWriteFile("data/Weapons.json", JsonEx.stringify($dataWeapons));
            return id;
        };
    
        StorageManager.processArmorTexts = function(id, texts, update=false) {
            for (let i=1; i<$dataArmors.length; i++) {
                const armor = $dataArmors[i];
                if (!armor) continue;
                const properties = ["name", "description"];
                if (CONVERT_NOTES) properties.push("note");
                const header = "armor" + i + "-";
                for (const property of properties) {
                    const str = armor[property];
                    if (str) {
                        const escapeText = ESCAPE_TEXT.format(id);
                        if (update) {
                            if (UPDATING_TEXTS) {
                                texts[id][SOURCE_LANGUAGE] = str;
                            } else {
                                armor[property] = CONVERTING_TO_ESCAPE ? escapeText : texts[id][TARGET_LANGUAGE];
                            }
                        } else {
                            const obj = {"id":id, "identifier": header+property};
                            obj[SOURCE_LANGUAGE] = str;
                            armor[property] = escapeText;
                            texts.push(obj);
                        }
                        id++;
                    }
                }
            }
            this.fsWriteFile("data/Armors.json", JsonEx.stringify($dataArmors));
            return id;
        };
    
        StorageManager.processEnemyTexts = function(id, texts, update=false) {
            for (let i=1; i<$dataEnemies.length; i++) {
                const enemy = $dataEnemies[i];
                if (!enemy) continue;
                const properties = ["name"];
                if (CONVERT_NOTES) properties.push("note");
                for (const property of properties) {
                    const str = enemy[property];
                    if (str) {
                        const escapeText = ESCAPE_TEXT.format(id);
                        if (update) {
                            if (UPDATING_TEXTS) {
                                texts[id][SOURCE_LANGUAGE] = str;
                            } else {
                                enemy[property] = CONVERTING_TO_ESCAPE ? escapeText : texts[id][TARGET_LANGUAGE];
                            }
                        } else {
                            const obj = {"id":id, "identifier":"enemy" + i + "-" + property};
                            obj[SOURCE_LANGUAGE] = str;
                            enemy[property] = escapeText;
                            texts.push(obj);
                        }
                        id++;
                    }
                }
            }
            this.fsWriteFile("data/Enemies.json", JsonEx.stringify($dataEnemies));
            return id;
        };
    
        StorageManager.processStateTexts = function(id, texts, update=false) {
            for (let i=1; i<$dataStates.length; i++) {
                const state = $dataStates[i];
                if (!state) continue;
                const properties = ["name", "message1", "message2", "message3", "message4"];
                if (CONVERT_NOTES) properties.push("note");
                const header = "state" + i + "-";
                for (const property of properties) {
                    const str = state[property];
                    if (str) {
                        const escapeText = ESCAPE_TEXT.format(id);
                        if (update) {
                            if (UPDATING_TEXTS) {
                                texts[id][SOURCE_LANGUAGE] = str;
                            } else {
                                state[property] = CONVERTING_TO_ESCAPE ? escapeText : texts[id][TARGET_LANGUAGE];
                            }
                        } else {
                            const obj = {"id":id, "identifier": header+property};
                            obj[SOURCE_LANGUAGE] = str;
                            state[property] = escapeText;
                            texts.push(obj);
                        }
                        id++;
                    }
                }
            }
            this.fsWriteFile("data/States.json", JsonEx.stringify($dataStates));
            return id;
        };
    
        StorageManager.processAnimationTexts = function(id, texts, update=false) {
            if (CONVERT_UNUSED_TEXTS) {
                for (let i=1; i<$dataAnimations.length; i++) {
                    const animation = $dataAnimations[i];
                    if (!animation) continue;
                    const header = "animation" + i + "-";
                    const property = "name";
                    const str = animation[property];
                    if (str) {
                        const escapeText = ESCAPE_TEXT.format(id);
                        if (update) {
                            if (UPDATING_TEXTS) {
                                texts[id][SOURCE_LANGUAGE] = str;
                            } else {
                                animation[property] = CONVERTING_TO_ESCAPE ? escapeText : texts[id][TARGET_LANGUAGE];
                            }
                        } else {
                            const obj = {"id":id, "identifier": header+property};
                            obj[SOURCE_LANGUAGE] = str;
                            animation[property] = escapeText;
                            texts.push(obj);
                        }
                        id++;
                    }
                }
                this.fsWriteFile("data/Animations.json", JsonEx.stringify($dataAnimations));
            }
            return id;
        };
    
        StorageManager.processTilesetTexts = function(id, texts, update=false) {
            for (let i=1; i<$dataTilesets.length; i++) {
                const tileset = $dataTilesets[i];
                if (!tileset) continue;
                const properties = [];
                if (CONVERT_UNUSED_TEXTS) properties.push("name");
                if (CONVERT_NOTES) properties.push("note");
                const header = "tileset" + i + "-";
                for (const property of properties) {
                    const str = tileset[property];
                    if (str) {
                        const escapeText = ESCAPE_TEXT.format(id);
                        if (update) {
                            if (UPDATING_TEXTS) {
                                texts[id][SOURCE_LANGUAGE] = str;
                            } else {
                                tileset[property] = CONVERTING_TO_ESCAPE ? escapeText : texts[id][TARGET_LANGUAGE];
                            }
                        } else {
                            const obj = {"id":id, "identifier": header+property};
                            obj[SOURCE_LANGUAGE] = str;
                            tileset[property] = escapeText;
                            texts.push(obj);
                        }
                        id++;
                    }
                }
            }
            this.fsWriteFile("data/Tilesets.json", JsonEx.stringify($dataTilesets));
            return id;
        };
    
        StorageManager.processTroopTexts = function(id, texts, update=false) {
            for (let i=1; i<$dataTroops.length; i++) {
                const troop = $dataTroops[i];
                if (!troop) continue;
                const troopHeader = "troop" + i + "-";
                if (CONVERT_UNUSED_TEXTS) {
                    const property = "name";
                    const str = troop[property];
                    if (str) {
                        const escapeText = ESCAPE_TEXT.format(id);
                        if (update) {
                            if (UPDATING_TEXTS) {
                                texts[id][SOURCE_LANGUAGE] = str;
                            } else {
                                troop[property] = CONVERTING_TO_ESCAPE ? escapeText : texts[id][TARGET_LANGUAGE];
                            }
                        } else {
                            const obj = {"id":id, "identifier": troopHeader+property};
                            obj[SOURCE_LANGUAGE] = str;
                            troop[property] = escapeText;
                            texts.push(obj);
                        }
                        id++;
                    }
                }
                const pages = troop.pages;
                for (let j=0; j<pages.length; j++) {
                    const page = pages[j];
                    if (!page) continue;
                    const pageId = j + 1;
                    const pageHeader = troopHeader + "page" + pageId + "-";
                    id = this.processEventListTexts(id, texts, page.list, pageHeader, update);
                }
            }
            this.fsWriteFile("data/Troops.json", JsonEx.stringify($dataTroops));
            return id;
        };
    
        StorageManager.processCommonEventTexts = function(id, texts, update=false) {
            for (let i=1; i<$dataCommonEvents.length; i++) {
                const commonEvent = $dataCommonEvents[i];
                if (!commonEvent) continue;
                const header = "commonEvent" + i + "-";
                if (CONVERT_UNUSED_TEXTS) {
                    const property = "name";
                    const str = commonEvent[property];
                    if (str) {
                        const escapeText = ESCAPE_TEXT.format(id);
                        if (update) {
                            if (UPDATING_TEXTS) {
                                texts[id][SOURCE_LANGUAGE] = str;
                            } else {
                                commonEvent[property] = CONVERTING_TO_ESCAPE ? escapeText : texts[id][TARGET_LANGUAGE];
                            }
                        } else {
                            const obj = {"id":id, "identifier": header+property};
                            obj[SOURCE_LANGUAGE] = str;
                            commonEvent[property] = escapeText;
                            texts.push(obj);
                        }
                        id++;
                    }
                }
                id = this.processEventListTexts(id, texts, commonEvent.list, header, update);
            }
            this.fsWriteFile("data/CommonEvents.json", JsonEx.stringify($dataCommonEvents));
            return id;
        };
    
        StorageManager.processMapTexts = function(id, texts, update=false) {
            for (let i=1; i<$dataMapInfos.length; i++) {
                const mapInfo = $dataMapInfos[i];
                if (!mapInfo) continue;
                if (CONVERT_UNUSED_TEXTS) {
                    const header1 = "mapInfo" + i + "-";
                    const property = "name";
                    const str1 = mapInfo[property];
                    if (str1) {
                        const escapeText1 = ESCAPE_TEXT.format(id);
                        if (update) {
                            if (UPDATING_TEXTS) {
                                texts[id][SOURCE_LANGUAGE] = str1;
                            } else {
                                mapInfo[property] = CONVERTING_TO_ESCAPE ? escapeText1 : texts[id][TARGET_LANGUAGE];
                            }
                        } else {
                            const obj1 = {"id":id, "identifier": header1+property};
                            obj1[SOURCE_LANGUAGE] = str1;
                            mapInfo[property] = escapeText1;
                            texts.push(obj1);
                        }
                        id++;
                    }
                }
                const mapPath = "data/Map%1.json".format(i.padZero(3));
                const map = JSON.parse(this.fsReadFile(mapPath));
                if (!map) continue;
                const header2 = "map" + i + "-";
                const properties = ["displayName"];
                if (CONVERT_NOTES) properties.push("note");
                for (const property of properties) {
                    const str2 = map[property];
                    if (str2) {
                        const escapeText2 = ESCAPE_TEXT.format(id);
                        if (update) {
                            if (UPDATING_TEXTS) {
                                texts[id][SOURCE_LANGUAGE] = str2;
                            } else {
                                map[property] = CONVERTING_TO_ESCAPE ? escapeText2 : texts[id][TARGET_LANGUAGE];
                            }
                        } else {
                            const obj2 = {"id":id, "identifier": header2+property};
                            obj2[SOURCE_LANGUAGE] = str2;
                            map[property] = escapeText2;
                            texts.push(obj2);
                        }
                        id++;
                    }
                }
                const events = map.events;
                for (let j=0; j<events.length; j++) {
                    const event = events[j];
                    if (!event) continue;
                    const header3 = header2 + "event" + j + "-";
                    const properties = [];
                    if (CONVERT_UNUSED_TEXTS) properties.push("name");
                    if (CONVERT_NOTES) properties.push("note");
                    for (const property of properties) {
                        const str3 = event[property];
                        if (str3) {
                            const escapeText3 = ESCAPE_TEXT.format(id);
                            if (update) {
                                if (UPDATING_TEXTS) {
                                    texts[id][SOURCE_LANGUAGE] = str3;
                                } else {
                                    event[property] = CONVERTING_TO_ESCAPE ? escapeText3 : texts[id][TARGET_LANGUAGE];
                                }
                            } else {
                                const obj3 = {"id":id, "identifier": header3+property};
                                obj3[SOURCE_LANGUAGE] = str3;
                                event[property] = escapeText3;
                                texts.push(obj3);
                            }
                            id++;
                        }
                    }
                    const pages = event.pages;
                    for (let k=0; k<pages.length; k++) {
                        const page = pages[k];
                        if (!page) continue;
                        const pageId = k + 1;
                        const pageHeader = header3 + "page" + pageId + "-";
                        id = this.processEventListTexts(id, texts, page.list, pageHeader, update);
                        
                    }
                }
                this.fsWriteFile(mapPath, JsonEx.stringify(map));
            }
            this.fsWriteFile("data/MapInfos.json", JsonEx.stringify($dataMapInfos));
            return id;
        };
    
        StorageManager.processEventListTexts = function(id, texts, list, header, update=false) {
            let messageId = 0;
            let messageLineId = 0;
            let choiceId = 0;
            let choiceLineId = 0;
            let scrollId = 0;
            let scrollLineId = 0;
            let commentId = 0;
            let commentLineId = 1;
            let changeNameId = 0;
            let changeNicknameId = 0;
            let changeProfileId = 0;
            const choiceInfos = [];
            for (let i=0; i<list.length; i++) {
                const command = list[i];
                if (!command) continue;
                const indent = command.indent;
                const obj1 = {};
                const escapeText1 = ESCAPE_TEXT.format(id);
                switch (command.code) {
                    case 101: //message(base)
                        const speakerName = command.parameters[4];
                        if (speakerName) {
                            if (update) {
                                if (UPDATING_TEXTS) {
                                    texts[id][SOURCE_LANGUAGE] = speakerName;
                                } else {
                                    command.parameters[4] = CONVERTING_TO_ESCAPE ? escapeText1 : texts[id][TARGET_LANGUAGE];
                                }
                            } else {
                                messageId++;
                                messageLineId = 0;
                                obj1["id"] = id;
                                obj1["identifier"] = header + "message" + messageId + "-name";
                                obj1[SOURCE_LANGUAGE] = speakerName;
                                command.parameters[4] = escapeText1;
                                texts.push(obj1);
                            }
                            id++;
                        }
                        break;
                    case 401: //message(line)
                        if (update) {
                            if (UPDATING_TEXTS) {
                                texts[id][SOURCE_LANGUAGE] = command.parameters[0];
                            } else {
                                command.parameters[0] = CONVERTING_TO_ESCAPE ? escapeText1 : texts[id][TARGET_LANGUAGE];
                            }
                        } else {
                            messageLineId++;
                            obj1["id"] = id;
                            obj1["identifier"] = header + "message" + messageId + "-line" + messageLineId;
                            obj1[SOURCE_LANGUAGE] = command.parameters[0];
                            command.parameters[0] = escapeText1;
                            texts.push(obj1);
                        }
                        id++;
                        break;
                    case 102: //choice(base)
                        choiceId++;
                        choiceLineId = 0;
                        const choices = command.parameters[0];
                        const choiceHeader = header + "choice" + choiceId + "-line";
                        const ary = [];
                        for (let j=0; j<choices.length; j++) {
                            const last = (j === choices.length-1);
                            const escapeText2 = ESCAPE_TEXT.format(id);
                            const sourceText = choices[j];
                            let targetText;
                            if (update) {
                                if (UPDATING_TEXTS) {
                                    texts[id][SOURCE_LANGUAGE] = sourceText;
                                } else {
                                    targetText = CONVERTING_TO_ESCAPE ? escapeText2 : texts[id][TARGET_LANGUAGE];
                                }
                            } else {
                                choiceLineId++;
                                targetText = escapeText2;
                                const obj2 = {};
                                obj2["id"] = id;
                                obj2["identifier"] = choiceHeader + choiceLineId;
                                obj2[SOURCE_LANGUAGE] = sourceText;
                                texts.push(obj2);
                            }
                            ary[j] = {
                                "targetText":targetText,
                                "last":last
                            };
                            if (!update || !UPDATING_TEXTS) choices[j] = targetText;
                            id++;
                        }
                        choiceInfos[indent] = ary;
                        break;
                    case 402: //choice(line)
                        const infos = choiceInfos[indent];
                        if (infos) {
                            const choiceInfo = infos[command.parameters[0]];
                            if (choiceInfo) {
                                if (!update || !UPDATING_TEXTS) command.parameters[1] = choiceInfo.targetText;
                                if (choiceInfo.last) choiceInfos[indent] = null;
                            }
                        }
                        break;
                    case 105: //scrollText(base)
                        scrollId++;
                        scrollLineId = 0;
                        break;
                    case 405: //scrollText(line)
                        if (update) {
                            if (UPDATING_TEXTS) {
                                texts[id][SOURCE_LANGUAGE] = command.parameters[0];
                            } else {
                                command.parameters[0] = CONVERTING_TO_ESCAPE ? escapeText1 : texts[id][TARGET_LANGUAGE];
                            }
                        } else {
                            scrollLineId++;
                            obj1["id"] = id;
                            obj1["identifier"] = header + "scroll" + scrollId + "-line" + scrollLineId;
                            obj1[SOURCE_LANGUAGE] = command.parameters[0];
                            command.parameters[0] = escapeText1;
                            texts.push(obj1);
                        }
                        id++;
                        break;
                    case 108: //comment(base)
                        if (CONVERT_NOTES) {
                            if (update) {
                                if (UPDATING_TEXTS) {
                                    texts[id][SOURCE_LANGUAGE] = command.parameters[0];
                                } else {
                                    command.parameters[0] = CONVERTING_TO_ESCAPE ? escapeText1 : texts[id][TARGET_LANGUAGE];
                                }
                            } else {
                                commentId++;
                                commentLineId = 1;
                                obj1["id"] = id;
                                obj1["identifier"] = header + "comment" + commentId + "-line" + commentLineId;
                                obj1[SOURCE_LANGUAGE] = command.parameters[0];
                                command.parameters[0] = escapeText1;
                                texts.push(obj1);
                            }
                            id++;
                        }
                        break;
                    case 408: //comment(line)
                        if (CONVERT_NOTES) {
                            if (update) {
                                if (UPDATING_TEXTS) {
                                    texts[id][SOURCE_LANGUAGE] = command.parameters[0];
                                } else {
                                    command.parameters[0] = CONVERTING_TO_ESCAPE ? escapeText1 : texts[id][TARGET_LANGUAGE];
                                }
                            } else {
                                commentLineId++;
                                obj1["id"] = id;
                                obj1["identifier"] = header + "comment" + commentId + "-line" + commentLineId;
                                obj1[SOURCE_LANGUAGE] = command.parameters[0];
                                command.parameters[0] = escapeText1;
                                texts.push(obj1);
                            }
                            id++;
                        }
                        break;
                    case 320: //changeName
                        const name = command.parameters[1];
                        if (name) {
                            if (update) {
                                if (UPDATING_TEXTS) {
                                    texts[id][SOURCE_LANGUAGE] = name;
                                } else {
                                    command.parameters[1] = CONVERTING_TO_ESCAPE ? escapeText1 : texts[id][TARGET_LANGUAGE];
                                }
                            } else {
                                changeNameId++;
                                obj1["id"] = id;
                                obj1["identifier"] = header + "changeName" + changeNameId;
                                obj1[SOURCE_LANGUAGE] = name;
                                if (!update) command.parameters[1] = escapeText1;
                                texts.push(obj1);
                            }
                            id++;
                        }
                        break;
                    case 324: //changeNickname
                        const nickname = command.parameters[1];
                        if (nickname) {
                            if (update) {
                                if (UPDATING_TEXTS) {
                                    texts[id][SOURCE_LANGUAGE] = nickname;
                                } else {
                                    command.parameters[1] = CONVERTING_TO_ESCAPE ? escapeText1 : texts[id][TARGET_LANGUAGE];
                                }
                            } else {
                                changeNicknameId++;
                                obj1["id"] = id;
                                obj1["identifier"] = header + "changeNickname" + changeNicknameId;
                                obj1[SOURCE_LANGUAGE] = nickname;
                                command.parameters[1] = escapeText1;
                                texts.push(obj1);
                            }
                            id++;
                        }
                        break;
                    case 325: //changeProfile
                        const profile = command.parameters[1];
                        if (profile) {
                            if (update) {
                                if (UPDATING_TEXTS) {
                                    texts[id][SOURCE_LANGUAGE] = profile;
                                } else {
                                    command.parameters[1] = CONVERTING_TO_ESCAPE ? escapeText1 : texts[id][TARGET_LANGUAGE];
                                }
                            } else {
                                changeProfileId++;
                                obj1["id"] = id;
                                obj1["identifier"] = header + "changeProfile" + changeProfileId;
                                obj1[SOURCE_LANGUAGE] = profile;
                                command.parameters[1] = escapeText1;
                                texts.push(obj1);
                            }
                            id++;
                        }
                        break;
                }
            }
            return id;
        };
    
        StorageManager.processPluginTexts = function(id, texts, update=false) {
            let text = "// Generated by RPG Maker.\n// Do not edit this file directly.\nvar $plugins = \n[\n";
            for (let i=0; i<$plugins.length; i++) {
                const plugin = $plugins[i];
                if (!plugin) continue;
                const pluginName = plugin.name;
                const parameters = PLUGIN_PARAMETERS[pluginName];
                if (parameters) {
                    const header = pluginName + "-";
                    for (let j=0; j<parameters.length; j++) {
                        const parameterName = parameters[j];
                        const str = plugin.parameters[parameterName];
                        if (str) {
                            const escapeText = ESCAPE_TEXT.format(id);
                            if (update) {
                                if (UPDATING_TEXTS) {
                                    texts[id][SOURCE_LANGUAGE] = str;
                                } else {
                                    plugin.parameters[parameterName] = CONVERTING_TO_ESCAPE ? escapeText : texts[id][TARGET_LANGUAGE];
                                }
                            } else {
                                const obj = {"id":id, "identifier": header+parameterName};
                                obj[SOURCE_LANGUAGE] = str;
                                plugin.parameters[parameterName] = escapeText;
                                texts.push(obj);
                            }
                            id++;
                        }
                    }
                }
                text += JsonEx.stringify(plugin);
                if (i < $plugins.length - 1) text += ",";
                text += "\n";
            }
            this.fsWriteFile("js/plugins.js", text + "];");
            return id;
        };
    
        StorageManager.createTextJson = function() {
            const texts = [{"id":0, "identifier":"languageOption-name"}];
            let id = 1;
            id = this.processSystemTexts(id, texts);
            id = this.processActorTexts(id, texts);
            id = this.processClassTexts(id, texts);
            id = this.processSkillTexts(id, texts);
            id = this.processItemTexts(id, texts);
            id = this.processWeaponTexts(id, texts);
            id = this.processArmorTexts(id, texts);
            id = this.processEnemyTexts(id, texts);
            id = this.processStateTexts(id, texts);
            id = this.processAnimationTexts(id, texts);
            id = this.processTilesetTexts(id, texts);
            id = this.processTroopTexts(id, texts);
            id = this.processCommonEventTexts(id, texts);
            id = this.processMapTexts(id, texts);
            id = this.processPluginTexts(id, texts);
            for (let i=0; i<texts.length; i++) {
                const obj = texts[i];
                for (const language of LANGUAGES_TO_BE_SUPPORTED) {
                    if (i === 0) {
                        obj[language] = LANGUAGE_OPTION_NAMES[language];
                    } else {
                        if (language === SOURCE_LANGUAGE) continue;
                        obj[language] = "temp" + i;
                    }
                }
            }
            this.fsWriteFile(FILE_PATH, JsonEx.stringify(texts));
        };
    
        StorageManager.updateTextJson = function() {
            const lang = $dataI18nTexts[0];
            if (TARGET_LANGUAGE === "escape" || Object.keys(lang).includes(TARGET_LANGUAGE)) {
                let id = 1;
                id = this.processSystemTexts(id, $dataI18nTexts, true);
                id = this.processActorTexts(id, $dataI18nTexts, true);
                id = this.processClassTexts(id, $dataI18nTexts, true);
                id = this.processSkillTexts(id, $dataI18nTexts, true);
                id = this.processItemTexts(id, $dataI18nTexts, true);
                id = this.processWeaponTexts(id, $dataI18nTexts, true);
                id = this.processArmorTexts(id, $dataI18nTexts, true);
                id = this.processEnemyTexts(id, $dataI18nTexts, true);
                id = this.processStateTexts(id, $dataI18nTexts, true);
                id = this.processAnimationTexts(id, $dataI18nTexts, true);
                id = this.processTilesetTexts(id, $dataI18nTexts, true);
                id = this.processTroopTexts(id, $dataI18nTexts, true);
                id = this.processCommonEventTexts(id, $dataI18nTexts, true);
                id = this.processMapTexts(id, $dataI18nTexts, true);
                id = this.processPluginTexts(id, $dataI18nTexts, true);
            } else {
                lang[TARGET_LANGUAGE] = LANGUAGE_OPTION_NAMES[TARGET_LANGUAGE];
                for (let i=1; i<$dataI18nTexts.length; i++) $dataI18nTexts[i][TARGET_LANGUAGE] = "";
            }
            this.fsWriteFile(FILE_PATH, JsonEx.stringify($dataI18nTexts));
        };
    
        StorageManager.processAllTexts = function() {
            const jp = $dataSystem.locale.match(/^ja/);
            if (!SOURCE_LANGUAGE) {
                alert(jp ? ALERT_INVALID_SOURCE_JP : ALERT_INVALID_SOURCE_EN);
                return;
            }
            if (!TARGET_LANGUAGE) {
                alert(jp ? ALERT_INVALID_TARGET_JP : ALERT_INVALID_TARGET_EN);
                return;
            }
            if ($dataI18nTexts) {
                this.updateTextJson();
            } else {
                if (SOURCE_LANGUAGE === "escape") {
                    alert(jp ? ALERT_INITIAL_SOURCE_ESCAPE_JP : ALERT_INITIAL_SOURCE_ESCAPE_EN);
                    return;
                }
                if (TARGET_LANGUAGE !== "escape") {
                    alert(jp ? ALERT_INITIAL_TARGET_NOT_ESCAPE_JP : ALERT_INITIAL_TARGET_NOT_ESCAPE_EN);
                    return;
                }
                this.createTextJson();
            }
        };
    
    
        Scene_Boot.prototype.startNormalGame = function() {
            this.checkPlayerLocation();
            DataManager.setupNewGame();
            StorageManager.processAllTexts();
            SceneManager.terminate();
        };
    
    
    })();
}
