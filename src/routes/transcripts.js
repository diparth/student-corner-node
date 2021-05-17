var express = require('express');
var router = express.Router();

router.get('', function (req, res, next) {
	global.connection.query(
		'SELECT * from tbl_transcript',
		function (error, results, fields) {
			if (error) {
				res.send(JSON.stringify({ status: 500, error: error, response: null }));
				//If there is error, we send the error in the error section with 500 status
			} else {
				res.send({
					status: 200,
					message: 'success',
					timestamp: new Date(),
					result: results,
				});
			}
		}
	);
});

router.get('/check-status/:appNo', function (req, res, next) {
	const query = `SELECT * FROM tbl_transcript WHERE application_no='${req.params.appNo}'`;

	global.connection.query(query, function (error, results, fields) {
		if (error) {
			res
				.status(500)
				.send(JSON.stringify({ status: 500, error: error, response: null }));
		} else {
			res.send({
				status: 200,
				message: 'success',
				timestamp: new Date(),
				result: results[0],
			});
		}
	});
});

router.post('/add', function (req, res, next) {
	const enrollmentNo = req.body.enrollmentNo;
	const date = new Date();
	const timeStamp = Math.floor(date.getTime() / 1000);
	const newAppNumber = `${enrollmentNo}TS${timeStamp}`;

	const insertQuery = `INSERT INTO tbl_transcript (application_no,request_date,number_of_copies,semesters,degree_length,enrollment_no,status) VALUES ('${newAppNumber}','${timeStamp}',${req.body.numberOfCopies},${req.body.semesters},'${req.body.degreeLength}','${req.body.enrollmentNo}','submitted')`;

	global.connection.query(insertQuery, function (error, results, fields) {
		if (error) {
			res
				.status(500)
				.send(JSON.stringify({ status: 500, error: error, response: null }));
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
					...req.body,
				},
			});
		}
	});
});

router.post('/update', function (req, res, next) {
	const query = `UPDATE tbl_transcript SET status='${req.body.status}' WHERE application_no='${req.body.appNo}'`;

	global.connection.query(query, function (error, results, fields) {
		if (error) {
			res
				.status(500)
				.send(JSON.stringify({ status: 500, error: error, response: null }));
		} else {
			// console.log(results);
			res.send({
				status: 200,
				message: 'success',
				timestamp: new Date(),
				result: results,
			});
		}
	});
});

module.exports = router;
