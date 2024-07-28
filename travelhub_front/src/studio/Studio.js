import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './Studio.css';

function addImagePlane(scene, imagePath, position, width, objectName, rotation) {
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(imagePath, function(texture) {
      const aspectRatio = texture.image.width / texture.image.height;
      const planeWidth = width || 5; // 이미지의 너비를 설정합니다. 기본값은 5입니다.
      const planeHeight = planeWidth / aspectRatio;

      const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight); // 이미지의 크기를 설정합니다.
      const material = new THREE.MeshBasicMaterial({ map: texture }); // 이미지 텍스처를 재질로 사용합니다.
      const imagePlane = new THREE.Mesh(geometry, material);
      imagePlane.position.copy(position); // 전달된 위치로 이미지를 이동시킵니다.
      
      if (objectName) {
        imagePlane.name = objectName; // 개체의 이름을 설정합니다.
      }

      if (rotation) {
        imagePlane.rotation.set(rotation.x, rotation.y, rotation.z); // 전달된 각도로 이미지를 회전시킵니다.
      }
      scene.add(imagePlane);

      // 프레임 추가
      addFrame(scene, planeWidth, planeHeight, position, rotation);
  });
}

function addFrame(scene, width, height, position, rotation) {
  const frameThickness = 0.01; // 프레임 두께 설정
  const frameColor = 0x000000; // 프레임 색상 설정

  // 프레임을 구성하는 박스 생성
  const frameMaterial = new THREE.MeshBasicMaterial({ color: frameColor });
  const frameGeometries = [
    new THREE.BoxGeometry(width + frameThickness * 2, frameThickness, frameThickness), // 상단 프레임
    new THREE.BoxGeometry(width + frameThickness * 2, frameThickness, frameThickness), // 하단 프레임
    new THREE.BoxGeometry(frameThickness, height + frameThickness * 2, frameThickness), // 좌측 프레임
    new THREE.BoxGeometry(frameThickness, height + frameThickness * 2, frameThickness)  // 우측 프레임
  ];

  const frameMeshes = frameGeometries.map(geometry => new THREE.Mesh(geometry, frameMaterial));

  // 프레임 위치 설정
  frameMeshes[0].position.set(position.x, position.y + height / 2 + frameThickness / 2, position.z);
  frameMeshes[1].position.set(position.x, position.y - height / 2 - frameThickness / 2, position.z);
  frameMeshes[2].position.set(position.x - width / 2 - frameThickness / 2, position.y, position.z);
  frameMeshes[3].position.set(position.x + width / 2 + frameThickness / 2, position.y, position.z);

  // 프레임 회전 설정
  frameMeshes.forEach(mesh => {
    if (rotation) {
      mesh.rotation.set(rotation.x, rotation.y, rotation.z);
    }
    scene.add(mesh);
  });
}

function addBackgroundPlane(scene, imagePath, position, rotation) {
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(imagePath, function(texture) {
      texture.minFilter = THREE.LinearFilter; // 텍스처 필터링 설정
      texture.magFilter = THREE.LinearFilter; // 텍스처 필터링 설정
      const geometry = new THREE.PlaneGeometry(100, 100); // 정사각형 배경 평면
      const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide }); // 이미지 텍스처를 재질로 사용합니다.
      const backgroundPlane = new THREE.Mesh(geometry, material);
      backgroundPlane.position.copy(position); // 전달된 위치로 배경을 이동시킵니다.
      backgroundPlane.rotation.set(rotation.x, rotation.y, rotation.z); // 전달된 각도로 배경을 회전시킵니다.
      scene.add(backgroundPlane);
  });
}

