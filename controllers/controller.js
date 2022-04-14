
var objectId = require('mongodb').ObjectID;



var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });



var mongoose = require('mongoose');




mongoose.connect('mongodb://localhost:27017/Project', { useUnifiedTopology: true }, { useNewUrlParser: true });



var employeeSchema =new mongoose.Schema({
    name: String,
    email: String,
    location: String,
    phone: Number,
    title: String,
    address: String,
    age: Number,
    gender: String,
    salary: Number
})



var employeeModel = mongoose.model('addEmployee', employeeSchema);




module.exports = (app)=>{
    
    
//Route for home   
    app.get('/', (req,res)=>{
        employeeModel.find({},function(err,data){
            if(err) throw err;
            res.render('index', {employee : data});
        }) 
    });
    
       app.post('/', urlencodedParser, (req,res)=>{
          var newEmployee = employeeModel(req.body).save(function(err,data){
            if(err) throw err;
              res.redirect('/')
        })
    })
    
    

    //view code
   app.get('/:_id',(req,res)=>{
        
        employeeModel.find({_id: req.params._id},(err,data)=>{
            
        res.render('employee', {employee: data});    
                      })
        
    });


    //delete code
    app.delete('/:_id',(req,res)=>{
        
        employeeModel.find({_id: req.params._id}).deleteOne((err,data)=>{
            if(err) throw err;
            res.json(data)
        })
        
    });
    


    //Update Code
    app.post('/:_id',urlencodedParser,(req,res)=>{
        
        
        var item = {
            name: req.body.name,
            email: req.body.email,
            gender: req.body.gender,
            address: req.body.address,
            phone: req.body.phone,
            title: req.body.title,
            salary: req.body.salary,
            location:req.body.location,
        }
        var id = req.params._id;
        
        employeeModel.updateOne( {"_id": objectId(id)},{$set: item},(err,data)=>{
            if(err) throw err;
            res.redirect('back')
        })
        
    });
    
};
