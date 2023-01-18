import "./Popup.css";
import {ReactComponent as OpenIcon} from "../images/openIcon.svg"
import {ReactComponent as CloseIcon} from "../images/closeIcon.svg"
export const getCurrentTabUId = (callback) => {
  const queryInfo = { active: true, currentWindow: true };
  chrome.tabs &&
    chrome.tabs.query(queryInfo, (tabs) => {
      callback(tabs[0].id);
    });
};


function Popup() {
  const sendMessage = () => {
    getCurrentTabUId((id) => {
      id &&
        chrome.tabs.sendMessage(id, {
          value: "openPopup",
        });
      window.close();
    });
  };

  const sendMessageClose = () => {
    getCurrentTabUId((id) => {
      id &&
        chrome.tabs.sendMessage(id, {
          value: "closePopup",
        });
      window.close();
    });
  };

  return (
    <div className="App">
        <span className="btn btnborder" onClick={sendMessage}><OpenIcon/>Open</span>
        <span className="btn" onClick={sendMessageClose}><CloseIcon/>Close</span>
    </div>
  );
}

export default Popup;
