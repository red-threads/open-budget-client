# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.9.0"></a>
# [0.9.0](https://github.com/red-threads/open-budget-client/compare/v0.8.0...v0.9.0) (2018-10-28)


### Bug Fixes

* **api:** unescape filter QS parameter ([edcd654](https://github.com/red-threads/open-budget-client/commit/edcd654))
* **auth:** simplify authentication logic ([b1f173d](https://github.com/red-threads/open-budget-client/commit/b1f173d))
* **upload-batch:** either show file input or batch list ([f8e57fa](https://github.com/red-threads/open-budget-client/commit/f8e57fa))


### Features

* **auth:** secure API, update withAuth HOC ([77192aa](https://github.com/red-threads/open-budget-client/commit/77192aa))
* **upload-batch:** first rough implementation ([b9424fa](https://github.com/red-threads/open-budget-client/commit/b9424fa))
* **upload-batch:** show batch list ([2d043b0](https://github.com/red-threads/open-budget-client/commit/2d043b0))



<a name="0.8.0"></a>
# [0.8.0](https://github.com/red-threads/open-budget-client/compare/v0.7.1...v0.8.0) (2018-10-05)


### Bug Fixes

* adjust/unify page header styles ([01ac79e](https://github.com/red-threads/open-budget-client/commit/01ac79e))
* **home:** use camelCaseEntity ([59c095d](https://github.com/red-threads/open-budget-client/commit/59c095d))
* **upload-batch:** lint ([ff9166d](https://github.com/red-threads/open-budget-client/commit/ff9166d))
* **upload-batch:** typo ([6b0f967](https://github.com/red-threads/open-budget-client/commit/6b0f967))


### Features

* **batch-upload:** batch types configuration and transformation tryout ([3b919ee](https://github.com/red-threads/open-budget-client/commit/3b919ee))



<a name="0.7.1"></a>
## [0.7.1](https://github.com/red-threads/open-budget-client/compare/v0.7.0...v0.7.1) (2018-09-23)


### Bug Fixes

* index page styles ([34a68ca](https://github.com/red-threads/open-budget-client/commit/34a68ca))
* lint issues ([4e64c8e](https://github.com/red-threads/open-budget-client/commit/4e64c8e))
* **auth:** default admin roles and entity names ([c481c50](https://github.com/red-threads/open-budget-client/commit/c481c50))
* **list:** add role-based action links ([266af5a](https://github.com/red-threads/open-budget-client/commit/266af5a))



<a name="0.7.0"></a>
# [0.7.0](https://github.com/red-threads/open-budget-client/compare/v0.6.0...v0.7.0) (2018-09-21)


### Bug Fixes

* add extra debug infos ([4c691d6](https://github.com/red-threads/open-budget-client/commit/4c691d6))
* authentication handling, auth HOC debug ([105840b](https://github.com/red-threads/open-budget-client/commit/105840b))
* use entity names from json config file ([140451f](https://github.com/red-threads/open-budget-client/commit/140451f))
* **auth:** add auth0 rules, missing redirectUri ([1eb9c52](https://github.com/red-threads/open-budget-client/commit/1eb9c52))
* **auth:** better debugging ([100ac83](https://github.com/red-threads/open-budget-client/commit/100ac83))
* **auth:** clean up initial props ([c794b00](https://github.com/red-threads/open-budget-client/commit/c794b00))
* **auth:** remove hardcoded strings, clean up ([f041346](https://github.com/red-threads/open-budget-client/commit/f041346))
* **auth:** remove layout<>withAuth HOC coupling ([df31dd8](https://github.com/red-threads/open-budget-client/commit/df31dd8))
* **auth:** update roles structure, return the right claim ([edb9ee3](https://github.com/red-threads/open-budget-client/commit/edb9ee3))


### Features

* **batch:** add batch types support via json file-based configuration ([eac24e7](https://github.com/red-threads/open-budget-client/commit/eac24e7))
* **offline:** offline-friendly vendor libs ([6763a9c](https://github.com/red-threads/open-budget-client/commit/6763a9c))
* offline-friendly vendors ([dd734ee](https://github.com/red-threads/open-budget-client/commit/dd734ee))
* ping endpoint ([55eac76](https://github.com/red-threads/open-budget-client/commit/55eac76))



<a name="0.6.0"></a>
# [0.6.0](https://github.com/red-threads/open-budget-client/compare/v0.5.0...v0.6.0) (2018-08-30)


### Bug Fixes

* lint issues ([e4c58da](https://github.com/red-threads/open-budget-client/commit/e4c58da))


### Features

* add auth0 logo ([63b68fe](https://github.com/red-threads/open-budget-client/commit/63b68fe))
* define role-based authentication ([3d1d590](https://github.com/red-threads/open-budget-client/commit/3d1d590))
* simplify local development ([380960a](https://github.com/red-threads/open-budget-client/commit/380960a))



<a name="0.5.0"></a>
# [0.5.0](https://github.com/red-threads/open-budget-client/compare/v0.4.0...v0.5.0) (2018-08-10)


### Bug Fixes

* eslint issues ([abd6313](https://github.com/red-threads/open-budget-client/commit/abd6313))
* expose auth0 env vars ([5c5785d](https://github.com/red-threads/open-budget-client/commit/5c5785d))
* replace err with errors (devour standard) ([8bee06f](https://github.com/red-threads/open-budget-client/commit/8bee06f))


### Features

* authentication ([4fd63b4](https://github.com/red-threads/open-budget-client/commit/4fd63b4))



<a name="0.4.0"></a>
# [0.4.0](https://github.com/red-threads/open-budget-client/compare/v0.3.0...v0.4.0) (2018-08-07)


### Bug Fixes

* add access flag to npm publish ([1e3d15f](https://github.com/red-threads/open-budget-client/commit/1e3d15f))
* add missing react key attributes ([68f6af7](https://github.com/red-threads/open-budget-client/commit/68f6af7))
* expose env variables on client side ([54e973a](https://github.com/red-threads/open-budget-client/commit/54e973a))
* filter routes by entity names ([a1a5466](https://github.com/red-threads/open-budget-client/commit/a1a5466))
* lint issues ([2bab547](https://github.com/red-threads/open-budget-client/commit/2bab547))
* lint issues ([26e802a](https://github.com/red-threads/open-budget-client/commit/26e802a))
* set include parameter only if not empty ([7645e2c](https://github.com/red-threads/open-budget-client/commit/7645e2c))
* variable api url ([500b0da](https://github.com/red-threads/open-budget-client/commit/500b0da))


### Features

* add custom error page ([2beb0b5](https://github.com/red-threads/open-budget-client/commit/2beb0b5))
* add item page ([9f09e82](https://github.com/red-threads/open-budget-client/commit/9f09e82))
* add new link ([ca1416b](https://github.com/red-threads/open-budget-client/commit/ca1416b))
* handle date types ([d769ac8](https://github.com/red-threads/open-budget-client/commit/d769ac8))
* implement notifications ([f4249e1](https://github.com/red-threads/open-budget-client/commit/f4249e1))



<a name="0.3.0"></a>
# [0.3.0](https://github.com/red-threads/open-budget-client/compare/v0.2.0...v0.3.0) (2018-07-24)


### Bug Fixes

* add missing npm publish script ([3edd79e](https://github.com/red-threads/open-budget-client/commit/3edd79e))
* crossorigin -> crossOrigin, and footer copy ([0e153e3](https://github.com/red-threads/open-budget-client/commit/0e153e3))
* eslint issues ([2abae90](https://github.com/red-threads/open-budget-client/commit/2abae90))
* report errors correctly ([bf6cab2](https://github.com/red-threads/open-budget-client/commit/bf6cab2))


### Features

* edit page with validation and submit features ([9708f33](https://github.com/red-threads/open-budget-client/commit/9708f33))
* handle nested object types/ref ([d88de18](https://github.com/red-threads/open-budget-client/commit/d88de18))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/red-threads/open-budget-client/compare/v0.1.0...v0.2.0) (2018-07-13)


### Bug Fixes

* eslint issues ([27852a5](https://github.com/red-threads/open-budget-client/commit/27852a5))
* use custom server ([46f81da](https://github.com/red-threads/open-budget-client/commit/46f81da))


### Features

* add basic bootstrap-based layout ([ed974d0](https://github.com/red-threads/open-budget-client/commit/ed974d0))
* add centralized schema descriptions ([7d37178](https://github.com/red-threads/open-budget-client/commit/7d37178))
* create/edit pages ([aa6a275](https://github.com/red-threads/open-budget-client/commit/aa6a275))
* **converters:** expose enum types ([bebbfec](https://github.com/red-threads/open-budget-client/commit/bebbfec))
* **list:** add basic page ([981a8e3](https://github.com/red-threads/open-budget-client/commit/981a8e3))
* **org:** add edit page (draft) ([f5a8cd1](https://github.com/red-threads/open-budget-client/commit/f5a8cd1))
* **org:** enable single item view ([7cbfe19](https://github.com/red-threads/open-budget-client/commit/7cbfe19))



<a name="0.1.0"></a>
# 0.1.0 (2018-06-17)


### Bug Fixes

* **org:** update include ([52b6488](https://github.com/red-threads/open-budget-client/commit/52b6488))


### Features

* bootstrap next.js client app ([44ef74c](https://github.com/red-threads/open-budget-client/commit/44ef74c))
