var _ = require('lodash')

function days(collectionObject) {
    return _.map(collectionObject.collection.items, function(item){
        return dayFromAttributes(item.data)
    })
}

function dayFromAttributes(attributes){
    var day = {}
    _.each(attributes, function(attribute){
        if(attribute.name != 'id'){
            day[attribute.name] = attribute.value
        }
    })
    return day
}

function templateAttributes(templateObject){
    return templateObject.template.data
}

function dayFromTemplateObject(templateObject){
    return dayFromAttributes(templateAttributes(templateObject))
}

exports.days = days
exports.dayFromTemplateObject = dayFromTemplateObject