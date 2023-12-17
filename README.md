# schoolCode
Technologies to use 
NodeJS 
MongoDB  
Python for rest client 

Develop a REST service using NodeJS to accept JSON document attached in the document at the end and stores in MongoDB. When the JSON document is posted separate JSON into three collections 
School
Address
Organization
Save the attributes in the appropriate collection. Save the resulting address ID and organization ID into the School Document. 
 
Modify some fields in the JSON document and except name and address fields and repost the document and it should update the same document. Lookup the school document with name and address record by address field and update the documents if exists or create new document 
GET REST api to get the same JSON document by ID and also another GET API to get list of ALL schools 
DELETE REST api to delete the school document by ID 
python code to POST documents to the REST API 

   {
       "name": "School-A",
       "status": "old",
       "startTime": "8:30am",
       "endTime": "1:30pm",
       "shift": "Morning",
       "address": {
           "town": "Nehar Kot",
           "tehsil": "Barkhan",
           "district": "Barkhan",
           "state": "Balochistan",
           "address": "address-1",
           "latitude": 29.79,
           "longitude": 69.47
       },
       "hasProjector": false,
       "hasLaptop": false,
       "organization": {
           "name": "publicschools"
       }
   },
