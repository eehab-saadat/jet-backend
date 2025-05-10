import mongoose from "mongoose";

const jetSchema = new mongoose.Schema({
    name: { type: mongoose.Schema.Types.String, required: true, unique: true },
    manufacturer: mongoose.Schema.Types.String,
    role: mongoose.Schema.Types.String,
    topSpeed: mongoose.Schema.Types.Number,
    range: mongoose.Schema.Types.Number,
    active: mongoose.Schema.Types.Boolean,
    maidenFlight: mongoose.Schema.Types.Date,
    crew: mongoose.Schema.Types.Number,
    armament: [mongoose.Schema.Types.String],
    origin: mongoose.Schema.Types.String
});

jetSchema.index({ name: 1 }, { unique: true });
jetSchema.index({ topSpeed: 1 });
jetSchema.index({ range: 1 });

const Jet = mongoose.model('Jet', jetSchema);
export default Jet;