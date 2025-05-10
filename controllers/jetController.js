import Jet from "../models/Jet.js";

export const getJets = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;

        const name = req.query.name || "";
        const topSpeed = req.query.topSpeed || "";
        const range = req.query.range || "";
        const sort = req.query.sort || "";
        const distinct = req.query.distinct || "";

        const query = {};
        if (name) query.name = { $regex: name, $options: "i" };
        if (topSpeed) query.topSpeed = { $gte: parseInt(topSpeed) };
        if (range) query.range = { $gte: parseInt(range) };

        if (distinct) {
            // Only use .distinct() if the 'distinct' param is provided
            const values = await Jet.distinct(distinct, query);
            if (values.length === 0) {
                return res.status(404).json({ message: "No distinct values found" });
            }
            return res.status(200).json({
                distinctField: distinct,
                values
            });
        } else {
            // Normal find with pagination and sorting
            const sortOptions = {};
            if (sort) {
                const [field, order] = sort.split(":");
                sortOptions[field] = order === "asc" ? 1 : -1;
            }

            const total = await Jet.countDocuments(query);
            const totalPages = Math.ceil(total / limit);

            const jets = await Jet.find(query).skip(skip).limit(limit).sort(sortOptions);

            if (jets.length === 0) {
                return res.status(404).json({ message: "No jets found" });
            }

            const result = {
                jets,
                totalPages,
                currentPage: page
            };

            return res.status(200).json(result);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getJetById = async (req, res) => {
    try {
        const jet = await Jet.findById(req.params.id);
        if (!jet) return res.status(404).json({ message: "Jet not found" });
        res.status(200).json(jet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createJet = async (req, res) => {
    const jet = new Jet(req.body);
    try {
        await jet.save();
        res.status(201).json(jet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateJet = async (req, res) => {
    try {
        const jet = await Jet.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!jet) return res.status(404).json({ message: "Jet not found" });
        res.status(200).json({ message: "Jet updated successfully", jet });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteJet = async (req, res) => {
    try {
        await Jet.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Jet deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// --- Additional MongoDB Operations ---

// Insert a single document
export const insertOneJet = async (req, res) => {
    try {
        const jet = await Jet.create(req.body);
        res.status(201).json(jet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Insert multiple documents
export const insertManyJets = async (req, res) => {
    try {
        const jets = await Jet.insertMany(req.body);
        res.status(201).json(jets);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Find one document
export const findOneJet = async (req, res) => {
    try {
        const jet = await Jet.findOne(req.query);
        if (!jet) return res.status(404).json({ message: "Jet not found" });
        res.status(200).json(jet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get distinct values for a field
export const getDistinctField = async (req, res) => {
    try {
        const { field } = req.params;
        const values = await Jet.distinct(field, req.query || {});
        res.status(200).json(values);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update one document
export const updateOneJet = async (req, res) => {
    try {
        const result = await Jet.updateOne(req.query, { $set: req.body });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update many documents
export const updateManyJets = async (req, res) => {
    try {
        const result = await Jet.updateMany(req.query, { $set: req.body });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Replace one document
export const replaceOneJet = async (req, res) => {
    try {
        const result = await Jet.replaceOne(req.query, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete one document
export const deleteOneJet = async (req, res) => {
    try {
        const result = await Jet.deleteOne(req.query);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete many documents
export const deleteManyJets = async (req, res) => {
    try {
        const result = await Jet.deleteMany(req.query);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Aggregate
export const aggregateJets = async (req, res) => {
    try {
        const pipeline = req.body.pipeline || [];
        const result = await Jet.aggregate(pipeline);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Create index
export const createJetIndex = async (req, res) => {
    try {
        const result = await Jet.collection.createIndex(req.body.fields, req.body.options || {});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Drop index
export const dropJetIndex = async (req, res) => {
    try {
        const result = await Jet.collection.dropIndex(req.body.indexName);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all indexes
export const getJetIndexes = async (req, res) => {
    try {
        const result = await Jet.collection.indexes();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Find one and update
export const findOneAndUpdateJet = async (req, res) => {
    try {
        const result = await Jet.findOneAndUpdate(req.query, req.body, { new: true });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Find one and delete
export const findOneAndDeleteJet = async (req, res) => {
    try {
        const result = await Jet.findOneAndDelete(req.query);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Find one and replace
export const findOneAndReplaceJet = async (req, res) => {
    try {
        const result = await Jet.findOneAndReplace(req.query, req.body, { new: true });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Bulk write
export const bulkWriteJets = async (req, res) => {
    try {
        const result = await Jet.bulkWrite(req.body.operations);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Rename collection
export const renameJetCollection = async (req, res) => {
    try {
        const result = await Jet.collection.rename(req.body.newName);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Drop collection
export const dropJetCollection = async (req, res) => {
    try {
        const result = await Jet.collection.drop();
        res.status(200).json({ message: "Collection dropped", result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// List all collections
export const listCollections = async (req, res) => {
    try {
        const collections = await Jet.db.db.listCollections().toArray();
        res.status(200).json(collections);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};