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
  name: "Hand-Game With Devvit",
  description:
    "HandGame isn’t playable yet since Reddit doesn’t support WebSockets. Hoping for future support to make it happen!",
  height: "tall",
  render: (context) => {
    const webView = customReactWebView(context);
    return (
      <vstack grow padding="small" backgroundColor="#13192D">
        <vstack gap="large" grow alignment="middle center">
          <vstack gap="small" alignment="middle center">
            <image url="logo.png" imageHeight={150} imageWidth={150}></image>
            <text weight="bold" size="xxlarge" style="heading" color="#ffffff">
              The Classic Battle
            </text>
            <text size="xlarge" weight="regular" color="#B0B8D1">
              Strategy or chance? Only the lucky will win!
            </text>
          </vstack>

          <button width={32} size="large" onPress={() => webView.mount()}>
            Enter The Area
          </button>
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
      ///
    },
    onUnmount() {
      context.ui.showToast("Web view closed!");
    },
  });
}

export default Devvit;
