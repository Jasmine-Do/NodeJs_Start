var User = require('../models/user');
var Product = require('../models/product');
var Cart = require('../models/cart');

const index = (req,res)=>{
    User.findOne({unique_id:req.session.userId},function(err,data){
		if(!data){
			return res.redirect('/login');
		}else{
			Product.find(function(err, items){
				console.log(req.session.userId);
				if(err){
					console.log(err);
					return res.render('home',{page:'home',categories: []});;	
				}
				else{
					console.log(items);
					return res.render('home',{page:'home',categories: items});
				}
			});
		}
	});
} 

const get_login = (req,res)=>{
    User.findOne({unique_id:req.session.userId},function(err,data){
		if(!data){
			return res.render('login',{page:'login'});
		}else{
			res.redirect('/');
		}
	});
}

const login = (req,res)=>{
    User.findOne({email:req.body.email},function(err,data){
		if(data){
			if(data.password==req.body.password){
				req.session.userId = data.unique_id;
				res.send({"Success":req.session.userId});	
			}else{
				res.send({"Success":"Wrong password!"});
			}
		}else{
			res.send({"Success":"This Email Is not regestered!"});
		}
	});
}


const logout = (req,res)=>{
    console.log("logout")
	if (req.session) {
    // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/login');
            }
        });
    }
}

const get_register = (req,res)=>{
    return res.render("register");
}

const register = (req,res)=>{
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
}

const get_add_product = (req,res)=>{
    return res.render("addproduct",{page:'add product'});
}

const add_product = (req,res)=>{
    var productInfo = req.body;
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
}



module.exports = {
    index,
    get_login,
    login,
    logout,
    get_register,
    register,
    get_add_product,
    add_product
}