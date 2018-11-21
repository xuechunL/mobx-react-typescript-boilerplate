import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'
import DevTools from 'mobx-react-devtools'

class AppState {
  @observable timer = 0

  constructor() {
    setInterval(() => this.timer += 1, 1000)
  }

  resetTimer() {
    this.timer = 0
  }
}

@observer
class TimerView extends React.Component<{appState: AppState}, {}> {
  render() {
    return (
      <div>
        <button onClick={this.onReset}>
        Seconds passed: {this.props.appState.timer}
        </button>
        <DevTools />
      </div>
    )
  }

  onReset = () => {
    this.props.appState.resetTimer()
  }
}

class OrderLineStore {
  @observable price = 0
  @observable amount = 1

  constructor(price, amount?: number) {
    this.price = price
    this.amount = amount || 1
  }

  @computed get total() {
    return this.price * this.amount
  }
}

@observer
class OrderView extends React.Component<{orderStore: OrderLineStore}, {}> {
  render() {
    return (
      <div>
          <p>
            price: {this.props.orderStore.price}, amount: {this.props.orderStore.amount}
          </p>
          <p>
          total:
          {this.props.orderStore.price} * {this.props.orderStore.amount}
          = {this.props.orderStore.total}
          </p>
        <DevTools />
      </div>
    )
  }
}

const appState = new AppState()
const orderStore = new OrderLineStore(12)
const orderStore2 = new OrderLineStore(12, 8)

ReactDOM.render((
  <div>
    <TimerView appState={appState} />
    <OrderView orderStore={orderStore} />
    <OrderView orderStore={orderStore2} />
  </div>
), document.getElementById('root'))
