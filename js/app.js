//$(document).foundation();

var count = 0;

class File{
	constructor(fid, name) {
  	this.fid = fid;
    this.name = name;
  }
}

class Node{
  constructor(file, parent, children) {
    this.file = file;
    this.parent = parent;
    this.children = children;
  }
}

class TreeRoot{
  constructor(nodes) {
    this._root = new Node(null, null, []);
    this.insert(nodes)
  }
  
  insert(nodes) {
  	for (var i = 0; i < nodes.length; i++) {
    	this._root.children.push(nodes[i])
      nodes[i].parent = this._root;
    }
  }
}

class OverDrive{
	
  //var tree;
	
  constructor() {
    this.setUpEventListeners();
    this.displayTree();
  }

  //Add appropriate event listeners to action buttons
  setUpEventListeners() {
    const actionsForm = document.querySelector('form#actions');
    const addUsersBtn = actionsForm.querySelector('.add-users');
    const removeUsersBtn = actionsForm.querySelector('.remove-users');
    const addOwnersBtn = actionsForm.querySelector('.add-owners');
    const removeOwnersBtn = actionsForm.querySelector('.remove-owners');
    const changePermBtn = actionsForm.querySelector('.change-permissions');
    addUsersBtn.addEventListener('click', (e) => this.handleAddUsers(e));
    removeUsersBtn.addEventListener('click', (e) => this.handleRemoveUsers(e));
    addOwnersBtn.addEventListener('click', (e) => this.handleAddOwners(e));
    removeOwnersBtn.addEventListener('click', (e) => this.handleRemoveOwners(e));
    changePermBtn.addEventListener('click', (e) => this.handleChangePermissions(e));
  }

  handleAddUsers(e) {
    e.preventDefault();
    const userIDs = this.parseUsers();
    const role = this.getRoleFromUI();
    //get file(s) from UI
    //call addToFile for given files, users, role
  }

  handleRemoveUsers(e) {
    e.preventDefault();
    const usersID = this.parseUsers();
    //get file(s) from UI
    //call removeFromFile for given files and users
  }

  handleAddOwners(e) {
    e.preventDefault();
    const usersID = this.parseUsers();
    //get file(s) from UI
    //call addOwners for given files and users
  }

  handleRemoveOwners(e) {
    e.preventDefault();
    const usersID = this.parseUsers();
    //get file(s) from UI
    //call removeOwners for given files and users
  }

  handleChangePermissions(e) {
    e.preventDefault();
    const usersID = this.parseUsers();
    const role = this.getRoleFromUI();
    //get file(s) from UI
    //call addToFile for given files and users
  }

  parseUsers() {
    const usersInput = document.querySelector('.users');
    const usersString = usersInput.value;
    const userEmails = usersString.split(/[\s,;]+/);
    console.log(userEmails);

    //Get user id's from list of emails
    //return user id's
  }

  getRoleFromUI() {
    const role = document.querySelector('input[name = "role"]:checked').value;
    return role;
  }
  
  populateTree() {
	// Get list of top-level files from user
	gapi.client.load('drive', 'v2', function() {
		var q = "'root' in parents and trashed=false";
		var request = gapi.client.drive.files.list({
			'q': query
		});
		request.execute(function(response) {
			if(response.error) {
				console.log("Error with list execution");
			}
			else {
				//Do something with list of files
				console.log(resp.items);
			}
		});
	});
	//For each file, call populateTreeRecurse
  }
  
  populateTreeRecurse() {
	//Perform depth-first insertion
  }
  
  displayTree() {
    //Clear current tree UI
    //For each toplevel file in tree, call displayTreeRecurse
	/*for(i = 0; i < tree.root.length; i++) {
		displayTreeRecurse(tree.root[i]);
	}*/
  }
  
  displayTreeRecurse(node) {
    //Add file to tree UI
    //Call displayTreeRecurse() on each child
	/*for(int i = 0; i < node.children.length; i++) {
		displayTreeRecurse(node.children[i]);
	}*/
  }
}


function listFiles(){
  var root = DriveApp.getFolderById(folderId);
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.clear();
  getChildFiles(root.getName(), root, sheet);
  sheet.appendRow([count.toString()]);
};

function listFolders(){
  var root = DriveApp.getFolderById(folderId);
  var sheet = SpreadsheetApp.getActiveSheet(); 
  sheet.clear();
  getChildFolders(root.getName(), root, sheet);
  sheet.appendRow([count.toString()]);
};

function listItems(){
  var root = DriveApp.getFolderById(folderId);
  var sheet = SpreadsheetApp.getActiveSheet();
  var data;
  sheet.clear();
  var childFolders = root.getFolders();
  while (childFolders.hasNext()) {
    var childFolder = childFolders.next();
    data = [ 
      root + "/" + childFolder.getName()
    ];
    sheet.appendRow(data);
   count = count + 1;
  }
  var files = root.getFiles();
  while (files.hasNext()) {
      var childFile = files.next();
      data = [ 
        root + "/" + childFolder.getName() + "/" + childFile.getName(),   
      ];
      sheet.appendRow(data);
      count = count + 1;
    }   
  sheet.appendRow([count.toString()]);
};

function getChildFiles(parentName, parent, sheet) {
  var childFolders = parent.getFolders();
  while (childFolders.hasNext()) {
    var childFolder = childFolders.next();
    data = [ 
      parentName + "/" + childFolder.getName()
    ];
    sheet.appendRow(data);
    var files = childFolder.getFiles();
    count = count + 1;
    while (files.hasNext()) {
      var childFile = files.next();
      data = [ 
        parentName + "/" + childFolder.getName() + "/" + childFile.getName(),   
      ];
      sheet.appendRow(data);
      count = count + 1;
    }   
    getChildFiles(parentName + "/" + childFolder.getName(), childFolder, sheet);  
  }
};

function getChildFolders(parentName, parent, sheet) {
  var childFolders = parent.getFolders();
  var data;
  while (childFolders.hasNext()) {
    var childFolder = childFolders.next();
    data = [ 
      parentName + "/" + childFolder.getName()
    ];
    sheet.appendRow(data);
    var files = childFolder.getFiles();
     count = count + 1;
    getChildFolders(parentName + "/" + childFolder.getName(), childFolder, sheet, count);  
  }
};

const overDrive = new OverDrive();