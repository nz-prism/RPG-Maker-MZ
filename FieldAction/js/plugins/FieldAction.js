//=============================================================================
// RPG Maker MZ - 
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 
 * @author 
 *
 * @help 
 *
 * @param skillReactionPatterns
 * @text Skill Reaction Patterns
 * @desc Contains skill reaction patterns as many as necessary.
 * @type struct<switchPatternList>[]
 * 
 * @command toggleSwitchesByFacingSkillTargets
 * @text Turn Switches on by Events Faced by Player
 * @desc Turns on switches whose IDs correspond to <skillReactionId: > note of events faced by the player.
 *
 * @command requestAnimationAtFacingSkillTargets
 * @text Show Animation at Facing Events
 * @desc Show a specified animation at events faced by the player.
 * 
 * @arg animationId
 * @text Animation ID
 * @desc ID of the animation to be shown.
 * @type animation
 * 
 */

/*~struct~switchPatternList:
 *
 * @param identifier
 * @text Identifier
 * @desc The identifier for skill reaction patterns.
 * @type string
 * 
 * @param patterns
 * @text Skill Reaction Pattern List
 * @desc The list for skill reaction patterns.
 * @type struct<switchPattern>[]
 * 
 */

/*~struct~switchPattern:
 *
 * @param commonEventId
 * @text Common Event ID
 * @desc The common event ID which affects the event.
 * @type common_event
 * 
 * @param selfSwitchCh
 * @text Self Switch Character
 * @desc The self switch character which will change.
 * @default A
 * @type select
 * @option A
 * @option B
 * @option C
 * @option D
 * 
 * @param selfSwitchValue
 * @text Self Switch Value
 * @desc The changed Value of the self switch.
 * @type boolean
 * @default true
 * 
 * @param selfSwitchCondition
 * @text Self Switch Condition
 * @desc The self switch character which needs to be on for enabling this reaction.
 * @default null
 * @type select
 * @option none
 * @value null
 * @option A
 * @option B
 * @option C
 * @option D
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc 
 * @author 
 *
 * @help 
 *
 * @param skillReactionPatterns
 * @text スキル反応パターン
 * @desc スキルに対する反応パターンを、反応の種類だけ定義します。
 * @type struct<switchPatternList>[]
 * 
 * @command toggleSwitchesByFacingSkillTargets
 * @text 直前イベントスイッチオン
 * @desc プレイヤーの目の前のイベントのメタタグに設定されているスイッチをオンにします。
 *
 * @command requestAnimationAtFacingSkillTargets
 * @text 直前イベントアニメーション表示
 * @desc プレイヤーの目の前のイベントに指定したIDのアニメーションを表示します。
 * 
 * @arg animationId
 * @text 表示アニメーション番号
 * @desc 表示するアニメーションの番号です。
 * @type animation
 * 
 * 
 */

/*~struct~switchPatternList:ja
 *
 * @param identifier
 * @text 識別子
 * @desc スキル反応パターンの識別子です。
 * @type string
 * 
 * @param patterns
 * @text スキル反応パターンリスト
 * @desc スキル反応パターンのリストです。
 * @type struct<switchPattern>[]
 * 
 */

/*~struct~switchPattern:ja
 *
 * @param commonEventId
 * @text コモンイベントID
 * @desc イベントに作用するコモンイベントのIDです。
 * @type common_event
 * 
 * @param selfSwitchCh
 * @text セルフスイッチ記号
 * @desc 変化するセルフスイッチの記号です。
 * @default A
 * @type select
 * @option A
 * @option B
 * @option C
 * @option D
 * 
 * @param selfSwitchValue
 * @text 変化後スイッチ
 * @desc 反応後に変化するセルフスイッチの値です。
 * @type boolean
 * @default true
 * 
 * @param selfSwitchCondition
 * @text セルフスイッチ条件
 * @desc この反応を有効にするためにオンになっている必要があるセルフスイッチの記号です。
 * @default null
 * @type select
 * @option なし
 * @value null
 * @option A
 * @option B
 * @option C
 * @option D
 * 
 */

