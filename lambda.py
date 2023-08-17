import boto3
from datetime import datetime
import json

class DatabaseAccess():
    def __init__(self, TABLE_NAME):
        # DynamoDB 세팅
        self.dynamodb = boto3.resource('dynamodb')
        self.table = self.dynamodb.Table(TABLE_NAME)
    
    def get_data(self):
        res = self.table.scan()
        items = res['Items'] # 모든 item
        count = res['Count'] # item 개수
        return items, count
    
    def put_data(self, input_data):
        self.table.put_item(
            Item =  input_data
        )
        print("Putting data is completed!")

def lambda_handler(event, context):
    
    db_access = DatabaseAccess('demo_planner_data')
    
    if event['Method'] == 'POST':
        input_data = {
        "index" : event['index'],
        "date"   : event['date']
        }
        db_access.put_data(input_data)
    
    elif event['Method'] == 'GET':
        items, count = db_access.get_data()
        data = db_access.get_data()
        print(f"items: {items}, count: {count}")
    
    else:
        print("Confirm the method!")
        
    # TODO implement
    return {
        'statusCode': 200,
        'body': data
    }