import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './Studio.css';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'; // OBJLoader 추가
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'; // MTLLoader 추가
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

function addImagePlane(scene, imagePath, position, width, objectName, rotation, font) {
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(imagePath, function(texture) {
    const aspectRatio = texture.image.width / texture.image.height;
    const planeWidth = (aspectRatio >= 1? width *1.75 : width ) ; // 이미지의 너비를 설정합니다. 기본값은 5입니다.
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

    // 각 이미지에 대한 조명 추가
    const pointLight = new THREE.PointLight(0xffffff, 100, 5); // 빨간색 점광원 생성
    pointLight.position.set(position.x, position.y + (planeHeight / 2), position.z); // 조명을 이미지 중앙 위로 설정
    pointLight.castShadow = true; // 그림자 생성
    scene.add(pointLight); // 조명을 scene에 추가

    const textGeometry = new TextGeometry('요정도?\nasdasdasdsa\n이게 dS', {
      font: font,
      size: 0.2,
      height: 0,
      curveSegments: 12,
      bevelEnabled: false,
      // bevelThickness: 0.0003,
      // bevelSize: 0.002,
      // bevelOffset: 0,
      // bevelSegments: 1
    });

    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    
    // 텍스트 위치 조정  (좌우 높이 거리)
    textMesh.position.set(position.x, position.y + (planeHeight / 2), position.z);
    textMesh.name = objectName; // 개체의 이름을 설정합니다.
    if (rotation) {
      textMesh.rotation.set(rotation.x, rotation.y, rotation.z); // 전달된 각도로 이미지를 회전시킵니다.
    }
    scene.add(textMesh);

    // 프레임 추가
    addFrame(scene, planeWidth, planeHeight, position, rotation);
  });
}

function addFrame(scene, width, height, position, rotation) {
  const frameThickness = 0.05; // 프레임 두께 설정
  const frameColor = 0x7F4F2F; // 프레임 색상 설정

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
  frameMeshes[0].position.set(position.x, position.y + height / 2 + frameThickness / 2, position.z); // 상단 프레임
  frameMeshes[1].position.set(position.x, position.y - height / 2 - frameThickness / 2, position.z); // 하단 프레임
  if(rotation.y === -1.5708 || rotation.y === 1.5708){
    frameMeshes[2].position.set(position.x, position.y, position.z - width / 2 - frameThickness / 2); // 좌측 프레임
    frameMeshes[3].position.set(position.x, position.y, position.z + width / 2 + frameThickness / 2); // 우측 프레임
  }else{
    frameMeshes[2].position.set(position.x - width / 2 - frameThickness / 2, position.y, position.z); // 좌측 프레임
    frameMeshes[3].position.set(position.x + width / 2 + frameThickness / 2, position.y, position.z); // 우측 프레임
  }

  // 프레임 회전 설정
  frameMeshes.forEach(mesh => {
    if (rotation) {
      mesh.rotation.set(rotation.x, rotation.y, rotation.z);
    }
    scene.add(mesh); // 프레임을 scene에 추가
  });
}

function addBackgroundPlane(scene, imagePath, position, rotation) {
  const textureLoader = new THREE.TextureLoader();
  const marbleTexture = textureLoader.load(imagePath);
  marbleTexture.wrapS = THREE.RepeatWrapping;
  marbleTexture.wrapT = THREE.RepeatWrapping;
  marbleTexture.repeat.set(20, 20); // 텍스처 반복 설정

  const floorGeometry = new THREE.PlaneGeometry(100, 100);
  const floorMaterial = new THREE.MeshPhongMaterial({ map: marbleTexture, side: THREE.DoubleSide });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.position.copy(position); // 전달된 위치로 배경을 이동시킵니다.
  floor.rotation.set(rotation.x, rotation.y, rotation.z); // 전달된 각도로 배경을 회전시킵니다.
  scene.add(floor);
}

