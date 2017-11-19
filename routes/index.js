var express = require('express');
var router = express.Router();

/*(function() {
    var childProcess = require("child_process");
    var oldSpawn = childProcess.spawn;
    function mySpawn() {
        console.log('spawn called');
        console.log(arguments);
        var result = oldSpawn.apply(this, arguments);
        return result;
    }
    childProcess.spawn = mySpawn;
})();*/

var cp = require("child_process");
var cp1 = require("child_process");
var commands = {
    list : "ls",	
    size : "lsblk -io SIZE",
    noOfUsers : "users" 	
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/exercise1_task1', function(req, res, next) {
   
    	var userArray = [];	
	var diskArray = [];
	var userData;
	var sizeData;

	var child = cp.exec(commands.noOfUsers);
	child.stdout.on("data", (data)=>{
	    userData += data;
	});
			
	child.stderr.on("data", (err)=>{
	  console.log(`error: ${err}`)
	});

	var child1 = cp1.exec(commands.size);
	child1.stdout.on("data", (data)=>{
	    sizeData += data;
	});
			
	child1.stderr.on("data", (err)=>{
	  console.log(`error: ${err}`)
	});

	setTimeout(function(){

		userData = userData.replace("undefined","");
		userArray = userData.split("\n");
		userArray.splice(-1,1);

		diskArray = sizeData.split("\n");
		diskArray.shift();		
		diskArray.splice(-1,1);	
		diskArray.forEach(function (i){
			i = i.trim();		
		});

	}, 2000);			
	
	setTimeout(function(){
		var exercise_1_Message = {
                message: 'exercise_1',
                numberUsers: userArray.length,
                userNames: userArray, 
                numStorageDisks: diskArray.length,
                storageDisksInfo: diskArray
		    };
		res.json( exercise_1_Message);	
	}, 4000);
});

router.route('/exercise1_task2')
    .get(function(req, res)
    {
        // ================================================================================================================
        /**
         * TO DO
         * 1. Add the default authentication to username: 'CCS' and password as 'CCS_exercise1_task2'.
         * 2. On success authentication return the response with value 'Successful Authentication'.
         * 3. In case of failure return the response with value 'Unsuccessful Authentication'.
         */
        // =================================================================================================================
        var auth;
        /**
         * check whether an autorization header was send
         */
        if (req.headers.authorization)
        {
            /**
             *  only accepting basic auth, so:
             * cut the starting 'Basic ' from the header
             * decode the base64 encoded username:password
             * split the string at the colon
             * should result in an array
             */
            auth = new Buffer(req.headers.authorization.substring(6), 'base64').toString().split(':');
        }
        /**
         *  checks if:
         * auth array exists
         * first value matches the expected username
         * second value the expected password
         */
        if (auth) {

		if(([0].toUpperCase() !== "CCS".toUpperCase()) && auth[1].toUpperCase() !== "CCS_exercise1_task2".toUpperCase()){
	
	    	        res.end('Unsuccessful Authentication');
		}
		else{
			res.send('Successful Authentication');		
		}
        }
        else {
            	res.send('Unsuccessful Authentication');
        }
    });


module.exports = router;
