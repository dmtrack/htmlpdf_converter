import fs from 'fs';
import { faker } from '@faker-js/faker';
import moment from 'moment';
var randomstring = require('randomstring');

export const fakeDriftItems = () => {
    interface Fields {
        name: string;
        description: string;
        str1: string | null;
        str2: string | null;
        str3: string | null;
        txt1: string | null;
        txt2: string | null;
        txt3: string | null;
        numb1: number | null;
        numb2: number | null;
        numb3: number | null;
        bool1: boolean | null;
        bool2: boolean | null;
        bool3: boolean | null;
        date1: string | null;
        date2: string | null;
        date3: string | null;
    }

    interface Item {
        fields: Fields;
        image: string;
        userId: number;
        collectionId: number;
        tags: string[];
    }

    const data: { [key: string]: Item } = {};

    const getRandomBoolean = (): boolean => {
        return Math.random() < 0.5;
    };

    const getRandomDate = (): string => {
        return moment(faker.date.past()).format('YYYY-MM-DD');
    };

    const getRandomNumber = (): number => {
        return faker.number.int();
    };

    const getRandomString = (length: number): string => {
        return randomstring.generate(length);
    };

    const famousDriftCars: string[] = [
        'https://www.superstreetonline.com/features/sstp-1110-battle-of-japans-iconic-drift-cars/',
        'https://www.speedhunters.com/2016/05/the-5-most-iconic-drift-cars/',
        'https://blog.caranddriver.com/the-13-coolest-factory-drift-cars-of-all-time/',
        'https://www.drifted.com/top-10-jdm-cars-for-diy-drift-builds/',
        'https://drivetribe.com/p/6-of-the-best-drift-cars-of-all-FJ8aek0tSUqPFL5zzDMXfQ?iid=CvRoo8smQIKALJ0jXt2YnQ',
    ];

    for (let i = 1; i <= 30; i++) {
        const fields: Fields = {
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
        const item: Item = {
            fields: fields,
            image: famousDriftCars[
                Math.floor(Math.random() * famousDriftCars.length)
            ],
            userId: 1,
            collectionId: 1,
            tags: [],
        };
        data['item' + i] = item;
    }

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Data written to data.json');
        }
    });
};
