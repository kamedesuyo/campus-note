### campus-note
OECUメンバーで設計、プロトタイプ開発を行った学内向けSNSアプリケーション

## 概要
フロントエンド: react+vite
バックエンド: python 3.12.4(fastapi)
DBMS: Postgres(SQLAlchemy) ※alembic

## 実行方法(開発環境)
run.batまたはdockerを使用。
* run.batの場合
    * init.batを起動して依存関係をインストール
    * run.batを起動
* dockerの場合
    * init.batを起動して依存関係をインストール
    * docker compose buildを実行
    * docker compose upを実行