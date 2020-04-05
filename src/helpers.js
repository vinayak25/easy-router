'use strict'

const sanitizePath = function(path) {
    return path.replace(/\/\/+/g, "/")
}

const unique = function(arr) {
    return arr.filter(function(item, index) {
        return  (arr.indexOf(item) === index)
    })
}

const removeEmpty = function(arr) {
    return arr.filter(function(item, index) {
        return item
    })
}

module.exports = {
    sanitizePath, unique, removeEmpty
}