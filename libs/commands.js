const Commands = {};

Commands.LIST = function(folder, path){
    
    function print(folder, stack) {
        for (var property in folder) {
            if (typeof folder[property] == "object" && Object.keys(folder[property]).length > 0  ) { //if the folder still contains an object, lets call the function again (recursive)
                print(folder[property], stack + '/' + property); //in each iteration I  added  escape sequences
            } else {
                console.log('---FOLDER--->',stack +  '/' + property); //finally when there is not object, print the stack 
            }    
        }
    }

    print(folder, '') //call function in order to print the folder that is an object
 }

Commands.CREATE = function(folder, path){
   let namePaths     = path[0].split("/"); //Get yhe name of the path
   let actualFolder  = folder; //set actual folder by reference
   for(let i=0; i<namePaths.length; i++){ //Iterate each name
        if(!actualFolder[namePaths[i]]) { //If the name is not in the folfer, init the path 
            actualFolder[namePaths[i]] = {};
        }
        actualFolder = actualFolder[namePaths[i]]; 
   }
   console.log(JSON.stringify(folder));
}


Commands.DELETE = function(folder, path){
    let keys = path[0].split('/');
    let prop = keys.pop(); //last prop
    let childs = keys.reduce((obj, key) => obj[key], folder); //Get the child object to delete them
    if(!childs || Object.keys(childs).length === 0){ //if I don't get the path, so we can not delete 
        console.log(`Cannot delete ${path}, it  does not exist `) 
        return false;
    }
    delete childs[prop]; //delete the child object
    console.log(JSON.stringify(folder));
    return true;
 }


 Commands.MOVE = function(folder, path){
    let keys = path[0].split('/');
    let childs = keys.reduce((obj, key) => obj[key], folder); //Get the child object to get the path completed
    let getProperties = (folder, stack)=> {
        for (var property in folder) {
            if (folder.hasOwnProperty(property)) {
                if (typeof folder[property] == "object" && Object.keys(folder[property]).length > 0  ) { //if the folder still contains an object, let  call the same function and concat "/"" to get all the name of the path completed
                    return getProperties(folder[property], stack + '/' + property); 
                } else {
                    return  stack+ '/' + property; 
                }
            }
        
        }
    };
    let subPath = getProperties(childs, ""); //return the subpath (completed) that we need to change
    let deleted = Commands.DELETE(folder, path); //delete the older path
    if(deleted === false){ //validate the result of the delete function
        console.log(`Cannot move ${path}, it  does not exist `)  
        return false;
    }
    let pathNew = subPath?   [path[1] + '/' +path[0]+ subPath ] : [path[1] + '/' +path[0]]; //if exists a subpath, we need to  concat the folder that we want to change, if not just concate the foler and the old
    Commands.CREATE(folder, pathNew) //create new objet with the new path
 }



module.exports = Commands;