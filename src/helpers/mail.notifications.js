const nodemailer = require("nodemailer");

var SUCCESS = { code: 1, success: true, message: "Success", result: null };
var FAIL = { code: 0, success: false, message: "Fail" };
var SOME_THONG_WENTWRONG = { code: 0, success: false, message: "Something went wrong" };

exports.SCCESS = SUCCESS;
exports.FAIL = FAIL;
exports.SOME_THONG_WENTWRONG = SOME_THONG_WENTWRONG;

const SendMail = async (mailData) => {

    let message = "<html><head></head><body>";
    message = message + "<strong> Dated : " + Date.now() + "</strong>";
    message = message + "<br/><br/><br/><br/>";
    message = message + "Dear Sir,";
    message = message + "<br/><br/><br/><br/>";
    message = message + "Please do accept Test Notification:-";
    message = message + "<br/><br/>";
    message = message + "<br/><br/><br/><br/>";
    message = message + "Regards";
    message = message + "<br/>";
    message = message + "Tariq";
    message = message + "</body></html>";

    try {
        var transporter = nodemailer.createTransport({
            //service: 'googlemail.com',
            //host: "smtp.googlemail.com",
            //port: 465,
            service: 'gmail',
            //secure: true,
            auth: {
                user: "tariq.sulehri@gmail.com",
                pass: "786Allahis1"
            }
        });

        var mailOptions = {
            from: "tariq.sulehri@gmail.com",
            to: 'tariq.sulehri@gmail.com', // Can Add , Seprated List of Emails
            subject: "Test Notifications...",
            html: message
        };

        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("Email Sending Error:", error);
            } else {
                console.log("Email Sent: " + info.response);
            }
        });

        let obj = {
            status: "success",
            email_details: mailOptions
        };

        return SUCCESS;

    } catch (error) {
        console.log(error);
        return FAIL;
    }

}



module.exports = SendMail;