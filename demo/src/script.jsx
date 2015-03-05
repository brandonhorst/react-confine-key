var _ = require('lodash')
var Confine = require('confine')
var React = require('react')
var ReactConfine = require('react-confine')

var schema = {
  type: 'object',
  properties: {
    name: {type: 'string'},
    shortcut: {type: 'key'}
  }
}

var object = {
  name: 'The command',
  shortcut: {}
}

var confine = new Confine()
confine.types['key'] = require('confine-key')
var reactTypes = {'key': require('../..')}

var JSONView = React.createClass({
  render: function () {
    return <textarea readOnly='true' value={JSON.stringify(this.props.value, null, 2)} />
  }
})

var Page = React.createClass({
  getInitialState: function () {
    return {value: this.props.value}
  },
  change: function (newValue) {
    this.setState({
      value: newValue
    })
  },
  render: function () {
    return (
      <div className='page'>
        <ReactConfine confine={confine} schema={this.props.schema}
          value={this.state.value} onChange={this.change}
          customTypes={reactTypes}/>
        <JSONView value={this.state.value} />
      </div>
    )
  }
})

React.render(<Page value={object} schema={schema} />, document.body)
