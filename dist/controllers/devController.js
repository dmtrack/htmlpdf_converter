"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevController = void 0;
const search_service_1 = require("../services/search.service");
const meilisearch_1 = require("../api/meilisearch");
class DevController {
    async meiliSearchSetup(req, res) {
        const password = req.body.password;
        if (password !== process.env.DEVELOPER_PASSWORD)
            return res.status(500).json({ error: 'password invalid' });
        const client = new meilisearch_1.SearchClient();
        try {
            await client.createIndex('items', { primaryKey: 'id' });
            await client.createIndex('collections', { primaryKey: 'id' });
            await client.createIndex('comments', { primaryKey: 'id' });
            const itemsIndex = client.index('items');
            const commentsIndex = client.index('comments');
            const collectionsIndex = client.index('collections');
            await itemsIndex.updateSearchableAttributes(['name']);
            await commentsIndex.updateSearchableAttributes(['text']);
            await collectionsIndex.updateSearchableAttributes([
                'name',
                'description',
            ]);
            res.json({ status: 'completed' });
        }
        catch (e) {
            res.status(500).json(e);
        }
    }
    async indexingCollections(req, res) {
        const password = req.body.password;
        if (password !== process.env.DEVELOPER_PASSWORD)
            return res.status(500).json({ error: 'password invalid' });
        const response = await (0, search_service_1.indexingAllCollections)();
        response
            .mapRight((r) => res.json(r))
            .mapLeft((e) => res.status(500).json(e));
    }
    async indexingComments(req, res) {
        const password = req.body.password;
        if (password !== process.env.DEVELOPER_PASSWORD)
            return res.status(500).json({ error: 'password invalid' });
        const response = await (0, search_service_1.indexingAllComments)();
        response
            .mapRight((r) => res.json(r))
            .mapLeft((e) => res.status(500).json(e));
    }
    async indexingItems(req, res) {
        const password = req.body.password;
        if (password !== process.env.DEVELOPER_PASSWORD)
            return res.status(500).json({ error: 'password invalid' });
        const response = await (0, search_service_1.indexingAllItems)();
        response
            .mapRight((r) => res.json(r))
            .mapLeft((e) => res.status(500).json(e));
    }
}
exports.DevController = DevController;
