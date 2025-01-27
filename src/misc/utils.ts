import {isPresent} from '@jscrpt/common';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';

/**
 * Performs translation of key(s) and calls callback, also listens for language changes
 * @param key - Key or array of keys to be translated
 * @param translateService - Translation service used for translation
 * @param translateCallback - Callback with translated key or keys
 * @param interpolateParamsGet - Callback used for obtaining interpolation object or objects (use array if key is array)
 */
export function translateString<TKey extends string|string[]>(key: TKey, translateService: TranslateService, translateCallback: (translatedString: TKey) => void, interpolateParamsGet: () => object|object[]): Subscription
{
    function translate(key: TKey): TKey
    {
        const interpolateParams = interpolateParamsGet();

        if(Array.isArray(key))
        {
            return key.map((keyValue, index) => translateService.instant(keyValue, (isPresent(interpolateParams) && Array.isArray(interpolateParams)) ? interpolateParams[index] : undefined)) as any;
        }
        else
        {
            return translateService.instant(key, interpolateParams);
        }
    }

    translateCallback(translate(key));

    return translateService.onLangChange.subscribe(() =>
    {
        translateCallback(translate(key));
    });
}
