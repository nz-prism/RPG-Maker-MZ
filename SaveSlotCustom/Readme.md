# セーブスロットカスタム(SaveSlotCustom.js)

## バージョン
### 最新バージョン（ダウンロード）
[1.0.0](https://raw.githubusercontent.com/nz-prism/RPG-Maker-MZ/master/SaveSlotCustom/js/plugins/SaveSlotCustom.js)

### バージョン履歴
- 2022/06/28 1.0.0 リリース

## 概要
このプラグインを使用することで、ストーリーの進行度に応じてセーブスロットの背景にピクチャを表示したり文字列を描画したりすることができます。

![SaveSlotCustom](https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ReadmeImages/SaveSlotCustom1.png)

まずプラグインパラメータ「ストーリー進行度変数」に、ストーリー進行度を表す変数の番号を設定してください。  
続いてプラグインパラメータ「スロット設定」に、その変数の値と表示するピクチャやテキストを必要な分だけ設定してください。テキストには制御文字を使用することができ、また表示座標を変更できます。  
なおストーリー進行度変数が「スロット設定」に設定していない値になった場合、ピクチャもテキストも表示されません。  

また、プラグインパラメータ「パーティキャラクター描画」をオフに設定することでパーティキャラクターが描画されなくなります。

## ライセンス
このプラグインはMITライセンスにてリリースされています。  
https://opensource.org/licenses/mit-license.php


## 使用方法
導入方法は通常のプラグインと同様です。  
**js/plugins**フォルダに**SaveSlotCustom.js**をコピーし、プラグイン管理にて有効化してください。  
プラグイン説明にて本ドキュメントと同等の内容がご確認いただけます。