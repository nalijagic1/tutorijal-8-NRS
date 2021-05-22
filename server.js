

const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const sqlite3 = require('sqlite3').verbose();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
function beforeAndAfterEachShowGradove() {
    let db = new sqlite3.Database('./grad.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });
    db.serialize(() => {
        db.all(`SELECT NAZIV
                     FROM grad`, (err, rows, fields) => {
            if (err) {
                console.error(err.message);
            }
            res.json(JSON.stringify(rows));
        });
    });
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}

function startDb() {
    let db = new sqlite3.Database('./grad.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });
}

function closeDb() {
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}

app.get('/gradovi',function (req, res) {
    let db = new sqlite3.Database('./grad.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });
    db.serialize(() => {
        db.all(`SELECT *
                     FROM grad`, (err, rows, fields) => {
            if (err) {
                console.error(err.message);
            }
            res.send(rows);
        });
    });
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
});
app.get('/gradovi/:id',function (req, res) {
    let db = new sqlite3.Database('./grad.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });
    db.serialize(() => {
        db.all(`SELECT *
                     FROM grad WHERE id = ?`,[req.params.id], (err, rows, fields) => {
            if (err) {
                console.error(err.message);
            }
            res.json(JSON.stringify(rows));
        });
    });
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    }); 
});

app.post('/grad',function (req, res) {
    console.log(req.body)
    let db = new sqlite3.Database('./grad.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });
    db.run(`INSERT INTO grad VALUES(?,?,?)`, [req.body.id,req.body.naziv,req.body.broj_stanovnika], function(err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
       
      }); 
      res.send(req.body);
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });   
});
app.delete('/gradovi/:id',function (req, res) {
    let db = new sqlite3.Database('./grad.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });
    db.run(`DELETE FROM grad WHERE id=?`, [req.params.id], function(err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been deleted`);
      });
      res.end(`A row ${req.params.id} has been deleted`)
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });     
});
app.put('/gradovi/:id',function (req, res) {
    let db = new sqlite3.Database('./grad.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });
    db.run(`UPDATE grad SET broj_stanovnika = ? WHERE id = ?`, [req.body.broj_stanovnika,req.params.id], function(err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been updated`);
      });
      res.end(`A row ${req.params.id} has been updated`)
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });      
});
app.get('/', (req, res) => {
    console.log(__dirname + '/index.html')
    res.sendFile(path.join(__dirname, '/index.html'));
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
var server = app.listen(3001)



module.exports = server