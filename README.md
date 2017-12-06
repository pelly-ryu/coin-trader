# Coin Trader
Chrome extension which is support trading cryptocurrencies

## Supporting markets
- Coinone : http://coinone.co.kr/
- ... will be added

## WARNING!
Credential information is encrypted and saved in Chrome storage.
Password for the information is not stored in anywhere, so you must remember it.

But it's *NOT* completely safe.
Someone who gained access to the device could get the encrypted credentials,
and there are several ways to find out original information. (e.g. Brute Force attack to the password)
The source code of this extension including encrypting part is open-sourced,
and not using private storage(Chrome storage isn't safe) to save credential information.

**Please be aware to use this extension in a public place.**

## How To Install
1. `git clone https://github.com/pelly-ryu/coin-trader.git`
    - If it failed, install **git**.

1. `cd coin-trader`

1. `npm install`
    - If it failed, install **npm**.

1. `gulp`
    - If it failed, `npm install -g gulp`

1. Set Chrome developer mode in **Extensions**.

1. **Load unpacked extensions** -> select the **build** directory.
