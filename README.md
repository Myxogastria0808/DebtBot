# discord.js v14 × discord の OAuth2

## bot

-   言語: TypeScript
-   主に、 discord.js v14 を使用

### 用意している Slash Command

#### `/register-user`

-   ユーザー登録を行うスラッシュコマンド

#### `/register-delete`

-   ユーザー削除を行うスラッシュコマンド

#### `/approval`

-   ユーザー登録をしたユーザーのみが、`You are authorized!`という返信を見ることができるコマンド

## backend

-   言語: TypeScript
-   Web API: Hono
-   ORM: Prisma
-   RDBMS: MySQL

> [!CAUTION]
> プログラムの中に、`console.log()`するべきでない内容を`console.log()`しています。実際にこのプログラムを使用する際は、`console.log()`を全て消してください。

### 使用を推奨しているパッケージマネージャー

-   yarn

## Setup

### windows ユーザー

> [!CAUTION]
> 以下のコマンドたちを実際に実行して試していないので、ご注意ください。

```batch
make-env.cmd
cd bot
yarn
cd ..
cd backend
yarn
#データベースに関する情報を適宜書き換える
prisma migrate
```

### `.env`ファイルの生成

### Batchfile

```batch
make-env.cmd
```

### Shell

> [!CAUTION]
> Linux 環境で実行した際の動作の確認をしていないため正しく動作しない可能性があります。

```shell
bash make-env.sh
```

### bot に置く`.env`ファイルの中身

> [!NOTE]
> 空の文字列(または数字)に適切な情報を入力してください。

> [!CAUTION]
> 　 `.env`ファイルに書く内容は、外部に漏れてはいけない内容なので、必ず`.gitignore`ファイルに`.env`を書いてください。

```.env
TOKEN = ""
APPLICATIONID = ""
GUILDID = ""
REGISTERURL = ""
DELETEURL = ""

```

### backend に置く`.env`ファイルの中身

> [!NOTE]
> 空の文字列(または数字)に適切な情報を入力してください。

> [!NOTE]
> IPADDRESS と PORT は、適宜変えてください。

> [!CAUTION]
> 　`.env`ファイルに書く内容は、外部に漏れてはいけない内容を含むので、必ず`.gitignore`ファイルに`.env`を書いてください。

```.env
IPADDRESS = "127.0.0.1"
PORT = "3000"
CLIENTID = ""
CLIENTSECRET = ""

#以下はPrismaによって自動生成されるの省略
# This was inserted by ~


```

## 参考にさせていただいたサイト

https://qiita.com/masayoshi4649/items/46fdb744cb8255f5eb98

https://discordjs.guide/oauth2/#a-quick-example

https://qiita.com/sukeo-sukeo/items/6e86906d88e1110bbb36

https://hono.dev/top

https://www.server-memo.net/shellscript/file_check.html

http://www.ajisaba.net/sh/get_dir.html

https://tech.kurojica.com/archives/20987/

https://qiita.com/richmikan@github/items/eefbaed716e5ed198973

http://tech.clickyourstyle.com/articles/23

https://qiita.com/take4s5i/items/e207cee4fb04385a9952

https://qiita.com/shin1rok/items/efb5052ef5fb8138c26d

https://qiita.com/plcherrim/items/8edf3d3d33a0ae86cb5c

https://rainbow-engine.com/batch-folderfile-existcheck/

https://setips.net/bat/bat-exist/

https://note.alhinc.jp/n/n828e5d7a417f

https://qiita.com/tera1707/items/e8c5cacac28b2cd7598f
