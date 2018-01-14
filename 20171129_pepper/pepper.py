# -*- coding: utf-8 -*-

from naoqi import ALProxy

tts = ALProxy("ALTextToSpeech", "192.168.8.92", 9559)
tts.say("ちゃんとく先生！")