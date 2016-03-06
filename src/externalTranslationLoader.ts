import {Injectable, Optional} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import utils from 'ng2-common/utils';
import {TranslateLoader} from 'ng2-translate/ng2-translate';
import {ExternalTranslationLoaderOptions} from './ExternalTranslationLoaderOptions';

/**
 * External translation loader, that can be configured with multiple resources
 */
@Injectable()
export class ExternalTranslationLoader implements TranslateLoader
{
    //######################### constructor #########################
    constructor(@Optional() private _options: ExternalTranslationLoaderOptions,
                private _http: Http)
    {
        if(!_options)
        {
            this._options = new ExternalTranslationLoaderOptions("translations", ["lang"], ".json");
        }
    }

    //######################### public methods #########################
    getTranslation(lang: string): Observable<any>
    {
        return Observable.create(observer =>
        {
            var translationsResources: Observable<any>[] = [];
            
            this._options.resources.forEach(itm =>
            {
                translationsResources.push(this._http.get(`${this._options.resourcePrefix}/${lang}/${itm}${this._options.resourceSufix}`).map(itm => itm.json()));
            });
            
            Observable.forkJoin(translationsResources)
                .subscribe(success =>
                           {
                               var translations = {};
                               
                               for(var index in success)
                               {
                                   utils.common.extend(translations, success[index]);
                               }
                               
                               observer.next(translations);
                               observer.complete();
                           },
                           error =>
                           {
                               observer.error(error);
                               observer.complete();
                           });
        });
    }
}