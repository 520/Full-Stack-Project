const { MongoClient } = require('mongodb');
const { expect } = require('chai');
const assert = require('chai').assert;

// 连接到 MongoDB 数据库
const url = 'mongodb://localhost:27017';
const dbName = 'test';

describe('MongoDB Integration Tests', () => {
    let client;
    let db;
    let collection

    before(async () => {
        client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        db = client.db(dbName);
        collection = db.collection('courseCollection');
    });

    after(async () => {
        await client.close();
    });

    it('should insert a document into the collection', async () => {
        const document = { subject: 'computer science', course: "full stack" };
        const result = await collection.insertOne(document);
        assert.notEqual(result.insertedCount,0);
    });

    it('should find a document in the collection', async () => {
        const document = { subject: 'computer science', course: "full stack" };
        await collection.insertOne(document);
        const foundDocument = await collection.findOne({ subject: 'computer science', course: "full stack" });
        expect(foundDocument.subject).to.deep.equal(document.subject);
        expect(foundDocument.course).to.deep.equal(document.course);
    });

    it('should update a document in the collection', async () => {
        const document = { subject: 'computer science', course: "full stack" };
        const result = await collection.insertOne(document);
        const insertedId = result.insertedId;

        const updateResult = await collection.updateOne(
            { _id: insertedId },
            { $set: { course: "project management" } }
        );

        expect(updateResult.modifiedCount).to.equal(1);

        const updatedDocument = await collection.findOne({ _id: insertedId });
        expect(updatedDocument.subject).to.equal('computer science');
        expect(updatedDocument.course).to.equal('project management');
    });

    it('should delete a document from the collection', async () => {
        const document = { subject: 'computer science', course: "full stack" };
        const result = await collection.insertOne(document);
        const insertedId = result.insertedId;

        const deleteResult = await collection.deleteOne({ _id: insertedId });
        expect(deleteResult.deletedCount).to.equal(1);

        const deletedDocument = await collection.findOne({ _id: insertedId });
        expect(deletedDocument).to.be.null;
    });
});
