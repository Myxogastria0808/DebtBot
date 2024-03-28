# DebtBot

## bot

-   使用言語: TypeScript
-   discord.js v14 で作成

## backend

-   使用言語: TypeScript
-   WebAPI: Hono
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
yarn migrate
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

> [!NOTE]
> WEBAPIURL は、適宜変えてください。

> [!CAUTION]
> 　 `.env`ファイルに書く内容は、外部に漏れてはいけない内容なので、必ず`.gitignore`ファイルに`.env`を書いてください。

```.env
TOKEN = ""
APPLICATIONID = ""
GUILDID = ""
REGISTERURL = ""
DELETEURL = ""
WEBAPIURL = "http://127.0.0.1:3000"

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
GUILDID = ""

#以下はPrismaによって自動生成されるので、省略
# This was inserted by ~


```

## DebtBot のテーブル設計

```mermaid
erDiagram
    User ||--|{ Debt : lend
    User ||--|{ Debt : borrow
    User {
        String discordId PK, UK "@id @unique"
        String discordName
        DateTime createdAt "@default(now())"
        DateTime updatedAt "@updatedAt"
        Debt debtLend "@relation('Lend')"
        Debt debtBorrow "@relation('Borrow')"
    }
    Debt {
        Int id PK, UK "@id @default(autoincrement())"
        Int money
        Boolean isPayOff
        DateTime createdAt "@default(now())"
        DateTime updatedAt "@updatedAt"
        String lendId FK "@relation(name: 'Lend', fields: [lendId], references: [discordId])"
        String borrowId FK "@relation(name: 'Borrow', fields: [borrowId], references: [discordId])"
    }
```

## WebAPI のオリジン

http://127.0.0.1:3000

## Prisma Studio のオリジン

http://127.0.0.2:5555

## Web API のエンドポイント

#### `/user/register`

-   ユーザーの登録を行うエンドポイント

#### `/user/delete`

-   登録されているユーザーの登録を削除するエンドポイント

#### `/debt/create`

-   借金情報を追加するエンドポイント

#### `/debt/pay-off`

-   `isPayOff`を`false`から`true`に変えるエンドポイント

#### `/debt/amount`

-   誰にどれくらい借金をしているかについての情報を返すエンドポイント

### 参考文献

https://qiita.com/Mijinko/items/df3d2e1f90dbed5a4019

https://uxmilk.jp/23592

https://qiita.com/masayoshi4649/items/46fdb744cb8255f5eb98

https://nova.drifting-clouds.com/blog/mermaid-drawing-with-mdx

https://github.com/sjwall/mdx-mermaid
