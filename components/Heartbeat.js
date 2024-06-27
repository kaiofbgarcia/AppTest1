import * as faceapi from 'face-api.js';
import { useRef, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { Canvas } from 'react-native-canvas';

class Heartbeat {
  constructor(videoRef, canvasRef, cascadeFile, fps, minNeighbors, minSize) {
    this.videoRef = videoRef;
    this.canvasRef = canvasRef;
    this.cascadeFile = cascadeFile;
    this.fps = fps;
    this.minNeighbors = minNeighbors;
    this.minSize = minSize;
  }

  async init() {
    if (this.videoRef.current) {
      await this.videoRef.current.playAsync();
      this.setupFaceDetection();
    }
  }

  setupFaceDetection() {
    this.loadModels();
  }

  async loadModels() {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    this.startDetection();
  }

  startDetection() {
    setInterval(async () => {
      if (this.videoRef.current && this.canvasRef.current) {
        const detections = await faceapi.detectAllFaces(this.videoRef.current, new faceapi.TinyFaceDetectorOptions());
        const ctx = this.canvasRef.current.getContext('2d');
        faceapi.matchDimensions(this.canvasRef.current, this.videoRef.current, true);
        const resizedDetections = faceapi.resizeResults(detections, this.videoRef.current);
        faceapi.draw.drawDetections(this.canvasRef.current, resizedDetections);
      }
    }, 1000 / this.fps);
  }
}

export default Heartbeat;
