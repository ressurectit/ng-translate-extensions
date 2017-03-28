import {Injectable, Optional, Inject} from '@angular/core';
import {Http} from '@angular/http';
import {Utils, SERVER_BASE_URL, isBlank} from '@anglr/common';
import {TranslateLoader} from '@ngx-translate/core';
import {ExternalTranslationLoaderOptions} from './externalTranslationLoaderOptions';
import {Observable} from 'rxjs/Observable';

/**
 * External translation loader, that can be configured with multiple resources
 */
@Injectable()
export class ExternalTranslationLoader implements TranslateLoader
{
    //######################### private fields #########################

    /**
     * Cached results for requested urls
     */
    private _cachedResults: {[url: string]: Promise<any>} = {};

    //######################### constructor #########################
    constructor(@Optional() private _options: ExternalTranslationLoaderOptions,
                @Optional() @Inject(SERVER_BASE_URL) private _baseUrl: string,
                private _http: Http)
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
    getTranslation(lang: string): Observable<any>
    {
        return Observable.create(observer =>
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
                            .map(itm => itm.json())
                            .subscribe(data => resolve(data), error => reject(error));
                    });

                    translationsResources.push(this._cachedResults[url]);
                }
            });
            
            Observable.forkJoin(translationsResources)
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