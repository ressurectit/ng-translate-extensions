import {Injectable} from '@angular/core';
import {StringLocalization} from '@anglr/common';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

/**
 * Implementation of StringLocalization, which uses ngxTranslate as localization engine
 */
@Injectable()
export class NgxTranslateStringLocalizationService implements StringLocalization
{
    //######################### public properties - implementation of StringLocalization #########################

    /**
     * Occurs when indication that locale has changed and strings should be obtained again, because they have changed
     */
    public get textsChange(): Observable<void>
    {
        return this._translateSvc.onLangChange.pipe(map(() => {}));
    }

    //######################### constructors #########################
    constructor(private _translateSvc: TranslateService)
    {
    }

    //######################### public methods - implementation of StringLocalization #########################

    /**
     * Gets localized string for specified key, interpolation might be used
     * @param key - Key to be localizaed
     * @param interpolateParams - Optional object storing interpolation parameters
     */
    public get(key: string, interpolateParams?: object): string
    {
        return this._translateSvc.instant(key, interpolateParams);
    }
}