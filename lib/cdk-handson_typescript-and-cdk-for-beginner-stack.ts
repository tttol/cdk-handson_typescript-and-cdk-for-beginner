import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { readFileSync } from 'fs';

export class CdkHandsonTypescriptAndCdkForBeginnerStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
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
    const script = readFileSync("./lib/resource/user-data.sh", "utf-8");
    webServer1.addUserData(script);

    webServer1.connections.allowFromAnyIpv4(ec2.Port.tcp(80));

    new CfnOutput(this, "WordpressServer1PublicIPAddress", {
      value: `http://${webServer1.instancePublicIp}`,
    })
  }
}
