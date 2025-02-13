var c = module.exports = {}

c.symbols = []

/*
const InstanceUtil = require('./src/utils/instance_util');
c.init = async () => {
    // Bitmex contracts + examples
  c.symbols.push(
    ...(await InstanceUtil.bitmexInit(pair => {
      // inverse contracts; trade with 1 USD
      // you can also provide a "capital" instead for trade with fixed BTC or ETH
      if (['XBTUSD', 'ETHUSD'].includes(pair.symbol) || pair.symbol.startsWith('XBT')) {
        pair.trade = { currency_capital: 1 };
        return pair;
      }

      // trade with 1 ETH on "BTC-ETH" contract, but ignore USD pair
      if (pair.symbol.startsWith('ETH') && !pair.symbol.includes('USD')) {
        pair.trade = { capital: 1 };
        return pair;
      }

      // trade ADA-BTC; as ADA is low priced BTC; good for testing
      if (pair.symbol.startsWith('ADA')) {
        pair.trade = { capital: 1 };
        return pair;
      }

      // remove others; we can not use all pairs in one instance; (only on when we not in quarterly contract change window)
      return undefined;
    }))
  );

    // Binance all USDT pairs
    c.symbols.push(...(await InstanceUtil.binanceInitUsd()));

    // Binance all USDT pairs spot or margin
    // c.symbols.push(...(await InstanceUtil.binanceInitMarginUsd()));
    // c.symbols.push(...(await InstanceUtil.binanceInitSpotUsd()));


    // Binance futures
    c.symbols.push(...(await InstanceUtil.binanceFuturesInit()));

    // Binance futures or trade with 2 USD
    c.symbols.push(
      ...(await InstanceUtil.binanceFuturesInit(pair => {
        pair.trade = { currency_capital: 2 };
        return pair;
      }))
    );

    // Bitfinex USD margin pairs
    c.symbols.push(...(await InstanceUtil.bitfinexUsdMarginInit()));

    // Bybit USD pairs (inverse)
    c.symbols.push(...(await InstanceUtil.bybitInit()));

    // Bybit USDT pairs (Linear)
    c.symbols.push(...(await InstanceUtil.bybitLinearInit()));
};
*/

/*
// external loading; lazy init
c.init = () => {
    return new Promise(resolve => {
        require('request')('https://api.binance.com/api/v1/exchangeInfo', (error, response, body) => {
            let z = [
                'BNBBTC', 'QKCBTC', 'XVGBTC', 'STRATBTC', 'LUNBTC', 'NANOBTC', 'LOOMBTC', 'VIBEBTC', 'PIVXBTC', 'MCOBTC', 'APPCBTC', 'STORJBTC', 'ELFBTC', 'ENJBTC', 'KNCBTC', 'RVNBTC', 'WANBTC', 'HCBTC',
            ]

            let trading = {
                //'BTCUSDT': 50,
                'TNTBTC': 6622,
                'ADAUSDT': 300,
                //'TUSDUSDT': 50,
                'ONTUSDT': 40,
            }

            // only USDT pairs, because of its volume and ignore stable coin pairing
            JSON.parse(body)['symbols']
		        .filter(p => p['quoteAsset'] === 'USDT' && !['USDC', 'PAX', 'USDS', 'TUSD'].includes(p['baseAsset']) && p['status'].toLowerCase() === 'trading')
                .forEach(p => {
                    z.push(p['symbol'])
                    trading[p['symbol']] = 50
                }
            )

            z.forEach((pair) => {
                let cfg = {
                    'symbol': pair,
                    'periods': ['1m', '15m', '1h'],
                    'exchange': 'binance',
                    'state': 'watch',
                    'watchdogs': [
                        {
                            'name': 'stoploss_watch',
                            'stop': 1.5,
                        }
                    ],
                    'strategies': [
                        {
                            'strategy': 'cci',
                            'options': {
                                'period': '15m'
                            }
                        },
                        {
                            'strategy': 'obv_pump_dump'
                        },
                        {
                            'strategy': 'macd',
                            'options': {
                                'period': '1h'
                            }
                        }
                    ]
                };

                if (pair in trading) {
                    cfg['trade'] = {
                        'capital': trading[pair],
                    }
                }

                c.symbols.push(cfg)
            })

            resolve()
        })
    })
}
*/

// bitmex
// let y = [
//     'XBTUSD', 'ETHUSD'
// ]

// y.forEach((pair) => {
//     c.symbols.push({
//         'symbol': pair,
//         'periods': ['1m', '15m', '1h'],
//         'exchange': 'bitmex',
//         'state': 'watch',
//         'extra': {
//             'bitmex_leverage': 5,
//             'bitmex_rest_order_sync': 45000
//         },
//         //'trade': {
//         //    'currency_capital': 1 // trade with 1 USD dollar
//         //},
//         //'watchdogs': [
//         //    {
//         //        'name': 'stoploss',
//         //        'percent': 3,
//         //    },
//         //    {
//         //        'name': 'risk_reward_ratio',
//         //        'target_percent': 3,
//         //        'stop_percent': 3,
//         //    }
//         //],
//         'strategies': [
//             {
//                 'strategy': 'cci',
//                 'options': {
//                     'period': '15m'
//                 }
//             },
//             {
//                 'strategy': 'obv_pump_dump'
//             },
//             {
//                 'strategy': 'macd',
//                 'options': {
//                     'period': '1h'
//                 }
//             }
//         ]
//     })
// })

// // bitmex testnet
// let l = [
//     'XBTUSD'
// ]

