import {Injectable} from '@angular/core';

/**
 * Options that are used within ExternalTranslationLoader
 */
@Injectable()
export class ExternalTranslationLoaderOptions
{
    //######################### public properties #########################

    /**
     * Prefix that is used for all requests
     */
    public resourcePrefix: string;

    /**
     * Names of resources that holds translations
     */
    public resources: string[];

    /**
     * Sufix that is used for all requests
     */
    public resourceSufix: string;

    //######################### constructor #########################

    /**
     * Creates instance of ExternalTranslationLoaderOptions
     * @param  {string} resourcePrefix Prefix that is used for all requests
     * @param  {string[]} resources Names of resources that holds translations
     * @param  {string} resourceSufix Sufix that is used for all requests
     */
    constructor(resourcePrefix: string, resources: string[], resourceSufix: string)
    {
        this.resourcePrefix = resourcePrefix;
        this.resources = resources;
        this.resourceSufix = resourceSufix;
    }
}