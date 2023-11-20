import { useRef, useEffect } from 'react';
import '@tensorflow/tfjs-backend-webgl';
import * as poseDetection from '@tensorflow-models/pose-detection';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs-core';

const GameRoom = () => {
  const webcamRef = useRef(null);
  // const canvasRef = useRef(null);

  const runBlazePose = async () => {
    const detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.BlazePose,
      {
        runtime: 'tfjs',
      },
    );

    setInterval(() => {
      detect(detector);
    }, 20);
  };

  useEffect(() => {
    const initializeTensorflow = async () => {
      await tf.ready();
      runBlazePose();
    };

    initializeTensorflow();
  }, []);

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      const pose = await net.estimatePoses(video);
      console.log(pose);
      // drawCanvas(pose, videoWidth, videoHeight, canvasRef);
    }
  };

  window.requestAnimationFrame(runBlazePose);
  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        style={{
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 9,
          width: 480,
          height: 300,
        }}
      />
    </div>
  );
};

export default GameRoom;
