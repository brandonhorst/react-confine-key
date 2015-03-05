var React = require('react')

module.exports = React.createClass({
  getInitialState: function () {
    return {}
  },
  getDetectedKey: function (obj) {
    this.setState(obj)
    if (obj.key === 0) {
      this.props.onChange({})
    } else {
      this.props.onChange(obj)
    }
  },
  startDetection: function (event) {
    global.startKeyDetection(this.getDetectedKey)
  },
  render: function () {
    var disp =
      (this.state.ctrl ? '⌃' : '') +
      (this.state.alt ? '⌥' : '') +
      (this.state.shift ? '⇧' : '') +
      (this.state.meta ? '⌘' : '') +
      (this.state.string || '')

    return <span><input type='button' class='keyboard-input' onClick={this.startDetection} value={disp} /></span>
  }
})
