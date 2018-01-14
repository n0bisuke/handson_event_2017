'use strict';

import {Socket} from "phoenix"

const UUID = uuid();

function uuid() {
  var uuid = "", i, random;
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;

    if (i == 8 || i == 12 || i == 16 || i == 20) {
      uuid += "-"
    }
    uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
  }
  return uuid;
}

class Demo {
  static init(socket) {
    const $localVideo = document.getElementById('local_video');
    const $remoteVideo = document.getElementById('remote_video');
    const $textForSendSdp = document.getElementById('text_for_send_sdp');
    const $textToReceiveSdp = document.getElementById('text_for_receive_sdp');
    let localStream = null;
    let peerConnection = null;
    
    $('#start-video').on('click', startVideo);
    $('#connect').on('click', connect);
    $('#onSdpText').on('click', onSdpText);
    $('#hangUp').on('click', hangUp);
    // $('#stop-video').on('click', startVideo);
    
    // getUserMediaでカメラ、マイクにアクセス
    function startVideo() {
        navigator.mediaDevices.getUserMedia({video: true, audio: true})
            .then(function (stream) { // success
                playVideo($localVideo,stream);
                localStream = stream;
            }).catch(function (error) { // error
            console.error('mediaDevice.getUserMedia() error:', error);
            return;
        });
    }
    
    // Videoの再生を開始する
    function playVideo(element, stream) {
        element.srcObject = stream;
        element.play();
    }
    
    // WebRTCを利用する準備をする
    function prepareNewConnection() {
        // RTCPeerConnectionを初期化する
        const pc_config = {"iceServers":[ {"urls":"stun:stun.skyway.io:3478"} ]};
        const peer = new RTCPeerConnection(pc_config);
    
        // リモートのストリームを受信した場合のイベントをセット
        if ('ontrack' in peer) {
            peer.ontrack = function(event) {
                console.log('-- peer.ontrack()');
                playVideo($remoteVideo, event.streams[0]);
            };
        }
        else {
            peer.onaddstream = function(event) {
                console.log('-- peer.onaddstream()');
                playVideo($remoteVideo, event.stream);
            };
        }
    
        // ICE Candidateを収集したときのイベント
        // peer.onicecandidate = function (evt) {
        //     if (evt.candidate) {
        //         console.log(evt.candidate);
        //     } else {
        //         console.log('empty ice event');
        //         sendSdp(peer.localDescription);
        //     }
        // };
    
        peer.onicecandidate = function (evt) {
            if (evt.candidate) {
                console.log(evt.candidate);
                sendIceCandidate(evt.candidate);
            } else {
                console.log('empty ice event');
                // sendSdp(peer.localDescription);
            }
        };
    
        // ローカルのストリームを利用できるように準備する
        if (localStream) {
            console.log('Adding local stream...');
            peer.addStream(localStream);
        }
        else {
            console.warn('no local stream, but continue.');
        }
    
        // ICEのステータスが変更になったときの処理
        peer.oniceconnectionstatechange = function() {
            console.log('ICE connection Status has changed to ' + peer.iceConnectionState);
            switch (peer.iceConnectionState) {
                case 'closed':
                case 'failed':
                    // ICEのステートが切断状態または異常状態になったら切断処理を実行する
                    if (peerConnection) {
                        hangUp();
                    }
                    break;
                case 'dissconnected':
                    break;
            }
        };
        
    
        return peer;
    }
    
    // 手動シグナリングのための処理を追加する
    // function sendSdp(sessionDescription) {
    //     console.log('---sending sdp ---');
    //     $textForSendSdp.value = sessionDescription.sdp;
    //     $textForSendSdp.focus();
    //     $textForSendSdp.select();
    // }
    
    function sendSdp(sessionDescription) {
        console.log('---sending sdp ---');
        $textForSendSdp.value = sessionDescription.sdp;
        /*---
         textForSendSdp.focus();
         textForSendSdp.select();
         ----*/
        const message = JSON.stringify(sessionDescription);
        console.log('sending SDP=' + message);
        // ws.send(message);
        chan.push("new_msg", {user: 'のびすけ', body: 'webrtc hello'})
        chan.push('signaling', {body: message, uuid:UUID})
    }
    
    // Connectボタンが押されたら処理を開始
    function connect() {
        if (! peerConnection) {
            console.log('make Offer');
            makeOffer();
        }
        else {
            console.warn('peer already exist.');
        }
    }
    
    // // Offer SDPを生成する
    // function makeOffer() {
    //     peerConnection = prepareNewConnection();
    //     peerConnection.onnegotiationneeded = function(){
    //         peerConnection.createOffer()
    //             .then(function (sessionDescription) {
    //                 console.log('createOffer() succsess in promise');
    //                 return peerConnection.setLocalDescription(sessionDescription);
    //             }).then(function() {
    //                 console.log('setLocalDescription() succsess in promise');
    //         }).catch(function(err) {
    //             console.error(err);
    //         });
    //     }
    // }
    
    // // Answer SDPを生成する
    // function makeAnswer() {
    //     console.log('sending Answer. Creating remote session description...' );
    //     if (! peerConnection) {
    //         console.error('peerConnection NOT exist!');
    //         return;
    //     }
    //     peerConnection.createAnswer()
    //         .then(function (sessionDescription) {
    //             console.log('createAnswer() succsess in promise');
    //             return peerConnection.setLocalDescription(sessionDescription);
    //         }).then(function() {
    //             console.log('setLocalDescription() succsess in promise');
    //     }).catch(function(err) {
    //         console.error(err);
    //     });
    // }
    
    // Offer SDPを生成する
    function makeOffer() {
        peerConnection = prepareNewConnection();
        peerConnection.onnegotiationneeded = function(){
            peerConnection.createOffer()
                .then(function (sessionDescription) {
                    console.log('createOffer() succsess in promise');
                    return peerConnection.setLocalDescription(sessionDescription);
                }).then(function() {
                    console.log('setLocalDescription() succsess in promise');
                    sendSdp(peerConnection.localDescription);
                }).catch(function(err) {
                    console.error(err);
            });
        }
    }
    
    // Answer SDPを生成する
    function makeAnswer() {
        console.log('sending Answer. Creating remote session description...' );
        if (! peerConnection) {
            console.error('peerConnection NOT exist!');
            return;
        }
        peerConnection.createAnswer()
            .then(function (sessionDescription) {
                console.log('createAnswer() succsess in promise');
                return peerConnection.setLocalDescription(sessionDescription);
            }).then(function() {
                console.log('setLocalDescription() succsess in promise');
                sendSdp(peerConnection.localDescription);
            }).catch(function(err) {
                console.error(err);
        });
    }
    
    
    // SDPのタイプを判別しセットする
    function onSdpText() {
        const text = $textToReceiveSdp.value;
        if (peerConnection) {
            // Offerした側が相手からのAnswerをセットする場合
            console.log('Received answer text...');
            const answer = new RTCSessionDescription({
                type : 'answer',
                sdp : text,
            });
            setAnswer(answer);
        }
        else {
            // Offerを受けた側が相手からのOfferをセットする場合
            console.log('Received offer text...');
            const offer = new RTCSessionDescription({
                type : 'offer',
                sdp : text,
            });
            setOffer(offer);
        }
        $textToReceiveSdp.value ='';
    }
    
    // Offer側のSDPをセットした場合の処理
    function setOffer(sessionDescription) {
        if (peerConnection) {
            console.error('peerConnection alreay exist!');
        }
        peerConnection = prepareNewConnection();
        peerConnection.onnegotiationneeded = function () {
            peerConnection.setRemoteDescription(sessionDescription)
                .then(function() {
                    console.log('setRemoteDescription(offer) succsess in promise');
                    makeAnswer();
                }).catch(function(err) {
                    console.error('setRemoteDescription(offer) ERROR: ', err);
            });
        }
    }
    
    // Answer側のSDPをセットした場合の処理
    function setAnswer(sessionDescription) {
        if (! peerConnection) {
            console.error('peerConnection NOT exist!');
            return;
        }
        peerConnection.setRemoteDescription(sessionDescription)
            .then(function() {
                console.log('setRemoteDescription(answer) succsess in promise');
            }).catch(function(err) {
                console.error('setRemoteDescription(answer) ERROR: ', err);
        });
    }
     
     // P2P通信を切断する
     function hangUp(){
         if (peerConnection) {
             if(peerConnection.iceConnectionState !== 'closed'){
                 peerConnection.close();
                 peerConnection = null;
                 cleanupVideoElement(remoteVideo);
                 textForSendSdp.value = '';
                 return;
             }
         }
         console.log('peerConnection is closed.');
     
     }
    
     // ビデオエレメントを初期化する
     function cleanupVideoElement(element) {
         element.pause();
         element.srcObject = null;
     }
    
    // シグナリングサーバへ接続する
    // const wsUrl = 'ws://localhost:3001/';
    // const ws = new WebSocket(wsUrl);
    // ws.onopen = function(evt) {
    //     console.log('ws open()');
    // };
    // ws.onerror = function(err) {
    //     console.error('ws onerror() ERR:', err);
    // };
    // ws.onmessage = function(evt) {
    //     console.log('ws onmessage() data:', evt.data);
    //     const message = JSON.parse(evt.data);
    //     if (message.type === 'offer') {
    //         // offer 受信時
    //         console.log('Received offer ...');
    //         $textToReceiveSdp.value = message.sdp;
    //         const offer = new RTCSessionDescription(message);
    //         setOffer(offer);
    //     }
    //     else if (message.type === 'answer') {
    //         // answer 受信時
    //         console.log('Received answer ...');
    //         $textToReceiveSdp.value = message.sdp;
    //         const answer = new RTCSessionDescription(message);
    //         setAnswer(answer);
    //     }
    //     else if (message.type === 'candidate') {
    //         // ICE candidate 受信時
    //         console.log('Received ICE candidate ...');
    //         const candidate = new RTCIceCandidate(message.ice);
    //         console.log(candidate);
    //         addIceCandidate(candidate);
    //     }
    // };
    
    // ICE candaidate受信時にセットする
    function addIceCandidate(candidate) {
        if (peerConnection) {
            peerConnection.addIceCandidate(candidate);
        }
        else {
            console.error('PeerConnection not exist!');
            return;
        }
    }
    
    // ICE candidate生成時に送信する
    function sendIceCandidate(candidate) {
        console.log('---sending ICE candidate ---');
        const message = JSON.stringify({ type: 'candidate', ice: candidate });
        console.log('sending candidate=' + message);
        // ws.send(message);
        chan.push('signaling', {body: message, uuid:UUID})
    }

    /**
     * もともとの
     * 
     */
    var $messages = $("#messages")
    var $input = $("#message-input")
    var $user = $("#user")

    socket.onOpen( ev => console.log("OPEN", ev) )
    socket.onError( ev => console.log("ERROR", ev) )
    socket.onClose( ev => console.log("CLOSE", ev))

    // --- JOIN ---

    // chat:lobbyというトピックのチャネル
    var chan = socket.channel("chat:lobby", {})

    // チャネルに接続(join)
    chan.join()
      .receive("ignore", () => console.log("auth error"))
      .receive("ok", () => console.log("join ok"))
      .receive("timeout", () => console.log("Connection interruption"))
    chan.onError(e => console.log("something went wrong", e))
    chan.onClose(e => console.log("channel closed", e))

    // --- INPUT ---

    $input.off("keypress").on("keypress", e => {
      if (e.keyCode == 13) {
        // new_msgという種類のメッセージ(userとbodyのJSON)をチャネルに送信
        chan.push("new_msg", {user: $user.val(), body: $input.val()})
        $input.val("")
      }
    })

    // --- REPLY ---

    // チャネルからnew_msgという種類のメッセージを受信した時の処理
    chan.on("new_msg", msg => {
      $messages.append(this.messageTemplate(msg))
      scrollTo(0, document.body.scrollHeight)
    })

    chan.on("signaling", msg => {
      console.log('[webrtc]',msg);
      const message = JSON.parse(msg.body);
      console.log('[UUID]',msg.uuid,UUID);
      if(msg.uuid === UUID) return;
      console.log('[webrtc!!]',message);
      if (message.type === 'offer') {
        // offer 受信時
        console.log('Received offer ...');
        $textToReceiveSdp.value = message.sdp;
        const offer = new RTCSessionDescription(message);
        setOffer(offer);
      }
      else if (message.type === 'answer') {
          // answer 受信時
          console.log('Received answer ...');
          $textToReceiveSdp.value = message.sdp;
          const answer = new RTCSessionDescription(message);
          setAnswer(answer);
      }
      else if (message.type === 'candidate') {
          // ICE candidate 受信時
          console.log('Received ICE candidate ...');
          const candidate = new RTCIceCandidate(message.ice);
          console.log(candidate);
          addIceCandidate(candidate);
      }
    })
  }

  // --- UTILS ---

  static sanitize(html){ return $("<div/>").text(html).html() }

  static messageTemplate(msg){
    let user = this.sanitize(msg.user || "anonymous")
    let body = this.sanitize(msg.body)
    return(`<p><a href='#'>[${user}]</a>&nbsp; ${body}</p>`)
  }
}

export default Demo