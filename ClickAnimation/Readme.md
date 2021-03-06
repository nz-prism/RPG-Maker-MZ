# クリックアニメーション(ClickAnimation)

## バージョン
### 最新バージョン（ダウンロード）
[1.0.1](https://raw.githubusercontent.com/nz-prism/RPG-Maker-MZ/master/ClickAnimation/js/plugins/ClickAnimation.js)

### バージョン履歴
- 2022/03/12 1.0.0 リリース
- 2022/04/08 1.0.1 バトラーにアニメが表示されない不具合を修正

## 概要
このプラグインはウィンドウやボタンのうち、クリック可能なものをクリックした際にアニメーションを再生する機能を提供します。

![ClickAnimation](https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ReadmeImages/ClickAnimation1.png)

本プラグインにはベースプラグインは特にありませんが、ロンチプラグイン**ButtonPicture.js**や[**オプション拡張**（**OptionEx.js**）](https://github.com/nz-prism/RPG-Maker-MZ/tree/master/OptionEx)を導入している場合それらよりも後に配置してください。

アニメはプラグインパラメータを使用して種類と反転するかどうかを指定できます。

アニメ再生機能はマップ・戦闘・メニューなどあらゆるシーンにて有効です。なおボタン類はクリックやタップだけでなく、対応する物理ボタン押下時にもアニメが再生されます。

本プラグインを導入すると画像の透明部分をクリックしても反応しなくなります。これにより敵画像を重ねて表示する場合に、余白部分が重なってしまっているせいで意図せぬ対象を選択してしまうことを防ぐことなどが可能になります。


## ライセンス
このプラグインはMITライセンスにてリリースされています。  
https://opensource.org/licenses/mit-license.php


## 使用方法
導入方法は通常のプラグインと同様です。  
**js/plugins**フォルダに**ClickAnimation.js**をコピーし、プラグイン管理にて有効化してください。  
プラグイン説明にて本ドキュメントと同等の内容がご確認いただけます。また、プラグインパラメータもご覧ください。