const Studio = () => {
  const containerRef = useRef();
  const cameraRef = useRef();
  const [mapJson, SetMapJson] = useState(null);

  if (!mapJson) {
    fetch(process.env.PUBLIC_URL + '/mapinfo.json')
      .then(response => response.json())
      .then(mapJson => SetMapJson(mapJson))
      .catch(error => console.log('error'));
  }

  useEffect(() => {
    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.y = 2;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Load background images for each face
    if (mapJson && mapJson.backgrounds && mapJson.backgrounds.length >= 6) {
      const positions = [
        new THREE.Vector3(0, 0, -50), // Front
        new THREE.Vector3(0, 0, 50),  // Back
        new THREE.Vector3(-50, 0, 0), // Left
        new THREE.Vector3(50, 0, 0),  // Right
        new THREE.Vector3(0, 50, 0),  // Top
        new THREE.Vector3(0, -50, 0)  // Bottom
      ];
      const rotations = [
        new THREE.Vector3(0, 0, 0), // Front
        new THREE.Vector3(0, Math.PI, 0), // Back
        new THREE.Vector3(0, Math.PI / 2, 0), // Left
        new THREE.Vector3(0, -Math.PI / 2, 0), // Right
        new THREE.Vector3(-Math.PI / 2, 0, 0), // Top
        new THREE.Vector3(Math.PI / 2, 0, 0) // Bottom
      ];

      for (let i = 0; i < 6; i++) {
        addBackgroundPlane(scene, mapJson.backgrounds[i], positions[i], rotations[i]);
      }
    }

    if (mapJson) {
      for (const mapDataNum in mapJson.defualt) {
        const frame = mapJson.defualt[mapDataNum];
        addImagePlane(
          scene,
          frame.imagePath, // 각 프레임에 대한 이미지 경로를 사용합니다.
          new THREE.Vector3(frame.coordinates[0], frame.coordinates[1], frame.coordinates[2]),
          frame.width,
          frame.name,
          new THREE.Vector3(frame.rotation[0], frame.rotation[1], frame.rotation[2])
        );
      }
    }

    // Load marble texture for the floor
    const textureLoader = new THREE.TextureLoader();
    const marbleTexture = textureLoader.load('/images/marble.jpg');
    marbleTexture.wrapS = THREE.RepeatWrapping;
    marbleTexture.wrapT = THREE.RepeatWrapping;
    marbleTexture.repeat.set(4, 4); // 텍스처 반복 설정

    const floorGeometry = new THREE.PlaneGeometry(100, 100);
    const floorMaterial = new THREE.MeshPhongMaterial({ map: marbleTexture, side: THREE.DoubleSide });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.receiveShadow = true; // 그림자 받기 설정
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    scene.add(floor);

    // Add tile lines
    const gridHelper = new THREE.GridHelper(100, 4, 0x000000, 0x000000);
    gridHelper.rotation.x = Math.PI / 2;
    scene.add(gridHelper);

    const light = new THREE.PointLight(0xffffff, 1000, 100);
    light.position.set(0, 10, 0);
    light.castShadow = true;
    scene.add(light);

    // Handle window resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    };

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    let movingCircle = 0;
    let movingFlow = 0;
    const handleWheel = (event) => { // 마우스 휠 event control 마우스휠
      const delta = event.deltaY * 0.005;
      
      movingCircle += delta;
      movingFlow += delta;

      if (movingCircle >= 0 && movingCircle < 3) {
        camera.position.x = 0;
        camera.position.z = 0;
        camera.rotation.y = -movingCircle * 3.1416 / 2 / 3;
      } else if (movingCircle >= 3 && movingCircle < 6) {
        camera.position.x = 0;
        camera.position.z = (movingCircle - 3) * 2;
        camera.rotation.y = -1.5708;
      } else if (movingCircle >= 6 && movingCircle < 9) {
        camera.position.x = 0;
        camera.position.z = 6;
        camera.rotation.y = -1.5708 - (movingCircle - 6) * 1.5708 / 3;
      } else if (movingCircle >= 9 && movingCircle < 15) {
        camera.position.x = -(movingCircle - 9) * 2;
        camera.position.z = 6;
        camera.rotation.y = -3.1416;
      } else if (movingCircle >= 15 && movingCircle < 18) {
        camera.position.x = -12;
        camera.position.z = 6;
        camera.rotation.y = -3.1416 - (movingCircle - 3) * 1.5708 / 3;
      } else if (movingCircle >= 18 && movingCircle < 21) {
        camera.position.x = -12;
        camera.position.z = 6 - (movingCircle - 18) * 2;
        camera.rotation.y = 1.5708;
      } else if (movingCircle >= 21 && movingCircle < 27) {
        camera.position.x = -12;
        camera.position.z = 0;
        camera.rotation.y = 1.5708 - (movingCircle - 21) * 1.5708 / 3;
      } else if (movingCircle >= 27 && movingCircle < 28.5) {
        camera.position.x = -12 + (movingCircle - 27) * 2;
        camera.position.z = (movingCircle - 27) * 4;
        camera.rotation.y = -1.5708 + (movingCircle - 3) * 1.5708 / 3 * 2;
      } else if (movingCircle >= 28.5 && movingCircle < 30) {
        camera.position.x = -9 + (movingCircle - 28.5) * 2;
        camera.position.z = 6 - (movingCircle - 28.5) * 4;
        camera.rotation.y = -1.5708 + (movingCircle - 3) * 1.5708 / 3 * 2;
      } else if (movingCircle >= 30 && movingCircle < 36) {
        camera.position.x = -6;
        camera.position.z = 0;
        camera.rotation.y = -(movingCircle - 21) * 1.5708 / 3;
      } else if (movingCircle >= 36 && movingCircle < 37.5) {
        camera.position.x = -6 + (movingCircle - 36) * 2;
        camera.position.z = (movingCircle - 36) * 4;
        camera.rotation.y = -1.5708 + (movingCircle) * 1.5708 / 3 * 2;
      } else if (movingCircle >= 37.5 && movingCircle < 39) {
        camera.position.x = -3 + (movingCircle - 37.5) * 2;
        camera.position.z = 6 - (movingCircle - 37.5) * 4;
        camera.rotation.y = -1.5708 + (movingCircle) * 1.5708 / 3 * 2;
      } else if (movingCircle >= 39 && movingCircle < 42) {
        camera.position.x = 0;
        camera.position.z = 0;
        camera.rotation.y = -1.5708 - (movingCircle - 21) * 1.5708 / 3;
      } else if (movingCircle < 0) {
        camera.position.x = 0;
        camera.position.z = 0;
        camera.rotation.y = 0;
        movingCircle = 0;
        if (movingFlow > 40) {
          movingFlow = movingFlow - movingFlow % 42 + 42 * (Math.round(Number(movingFlow % 42)) !== 0);
        }
      } else if (movingCircle >= 42) {
        camera.position.x = 0;
        camera.position.z = 0;
        camera.rotation.y = 0;
        movingCircle = 0;
      }

      console.log(camera.position.x);
      console.log(camera.position.z);
      console.log(movingCircle);
      console.log(movingFlow);
      renderer.render(scene, camera);
    };

    // Listen for wheel events for zooming
    containerRef.current.addEventListener('wheel', handleWheel);

    // Animation 효과 
    const animate = () => {
      requestAnimationFrame(animate);

      // const frame1 = scene.getObjectByName('frame1');
      // if (frame1 !== undefined) {
      //   frame1.rotation.x += 0.01;
      //   frame1.rotation.y += 0.01;
      // }

      renderer.render(scene, cameraRef.current);
    };

    animate();
    renderer.render(scene, cameraRef.current);
    const cleanup = () => {
      window.removeEventListener('resize', handleResize);

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeEventListener('wheel', handleWheel);
        containerRef.current.removeChild(renderer.domElement);
        containerRef.current.removeEventListener('wheel', handleWheel);
      }
    };

    return () => cleanup();
  }, [mapJson]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <div className='sidebar-studio'></div>
    </div>
  );
};

export default Studio;