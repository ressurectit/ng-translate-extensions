import {HttpClient} from '@angular/common/http';
import {Utils, isBlank} from '@anglr/common';
import {TranslateLoader} from '@ngx-translate/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {forkJoin} from 'rxjs/observable/forkJoin';

import {ExternalTranslationLoaderOptions} from './externalTranslationLoaderOptions';

/**
 * External translation loader, that can be configured with multiple resources
 */
export class ExternalTranslationLoader implements TranslateLoader
{
    //######################### private fields #########################

    /**
     * Cached results for requested urls
     */
    private _cachedResults: {[url: string]: Promise<any>} = {};

    //######################### constructor #########################
    constructor(private _options: ExternalTranslationLoaderOptions,
                private _baseUrl: string,
                private _http: HttpClient)
    {
        if(isBlank(_baseUrl))
        {
            this._baseUrl = "";
        }

        if(!_options || !(_options instanceof ExternalTranslationLoaderOptions))
        {
            this._options = new ExternalTranslationLoaderOptions("translations", ["lang"], ".json");
        }
    }

    //######################### public methods #########################
    
    /**
     * Gets translations for language
     * @param {string} lang Id of language
     */
    public getTranslation(lang: string): Observable<any>
    {
        return Observable.create((observer: Observer<any>) =>
        {
            var translationsResources: Promise<any>[] = [];
            
            this._options.resources.forEach(itm =>
            {
                let url = `${this._baseUrl}${this._options.resourcePrefix}/${lang}/${itm}${this._options.resourceSufix}`;

                if(this._cachedResults[url])
                {
                    translationsResources.push(this._cachedResults[url]);
                }
                else
                {
                    this._cachedResults[url] = new Promise<any>((resolve, reject) =>
                    {
                        this._http
                            .get(url)
                            .subscribe(data => resolve(data), error => reject(error));
                    });

                    translationsResources.push(this._cachedResults[url]);
                }
            });
            
            forkJoin(translationsResources)
                .subscribe(success =>
                           {
                               var translations = {};
                               
                               for(var index in success)
                               {
                                   Utils.common.extend(translations, success[index]);
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