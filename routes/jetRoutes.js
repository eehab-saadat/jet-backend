import express from "express";
import {
    getJets,
    getJetById,
    createJet,
    updateJet,
    deleteJet,
    insertOneJet,
    insertManyJets,
    findOneJet,
    getDistinctField,
    updateOneJet,
    updateManyJets,
    replaceOneJet,
    deleteOneJet,
    deleteManyJets,
    aggregateJets,
    createJetIndex,
    dropJetIndex,
    getJetIndexes,
    findOneAndUpdateJet,
    findOneAndDeleteJet,
    findOneAndReplaceJet,
    bulkWriteJets,
    renameJetCollection,
    dropJetCollection,
    listCollections
} from "../controllers/jetController.js";

const router = express.Router();

// --- Basic CRUD Operations ---
router.get("/", getJets);
router.get("/:id", getJetById);
router.post("/", createJet);
router.put("/:id", updateJet);
router.delete("/:id", deleteJet);

// --- Additional MongoDB Operations ---
router.post("/insertOne", insertOneJet);
router.post("/insertMany", insertManyJets);
router.get("/findOne", findOneJet);
router.get("/distinct/:field", getDistinctField);
router.put("/updateOne", updateOneJet);
router.put("/updateMany", updateManyJets);
router.put("/replaceOne", replaceOneJet);
router.delete("/deleteOne", deleteOneJet);
router.delete("/deleteMany", deleteManyJets);
router.post("/aggregate", aggregateJets);
router.post("/bulkWrite", bulkWriteJets);

// Index and collection admin routes
router.post("/admin/createIndex", createJetIndex);
router.post("/admin/dropIndex", dropJetIndex);
router.get("/admin/getIndexes", getJetIndexes);
router.post("/admin/renameCollection", renameJetCollection);
router.delete("/admin/dropCollection", dropJetCollection);
router.get("/admin/listCollections", listCollections);

// FindOneAnd... routes
router.put("/findOneAndUpdate", findOneAndUpdateJet);
router.delete("/findOneAndDelete", findOneAndDeleteJet);
router.put("/findOneAndReplace", findOneAndReplaceJet);

export default router;