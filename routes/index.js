var express = require('express');
var router = express.Router();
var User = require('../models/user');
 var Userpost = require('../models/status');

router.get('/', function (req, res, next) {
	if(req.session.loggedin)
	{
res.redirect('/profile')
	}else{
	 res.render('login');
	}
	
});

router.get('/registration',(req,res,next)=>{
if(req.session.loggedin){
	res.redirect('/profile');
}else{
	res.render('index');
}
})
router.post('/', function(req, res, next) {
	console.log(req.body);
	var personInfo = req.body;


	if(!personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf){
		res.send({"Success":"empty field !"});
	}  
		else if (personInfo.password !== personInfo.passwordConf) {
			res.send({"Success":"password is not matched"});

		}
        
			User.findOne({email:personInfo.email},function(err,data){
				if(data){
					res.send({"Success":"email to achei !"});
				}
					else{
				var newPerson = new User({
							
							email:personInfo.email,
							username: personInfo.username,
							password: personInfo.password,
							passwordConf: personInfo.passwordConf
						});

						newPerson.save(function(err, Person){
							if(err)
								console.log(err);
							else
								console.log('Success');
						});


					
						res.send({"Success":"You are regestered,You can login now."});
					}

			});
			
		
	
});

// router.get('/login', function (req, res, next) {
// 	 res.render('login');
// });

router.post('/login', function (req, res, next) {
	if(req.session.loggedin){
		res.redirect('/profile');
	}
	else{


	//console.log(req.body);
	User.findOne({email:req.body.email},function(err,data){
		if(data){
			
			if(data.password==req.body.password){
				 req.session.loggedin = true;
				//console.log("Done Login");
				req.session.userId = data._id;
				req.session.username = data.username;
				req.session.email = data.email;
				//console.log(req.session.userId);
				res.send({"Success":"Success!"});
				
			}else{
				res.send({"Success":"Wrong password!"});
			}
		}else{
			res.send({"Success":"This Email Is not regestered!"});
		}
	});}
});

router.get('/profile', function (req, res, next) {
	if(req.session.loggedin){
 var name = req.session.username;
 var email = req.session.email ;
   Userpost.find((err,doc)=>{
 res.render('data',{name:name,email:email,data:doc})})} else{
 	res.redirect('/');
 }
	
	// User.findOne({_id:req.session.userId},function(err,data){
	// 	console.log("data");
	// 	console.log(data);
	// 	if(!data){
	// 		res.redirect('/');
	// 	}else{
	// 		//console.log("found");
	// 		 res.render('data', {"name":data.username,"email":data.email});
	// 	}
	// });
});
//edit post


//delete post
router.get('/deletepost/:id', (req, res) => {
    Userpost.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/profile');
        }
        else { console.log('Error in post delete :' + err); }
    });
});

router.get('/logout', function (req, res, next) {
	console.log("logout")
	if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
    	if (err) {
    		 next(err);
    	} else {
    		 res.redirect('/');
    	}
    });
}
});

router.get('/forgetpass', function (req, res, next) {
	res.render("forget");
});

router.post('/forgetpass', function (req, res, next) {
	//console.log('req.body');
	//console.log(req.body);
	User.findOne({email:req.body.email},function(err,data){
		console.log(data);
		if(!data){
			res.send({"Success":"This Email Is not regestered!"});
		}else{
			// res.send({"Success":"Success!"});
			if (req.body.password==req.body.passwordConf) {
			data.password=req.body.password;
			data.passwordConf=req.body.passwordConf;

			data.save(function(err, Person){
				if(err)
					console.log(err);
				else
					console.log('Success');
					res.send({"Success":"Password changed!"});
			});
		}else{
			res.send({"Success":"Password does not matched! Both Password should be same."});
		}
		}
	});
	
});

module.exports = router;