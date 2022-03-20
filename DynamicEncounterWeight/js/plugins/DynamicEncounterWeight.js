//=============================================================================
// RPG Maker MZ - DynamicEncounterWeight
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Decreases encounter weights on battle end.
 * @author nz_prism
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/DynamicEncounterWeight/js/plugins/DynamicEncounterWeight.js
 *
 * @help DynamicEncounterWeight.js
 *
 * ver. 1.0.1
 * 
 * [History]
 * 03/20/2022 1.0.0 Released
 * 03/20/2022 1.0.1 Fixed an issue that an event battle decreases the previous
 *                  troop's encounter weight.
 * 
 * This plugin automatically decreases the encounter weight when a player wins
 * the battle against the troop. If an encounter weight is 0, the party will
 * never encounter the troop on the same map. When the player moves to
 * another map, the encounter weights will be reset.
 * 
 * This plugin has no plugin parameters or plugin commands. All you have to set
 * is the encounter weight of troops as usual.
 * 
 * Note if an encounter weight decreases, the probability to encounter the
 * troop changes. For example, you set 10 for Goblin troop while 5 for Gnome.
 * If a player has defeated Goblin troops 5 times at the same map and never
 * defeated Gnomes, the weights of both troops are 5. In this case, the player
 * will encounter both Goblin and Gnome troops for exactly the same
 * probability.
 * 
 * 
 * This plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc 戦闘に勝利するとエンカウントの重みを1減らします。
 * @author nz_prism
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/DynamicEncounterWeight/js/plugins/DynamicEncounterWeight.js
 *
 * @help DynamicEncounterWeight.js
 * ver. 1.0.1
 * 
 * [バージョン履歴]
 * 2022/03/20 1.0.0 リリース
 * 2022/03/20 1.0.1 イベント戦闘により直前のトループの重みが減少してしまう不具
 *                  合を修正
 * 
 * このプラグインを導入すると、戦闘に勝利するごとにその敵グループのエンカウント
 * 設定の「重み」が1減少するようになります。重みが0になった敵グループは、その
 * マップでは出現しなくなります。マップを切り替えると重みは元に戻ります。
 * 
 * 本プラグインにはプラグインパラメータもプラグインコマンドもありません。エンカ
 * ウント設定の「重み」を通常の手順同様に設定するだけで機能します。
 * 
 * 重みが変動することにより、出現率も変化するという点にご注意ください。
 * たとえばゴブリングループの「重み」が10で、ノームグループが5だとします。この
 * 場合通常は、ゴブリンはノームの2倍出現しやすいはずです。ですがたとえばプレイ
 * ヤーが同じマップでゴブリンを5回倒し、ノームは一度も倒していないとします。こ
 * の場合、ゴブリンもノームも重みは同じ5になっているので、出現率は等しくなりま
 * す。
 *
 * 
 * このプラグインはMITライセンスにてリリースされています。
 * https://opensource.org/licenses/mit-license.php
 * 
 */

(() => {
    'use strict';


    const _BattleManager_processVictory = BattleManager.processVictory;
    BattleManager.processVictory = function() {
        $gameMap.decrementEncounterWeight();
        _BattleManager_processVictory.call(this);
    };

    const _BattleManager_endBattle = BattleManager.endBattle;
    BattleManager.endBattle = function(result) {
        _BattleManager_endBattle.call(this, result);
        $gameMap.setEncounterId(-1);
    };


    Game_Player.prototype.makeEncounterTroopId = function() {
        const encounterList = [];
        let weightSum = 0;
        for (const encounter of $gameMap.encounterList()) {
            if (this.meetsEncounterConditions(encounter)) {
                encounterList.push(encounter);
                weightSum += encounter.weight;
            }
        }
        if (weightSum > 0) {
            let value = Math.randomInt(weightSum);
            for (const encounter of encounterList) {
                value -= encounter.weight;
                if (value < 0) {
                    $gameMap.setEncounterId(encounter.id);
                    return encounter.troopId;
                }
            }
        }
        return 0;
    };


    const _Game_Map_prototype_initialize = Game_Map.prototype.initialize;
    Game_Map.prototype.initialize = function() {
        _Game_Map_prototype_initialize.call(this);
        this._encounterId = -1;
        this._encounterList = [];
    };
    
    const _Game_Map_prototype_setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function(mapId) {
        _Game_Map_prototype_setup.call(this, mapId);
        this.setupEncounterList();
    };

    Game_Map.prototype.setupEncounterList = function() {
        const encounterList = $dataMap.encounterList.map(encounter => ({...encounter}));
        for (let i=0; i<encounterList.length; i++) encounterList[i].id = i;
        this._encounterList = encounterList;
    };

    Game_Map.prototype.encounterList = function() {
        return this._encounterList;
    };

    Game_Map.prototype.setEncounterId = function(encounterId) {
        this._encounterId = encounterId;
    };

    Game_Map.prototype.decrementEncounterWeight = function() {
        const encounter = this._encounterList[this._encounterId];
        if (encounter) encounter.weight--;
    };
    
})();