// l.forEach((pair) => {
//     c.symbols.push({
//         'symbol': pair,
//         'periods': ['1m', '15m', '1h'],
//         'exchange': 'bitmex_testnet',
//         'state': 'watch',
//         'watchdogs': [
//             {
//                 'name': 'stoploss',
//                 'percent': 3,
//             }
//         ],
//         'extra': {
//             'bitmex_leverage': 5,
//         },
//         'trade': {
//             'capital': 50,
//         },
//         'strategies': [
//             {
//                 'strategy': 'cci',
//                 'options': {
//                     'period': '15m'
//                 }
//             },
//             {
//                 'strategy': 'obv_pump_dump'
//             },
//             {
//                 'strategy': 'macd',
//                 'options': {
//                     'period': '1h'
//                 }
//             }
//         ]
//     })
// })

let z = ['BTCUSDT', 'ETHUSDT', 'BCHUSDT', 'XRPUSDT', 'EOSUSDT', 'LTCUSDT', 'TRXUSDT', 'ETCUSDT', 'LINKUSDT', 'XLMUSDT', 'ADAUSDT', 'XMRUSDT', 'DASHUSDT', 'ZECUSDT', 'XTZUSDT', 'BNBUSDT', 'ATOMUSDT', 'ONTUSDT', 'IOTAUSDT', 'BATUSDT', 'VETUSDT', 'NEOUSDT', 'QTUMUSDT', 'IOSTUSDT', 'THETAUSDT', 'ALGOUSDT', 'ZILUSDT', 'KNCUSDT', 'ZRXUSDT', 'COMPUSDT', 'OMGUSDT', 'DOGEUSDT', 'SXPUSDT', 'KAVAUSDT', 'BANDUSDT', 'RLCUSDT', 'WAVESUSDT', 'MKRUSDT', 'SNXUSDT', 'DOTUSDT', 'YFIUSDT', 'BALUSDT', 'CRVUSDT', 'TRBUSDT', 'RUNEUSDT', 'SUSHIUSDT', 'EGLDUSDT', 'SOLUSDT', 'ICXUSDT', 'STORJUSDT', 'BLZUSDT', 'UNIUSDT', 'AVAXUSDT', 'FTMUSDT', 'ENJUSDT', 'FLMUSDT', 'TOMOUSDT', 'RENUSDT', 'KSMUSDT', 'NEARUSDT', 'AAVEUSDT', 'FILUSDT', 'RSRUSDT', 'LRCUSDT', 'MATICUSDT', 'OCEANUSDT', 'CVCUSDT', 'BELUSDT', 'CTKUSDT', 'AXSUSDT', 'ALPHAUSDT', 'ZENUSDT', 'SKLUSDT', 'GRTUSDT', '1INCHUSDT', 'CHZUSDT', 'SANDUSDT', 'ANKRUSDT', 'BTSUSDT', 'LITUSDT', 'UNFIUSDT', 'REEFUSDT', 'RVNUSDT', 'SFPUSDT', 'XEMUSDT', 'COTIUSDT', 'CHRUSDT', 'MANAUSDT', 'ALICEUSDT', 'HBARUSDT', 'ONEUSDT', 'LINAUSDT', 'STMXUSDT', 'DENTUSDT', 'CELRUSDT','MTLUSDT', 'OGNUSDT', 'NKNUSDT', 'BAKEUSDT', 'GTCUSDT', 'IOTXUSDT', 'AUDIOUSDT', 'C98USDT', 'MASKUSDT', 'ATAUSDT', 'DYDXUSDT', 'GALAUSDT', 'CELOUSDT', 'ARUSDT', 'KLAYUSDT', 'ARPAUSDT', 'CTSIUSDT', 'LPTUSDT', 'ENSUSDT', 'PEOPLEUSDT', 'ANTUSDT', 'ROSEUSDT', 'DUSKUSDT', 'FLOWUSDT', 'IMXUSDT', 'API3USDT', 'GMTUSDT', 'APEUSDT', 'WOOUSDT', 'JASMYUSDT', 'DARUSDT', 'GALUSDT', 'OPUSDT', 'INJUSDT', 'STGUSDT', 'SPELLUSDT', 'LDOUSDT', 'CVXUSDT', 'ICPUSDT', 'APTUSDT', 'QNTUSDT', 'FETUSDT', 'FXSUSDT', 'HOOKUSDT', 'MAGICUSDT', 'TUSDT', 'RNDRUSDT', 'HIGHUSDT', 'MINAUSDT', 'ASTRUSDT', 'AGIXUSDT', 'PHBUSDT', 'GMXUSDT', 'CFXUSDT', 'STXUSDT', 'BNXUSDT', 'ACHUSDT', 'SSVUSDT', 'CKBUSDT', 'PERPUSDT', 'TRUUSDT', 'LQTYUSDT', 'IDUSDT', 'ARBUSDT', 'JOEUSDT', 'TLMUSDT', 'AMBUSDT', 'LEVERUSDT', 'RDNTUSDT', 'HFTUSDT', 'XVSUSDT', 'EDUUSDT', 'IDEXUSDT', 'SUIUSDT', 'UMAUSDT', 'RADUSDT', 'KEYUSDT']
z.forEach((pair) => {
    c.symbols.push({
        'symbol': pair,
        'periods': ['15m', '1h'],
        'exchange': 'binance',
        'state': 'watch',
        'strategies': [
            {
                'strategy': 'macd',
                'options': {
                    'period': '15m'
                }
            }
        ]
    })
})
