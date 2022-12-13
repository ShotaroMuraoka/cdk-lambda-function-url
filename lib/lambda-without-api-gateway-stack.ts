import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class LambdaWithoutApiGatewayStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const fn =  new lambda.Function(this, 'LambdaFunction', {
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'app.lambda_handler',
      code: lambda.Code.fromAsset('./lambda'),
    });

    const fnUrl = fn.addFunctionUrl({
      // authType: lambda.FunctionUrlAuthType.NONE,
    });
    new cdk.CfnOutput(this, 'TheUrl', {
      value: fnUrl.url,
    });
  }
}
