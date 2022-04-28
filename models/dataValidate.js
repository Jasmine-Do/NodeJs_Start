const model = {
    type: 'object',
    properties: {
        Year: {
            type: 'string'
        },
        Industry_aggregation_NZSIOC: {
            type: 'string',
            enum: ['Level 1','Level 2','Level 3','Level 4','Level 5']
        },
        Industry_code_NZSIOC: {
            type: 'string'
        },
        Industry_name_NZSIOC: {
            type: 'string',
            enum: ['All industries','Horticulture and Fruit Growing']
        },
        Units: {
            type: 'string',
            enum: ['Dollars (millions)','Percentage','Dollars']
        },
        Variable_code: {
            type: 'string'
        },
        Variable_name: {
            type: 'string'
        },
        Variable_category: {
            type: 'string',
            enum: ['Financial performance','Financial position','Financial ratios']
        },
        Value: {
            type: 'number'
        }
    },
    required: ['Year', 'Industry_aggregation_NZSIOC', 'Industry_code_NZSIOC', 'Industry_name_NZSIOC','Units','Variable_code','Variable_name','Variable_category','Value']
}

module.exports = model