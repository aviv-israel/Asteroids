// class Factory {
//     constructor() {
//     }
//     static register(clazzname, clazz) {
//         if ((!Factory._registeredTypes.has(clazzname) &&
//                 clazz.prototype instanceof User)) {
//             Factory._registeredTypes.add(clazzname, clazz);
//         ...
//         } else { ... }
//     }
//     static create(clazzname, ...options) {
//         if (!Factory._registeredTypes.has(clazzName)) {
//             console.error("!!!");
//             return null;
//         }
//         let clazz = this._registeredTypes.get(clazzName);
//         let instance = new clazz(...options);
//         return instance;
//     }
// }
// Factory._registeredTypes = new Map();