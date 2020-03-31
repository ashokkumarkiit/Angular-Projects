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

var pg = require('pg');
const { Pool } = require('pg')

var bodyParser = require('body-parser');

// Connect to PostgreSQL server
//use default user name as postgres for the below

var conString = "pg://postgres:ashok0898@127.0.0.1:5432/uml_project";



var pgClient = new pg.Client(conString);
pgClient.connect();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'uml_project',
  password: 'ashok0898',
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
var exercises_found = [];
var exercise_detail = [];
var exercise_muscles = [];
var exercise_equipments = [];

router.route('/exercise/category').get((req, res) => {

  try {
    const query = {
      name: 'fetch-exercise-category',
      text: 'select * from exercisecategory order by name'
    }
    // Just to check for the try-catch block working or not
    // throw new Error('Uh oh!');
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
    /* 
    const query = {
        name: 'fetch-exercises',
        text: `select * from exercise where upper(name) not in('',upper('test'),upper('Abcd'),upper('Awesome')) and category=${id} and language=2 order by name;`,
    }
    console.log(query)

    find_exercises_from_wger(query).then(function (response) {
        res.json(
          { 
            'success': true,
            'exercises': exercises_found,
          });
    }); */
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
    /* 
    const query = {
        name: 'fetch-exercise-detail',
        text: `select e.id,e.name,e.description,ec.name as ex_cat_name
                from exercise as e, exercisecategory as ec
                where e.category = ec.id
                and e. id=${id};`,
    }
    console.log(query.text)

    find_exercise_detail_from_wger(query).then(function (response) {
        res.json(
          { 
            'success': true,
            'exercise_detail': exercise_detail,
          });
    }); */
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

    /* 
    const query = {
        name: 'fetch-exercise-muscle',
        text: `select ex_id,mu_id, name, is_front from map_exercise_muscle as em, muscle as m 
                where em.mu_id = m.id
                and ex_id=${id};`,
    }

    find_exercise_muscle_from_wger(query).then(function (response) {
        res.json(
          { 
            'success': true,
            'exercise_muscle': exercise_muscles,
          });
    }); */
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

    /* 
    const query = {
        name: 'fetch-exercise-equipment',
        text: `select ex_id,eq_id,name from 
                map_exercise_equipment as ee, equipment as eq
                where ee.eq_id = eq.id
                and ex_id=$1;`,
        values: [id]
    }

    find_exercise_equipment_from_wger(query).then(function (response) {
      var hits = response;  
      console.log(response);
      res.json(
        { 
          'success': true,
          'exercise_equipment': exercise_equipments,
        });
      console.log(exercise_equipments)
      exercise_equipments = []
    }); */
  }
  catch(ex) {
    res.json({
      error:ex.toString(),
      'success': false
    });
  }
});

async function find_exercises_from_wger(query) {
	const response = await pgClient.query(query);
  exercises_found = [];

    response.rows.forEach(element => {
      var exercise = {
        "id": element.id,
        "name": element.name,
        "description": element.description
      };

      exercises_found.push(exercise);
    }); 
    // return exercises_found;
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
    // return exercise_category;
}

async function find_exercise_detail_from_wger(query) {
  console.log(query)
  let response = await pgClient.query(query);
  console.log(response);
  exercise_detail = [];
    response.rows.forEach(element => {
      var exercise = {
        "id": element.id,
        "name": element.name,
        "description": element.description,
        "ex_cat_name": element.ex_cat_name
      };

      exercise_detail.push(exercise);
    }); 
    // return exercise_detail;
}

async function find_exercise_muscle_from_wger(query) {
	const response = await pgClient.query(query);
  exercise_muscles = [];
    response.rows.forEach(element => {
      var exercise_muscle = {
        "ex_id": element.ex_id,
        "mu_id": element.mu_id,
        "name": element.name,
        "is_front": element.is_front
      };

      exercise_muscles.push(exercise_muscle);
    }); 
    // return exercise_muscles;
}

async function find_exercise_equipment_from_wger(query) {
	const response = await pgClient.query(query);
  exercise_equipments = [];
    response.rows.forEach(element => {
      var exercise_equipment = {
        "ex_id": element.ex_id,
        "eq_id": element.mu_id,
        "name": element.name
      };

      exercise_equipments.push(exercise_equipment);
    }); 
    // return exercise_equipments;
}

app.use('/', router);

app.listen(4000, () => {

            console.log('Make sure you execute following command before you start the Angular client');

            console.log('');            
            //console.log('--------------------------------------------------------');

            // console.log('curl -H "Content-Type: application/json" -XPUT "http://localhost:9200/divvy_station_logs/_settings"  -d "{\"index\":{\"max_result_window\":10000000}}"');

            console.log('--------------------------------------------------------');
            console.log('');

            console.log('Express server running on port 4000')
});
