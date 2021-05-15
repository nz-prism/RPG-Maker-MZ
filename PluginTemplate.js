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
 */

/*:ja
 * @target MZ
 * @plugindesc 
 * @author 
 *
 * @help 
 *
 */

(() => {

    Window_StatusBase.prototype.placeGauge = function(actor, type, x, y) {
        const key = "actor%1-gauge-%2".format(actor.actorId(), type);
        // const sprite = this.createInnerSprite(key, Sprite_Gauge);
        const sprite = new Sprite_Gauge();
        this.addChild(sprite);
        sprite.setup(actor, type);
        sprite.move(x, y);
        sprite.show();
    };

})();
