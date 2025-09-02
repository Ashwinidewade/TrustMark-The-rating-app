// Simple decorator test
function simpleDecorator(target: any, propertyKey: string) {
    console.log("Decorator working on:", propertyKey);
}

class TestClass {
    @simpleDecorator
    testProperty: string;
}

console.log("Basic decorator test");
