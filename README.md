
## SIT323 9.1P
There are two folders here, I originally planned to submit a demonstration of a headless mongo kubernetes service, however I was advised 09/05/2025 that this needed to be a headed instance. The folder marked Headless has a somewhat functional version of my original build, the Headed folder is the correct one.

Docker Image Name:

     ryanspeirs/task9.1p:latest
 Get the correct one with
 

    docker pull ryanspeirs/task9.1p:latest



## Operating Headless
Use these commands in this order to get this to work. 

    kubectl apply -f mongo-secret.yaml
    kubectl apply -f mongo-service.yaml
    kubectl apply -f mongo-pv.yaml
    kubectl apply -f mongo-pvc.yaml
    kubectl apply -f mongo-storage-class.yaml
    kubectl apply -f mongo-deployment.yaml
    kubectl apply -f mongo-cronjob.yaml
    kubectl apply -f mongo-backup-pv.yaml
    kubectl apply -f mongo-backup-pvc.yaml
    kubectl apply -f nodejs-deployment.yaml
    kubectl apply -f nodejs-service.yaml
After this, expose the port for the node js service 

     kubectl port-forward svc/nodejs-service 8080:80

In a separate terminal, expose the port for the mongodb service

    kubectl port-forward svc/mongo-service 27017:27017


Connect to it with Postman or Curl or Compass at

    http://localhost:8080/students

GET response will look like this

    { "_id": "long ID","name": "String", "age": Number, "__v": 0 }...

POST request to add an entry:

    http://localhost:8080/students
     {"name":  String, "age":  Number }
PUT request to update an entry

    http://localhost:8080/students/< ID value here >
        {"name":  String, "age":  Number }
DELETE request to remove an entry

    http://localhost:8080/students/< ID value here >

## Headless interaction
If you want to go into the mongodb pods directly, you will need to reference the mongo-headless service specifically.

       rs.initiate({
      _id: "rs0", 
      members: [
        { _id: 0, host: "mongo-0.mongo-headless:27017" },
        { _id: 1, host: "mongo-1.mongo-headless:27017" },
        { _id: 2, host: "mongo-2.mongo-headless:27017" }
      ]
    });


> Written with [StackEdit](https://stackedit.io/).
