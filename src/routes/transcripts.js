var express = require('express');
var router = express.Router();

router.get('', function(req, res, next) {
    res.json({ status: 200 });
});

router.post('/add', function(req, res, next) {
    const enrollmentNo = req.body.enrollmentNo;
    const date = new Date();
    const timeStamp = Math.floor(date.getTime() / 1000);
    const newAppNumber = `${timeStamp}TS${enrollmentNo}`;

    res.send({
        status: 200,
        msg: 'success',
        result: {
            applicationNumber: newAppNumber,
            status: 'submitted',
            date,
            ...req.body
        }
    });
});

module.exports = router;
