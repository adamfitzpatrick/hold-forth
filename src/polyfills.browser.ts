import "core-js/es6/object";
import "core-js/es6/string";
import "core-js/es6/array";
import "core-js/es7/reflect";
import "zone.js/dist/zone";

declare const ENV;
if (ENV === "prod") {
    // Production
} else {

    // Development
    Error.stackTraceLimit = Infinity;

    /* tslint:disable no-var-requires */
    require("zone.js/dist/long-stack-trace-zone");

}