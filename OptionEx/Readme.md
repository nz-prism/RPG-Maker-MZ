# オプション拡張(OptionEx)

## バージョン
### 最新バージョン（ダウンロード）
[1.5.0](https://raw.githubusercontent.com/nz-prism/RPG-Maker-MZ/master/OptionEx/js/plugins/OptionEx.js)

### バージョン履歴
- 2021/02/28 1.0.0 リリース
- 2021/03/03 1.0.1 Wカラーデフォルト値に関するバグ修正、ウィンドウ高さの微調整
- 2021/03/05 1.0.2 ダッシュ速度やメッセージ瞬間表示が不使用の場合のバグを修正
- 2021/04/05 1.1.0 A/Bボタン入れ替え機能、標準項目不使用設定追加
- 2021/06/22 1.2.0 プラグインパラメータ多数追加、本体バージョン1.3.0以降のサブフォルダへの格納に対応
- 2021/07/06 1.2.1 本体バージョン1.3.2のサブフォルダ機能改善に対応
- 2022/02/20 1.2.2 NovelGameUI.jsに対応
- 2022/02/21 1.2.3 オプション系他プラグインとの競合回避を強化
- 2022/02/24 1.3.0 ボタンよりも下にウィンドウを配置するプラグインパラメータを追加、説明文追記
- 2022/03/03 1.3.1 ニューゲームにデフォルト値を反映するように修正
- 2023/08/24 1.4.0 メッセージ瞬間表示時の制御文字の挙動に関するプラグインパラメータ2種を追加
- 2023/10/04 1.5.0 ME/BGS音量をBGM/SE音量に統合できるように修正

## 概要
このプラグインは、オプション画面にさまざまな機能を追加します。

- ウィンドウの外観を変更するオプションを追加
- ゲームパッドの決定ボタンとキャンセルボタンを入れ替えるオプションを追加
- ダッシュ速度変更オプションを追加
- メッセージを瞬間的に表示するオプションを追加
- 各オプション項目のデフォルト値を設定可能
- 全てのオプションの値をデフォルトに戻すコマンドを追加
- 音量・ウィンドウカラーオプションにはゲージが表示されるように
- Pageup・Pagedownボタンで大きく値を変更可能（タッチUI用ボタンも用意されています）
- ゲージ系項目では、マウスならドラッグ、タッチならスワイプ操作でも値を変更可能
- 各オプション項目（標準項目も含む）は不使用に設定可能

![Option](https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ReadmeImages/OptionEx1.png)  

## ライセンス
このプラグインはMITライセンスにてリリースされています。  
https://opensource.org/licenses/mit-license.php

## 使用方法
通常のプラグインと導入手順は同じです。  
**js/plugins**フォルダに**OptionEx.js**をコピーし、プラグイン管理にて有効化してください。  
その他の詳細はプラグイン説明（プラグインパラメータ）をご覧ください。