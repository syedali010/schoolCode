import requests
import json

url = "http://localhost:3000/api/school"

# Example JSON document
data = {
    "name": "School-A",
    "status": "new",
    "startTime": "9:00am",
    "endTime": "2:00pm",
    "shift": "Morning",
    "address": {
        "town": "New Town",
        "tehsil": "City",
        "district": "Metropolis",
        "state": "State",
        "address": "123 Main Street",
        "latitude": 40.7128,
        "longitude": -74.0060
    },
    "hasProjector": True,
    "hasLaptop": True,
    "organization": {
        "name": "privateschools"
    }
}

# POST request to create a new school
response = requests.post(url, json=data)
print("POST Response:", response.json())

# Update some fields in the JSON document
updated_data = {
    "name": "Updated School-A",
    "status": "updated",
    "startTime": "10:00am",
    "endTime": "3:00pm",
    "shift": "Afternoon",
    "hasProjector": False,
    "hasLaptop": True
}

school_id = response.json()['_id']

#request to update the school document
response = requests.put(f"{url}/{school_id}", json=updated_data)
print("PUT Response:", response.json())

#request to retrieve the school document by ID
response = requests.get(f"{url}/{school_id}")
print("GET by ID Response:", response.json())

#request to retrieve a list of all schools
response = requests.get(f"{url}s")
print("GET All Response:", response.json())

#request to delete the school document by ID
response = requests.delete(f"{url}/{school_id}")
print("DELETE Response:", response.text)
