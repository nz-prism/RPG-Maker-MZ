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


    const _Scene_Map_prototype_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        _Scene_Map_prototype_createAllWindows.call(this);
        this.createHelpWindow();
        this.createSkillTypeWindow();
        this.createStatusWindow();
        this.createItemWindow();
    };

    Scene_Map.prototype.createItemWindow = function() {
        const rect = this.itemWindowRect();
        this._itemWindow = new Window_SkillList(rect);
        this._itemWindow.setHelpWindow(this._helpWindow);
        this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
        this._itemWindow.setHandler("cancel", this.onItemCancel.bind(this));
        this._skillTypeWindow.setSkillWindow(this._itemWindow);
        this.addWindow(this._itemWindow);
        // this._itemWindow.setActor($gameActors.actor(6));
        // this._itemWindow.setStypeId(1);
    };

    Scene_Map.prototype.itemWindowRect = function() {
        const wx = 0;
        const wy = this._statusWindow.y + this._statusWindow.height;
        // const wy = 0; // 暫定値
        const ww = Graphics.boxWidth;
        const wh = this.mainAreaHeight() - this._statusWindow.height;
        // const wh = 300; // 暫定値
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Map.prototype.createSkillTypeWindow = function() {
        const rect = this.skillTypeWindowRect();
        this._skillTypeWindow = new Window_SkillType(rect);
        this._skillTypeWindow.setHelpWindow(this._helpWindow);
        this._skillTypeWindow.setHandler("skill", this.commandSkill.bind(this));
        // this._skillTypeWindow.setHandler("cancel", this.popScene.bind(this));
        this._skillTypeWindow.setHandler("pagedown", this.nextActor.bind(this));
        this._skillTypeWindow.setHandler("pageup", this.previousActor.bind(this));
        this.addWindow(this._skillTypeWindow);
    };
    
    Scene_Map.prototype.skillTypeWindowRect = function() {
        const ww = this.mainCommandWidth();
        const wh = this.calcWindowHeight(3, true);
        const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
        const wy = this.mainAreaTop();
        return new Rectangle(wx, wy, ww, wh);
    };
    
    Scene_Map.prototype.createStatusWindow = function() {
        const rect = this.statusWindowRect();
        this._statusWindow = new Window_SkillStatus(rect);
        this.addWindow(this._statusWindow);
    };
    
    Scene_Map.prototype.statusWindowRect = function() {
        const ww = Graphics.boxWidth - this.mainCommandWidth();
        const wh = this._skillTypeWindow.height;
        const wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;
        const wy = this.mainAreaTop();
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Map.prototype.createHelpWindow = function() {
        const rect = this.helpWindowRect();
        this._helpWindow = new Window_Help(rect);
        this.addWindow(this._helpWindow);
    };

    Scene_Map.prototype.helpWindowRect = function() {
        const wx = 0;
        const wy = this.helpAreaTop();
        const ww = Graphics.boxWidth;
        const wh = this.helpAreaHeight();
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Map.prototype.helpAreaTop = function() {
        if (this.isBottomHelpMode()) {
            return this.mainAreaBottom();
        } else if (this.isBottomButtonMode()) {
            return 0;
        } else {
            return this.buttonAreaBottom();
        }
    };
    
    Scene_Map.prototype.helpAreaBottom = function() {
        return this.helpAreaTop() + this.helpAreaHeight();
    };
    
    Scene_Map.prototype.helpAreaHeight = function() {
        return this.calcWindowHeight(2, false);
    };
    
    Scene_Map.prototype.mainAreaTop = function() {
        if (!this.isBottomHelpMode()) {
            return this.helpAreaBottom();
        } else if (this.isBottomButtonMode()) {
            return 0;
        } else {
            return this.buttonAreaBottom();
        }
    };
    
    Scene_Map.prototype.mainAreaBottom = function() {
        return this.mainAreaTop() + this.mainAreaHeight();
    };
    
    Scene_Map.prototype.mainAreaHeight = function() {
        return Graphics.boxHeight - this.buttonAreaHeight() - this.helpAreaHeight();
    };

    Scene_Map.prototype.actor = function() {
        return this._actor;
    };
    
    Scene_Map.prototype.updateActor = function() {
        this._actor = $gameParty.menuActor();
    };

    Scene_Map.prototype.refreshActor = function() {
        const actor = this.actor();
        this._skillTypeWindow.setActor(actor);
        this._statusWindow.setActor(actor);
        this._itemWindow.setActor(actor);
    };

    const _Scene_Map_prototype_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _Scene_Map_prototype_start.call(this);
        this.refreshActor();
    };

    const _Scene_Map_prototype_create = Scene_Map.prototype.create;
    Scene_Map.prototype.create = function() {
        _Scene_Map_prototype_create.call(this);
        this.updateActor();
    };

    Scene_Map.prototype.commandSkill = function() {
        this._itemWindow.activate();
        this._itemWindow.selectLast();
    };

    Scene_Map.prototype.nextActor = function() {
        $gameParty.makeMenuActorNext();
        this.updateActor();
        this.onActorChange();
    };
    
    Scene_Map.prototype.previousActor = function() {
        $gameParty.makeMenuActorPrevious();
        this.updateActor();
        this.onActorChange();
    };
    
    Scene_Map.prototype.onActorChange = function() {
        SoundManager.playCursor();
    };

    Scene_Map.prototype.onItemOk = function() {
        this.actor().setLastMenuSkill(this.item());
        this.determineItem();
    };
    
    Scene_Map.prototype.onItemCancel = function() {
        this._itemWindow.deselect();
        this._skillTypeWindow.activate();
    };

    Scene_Map.prototype.determineItem = function() {
        const action = new Game_Action(this.user());
        const item = this.item();
        action.setItemObject(item);
        this.useItem();
        this.activateItemWindow();
    };
    
    Scene_Map.prototype.useItem = function() {
        this.playSeForItem();
        this.user().useItem(this.item());
        this.applyItem();
        this.checkCommonEvent();
        this.checkGameover();
    };
    
    Scene_Map.prototype.activateItemWindow = function() {
        this._itemWindow.refresh();
        this._itemWindow.activate();
    };

    Scene_Map.prototype.playSeForItem = function() {
        SoundManager.playUseSkill();
    };

    Scene_Map.prototype.user = function() {
        return this.actor();
    };

    Scene_Map.prototype.item = function() {
        return this._itemWindow.item();
    };

    Scene_Map.prototype.applyItem = function() {
        const action = new Game_Action(this.user());
        action.setItemObject(this.item());
        action.applyGlobal();
    };

    Scene_Map.prototype.checkCommonEvent = function() {
        if ($gameTemp.isCommonEventReserved()) {
            SceneManager.goto(Scene_Map);
        }
    };

    Scene_Map.prototype.updateSkillWindows = function() {
        if (Input.isTriggered("control")) {
            this._statusWindow.close();
            this._skillTypeWindow.close();
            this._itemWindow.close();
            this._helpWindow.close();
        }
    };

    const _Scene_Map_prototype_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        this.updateSkillWindows();
        _Scene_Map_prototype_update.call(this);
    };

})();
