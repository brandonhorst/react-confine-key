import React from 'react'
import { SimpleWrapper } from 'react-confine'

export default class ConfineKey extends React.Component {
  constructor () {
    super()
  }

  getDetectedKey (obj) {
    this.props.onChange(obj)
  }

  focus (event) {
    global.detectedKey = this.getDetectedKey.bind(this)
    global.webkit.messageHandlers.startKeyDetection.postMessage(true) //apparently you must pass an arg
  }

  blur (event) {
    global.webkit.messageHandlers.stopKeyDetection.postMessage(true)
    delete global.detectedKey
  }

  render () {
    // let displayString = this.props.value.string;
    // displayString = global.getKeyDisplayString(this.props.value.string, this.props.value.key)
    console.log(SimpleWrapper)

    return (
      <SimpleWrapper title={this.props.title} description={this.props.description} className='key' format={this.props.format} label={this.props.label}>
        <div className='key-input' onFocus={this.focus.bind(this)} onBlur={this.blur.bind(this)} tabIndex={0}>
          <span className={this.props.value.ctrl ? 'active' : 'inactive'}>⌃</span>
          <span className={this.props.value.alt ? 'active' : 'inactive'}>⌥</span>
          <span className={this.props.value.shift ? 'active' : 'inactive'}>⇧</span>
          <span className={this.props.value.cmd ? 'active' : 'inactive'}>⌘</span>
          <span className='string'>{this.props.value.display}</span>
        </div>
      </SimpleWrapper>
    )
  }
}
