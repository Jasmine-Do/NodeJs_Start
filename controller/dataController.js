const Data = require('../model/data')
const jjv = require('jjv')
const env = jjv()
const dataValidate = require('../model/dataValidate')

const get_data = (req,res)=>{
    Data.find(function(err, items){
		if(err){
            res.status(400).send("Error");
			//res.render('data',{page:'Data',datas: []});;	
		}
		else{
            res.status(200).send("Home show list data");
			//return res.render('data',{page:'Data',datas: items});
		}
	});
}
const post_data = (req,res)=>{
    return res.render("data");
}

const delete_data = (req,res)=>{
    const myquery = { _id: req.params.id};
    Data.deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
    });
}

const get_x_data = (req,res)=>{
    Data.findById(req.params.id)
      .then((result)=>{
        res.render('data_info',{
		  page: 'Data info',
          datas: result
        })
      })
      .catch((err)=>{
        console.log(err)
      })
}



const update_data = async(req,res)=>{
    env.addSchema('data', dataValidate)
    const errors = env.validate('data', req.body)
    if(!errors)
    {
        const myquery = { _id: req.body._id };
        const result = await Data.updateOne(myquery, req.body)
        console.log(result)
        res.status(200).send('success!')
    }
    else {
        console.log(errors)
        res.status(400).send('Failed with error object ' + JSON.stringify(errors))
    }

    // env.addSchema('data', dataValidate)
    // const errors = env.validate('data', req.body)
    // if(!errors)
    // {   
    //     console.log('run')
    //     const myquery = { _id: req.body._id };
    //     Data.updateOne(myquery, req.body, function(err, res) {
    //         if (err) throw err;
    //         console.log("1 document updated");
    //     })
    //     .catch ((err) => {
    //         console.log(err)
    //     })
    // }
    // else {
    //     console.log(errors)
    //     res.send('Failed with error object ' + JSON.stringify(errors))
    // }
}

const search = (req,res)=>{
    let objWhere = {}
    const keys = req.body.key
    if (keys !== ''){
        objWhere.constiable_code = new RegExp(keys);
        Data.find(objWhere)
        .then((datas)=>{
            console.log(datas)
            res.send(datas)
            //res.render('data',{page:'Data',datas: datas})
        })
        .catch((err)=>{
            console.log(err)
            res.send(err)
        })
    }
}
module.exports = {
    get_data,
    get_x_data,
    post_data,
    delete_data,
    update_data,
    search
}