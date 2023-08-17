"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImageFromCloud = exports.saveImageToCloud = void 0;
const firebase_1 = __importDefault(require("./firebase"));
const storage_1 = require("firebase/storage");
const getPathStorageFromUrl = (url) => {
    const baseUrl = `${process.env.FIREBASE_BASE_URL}`;
    console.log(baseUrl, 'baseurl');
    return url
        .replace(baseUrl, '')
        .replace('%2F', '/')
        .split('?')
        .slice(0, -1)
        .join('?');
};
const saveImageToCloud = (file, path, filename) => __awaiter(void 0, void 0, void 0, function* () {
    if (!file)
        return '';
    try {
        const storageRef = (0, storage_1.ref)(firebase_1.default, `${path}/${filename.split('.')[0]}-${Date.now()}.pdf`);
        const uploadTask = yield (0, storage_1.uploadBytes)(storageRef, file);
        return yield (0, storage_1.getDownloadURL)(uploadTask.ref);
    }
    catch (e) {
        console.log(e);
        return '';
    }
});
exports.saveImageToCloud = saveImageToCloud;
const deleteImageFromCloud = (imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    if (!imageUrl)
        return;
    try {
        const storageImage = (0, storage_1.ref)(firebase_1.default, getPathStorageFromUrl(imageUrl));
        yield (0, storage_1.deleteObject)(storageImage);
        console.log('image deleted');
    }
    catch (e) {
        console.log(e);
    }
});
exports.deleteImageFromCloud = deleteImageFromCloud;
