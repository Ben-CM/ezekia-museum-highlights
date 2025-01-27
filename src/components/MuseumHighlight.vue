<template>
    <div class="highlight" :class="highlightSource">
        <div class="card">
            <div class="card__image" :class="imageLoading ? 'loading' : ''">
                <img :src="loadImage" alt="Museum Highlight Image" />
            </div>


            <!-- Load Badges based on badge.type -->
            <div class="card__badge">
                <img v-if="badge.type === 'image'" :src="badge.src" :alt="badge.alt" class="badge__image" />

                <font-awesome-icon v-if="badge.type === 'icon'" :icon="badge.iconClass"
                    class="badge__icon"></font-awesome-icon>

                <div v-if="badge.type === 'icons'" class=".badge__icons">
                    <font-awesome-icon v-for="iconClass in badge.iconClasses" :key="iconClass" :icon="iconClass"
                        class="badge__icons__icon"></font-awesome-icon>
                </div>

                <!-- This would be sanitised e.g. using DOMPurify -->
                <div v-if="badge.type === 'custom'" v-html="badge.customContent"></div>


            </div>

            <div class="card__content">
                <a href="#" target="_blank">
                    <h2 class="card__title">{{ name }}</h2>
                </a>
                <p class="card__date">Date: {{ highlightDate }}</p>
                <p class="card__description">{{ description }}</p>
                <template v-if="news">
                    <div class="card__news">
                        <p class="news__title news__date" v-if="news.date">{{ news.title }} - {{ newsDate }}</p>
                        <p class="news__title" v-else>{{ news.title }} {{ newsDate }}</p>
                    </div>
                </template>

                <template v-if="Object.keys(otherProperties).length > 0">
                    <div class="other__properties">
                        <p v-for="(value, key) in otherProperties" :key="key">
                            <span class="property__key">{{ key }}</span>: {{ value }}
                        </p>
                    </div>
                </template>


            </div>
            <div class="card__footer">

                <div class="buttons buttons--end buttons--small-gap">
                    <!-- Dynamically add quiz button if present as quiz is a known property to expect -->
                    <a class="button quiz__button button-light" target="_blank" v-if="quizLink" :href="quizLink">Take
                        the
                        quiz</a>


                    <button @click="getNewImage()" class="button refresh__button">Refresh image</button>
                </div>

            </div>
        </div>
    </div>

    <pre>{{ imageAssets }}</pre>
</template>

<script>
import { formatDate } from '@/utils';
import asteroid from '@/assets/asteroid.png';
import comet from '@/assets/comet.png';
import observatory from '@/assets/observatory.png';
import jupiter from '@/assets/jupiter.jpg';
import meteorShower from '@/assets/meteor-shower.jpg';

export default {
    name: 'MuseumHighlight',
    components: {

    },
    mixins: [
    ],
    props: {
        highlight: {
            type: Object,
            required: true,
        },
        placeholderImage: {
            type: String,
            required: true,
        },
        badge: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            source: this.highlight.source,
            image: this.highlight.image,
            name: this.highlight.name,
            description: this.highlight.description,
            news: this.highlight.news,

            imageLoading: false,
        };
    },
    computed: {
        highlightSource() {
            return this.highlight.source + "__highlight";
        },

        loadImage() {
            // Placeholder image if no image is provided by the parent component
            return !this.image ? this.placeholderImage : this.image;
        },

        highlightDate() {
            return formatDate(this.highlight.date);
        },

        newsDate() {
            if (this.news && this.news.date) {
                return formatDate(this.news.date);
            } else {
                return null;
            }
        },

        quizLink() {
            return !this.highlight.quiz ? null : this.highlight.quiz;
        },

        otherProperties() {
            // Get all properties except the known ones and return them to be listed
            const { name, image, date, description, news, source, id, quiz, ...others } = this.highlight;
            return others;
        },

    },
    methods: {
        async getNewImage() {
            // Assuming this function returns an image URL from the API
            // In live, newImage would be the value returned from the API.

            this.imageLoading = true;

            // Timeout to simulate a delay from the API and demonstrate the loading spinner
            setTimeout(() => {

                // Basic logic to assign different images to each card to simulate unique API responses
                // No logic added to simulate multiple images per-card as this would be the API's task
                // Refresh image button still calls this under the assumption API would return new image

                const imageMap = {
                    'Asteroids': asteroid,
                    'Comets': comet,
                    'Planets': jupiter,
                    'Mauna Kea Observatories': observatory,
                    'Meteor showers': meteorShower
                };

                const newImage = imageMap[this.highlight.name] || this.placeholderImage;

                this.image = newImage;
                this.imageLoading = false;
            }, 1000);
        },
    },
    created() {
        this.getNewImage(); // Get initial image on card creation
    },
};
</script>

<style lang="scss" scoped>
@import '../global.scss';

.highlight {
    display: flex;
    max-width: 100%;

    @media (min-width: 768px) {
        max-width: 50%;
    }

    @media (min-width: 1088px) {
        max-width: 25%;
    }

    &.museum__highlight {
        .card {
            background: linear-gradient(to bottom right, $primary, $secondary);
        }
    }

    &.partner__highlight {
        .card {
            background: linear-gradient(to bottom right, $partner-primary, $partner-secondary);
        }
    }

    .card {
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        margin: 1rem;
        color: #f4f4f4;
        position: relative;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);


        &__image {
            height: 12.5rem;
            overflow: hidden;

            img {
                border-radius: 5px 5px 0 0;
                object-fit: cover;
                width: 100%;
                height: 100%;
                transform: scale(1);
                transition: 0.3s;
            }

            &:hover {
                img {
                    transform: scale(1.1);
                }
            }

            position: relative;

            &.loading::before {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                content: "";
                background: #333333a9;
                display: block;
                border-radius: 5px 5px 0 0;
                z-index: 10;
            }

            &.loading::after {
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                width: 50px;
                height: 50px;
                margin: -25px 0 0 -25px;
                border: 5px solid rgba(255, 255, 255, 0.3);
                border-top-color: #fff;
                border-radius: 50%;
                animation: spinner 1s linear infinite;
                z-index: 11;
            }

            @keyframes spinner {
                to {
                    transform: rotate(360deg);
                }
            }

            .card__image {
                position: relative;
            }


        }

        &__content {
            flex: 1;
            padding: 1rem;

            .card__title {
                font-size: 1.5rem;
                font-weight: bold;
                margin-bottom: 0;
            }

            .card__date {
                font-size: 0.8rem;
                margin-bottom: 1rem;
            }

            .card__description {
                margin-bottom: 1rem;
            }

            .refresh__button {
                align-self: flex-end;
                justify-self: flex-end;
            }

            .other__properties {
                .property__key {
                    text-transform: capitalize;
                    font-weight: bold;
                }
            }
        }

        &__news {
            font-style: italic;
        }

        &__footer {
            padding: 1rem;

        }

        &__badge {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0.5rem;
            position: absolute;
            top: 0;
            right: 0;
            z-index: 20;



            .badge__image {

                background-color: $secondary;
                border-radius: 100%;
                width: 2rem;
                height: 2rem;
                padding: 0.5rem;
            }

            .badge__icon {
                width: 2rem;
                height: 2rem;
                background-color: $secondary;
                border-radius: 100%;
                padding: 0.5rem;
            }

            .badge__icons {
                &__icon {
                    width: 2rem;
                    height: 2rem;
                    margin: 0 0.25rem;
                    background-color: $secondary;
                    border-radius: 100%;
                    padding: 0.5rem;
                }

            }
        }
    }
}
</style>
