# ボタンピクチャカーソル表示(CursorApplicationToButtonPicture)

## バージョン
### 最新バージョン（ダウンロード）
[1.2.2](https://raw.githubusercontent.com/nz-prism/RPG-Maker-MZ/master/DynamicEncounterWeight/js/plugins/DynamicEncounterWeight.js)

### バージョン履歴
- 2021/02/24 1.0.0 リリース
- 2021/02/25 1.1.0 軽微なバグ修正。枠線オフセット、カーソルSE演奏対応
- 2021/05/15 1.2.0 カーソルSE選択プラグインパラメータの追加
- 2021/06/22 1.2.1 本体バージョン1.3.0以降のサブフォルダへの格納に対応
- 2021/07/06 1.2.2 本体バージョン1.3.2のサブフォルダ機能改善に対応

## 概要
ロンチプラグインである**ButtonPicture.js**は、ピクチャをボタン化し、タップやクリックにてコモンイベントを起動できるようにするものです。  
ただしそのピクチャにはカーソル等が表示されないので、選択していることがやや分かりにくいという問題があります。

このプラグインは、**ButtonPicture**にてボタン化したピクチャにカーソル画像を表示することができます。また、その際SEも演奏できます。  
カーソルは画像を使う方式と、枠線で囲む方式の２種類が用意されています。詳しくはプラグイン説明文をお読みください。  
前者にて使用する仮画像（**Cursor.png**）も用意しました。**img/system**フォルダに入れてください。  
あくまで仮画像なので実際にはもっといい感じの画像に差し替えてくださいね。

![Cursor-Arrow](https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ReadmeImages/CursorApplicationToButtonPicture1.png)  
![Cursor-Frame](https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ReadmeImages/CursorApplicationToButtonPicture2.png)

## ライセンス
このプラグインはMITライセンスにてリリースされています。  
https://opensource.org/licenses/mit-license.php

## 使用方法
通常のプラグインと導入手順は同じです。
**js/plugins**フォルダに**CursorApplicationToButtonPicture.js**をコピーし、プラグイン管理にて有効化してください。
その他の詳細はプラグイン説明（プラグインパラメータ）をご覧ください。