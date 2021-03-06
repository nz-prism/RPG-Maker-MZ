# 目的地点滅カスタマイズ(DestinationSpriteCustom)

## バージョン
### 最新バージョン（ダウンロード）
[1.0.0](https://raw.githubusercontent.com/nz-prism/RPG-Maker-MZ/master/DestinationSpriteCustom/js/plugins/DestinationSpriteCustom.js)

### バージョン履歴
- 2022/05/14 1.0.0 リリース

## 概要
このプラグインはマップをクリックした際に表示される点滅をカスタマイズする機能を提供します。

![DestinationSpriteCustom](https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ReadmeImages/DestinationSpriteCustom1.png)

プラグインパラメータ「目的地点滅を表示する」をオフにすると何も表示されなくなります。  
プラグインパラメータ「点滅画像ファイル」にてsystemフォルダ内の画像ファイルを指定するとその画像が表示されるようになります。  
画像を指定しない場合、プラグインパラメータ「点滅図形」にてを指定した図形が表示されます（デフォルトは標準と同様の正方形です）。図形の色はプラグインパラメータ「図形色」にて指定できます。  
プラグインパラメータ「合成方法」にて、ピクチャと同様の合成方法が指定できます。  
プラグインパラメータ「1フレームあたり増加画像不透明度」にて点滅時毎フレーム増加する不透明度を指定できます。  
プラグインパラメータ「基本拡大率」にて拡大率の初期値を指定できます。デフォルトでは標準と同様毎フレーム拡大率が増加しますが、プラグインパラメータ「拡大率を固定する」をオンにすると拡大率が「基本拡大率」に固定されます。


## ライセンス
このプラグインはMITライセンスにてリリースされています。  
https://opensource.org/licenses/mit-license.php


## 使用方法
導入方法は通常のプラグインと同様です。  
**js/plugins**フォルダに**DestinationSpriteCustom.js**をコピーし、プラグイン管理にて有効化してください。  
プラグイン説明にて本ドキュメントと同等の内容がご確認いただけます。また、プラグインパラメータもご覧ください。