import { Url, Thumbnail, Comic, Stories, Events, Series } from "./comic"


export interface Characters {
    available: number
    collectionURI: string
    items: Character[]
    returned: number
  }

  export interface Character {
    id: string
    name: string
    description: string
    modified: string
    resourceURI: string
    urls: Url[]
    thumbnail: Thumbnail
    comics: Comic
    stories: Stories
    events: Events
    series: Series
  }