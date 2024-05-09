'use strict';

var response = require('../../res');
var connection = require('../../connection');
var md5 = require('md5');

exports.index = function (req, res) {
    response.ok("REST API Worked!", res)
}

//GET ANIMALS
exports.webanimals = function (req, res) {
    connection.query(`SELECT animals.id_animal, animals.local_name, animals.latin_name, 
                        animals.habitat, animals.description, animals.city, animals.longitude, 
                        animals.latitude, animals.image, animals.amount, users.id_user, users.name, 
                        users.email, animals.date, animals.updated_at FROM animals JOIN users 
                        WHERE animals.id_user = users.id_user`,
        function (error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                response.ok(rows, res)
            };
        }
    )
};

//GET ID ANIMAL
exports.webanimalid = function (req, res) {
    let id = req.params.id;
    connection.query(`SELECT animals.id_animal, animals.local_name, animals.latin_name, 
                        animals.habitat, animals.description, animals.city, animals.longitude, 
                        animals.latitude, animals.image, animals.amount, users.id_user, users.name, 
                        users.email, animals.date, animals.updated_at FROM animals JOIN users 
                        WHERE animals.id_user = users.id_user AND animals.id_animal = ?`, [id],
        function (error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                response.ok(rows, res)
            };
        }
    )
};


//PUT ANIMAL
exports.webanimaledit = function (req, res) {
    let local_name = req.body.local_name;
    let latin_name = req.body.latin_name;
    let habitat = req.body.habitat;
    let description = req.body.description;
    let city = req.body.city;
    let longitude = req.body.longitude;
    let latitude = req.body.latitude;
    let image = req.body.image;
    let amount = req.body.amount;
    let now = new Date();
    let updated_at = now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2) + ' ' +
        ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2) + ':' + ('0' + now.getSeconds()).slice(-2);

    let id = req.params.id;

    connection.query(`UPDATE animals SET local_name=?,latin_name=?, habitat=?, description=?,
                        city=?, longitude=?, latitude=?,
                        image=?, amount=?, 
                        updated_at=? WHERE id_animal=?`,
        [local_name, latin_name, habitat, description, city, longitude, latitude, image, amount, updated_at, id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok(rows, res)
            };
        })
};

//DELETE ANIMAL
exports.webanimaldelete = function (req, res) {
    let id = req.params.id;
    connection.query('DELETE FROM animals WHERE id_animal=?',
        [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok(rows, res)
            };
        })
}
