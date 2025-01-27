<script>
import SpacePage from './components/SpacePage.vue';
import MuseumHighlight from './components/MuseumHighlight.vue';

export default {
  name: 'app',
  components: {
    SpacePage,
    MuseumHighlight
  }
};
</script>

<template>
  <header>
    <!-- Added a basic header just to represent the page better.
    Mobile version would typically be implemented with a hamburger menu, but keeping this simple to focus on the rest of the task
    -->

    <div class="header-spacer" aria-hidden="true"></div>

    <nav class="navbar">
      <div class="container navbar__container">
        <div class="navbar__brand">
          <a href="#" class="navbar__logo__link"><img alt="Vue logo" class="navbar__logo" src="@/assets/logo.png" /></a>
        </div>

        <div class="navbar__menu">
          <ul class="menu__items">
            <li class="menu__item"><a class="navbar__link" href="#">Home</a></li>
            <li class="menu__item"><a class="navbar__link" href="#">About</a></li>
            <li class="menu__item menu__item--has-dropdown">
              <a class="navbar__link" href="#">Exhibits</a>
              <ul class="navbar__dropdown">
                <li class="navbar__dropdown__item"><a class="navbar__link" href="#">Space</a></li>
                <li class="navbar__dropdown__item"><a class="navbar__link" href="#">Dinosaurs</a></li>
                <li class="navbar__dropdown__item"><a class="navbar__link" href="#">Wildlife</a></li>
                <li class="navbar__dropdown__item"><a class="navbar__link" href="#">Oceans</a></li>
              </ul>
            </li>
            <li class="menu__item"><a class="navbar__link" href="#">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <main>
    <SpacePage />
  </main>


  <!-- The footer section is intentionally omitted to maintain focus on the task -->
</template>

<style lang="scss" scoped>
@import './global.scss';

.header-spacer {
  height: 4.5rem;
  background-color: #0a0a0a;
}

.navbar {
  height: 4.5rem;
  background-color: #0a0a0a;
  color: #fafafa;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;

  transition: 0.3s;

  &:hover {
    background-color: #0a0a0a;
  }

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
  }

  .navbar__brand {
    display: flex;
    align-items: center;

    .navbar__logo {
      max-height: 3.5rem;
      width: auto;
      padding: 0.5rem 0;
    }

    .navbar__logo__link {
      display: flex;
      align-items: center;
    }
  }

  .navbar__menu {
    display: flex;
    align-items: center;

    .menu__items {
      display: flex;
      list-style: none;
      margin: 0;
      height: 100%;


      .menu__item {

        display: flex;
        justify-content: center;
        align-items: center;

        &--has-dropdown {
          position: relative;

          .navbar__dropdown {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            background-color: $primary;
            z-index: 1;
            padding: 0;
            list-style: none;

            &__item {
              flex-grow: 1;

              .navbar__link {
                height: auto;
                padding: 0.5rem 1rem;
              }
            }
          }

          &:hover {
            .navbar__dropdown {
              display: flex;
              flex-wrap: wrap;
            }
          }
        }

        .navbar__link {
          height: 100%;
          display: flex;
          align-items: center;
          padding: 0rem 1rem;
        }
      }

    }
  }

}
</style>