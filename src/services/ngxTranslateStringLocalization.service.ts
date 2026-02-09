import {forwardRef, inject, Injectable, Injector, isSignal, signal, Signal, untracked} from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';
import {STRING_LOCALIZATION, StringLocalization, TypeProvider} from '@anglr/common';
import {TranslateService} from '@ngx-translate/core';

/**
 * Implementation of StringLocalization, which uses ngxTranslate as localization engine
 */
@Injectable()
@TypeProvider({provide: STRING_LOCALIZATION, useClass: forwardRef(() => NgxTranslateStringLocalizationService)})
export class NgxTranslateStringLocalizationService implements StringLocalization
{
    //######################### protected fields #########################

    /**
     * Instance of translate service
     */
    protected translateSvc: TranslateService = inject(TranslateService);

    /**
     * Injector used for obtaining dependencies
     */
    protected injector: Injector = inject(Injector);

    //######################### public methods - implementation of StringLocalization #########################

    /**
     * Gets localized string for specified key, interpolation might be used
     * @param key - Key to be localizaed
     * @param interpolateParams - Optional object storing interpolation parameters
     */
    public get(key: string|Signal<string>, interpolateParams?: Record<string, any>|Signal<Record<string, any>>|null): Signal<string>
    {
        const keySignal: Signal<string> = isSignal(key) ? key : signal(key);
        const interpolateParamsSignal: Signal<Record<string, any>|undefined|null> = isSignal(interpolateParams) ? interpolateParams as Signal<Record<string, any>> : signal(interpolateParams);

        return untracked(() => rxResource(
        {
            defaultValue: '',
            injector: this.injector,
            params: () =>
            {
                return {
                    key: keySignal(),
                    interpolateParams: interpolateParamsSignal(),
                };
            },
            stream: ({params}) => this.translateSvc.stream(params.key, params.interpolateParams ?? {}),
        })).value;
    }
}
