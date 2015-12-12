var _ = require('lodash')

function layout(url, items) {
    return (
    {
        collection: {
            version: '1.0',
            href: url,

            links: [
                {rel: 'index', href: 'http://localhost:3001/'}
            ],

            items: items,

            queries: [
                {
                    rel: 'search', href: 'http://localhost:3001/search', prompt: 'Search',
                    data: [
                        {name: 'host', value: '', type: 'text'},
                        {name: 'speaker_id', value: '', type: 'text'},
                        {name: 'conflict', value: '', type: 'boolean'}
                    ]
                }
            ],

            template: {
                data: [
                    {name: 'date', value: '', prompt: 'Date'}
                ]
            }

        }
    })
}

function days(days) {
    return _.reduce(days, function(current, next){
        current.push(day(next))
        return current
    }, [])
}


function day(day) {
    return (
        {
            href: 'http://localhost:3000/' + day.id,
            data: [
                {name: 'id', value: day.id, prompt: 'ID'},
                {name: 'date', value: day.date, prompt: 'Date'},
                {name: 'conflict', value: day.conflict, prompt: 'Conflict'},
                {name: 'host', value: day.host, prompt: 'Host'},
            ],
            links: [
                {rel: 'funny', href: 'www.funnyordie.com', prompt: 'Funny site'}
            ]
        }
    )
}

exports.days = days
exports.layout = layout