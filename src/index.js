'use strict'

const { sanitizePath, unique,removeEmpty } = require('./helpers')

let instance = null

class EasyRouter {
    constructor(app) {
        if (instance) {
            return instance
        }

        this.availableMiddlewares = {}
        this.middlewares = []
        this.app = app
        this.pathPrefix = ''
        this.tempPrefix = ''
        this.routes = []

        instance = this
        return instance
    }

    group(options, cb) {
        
        let oldOptions = {
            prefix: this.pathPrefix,
            middlewares: this.middlewares
        }

        this.pathPrefix = sanitizePath(this.pathPrefix + '/' + (options.prefix || ''))
        this.middlewares = unique(this.middlewares.concat(removeEmpty(options.middlewares || [])))

        cb()

        this.pathPrefix = oldOptions.prefix
        this.middlewares = oldOptions.middlewares

        return this
    }

    setPrefix(prefix) {
        this.tempPrefix = sanitizePath(this.tempPrefix + (prefix || ''))
        return this
    }

    setMiddlewares(name) {
        if (name instanceof String) {
            this.middlewares = unique(removeEmpty(this.middlewares.push(name)))
        }

        if (name instanceof Array) {
            this.middlewares = unique(this.middlewares.concat(removeEmpty(name || [])))
        }

        return this
    }

    loadRoutes(router) {
        if (router instanceof EasyRouter) {
            this.routes.concat(router.routes)
        }

        this.tempPrefix = ''
        return this
    }

    get(path, cb) {
        this.routes.push({
            method: 'get',
            path: this.getPrefix(path),
            middlewares: this.middlewares,
            callback: cb
        })
    }

    post(path, cb) {
        this.routes.push({
            method: 'post',
            path: this.getPrefix(path),
            middlewares: this.middlewares,
            callback: cb
        })
    }

    put(path, cb) {
        this.routes.push({
            method: 'put',
            path: this.getPrefix(path),
            middlewares: this.middlewares,
            callback: cb
        })
    }

    patch(path, cb) {
        this.routes.push({
            method: 'patch',
            path: this.getPrefix(path),
            middlewares: this.middlewares,
            callback: cb
        })
    }

    delete(path, cb) {
        this.routes.push({
            method: 'delete',
            path: this.getPrefix(path),
            middlewares: this.middlewares,
            callback: cb
        })
    }

    getPrefix(path) {
        return sanitizePath(this.tempPrefix + '/' + this.pathPrefix + '/' + (path || ''))
    }

    registerMiddleware(name, middleware) {
        if (name instanceof Object && Object.keys(name).length) {
            this.availableMiddlewares = {
                ...this.availableMiddlewares,
                ...name,
            }
        } else {
            this.availableMiddlewares[name] = middleware
        }

        return this
    }

    loadMiddlewares(middlewares) {
        middlewares = removeEmpty(unique(middlewares))
        let callbacks = []
        middlewares.forEach(middleware => {
            if (middleware instanceof Function) {
                callbacks.push(middleware)
            } else {
                middleware = this.availableMiddlewares[middleware]
                if (middleware instanceof Function) {
                    callbacks.push(middleware)
                } else if (middleware instanceof Array) {
                    callbacks.concat(this.loadMiddlewares(middleware))
                }
            }
        });

        return unique(removeEmpty(callbacks))
    }

    expose() {
        this.routes.forEach(route => {
            this.app[route.method](
                route.path, 
                this.loadMiddlewares(route.middlewares), 
                route.callback
            )
        });

        return this.app
    }
}

module.exports = EasyRouter