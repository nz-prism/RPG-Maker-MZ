//=============================================================================
// RPG Maker MZ - DynamicEncounterWeight
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Decreases encounter weights on battle end.
 * @author nz_prism
 * @url
 *
 * @help DynamicEncounterWeight.js
 *
 * ver. 1.0.0
 * 
 * [History]
 * 03/20/2022 1.0.0 Released
 * 
 * This plugin automatically decreases the encounter weight when a player wins
 * the battle against the troop. If an encounter weight is 0, the party will
 * never encounter the troop on the same map. When the player moves to
 * another map, the encounter weights will be reset.
 * 
 * This plugin has no plugin parameters or plugin commands. All you have to set
 * is the encounter weight of troops as usual.
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc 戦闘に勝利するとエンカウントの重みを1減らします。
 * @author nz_prism
 * @url
 *
 * @help DynamicEncounterWeight.js
 * ver. 1.0.0
 * 
 * [バージョン履歴]
 * 2022/03/20 1.0.0 リリース
 * 
 * このプラグインを導入すると、戦闘に勝利するごとにその敵グループのエンカウント設
 * 定の「重み」が1減少するようになります。重みが0になった敵グループは、そのマップ
 * では出現しなくなります。マップを切り替えると重みは元に戻ります。
 * 
 * 本プラグインにはプラグインパラメータもプラグインコマンドもありません。エンカ
 * ウント設定の「重み」を通常の手順同様に設定するだけで機能します。
 *
 */

(() => {
    'use strict';


    const _BattleManager_processVictory = BattleManager.processVictory;
    BattleManager.processVictory = function() {
        _BattleManager_processVictory.call(this);
        $gameMap.decrementEncounterWeight();
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
        this._encoutnerId = -1;
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

    Game_Map.prototype.setEncounterId = function(encoutnerId) {
        this._encoutnerId = encoutnerId;
    };

    Game_Map.prototype.decrementEncounterWeight = function() {
        const encounter = this._encounterList[this._encoutnerId];
        if (encounter) encounter.weight--;
    };
    
})();
