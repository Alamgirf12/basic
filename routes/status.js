var express = require('express');
var router = express.Router();
var moment = require('moment');
 var Userpost = require('../models/status');

router.get('/', (req, res, next) => {
  Userpost.find((err,doc)=>{


   
    res.render('post',{data:doc})
      })
    });


router.post('/add', function(req, res, next) {
	console.log(req.body);
	var st = req.body;


				var newStatus = new Userpost({
							
							username:req.session.username,
							title:st.title,
							posts: st.posts,
							time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
							
						});

						newStatus.save(function(err, results){
							if(err)
								console.log(err);
							else
								console.log('Success');
							res.redirect('/profile');
							
						});


			});


		
	



module.exports = router;