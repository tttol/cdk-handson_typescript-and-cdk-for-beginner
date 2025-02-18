#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkHandsonTypescriptAndCdkForBeginnerStack } from '../lib/cdk-handson_typescript-and-cdk-for-beginner-stack';

const app = new cdk.App();
new CdkHandsonTypescriptAndCdkForBeginnerStack(app, 'CdkHandsonTypescriptAndCdkForBeginnerStack');