(() => {
    'use strict';


    const PLUGIN_NAME = "FieldAction";


    const skillReactionPatterns = JSON.parse(PluginManager.parameters(PLUGIN_NAME).skillReactionPatterns)
        .map(str => JSON.parse(str));
    for (let i=0; i<skillReactionPatterns.length; i++) {
        const str = skillReactionPatterns[i].patterns;
        const ary = JSON.parse(str).map(s => JSON.parse(s));
        for (let j=0; j<ary.length; j++) {
            for (const key of Object.keys(ary[j])) {
                const value = ary[j][key];
                if (!["A","B","C","D"].includes(value)) {
                    ary[j][key] = JSON.parse(value);
                }
            }
        }
        skillReactionPatterns[i].patterns = ary;
    }
    const SKILL_REACTION_PATTERNS = {};
    for (const obj of skillReactionPatterns) {
        SKILL_REACTION_PATTERNS[obj.identifier] = obj.patterns;
    }
    

    PluginManager.registerCommand(PLUGIN_NAME, "toggleSwitchesByFacingSkillTargets", args => {
        $gamePlayer.toggleSwitchesByFacingSkillTargets();
    });

    PluginManager.registerCommand(PLUGIN_NAME, "requestAnimationAtFacingSkillTargets", args => {
        const targets = $gamePlayer.facingSkillTargets();
        const animationId = Number(args.animationId);
        $gameTemp.requestAnimation(targets, animationId);
    });


    Game_Player.prototype.facingSkillTargets = function() {
        const direction = this.direction();
        const x1 = this.x;
        const y1 = this.y;
        const x2 = $gameMap.roundXWithDirection(x1, direction);
        const y2 = $gameMap.roundYWithDirection(y1, direction);
        const events = $gameMap.eventsXy(x2, y2);
        return events;
    };

    Game_Player.prototype.isFacingSkillTargets = function() {
        const events = this.facingSkillTargets();
        return events.length > 0;
    };

    Game_Player.prototype.toggleSwitchesByFacingSkillTargets = function() {
        const events = this.facingSkillTargets();
        for (const event of events) {
            const patterns = SKILL_REACTION_PATTERNS[event.skillReactionId()];
            if (patterns) {
                const commonEventId = $gameTemp.currentCommonEventId();
                const struct = patterns.find(obj => obj.commonEventId === commonEventId);
                if (struct) {
                    const selfSwitchCondition = struct.selfSwitchCondition;
                    const mapId = $gameMap.mapId();
                    const eventId = event.eventId();
                    let ok = false;
                    if (!selfSwitchCondition) {
                        ok = ["A","B","C","D"].every(ch => !$gameSelfSwitches.value([mapId, eventId, ch]));
                    } else {
                        ok = $gameSelfSwitches.value([mapId, eventId, selfSwitchCondition]);
                    }
                    if (ok) $gameSelfSwitches.setValue([mapId, eventId, struct.selfSwitchCh], struct.selfSwitchValue);
                }
            }
        }
    };
    
    
    Game_Event.prototype.skillReactionId = function() {
        return this.event().meta.skillReactionId || "";
    };


    Game_Temp.prototype.retrieveCommonEvent = function() {
        const commonEventId = this._commonEventQueue.shift();
        this._currentCommonEventId = commonEventId;
        return $dataCommonEvents[commonEventId];
    };

    Game_Temp.prototype.currentCommonEventId = function() {
        return this._currentCommonEventId;
    };


    Scene_Map.prototype.createItemWindow = function() {
        const rect = this.itemWindowRect();
        this._itemWindow = new Window_SkillList(rect);
        // this._itemWindow.setHelpWindow(this._helpWindow);
        // this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
        // this._itemWindow.setHandler("cancel", this.onItemCancel.bind(this));
        // this._skillTypeWindow.setSkillWindow(this._itemWindow);
        this.addWindow(this._itemWindow);
    };

    const _Scene_Map_prototype_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        _Scene_Map_prototype_createAllWindows.call(this);
        this.createItemWindow();
    };

    Scene_Map.prototype.itemWindowRect = function() {
        const wx = 0;
        // const wy = this._statusWindow.y + this._statusWindow.height;
        const wy = 0; // 暫定値
        const ww = Graphics.boxWidth;
        // const wh = this.mainAreaHeight() - this._statusWindow.height;
        const wh = 300; // 暫定値
        return new Rectangle(wx, wy, ww, wh);
    };

})();
