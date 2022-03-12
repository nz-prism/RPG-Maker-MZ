//=============================================================================
// RPG Maker MZ - ClickAnimation
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Plays an animation when clicking windows/buttons.
 * @author nz_prism
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ClickAnimation/js/plugins/ClickAnimation.js
 * @orderAfter ButtonPicture
 * @orderAfter OptionEx
 *
 * @help ClickAnimation.js
 * ver. 1.0.0
 * 
 * [History]
 * 03/12/2022 1.0.0 Released
 * 
 * This plugin provides a functionality to play an animation when players click
 * clickable objects, such as windows or buttons.
 * 
 * This functionality works throughout the game including Map, Battle and Menu
 * scenes.
 * Note when players press a physical button, the animation will be played at
 * the corresponding virtual button.
 * 
 * By enabling this plugin, the transparent pixels of a picture will be
 * invalid for clicking. This prevents players from mistakenly selecting
 * different enemies than they intended to when multiple enemies are overlapped
 * each other.
 * 
 * 
 * This plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 * 
 * @param clickAnimation
 * @text Click Animation
 * @desc Settings for an animation played when clicking.
 * 
 * @param clickAnimationId
 * @text Click Animation ID
 * @desc The ID of an animation played when clicking.
 * @parent clickAnimation
 * @type animation
 * 
 * @param clickAnimationMirror
 * @text Click Animation Mirror
 * @desc Specify to invert the animation horizontally.
 * @parent clickAnimation
 * @type boolean
 * @default false
 * 
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc ウィンドウやボタンのクリック時にアニメを再生します。
 * @author nz_prism
 * @url https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ClickAnimation/js/plugins/ClickAnimation.js
 * @orderAfter ButtonPicture
 * @orderAfter OptionEx
 *
 * @help ClickAnimation.js
 * ver. 1.0.0
 * 
 * [バージョン履歴]
 * 2022/03/12 1.0.0 リリース
 * 
 * このプラグインはウィンドウやボタンのうち、クリック可能なものをクリックした際に
 * アニメーションを再生する機能を提供します。
 * 
 * アニメ再生機能はマップ・戦闘・メニューなどあらゆるシーンにて有効です。
 * なおボタン類はクリックやタップだけでなく、対応する物理ボタン押下時にもアニメが
 * 再生されます。
 * 
 * 本プラグインを導入すると画像の透明部分をクリックしても反応しなくなります。これ
 * により敵画像を重ねて表示する場合に、余白部分が重なってしまっているせいで意図せ
 * ぬ対象を選択してしまうことを防ぐことなどが可能になります。
 *
 * 
 * このプラグインはMITライセンスにてリリースされています。
 * https://opensource.org/licenses/mit-license.php
 * 
 * 
 * @param clickAnimation
 * @text クリックアニメーション
 * @desc クリック時に再生されるアニメーションの設定です。
 * 
 * @param clickAnimationId
 * @text クリックアニメーションID
 * @desc クリック時に再生されるアニメーションのIDです。
 * @parent clickAnimation
 * @type animation
 * 
 * @param clickAnimationMirror
 * @text クリックアニメーション反転
 * @desc クリック時に再生されるアニメーションの反転設定です。
 * @parent clickAnimation
 * @type boolean
 * @default false
 * 
 * 
 */

