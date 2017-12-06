/**
 * Created by RyuCH on 2017. 8. 9..
 */
const chromeStorage = (chrome && chrome.storage) ? chrome.storage.local : null

class CredentialStorage {

  retrieve () {
    const credentials = {
      accessToken: '',
      secretKey: ''
    }

    if (chromeStorage) {
      chromeStorage.get('credential', (data) => {
        //decryption
        if (data['credential']) {
          this.setState({form: data['credential']})
        }
      })
    }

    return credentials
  }

  save (credentialJson) {

    //todo encryption
    if (chromeStorage)
      chromeStorage.set({
        credential: credentialJson
      })
  }
}

export default CredentialStorage
