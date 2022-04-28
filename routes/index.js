var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Product = require('../models/product');
var Cart = require('../models/cart');

router.get('/', function (req, res, next) {
	return res.render('index.ejs');
});


router.post('/', function(req, res, next) {
	console.log(req.body);
	var personInfo = req.body;
	if(!personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf){
		res.send();
	} else {
		if (personInfo.password == personInfo.passwordConf) {
			User.findOne({email:personInfo.email},function(err,data){
				if(!data){
					var c;
					User.findOne({},function(err,data){
						if (data) {
							console.log("if");
							c = data.unique_id + 1;
						}else{
							c=1;
						}
						var newPerson = new User({
							unique_id:c,
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

					}).sort({_id: -1}).limit(1);
					res.send({"Success":"You are regestered,You can login now."});
				}else{
					res.send({"Success":"Email is already used."});
				}

			});
		}else{
			res.send({"Success":"password is not matched"});
		}
	}
});

router.get('/login', function (req, res, next) {
	return res.render('login.ejs');
});

router.post('/login', function (req, res, next) {
	//console.log(req.body);
	User.findOne({email:req.body.email},function(err,data){
		if(data){
			
			if(data.password==req.body.password){
				//console.log("Done Login");
				req.session.userId = data.unique_id;
				//console.log(req.session.userId);
				res.send({"Success":"Success!"});
				
			}else{
				res.send({"Success":"Wrong password!"});
			}
		}else{
			res.send({"Success":"This Email Is not regestered!"});
		}
	});
});

router.get('/home', function (req, res, next) {
	User.findOne({unique_id:req.session.userId},function(err,data){
		if(!data){
			return res.redirect('/',{page:''});
		}else{
			Product.find(function(err, items){
				console.log(req.session.userId);
				if(err){
					console.log(err);
					return res.render('home.ejs',{page:'home',categories: []});;	
				}
				else{
					console.log(items);
					return res.render('home.ejs',{page:'home',categories: items});
				}
			});
		}
	});
});


router.get('/logout', function (req, res, next) {
	console.log("logout")
	if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
    	if (err) {
    		return next(err);
    	} else {
    		return res.redirect('/');
    	}
    });
}
});

router.get('/forgetpass', function (req, res, next) {
	res.render("forget.ejs");
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

//Product

router.get('/product/:id', function (req, res, next) {
	const id = req.params.id;
    Product.findById(id)
      .then((result)=>{
		console.log(result);
        res.render('productinfo.ejs',{
		  page: 'product info',
          id: result._id,
          name: result.name,
          price: result.price,
		  type: result.type,
		  detail: result.detail,
		  discount: result.discount,
		  image: result.image
        })
      })
      .catch((err)=>{
        console.log(err)
      })
});

router.delete('/product/delete/:id', function (req, res, next) {
    Product.deleteOne({_id:req.params.id})
      .then((result)=>{
		  res.redirect('/home')
      })
      .catch((err)=>{
        console.log(err)
      })
});

router.get('/add_product', function (req, res, next) {
	return res.render('addproduct.ejs',{page: 'Add Product'});
});

router.post('/add_product', function (req, res, next) {
	console.log(req.body);
	var productInfo = req.body;
	/*if(!productInfo.detail && !productInfo.discount){
		productInfo.detail = "";
		productInfo.discount = 0;
	} elseif (!productInfo.discount){
		productInfo.discount = 0;
	} elseif (!productInfo.detail){
		productInfo.detail = "";
	}*/
	if(!productInfo.name || !productInfo.type || !productInfo.price || !productInfo.image){
		res.send();
	} else {
		Product.findOne({name:productInfo.name},function(err,data){
			if(!data){
				var c;
				Product.findOne({},function(err,data){
					if (data) {
						c = data.unique_id + 1;
					}else{
						c=1;
					}
					var newProduct = new Product({
						unique_id:c,
						name:productInfo.name,
						price: productInfo.price,
						type: productInfo.type,
						image: productInfo.image,
						detail: productInfo.detail,
						discount: productInfo.discount
					});
					newProduct.save(function(err, Product){
						if(err)
							console.log(err);
						else
							console.log('Success');
					});
				}).sort({_id: -1}).limit(1);
				res.send({"Success":"Add success"});
			}else{
				res.send({"Success":"have data"});
			}
		});
	}
});

router.get('/category', function (req, res, next) {
	Product.find(function(err, items){
		if(err){
			console.log(err);
			return res.render('listproduct.ejs',{page:'Category',categories: []});;	
		}
		else{
			console.log(items);
			return res.render('listproduct.ejs',{page:'Category',categories: items});
		}
	});
});


router.get('/cart/:id', function (req, res, next) {
	var id_user = req.session.userId;
	Product.findOne({_id:req.params.id},function(data){
		if(!data){
			var c;
			Cart.findOne({id_product:data._id},function(data){
				if (data) {
					c = data.unique_id + 1;
				}else{
					c=1;
				}
				var newCart = new Cart({
					unique_id:c,
					id_user: id_user,
					id_product: data._id,
					name: data.name,
					price: data.price,
					image: data.image,
					quantity: 1,
					discount: data.discount
				});
				newCart.save(function(err, Cart){
					if(err)
						console.log(err);
					else
						console.log('Success');
				});
			}).sort({_id: -1}).limit(1);
			res.send({"Success":"Add success"});
			res.redirect("/home");
		}else{
			res.send({"Success":"have data"});
			res.redirect("/home");
		}
	});
});


router.get('/cart', function (req, res, next) {
	User.findOne({id_user:req.session.userId},function(err,data){
		if(!data){
			return res.render('cart.ejs',{page: 'cart detail',name: 's',price: 's',type: 's',discount: 's',image: 's'});
		}else{
			Cart.findById(req.session.userId)
			.then((result)=>{
				console.log(result);
				res.render('cart.ejs',{
				page: 'cart detail',
				name: result.name,
				price: result.price,
				type: result.type,
				detail: result.detail,
				discount: result.discount,
				image: result.image
				})
			})
			.catch((err)=>{
				console.log(err)
			})
		}
	});

});

module.exports = router;