const csvFilePath = './names_score_alltime.csv';
const csv = require('csvtojson');
const gender = require('gender-detection');
/*const GoogleSearch = require('google-search');
const googleSearch = new GoogleSearch({
    key: 'AIzaSyDi71Uj5syCSMoOM3L60U7jJNLmNVOqVcg',
    cx: '007802017970984163645:8vspjdlarwy'
});*/

const express = require("express");
const app = express();

app.listen(4000, () => {
    console.log("Server running on port 4000");
});

app.get("/", (req, res, next) => {


    let names = [];
    let male = 0;
    let female = 0;
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            jsonObj.forEach((singleScore) => {
                names.push(gender.detect(singleScore.first));
            })
            genderChecker(names)
        })
    const genderChecker = (names) => {
        names.map((singleName) => {
            if (singleName === "male") {
                male += 1;
            } else if (singleName === "female") {
                female += 1;
            }
        })
        console.log(male);
        console.log(female);
        res.json({ Male: male, Female: female });
    }

});

/*const resultCountMale = ((name, callback) => {
    googleSearch.build({
        q: 'Max his',
    }, (error, response) => {
        if (error) { return true };
        return callback(response.searchInformation.totalResults);
    });
});

const resultCountFeMale = ((name, callback) => {
    googleSearch.build({
        q: 'Max her',
    }, (error, response) => {
        if (error) { return true };
        return callback(response.searchInformation.totalResults);
    });
});
let male = 0;
let female = 0;
const genderChecker = (names) => {
    let playAgain = true;
    let i = 0;

    while (playAgain && i < names.length) {
        resultCountMale(names[i], (res) => {
            console.log(res);
            let m;
            let f;
            if (res) {
                m = res;
                console.log(res);
                resultCountFeMale(names[i], (res) => {
                    if (res) {
                        f = res;
                        playAgain = true;
                    } else {
                        playAgain = false;
                    }
                    console.log(m);
                    console.log(f);
                    if (m > f) {
                        male += 1;
                    } else {
                        female += 1;
                    }

                })
            } else {
                playAgain = false;
            }

        })
        i++;
    }
    console.log("male" + male);
    console.log("female" + female);
}*/




