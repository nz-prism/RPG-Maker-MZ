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
 * @desc Turns on switches whose IDs correspond to <skillSwitchId: > note of events faced by the player.
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
 * @default none
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
 * @default なし
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


    const skillReactionPatterns = JSON.parse(PluginManager.parameters(PLUGIN_NAME).skillReactionPatterns);
    const SKILL_REACTION_PATTERNS = skillReactionPatterns.map(str => JSON.parse(str));
    for (let i=0; i<SKILL_REACTION_PATTERNS.length; i++) {
        const str = SKILL_REACTION_PATTERNS[i].patterns;
        const ary = JSON.parse(str).map(s => JSON.parse(s));
        for (let j=0; j<ary.length; j++) {
            for (const key of Object.keys(ary[j])) {
                const value = ary[j][key];
                if (!["A","B","C","D"].includes(value)) {
                    ary[j][key] = JSON.parse(value);
                }
            }
        }
        SKILL_REACTION_PATTERNS[i].patterns = ary;
    }
    console.log(SKILL_REACTION_PATTERNS);
    

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
            const switchId = event.skillSwitchId();
            $gameSwitches.setValue(switchId, true);
        }
    };
    
    
    Game_Event.prototype.skillSwitchId = function() {
        return this.event().meta.skillSwitchId;
    };

})();
