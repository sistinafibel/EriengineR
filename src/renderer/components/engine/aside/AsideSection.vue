<template>
  <section id="aside-section">
    <aside-section-home v-show="tabId === 'home'"></aside-section-home>
    <aside-section-asset v-show="tabId === 'asset'"></aside-section-asset>
    <aside-section-design v-show="tabId === 'design'"></aside-section-design>
    <aside-section-scene v-show="tabId === 'scene'"></aside-section-scene>
    <aside-section-script v-show="tabId === 'script'"></aside-section-script>
    <aside-section-language v-show="tabId === 'language'"></aside-section-language>
  </section>
</template>

<script>
  import $ from 'jquery'
  import 'jquery-ui/ui/widgets/resizable'
  import 'jquery-ui/themes/base/core.css'
  import 'jquery-ui/themes/base/resizable.css'

  import AsideSectionHome from './tabs/AsideSectionHome'
  import AsideSectionAsset from './tabs/AsideSectionAsset'
  import AsideSectionDesign from './tabs/AsideSectionDesign'
  import AsideSectionScene from './tabs/AsideSectionScene'
  import AsideSectionScript from './tabs/AsideSectionScript'
  import AsideSectionLanguage from './tabs/AsideSectionLanguage'

  export default {
    components: {
      AsideSectionHome,
      AsideSectionAsset,
      AsideSectionDesign,
      AsideSectionScene,
      AsideSectionScript,
      AsideSectionLanguage
    },
    data: () => ({
      tabId: 'home'
    }),
    mounted(e) {

      this.$root.$on('showAsideTab', tabId => {
        this.tabId = tabId
      })

      $(document).ready(function () {
        $('#aside-section').resizable({
          handles: 'e',
          minWidth: 2
        })
      })

    }
  }
</script>

<style lang="scss" scoped>
  #aside-section {
    width: 260px;
    background-color: #444;
    overflow: auto;
    overflow-x: hidden;
    position: relative;
    z-index: 1;
  }
</style>