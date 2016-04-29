import _ from 'lodash'
import Confine from 'confine'
import React from 'react'
import {render} from 'react-dom'
import {ConfineView} from 'react-confine'
import ReactConfineKey from '../..'

const schema = {
  type: 'object',
  properties: {
    name: {type: 'string'},
    shortcut: {type: 'key'}
  }
}

const object = {
  name: 'The command',
  shortcut: {}
}

const confine = new Confine()
confine.types['key'] = require('confine-key')
const reactTypes = {key: ReactConfineKey}

global.startKeyDetection = (callback) => {
  callback({key: 8, string: 'C', shift: true, meta: true, alt: true, ctrl: true}) 
}

class JSONView extends React.Component {
  render () {
    return <textarea readOnly='true' value={JSON.stringify(this.props.value, null, 2)} />
  }
}

class Page extends React.Component {
  constructor ({value}) {
    super()
    this.state = {value}
  }

  change (value) {
    this.setState({value})
  }

  render () {
    return (
      <div className='page'>
        <ConfineView confine={confine} schema={this.props.schema}
          value={this.state.value} onChange={this.change.bind(this)}
          customTypes={reactTypes}/>
        <JSONView value={this.state.value} />
      </div>
    )
  }
}

render(<Page value={object} schema={schema} />, document.getElementById('demo'))
