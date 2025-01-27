<!-- This task is spread between two Vue components.

GENERAL GUIDELINES

- Use the Options API
- Use ES6 notation
- Use SCSS
- Use BEM for classes if possible
- Not necessary to use Typescript
- Using Lodash would make some functions a lot easier! (https://lodash.com/docs/4.17.15)
- We've added a bit of code for context, do what you want with it. Feel free to modify or move if you think something else is better. However, please do not modify the arrays/objects in "data()"
- We do not expect things to be working fully or look perfect but the code added and the approach need to make sense, and there needs to be some evidence that user experience was considered
- If at any point you want to do something but you do not have a package imported, just mock it out in the code as best you can and/or put a comment about what you would have done if you'd had the package available.


CONTEXT

You manage a natural history museum website. The museum has a set of web pages, each with a theme, and containing a list of that theme's highlights within the museum's exhibits. These pages include Dinosaurs, Space, Oceans, and Wildlife.

For example:
On the Space page, you have a list of cards, each with a space-related subject found in the museum, like asteroids, comets, black holes, stars, etc...
On the Dinosaur page, you have a list of cards, each with a dinosaur referencing fossils found in the museum.
On the Wildlife page, you have a list of cards, each with an animal.

The museum also works with partners and has set up an API where the museum website receives data related to one of these pages. For example, the museum partners with an observatory in Hawaii and receives some Space highlights from them that need to be mixed in with the museum's own data.

In the email there should also be an example of what the Space page could look like, if that helps to visualize, but feel free to do what you want design wise.



YOUR GOAL

Display the Space page highlights on cards in a list using the museum's data combined with data from the partner's API. Sample data is found in "Data()" and since we don't have any backend, pretend it was loaded in. 
Also to keep it simple, there are only a few highlights there, but there could be hundreds. Note: The data is intentionally in different formats.



REQUIREMENTS

#1. Cards displaying highlights from the space partners' API should have a different color branding from those in the museum's own data.

#2. While in this case the card only needs to work for the Space page, the card component needs to be done in such a way that it would be easily expandable to the other pages. 
The museum could have X number of pages and they could continually be adding new ones. As a developer, you don't know what those pages might be.

#2.1.    Each page has a special badge in the top right corner of the card. 
#This badge is different on every page, and could be an image, or some styled html elements, or a Font Awesome icon. 
#The Space page has an image of a star. The Dinosaur page has a Font Awesome icon inside a circle. 
#The Oceans page has two Font Awesome icons, a wave and a fish together. And so on...

#2.2     The data on the different pages (Space, Dinosaurs...) have commonalities but also differences. 
#All highlights have a name, image, date they were posted, a brief description, and perhaps associated news. 
#But all pages also have extra unique data. 
#For example, on the space page, some highlights also include a link to a quiz on the topic. 
#On the dinosaur card, we have a "Period" key to indicate when that dinosaur lived. 
#On the Wildlife page, we have several additional keys: "Location", "Species", and "Endangered status".

#3. Each card should have a "Refresh image" button which, when clicked, will replace that card's current image with a new image fetched from an API.

#3.1     When implementing this functionality, assume that you have already received the new image from the API. E.g. const newImage = await getNewImage(); where you do not need to implement the getNewImage() function.

#3.2     You only need to implement the code which will replace the current image with the new image for the relevant card.

#4. The cards should be arranged in order of date created, with the most recent first.


Follow the requirements and also complete any prompts in the two component files. You can return these two files with the content filled in, or copy and paste the relevant code and create something on Github, or in JSFiddle. -->


<template>
    <div class="space-page">
        <div class="space-page__hero-banner">
            <div class="container">
                <div class="space-page__hero-banner-content">
                    <nav class="space-page__nav">
                        <a href="/" class="space-page__nav-link">Home</a>
                        <span class="space-page__nav-separator">/</span>
                        <a href="/" class="space-page__nav-link">Exhibits</a>
                        <span class="space-page__nav-separator">/</span>
                        <span class="space-page__nav-current-category">Space</span>

                        <!-- Breadcrumbs would typically dynamically generate based on pathway data -->

                    </nav>
                    <h1 class="space-page__hero-banner-content-title">
                        Space
                    </h1>
                </div>
            </div>
        </div>

        <div class="space-page__highlights section">
            <div class="container">
                <div class="space-page__highlights-content">
                    <MuseumHighlight v-for="highlight in combinedHighlights" :key="highlight.id" :highlight="highlight"
                        :placeholderImage="placeholderImage" :badge="badge" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import _ from 'lodash';
import MuseumHighlight from './MuseumHighlight.vue';
import space from '@/assets/space.png';
import stars from '@/assets/stars.png';

export default {
    name: 'SpacePage',
    components: {
        MuseumHighlight,
    },
    mixins: [
    ],
    props: {

    },
    data() {
        return {
            spaceHighlights: [
                {
                    date: '2020-04-20 12:20:00',
                    description: 'Asteroids are minor planets, especially of the inner Solar System. Larger asteroids have also been called planetoids.',
                    id: 1,
                    image: '',
                    name: 'Asteroids',
                },
                {
                    date: '2020-05-20 15:50:00',
                    description: 'A comet is an icy, small Solar System body that, when passing close to the Sun, warms and begins to release gases, a process called outgassing.',
                    id: 9,
                    image: '',
                    name: 'Comets',
                },
                {
                    date: '2020-05-01 9:22:00',
                    description: 'The term planet is ancient, with ties to history, astrology, science, mythology, and religion.',
                    id: 7,
                    image: '',
                    name: 'Planets',
                    news: {
                        date: '2020-08-18 18:00:00',
                        title: 'Attend our talk about Jupiter with Dr. Hogarth',
                    },
                    quiz: 'https://planetquiz.space',
                },
                {
                    date: '2020-07-05 4:10:00',
                    description: 'A meteor shower is a celestial event in which a number of meteors are observed to radiate, or originate, from one point in the night sky.',
                    id: 12,
                    image: '',
                    name: 'Meteor showers',
                    news: {
                        title: 'The Lyrids will peak at on April 21-22 2021, at night',
                    },
                    // Mock properties to account for unkonwn properties - will be displayed between news and buttons
                    // location: 'Global',
                    // species: 'Homosapiens',
                    // endangeredStatus: 'Not endangered',
                },
            ],
            spacePartners: {
                observatory: {
                    createdAt: '2020-06-01 11:45:00',
                    info: 'The Mauna Kea Observatories (MKO) are a number of independent astronomical research facilities and large telescope observatories that are located at the summit of Mauna Kea on the Big Island of Hawaiʻi, United States.',
                    image: '',
                    name: 'Mauna Kea Observatories',
                },
            },
            // Added a placeholder image property so each page can have its own themed placeholder
            placeholderImage: space,
            badge: {

                // If image - Space test case

                type: 'image',
                src: stars,
                alt: 'Star',

                // If FA icon - Dinosaur test case
                // type: 'icon',
                // iconClass: 'bone', // Dinosaur icons are from FA pro, so this is a placeholder meant to represent a dinosaur fossil.

                // If multiple FA icons - Oceans test case
                //type: 'icons',
                //iconClasses: ['water', 'fish-fins'] // Wave icon is from FA pro, water is a placeholder as with the dinosaur

                // Fallback type for custom content
                // type: 'custom',
                // customContent: '<p>Custom Content</p>' // Custom content accepts HTML which will then be sanitised in MuseumHighilght
            }
        };
    },
    computed: {
        combinedHighlights() {
            // Apply source to museum highlights
            const museumHighlights = _.map(this.spaceHighlights, (item) => _.merge({}, item, { source: 'museum' }));

            // Normalize and add source to partner highlights
            const partnerHighlights = _.map(this.spacePartners, (item) => ({
                ..._.pick(item, ['id', 'name', 'image']),
                date: item.createdAt,
                description: item.info,
                source: 'partner'
            }));

            // Combine highlight arrays and sort by date
            return _.orderBy([...museumHighlights, ...partnerHighlights], ['date'], ['desc']);
        },
    },
    methods: {

    },
    created() {

    },
};
</script>

<style lang="scss" scoped>
.space-page {
    background-color: #0a0a0a;
    background-image: url(@/assets/solar-system.jpg);
    background-position: center;
    background-size: cover;
    background-blend-mode: difference;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        -webkit-filter: blur(100px);
        -moz-filter: blur(100px);
        -ms-filter: blur(100px);
        -o-filter: blur(100px);
        filter: blur(100px);
        -webkit-backdrop-filter: opacity(0.8);
        backdrop-filter: opacity(0.8);
    }


    &__hero-banner {

        height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        position: relative;

        &::before {
            content: '';
            background: linear-gradient(to bottom, #000, transparent);
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, rgba(0, 0, 0, 1), transparent);
        }

        & .container {
            z-index: 1;
        }

        &-content {

            color: #f4f4f4;
            padding: 1rem;
            text-transform: uppercase;

            & .space-page__nav {
                display: flex;
                align-items: center;
                margin-bottom: 0.5rem;

                &-link {
                    color: #f4f4f4;
                    text-decoration-color: transparent;
                    text-underline-offset: 0.2rem;
                    transition: 0.15s;

                    &:hover {
                        text-decoration-color: inherit;
                    }
                }

                &-separator {
                    margin: 0 0.5rem;
                }

                &-current-category {
                    font-weight: bold;
                }
            }

            &-title {
                font-size: 3rem;
                margin: 0;
            }
        }
    }

    &__highlights {
        position: relative;

        &-content {
            display: flex;
            flex-wrap: wrap;
        }
    }

}
</style>
