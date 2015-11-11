import React from 'react'


export default class ConfineKey extends React.Component {
  constructor () {
    super()
    this.state = {}
  }

  getDetectedKey (obj) {
    this.setState(obj)
    if (obj.key === 0) {
      this.props.onChange({})
    } else {
      this.props.onChange(obj)
    }
  }

  startDetection (event) {
    global.startKeyDetection(this.getDetectedKey.bind(this))
  }

  render () {
    var disp =
      (this.state.ctrl ? '⌃' : '') +
      (this.state.alt ? '⌥' : '') +
      (this.state.shift ? '⇧' : '') +
      (this.state.meta ? '⌘' : '') +
      (this.state.string || '')

    return <span><input type='button' className='keyboard-input' onClick={this.startDetection.bind(this)} value={disp} /></span>
  }
}
