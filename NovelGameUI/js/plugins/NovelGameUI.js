//=============================================================================
// RPG Maker MZ - NovelGameUI
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Provides a novel-game like interface.
 * @author nz_prism
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/NovelGameUI/js/plugins/NovelGameUI.js
 * @base OptionEx
 * @orderAfter OptionEx
 *
 * @help NovelGameUI.js
 * ver. 1.0.2
 * 
 * [History]
 * 02/20/2022 1.0.0 Released
 * 02/21/2022 1.0.1 Fixed an error in the battle.
 * 03/12/2022 1.0.2 Fixed minor issues and supported ClickAnimation.js
 * 
 * This plugin provides a novel-game like interface usable when an event is
 * running on a map.
 * 
 * It requires OptionEx.js ver. 1.2.2 or later. Insert this plugin under
 * OptionEx.
 * 
 * It provides 6 functionalities;
 * 
 * 1. Options
 * 2. Save
 * 3. Load
 * 4. Log
 * 5. Skip
 * 6. Auto
 * 
 * You can select which functionality to use for the game. For example, you
 * can set it up to use only Log.
 * 
 * Each functionality corresponds to a button shown on the screen. Those
 * buttons appear only when the message window is shown. By tapping or clicking
 * the button, the corresponding functionality will be invoked. Also, you can
 * assign keys of a keyboard and buttons of a gamepad to the functionalities
 * to be used to invoke them by pressing.
 * If this plugin is enabled, players can use LT/RT buttons (as in XBox
 * controller) of a gamepad, which are basically disabled by MZ default. LT
 * button is used as tab key while RT as control key. Therefore, you can assign
 * the functionalities to the 6 buttons; X, Y, LB, RB, LT, RT by using the
 * plugin parameters.
 * Note when a message window is shown, players can usually proceed the message
 * by pressing either OK or Cancel button. However, if this plugin is enabled,
 * only OK button can be used for it. Thank you for your understanding!
 * 
 * By executing the plugin command "Disable Control Buttons", those buttons
 * will disappear. The corresponding keys/buttons will not work, either.
 * By executing the plugin command "Enable Control Buttons", the buttons will
 * appear and the corresponding keys/buttons will work again.
 * 
 * You can set pictures to each of the buttons. 2 patterns, selected and
 * unselected buttons, can be set.
 * 
 * 
 * 1. Options
 * The option scene will be invoked.
 * 
 * 
 * 2. Save
 * The save scene will be invoked even if an event is running. Note if save
 * access is disabled, the save scene won't be called and the buzzer SE will be
 * played.
 * 
 * 
 * 3. Load
 * The load scene will be invoked even if an event is running.
 * 
 * 
 * 4. Log
 * A back log scene will be invoked. If the plugin parameter "Use Log" is set
 * true, the texts shown by the event commands "Show Text" and "Show Scrolling
 * Text" will be stored. The log scene will show all the stored texts. Also, by
 * setting the plugin parameter "Add Log Command", the log scene can be invoked
 * from the menu, which enables players to see the log even after events finish
 * running. Since the stored texts are to be saved, they can be seen even after
 * loading. Delete logs by using the plugin command "Delete Logs", for the logs
 * are not autmatically deleted. Even though logs can be stored unlimitedly,
 * periodical delete is recommended to save save files' volume.
 * 
 * By using the plugin command "Disable Logging", texts will not be stored
 * thereafter. By using the plugin command "Enable Logging", it restores the
 * default behavior and texts will be stored again.
 * 
 * You can control whether the text being shown will be appear on the log scene
 * by setting the plugin parameter "Exclude Text Being Shown".
 * 
 * 
 * 5. Skip
 * Event commands at a range can be skipped. To use this functionality, you
 * have to set an event command "Label". To use labels for it, the label names
 * must be unique digits. First, set a label event with a digit name as a
 * starting point, such as "1". You can set any event commands, like Show Text,
 * to be skipped under it. Under them, set a label event as an ending pont with
 * a name of the digit for the starting point + 1, such as "2". I call the
 * event commands between the starting and ending points "Label Sandwich".
 * Since label sandwiches can be skipped by players, you shouldn't set event
 * commands required for the game flow, such as Control Switches. If an event
 * has 2 label sandwiches and you want to set event commands required for the
 * game flow between the sandwiches;
 * 
 *   Label:1
 *   Text:Reid, Actor1(0), Window, Bottom
 *   　　:Hello!
 *   Label:2
 *   Text:Priscilla, Actor1(1), Window, Bottom
 *   　　:(A message too important to be skipped)
 *   Control Switches:#0001 = ON
 *   Label:3
 *   Text:Gale, Actor1(2), Window, Bottom
 *   　　:Hello, Reid, Priscilla!
 *   Label:4
 * 
 * I call the first label sandwich "A" and the second "B". The ending point
 * of A is "2" and the starting point of B is "3". The event commands
 * between A and B, Text and Control Switches, can be skkiped since the label
 * names are sequential digits. To make them unskippable;
 * 
 *   Label:1
 *   Text:Reid, Actor1(0), Window, Bottom
 *   　　:Hello!
 *   Label:2
 *   Text:Priscilla, Actor1(1), Window, Bottom
 *   　　:(A message too important to be skipped)
 *   Control Switches:#0001 = ON
 *   Label:4
 *   Text:Gale, Actor1(2), Window, Bottom
 *   　　:Hello, Reid, Priscilla!
 *   Label:5
 * 
 * In this case, the commands can't be skipped since A and B aren't sequential
 * digits.
 * 
 * By default, players can skip only if the event contents have already been
 * seen. It regards them as "already seen" if the ending point label has been
 * passed. Since it uses the label names, some event commands can be skipped
 * unintentionally if there are duplicate label names. I recommend you to take
 * notes for used label names not to use them again!
 * 
 * If the plugin parameter "Make Master Save File" is set true (true by
 * default), it creates a new save file "master.rmmzsave", which stores passed
 * label names. To share passed flags, it will be loaded whichever save slot is
 * loaded, or a new game is started.
 * 
 * As mentioned above, players can skip only seen events by deafult. However,
 * if the option item "Only Seen Events Skippable" is set OFF, they can skip
 * even unseen events. By setting the plugin parameter "Use Only Seen Events
 * Skippable" true (true by default), the option item will be added to the
 * option scene. If you wouldn't like players to skip unseen events, set the
 * parameter false in order not to add the command. Plus, set the plugin
 * parameter "Default Only Seen Events Skippable" true (true by default).
 * 
 * If an event command being running is unskippable, the "Disabled" button
 * pictures will be shown while "Enabled" picture will appear if it's
 * skippable. They visually help players to see if it's skippable.
 * 
 * 
 * 6. Auto
 * If this functionality is invoked, the message window will move forward
 * automatically. It will not pause at the end of text and the control
 * character "\!" but wait for a specified frames. You can specify the frames
 * by the plugin parameter "Pause Frames".
 * 
 * If Auto is on, the "On" button picture will be shown while "Off" picture
 * will appear if auto is off. They visually help players to see if auto is
 * toggled.
 * 
 * 
 * This plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 * 
 * @param buttonOpacity
 * @text Button Opacity
 * @desc The opacity for each control buttons.
 * @type number
 * @default 192
 * 
 * @param options
 * @text Options
 * @desc The settings for Options.
 * 
 * @param useOptions
 * @text Use Options
 * @desc If true, Options functionality can be used.
 * @parent options
 * @type boolean
 * @default true
 * 
 * @param optionsKey
 * @text Options Key
 * @desc a key of a keyboard and a button of a gamepad assigned to Options.
 * @parent options
 * @default menu
 * @type select
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
 * @param optionsButtonImages
 * @text Button Images
 * @desc The image settings for Options button.
 * @parent options
 * 
 * @param optionsButtonUnselectedImageName
 * @text Options Button Unselected Image
 * @desc The image for unselected Options button.
 * @parent optionsButtonImages
 * @type file
 * @dir img/system
 * 
 * @param optionsButtonSelectedImageName
 * @text Options Button Selected Image
 * @desc The image for selected Options button.
 * @parent optionsButtonImages
 * @type file
 * @dir img/system
 * 
 * @param optionsButtonCoordinates
 * @text Button Coordinates
 * @desc The coordinate settings for Options button.
 * @parent options
 * 
 * @param optionsButtonX
 * @text Option Button X
 * @desc The X coordinate for Options Button.
 * @parent optionsButtonCoordinates
 * @type number
 * @default 268
 * 
 * @param optionsButtonY
 * @text Option Button Y
 * @desc The Y coordinate for Options Button.
 * @parent optionsButtonCoordinates
 * @type number
 * @default 556
 * 
 * @param optionsButtonOrigin
 * @text Options Button Origin
 * @desc The origin for Options button.
 * @parent optionsButtonCoordinates
 * @default 0.5
 * @type select
 * @option Upper Left
 * @value 0
 * @option Center
 * @value 0.5
 * 
 * @param save
 * @text Save
 * @desc The settings for Save.
 * 
 * @param useSave
 * @text Use Save
 * @desc If true, Save functionality can be used.
 * @parent save
 * @type boolean
 * @default true
 * 
 * @param saveKey
 * @text Save Key
 * @desc a key of a keyboard and a button of a gamepad assigned to Save.
 * @parent save
 * @default control
 * @type select
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
 * @param saveButtonImages
 * @text Button Images
 * @desc The image settings for Save button.
 * @parent save
 * 
 * @param saveButtonUnselectedImageName
 * @text Save Button Unselected Image
 * @desc The image for unselected Save button.
 * @parent saveButtonImages
 * @type file
 * @dir img/system
 * 
 * @param saveButtonSelectedImageName
 * @text Save Button Selected Image
 * @desc The image for selected Save button.
 * @parent saveButtonImages
 * @type file
 * @dir img/system
 * 
 * @param saveButtonCoordinates
 * @text Button Coordinates
 * @desc The coordinate settings for Save button.
 * @parent save
 * 
 * @param saveButtonX
 * @text Save Button X
 * @desc The X coordinate for Save Button.
 * @parent saveButtonCoordinates
 * @type number
 * @default 364
 * 
 * @param saveButtonY
 * @text Save Button Y
 * @desc The Y coordinate for Save Button.
 * @parent saveButtonCoordinates
 * @type number
 * @default 556
 * 
 * @param saveButtonOrigin
 * @text Save Button Origin
 * @desc The origin for Save button.
 * @parent saveButtonCoordinates
 * @default 0.5
 * @type select
 * @option Upper Left
 * @value 0
 * @option Center
 * @value 0.5
 * 
 * @param load
 * @text Load
 * @desc The settings for Load.
 * 
 * @param useLoad
 * @text Use Load
 * @desc If true, Load functionality can be used.
 * @parent load
 * @type boolean
 * @default true
 * 
 * @param loadKey
 * @text Load Key
 * @desc a key of a keyboard and a button of a gamepad assigned to Load.
 * @parent load
 * @default tab
 * @type select
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
 * @param loadButtonImages
 * @text Button Images
 * @desc The image settings for Load button.
 * @parent load
 * 
 * @param loadButtonUnselectedImageName
 * @text Load Button Unselected Image
 * @desc The image for unselected Load button.
 * @parent loadButtonImages
 * @type file
 * @dir img/system
 * 
 * @param loadButtonSelectedImageName
 * @text Load Button Selected Image
 * @desc The image for selected Load button.
 * @parent loadButtonImages
 * @type file
 * @dir img/system
 * 
 * @param loadButtonCoordinates
 * @text Button Coordinates
 * @desc The coordinates settings for Load button.
 * @parent load
 * 
 * @param loadButtonX
 * @text Load Button X
 * @desc The X coordinate for Load button.
 * @parent loadButtonCoordinates
 * @type number
 * @default 460
 * 
 * @param loadButtonY
 * @text Load Button Y
 * @desc The Y coordinate for Load button.
 * @parent loadButtonCoordinates
 * @type number
 * @default 556
 * 
 * @param loadButtonOrigin
 * @text Load Button Origin
 * @desc The origin for Load button.
 * @parent loadButtonCoordinates
 * @default 0.5
 * @type select
 * @option Upper Left
 * @value 0
 * @option Center
 * @value 0.5
 * 
 * @param log
 * @text Log
 * @desc The settings for Log.
 * 
 * @param useLog
 * @text Use Log
 * @desc If true, Log functionality can be used.
 * @parent log
 * @type boolean
 * @default true
 * 
 * @param logKey
 * @text Log Key
 * @desc a key of a keyboard and a button of a gamepad assigned to Log.
 * @parent log
 * @default pageup
 * @type select
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
 * @param excludeCurrentMessage
 * @text Exclude Text Being Shown
 * @desc If true, the text being shown will not be added to the log scene.
 * @parent log
 * @type boolean
 * @default true
 * 
 * @param logSpeakerNameHeader
 * @text Speaker Name Header String
 * @desc The string added before the speaker name usable to change size/color of the font.
 * @parent log
 * @type string
 * @default \C[14]\FS[20]
 * 
 * @param logMessagePads
 * @text Text Indent Spaces
 * @desc Number of spaces added before each lne. If the speaker name is blank, none will be added.
 * @parent log
 * @type number
 * @default 2
 * @min 0
 * 
 * @param addLogCommand
 * @text Add Log Command
 * @desc Add Log command to the menu.
 * @parent log
 * @type boolean
 * @default true
 * 
 * @param logCommandName
 * @text Log Command Name
 * @desc The name of the command to invoke the Log scene.
 * @parent addLogCommand
 * @type string
 * @default Back Log
 * 
 * @param logButtonImages
 * @text Button Images
 * @desc The settings for Log button.
 * @parent log
 * 
 * @param logButtonUnselectedImageName
 * @text Log Button Unselected Image
 * @desc The image for unselected Log button.
 * @parent logButtonImages
 * @type file
 * @dir img/system
 * 
 * @param logButtonSelectedImageName
 * @text Log Button Selected Image
 * @desc The image for selected Log button.
 * @parent logButtonImages
 * @type file
 * @dir img/system
 * 
 * @param logButtonCoordinates
 * @text Button Coordinates
 * @desc The coordinate settings for Log button.
 * @parent log
 * 
 * @param logButtonX
 * @text Log Button X
 * @desc The X coordinate for Log button.
 * @parent logButtonCoordinates
 * @type number
 * @default 556
 * 
 * @param logButtonY
 * @text Log Button Y
 * @desc The Y coordinate for Log button.
 * @parent logButtonCoordinates
 * @type number
 * @default 556
 * 
 * @param logButtonOrigin
 * @text Log Button Origin
 * @desc The origin for Log buton.
 * @parent logButtonCoordinates
 * @default 0.5
 * @type select
 * @option Upper Left
 * @value 0
 * @option Center
 * @value 0.5
 * 
 * @param skip
 * @text Skip
 * @desc The settings for Skip.
 * 
 * @param useSkip
 * @text Use Skip
 * @desc If true, Skip functionality can be used.
 * @parent skip
 * @type boolean
 * @default true
 * 
 * @param skipKey
 * @text Skip Key
 * @desc a key of a keyboard and a button of a gamepad assigned to Skip.
 * @parent skip
 * @default pagedown
 * @type select
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
 * @param makeMasterInfo
 * @text Make Master Save File
 * @desc Creates a master save file to share seen event information.
 * @parent skip
 * @default true
 * @type boolean
 * 
 * @param skipButtonImages
 * @text Button Images
 * @desc The image settings for Skip button.
 * @parent skip
 * 
 * @param skipButtonUnselectedDisabledImageName
 * @text Skip Button (Disabled) Unselected Image
 * @desc The image for unselected and disabled Skip button.
 * @parent skipButtonImages
 * @type file
 * @dir img/system
 * 
 * @param skipButtonSelectedDisabledImageName
 * @text Skip Button (Disabled) Selected Image
 * @desc The image for selected and disabled Skip button.
 * @parent skipButtonImages
 * @type file
 * @dir img/system
 * 
 * @param skipButtonUnselectedEnabledImageName
 * @text Skip Button (Enabled) Unselected Image
 * @desc The image for unselected and enabled Skip button.
 * @parent skipButtonImages
 * @type file
 * @dir img/system
 * 
 * @param skipButtonSelectedEnabledImageName
 * @text Skip Button (Enabled) Selected Image
 * @desc The image for selected and enabled Skip button.
 * @parent skipButtonImages
 * @type file
 * @dir img/system
 * 
 * @param skipButtonCoordinates
 * @text Button Coordinates
 * @desc The coordinate settings for Skip button.
 * @parent skip
 * 
 * @param skipButtonX
 * @text Skip Button X
 * @desc The X coordinate for Skip button.
 * @parent skipButtonCoordinates
 * @type number
 * @default 642
 * 
 * @param skipButtonY
 * @text Skip Button Y
 * @desc The Y coordinate for Skip button.
 * @parent skipButtonCoordinates
 * @type number
 * @default 556
 * 
 * @param skipButtonOrigin
 * @text Skip Button Origin
 * @desc The origin for Skip button.
 * @parent skipButtonCoordinates
 * @default 0.5
 * @type select
 * @option Upper Left
 * @value 0
 * @option Center
 * @value 0.5
 * 
 * @param skipOptions
 * @text Skip Option
 * @desc The settings for Skip option.
 * @parent skip
 * 
 * @param useLimitSkip
 * @text Use Only Seen Events Skippable
 * @desc If true, Only Seen Events Skippable option will be added to the options scene.
 * @parent skipOptions
 * @default true
 * @type boolean
 * 
 * @param limitSkipName
 * @text Only Seen Events Skippable Name
 * @desc The name for Only Seen Events Skippable option.
 * @default Only Seen Events Skippable
 * @parent skipOptions
 * @type string
 * 
 * @param defaultLimitSkip
 * @text Default Only Seen Events Skippable
 * @desc The default value for Only Seen Events Skippable option.
 * @parent skipOptions
 * @default true
 * @type boolean
 * 
 * @param auto
 * @text Auto
 * @desc The settings for Auto.
 * 
 * @param useAuto
 * @text Use Auto
 * @desc If true, Auto functionality can be used.
 * @parent auto
 * @type boolean
 * @default true
 * 
 * @param autoKey
 * @text Auto Key
 * @desc a key of a keyboard and a button of a gamepad assigned to Auto.
 * @parent auto
 * @default shift
 * @type select
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
 * @param autoPauseFrames
 * @text Pause Frames
 * @desc The frames to wait of the message windoow.
 * @parent auto
 * @type number
 * @default 30
 * 
 * @param autoButtonImages
 * @text Button Images
 * @desc The image settings for Auto button.
 * @parent auto
 * 
 * @param autoButtonUnselectedOffImageName
 * @text Auto Button (Off) Unselected Image
 * @desc The image for unselected and off Auto button.
 * @parent autoButtonImages
 * @type file
 * @dir img/system
 * 
 * @param autoButtonSelectedOffImageName
 * @text Auto Button (Off) Selected Image
 * @desc The image for selected and off Auto button.
 * @parent autoButtonImages
 * @type file
 * @dir img/system
 * 
 * @param autoButtonUnselectedOnImageName
 * @text Auto Button (On) Unselected Image
 * @desc The image for unselected and on Auto button.
 * @parent autoButtonImages
 * @type file
 * @dir img/system
 * 
 * @param autoButtonSelectedOnImageName
 * @text Auto Button (On) Selected Image
 * @desc The image for selected and on Auto button.
 * @parent autoButtonImages
 * @type file
 * @dir img/system
 * 
 * @param autoButtonCoordinates
 * @text Button Coordinates
 * @desc The coordinate settings for Auto button.
 * @parent auto
 * 
 * @param autoButtonX
 * @text Auto Button X
 * @desc The X coordinate for Auto button.
 * @parent autoButtonCoordinates
 * @type number
 * @default 748
 * 
 * @param autoButtonY
 * @text Auto Button Y
 * @desc The Y coordinate for Auto button.
 * @parent autoButtonCoordinates
 * @type number
 * @default 556
 * 
 * @param autoButtonOrigin
 * @text Auto Button Origin
 * @desc The origin for Auto button.
 * @parent autoButtonCoordinates
 * @default 0.5
 * @type select
 * @option Upper Left
 * @value 0
 * @option Center
 * @value 0.5
 * 
 * 
 * @command enableControlButtons
 * @text Enable Control Buttons
 * @desc Enables each control button.
 * 
 * @command disableControlButtons
 * @text Disable Control Buttons
 * @desc Disables each control button.
 * 
 * @command enableLogging
 * @text Enable Logging
 * @desc The texts will be stored.
 * 
 * @command disableLogging
 * @text Disable Logging
 * @desc The texts will not be stored until enabling logging.
 * 
 * @command clearBackLogs
 * @text Delete Logs
 * @desc Deletes all the stored logs.
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc ノベルゲーム風インターフェースを提供します。
 * @author nz_prism
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/NovelGameUI/js/plugins/NovelGameUI.js
 * @base OptionEx
 * @orderAfter OptionEx
 *
 * @help NovelGameUI.js
 * ver. 1.0.2
 * 
 * [バージョン履歴]
 * 2022/02/20 1.0.0 リリース
 * 2022/02/21 1.0.1 戦闘に入るとエラーになる問題を修正
 * 2022/03/12 1.0.2 微バグの修正およびClickAnimation.jsに対応
 * 
 * このプラグインは、マップでのイベント実行中に使用可能なノベルゲーム風インター
 * フェースを提供します。
 * 
 * 本プラグインは「オプション拡張（OptionEx.js）」プラグインのバージョン1.2.2
 * （以降）の導入が前提となります。OptionExよりも後に配置してください。
 * 
 * 以下の６種類の機能が利用できます。
 * 
 * 1. オプション
 * 2. セーブ
 * 3. ロード
 * 4. ログ
 * 5. スキップ
 * 6. オート
 * 
 * 上記機能はいずれも使用するかどうかを個別に選択できます。例えばログ機能だけを
 * 使用する、といったことも可能です。
 * 
 * いずれの機能もそれを呼び出すためのボタンを画面上に表示することができます。こ
 * れらのボタンが表示されるのはメッセージイベント表示時のみであるという点にご注
 * 意ください。ボタンをタップやクリックすることで、対応する上記機能が実行されま
 * す。また、各機能にはキーボードやゲームパッドのキーを割り当てることが可能であ
 * り、それらを押下することでも対応機能を実行できます。
 * なお本プラグインを導入すると、MZデフォルトでは何も機能が割り当てられていない
 * ボタンであるゲームパッドのLT・RTボタン（XBoxコントローラーにおける名称）に
 * それぞれ機能が割り当てられます。LTボタンにはtabキーが、RTボタンにはcontrol
 * キーが割り当てられます。それらを含めX・Y・LB・RB・LT・RTの６つのボタンにそ
 * れぞれ割り当てることが可能です。実際のキー割り当てにはプラグインパラメータを
 * 使用します。
 * MZデフォルトではメッセージ表示時、決定ボタンだけでなくキャンセルボタンで
 * もメッセージ送りができますが、本プラグインを導入するとキャンセルボタンでは
 * メッセージ送りができなくなります。あらかじめご了承ください。
 * 
 * プラグインコマンド「制御ボタンの無効化」を使用すると、上記ボタンがすべて表示
 * されなくなります。対応するキー/ボタンを押下してもその機能は実行されません。
 * プラグインコマンド「制御ボタンの有効化」を使用することで再びボタンが表示さ
 * れ、対応キーに反応するようになります。
 * 
 * 各ボタンには専用の画像を設定することができます。選択（マウスオーバーされてい
 * る）時と未選択時とで別々の画像を設定することができます。
 * 
 * 
 * 1. オプション
 * オプション画面を呼び出すことができます。
 * 
 * 
 * 2. セーブ
 * セーブ画面を呼び出すことができます。イベントの実行中であってもセーブ可能で
 * す。なおイベントによってセーブが禁止されている場合、セーブ不可になります。
 * その状態でこのボタンを押すとブザー音が演奏されます。
 * 
 * 
 * 3. ロード
 * ロード画面を呼び出すことができます。イベントの実行中であってもロード可能で
 * す。
 * 
 * 
 * 4. ログ
 * バックログ画面を呼び出すことができます。ログを有効にすると「文章の表示」お
 * よび「文章のスクロール表示」で表示された文章がすべて保存されるようになりま
 * す。バックログ画面では保存された文章を一覧表示できます。また、プラグインパ
 * ラメータ「ログコマンドの追加」をオンにすることでバックログ画面をメニューか
 * ら呼び出すためのコマンドを追加することが可能です。これにより、イベントが終
 * 了してもログを閲覧できます。保存された文章はセーブ対象ですので、ロードすれ
 * ば再度表示できます。ログが自動的に消去されることはありませんので、プラグイ
 * ンコマンド「ログの消去」を適切なタイミングで実行して消去してください。保存
 * できるログの量に制限はありませんが、あまりにも溜まりすぎるとセーブデータ容
 * 量が肥大化します。
 * 
 * プラグインコマンド「ログ保存の無効化」を使用すると、以降のイベントにてログ
 * が保存されなくなります。プラグインコマンド「ログ保存の有効化」を使用するこ
 * とで元に戻り、ログが再び保存されるようになります。
 * 
 * いま表示されているメッセージもログに含めるかどうかは、プラグインパラメータ
 * 「表示中メッセージをログから除外」によって設定できます。
 * 
 * 
 * 5. スキップ
 * ある一定範囲のイベントコマンドの実行をスキップすることができます。この機能
 * を使用するには、イベントにイベントコマンド「ラベル」を設定する必要がありま
 * す。ラベルには本来どんな名前でもつけることができますが、この機能を利用する
 * ためにはラベル名を一意の半角数字にする必要があります。設定するには、まずス
 * キップの開始地点となる場所に半角数字の名前を持つラベルを設定します（例えば
 * 「1」）。その下にスキップ対象となるイベント（文章表示など）を任意の数だけ
 * 設定します。その下に、スキップ終了地点を表すラベルを配置します。このラベル
 * の名前は、必ず始点ラベル名 +1 にする必要があります（上記例では「2」にしま
 * す）。この始点・終点ラベルに挟まれたイベントコマンド群を「ラベルサンドイッ
 * チ」と呼称します。ラベルサンドイッチはプレイヤーによってスキップされる可能
 * 性のあるイベントですので、ゲームの進行に必須のイベント（スイッチの操作な
 * ど）を配置すべきではありません。あるイベントにラベルサンドイッチが2回登場
 * し、それらの間にゲーム進行に必須のイベントを配置したいとします。例えば以下
 * のような内容です。
 * 
 *   ラベル:1
 *   文章:リード, Actor1(0), ウィンドウ, 下
 *   　　:おはよう
 *   ラベル:2
 *   文章:プリシア, Actor1(1), ウィンドウ, 下
 *   　　:（重要なのでスキップされたくないセリフ）
 *   スイッチの操作:#0001 = ON
 *   ラベル:3
 *   文章:ゲイル, Actor1(2), ウィンドウ, 下
 *   　　:おはよう、リード、プリシア
 *   ラベル:4
 * 
 * 最初のラベルサンドイッチをA、次のサンドイッチをBとします。Aの終点であるラベ
 * ル名は「2」ですが、Bの始点は「3」です。これらの名前は連番なので、間にある文
 * 章表示とスイッチ操作はスキップされてしまう可能性があります。これを防ぐために
 * は、ラベルサンドイッチBのラベル名を以下のようにしてください。
 * 
 *   ラベル:1
 *   文章:リード, Actor1(0), ウィンドウ, 下
 *   　　:おはよう
 *   ラベル:2
 *   文章:プリシア, Actor1(1), ウィンドウ, 下
 *   　　:（重要なのでスキップされたくないセリフ）
 *   スイッチの操作:#0001 = ON
 *   ラベル:4
 *   文章:ゲイル, Actor1(2), ウィンドウ, 下
 *   　　:おはよう、リード、プリシア
 *   ラベル:5
 * 
 * この場合、AとBは連番でないのでそれらの間のイベントコマンドはスキップ不可にす
 * ることができます。
 * 
 * デフォルトではスキップ可能なのは既読イベントのみです。あるラベルサンドイッチ
 * が「既読」であるかどうかは、そのサンドイッチの終点ラベルを一度でも通過したこ
 * とがあるかどうかによって判定されます。通過済みラベル名はセーブデータに保存さ
 * れます。通過済みであるかどうかはラベル名によって判定されるので、ラベル名が重
 * 複すると未読なのに既読とみなされてしまいます。そのため一度使用したラベル名は
 * メモを取るなどして、ゲーム全体を通して2回以上使うことがないようにしてくださ
 * い。
 * 
 * プラグインパラメータ「マスターセーブファイルの作成」をオンにすると（デフォル
 * トはオンです）、既読フラグを格納する「master.rmmzsave」というセーブファイ
 * ルが新たに作成されるようになります。これはどのセーブスロットをロードしたとし
 * ても、あるいはニューゲームから始めたとしても、ゲーム開始時に読み込まれます。
 * つまり既読フラグをセーブデータをまたいで持ち越すことが可能になります。
 * 
 * 上記のように通常は既読イベントしかスキップできませんが、「既読のみスキップ可
 * 能」というオプションをオフにすると未読イベントもスキップできるようになりま
 * す。このオプションはプラグインパラメータ「既読のみスキップ可能の使用」をオン
 * にする（デフォルトはオンです）ことでオプション画面に追加されます。プレイヤー
 * に未読イベントをスキップさせたくない場合、このパラメータをオフにしてくださ
 * い。またプラグインパラメータ「デフォルト既読のみスキップ可能」をオンにしてく
 * ださい（デフォルトはオンです）。このように設定することでゲーム中に設定が変更
 * されなくなり、既読しかスキップできない状態に固定できます。
 * 
 * いま実行されているイベントが未読であるなどによりスキップできない場合、ボタン
 * 画像が「スキップ不可」として設定したものになります。スキップ可能である場合は
 * 「スキップ可」として設定した画像が表示されます。これにより、スキップ可能かど
 * うかを視覚的に表現できます。
 * 
 * 
 * 6. オート
 * メッセージ送りが自動的に行われるようになります。メッセージの最後や制御文字
 * 「\!」による入力待ちが行われなくなり、代わりにウェイトします。ウェイトする時
 * 間はプラグインパラメータ「ポーズフレーム数」により指定できます。
 * 
 * オートがオンになっている場合、「オン」として設定した画像が表示されます。オフ
 * の場合は「オフ」として設定した画像が表示されます。これにより、オートのオンオ
 * フを視覚的に表現できます。
 * 
 * 
 * このプラグインはMITライセンスにてリリースされています。
 * https://opensource.org/licenses/mit-license.php
 * 
 * 
 * @param buttonOpacity
 * @text ボタン不透明度
 * @desc 各制御ボタンの不透明度です。
 * @type number
 * @default 192
 * 
 * @param options
 * @text オプション
 * @desc オプションに関する設定です。
 * 
 * @param useOptions
 * @text オプション有効化
 * @desc オンにするとオプションが使用可能になります。
 * @parent options
 * @type boolean
 * @default true
 * 
 * @param optionsKey
 * @text オプションキー
 * @desc オプションに割り当てるキーボード/ゲームパッドのキー/ボタンです。
 * @parent options
 * @default menu
 * @type select
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
 * @param optionsButtonImages
 * @text ボタン画像
 * @desc オプションボタンの画像に関する設定です。
 * @parent options
 * 
 * @param optionsButtonUnselectedImageName
 * @text オプションボタン未選択画像
 * @desc 未選択状態のオプションボタンの画像です。
 * @parent optionsButtonImages
 * @type file
 * @dir img/system
 * 
 * @param optionsButtonSelectedImageName
 * @text オプションボタン選択画像
 * @desc 選択状態のオプションボタンの画像です。
 * @parent optionsButtonImages
 * @type file
 * @dir img/system
 * 
 * @param optionsButtonCoordinates
 * @text ボタン座標
 * @desc オプションボタンの座標に関する設定です。
 * @parent options
 * 
 * @param optionsButtonX
 * @text オプションボタンX座標
 * @desc オプションボタンのX座標です。
 * @parent optionsButtonCoordinates
 * @type number
 * @default 268
 * 
 * @param optionsButtonY
 * @text オプションボタンY座標
 * @desc オプションボタンのY座標です。
 * @parent optionsButtonCoordinates
 * @type number
 * @default 556
 * 
 * @param optionsButtonOrigin
 * @text オプションボタン原点
 * @desc オプションボタンの原点です。
 * @parent optionsButtonCoordinates
 * @default 0.5
 * @type select
 * @option 左上
 * @value 0
 * @option 中央
 * @value 0.5
 * 
 * @param save
 * @text セーブ
 * @desc セーブに関する設定です。
 * 
 * @param useSave
 * @text セーブ有効化
 * @desc オンにするとセーブが使用可能になります。
 * @parent save
 * @type boolean
 * @default true
 * 
 * @param saveKey
 * @text セーブキー
 * @desc セーブに割り当てるキーボード/ゲームパッドのキー/ボタンです。
 * @parent save
 * @default control
 * @type select
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
 * @param saveButtonImages
 * @text ボタン画像
 * @desc セーブボタンの画像に関する設定です。
 * @parent save
 * 
 * @param saveButtonUnselectedImageName
 * @text セーブボタン未選択画像
 * @desc 未選択状態のセーブボタンの画像です。
 * @parent saveButtonImages
 * @type file
 * @dir img/system
 * 
 * @param saveButtonSelectedImageName
 * @text セーブボタン選択画像
 * @desc 選択状態のセーブボタンの画像です。
 * @parent saveButtonImages
 * @type file
 * @dir img/system
 * 
 * @param saveButtonCoordinates
 * @text ボタン座標
 * @desc セーブボタンの座標に関する設定です。
 * @parent save
 * 
 * @param saveButtonX
 * @text セーブボタンX座標
 * @desc セーブボタンのX座標です。
 * @parent saveButtonCoordinates
 * @type number
 * @default 364
 * 
 * @param saveButtonY
 * @text セーブボタンY座標
 * @desc セーブボタンのY座標です。
 * @parent saveButtonCoordinates
 * @type number
 * @default 556
 * 
 * @param saveButtonOrigin
 * @text セーブボタン原点
 * @desc セーブボタンの原点です。
 * @parent saveButtonCoordinates
 * @default 0.5
 * @type select
 * @option 左上
 * @value 0
 * @option 中央
 * @value 0.5
 * 
 * @param load
 * @text ロード
 * @desc ロードに関する設定です。
 * 
 * @param useLoad
 * @text ロード有効化
 * @desc オンにするとロードが使用可能になります。
 * @parent load
 * @type boolean
 * @default true
 * 
 * @param loadKey
 * @text ロードキー
 * @desc ロードに割り当てるキーボード/ゲームパッドのキー/ボタンです。
 * @parent load
 * @default tab
 * @type select
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
 * @param loadButtonImages
 * @text ボタン画像
 * @desc ロードボタンの画像に関する設定です。
 * @parent load
 * 
 * @param loadButtonUnselectedImageName
 * @text ロードボタン未選択画像
 * @desc 未選択状態のロードボタンの画像です。
 * @parent loadButtonImages
 * @type file
 * @dir img/system
 * 
 * @param loadButtonSelectedImageName
 * @text ロードボタン選択画像
 * @desc 選択状態のロードボタンの画像です。
 * @parent loadButtonImages
 * @type file
 * @dir img/system
 * 
 * @param loadButtonCoordinates
 * @text ボタン座標
 * @desc ロードボタンの座標に関する設定です。
 * @parent load
 * 
 * @param loadButtonX
 * @text ロードボタンX座標
 * @desc ロードボタンのX座標です。
 * @parent loadButtonCoordinates
 * @type number
 * @default 460
 * 
 * @param loadButtonY
 * @text ロードボタンY座標
 * @desc ロードボタンのY座標です。
 * @parent loadButtonCoordinates
 * @type number
 * @default 556
 * 
 * @param loadButtonOrigin
 * @text ロードボタン原点
 * @desc ロードボタンの原点です。
 * @parent loadButtonCoordinates
 * @default 0.5
 * @type select
 * @option 左上
 * @value 0
 * @option 中央
 * @value 0.5
 * 
 * @param log
 * @text ログ
 * @desc ログに関する設定です。
 * 
 * @param useLog
 * @text ログ有効化
 * @desc オンにするとログが使用可能になります。
 * @parent log
 * @type boolean
 * @default true
 * 
 * @param logKey
 * @text ログキー
 * @desc ログに割り当てるキーボード/ゲームパッドのキー/ボタンです。
 * @parent log
 * @default pageup
 * @type select
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
 * @param excludeCurrentMessage
 * @text 表示中メッセージをログから除外
 * @desc 現在表示されているメッセージをログから除外します。
 * @parent log
 * @type boolean
 * @default true
 * 
 * @param logSpeakerNameHeader
 * @text メッセージ話者名先頭付加文字列
 * @desc フォントの色やサイズの変更などに利用する、メッセージの話者名の先頭に付加する文字列です。
 * @parent log
 * @type string
 * @default \C[14]\FS[20]
 * 
 * @param logMessagePads
 * @text メッセージ本文行頭スペース数
 * @desc 字下げのためにメッセージ本文の各行頭に付加する半角スペースの数です。話者名が空欄の場合、付加されません。
 * @parent log
 * @type number
 * @default 2
 * @min 0
 * 
 * @param addLogCommand
 * @text ログコマンドの追加
 * @desc メニュー画面にログ閲覧用コマンドを追加します。
 * @parent log
 * @type boolean
 * @default true
 * 
 * @param logCommandName
 * @text ログコマンド名
 * @desc ログ閲覧用コマンドの表示名です。
 * @parent addLogCommand
 * @type string
 * @default バックログ
 * 
 * @param logButtonImages
 * @text ボタン画像
 * @desc ログボタンの画像に関する設定です。
 * @parent log
 * 
 * @param logButtonUnselectedImageName
 * @text ログボタン未選択画像
 * @desc 未選択状態のログボタンの画像です。
 * @parent logButtonImages
 * @type file
 * @dir img/system
 * 
 * @param logButtonSelectedImageName
 * @text ログボタン選択画像
 * @desc 選択状態のログボタンの画像です。
 * @parent logButtonImages
 * @type file
 * @dir img/system
 * 
 * @param logButtonCoordinates
 * @text ボタン座標
 * @desc ログボタンの座標に関する設定です。
 * @parent log
 * 
 * @param logButtonX
 * @text ログボタンX座標
 * @desc ログボタンのX座標です。
 * @parent logButtonCoordinates
 * @type number
 * @default 556
 * 
 * @param logButtonY
 * @text ログボタンY座標
 * @desc ログボタンのY座標です。
 * @parent logButtonCoordinates
 * @type number
 * @default 556
 * 
 * @param logButtonOrigin
 * @text ログボタン原点
 * @desc ログボタンの原点です。
 * @parent logButtonCoordinates
 * @default 0.5
 * @type select
 * @option 左上
 * @value 0
 * @option 中央
 * @value 0.5
 * 
 * @param skip
 * @text スキップ
 * @desc スキップに関する設定です。
 * 
 * @param useSkip
 * @text スキップ有効化
 * @desc オンにするとスキップが使用可能になります。
 * @parent skip
 * @type boolean
 * @default true
 * 
 * @param skipKey
 * @text スキップキー
 * @desc スキップに割り当てるキーボード/ゲームパッドのキー/ボタンです。
 * @parent skip
 * @default pagedown
 * @type select
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
 * @param makeMasterInfo
 * @text マスターセーブファイルの作成
 * @desc ニューゲームにも既読情報を反映するための、既読情報が含まれるマスターセーブファイルを作成します。
 * @parent skip
 * @default true
 * @type boolean
 * 
 * @param skipButtonImages
 * @text ボタン画像
 * @desc スキップボタンの画像に関する設定です。
 * @parent skip
 * 
 * @param skipButtonUnselectedDisabledImageName
 * @text スキップボタン（スキップ不可）未選択画像
 * @desc 未選択かつスキップ不可状態のスキップボタンの画像です。
 * @parent skipButtonImages
 * @type file
 * @dir img/system
 * 
 * @param skipButtonSelectedDisabledImageName
 * @text スキップボタン（スキップ不可）選択画像
 * @desc 選択かつスキップ不可状態のスキップボタンの画像です。
 * @parent skipButtonImages
 * @type file
 * @dir img/system
 * 
 * @param skipButtonUnselectedEnabledImageName
 * @text スキップボタン（スキップ可）未選択画像
 * @desc 未選択かつスキップ可能状態のスキップボタンの画像です。
 * @parent skipButtonImages
 * @type file
 * @dir img/system
 * 
 * @param skipButtonSelectedEnabledImageName
 * @text スキップボタン（スキップ可）選択画像
 * @desc 選択かつスキップ可能状態のスキップボタンの画像です。
 * @parent skipButtonImages
 * @type file
 * @dir img/system
 * 
 * @param skipButtonCoordinates
 * @text ボタン座標
 * @desc スキップボタンの座標に関する設定です。
 * @parent skip
 * 
 * @param skipButtonX
 * @text スキップボタンX座標
 * @desc スキップボタンのX座標です。
 * @parent skipButtonCoordinates
 * @type number
 * @default 642
 * 
 * @param skipButtonY
 * @text スキップボタンY座標
 * @desc スキップボタンのY座標です。
 * @parent skipButtonCoordinates
 * @type number
 * @default 556
 * 
 * @param skipButtonOrigin
 * @text スキップボタン原点
 * @desc スキップボタンの原点です。
 * @parent skipButtonCoordinates
 * @default 0.5
 * @type select
 * @option 左上
 * @value 0
 * @option 中央
 * @value 0.5
 * 
 * @param skipOptions
 * @text オプション
 * @desc スキップに関するオプション画面の設定です。
 * @parent skip
 * 
 * @param useLimitSkip
 * @text 既読のみスキップ可能の使用
 * @desc 既読のみスキップ可能オプションを使用するかどうかを設定してください。
 * @parent skipOptions
 * @default true
 * @type boolean
 * 
 * @param limitSkipName
 * @text 既読のみスキップ可能表示名
 * @desc 既読のみスキップ可能の表示名を設定してください。
 * @default 既読のみスキップ可能
 * @parent skipOptions
 * @type string
 * 
 * @param defaultLimitSkip
 * @text デフォルト既読のみスキップ可能
 * @desc 既読のみスキップ可能のデフォルト値です。
 * @parent skipOptions
 * @default true
 * @type boolean
 * 
 * @param auto
 * @text オート
 * @desc オートに関する設定です。
 * 
 * @param useAuto
 * @text オート有効化
 * @desc オンにするとオートが使用可能になります。
 * @parent auto
 * @type boolean
 * @default true
 * 
 * @param autoKey
 * @text オートキー
 * @desc オートに割り当てるキーボード/ゲームパッドのキー/ボタンです。
 * @parent auto
 * @default shift
 * @type select
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
 * @param autoPauseFrames
 * @text ポーズフレーム数
 * @desc ポーズ状態でのウェイトフレーム数です。
 * @parent auto
 * @type number
 * @default 30
 * 
 * @param autoButtonImages
 * @text ボタン画像
 * @desc オートボタンの画像に関する設定です。
 * @parent auto
 * 
 * @param autoButtonUnselectedOffImageName
 * @text オートボタン（オフ）未選択画像
 * @desc 未選択かつオフ状態のオートボタンの画像です。
 * @parent autoButtonImages
 * @type file
 * @dir img/system
 * 
 * @param autoButtonSelectedOffImageName
 * @text オートボタン（オフ）選択画像
 * @desc 選択かつオフ状態のオートボタンの画像です。
 * @parent autoButtonImages
 * @type file
 * @dir img/system
 * 
 * @param autoButtonUnselectedOnImageName
 * @text オートボタン（オン）未選択画像
 * @desc 未選択かつオン状態のオートボタンの画像です。
 * @parent autoButtonImages
 * @type file
 * @dir img/system
 * 
 * @param autoButtonSelectedOnImageName
 * @text オートボタン（オン）選択画像
 * @desc 選択かつオン状態のオートボタンの画像です。
 * @parent autoButtonImages
 * @type file
 * @dir img/system
 * 
 * @param autoButtonCoordinates
 * @text ボタン座標
 * @desc オートボタンの座標に関する設定です。
 * @parent auto
 * 
 * @param autoButtonX
 * @text オートボタンX座標
 * @desc オートボタンのX座標です。
 * @parent autoButtonCoordinates
 * @type number
 * @default 748
 * 
 * @param autoButtonY
 * @text オートボタンY座標
 * @desc オートボタンのY座標です。
 * @parent autoButtonCoordinates
 * @type number
 * @default 556
 * 
 * @param autoButtonOrigin
 * @text オートボタン原点
 * @desc オートボタンの原点です。
 * @parent autoButtonCoordinates
 * @default 0.5
 * @type select
 * @option 左上
 * @value 0
 * @option 中央
 * @value 0.5
 * 
 * 
 * @command enableControlButtons
 * @text 制御ボタンの有効化
 * @desc 各制御ボタンを有効化します。
 * 
 * @command disableControlButtons
 * @text 制御ボタンの無効化
 * @desc 各制御ボタンを無効化します。
 * 
 * @command enableLogging
 * @text ログ保存の有効化
 * @desc ログが保存されるようになります。
 * 
 * @command disableLogging
 * @text ログ保存の無効化
 * @desc ログ保存を有効化するまでログを保存しないようになります。
 * 
 * @command clearBackLogs
 * @text ログの消去
 * @desc 保存されているすべてのログを消去します。
 * 
 */


