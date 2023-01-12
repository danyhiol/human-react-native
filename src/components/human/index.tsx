import * as tf from '@tensorflow/tfjs'; // must be imported before tfjs-react-native

import {
    Human,
    type Config,
} from '@vladmandic/human/dist/human.esm-nobundle.js';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

// @ts-ignore
export const humanConfig: Config = {
    cacheSensitivity: 0,
    modelBasePath: 'https://cdn.jsdelivr.net/npm/@vladmandic/human/models',
    filter: { enabled: true, equalization: true, brightness: 0.8 }, // lets run with histogram equalizer
    debug: true,
    face: {
        enabled: true,
        detector: { rotation: true, return: true, mask: false }, // return tensor is used to get detected face image
        description: { enabled: true }, // default model for face descriptor extraction is faceres
        // mobilefacenet: { enabled: true, modelPath: 'https://vladmandic.github.io/human-models/models/mobilefacenet.json' }, // alternative model
        // insightface: { enabled: true, modelPath: 'https://vladmandic.github.io/insightface/models/insightface-mobilenet-swish.json' }, // alternative model
        iris: { enabled: true }, // needed to determine gaze direction
        emotion: { enabled: false /* minConfidence: 0.6  */ }, // not needed
        antispoof: { enabled: true }, // enable optional antispoof module
        liveness: { enabled: true }, // enable optional liveness module
    },
    body: { enabled: false },
    hand: { enabled: false },
    object: { enabled: false },
    gesture: { enabled: true }, // parses face and iris gestures
};

// const matchOptions = { order: 2, multiplier: 1000, min: 0.0, max: 1.0 }; // for embedding model
const matchOptions = { order: 2, multiplier: 25, min: 0.2, max: 0.8 }; // for faceres model

export const options = {
    minConfidence: 0.6, // overal face confidence for box, face, gender, real, live
    minSize: 224, // min input to face descriptor model before degradation
    maxTime: 30000, // max time before giving up
    blinkMin: 10, // minimum duration of a valid blink
    blinkMax: 800, // maximum duration of a valid blink
    threshold: 0.5, // minimum similarity
    distanceMin: 0.4, // closest that face is allowed to be to the cammera in cm
    distanceMax: 1.0, // farthest that face is allowed to be to the cammera in cm
    mask: humanConfig.face?.detector?.mask,
    rotation: humanConfig.face?.detector?.rotation,
    ...matchOptions,
};

const human = new Human(humanConfig);

export const HumanTest = () => {
    const init = async () => {
        console.log(
            'human version:',
            human.version,
            '| tfjs version:',
            human.tf.version['tfjs-core']
        );
        console.log(
            'options:',
            JSON.stringify(options)
                .replace(/{|}|"|\[|\]/g, '')
                .replace(/,/g, ' ')
        );
        console.log('initializing webcam...');
        // await webCam(); // start webcam
        console.log('loading human models...');
        await human.load(); // preload all models
        console.log('initializing human...');
        console.log(
            'face embedding model:',
            humanConfig.face?.description?.enabled ? 'faceres' : '',
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            humanConfig?.face?.['mobilefacenet']?.enabled ? 'mobilefacenet' : '',
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            humanConfig?.face['insightface']?.enabled ? 'insightface' : ''
        );
        console.log('loading face database...');
        await human.warmup(); // warmup function to initialize backend for future faster detection
        // await main();
    };

    useEffect(() => {
        init();

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return () => { };
    }, []);

    return <View><Text>Human</Text></View>
}