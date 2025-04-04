/** Message from Devvit to the web view. */
export type DevvitMessage = { type: string; data: any };

/** Message from the web view to Devvit. */
export type WebViewMessage = { type: string; data: any };

/**
 * Web view MessageEvent listener data type. The Devvit API wraps all messages
 * from Blocks to the web view.
 */
export type DevvitSystemMessage = {
  data: { message: DevvitMessage };
  /** Reserved type for messages sent via `context.ui.webView.postMessage`. */
  type?: "devvit-message" | string;
};
