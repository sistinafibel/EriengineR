export default function getMacro(e) {

  e.sender.send('macro-get', this.variables.macro)

}