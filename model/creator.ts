import { Comic, Events, Series, Stories, Thumbnail, Url } from "./comic"

export interface Creators {
    available: number
    collectionURI: string
    items: Creator[]
    returned: number
}

export interface Creator {
    id: string
    firstName: string
    middleName: string
    lastName: string
    suffix: string
    fullName: string
    modified: string
    resourceURI: string
    urls: Url[]
    thumbnail: Thumbnail
    series: Series
    stories: Stories
    comics: Comic
    events: Events
}