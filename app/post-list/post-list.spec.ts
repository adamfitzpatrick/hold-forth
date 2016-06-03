import {angular} from "../app";
import "angular-mocks";
import {PostListController} from "./post-list.controller";

describe("postList", () => {
    beforeEach(angular.mock.module("App"));

    let $injector;
    let $httpBackend;
    let expected;

    beforeEach(angular.mock.inject((_$injector_) => {
        expected = [
            { id: "1", title: "Test 1" },
            { id: "2", title: "Test 2" }
        ];
        $injector = _$injector_;
        $httpBackend = $injector.get("$httpBackend");
        $httpBackend.expectGET(/\/articles\//).respond(expected);
    }));

    describe("component", () => {
        let $compile;
        let $rootScope;

        beforeEach(() => {
            $compile = $injector.get("$compile");
            $rootScope = $injector.get("$rootScope");
        });

        it("should compile without error", () => {
            let element = $compile("<post-list></post-list>")($rootScope);
            $rootScope.$apply();
            expect(element.html()).toContain("article in vm.articles");
        });
    });

    describe("controller", () => {
        let controller;

        beforeEach(() => {
            let articlesService = $injector.get("articlesService");
            controller = new PostListController(articlesService);
            $httpBackend.flush();
        });

        it("should load articles", () => {
            expect(angular.equals(controller.articles, expected)).toBe(true);
        });
    });
});