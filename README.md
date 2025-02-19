# Overview
下記ハンズオン「TypeScript の基礎から始める AWS CDK 開発入門」の実施記録  
https://catalog.workshops.aws/typescript-and-cdk-for-beginner/ja-JP

# memo
- ファイル構成
  - bin/cdk-handson_typescript-and-cdk-for-beginner.ts
    - Appクラス
    - JavaでいうMainクラス
    - ここからコンストラクタを呼ぶ
  - lib/cdk-handson_typescript-and-cdk-for-beginner-stack.ts
    - CDKリソースを記述していくファイル
    - ここをメインに編集していく
- ドキュメントの見方
  - まずは各サービスの[Overview](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_rds-readme.html)をチェック
  - 建てたいリソースを探して、[Constructs](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_rds.DatabaseInstance.html)の章から探す
- RDSを立ち上げるとシークレットが自動的にSecretManagerに保存される