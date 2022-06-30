# Changelog

## Version 9.0.0 (2022-06-30)

### BREAKING CHANGES

- minimal supported version of *Angular* is `14.0.0`
- minimal supported version of `@jscrpt/common` is `2.2.0`
- minimal supported version of `@anglr/common` is `11.2.0`
- minimal supported version of `rxjs` is `6.6.7`
- compiled as *Angular IVY* **only** with new *APF*
- removed support of *es5* target and using latest package.json features
- dropped support of `Node.js <= 12.20`

## Version 8.0.0 (2022-02-17)

### BREAKING CHANGES

- minimal supported version of *Angular* is `11.0.0`
- minimal supported version of `@jscrpt/common` is `1.2.0`
- minimal supported version of `@anglr/common` is `9.0.0`
- `translateString` last parameter is no longer optional

## Version 7.0.0

- updated to latest stable *Angular* 9
- added generating of API doc

## Version 6.1.0

- updated dependency on `@anglr/common` to at least version `6.4.0`
- added utility function for translation and watching for language changes `translateString`
- added `NgxTranslateStringLocalizationService` as implementation of `StringLocalization`

## Version 6.0.0

- Angular IVY ready (APF compliant package)
- added support for ES2015 compilation
- Angular 8

## Version 5.0.1
 - `ExternalTranslationLoader` updated now as `Injectable`

## Version 5.0.0
 - `@anglr/translate-extensions` is now marked as *sideEffects* free
 - stabilized for angular v6

## Version 5.0.0-beta.2
- opravený názov balíčka

## Version 5.0.0-beta.1
 - aktualizácia balíčkov `Angular` na `6`
 - aktualizácia `Webpack` na verziu `4`
 - aktualizácia `rxjs` na verziu `6`
 - automatické generovanie dokumentácie

## Version 4.0.3
 - returned typescript version back to 2.4.2 and removed distJit

## Version 4.0.2
 - added compiled outputs for Angular JIT

## Version 4.0.1
 - removed `ExternalTranslationLoaderModule`
 - removed `Injeactable`
 - now should use factory methods to instantiate

## Version 4.0.0
 - updated angular to 5.0.0 (final)
 - changed dependencies of project to peerDependencies
 - more strict compilation
 - updated usage of rxjs, now using operators

## Version 4.0.0-beta.1
 - updated angular to >=5.0.0-rc.7

## Version 4.0.0-beta.0
 - removed dependency from `@angular/http`
 - now using `HttpClient`