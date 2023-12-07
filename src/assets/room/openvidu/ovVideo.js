import { useRef, useEffect } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';

export default function OpenViduVideoComponent({ streamManager }) {
  const videoRef = useRef();

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

  const detect = async (net) => {
    if (
      typeof videoRef.current !== 'undefined' &&
      videoRef.current !== null &&
      videoRef.current.readyState === 4
    ) {
      const video = videoRef.current;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      video.width = videoWidth;
      video.height = videoHeight;

      const pose = await net.estimatePoses(video);
      // console.log(pose); pose 콘솔 확인
    }
  };

  useEffect(() => {
    const initializeTensorflow = async () => {
      await tf.ready();
      runBlazePose();
    };

    initializeTensorflow();
  }, []);

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return <video autoPlay={true} ref={videoRef} />;
}
