const globals = {
    '@angular/core': 'ng.core',
    '@angular/forms': 'ng.forms',
    'rxjs': 'Rx',
    'rxjs/Observable': 'Rx',
    'rxjs/BehaviorSubject': 'Rx',
    'rxjs/add/operator/map': 'Rx.Observable.prototype',
    'rxjs/add/operator/mergeMap': 'Rx.Observable.prototype',
    'rxjs/add/observable/fromEvent': 'Rx.Observable',
    'rxjs/add/observable/of': 'Rx.Observable'
};

export default {
    entry: 'dist/index.js',
    dest: 'dist/bundles/ng-conditionally-validate.umd.js',
    sourceMap: false,
    format: 'umd',
    moduleName: 'ng.conditionally.validate',
    globals: globals,
    external: Object.keys(globals)
}