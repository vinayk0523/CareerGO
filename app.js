const express = require('express');
const path = require('path');
const app = express();
const staticPath = path.join(__dirname, '/public');
const fs = require('fs');
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer')

const envPath = path.join(__dirname, '/config.env');
require('dotenv').config({ path: envPath });
const pass = process.env.pass;

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kushal2005kumar@gmail.com',
        pass: `${pass}`
    }
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(staticPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
})


app.get('/subscribe/:id', (request, response) => {
    try {
        const id = request.params.id;
        console.log(id);
        var mailOptions2 = {
            from: 'kushal2005kumar@gmail.com',
            to: `${id}`,
            subject: 'NEWSLETTER SUBSCRIBED',
            html: `<h2>Career Go</h2>
                <p> Greetings from CAREER GO
                 You are now subscribed to the newsletter of Career Go.
                 </p>
                 <p>
                We love to resolve your doubts regarding career or anything else. Just feel free to post your doubt with your Mail Id on our contact us page and we will reply you back.</p>
                `
        };
        transporter.sendMail(mailOptions2, function (error, info) {
            if (error) {
                // console.log(error);
                response.status(400).send({ "result": "Email not sended. Something went wrong." });
            } else {
                console.log('Email sent: ' + info.response);
                // console.log(info);
                response.status(200).send({ "result": "Subscribe successfully" });
            }
        });

        // response.send({"result":"Succesfully Subscribed"});
    }
    catch (err) {
        console.log(err);
        response.status(400).send({ "result": "Some error occur" });
    }
})

app.post('/mail', (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const message = req.body.message;
        const subject = req.body.subject;
        var mailOptions = {
            from: 'kushal2005kumar@gmail.com',
            to: `vinay2001kumar23@gmail.com`,
            subject: 'DOUBTS',
            html: `<h2>Carrer Go</h2>
                    <b>Name : </b><p>${name}</p><br>
                    <b>Email : </b><p>${email}</p><br>
                    <b>Subject : </b><p>${subject}</p><br>
                    <b>Message : </b><p>${message}</p><br>
                    `
        };
        var mailOptions2 = {
            from: 'kushal2005kumar@gmail.com',
            to: `${email}`,
            subject: 'MAIL RECIEVED',
            html: `<h2>Career Go</h2>
                    <p>Thank You ${name} for mailing us. We will contact you soon.</p>
                    `
        };
        transporter.sendMail(mailOptions2, function (error, info) {
            if (error) {
                res.status(400).send({ "result": "Email not sended. Something went wrong." });
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).send({ "result": "Send successfully" });
            }
        });
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent to me successfully ');
            }
        });
    }
    catch (err) {
        console.log(err);
        res.send("some error occured");
    }
})

app.get('/usermessage', (req, res) => {
    let data = "";
    fs.readFile(path.join(__dirname, '/', 'data.txt'), 'utf-8', (err, file) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.status(200).send({ 'message': file });
        }
    })
})  

const write = async (data) => {
    try {
        fs.appendFileSync(path.join(__dirname, '/', 'data.txt'), data, async (err) => {
            if (err) {
                console.log(err);
                return "error";
            }
            else {
                console.log('Written');
                return true;
            }
        })
    }
    catch (err) {
        console.log(err);
        return false;
    }
}



app.post('/addmessage/', async (req, res) => {
    try {
        const email = req.body.email;
        const name = req.body.name;
        const message = req.body.message;
        
        const data = `<div class="card text-center border-info">
                            <div class="card-body ">
                                <h3 class="card-text">${name}</h3>
                                <p class="card-text">${message}</p>
                                <a href="mailto:${email}" class="card-text">${email}</a>
                            </div>
                        </div>
        <br>`
        // console.log(data);
        await write(data);
        fs.readFile(path.join(__dirname, '/', 'data.txt'), 'utf-8', (err, file) => {
            if (err) {
                console.log(err);
                return res.status(400).send({"result":false});
            }
            else {
                res.status(200).send({"result":true,"data":file});
            }
        })
        fetch('googel.com').then((data) => {}).catch((error) =>{})
    }
    catch (err) {
        res.send({"result":false});
        console.log(err);
    }
})

const port = 5002;
app.listen(port, () => console.log('Server Started at 5002'));