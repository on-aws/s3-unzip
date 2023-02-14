# s3-unzip
Unzip archive on new object created events

## aws cli deployment
1. cd src && npm install && cd ..
2. aws cloudformation package --template-file templates/main.yaml --s3-bucket <YOR BUCKET NAME> --output-template-file templates/packaged.yaml
3. aws cloudformation deploy --template-file templates/packaged.yaml --stack-name <YOUR STACK NAME> --capabilities CAPABILITY_IAM
