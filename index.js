const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');


const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    
    const myRecipe = new Recipe({
      title: 'Shrimp Scampi',
      level: 'Easy Peasy',
      ingredients: ['pasta', 'shrimp', 'butter', 'seasoning'],
      cuisine: 'Italian',
      dishType: 'main course',
      duration: 40,
      creator: 'AllRecipes',
      created: new Date
    })

    myRecipe.save()
    .then(res => console.log(res))
    .catch(err => console.log(err))

  //Iteration 3 - Insert multiple recipes

    Recipe.insertMany(data).then(res=>{
        
        //Iteration 4 Update recipe
        mongoose.set('useFindAndModify', false);
        Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'}, {duration: 100}, {new: true}) //avoids race condition ... We used a promise
          .then(res => { console.log('rigatonoi updated') })
          .catch(err => err)

          //Iteration 5  Remove a recipe
        Recipe.deleteOne({title: 'Carrot Cake'})
          .then(res => console.log('carot cake deleted'))
          .catch(err => err)

          //Iteration 6 Close the Database
        setTimeout( () => mongoose.connection.close() , 0)  // Adds to the end. 

    }).catch(err=> console.error(err))
 
  ////Iteration 4 - Update recipe
  
  }).catch(error => {
    console.error('Error connecting to the database', error);
  });





// Recipe.insertMany(recipes).then(res=>console.log(res)).catch(err => console.log(err))
// console.log(mongoose.model('Recipe'))
// Recipe.find({}).then(res => console.log(res))



// Recipe
// var query = {title:"Rigatoni alla Genovese"};
  // Recipe.findOneAndUpdate(query, { $set: { duration: '100' }})
  // .then(updateDuration => console.log(`${title} is updated with duration : ${updateDuration}!`))
  // .catch(err => console.log(`Error while updating duration: ${err}`));