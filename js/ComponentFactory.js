class ComponentFactory {

    constructor() {
    }


    static create(componentName, ...options) {

        switch (componentName) {
            case 'shotBySpaceship':
                const s = new Shot(10, 10, 'red', spaceship.x, spaceship.y, spaceship.velocity + 20, spaceship.angle);
                components.set(s.id, s);
                break;
            case 'astroid':
                const a = new Astroid(40, 40, 'blue', 160, 160, 1, 1);
                components.set(a.id, a);
                break;

        }
    }
}
ComponentFactory.comps = new Map();


