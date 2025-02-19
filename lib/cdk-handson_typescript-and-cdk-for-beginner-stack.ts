import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import { Construct } from 'constructs';
import { readFileSync } from 'fs';

export class CdkHandsonTypescriptAndCdkForBeginnerStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // EC2 インスタンス のリソースタイプは AWS::EC2::Instance です
    // インスタンスタイプには t3.small を指定します
    // マシンイメージには Amazon Linux 2 を指定します
    // EC2 インスタンスはパブリックサブネットに配置します
    // ユーザーデータを利用して WordPress をインストールします
    // セキュリティグループでインターネットからの HTTP 80 番ポートへのアクセスを許可します
    const vpc = new ec2.Vpc(this, 'BlogVpc', {ipAddresses: ec2.IpAddresses.cidr('10.0.0.0/16')});

    // AmazonLinux2, t3.small
    const webServer1 = new ec2.Instance(this, "WordpressSever1", {
      vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.SMALL),
      machineImage: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
      vpcSubnets: {subnetType: ec2.SubnetType.PUBLIC},
    });

    // install wordpress etc...(yum install)
    const script = readFileSync("./lib/resources/user-data.sh", "utf-8");
    webServer1.addUserData(script);

    webServer1.connections.allowFromAnyIpv4(ec2.Port.tcp(80));

    new CfnOutput(this, "WordpressServer1PublicIPAddress", {
      value: `http://${webServer1.instancePublicIp}`,
    })

    // RDS DB インスタンス のリソースタイプは AWS::RDS::DBInstance です
    // データベースエンジンは MySQL の version 8.0.36 を使用します
    // RDS DB インスタンスのインスタンスタイプには t3.small を指定します
    // RDS DB インスタンスはプライベートサブネットにデプロイします
    // データベース名には wordpress を指定します
    // EC2 インスタンスから RDS DB インスタンスへのアクセスを許可します
    const db = new rds.DatabaseInstance(this, "WordPressDB", {
      engine: rds.DatabaseInstanceEngine.mysql({version: rds.MysqlEngineVersion.VER_8_0_36}),
      vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.SMALL),
      databaseName: "wordpress",
    })
    db.connections.allowDefaultPortFrom(webServer1);
  }
}
