import {NgModule, ModuleWithProviders, FactoryProvider} from '@angular/core';
import {ExternalTranslationLoaderOptions} from '../common/externalTranslationLoaderOptions';

/**
 * Module for adding translation options
 */
@NgModule(
{
})
export class ExternalTranslationLoaderModule
{
    //######################### public methods #########################
    
    /**
     * Returns module with external translation loader options
     * @param {() =>ExternalTranslationLoaderOptions} options Options passed to loader
     */
    public static forRootWithOptions(options: () => ExternalTranslationLoaderOptions): ModuleWithProviders 
    {
        return {
            ngModule: ExternalTranslationLoaderModule,
            providers: 
            [
                <FactoryProvider>
                {
                    provide: ExternalTranslationLoaderOptions,
                    useFactory: options
                }
            ]
        };
    }
}