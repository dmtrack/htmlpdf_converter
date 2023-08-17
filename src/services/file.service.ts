import { type } from 'os';
import {
    ICreateRecord,
    IFileRecord,
    IUploadRequest,
} from '../db/models/interface/log.interface';
import { Record } from '../db/models/log';
import { CustomError } from '../exceptions/CustomError';

class FileService {
    async upload(data: IUploadRequest) {
        try {
            let { name, executingTime, link, memory } = data;
            const newRecord: ICreateRecord = await Record.create({
                name: name,
                executingTime: executingTime,
                memory: memory,
                link: link,
            });
            return newRecord;
        } catch (e: any) {
            new CustomError('create record error', e);
        }
    }

    async getRecords() {
        const records = await Record.findAll();
        return records;
    }
}
module.exports = new FileService();
