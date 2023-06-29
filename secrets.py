import boto3
import os
import json

def set_environment_variables():
    secret_name = "MyDBCredentialsSecret"
    region_name = "ap-south-1"

    # Create a Secrets Manager client
    session = boto3.session.Session()
    client = session.client(service_name='secretsmanager', region_name=region_name)

    # Retrieve the secret value
    response = client.get_secret_value(SecretId=secret_name)

    if 'SecretString' in response:
        secret_value = response['SecretString']
    # Write the secret value to a file
        with open('secrets.json', 'w') as file:
            file.write(secret_value)
    else:
        pass

set_environment_variables()