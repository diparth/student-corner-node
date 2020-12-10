var express = require('express');
var router = express.Router();

router.get('', function(req, res, next) {
    res.json({ status: 200 });
});

router.get('/check-status/:appNo', function(req, res, next) {
    const query = `SELECT * FROM tbl_transcript WHERE application_no='${req.params.appNo}'`;

    global.connection.query(query, function (error, results, fields) {
        if(error){
            res.status(500).send(JSON.stringify({"status": 500, "error": error, "response": null})); 
        } else {
            res.send({
                status: 200,
                message: 'success',
                timestamp: new Date(),
                result: results[0]
            });
        }
    });
});

router.post('/add', function(req, res, next) {
    const enrollmentNo = req.body.enrollmentNo;
    const date = new Date();
    const timeStamp = Math.floor(date.getTime() / 1000);
    const newAppNumber = `${timeStamp}TS${enrollmentNo}`;

    const insertQuery = `INSERT INTO tbl_transcript (application_no,request_date,number_of_copies,semesters,degree_length,enrollment_no,status) VALUES ('${newAppNumber}','${timeStamp}',${req.body.numberOfCopies},${req.body.semesters},'${req.body.degreeLength}','${req.body.enrollmentNo}','${req.body.status}')`;

    global.connection.query(insertQuery, function(error, results, fields) {
        if (error) {
            res.status(500).send(JSON.stringify({"status": 500, "error": error, "response": null})); 
        } else {
            // console.log(results);
            res.send({
                status: 200,
                message: 'success',
                timestamp: new Date(),
                result: {
                    applicationNumber: newAppNumber,
                    status: 'submitted',
                    date,
                    ...req.body
                }
            });
        }
    });
});

module.exports = router;
