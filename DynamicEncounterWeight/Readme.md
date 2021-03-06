# 動的エンカウント重み変動(DynamicEncounterWeight)

## バージョン
### 最新バージョン（ダウンロード）
[1.0.1](https://raw.githubusercontent.com/nz-prism/RPG-Maker-MZ/master/DynamicEncounterWeight/js/plugins/DynamicEncounterWeight.js)

### バージョン履歴
- 2022/03/20 1.0.0 リリース
- 2022/03/20 1.0.1 イベント戦闘により直前のトループの重みが減少してしまう不具合を修正

## 概要
このプラグインを導入すると、戦闘に勝利するごとにその敵グループのエンカウント設定の**重み**が**1**減少するようになります。**重み**が**0**になった敵グループは、そのマップでは出現しなくなります。マップを切り替えると**重み**は元に戻ります。

本プラグインにはプラグインパラメータもプラグインコマンドもありません。エンカウント設定の**重み**を通常の手順同様に設定するだけで機能します。

![DynamicEncounterWeight](https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ReadmeImages/DynamicEncounterWeight1.png)

**重み**が変動することにより、出現率も変化するという点にご注意ください。
たとえば上のスクリーンショットの場合通常は、ゴブリンはノームの2倍出現しやすいはずです。ですがたとえばプレイヤーが同じマップでゴブリンを5回倒し、ノームは一度も倒していないとします。その場合、ゴブリンもノームも**重み**は同じ**5**なので、出現率は等しくなります。

通常のランダムエンカウントのほか、イベントコマンド**戦闘の処理**にて**ランダムエンカウントと同じ**が設定されている場合に発生した戦闘にも上記の挙動が反映されます。そのマップの全ての敵グループの**重み**が**0**になっている状態でこのイベントが実行された場合、戦闘が発生せずに勝利した扱いになります。**逃走可**や**敗北可**にチェックが入っている場合、**勝ったとき**に分岐します。

![EventCommand](https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ReadmeImages/DynamicEncounterWeight2.png)


## ライセンス
このプラグインはMITライセンスにてリリースされています。  
https://opensource.org/licenses/mit-license.php


## 使用方法
導入方法は通常のプラグインと同様です。  
**js/plugins**フォルダに**DynamicEncounterWeight.js**をコピーし、プラグイン管理にて有効化してください。  
プラグイン説明にて本ドキュメントと同等の内容がご確認いただけます。