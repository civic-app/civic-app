import {database} from '../../../firebase/initialize'


// Start Process to Send Data to Database

export function selectUserReference(path,userid,path2){
  return database.ref(path+"/"+userid+"/"+path2);
}

export function writeResponsesToUserRef(refToDatabasePath,id,item){
  refToDatabasePath.child(id).set(item);
}
