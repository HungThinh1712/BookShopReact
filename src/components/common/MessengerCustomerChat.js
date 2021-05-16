import React, { Component } from 'react';

import MessengerCustomerChat from 'react-messenger-customer-chat';

const MessengerChat = () => (  
  <div>
    <MessengerCustomerChat
      pageId="106415988259716"
      appId="197404338770972"
      version="2.1"
      htmlRef={window.location.pathname}
      themeColor="#35B835"
      language= 'vi'
      debug={false}
      autoLogAppEvents={true}
    />
  </div>
);

export default MessengerChat;