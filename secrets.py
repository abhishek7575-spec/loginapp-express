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

    # Parse the secret JSON string
    secret_value = json.loads(response['SecretString'])

    # Set environment variables
    os.environ['RDS_ENDPOINT'] = secret_value['RDS_ENDPOINT']
    os.environ['USERNAME'] = secret_value['USERNAME']
    os.environ['PASSWORD'] = secret_value['PASSWORD']
    os.environ['DATABASE_NAME'] = secret_value['DATABASE_NAME']

set_environment_variables()