(() => {
    'use strict';
    const PLUGIN_NAME = "ClickAnimation";
    const pluginParams = PluginManager.parameters(PLUGIN_NAME);


    const CLICK_ANIMATION_ID = Number(pluginParams.clickAnimationId);
    const CLICK_ANIMATION_MIRROR = pluginParams.clickAnimationMirror === "true";

    
    Game_Temp.prototype.requestAnimation = function(targets, animationId, mirror=false, offsetX=0, offsetY=0) {
        if ($dataAnimations[animationId]) {
            const request = {
                targets: targets,
                animationId: animationId,
                mirror: mirror,
                offsetX: offsetX,
                offsetY: offsetY
            };
            this._animationQueue.push(request);
            for (const target of targets) {
                if (target.startAnimation) target.startAnimation();
            }
        }
    };

    Game_Temp.prototype.requestClickAnimation = function(sprite) {
        const width = sprite.width;
        const height = sprite.height;
        const touchPos = new Point(TouchInput.x, TouchInput.y);
        const localPos = sprite.worldTransform.applyInverse(touchPos);
        const anchorX = sprite.anchor.x;
        const anchorY = sprite.anchor.y;
        const offsetX = localPos.x.clamp(-anchorX * width, width - anchorX * width);
        const offsetY = (localPos.y + height / 2).clamp(height / 2 + (-anchorY * height), height * 1.5 - anchorY * height);
        this.requestAnimation([sprite], CLICK_ANIMATION_ID, CLICK_ANIMATION_MIRROR, offsetX, offsetY);
    };


    Scene_Base.prototype.addAnimationSprite = function(sprite) {
        const windowLayer = this._windowLayer;
        if (windowLayer) windowLayer.addChild(sprite);
    };

    Scene_Base.prototype.removeAnimationSprite = function(sprite) {
        const windowLayer = this._windowLayer;
        if (windowLayer) windowLayer.removeChild(sprite);
    };

    Scene_Base.prototype.createSpriteset = function() {
        this._spriteset = new Spriteset_Base();
        this.addChild(this._spriteset);
        this._spriteset.update();
    };


    const _Scene_Title_prototype_create = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function() {
        this.createSpriteset();
        _Scene_Title_prototype_create.call(this);
        
    };


    const _Scene_MenuBase_prototype_create = Scene_MenuBase.prototype.create;
    Scene_MenuBase.prototype.create = function() {
        this.createSpriteset();
        _Scene_MenuBase_prototype_create.call(this);
        
    };


    const _Sprite_Clickable_prototype_hitTest = Sprite_Clickable.prototype.hitTest;
    Sprite_Clickable.prototype.hitTest = function(x, y) {
        return _Sprite_Clickable_prototype_hitTest.apply(this, arguments) && this.isPointedValidPixel(x, y);
    };

    Sprite_Clickable.prototype.getBitmapAlphaPixel = function(bitmap, x, y) {
        return bitmap ? bitmap.getAlphaPixel(x + this.anchor.x * this.width, y + this.anchor.y * this.height) : 0;
    };

    Sprite_Clickable.prototype.isPointedValidPixel = function(x, y) {
        return this.getBitmapAlphaPixel(this.bitmap, x, y) > 0;
    };

    const _Sprite_Clickable_prototype_onClick = Sprite_Clickable.prototype.onClick;
    Sprite_Clickable.prototype.onClick = function() {
        _Sprite_Clickable_prototype_onClick.call(this);
        this.requestClickAnimation();
    };

    Sprite_Clickable.prototype.requestClickAnimation = function() {
        $gameTemp.requestClickAnimation(this);
    };

    const _Sprite_Clickable_prototype_update = Sprite_Clickable.prototype.update;
    Sprite_Clickable.prototype.update = function() {
        _Sprite_Clickable_prototype_update.call(this);
        this.updateButtonInput();
    };

    Sprite_Clickable.prototype.updateButtonInput = function() {
        const buttonType = this._buttonType;
        if (buttonType && this.visible && Input.isTriggered(buttonType)) this.requestClickAnimation();
    };


    const _Sprite_Button_prototype_onClick = Sprite_Button.prototype.onClick;
    Sprite_Button.prototype.onClick = function() {
        Sprite_Clickable.prototype.onClick.call(this);
        _Sprite_Button_prototype_onClick.call(this);
    };


    Sprite_Actor.prototype.isPointedValidPixel = function(x, y) {
        return this.getBitmapAlphaPixel(this._mainSprite.bitmap, x, y) > 0;
    };


    const _Sprite_Picture_prototype_onClick = Sprite_Picture.prototype.onClick;
    Sprite_Picture.prototype.onClick = function() {
        _Sprite_Picture_prototype_onClick.call(this);
        this.requestClickAnimation();
    };

    
    const _Sprite_Animation_prototype_initMembers = Sprite_Animation.prototype.initMembers;
    Sprite_Animation.prototype.initMembers = function() {
        _Sprite_Animation_prototype_initMembers.call(this);
        this._offsetX = 0;
        this._offsetY = 0;
    };
    
    const _Sprite_Animation_prototype_setup = Sprite_Animation.prototype.setup;
    Sprite_Animation.prototype.setup = function(
        targets, animation, mirror, delay, previous, offsetX, offsetY
    ) {
        _Sprite_Animation_prototype_setup.call(this, targets, animation, mirror, delay, previous);
        this._offsetX = offsetX;
        this._offsetY = offsetY;
    };
    
    Sprite_Animation.prototype.setViewport = function(renderer) {
        const vw = this._viewportSize;
        const vh = this._viewportSize;
        const vx = this._offsetX + this._animation.offsetX - vw / 2;
        const vy = this._offsetY + this._animation.offsetY - vh / 2;
        const pos = this.targetPosition(renderer);
        renderer.gl.viewport(vx + pos.x, vy + pos.y, vw, vh);
    };

    Sprite_Animation.prototype.isClickAnimation = function() {
        const targetObjects = this.targetObjects;
        return targetObjects && (targetObjects[0] instanceof Sprite);
    };
    
    
    const _Sprite_AnimationMV_prototype_initMembers = Sprite_AnimationMV.prototype.initMembers;
    Sprite_AnimationMV.prototype.initMembers = function() {
        _Sprite_AnimationMV_prototype_initMembers.call(this);
        this._offsetX = 0;
        this._offsetY = 0;
    };
    
    // prettier-ignore
    const _Sprite_AnimationMV_prototype_setup = Sprite_AnimationMV.prototype.setup;
    Sprite_AnimationMV.prototype.setup = function(
        targets, animation, mirror, delay, previous, offsetX, offsetY
    ) {
        _Sprite_AnimationMV_prototype_setup.call(this, targets, animation, mirror, delay);
        this._offsetX = offsetX;
        this._offsetY = offsetY;
    };
    
    Sprite_AnimationMV.prototype.updatePosition = function() {
        const target = this._targets[0];
        const parent = target.parent;
        const grandparent = parent ? parent.parent : null;
        const cursorTarget = (grandparent instanceof Window);
        if (!cursorTarget && this._animation.position === 3) {
            this.x = this.parent.width / 2;
            this.y = this.parent.height / 2;
        } else if (this._targets.length > 0) {
            this.x = target.x;
            this.y = target.y;
            if (cursorTarget) {
                this.x += grandparent.x;
                this.y += grandparent.y;
            } else if (this.parent === grandparent) {
                this.x += parent.x;
                this.y += parent.y;
            }
            if (this._animation.position === 0) {
                this.y -= target.height;
            } else if (this._animation.position === 1) {
                this.y -= target.height / 2;
            }
        }
        this.x += this._offsetX;
        this.y += this._offsetY;
    };

    Sprite_AnimationMV.prototype.isClickAnimation = function() {
        const targetObjects = this.targetObjects;
        return targetObjects && (targetObjects[0] instanceof Sprite);
    };
    

    Spriteset_Base.prototype.createAnimation = function(request) {
        const animation = $dataAnimations[request.animationId];
        const targets = request.targets;
        const mirror = request.mirror;
        const offsetX = request.offsetX;
        const offsetY = request.offsetY;
        let delay = this.animationBaseDelay();
        const nextDelay = this.animationNextDelay();
        if (this.isAnimationForEach(animation)) {
            for (const target of targets) {
                this.createAnimationSprite([target], animation, mirror, delay, offsetX, offsetY);
                delay += nextDelay;
            }
        } else {
            this.createAnimationSprite(targets, animation, mirror, delay, offsetX, offsetY);
        }
    };

    Spriteset_Base.prototype.createAnimationSprite = function(targets, animation, mirror, delay, offsetX, offsetY) {
        const target = targets[0];
        const clickAnimation = (target instanceof Sprite);
        const sprite = new (this.isMVAnimation(animation) ? Sprite_AnimationMV : Sprite_Animation)();
        const targetSprites = clickAnimation ? targets : this.makeTargetSprites(targets);
        const baseDelay = this.animationBaseDelay();
        const previous = delay > baseDelay ? this.lastAnimationSprite() : null;
        if (!clickAnimation && this.animationShouldMirror(target)) mirror = !mirror;
        sprite.targetObjects = targets;
        sprite.setup(targetSprites, animation, mirror, delay, previous, offsetX, offsetY);
        if (clickAnimation) {
            const parent = this.parent;
            if (parent) parent.addAnimationSprite(sprite);
        } else {
            this._effectsContainer.addChild(sprite);
        }
        this._animationSprites.push(sprite);
    };

    Spriteset_Base.prototype.isAnimationPlaying = function() {
        return this._animationSprites.some(sprite => !sprite.isClickAnimation());
    };
    
    const _Spriteset_Base_prototype_removeAnimation = Spriteset_Base.prototype.removeAnimation;
    Spriteset_Base.prototype.removeAnimation = function(sprite) {
        if (sprite.targetObjects[0] instanceof Sprite) {
            this._animationSprites.remove(sprite);
            const parent = this.parent;
            if (parent) parent.removeAnimationSprite(sprite);
            sprite.destroy();
        } else {
            _Spriteset_Base_prototype_removeAnimation.call(this, sprite);
        }
    };


    const _Spriteset_Map_prototype_findTargetSprite = Spriteset_Map.prototype.findTargetSprite;
    Spriteset_Map.prototype.findTargetSprite = function(target) {
        return (target instanceof Sprite) ? target : _Spriteset_Map_prototype_findTargetSprite.call(this, target);
    };


    const _Spriteset_Battle_prototype_findTargetSprite = Spriteset_Battle.prototype.findTargetSprite;
    Spriteset_Battle.prototype.findTargetSprite = function(target) {
        return (target instanceof Sprite) ? target : _Spriteset_Battle_prototype_findTargetSprite.call(this, target);
    };


    Window_Selectable.prototype.requestClickAnimation = function() {
        $gameTemp.requestClickAnimation(this._cursorSprite);
    };

    const _Window_Selectable_prototype_processOk = Window_Selectable.prototype.processOk;
    Window_Selectable.prototype.processOk = function() {
        _Window_Selectable_prototype_processOk.call(this);
        this.requestClickAnimation();
    };


    const _Window_Options_prototype_processOk = Window_Options.prototype.processOk;
    Window_Options.prototype.processOk = function() {
        _Window_Options_prototype_processOk.call(this);
        this.requestClickAnimation();
    };


    const _Window_MenuActor_prototype_processOk = Window_MenuActor.prototype.processOk;
    Window_MenuActor.prototype.processOk = function() {
        _Window_MenuActor_prototype_processOk.call(this);
        this.requestClickAnimation();
    };


    const _Window_NameInput_prototype_processOk = Window_NameInput.prototype.processOk;
    Window_NameInput.prototype.processOk = function() {
        _Window_NameInput_prototype_processOk.call(this);
        this.requestClickAnimation();
    };


    const _Window_NumberInput_prototype_createButtons = Window_NumberInput.prototype.createButtons;
    Window_NumberInput.prototype.createButtons = function() {
        _Window_NumberInput_prototype_createButtons.call(this);
        this._buttons.forEach(sprite => sprite.hide());
    };

    Window_NumberInput.prototype.open = function() {
        Window_Selectable.prototype.open.call(this);
        this._buttons.forEach(sprite => sprite.show());
    };

    Window_NumberInput.prototype.show = function() {
        Window_Selectable.prototype.show.call(this);
        this._buttons.forEach(sprite => sprite.show());
    };

    Window_NumberInput.prototype.close = function() {
        Window_Selectable.prototype.close.call(this);
        this._buttons.forEach(sprite => sprite.hide());
    };

    Window_NumberInput.prototype.hide = function() {
        Window_Selectable.prototype.hide.call(this);
        this._buttons.forEach(sprite => sprite.hide());
    };


    const _Window_ShopNumber_prototype_createButtons = Window_ShopNumber.prototype.createButtons;
    Window_ShopNumber.prototype.createButtons = function() {
        _Window_ShopNumber_prototype_createButtons.call(this);
        this._buttons.forEach(sprite => sprite.hide());
    };

    Window_ShopNumber.prototype.open = function() {
        Window_Selectable.prototype.open.call(this);
        this._buttons.forEach(sprite => sprite.show());
    };

    Window_ShopNumber.prototype.show = function() {
        Window_Selectable.prototype.show.call(this);
        this._buttons.forEach(sprite => sprite.show());
    };

    Window_ShopNumber.prototype.close = function() {
        Window_Selectable.prototype.close.call(this);
        this._buttons.forEach(sprite => sprite.hide());
    };

    Window_ShopNumber.prototype.hide = function() {
        Window_Selectable.prototype.hide.call(this);
        this._buttons.forEach(sprite => sprite.hide());
    };

})();
