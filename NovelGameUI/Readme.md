# ノベルゲームUI(NovelGameUI)

## バージョン
### 最新バージョン（ダウンロード）
[1.3.4](https://raw.githubusercontent.com/nz-prism/RPG-Maker-MZ/master/NovelGameUI/js/plugins/NovelGameUI.js)

### バージョン履歴
- 2022/02/20 1.0.0 リリース
- 2022/02/21 1.0.1 戦闘に入るとエラーになる問題を修正
- 2022/03/12 1.0.2 微バグの修正およびClickAnimation.jsに対応
- 2022/03/16 1.1.0 UI非表示機能を追加
- 2022/03/22 1.1.1 他のプラグインとの競合対策を強化
- 2022/08/20 1.2.0 ログ保存上限と手動ログ追加機能を追加。文章スクロール表示時のバグ修正
- 2022/11/16 1.3.0 ゲーム終了機能を追加。UI非表示時にピクチャを表示させる機能および非表示にする機能を追加
- 2022/11/17 1.3.1 新プラグインパラメータ２種にデフォルト値を追加
- 2023/01/03 1.3.2 キーボード/ゲームパッド使用時の不具合を修正
- 2023/01/29 1.3.3 制御ボタン無効時にオートモードを解除するように修正
- 2023/09/10 1.3.4 オートモード切り替え直後はオート送りされない不具合修正

## 概要
このプラグインは、マップでのイベント実行中に使用可能なノベルゲーム風インターフェースを提供します。

![NovelGameUI](https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ReadmeImages/NovelGameUI1.png)

本プラグインは[**オプション拡張**（**OptionEx.js**）](https://github.com/nz-prism/RPG-Maker-MZ/tree/master/OptionEx)プラグインのバージョン**1.2.2**（以降）の導入が前提となります。**OptionEx**よりも後に配置してください。

以下の８種類の機能が利用できます。

1. オプション
1. セーブ
1. ロード
1. ログ
1. スキップ
1. オート
1. UI非表示
1. ゲーム終了

上記機能はいずれも使用するかどうかを個別に選択できます。例えばログ機能だけを使用する、といったことも可能です。

いずれの機能もそれを呼び出すためのボタンを画面上に表示することができます。これらのボタンが表示されるのはメッセージイベント表示時のみであるという点にご注意ください。ボタンをタップやクリックすることで、対応する上記機能が実行されます。また、各機能にはキーボードやゲームパッドのキーを割り当てることが可能であり、それらを押下することでも対応機能を実行できます。  
なお本プラグインを導入すると、MZデフォルトでは何も機能が割り当てられていないボタンであるゲームパッドの**LT**・**RT**・**メニューボタン**・**ビューボタン**（XBoxコントローラーにおける名称）にそれぞれ機能が割り当てられます。**LTボタン**には**tabキー**が、**RTボタン**には**controlキー**が、**メニューボタン**には**altキー**が、**ビューボタン**には**F6**キーが割り当てられます。それらを含め**X**・**Y**・**LB**・**RB**・**LT**・**RT**・**メニューボタン**・**ビューボタン**の８つのボタンにそれぞれ割り当てることが可能です。実際のキー割り当てにはプラグインパラメータを使用します。  
MZデフォルトではメッセージ表示時、決定ボタンだけでなくキャンセルボタンでもメッセージ送りができますが、本プラグインを導入するとキャンセルボタンではメッセージ送りができなくなります。あらかじめご了承ください。

プラグインコマンド**制御ボタンの無効化**を使用すると、上記ボタンがすべて表示されなくなります。対応するキー/ボタンを押下してもその機能は実行されません。プラグインコマンド**制御ボタンの有効化**を使用することで再びボタンが表示され、対応キーに反応するようになります。

各ボタンには専用の画像を設定することができます。選択（マウスオーバーされている）時と未選択時とで別々の画像を設定することができます。
なお本プラグインには画像素材は同梱されていませんので別途ご用意ください。  
サンプル画像には、**Game-icons.net**様のアイコン素材を使用させていただきました。この場をお借りしてお礼申し上げます。  
https://game-icons.net


## 各機能紹介

### オプション
オプション画面を呼び出すことができます。


### セーブ
セーブ画面を呼び出すことができます。イベントの実行中であってもセーブ可能です。なおイベントによってセーブが禁止されている場合、セーブ不可になります。その状態でこのボタンを押すとブザー音が演奏されます。


### ロード
ロード画面を呼び出すことができます。イベントの実行中であってもロード可能です。


### ログ

![BackLog](https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ReadmeImages/NovelGameUI2.png)

バックログ画面を呼び出すことができます。ログを有効にすると**文章の表示**および**文章のスクロール表示**で表示された文章がすべて保存されるようになります。バックログ画面では保存された文章を一覧表示できます。また、プラグインパラメータ**ログコマンドの追加**を**オン**にすることでバックログ画面をメニューから呼び出すためのコマンドを追加することが可能です。これにより、イベントが終了してもログを閲覧できます。

![LogCommand](https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ReadmeImages/NovelGameUI3.png)

保存された文章はセーブ対象ですので、ロードすれば再度表示できます。保存したメッセージの数がプラグインパラメータ**ログ保存上限数**に設定した値を超えた場合、古いものが自動的に消去されます。なおこのパラメータを**0**に設定した場合（デフォルトは**0**です）、ログが自動的に消去されることはなくなります。その場合、プラグインコマンド**ログの消去**を適切なタイミングで実行して手動で消去してください。保存できるログの量に制限はありませんが、あまりにも溜まりすぎるとセーブデータ容量が肥大化します。

プラグインコマンド**ログ保存の無効化**を使用すると、以降のイベントにてログが保存されなくなります。プラグインコマンド**ログ保存の有効化**を使用することで元に戻り、ログが再び保存されるようになります。

いま表示されているメッセージもログに含めるかどうかは、プラグインパラメータ**表示中メッセージをログから除外**によって設定できます。このパラメータが**オン**に設定されていてメッセージ表示中にログを呼び出した場合、表示されるログの数は**ログ保存上限数に設定している値 - 1**になるという点にご注意ください。

ログが一つも保存されていない状態では、ログボタンを押してもログ画面が開かれず、ブザー音が演奏されます。また、メニューのバックログコマンドもグレーアウトされます。**表示中メッセージをログから除外**が**オン**の場合、初回メッセージ表示中はこのような状態になるという点にご注意ください。

プラグインコマンド**ログの追加**を使用すると、イベントによりメッセージを表示しなくても任意のテキストをログに追加することができます。ピクチャ扱いで表示したメッセージをログに含めたい場合等にご使用ください。


### スキップ
ある一定範囲のイベントコマンドの実行をスキップすることができます。この機能を使用するには、イベントにイベントコマンド**ラベル**を設定する必要があります。ラベルには本来どんな名前でもつけることができますが、この機能を利用するためにはラベル名を**1**以上の整数を表す、一意の半角数字にする必要があります。設定するには、まずスキップの開始地点となる場所に半角数字の名前を持つラベルを設定します（例えば「1」）。その下にスキップ対象となるイベント（文章表示など）を任意の数だけ設定します。その下に、スキップ終了地点を表すラベルを配置します。このラベルの名前は、必ず始点ラベル名 **+1** にする必要があります（上記例では「2」にします）。この始点・終点ラベルに挟まれたイベントコマンド群を「ラベルサンドイッチ」と呼称します。ラベルサンドイッチはプレイヤーによってスキップされる可能性のあるイベントですので、ゲームの進行に必須のイベント（スイッチの操作など）を配置すべきではありません。あるイベントにラベルサンドイッチが2回登場し、それらの間にゲーム進行に必須のイベントを配置したいとします。例えば以下のような内容です。

![EventExample1](https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ReadmeImages/NovelGameUI4.png)

最初のラベルサンドイッチをA、次のサンドイッチをBとします。Aの終点であるラベル名は「2」ですが、Bの始点は「3」です。これらの名前は連番なので、間にある文章表示とスイッチ操作はスキップされてしまう可能性があります。これを防ぐためには、ラベルサンドイッチBのラベル名を以下のようにしてください。

![EventExample2](https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ReadmeImages/NovelGameUI5.png)

この場合、AとBは連番でないのでそれらの間のイベントコマンドはスキップ不可にすることができます。

デフォルトではスキップ可能なのは既読イベントのみです。あるラベルサンドイッチが「既読」であるかどうかは、そのサンドイッチの終点ラベルを一度でも通過したことがあるかどうかによって判定されます。通過済みラベル名はセーブデータに保存されます。通過済みであるかどうかはラベル名によって判定されるので、ラベル名が重複すると未読なのに既読とみなされてしまいます。そのため一度使用したラベル名はメモを取るなどして、ゲーム全体を通して2回以上使うことがないようにしてください。

プラグインパラメータ**マスターセーブファイルの作成**を**オン**にすると（デフォルトは**オン**です）、既読フラグを格納する**master.rmmzsave**というセーブファイルが新たに作成されるようになります。これはどのセーブスロットをロードしたとしても、あるいはニューゲームから始めたとしても、ゲーム開始時に読み込まれます。つまり既読フラグをセーブデータをまたいで持ち越すことが可能になります。

上記のように通常は既読イベントしかスキップできませんが、**既読のみスキップ可能**というオプションを**オフ**にすると未読イベントもスキップできるようになります。このオプションはプラグインパラメータ**既読のみスキップ可能の使用**を**オン**にする（デフォルトは**オン**です）ことでオプション画面に追加されます。プレイヤーに未読イベントをスキップさせたくない場合、このパラメータを**オフ**にしてください。またプラグインパラメータ**デフォルト既読のみスキップ可能**を**オン**にしてください（デフォルトは**オン**です）。このように設定することでゲーム中に設定が変更されなくなり、既読しかスキップできない状態に固定できます。

いま実行されているイベントが未読であるなどによりスキップできない場合、ボタン画像が「スキップ不可」として設定したものになります。スキップ可能である場合は「スキップ可」として設定した画像が表示されます。これにより、スキップ可能かどうかを視覚的に表現できます。


### オート
メッセージ送りが自動的に行われるようになります。メッセージの最後や制御文字「\\!」による入力待ちが行われなくなり、代わりにウェイトします。ウェイトする時間はプラグインパラメータ**ポーズフレーム数**により指定できます。

オートがオンになっている場合、「オン」として設定した画像が表示されます。オフの場合は「オフ」として設定した画像が表示されます。これにより、オートのオンオフを視覚的に表現できます。


### UI非表示
ウィンドウや制御ボタンといったUI要素が非表示になり、メッセージは一時停止します。タップや左/右クリック、決定ボタンやキャンセルボタンの押下により元に戻ります。プラグインパラメータ**表示ピクチャ番号**にピクチャ番号を設定する（複数設定可能）と、その番号のピクチャは通常時表示されなくなりますがUI非表示時にのみ表示されるようになります。スチル上に転載禁止などの文言や透かしなどを表示させたい場合等に使用してください。プラグインパラメータ**非表示ピクチャ番号**にピクチャ番号を設定する（複数設定可能）と、その番号のピクチャは通常時表示されますがUI非表示時にのみ非表示になります。UI部品等をピクチャで表示していて、それらも同時に非表示にしたい場合等に使用してください。


### ゲーム終了
即座にタイトルに戻ることができるボタンが追加されます。MZデフォルトでもF5キーを押すことで同様のことが可能ですが、こちらは確認ダイアログが表示されるという点が異なります。


## ライセンス
このプラグインはMITライセンスにてリリースされています。  
https://opensource.org/licenses/mit-license.php


## 使用方法
導入方法は通常のプラグインと同様ですが、**OptionEx.js**の導入が前提になります。  
**js/plugins**フォルダに**NovelGameUI.js**をコピーし、プラグイン管理にて**OptionEx.js**よりも下に配置して有効化してください。  
プラグイン説明にて本ドキュメントと同等の内容がご確認いただけます。また、プラグインパラメータもご覧ください。