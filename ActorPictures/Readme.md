# アクター立ち絵管理(ActorPictures)

## 概要
アクターごとに立ち絵を設定できるようにするプラグインです。標準の立ち絵のほか、ダメージ差分やステート差分も設定できます。また、標準・ダメージ・ステートそれぞれに複数の立ち絵を設定でき、表情や衣装差分に利用できます。

このプラグインを単独で導入しても特に意味はありませんが、**AltMenuScreen立ち絵表示**および**会話時自動立ち絵表示**プラグインのベースプラグインになります。  
なお**AltMenuScreen立ち絵表示**と**会話時自動立ち絵表示**はそれぞれ独立したプラグインですので、どちらか一方の単独使用が可能です。

## ライセンス
このプラグインはMITライセンスにてリリースされています。  
https://opensource.org/licenses/mit-license.php

## 使用方法
導入方法は通常のプラグインと同様です。  
**js/plugins**フォルダに**ActorPictures.js**をコピーし、プラグイン管理にて有効化してください。
その他の詳細はプラグイン説明（プラグインパラメータ）をご覧ください。  

***

# AltMenuScreen立ち絵表示(ActorPictureOnAltMenuScreen)

## 概要
ロンチプラグイン**AltMenuScreen.js**の表示を変更するプラグインです。顔グラフィックを描画する代わりに、立ち絵を描画します。立ち絵はベースプラグイン**ActorPictures.js**にて設定したものが反映されます。

![AltMenuScreen](https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ReadmeImages/ActorPictureOnAltMenuScreen1.png)

## ライセンス
このプラグインはMITライセンスにてリリースされています。  
https://opensource.org/licenses/mit-license.php

## 使用方法
導入方法は通常のプラグインと同様ですが、上記**ActorPictures.js**の導入が前提になります。  
**js/plugins**フォルダに**ActorPictureOnAltMenuScreen.js**をコピーし、プラグイン管理にて**ActorPictures.js**よりも下に配置して有効化してください。  
その他の詳細はプラグイン説明をご覧ください。  

***

# 会話時自動立ち絵表示(PictureMessage)

## 概要
メッセージの名前枠に専用制御文字を入力するだけで、自動的にアクターの立ち絵を表示するプラグインです。マップ・戦闘どちらのイベントにも対応しています。立ち絵は上記**ActorPictures.js**にて設定したものが反映されます。

立ち絵は左・右・中央の３箇所にそれぞれ配置することができます。  
あるアクターがメッセージを始めると、イージングによって登場します。同じ位置に別のアクターを配置した場合、前のアクターがイージングによって退場し、次のアクターがイージングで登場します。また、今話しているアクター以外は自動的にグレートーンになります。

設定方法は非常にシンプルです。メッセージの名前枠に **\AP[n*位置*]** と入力するだけで、そのIDのアクターの立ち絵が登場するようになります。位置は**左・右・中央**などの文字列を指定できます。

![NameField](https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ReadmeImages/PictureMessage1.png)

会話終了時は自動的に立ち絵が消えることはありませんのでプラグインコマンドにて手動で退場させます。これにより、立ち絵消去のタイミングをイベントでコントロールすることができます。

また、表情などの差分も顔グラフィックを使用することで簡単に切り替えられます。


顔グラフィックを指定することでアクターの立ち絵インデックスが変更され、それに対応する立ち絵（**ActorPictures.js**により設定）が表示されます。  
顔グラフィックはあくまでもインデックス指定用であり実際には表示されませんので、アクターごとに専用画像を用意する必要はなく、共通画像で問題ありません。

![Face](https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ReadmeImages/PictureMessage2.png)

![Expressions](https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ReadmeImages/PictureMessage3.png)

立ち絵の表示座標はプラグインパラメータにより左・右・中央ごとに設定できます。また、立ち絵によって表示位置がズレる場合、**ActorPictures.js**のプラグインパラメータによって画像ごとに調整することも可能です。

![Coordinates](https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ReadmeImages/PictureMessage4.png)

![Calibration](https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ReadmeImages/PictureMessage5.png)

また、ループアニメの再生にも対応しています。立ち絵が表示されている間、まばたきなどのアニメを再生し続けることができます。


素材規格としては、横方向にパターンを任意の数だけ並べることでこのループアニメに対応します。

![LoopAnimation](https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ReadmeImages/PictureMessage6.png)

アニメは**ActorPictures.js**のプラグインパラメータにて設定できます。パターン数やタイミングを細かく調整できます。

![AnimationParameters](https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ReadmeImages/PictureMessage7.png)

立ち絵をコントロールするプラグインコマンドもいくつか用意されています。プラグインコマンド**フキダシアイコンの表示**では、フキダシアイコンを表示することができます。アイコンの種類はツクール標準機能と同じものが選べるほか、位置や拡大率も設定できます。

![Balloon](https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ReadmeImages/PictureMessage8.png)

プラグインコマンド**アニメーションの表示**にて、スキル等と同じアニメを立ち絵に表示することもできます。

![ShowAnimation](https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ReadmeImages/PictureMessage9.png)

ピクチャ関連の標準イベントコマンドと同様の各種プラグインコマンドが用意されており、立ち絵の表示状態を制御できます。回転や色調変化のほか、立ち絵を移動させることも可能です。標準のイベントコマンド**ピクチャの移動**と同様に座標だけでなく拡大率や透明度も変更できますし、イージングさせることも可能です。

![RotationAndTone](https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ReadmeImages/PictureMessage10.png)

立ち絵は非会話時にも呼び出すことが可能です。表示状態はセーブデータに含まれるので、ロードすれば再現されます。

![PictureOnMap](https://github.com/nz-prism/RPG-Maker-MZ/blob/master/ReadmeImages/PictureMessage11.png)

## ライセンス
このプラグインはMITライセンスにてリリースされています。  
https://opensource.org/licenses/mit-license.php

## 使用方法
導入方法は通常のプラグインと同様ですが、上記**ActorPictures.js**の導入が前提になります。  
**js/plugins**フォルダに**PictureMessage.js**をコピーし、プラグイン管理にて**ActorPictures.js**よりも下に配置して有効化してください。  
その他の詳細はプラグイン説明をご覧ください。