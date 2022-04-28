var mongoose = require('mongoose');
var Schema = mongoose.Schema;

dataSchema = new Schema({
    Year: String,
    Industry_aggregation_NZSIOC: String,
    Industry_code_NZSIOC: String,
    Industry_name_NZSIOC: String,
    Units: String,
    Variable_code: String,
    Variable_name: String,
    Variable_category: String,
    Value: Number
}),
Data = mongoose.model('Data', dataSchema);

module.exports = Data;