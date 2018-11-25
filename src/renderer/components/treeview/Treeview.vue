<template>
  <li class="template-treeview-item">
    <div :title="model.path" @click="toggle" @dblclick="openThis(model.path)" tabindex="-1" @contextmenu="openContextmenu"
      @blur="contextmenu_info.open = false" draggable="true" @dragstart="setDragItem" @dragover="allowDrop" @drop="dropItem">
      <div class="template-treeview-indent" :data-depth="depth">
        <img src="~@/assets/img/ico_arrow_right.svg" v-if="isFolder" :class="{'template-treeview-open': open}">
        <p v-if="!modifyMode">{{ model.name }}</p>
        <input type="text" v-else @keydown.esc="modifyNameCancel" @keydown.enter="modifyName($event, model.path)" @blur="modifyName($event, model.path)">
      </div>
      <div v-if="contextmenu_info.open" class="template-treeview-contextmenu" :style="{left: `${contextmenu_info.x}px`, top: `${contextmenu_info.y}px`}">
        <ul>
          <li v-for="item in contextmenu" :key="item.text" @click="callContextmenuItem($event, item.click, model.path)">{{
            item.text }}</li>
        </ul>
      </div>
    </div>
    <ul v-show="open" v-if="isFolder">
      <treeview class="item" v-for="model in model.children" :path="path" :filter="filter" :model="model" :key="model.path"
        :openItem="openItem" :configurable="configurable" :contextmenu="contextmenu" :top="top" :depth="nextDepth"></treeview>
    </ul>
  </li>
</template>

<script>
  import fs from 'graceful-fs'
  import path from 'path'

  import electron, {
    ipcRenderer
  } from 'electron'
  import dirTree from 'directory-tree'

  export default {
    name: 'treeview',
    props: {
      path: String,
      filter: {
        type: Object,
        default: {}
      },
      model: {
        type: Object,
        default () {
          fs.watch(this.path, {
            recursive: true
          }, () => {
            this.model = dirTree(this.path, this.filter)
          })
          return dirTree(this.path, this.filter)
        }
      },
      configurable: {
        type: Boolean,
        default: false
      },
      contextmenu: {
        type: Array,
        default () {
          return [{
              text: '이름 바꾸기',
              click(e, before) {
                let t
                this.modifyMode = true
                this.$nextTick(() => {
                  t = this.$el.querySelector('input')
                  t.value = this.model.name
                  t.select()
                  t.focus()
                })
              }
            },
            {
              text: '삭제',
              click(e, itempath) {
                electron.ipcRenderer.send('modal-delete-trash', {
                  name: path.basename(itempath),
                  path: itempath
                })
              }
            }
          ]
        }
      },
      depth: {
        type: Number,
        default: 0
      },
      top: {
        type: Object,
        default () {
          return this
        }
      },
      openItem: {
        type: Function,
        default () {
          electron.shell.openItem(this.model.path)
        }
      }
    },
    data() {
      return {
        open: false,
        modifyMode: false,
        contextmenu_info: {
          x: 0,
          y: 0,
          open: false
        }
      }
    },
    computed: {
      isFolder() {
        return this.model.children
      },
      nextDepth() {
        return this.depth + 1
      }
    },
    methods: {
      toggle() {
        if (this.isFolder && !this.modifyMode) {
          this.open = !this.open
        }
      },
      openThis(filepath) {
        if (!this.isFolder) {
          this.openItem(filepath)
        }
      },
      openContextmenu(e) {
        if (this.top === this) {
          return
        }
        if (this.configurable) {
          this.contextmenu_info.open = true
          this.contextmenu_info.x = e.clientX
          this.contextmenu_info.y = e.clientY
          e.currentTarget.focus()
        }
      },
      callContextmenuItem(e, fn, itempath) {
        fn.call(this, e, itempath)
      },
      modifyName(e, before) {

        let name
        let after

        name = e.currentTarget.value
        after = path.join(path.dirname(before), name)

        if (!name) {
          this.modifyNameCancel(e)
          return
        }

        if (path.parse(before).ext !== path.parse(after).ext) {
          after = path.format({
            dir: path.dirname(after),
            name: path.parse(after).name,
            ext: path.extname(before)
          })
        }

        fs.rename(before, after, err => {

          this.modifyMode = false

          if (err) {
            ipcRenderer.send('send-error', err.toString())
          }

        })

      },
      modifyNameCancel(e) {
        e.currentTarget.value = this.model.name
        this.modifyMode = false
      },
      setDragItem(e) {
        if (this.configurable) {
          e.dataTransfer.setData('filePath', this.model.path)
        }
      },
      allowDrop(e) {
        if (this.configurable) {
          e.preventDefault()
        }
      },
      dropItem(e) {

        let before
        let after

        before = e.dataTransfer.getData('filePath')
        after = this.model.path
        after = path.join(after, path.basename(before))

        fs.rename(before, after, err => {
          if (err) {
            electron.ipcRenderer.send('send-error', err)
          }
        })

      }
    },
    mounted() {
      this.$el.querySelectorAll('div.template-treeview-indent').forEach(t => {
        t.style.marginLeft = `${t.dataset.depth * 10 + 25}px`
      })
    }
  }
</script>

<style lang="scss" scoped>
  ul {
    padding: 0;
    margin: 0;
  }

  li {
    list-style: none;
  }

  .template-treeview-item {
    margin: 4px 0;
    position: relative;
    cursor: pointer;

    >div {
      outline: none;

      &:hover {
        background-color: #efefef;
      }
    }

  }

  .template-treeview-contextmenu {
    width: 300px;
    background-color: #efefef;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, .3);
    position: fixed;
    z-index: 1;

    >ul {
      padding: 5px 0;

      >li {
        height: 30px;
        font-size: smaller;
        line-height: 30px;
        padding: 0 30px;

        &:hover {
          background-color: lightgray;
        }
      }
    }
  }

  .template-treeview-indent {
    padding: 3px 0;
    position: relative;

    >p,
    >input {
      width: 100%;
      height: 18px;
      font-size: small;
      line-height: 20px;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    >input {
      width: calc(100% - 10px);
      padding: 0;
      border: 0;
      border-bottom: 1px solid #0075c8;
      outline: none;
    }

    >img {
      width: 10px;
      height: 10px;
      position: absolute;
      left: -18px;
      bottom: 7px;
      opacity: 0.3;
      transition: transform 0.1s linear, opacity 0.1s linear;

      &.template-treeview-open {
        opacity: 1;
        transform: rotate(45deg);
      }
    }
  }
</style>