const Studio = () => {
  const containerRef = useRef();
  const cameraRef = useRef();
  const [mapJson, SetMapJson] = useState(null);
  const [font, setFont] = useState();

  if (!mapJson) {
    fetch(process.env.PUBLIC_URL + '/mapinfo.json')
      .then(response => response.json())
      .then(mapJson => SetMapJson(mapJson))
      .catch(error => console.log('error'));
  }
  const [isCameraMoved, setIsCameraMoved] = useState(false); // 카메라 이동 상태 관리

  const loader = new FontLoader();
  loader.load('/noto_sans_kr.typeface.json', setFont);

  const handleCameraPositionToggle = () => {
    setIsCameraMoved(prev => !prev); // 상태 토글
  };

  // function addDecoration(scene, position, scale) {
  //   const geometry = new THREE.SphereGeometry(1, 32, 32); // 구 형태의 장식
  //   const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // 빨간색 재질
  //   const decoration = new THREE.Mesh(geometry, material);
  //   decoration.position.copy(position);
  //   decoration.scale.set(scale.x, scale.y, scale.z); // 크기 조정
  //   scene.add(decoration);
  // }
  function addExhibitionFrame(scene, position, scale) {
    const geometry = new THREE.BoxGeometry(scale.x, scale.y, scale.z); // 큐브 형태의 장식
    const material = new THREE.MeshBasicMaterial({ color: 0x8B4513 }); // 갈색 재질 (나무 느낌)
    const frame = new THREE.Mesh(geometry, material);
    frame.position.copy(position);
    scene.add(frame);
  }

  useEffect(() => {
    // Scene
    const scene = new THREE.Scene();

    // 조명 추가 시작
    const directionalLight = new THREE.DirectionalLight(0x000000, 2); // 빨간색 방향성 조명 생성
    directionalLight.position.set(0, 10, 10).normalize(); // 조명 위치 설정
    directionalLight.castShadow = true; // 그림자 생성
    scene.add(directionalLight); // 조명을 scene에 추가

    const additionalDirectionalLight = new THREE.DirectionalLight(0xff0000, 1); // 빨간색 방향성 조명
    additionalDirectionalLight.position.set(0, 0, -10).normalize(); // 조명 위치 설정
    scene.add(additionalDirectionalLight); // 추가 조명을 scene에 추가
    
     const pointLight = new THREE.PointLight(0xff0000, 3, 100); // 초록색 점광원 생성
     pointLight.position.set(0, 10, 0); // 점광원 위치 설정
     pointLight.castShadow = true; // 그림자 생성
     scene.add(pointLight); // 점광원을 scene에 추가
    
     function addColumn(scene, position, width, height, depth) {
        const geometry = new THREE.BoxGeometry(width, height, depth);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // 갈색
        const column = new THREE.Mesh(geometry, material);
        column.position.copy(position);
        // scene.add(column);
    }
    // addColumn(scene, new THREE.Vector3(0, 10, -40), 10, 5, 10); // 기둥의 위치와 크기 설정
    // addColumn(scene, new THREE.Vector3(10, 10, -40), 10, 5, 10); // 기둥의 위치와 크기 설정

    const columns = [
      { position: new THREE.Vector3(0, 1, -5), width: 2, height: 40, depth: 1 },
      { position: new THREE.Vector3(20, 1, -5), width: 2, height: 40, depth: 1 },
      { position: new THREE.Vector3(-20, 1, -5), width: 2, height: 40, depth: 1 },
      { position: new THREE.Vector3(40, 1, -5), width: 2, height: 40, depth: 1 },
      { position: new THREE.Vector3(-40, 1, -5), width: 2, height: 40, depth: 1 }
    ];
    
    columns.forEach(column => {
      addColumn(scene, column.position, column.width, column.height, column.depth);
    });
    
    // Chair_and_Table 모델 추가 (크기 1, 위치 (0, 0, 0), 텍스처 경로)
    // addModel(scene, '/OBJ_file/Chair_and_Table.obj', '/OBJ_file/Chair_and_Table.mtl', new THREE.Vector3(0, 0, 10), new THREE.Vector3(30, 30, 30), '/textures/Chair and table_Normal.jpg'); // 텍스처 적용

    // trees9 모델 추가 (크기 100배 줄임, 위치 (5, 0, 0), 텍스처 경로)
    // addModel(scene, '/OBJ_file/trees9.obj', '/OBJ_file/trees9.mtl', new THREE.Vector3(5, 0, 0), new THREE.Vector3(0.05, 0.05, 0.05), '/textures/Oak_Leav.png'); // 텍스처 적용
    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.y = 2;
    cameraRef.current = camera;
    if (isCameraMoved) {
      
      camera.position.set(5, 6.5, 6.5); // 이동된 카메라 위치
      camera.quaternion.setFromEuler(new THREE.Euler(-0.3, Math.PI / 2 / 90 * 45, 0.3))
    } else {

    }

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // 배경
    if (mapJson && mapJson.backgrounds && mapJson.backgrounds.length >= 6) {
      const positions = [
        new THREE.Vector3(0, 0, -10), // Front
        new THREE.Vector3(0, 0, 10),  // Back
        new THREE.Vector3(-20, 0, 0), // Left
        new THREE.Vector3(5, 0, 0),  // Right
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
        // const framePosition = new THREE.Vector3(positions[i].x, positions[i].y + 1, positions[i].z); // 배경 위쪽에 위치
        // addExhibitionFrame(scene, framePosition, new THREE.Vector3(2, 1, 0.1)); // 프레임 크기 설정
      }
    }

    // 바닥
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
    floor.position.y = -2;
    floor.position.x = 0;
    scene.add(floor);

    if (mapJson) {
      for (const mapDataNum in mapJson.defualt) {
        const frame = mapJson.defualt[mapDataNum];
        addImagePlane(
          scene,
          frame.imagePath, // 각 프레임에 대한 이미지 경로를 사용합니다.
          new THREE.Vector3(frame.coordinates[0], frame.coordinates[1], frame.coordinates[2]),
          frame.width,
          frame.name,
          new THREE.Vector3(frame.rotation[0], frame.rotation[1], frame.rotation[2]),
          font
        );
      }
    }

    // Add tile lines
    // const gridHelper = new THREE.GridHelper(100, 4, 0x000000, 0x000000);
    // gridHelper.rotation.x = Math.PI / 2;
    // scene.add(gridHelper);

    const light = new THREE.PointLight(0xffffff, 500, 100);
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
    // window.addEventListener('resize', handleResize);

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

      // console.log(camera.position.x);
      // console.log(camera.position.z);
      // console.log(movingCircle);
      // console.log(movingFlow);
      renderer.render(scene, camera);
    };

    function addModel(scene, modelPath, mtlPath, position, scale, texturePath) {
      const mtlLoader = new MTLLoader();
      mtlLoader.load(mtlPath, (materials) => {
        materials.preload(); // 재질 미리 로드
        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials); // 재질 설정
        objLoader.load(modelPath, (object) => {
          object.position.copy(position); // 위치 설정
          object.scale.set(scale.x, scale.y, scale.z); // 모델 크기 조정
    
          // 텍스처 적용
          if (texturePath) {
            const textureLoader = new THREE.TextureLoader();
            textureLoader.load(texturePath, (texture) => {
              object.traverse((child) => {
                if (child.isMesh) {
                  child.material.map = texture; // 텍스처를 재질에 적용
                  child.material.needsUpdate = true; // 재질 업데이트
                }
              }, undefined, (error) => {
                console.error('텍스처 로드 중 오류 발생:', error);
              });
            }, undefined, (error) => {
              console.error('텍스처 로드 중 오류 발생:', error);
            });
          }
    
          scene.add(object); // 장면에 추가
          console.log('모델이 성공적으로 로드되었습니다:', object);
        }, undefined, (error) => {
          console.error('모델 로드 중 오류 발생:', error);
        });
      }, undefined, (error) => {
        console.error('MTL 파일 로드 중 오류 발생:', error);
      });
    }

    // addModel(scene, './OBJ_file/Chair_and_Table.obj', new THREE.Vector3(0, 0, 0)); // 모델 추가
    // Listen for wheel events for zooming
    containerRef.current.addEventListener('wheel', handleWheel);

    // Animation 효과 
    const animate = () => {
      requestAnimationFrame(animate);

      // const frame1 = scene.getObjectByName('frame2');
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
  }, [mapJson, isCameraMoved]); // isCameraMoved를 의존성 배열에 추가

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'fixed'}}>
      <button style={{position:'fixed'}}onClick={handleCameraPositionToggle}>카메라 위치 토글</button> {/* 버튼 추가 */}
      <div className='sidebar-studio'></div>
    </div>
  );
};

export default Studio;