from flask import Flask, request, abort

from linebot import (
    LineBotApi, WebhookHandler
)
from linebot.exceptions import (
    InvalidSignatureError
)
from linebot.models import (
    MessageEvent, TextMessage, TextSendMessage, BeaconEvent
)

app = Flask(__name__)

line_bot_api = LineBotApi('zg94GDiO4treB1auiNZaGP4bg1SmSqHMQficRQGU6xGni+Qg0bKDOpm2Um5etYiCWTvEWm4zkPqO+iXAqNXBbNbjeQzwfLQV6bQbIt1hq3DEtywceJzAz0TlhwCfpjlGPEgbMU6rNfNlvetavQFwsQdB04t89/1O/w1cDnyilFU=')
handler = WebhookHandler('87d8fa36024ab9a2672c4500b163987b')


@app.route("/callback", methods=['POST'])
def callback():
    # get X-Line-Signature header value
    signature = request.headers['X-Line-Signature']

    # get request body as text
    body = request.get_data(as_text=True)
    app.logger.info("Request body: " + body)

    # handle webhook body
    try:
        handler.handle(body, signature)
    except InvalidSignatureError:
        abort(400)

    return 'OK'

@handler.add(BeaconEvent)
def handle_message(event):
    print(event)

@handler.add(MessageEvent, message=TextMessage)
def handle_message(event):
    line_bot_api.reply_message(
        event.reply_token,
        TextSendMessage(text=event.message.text))


if __name__ == "__main__":
    app.run()