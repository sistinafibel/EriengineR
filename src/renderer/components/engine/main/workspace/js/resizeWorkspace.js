import $ from 'jquery'

export default function () {
  let vh
  let wh
  let $workspace
  let $terminal

  $(document).ready(function () {
    $workspace = $('#workspace')
    $terminal = $('#terminal')

    vh = document.documentElement.clientHeight
    wh = $workspace.height()

    $workspace.resizable('option', 'maxHeight', --vh)
    $terminal.css('height', vh - wh)
  })
};