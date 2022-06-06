import React, { Component } from 'react';
import { WebView, View } from 'react-native-webview';

const Terms = () => {  
      return (  
      <View >  
          <WebView  
              source = {{ uri:'https://www.javatpoint.com' }}  
          />  
      </View>  
      );
};

export default Terms