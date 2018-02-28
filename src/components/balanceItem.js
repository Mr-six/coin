/**
 * 账户余额显示，根据不同货币的余额显示不同的状态
 */
export default {
  render: function(h) {
    const { symbol, amount } = this
    const cl = getClass(symbol, amount)
    return h(
      'div', // 标签名称
      // {
      //   class:
      // },
      this.$slots.default // 子组件中的阵列
    )
  },
  props: {
    symbol: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  }
}

// 余额预警值临界点
const waringValue = {
  btc: {
    danger: 5,
    warning: 10
  },
  usd: {
    danger: 50000,
    warning: 500000
  },
  default: {
    danger: 1000,
    warning: 5000
  }
}

/**
 * 根据不同币种剩余的数量 返回不同的颜色类
 * @param {String} symbol 币种
 * @param {Number} amount 数量
 */
function getClass (symbol, amount) {
  const cc = ['danger', 'warning', 'success', 'theme']
  let c = ''
  switch (symbol) {
    case 'btc':
      if (amount < waringValue.btc.danger) {
        c = cc[0]
      } else if (amount < waringValue.btc.warning) {
        c = cc[1]
      } else {
        c = cc[2]
      }
      break
    case 'usd':
      if (amount < waringValue.usd.danger) {
        c = cc[0]
      } else if (amount < waringValue.usd.warning) {
        c = cc[1]
      } else {
        c = cc[2]
      }
      break

    default:
      if (amount < waringValue.default.danger) {
        c = cc[0]
      } else if (amount < waringValue.default.warning) {
        c = cc[1]
      } else {
        c = cc[2]
      }
      break
  }
  return c
}
