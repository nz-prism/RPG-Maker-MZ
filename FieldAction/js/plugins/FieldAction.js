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

/*:ja
 * @target MZ
 * @plugindesc 
 * @author 
 *
 * @help 
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

(() => {
    'use strict';


    const PLUGIN_NAME = "FieldAction";

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
