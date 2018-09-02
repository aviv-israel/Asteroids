class ComponentFactory {

    constructor() {
    }

    // static register(clazzname, clazz) {
    //     if ((!Factory._registeredTypes.has(clazzname) &&
    //             clazz.prototype instanceof User)) {
    //         Factory._registeredTypes.add(clazzname, clazz);
    //     ...
    //     } else { ... }
    // }

    static create(componentName, ...options) {

        switch (componentName) {
            case 'shotBySpaceship':
                const s = new Shot(10, 10, 'red', spaceship.x, spaceship.y, spaceship.velocity + 20, spaceship.angle);
                Factory._registeredTypes.set(s.id,s);
                break;
            case 'astroid':
                const a = new Shot(10, 10, 'red', spaceship.x, spaceship.y, spaceship.velocity + 20, spaceship.angle);
                Factory._registeredTypes.set(a.id,a);
                break;

        }

        // if (!Factory._registeredTypes.has(clazzName)) {
        //     console.error("!!!");
        //     return null;
        // }
        // let clazz = this._registeredTypes.get(clazzName);
        // let instance = new clazz(...options);
        // return instance;
    }
}
Factory._registeredTypes = new Map();