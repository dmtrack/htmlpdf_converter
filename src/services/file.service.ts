import {
    ICreateRecord,
    IFileRecord,
    IUploadRequest,
} from '../db/models/interface/log.interface';
import { Record } from '../db/models/log';
import { DBError } from '../errors/DBError';

const uuid = require('uuid');
const ApiError = require('../errors/api-error');

class FileService {
    async upload(data: IUploadRequest) {
        try {
            let { name, executingTime, link } = data;
            const newRecord: ICreateRecord = await Record.create({
                name: name,
                executingTime: executingTime,
                memory: 780,
                link: link,
            });
            return newRecord;
        } catch (e: any) {
            new DBError('create record error', e);
        }
    }

    async getRecords() {
        const records = await Record.findAll();
        return records;
    }

    async deleteUser(id: number) {
        //     const user = await User.findByPk(id);
        //     if (!user) {
        //         return left(
        //             new EntityError(`there is no user with id:${id} in data-base`)
        //         );
        //     }
        //     await User.destroy({ where: { id } });
        // }
    }
}
module.exports = new FileService();
