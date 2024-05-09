'use strict';

var response = require('../../res');
var connection = require('../../connection');
var md5 = require('md5');

exports.index = function (req, res) {
    response.ok("REST API Worked!", res)
}

//GET REQUEST DATAS
exports.webrequestdatas = function (req, res) {
    connection.query(`SELECT * FROM request_datas`,
        function (error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                response.ok(rows, res)
            };
        }
    )
};


//GET ID REQUEST DATA
exports.webrequestdataid = function (req, res) {
    let id = req.params.id
    connection.query(`SELECT * FROM request_datas WHERE id_request_data=?`,[id],
        function (error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                response.ok(rows, res)
            };
        }
    )
};

//APPROVE REQUEST DATA
exports.webapproverequestdata = function (req, res) {
    let approve = req.body.approve;
    let id = req.params.id;

    if (approve == 1) {
        connection.query(`UPDATE request_datas SET approve=1 WHERE id_request_data=?`,
            [id],
            function (error, rows, fields) {
                if (error) {
                    console.log(error);
                } else {
                    response.ok(rows, res)
                }
            });
    } else if (approve == 2) {
        connection.query(`UPDATE request_datas SET approve=2 WHERE id_request_data=?`,
        [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok(rows, res)
            }
        });
    }
};

//SEND REQUEST DATA
exports.websendrequestdata = function (req, res) {
    let local_name = req.body.local_name;
    let latin_name = req.body.latin_name;
    let habitat = req.body.habitat;
    let description = req.body.description;
    let city = req.body.city;
    let longitude = req.body.longitude;
    let latitude = req.body.latitude;
    let image = req.body.image;
    let amount = req.body.amount;
    let date_start = req.body.date_start;
    let date_end = req.body.date_end;
    let id_request_data = req.body.id_request_data;

    // Langkah 1: Masukkan data ke dalam send_datas
    connection.query(`INSERT INTO send_datas 
                        (local_name, latin_name, habitat, description,
                        city, longitude, latitude, image, amount,
                        date_start, date_end) VALUES(?,?,?,?,?,?,?,?,?,?,?)`,
        [local_name, latin_name, habitat, description, city,
            longitude, latitude, image, amount, date_start, date_end],
        function (error, result, fields) {
            if (error) {
                console.log(error);
                res.status(500).send("Failed to insert data into send_datas");
            } else {
                // Langkah 2: Ambil id_send_data terbaru
                connection.query('SELECT MAX(id_send_data) AS max_id FROM send_datas', function (error, response, fields) {
                    if (error) {
                        console.log(error);
                        res.status(500).send("Failed to retrieve max id_send_data");
                    } else {
                        let id_send_data = response[0].max_id;
                        
                        // Langkah 3: Ambil data dari request_datas
                        connection.query(`SELECT * FROM request_datas WHERE id_request_data=?`, [id_request_data], function (error, results, fields) {
                            if (error) {
                                console.log(error);
                                res.status(500).send("Failed to retrieve data from request_datas");
                            } else {
                                if (results.length > 0) {
                                    let name = results[0].name;
                                    let email = results[0].email;
                                    let profession = results[0].profession;
                                    let instances = results[0].instances;
                                    let subject = results[0].subject;
                                    let body = results[0].body;
                                    let id_user = results[0].id_user;

                                    // Langkah 4: Masukkan data ke dalam history_request_datas
                                    connection.query(`INSERT INTO history_request_datas
                                                        (email, name, profession, instances, subject, body, id_user, id_send_data)
                                                        VALUES(?,?,?,?,?,?,?,?)`,
                                        [email, name, profession, instances, subject, body, id_user, id_send_data],
                                        function (error, rows, fields) {
                                            if (error) {
                                                console.log(error);
                                                res.status(500).send("Failed to insert data into history_request_datas");
                                            } else {
                                                console.log("Data successfully inserted into history_request_datas");
                                                res.status(200).send("Data successfully inserted into history_request_datas");                                                
                                            }
                                        });
                                } else {
                                    console.log("No data found for the specified ID.");
                                    res.status(404).send("No data found for the specified ID.");
                                }
                            }
                        });
                    }
                });
            }
        });
};
