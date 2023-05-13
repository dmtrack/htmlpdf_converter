"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fakeDriftItems = void 0;
const fs_1 = __importDefault(require("fs"));
const randomstring = require('randomstring');
const moment_1 = __importDefault(require("moment"));
const fakeDriftItems = () => {
    const data = {};
    const getRandomBoolean = () => {
        return Math.random() < 0.5;
    };
    const getRandomDate = () => {
        return (0, moment_1.default)(faker.date.past()).format('YYYY-MM-DD');
    };
    const getRandomNumber = () => {
        return faker.random.number();
    };
    const getRandomString = (length) => {
        return randomstring.generate(length);
    };
    const famousDriftCars = [
        'https://www.superstreetonline.com/features/sstp-1110-battle-of-japans-iconic-drift-cars/',
        'https://www.speedhunters.com/2016/05/the-5-most-iconic-drift-cars/',
        'https://blog.caranddriver.com/the-13-coolest-factory-drift-cars-of-all-time/',
        'https://www.drifted.com/top-10-jdm-cars-for-diy-drift-builds/',
        'https://drivetribe.com/p/6-of-the-best-drift-cars-of-all-FJ8aek0tSUqPFL5zzDMXfQ?iid=CvRoo8smQIKALJ0jXt2YnQ',
    ];
    for (let i = 1; i <= 30; i++) {
        const fields = {
            name: getRandomString(5) + getRandomNumber(),
            description: getRandomString(15),
            str1: null,
            str2: null,
            str3: null,
            txt1: null,
            txt2: null,
            txt3: null,
            numb1: null,
            numb2: null,
            numb3: null,
            bool1: null,
            bool2: null,
            bool3: null,
            date1: null,
            date2: null,
            date3: null,
        };
        const item = {
            fields: fields,
            image: famousDriftCars[Math.floor(Math.random() * famousDriftCars.length)],
            userId: 1,
            collectionId: 1,
            tags: [],
        };
        data['item' + i] = item;
    }
    fs_1.default.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Data written to data.json');
        }
    });
};
exports.fakeDriftItems = fakeDriftItems;
