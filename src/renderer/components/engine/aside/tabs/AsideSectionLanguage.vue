<template>
  <div class="aside-section-tab">
    <treeview :path="path" :filter="filter" :openItem="openItem" :contextmenu="contextmenu" :configurable="true"></treeview>
  </div>
</template>

<script>
  import Treeview from '@/components/treeview/Treeview'
  import os from 'os'
  import path from 'path'
  import fs from 'fs-extra'

  import {
    ipcRenderer,
    shell
  } from 'electron'


  export default {
    components: {
      Treeview
    },
    data: () => ({
      path: path.join(ipcRenderer.sendSync('var-get-sync', 'project.directory'), 'Languages'),
      filter: {
        extensions: /\.json/
      }
    }),
    computed: {

      contextmenu() {

        return [{
          text: '다국어 관리자',
          click(e, itempath) {
            this.$root.$emit('createWorkspaceTab', 'language-manager', `다국어 관리자`, 'LANGUAGE-MANAGER')
          }
        }]

      }

    },
    methods: {

      openItem(itempath) {
        shell.openItem(itempath)
      }

    }
  }
</script>

<style lang="scss" scoped>
  @import 'common.scss';
</style>