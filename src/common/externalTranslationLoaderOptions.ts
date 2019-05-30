/**
 * Options that are used within ExternalTranslationLoader
 */
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
     * @param resourcePrefix Prefix that is used for all requests
     * @param resources Names of resources that holds translations
     * @param resourceSufix Sufix that is used for all requests
     */
    constructor(resourcePrefix: string, resources: string[], resourceSufix: string)
    {
        this.resourcePrefix = resourcePrefix;
        this.resources = resources;
        this.resourceSufix = resourceSufix;
    }
}