(() => {
    'use strict';
    const PLUGIN_NAME = "NovelGameUI";
    const pluginParams = PluginManager.parameters(PLUGIN_NAME);


    const BUTTON_OPACITY = Number(pluginParams.buttonOpacity);

    const USE_OPTIONS = pluginParams.useOptions === "true";
    const OPTIONS_KEY = pluginParams.optionsKey;
    const OPTIONS_BUTTON_UNSELECTED_IMAGE_NAME = pluginParams.optionsButtonUnselectedImageName;
    const OPTIONS_BUTTON_SELECTED_IMAGE_NAME = pluginParams.optionsButtonSelectedImageName;
    const OPTIONS_BUTTON_X = Number(pluginParams.optionsButtonX);
    const OPTIONS_BUTTON_Y = Number(pluginParams.optionsButtonY);
    const OPTIONS_BUTTON_ORIGIN = Number(pluginParams.optionsButtonOrigin);

    const USE_SAVE = pluginParams.useSave === "true";
    const SAVE_KEY = pluginParams.saveKey;
    const SAVE_BUTTON_UNSELECTED_IMAGE_NAME = pluginParams.saveButtonUnselectedImageName;
    const SAVE_BUTTON_SELECTED_IMAGE_NAME = pluginParams.saveButtonSelectedImageName;
    const SAVE_BUTTON_X = Number(pluginParams.saveButtonX);
    const SAVE_BUTTON_Y = Number(pluginParams.saveButtonY);
    const SAVE_BUTTON_ORIGIN = Number(pluginParams.saveButtonOrigin);

    const USE_LOAD = pluginParams.useLoad === "true";
    const LOAD_KEY = pluginParams.loadKey;
    const LOAD_BUTTON_UNSELECTED_IMAGE_NAME = pluginParams.loadButtonUnselectedImageName;
    const LOAD_BUTTON_SELECTED_IMAGE_NAME = pluginParams.loadButtonSelectedImageName;
    const LOAD_BUTTON_X = Number(pluginParams.loadButtonX);
    const LOAD_BUTTON_Y = Number(pluginParams.loadButtonY);
    const LOAD_BUTTON_ORIGIN = Number(pluginParams.loadButtonOrigin);

    const USE_LOG = pluginParams.useLog === "true";
    const LOG_KEY = pluginParams.logKey;
    const EXCLUDE_CURRENT_MESSAGE = pluginParams.excludeCurrentMessage === "true";
    const LOG_SPEAKER_NAME_HEADER = pluginParams.logSpeakerNameHeader;
    const LOG_MESSAGE_PADS = Number(pluginParams.logMessagePads);
    const ADD_LOG_COMMAND = pluginParams.addLogCommand === "true";
    const LOG_COMMAND_NAME = pluginParams.logCommandName;
    const LOG_BUTTON_UNSELECTED_IMAGE_NAME = pluginParams.logButtonUnselectedImageName;
    const LOG_BUTTON_SELECTED_IMAGE_NAME = pluginParams.logButtonSelectedImageName;
    const LOG_BUTTON_X = Number(pluginParams.logButtonX);
    const LOG_BUTTON_Y = Number(pluginParams.logButtonY);
    const LOG_BUTTON_ORIGIN = Number(pluginParams.logButtonOrigin);

    const USE_SKIP = pluginParams.useSkip === "true";
    const SKIP_KEY = pluginParams.skipKey;
    const MAKE_MASTER_INFO = pluginParams.makeMasterInfo === "true";
    const SKIP_BUTTON_UNSELECTED_DISABLED_IMAGE_NAME = pluginParams.skipButtonUnselectedDisabledImageName;
    const SKIP_BUTTON_SELECTED_DISABLED_IMAGE_NAME = pluginParams.skipButtonSelectedDisabledImageName;
    const SKIP_BUTTON_UNSELECTED_ENABLED_IMAGE_NAME = pluginParams.skipButtonUnselectedEnabledImageName;
    const SKIP_BUTTON_SELECTED_ENABLED_IMAGE_NAME = pluginParams.skipButtonSelectedEnabledImageName;
    const SKIP_BUTTON_X = Number(pluginParams.skipButtonX);
    const SKIP_BUTTON_Y = Number(pluginParams.skipButtonY);
    const SKIP_BUTTON_ORIGIN = Number(pluginParams.skipButtonOrigin);

    const USE_LIMIT_SKIP = pluginParams.useLimitSkip === "true";
    const LIMIT_SKIP_NAME = pluginParams.limitSkipName;
    const DEFAULT_LIMIT_SKIP = pluginParams.defaultLimitSkip === "true";


    const USE_AUTO = pluginParams.useAuto === "true";
    const AUTO_KEY = pluginParams.autoKey;
    const AUTO_PAUSE_FRAMES = Number(pluginParams.autoPauseFrames);
    const AUTO_BUTTON_UNSELECTED_OFF_IMAGE_NAME = pluginParams.autoButtonUnselectedOffImageName;
    const AUTO_BUTTON_SELECTED_OFF_IMAGE_NAME = pluginParams.autoButtonSelectedOffImageName;
    const AUTO_BUTTON_UNSELECTED_ON_IMAGE_NAME = pluginParams.autoButtonUnselectedOnImageName;
    const AUTO_BUTTON_SELECTED_ON_IMAGE_NAME = pluginParams.autoButtonSelectedOnImageName;
    const AUTO_BUTTON_X = Number(pluginParams.autoButtonX);
    const AUTO_BUTTON_Y = Number(pluginParams.autoButtonY);
    const AUTO_BUTTON_ORIGIN = Number(pluginParams.autoButtonOrigin);

    const LOG_FOOTER = "\\C[0]\\FS[%1]";


    PluginManager.registerCommand(PLUGIN_NAME, "enableControlButtons", args => {
        $gameSystem.enableControlButtons();
    });

    PluginManager.registerCommand(PLUGIN_NAME, "disableControlButtons", args => {
        $gameSystem.disableControlButtons();
    });

    PluginManager.registerCommand(PLUGIN_NAME, "enableLogging", args => {
        $gameSystem.enableLogging();
    });

    PluginManager.registerCommand(PLUGIN_NAME, "disableLogging", args => {
        $gameSystem.disableLogging();
    });

    PluginManager.registerCommand(PLUGIN_NAME, "clearBackLogs", args => {
        $gameSystem.clearBackLogs();
    });


    ConfigManager.limitSkip = false;

    const _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        const config = _ConfigManager_makeData.call(this);
        config.limitSkip = this.limitSkip;
        return config;
    };

    const _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData.call(this, config);
        this.limitSkip = this.readFlag(config, "limitSkip", DEFAULT_LIMIT_SKIP);
    };


    const _DataManager_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
        _DataManager_setupNewGame.call(this);
        if (USE_SKIP && MAKE_MASTER_INFO) this.applyMasterInfo();
    };

    const _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        _DataManager_extractSaveContents.call(this, contents);
        if (USE_SKIP && MAKE_MASTER_INFO) this.applyMasterInfo();
    };

    DataManager.saveGame = function(savefileId) {
        const contents = this.makeSaveContents();
        const saveName = this.makeSavename(savefileId);
        return StorageManager.saveObject(saveName, contents).then(() => {
            this._globalInfo[savefileId] = this.makeSavefileInfo();
            if (USE_SKIP && MAKE_MASTER_INFO) {
                this._masterInfo = this.makeMasterInfo();
                this.saveMasterInfo();
            }
            this.saveGlobalInfo();
            return 0;
        });
    };
    
    DataManager.makeMasterInfo = function() {
        return {passedLabelIndexes: $gameSystem.passedLabelIndexes().clone()};
    };
    
    DataManager.saveMasterInfo = function() {
        return StorageManager.saveObject("master", this._masterInfo);
    };

    DataManager.loadMasterInfo = function() {
        return StorageManager.loadObject("master")
            .then(masterInfo => {
                this._masterInfo = masterInfo;
            })
            .catch(() => {
                this._masterInfo = null;
            });
    };

    DataManager.applyMasterInfo = function() {
        const info = this._masterInfo;
        if (info) $gameSystem.intersectPassedLabelIndexes(info.passedLabelIndexes);
    };


    Input.defaultGamepadMapper[6] = "tab";
    Input.defaultGamepadMapper[7] = "control";
    Input.switchedGamepadMapper[6] = "tab";
    Input.switchedGamepadMapper[7] = "control";



    const _Game_Temp_prototype_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function() {
        _Game_Temp_prototype_initialize.call(this);
        this._skippableLabelIndex = -1;
    };

    Game_Temp.prototype.requestQuitMessage = function() {
        this._quitMessageRequested = true;
    };
    
    Game_Temp.prototype.isQuitMessageRequested = function() {
        return this._quitMessageRequested;
    };
    
    Game_Temp.prototype.clearQuitMessageRequest = function() {
        this._quitMessageRequested = false;
    };

    Game_Temp.prototype.requestOptionsScene = function() {
        this._optionsSceneRequested = true;
    };

    Game_Temp.prototype.isOptionsSceneRequested = function() {
        return this._optionsSceneRequested;
    };

    Game_Temp.prototype.clearOptionsSceneRequest = function() {
        this._optionsSceneRequested = false;
    };

    Game_Temp.prototype.requestSaveScene = function() {
        this._saveSceneRequested = true;
    };

    Game_Temp.prototype.isSaveSceneRequested = function() {
        return this._saveSceneRequested;
    };

    Game_Temp.prototype.clearSaveSceneRequest = function() {
        this._saveSceneRequested = false;
    };

    Game_Temp.prototype.requestLoadScene = function() {
        this._loadSceneRequested = true;
    };

    Game_Temp.prototype.isLoadSceneRequested = function() {
        return this._loadSceneRequested;
    };

    Game_Temp.prototype.clearLoadSceneRequest = function() {
        this._loadSceneRequested = false;
    };

    Game_Temp.prototype.requestLogScene = function() {
        this._logSceneRequested = true;
    };

    Game_Temp.prototype.isLogSceneRequested = function() {
        return this._logSceneRequested;
    };

    Game_Temp.prototype.clearLogSceneRequest = function() {
        this._logSceneRequested = false;
    };

    Game_Temp.prototype.requestToggleAuto = function() {
        this._toggleAutoRequested = true;
    };

    Game_Temp.prototype.isToggleAutoRequested = function() {
        return this._toggleAutoRequested;
    };

    Game_Temp.prototype.clearToggleAutoRequest = function() {
        this._toggleAutoRequested = false;
    };

    Game_Temp.prototype.setSkippableLabelIndex = function(index) {
        this._skippableLabelIndex = index;
    };

    Game_Temp.prototype.skippableLabelIndex = function() {
        return this._skippableLabelIndex;
    };


    const _Game_System_prototype_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_prototype_initialize.call(this);
        this._controlButtonsEnabled = true;
        this._loggingEnabled = true;
        this._backLogs = [];
        this._passedLabelIndexes = [];
    };

    Game_System.prototype.enableControlButtons = function() {
        this._controlButtonsEnabled = true;
    };

    Game_System.prototype.disableControlButtons = function() {
        this._controlButtonsEnabled = false;
    };

    Game_System.prototype.areControlButtonsEnabled = function() {
        return this._controlButtonsEnabled && !$gameParty.inBattle() && $gameMessage.isBusy();
    };

    Game_System.prototype.passedLabelIndexes = function() {
        return this._passedLabelIndexes;
    };

    Game_System.prototype.passLabelIndex = function(labelIndex) {
        if (!this._passedLabelIndexes.includes(labelIndex)) this._passedLabelIndexes.push(labelIndex);
    };

    Game_System.prototype.intersectPassedLabelIndexes = function(indexes) {
        const result = this._passedLabelIndexes.concat(indexes);
        this._passedLabelIndexes = Array.from(new Set(result));
    };    
    
    Game_System.prototype.isLabelIndexPassed = function(labelIndex) {
        return !ConfigManager.limitSkip || this._passedLabelIndexes.includes(labelIndex);
    };

    Game_System.prototype.enableLogging = function() {
        this._loggingEnabled = true;
    };

    Game_System.prototype.disableLogging = function() {
        this._loggingEnabled = false;
    };

    Game_System.prototype.isLoggingEnabled = function() {
        return this._loggingEnabled;
    };

    Game_System.prototype.addBackLogs = function(texts) {
        this._backLogs.push(texts);
    };

    Game_System.prototype.backLogs = function(excludeLast=false) {
        const ary = this._backLogs;
        const texts = excludeLast ? ary.slice(0, ary.length-1) : ary;
        return texts.flat();
    };

    Game_System.prototype.isBackLogEmpty = function(excludeLast=false) {
        return this._backLogs.length <= (excludeLast ? 1 : 0);
    };

    Game_System.prototype.clearBackLogs = function() {
        this._backLogs = [];
    };


    const _Game_Message_prototype_initialize = Game_Message.prototype.initialize;
    Game_Message.prototype.initialize = function() {
        _Game_Message_prototype_initialize.call(this);
        this._autoMode = false;
    };

    Game_Message.prototype.toggleAutoMode = function() {
        this._autoMode = !this._autoMode;
    };

    Game_Message.prototype.isAutoMode = function() {
        return this._autoMode && !$gameParty.inBattle();
    };


    Game_Interpreter.prototype.update = function() {
        while (this.isRunning()) {
            const isDescendant = !this._childInterpreter;
            if (isDescendant && $gameSystem.areControlButtonsEnabled() && this.updateInput()) break;
            if (this.updateChild() || this.updateWait()) break;
            if (SceneManager.isSceneChanging()) break;
            if (this.executeCommand()) {
                if (isDescendant) $gameTemp.setSkippableLabelIndex(this.skippableLabelIndex());
            } else {
                break;
            }
            if (this.checkFreeze()) break;
        }
    };

    Game_Interpreter.prototype.updateInput = function() {
        if (USE_OPTIONS && Input.isTriggered(OPTIONS_KEY) && this.jumpBackToMessageTop()) {
            $gameTemp.requestQuitMessage();
            $gameTemp.requestOptionsScene();
            SoundManager.playOk();
            return true;
        }
        if (USE_SAVE && Input.isTriggered(SAVE_KEY)) {
            if ($gameSystem.isSaveEnabled()) {
                if (this.jumpBackToMessageTop()) {
                    $gameTemp.requestQuitMessage();
                    $gameTemp.requestSaveScene();
                    SoundManager.playOk();
                    return true;
                }
            } else {
                SoundManager.playBuzzer();
            }
        }
        if (USE_LOAD && Input.isTriggered(LOAD_KEY) && this.jumpBackToMessageTop()) {
            $gameTemp.requestQuitMessage();
            $gameTemp.requestLoadScene();
            SoundManager.playOk();
            return true;
        }
        if (USE_LOG && Input.isTriggered(LOG_KEY)) {
            if (!$gameSystem.isBackLogEmpty(EXCLUDE_CURRENT_MESSAGE)) {
                if (this.jumpBackToMessageTop()) {
                    $gameTemp.requestQuitMessage();
                    $gameTemp.requestLogScene();
                    SoundManager.playOk();
                    return true;
                }
            } else {
                SoundManager.playBuzzer();
            }
        }
        if (USE_SKIP && Input.isTriggered(SKIP_KEY)) {
            if (this.jumpToSkippableLabel()) {
                $gameTemp.requestQuitMessage();
                SoundManager.playOk();
                return true;
            } else {
                SoundManager.playBuzzer();
            }
        }
        if (USE_AUTO && Input.isTriggered(AUTO_KEY)) {
            $gameTemp.requestToggleAuto();
            SoundManager.playOk();
            return true;
        }
        return false;
    };
    
    Game_Interpreter.prototype.jumpBackToMessageTop = function() {
        const list = this._list;
        if (list) {
            for (let i=this._index-1; i>=0; i--) {
                if ([101, 105].includes(list[i].code)) {
                    this._skipLogging = true;
                    this.jumpTo(i);
                    return true;
                }
            }
        }
        return false;
    };

    Game_Interpreter.prototype.skippableLabelIndex = function() {
        const list = this._list;
        if (list) {
            const currentLabelIndex = this._labelIndex;
            if (currentLabelIndex) {
                const nextLabelIndex = currentLabelIndex + 1;
                if ($gameSystem.isLabelIndexPassed(nextLabelIndex)) {
                    for (let i=this._index; i<list.length; i++) {
                        const command = list[i];
                        if (command.code === 118 && Number(command.parameters[0]) === nextLabelIndex) return i;
                    }
                }
            }
        }
        return -1;
    };

    Game_Interpreter.prototype.jumpToSkippableLabel = function() {
        const index = $gameTemp.skippableLabelIndex();
        if (index >= 0) {
            this.jumpTo(index);
            return true;
        } else {
            return false;
        }
    };
    
    Game_Interpreter.prototype.isLoggingEnabled = function() {
        return USE_LOG && !this._skipLogging && $gameSystem.isLoggingEnabled();
    };

    Game_Interpreter.prototype.command101 = function(params) {
        if ($gameMessage.isBusy()) return false;
        const logs = [];
        const logFooter = LOG_FOOTER.format($gameSystem.mainFontSize());
        $gameMessage.setFaceImage(params[0], params[1]);
        $gameMessage.setBackground(params[2]);
        $gameMessage.setPositionType(params[3]);
        $gameMessage.setSpeakerName(params[4]);
        const speakerName = $gameMessage.speakerName();
        if (speakerName) logs.push(LOG_SPEAKER_NAME_HEADER + speakerName + logFooter);
        while (this.nextEventCode() === 401) {
            // Text data
            this._index++;
            const text = this.currentCommand().parameters[0];
            $gameMessage.add(text);
            logs.push(speakerName ? text.padStart(text.length + LOG_MESSAGE_PADS) : text);
        }
        switch (this.nextEventCode()) {
            case 102: // Show Choices
                this._index++;
                this.setupChoices(this.currentCommand().parameters);
                break;
            case 103: // Input Number
                this._index++;
                this.setupNumInput(this.currentCommand().parameters);
                break;
            case 104: // Select Item
                this._index++;
                this.setupItemChoice(this.currentCommand().parameters);
                break;
        }
        this.setWaitMode("message");
        logs.push(logFooter);
        if (this.isLoggingEnabled()) $gameSystem.addBackLogs(logs);
        this._skipLogging = false;
        return true;
    };

    Game_Interpreter.prototype.command105 = function(params) {
        if ($gameMessage.isBusy()) return false;
        const logs = [];
        $gameMessage.setScroll(params[0], params[1]);
        while (this.nextEventCode() === 405) {
            this._index++;
            const text = this.currentCommand().parameters[0];
            $gameMessage.add(text);
            logs.push(text);
        }
        this.setWaitMode("message");
        logs.push(LOG_FOOTER.format($gameSystem.mainFontSize()));
        if (this.isLoggingEnabled()) $gameSystem.addBackLogs(logs);
        this._skipLogging = false;
        return true;
    };

    const _Game_Interpreter_prototype_command118 = Game_Interpreter.prototype.command118;
    Game_Interpreter.prototype.command118 = function() {
        const labelIndex = Number(this.currentCommand().parameters[0]);
        if (labelIndex) {
            this._labelIndex = labelIndex;
            $gameSystem.passLabelIndex(labelIndex);
        }
        return _Game_Interpreter_prototype_command118.call(this);
    };


    const _Scene_Boot_prototype_loadSystemImages = Scene_Boot.prototype.loadSystemImages;
    Scene_Boot.prototype.loadSystemImages = function() {
        _Scene_Boot_prototype_loadSystemImages.call(this);
        if (USE_OPTIONS) {
            ImageManager.loadSystem(OPTIONS_BUTTON_UNSELECTED_IMAGE_NAME);
            ImageManager.loadSystem(OPTIONS_BUTTON_SELECTED_IMAGE_NAME);
        }
        if (USE_SAVE) {
            ImageManager.loadSystem(SAVE_BUTTON_UNSELECTED_IMAGE_NAME);
            ImageManager.loadSystem(SAVE_BUTTON_SELECTED_IMAGE_NAME);
        }
        if (USE_LOAD) {
            ImageManager.loadSystem(LOAD_BUTTON_UNSELECTED_IMAGE_NAME);
            ImageManager.loadSystem(LOAD_BUTTON_SELECTED_IMAGE_NAME);
        }
        if (USE_LOG) {
            ImageManager.loadSystem(LOG_BUTTON_UNSELECTED_IMAGE_NAME);
            ImageManager.loadSystem(LOG_BUTTON_SELECTED_IMAGE_NAME);
        }
        if (USE_SKIP) {
            ImageManager.loadSystem(SKIP_BUTTON_UNSELECTED_DISABLED_IMAGE_NAME);
            ImageManager.loadSystem(SKIP_BUTTON_SELECTED_DISABLED_IMAGE_NAME);
            ImageManager.loadSystem(SKIP_BUTTON_UNSELECTED_ENABLED_IMAGE_NAME);
            ImageManager.loadSystem(SKIP_BUTTON_SELECTED_ENABLED_IMAGE_NAME);
        }
        if (USE_AUTO) {
            ImageManager.loadSystem(AUTO_BUTTON_UNSELECTED_OFF_IMAGE_NAME);
            ImageManager.loadSystem(AUTO_BUTTON_SELECTED_OFF_IMAGE_NAME);
            ImageManager.loadSystem(AUTO_BUTTON_UNSELECTED_ON_IMAGE_NAME);
            ImageManager.loadSystem(AUTO_BUTTON_SELECTED_ON_IMAGE_NAME);
        }
    };

    const _Scene_Boot_prototype_loadPlayerData = Scene_Boot.prototype.loadPlayerData;
    Scene_Boot.prototype.loadPlayerData = function() {
        DataManager.loadMasterInfo();
        _Scene_Boot_prototype_loadPlayerData.call(this);
    };


    const _Scene_Menu_prototype_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        _Scene_Menu_prototype_createCommandWindow.call(this);
        if (USE_LOG && ADD_LOG_COMMAND) this._commandWindow.setHandler("backLog", this.commandBackLog.bind(this));
    };

    Scene_Menu.prototype.commandBackLog = function() {
        SceneManager.push(Scene_BackLog);
    };


    const _Scene_Map_prototype_createButtons = Scene_Map.prototype.createButtons;
    Scene_Map.prototype.createButtons = function() {
        _Scene_Map_prototype_createButtons.call(this);
        const buttons = [];
        if (USE_OPTIONS) buttons.push(this.createOptionsButton());
        if (USE_SAVE) buttons.push(this.createSaveButton());
        if (USE_LOAD) buttons.push(this.createLoadButton());
        if (USE_LOG) buttons.push(this.createLogButton());
        if (USE_SKIP) buttons.push(this.createSkipButton());
        if (USE_AUTO) buttons.push(this.createAutoButton());
        this._messageWindow.setControlButtons(buttons);
    };

    Scene_Map.prototype.createOptionsButton = function() {
        const button = new Sprite_ControlButton(OPTIONS_KEY);
        button.x = OPTIONS_BUTTON_X;
        button.y = OPTIONS_BUTTON_Y;
        button.anchor.x = OPTIONS_BUTTON_ORIGIN;
        button.anchor.y = OPTIONS_BUTTON_ORIGIN;
        button.visible = false;
        this.addWindow(button);
        return button;
    };

    Scene_Map.prototype.createSaveButton = function() {
        const button = new Sprite_ControlButton(SAVE_KEY);
        button.x = SAVE_BUTTON_X;
        button.y = SAVE_BUTTON_Y;
        button.anchor.x = SAVE_BUTTON_ORIGIN;
        button.anchor.y = SAVE_BUTTON_ORIGIN;
        button.visible = false;
        this.addWindow(button);
        return button;
    };

    Scene_Map.prototype.createLoadButton = function() {
        const button = new Sprite_ControlButton(LOAD_KEY);
        button.x = LOAD_BUTTON_X;
        button.y = LOAD_BUTTON_Y;
        button.anchor.x = LOAD_BUTTON_ORIGIN;
        button.anchor.y = LOAD_BUTTON_ORIGIN;
        button.visible = false;
        this.addWindow(button);
        return button;
    };

    Scene_Map.prototype.createLogButton = function() {
        const button = new Sprite_ControlButton(LOG_KEY);
        button.x = LOG_BUTTON_X;
        button.y = LOG_BUTTON_Y;
        button.anchor.x = LOG_BUTTON_ORIGIN;
        button.anchor.y = LOG_BUTTON_ORIGIN;
        button.visible = false;
        this.addWindow(button);
        return button;
    };

    Scene_Map.prototype.createSkipButton = function() {
        const button = new Sprite_ControlButton(SKIP_KEY);
        button.x = SKIP_BUTTON_X;
        button.y = SKIP_BUTTON_Y;
        button.anchor.x = SKIP_BUTTON_ORIGIN;
        button.anchor.y = SKIP_BUTTON_ORIGIN;
        button.visible = false;
        this.addWindow(button);
        return button;
    };

    Scene_Map.prototype.createAutoButton = function() {
        const button = new Sprite_ControlButton(AUTO_KEY);
        button.x = AUTO_BUTTON_X;
        button.y = AUTO_BUTTON_Y;
        button.anchor.x = AUTO_BUTTON_ORIGIN;
        button.anchor.y = AUTO_BUTTON_ORIGIN;
        button.visible = false;
        this.addWindow(button);
        return button;
    };

    const _Scene_Map_prototype_updateMainMultiply = Scene_Map.prototype.updateMainMultiply;
    Scene_Map.prototype.updateMainMultiply = function() {
        _Scene_Map_prototype_updateMainMultiply.call(this);
        if ($gameTemp.isQuitMessageRequested()) {
            $gameTemp.clearQuitMessageRequest();
            this._messageWindow.quitMessage();
        }
        if ($gameTemp.isOptionsSceneRequested()) {
            $gameTemp.clearOptionsSceneRequest();
            SceneManager.push(Scene_Options);
        } else if ($gameTemp.isSaveSceneRequested()) {
            $gameTemp.clearSaveSceneRequest();
            SceneManager.push(Scene_Save);
        } else if ($gameTemp.isLoadSceneRequested()) {
            $gameTemp.clearLoadSceneRequest();
            SceneManager.push(Scene_Load);
        } else if ($gameTemp.isLogSceneRequested()) {
            $gameTemp.clearLogSceneRequest();
            SceneManager.push(Scene_BackLog);
        } else if ($gameTemp.isToggleAutoRequested()) {
            $gameTemp.clearToggleAutoRequest();
            $gameMessage.toggleAutoMode();
        }
    };


    const _Scene_Options_prototype_maxCommands = Scene_Options.prototype.maxCommands;
    Scene_Options.prototype.maxCommands = function() {
        return _Scene_Options_prototype_maxCommands.call(this) + (USE_SKIP && USE_LIMIT_SKIP ? 1 : 0);
    };
    

    const _Window_Message_prototype_initialize = Window_Message.prototype.initialize;
    Window_Message.prototype.initialize = function(rect) {
        this._controlButtons = [];
        _Window_Message_prototype_initialize.call(this, rect);
    };

    Window_Message.prototype.setControlButtons = function(buttons) {
        this._controlButtons = buttons;
    };

    Window_Message.prototype.isAnyButtonTouched = function() {
        return this._controlButtons.some(button => button.isBeingTouched());
    };

    Window_Message.prototype.updateControlButtons = function() {
        const visible = $gameSystem.areControlButtonsEnabled();
        if (visible !== this._controButtonsVisible) {
            this._controButtonsVisible = visible;
            this._controlButtons.forEach(button => button.visible = visible);
        }
    };

    Window_Message.prototype.quitMessage = function() {
        this.pause = false;
        this._waitCount = 0;
        this._textState = null;
        this.clearFlags();
        this.terminateMessage();
    };

    Window_Message.prototype.update = function() {
        this.checkToNotClose();
        this.updateControlButtons();
        Window_Base.prototype.update.call(this);
        this.synchronizeNameBox();
        while (!this.isOpening() && !this.isClosing()) {
            if (this.updateWait()) {
                if (this._waitForTerminate && this._waitCount === 0) {
                    this._waitForTerminate = false;
                    this.terminateMessage();
                }
                return;
            } else if (this.updateLoading()) {
                return;
            } else if (this.updateInput()) {
                return;
            } else if (this.updateMessage()) {
                return;
            } else if (this.canStart()) {
                this.startMessage();
            } else {
                this.startInput();
                return;
            }
        }
    };

    Window_Message.prototype.onEndOfText = function() {
        if (!this.startInput()) {
            if ($gameMessage.isAutoMode() && !this._waitForTerminate) {
                this._waitForTerminate = true;
                this.startWait(AUTO_PAUSE_FRAMES);
            } else if (!this._pauseSkip) {
                this.startPause();
            } else {
                this.terminateMessage();
            }
        }
        this._textState = null;
    };

    const _Window_Message_prototype_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
    Window_Message.prototype.processEscapeCharacter = function(code, textState) {
        if (code === "!" && $gameMessage.isAutoMode()) {
            this.startWait(AUTO_PAUSE_FRAMES);
        } else {
            _Window_Message_prototype_processEscapeCharacter.call(this, code, textState);
        }
    };

    Window_Message.prototype.isTriggered = function() {
        return !this.isAnyButtonTouched() && (Input.isRepeated("ok") || TouchInput.isRepeated());
    };


    const _Window_MenuCommand_prototype_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function() {
        _Window_MenuCommand_prototype_addOriginalCommands.call(this);
        if (USE_LOG && ADD_LOG_COMMAND) this.addCommand(LOG_COMMAND_NAME, "backLog", !$gameSystem.isBackLogEmpty());
    };


    const _Window_Options_prototype_addBooleanOptions = Window_Options.prototype.addBooleanOptions;
    Window_Options.prototype.addBooleanOptions = function() {
        _Window_Options_prototype_addBooleanOptions.call(this);
        if (USE_SKIP && USE_LIMIT_SKIP) this.addCommand(LIMIT_SKIP_NAME, "limitSkip");
    };

    const _Window_Options_prototype_isBooleanSymbol = Window_Options.prototype.isBooleanSymbol;
    Window_Options.prototype.isBooleanSymbol = function(symbol) {
        return symbol === "limitSkip" || _Window_Options_prototype_isBooleanSymbol.call(this, symbol);
    };

    const _Window_Options_prototype_restoreDefaultValues = Window_Options.prototype.restoreDefaultValues;
    Window_Options.prototype.restoreDefaultValues = function() {
        _Window_Options_prototype_restoreDefaultValues.call(this);
        ConfigManager["limitSkip"] = DEFAULT_LIMIT_SKIP;
    };



    function Sprite_ControlButton() {
        this.initialize(...arguments);
    }
    
    Sprite_ControlButton.prototype = Object.create(Sprite_Clickable.prototype);
    Sprite_ControlButton.prototype.constructor = Sprite_ControlButton;
    
    Sprite_ControlButton.prototype.initialize = function(buttonType) {
        Sprite_Clickable.prototype.initialize.call(this);
        this._buttonType = buttonType;
        this.setupFrame();
    };
    
    Sprite_ControlButton.prototype.setupFrame = function() {
        this.updateBitmap();
        const bitmap = this.bitmap;
        this.setFrame(0, 0, bitmap.width, bitmap.height);
        this.updateOpacity();
    };
    
    Sprite_ControlButton.prototype.update = function() {
        Sprite_Clickable.prototype.update.call(this);
        this.updateBitmap();
        this.updateOpacity();
        this.processTouch();
    };

    Sprite_ControlButton.prototype.bitmapName = function() {
        switch (this._buttonType) {
            case OPTIONS_KEY:
                return this._hovered ? OPTIONS_BUTTON_SELECTED_IMAGE_NAME : OPTIONS_BUTTON_UNSELECTED_IMAGE_NAME;
            case SAVE_KEY:
                return this._hovered ? SAVE_BUTTON_SELECTED_IMAGE_NAME : SAVE_BUTTON_UNSELECTED_IMAGE_NAME;
            case LOAD_KEY:
                return this._hovered ? LOAD_BUTTON_SELECTED_IMAGE_NAME : LOAD_BUTTON_UNSELECTED_IMAGE_NAME;
            case LOG_KEY:
                return this._hovered ? LOG_BUTTON_SELECTED_IMAGE_NAME : LOG_BUTTON_UNSELECTED_IMAGE_NAME;
            case SKIP_KEY:
                if ($gameTemp.skippableLabelIndex() >= 0) {
                    return this._hovered ? SKIP_BUTTON_SELECTED_ENABLED_IMAGE_NAME : SKIP_BUTTON_UNSELECTED_ENABLED_IMAGE_NAME;
                } else {
                    return this._hovered ? SKIP_BUTTON_SELECTED_DISABLED_IMAGE_NAME : SKIP_BUTTON_UNSELECTED_DISABLED_IMAGE_NAME;
                }
            case AUTO_KEY:
                if ($gameMessage.isAutoMode()) {
                    return this._hovered ? AUTO_BUTTON_SELECTED_ON_IMAGE_NAME : AUTO_BUTTON_UNSELECTED_ON_IMAGE_NAME;
                } else {
                    return this._hovered ? AUTO_BUTTON_SELECTED_OFF_IMAGE_NAME : AUTO_BUTTON_UNSELECTED_OFF_IMAGE_NAME;
                }
        }
    };

    Sprite_ControlButton.prototype.updateBitmap = function() {
        const bitmapName = this.bitmapName();
        if (this._bitmapName !== bitmapName) {
            this._bitmapName = bitmapName;
            this.bitmap = ImageManager.loadSystem(bitmapName);
        }
    };
    
    Sprite_ControlButton.prototype.updateOpacity = function() {
        this.opacity = this._pressed ? 255 : BUTTON_OPACITY;
    };
    
    Sprite_ControlButton.prototype.onClick = function() {
        Sprite_Clickable.prototype.onClick.call(this);
        Input.virtualClick(this._buttonType);
    };


    function Scene_BackLog() {
        this.initialize(...arguments);
    }
    
    Scene_BackLog.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_BackLog.prototype.constructor = Scene_BackLog;
    
    Scene_BackLog.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };
    
    Scene_BackLog.prototype.create = function() {
        this._calledFromMap = SceneManager.isPreviousScene(Scene_Map);
        Scene_MenuBase.prototype.create.call(this);
        this.createBackLogWindow();
    };

    Scene_BackLog.prototype.createBackground = function() {
        if (this._calledFromMap) {
            this._backgroundFilter = null;
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
            this.addChild(this._backgroundSprite);
        } else {
            Scene_MenuBase.prototype.createBackground.call(this);
        }
    };

    Scene_BackLog.prototype.createPageButtons = function() {
        this._pageupButton = new Sprite_Button("pageup");
        this._pageupButton.x = 4;
        this._pageupButton.y = this.buttonY();
        const pageupRight = this._pageupButton.x + this._pageupButton.width;
        this._pagedownButton = new Sprite_Button("pagedown");
        this._pagedownButton.x = pageupRight + 4;
        this._pagedownButton.y = this.buttonY();
        this.addWindow(this._pageupButton);
        this.addWindow(this._pagedownButton);
    };

    Scene_BackLog.prototype.createBackLogWindow = function() {
        const window = new Window_BackLog(this.backLogWindowRect());
        window.setHandler("cancel", this.popScene.bind(this));
        window.setTexts($gameSystem.backLogs(EXCLUDE_CURRENT_MESSAGE && this._calledFromMap));
        window.activate();
        this._backLogWindow = window;
        this.addWindow(window);
    };
    
    Scene_BackLog.prototype.backLogWindowRect = function() {
        const buttonAreaHeight = this.buttonAreaHeight();
        const wx = 0;
        const wy = buttonAreaHeight;
        const ww = Graphics.boxWidth;
        const wh = Graphics.boxHeight - buttonAreaHeight;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_BackLog.prototype.needsPageButtons = function() {
        return true;
    };


    function Window_BackLog() {
        this.initialize(...arguments);
    }
    
    Window_BackLog.prototype = Object.create(Window_Selectable.prototype);
    Window_BackLog.prototype.constructor = Window_BackLog;
    
    Window_BackLog.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this.clearText();
        this.setBackgroundType(1);
        this.open();
    };

    Window_BackLog.prototype.clearScrollStatus = function() {
        Window_Selectable.prototype.clearScrollStatus.call(this);
        this._inputCount = 0;
    };

    Window_BackLog.prototype.setTexts = function(texts) {
        this._text = texts.join("\n");
        this.refresh();
    };

    Window_BackLog.prototype.clearText = function() {
        this._text = "";
    };

    Window_BackLog.prototype.refresh = function() {
        this.clearScrollStatus();
        this._allTextHeight = this.textSizeEx(this._text).height;
        this.createContents();
        this.scrollTo(0, this.maxScrollY());
        const rect = this.baseTextRect();
        this.drawTextEx(this._text, rect.x, rect.y, rect.width);
    };
    
    Window_BackLog.prototype.contentsHeight = function() {
        return Math.max(this._allTextHeight, 1);
    };

    Window_BackLog.prototype.overallHeight = function() {
        return this.contentsHeight();
    };

    Window_BackLog.prototype.isScrollEnabled = function() {
        return this.active;
    };

    Window_BackLog.prototype.updateOrigin = function() {
        this.origin.x = this._scrollX;
        this.origin.y = this._scrollY;
    };

    Window_BackLog.prototype.processWheelScroll = function() {
        if (this.isWheelScrollEnabled() && this.isTouchedInsideFrame()) {
            const threshold = 20;
            const wheelY = TouchInput.wheelY;
            if (Math.abs(wheelY) >= threshold) this.smoothScrollBy(0, wheelY);
        }
    };
    
    Window_BackLog.prototype.processCursorMove = function() {
        if (this.isScrollEnabled()) {
            if (Input.isRepeated("pagedown")) {
                this.smoothScrollBy(0, this.innerHeight);
                return;
            }
            if (Input.isRepeated("pageup")) {
                this.smoothScrollBy(0, -this.innerHeight);
                return;
            }
            const lastInput = this._lastInput;
            let sign;
            if (Input.isRepeated("down")) {
                this._lastInput = "down";
                sign = 1;
            }
            if (Input.isRepeated("up")) {
                this._lastInput = "up";
                sign = -1;
            }
            if (sign) {
                this._inputCount = (this._lastInput === lastInput) ? this._inputCount + 1 : 0;
                this.smoothScrollBy(0, sign * (this._inputCount+1) * 10);
            } else if (!Input.isPressed(lastInput)) {
                this._lastInput = "";
            }
        }
    };

})();
