import "./createPost.js";

import { Devvit, useState, useWebView } from "@devvit/public-api";

import type { DevvitMessage, WebViewMessage } from "./message.js";

Devvit.configure({
  redditAPI: true,
  redis: true,
  realtime: true,
  http: true,
});

// Add a custom post type to Devvit
Devvit.addCustomPostType({
  name: "Web View Example",
  height: "tall",
  render: (context) => {
    // Fetch Server

    const data = useState(async () => {
      try {
        const url = "http://handgamebackend-895255557740.us-central1.run.app";
        const response = await fetch(url);
        const data = response.text();
        console.log("---> Respoce From Backend: " + data);
      } catch (err) {
        console.log("---> Eroro while fetching: ");
        console.log(err);
      }
      return "";
    });

    const webView = customReactWebView(context);
    return (
      <vstack grow padding="small">
        <vstack grow alignment="middle center">
          <button onPress={() => webView.mount()}>Launch App</button>
        </vstack>
      </vstack>
    );
  },
});

function customReactWebView(context: Devvit.Context) {
  return useWebView<WebViewMessage, DevvitMessage>({
    // URL of your web view content
    url: "index.html",

    // Handle messages sent from the web view
    async onMessage(message, webView) {
      console.log("--------> Received message From WebView", message);

      if (message.type == "entered") {
        // like signIn return the user identifier
      }
    },
    onUnmount() {
      context.ui.showToast("Web view closed!");
    },
  });
}

export default Devvit;
