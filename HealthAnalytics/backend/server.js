////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
//////////////////////              SETUP NEEDED                ////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

//  Install Nodejs (the bundle includes the npm) from the following website:
//      https://nodejs.org/en/download/


//  Before you start nodejs make sure you install from the
//  command line window/terminal the following packages:
//      1. npm install express
//      2. npm install pg
//      3. npm install pg-format


//  Read the docs for the following packages:
//      1. https://node-postgres.com/
//      2.  result API:
//              https://node-postgres.com/api/result


////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////


const express = require('express');

const axios = require('axios');

var pg = require('pg');
const { Pool } = require('pg')

var bodyParser = require('body-parser');

// Connect to PostgreSQL server
//use default user name as postgres for the below

var conString = "pg://postgres:root@127.0.0.1:5432/uml_project";



var pgClient = new pg.Client(conString);
pgClient.connect();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'uml_project',
  password: 'root',
  port: 5432,
});

const app = express();
const router = express.Router();


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

router.all('*', function (req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


var exercise_category = [];
var places_found = [];
const API_KEY = 'AIzaSyCIgk-WnRPk3W6SMK7RKFlLvgMDG_WdWPw';


router.route('/exercise/category').get((req, res) => {

  try {
    const query = {
      name: 'fetch-exercise-category',
      text: 'select * from exercisecategory order by name'
    }

    find_exercise_category_from_wger(query).then(function (response) {
        res.json(
          {
            'success': true,
            'exercise_category': exercise_category,
          });
    });
  }
  catch(ex){
    res.json({
      error:ex.toString(),
      'success': false
    });
  }
});

router.route('/exercises/:id').get((req, res) => {
  try{
    var id = req.params.id;
    pool.query(`select * from exercise where 
    upper(name) not in('',upper('test'),upper('Abcd'),upper('Awesome'))
    and category=$1 and language=2 order by name;`, [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(
        { 
          'success': true,
          'exercises': results.rows,
        });
    })
  }
  catch(ex) {
    res.json({
      error:ex.toString(),
      'success': false
    });
  }
});

router.route('/exercise/detail/:id').get((req, res) => {
  try{
    var id = req.params.id;

    pool.query(`select e.id,e.name,e.description,ec.name as ex_cat_name
    from exercise as e, exercisecategory as ec
    where e.category = ec.id
    and e. id=$1`, [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(
        { 
          'success': true,
          'exercise_detail': results.rows,
        });
    })

  }
  catch(ex) {
    res.json({
      error:ex.toString(),
      'success': false
    });
  }
});

router.route('/exercise/muscle/:id').get((req, res) => {
  try{
    var id = req.params.id;

    pool.query(`select ex_id,mu_id, name, is_front from map_exercise_muscle as em, muscle as m 
    where em.mu_id = m.id
    and ex_id=$1`, [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(
        { 
          'success': true,
          'exercise_muscle': results.rows,
        });
    })

  }
  catch(ex) {
    res.json({
      error:ex.toString(),
      'success': false
    });
  }
});

router.route('/exercise/equipment/:id').get((req, res) => {
  try{
    var id = req.params.id;

    pool.query(`select ex_id,eq_id,name from 
    map_exercise_equipment as ee, equipment as eq
    where ee.eq_id = eq.id
    and ex_id=$1`, [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(
        { 
          'success': true,
          'exercise_equipment': results.rows,
        });
    })

  }
  catch(ex) {
    res.json({
      error:ex.toString(),
      'success': false
    });
  }
});

router.route('/search/fitness/:lat/:lng/:rad').get((req, res) => {
  try{  
    var lat = req.params.lat;
    var lng = req.params.lng;
    var rad = req.params.rad;  
    places_api(lat,lng,rad).then(function (response) {
        res.json(
          {
            'success': true,
            'search_result': places_found,
          });
    });
  }
  catch(ex) {
    res.json({
      error:ex.toString(),
      'success': false
    });
  }
});

async function places_api(lat,lng,rad) {
  
  try {
    let url = "https://maps.googleapis.com/maps/api/place/textsearch/json?key="+API_KEY+"&type=gym&location="+lat+","+lng+"&radius="+rad;
    let api_result = await axios.get(url)
    // console.log(api_result)
    places_found = []
    api_result.data.results.forEach(item => {
      // console.log(item);
      var place = {
        "formatted_address": item.formatted_address,
        "latitude": item.geometry.location.lat,
        "longitude": item.geometry.location.lng,
        "name": item.name,
        "photos_url": item.photos && item.photos.length > 0 ? "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+item.photos[0].photo_reference+ "&key="+API_KEY : '',
        "rating": item.rating,
        "total_user_rating": item.total_user_rating,
      };
      places_found.push(place);
    });

  } catch (error) {
    console.error(error)
  }
}



async function find_exercise_category_from_wger(query) {
	const response = await pgClient.query(query);
  exercise_category = [];
    response.rows.forEach(element => {
      var exercise_cat = {
        "id": element.id,
        "name": element.name
      };

      exercise_category.push(exercise_cat);
    }); 
}



app.use('/', router);

app.listen(4000, () => {           
            console.log('--------------------------------------------------------');
            console.log('');
            console.log('Express server running on port 4000')
});
