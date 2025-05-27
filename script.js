//lights
AFRAME.registerComponent('switch-light', {
    init: function () {
      this.el.sceneEl.addEventListener('loaded', this.onSceneLoaded.bind(this));
    },

    onSceneLoaded: function () {
      this.el.lightsOn = false;
      this.updateLights(false);
      this.el.addEventListener('click', this.switchLight.bind(this));
    },

    switchLight: function () {
      var lightsOn = !this.el.lightsOn;
      this.updateLights(lightsOn);

      if (lightsOn) {
        this.playClickSound();
      }
    },

    updateLights: function (lightsOn) {
      var light1 = document.getElementById('pointLight1');
      var ambientLight = document.getElementById('ambientLight');
      var light2 = document.getElementById('pointLight2');
      var light3 = document.getElementById('pointLight3');
      var light4 = document.getElementById('pointLight4');
      var light5 = document.getElementById('pointLight5');
      var light6 = document.getElementById('pointLight6');
      var light7 = document.getElementById('pointLight7');
      var light8 = document.getElementById('pointLight8');

      this.setLightAttributes(light1, lightsOn);
      this.setLightAttributes(ambientLight, lightsOn);
      this.setLightAttributes(light2, lightsOn);
      this.setLightAttributes(light3, lightsOn);
      this.setLightAttributes(light4, lightsOn);
      this.setLightAttributes(light5, lightsOn);
      this.setLightAttributes(light6, lightsOn);
      this.setLightAttributes(light7, lightsOn);
      this.setLightAttributes(light8, lightsOn);

      var switchText = document.getElementById('SwitchText');
      switchText.setAttribute('text', 'value', lightsOn ? 'Light switch (ON)' : 'Light switch (OFF)');
      this.el.lightsOn = lightsOn;
    },

    setLightAttributes: function (light, lightsOn) {
      if (lightsOn) {
        light.setAttribute('color', '#DDD');
        light.setAttribute('groundColor', '#DDD');
      } else {
        light.setAttribute('color', '#222');
        light.setAttribute('groundColor', '#222');
      }
    },
    playClickSound: function () {
      var clickSound = document.getElementById('light_switch');
      if (clickSound) {
        clickSound.play();
      }
    }
  });

  //Entrance door
  AFRAME.registerComponent('door', {
    init: function () {
      this.el.addEventListener('click', this.toggleDoors.bind(this));
      // Set the initial rotation for door1 based on the isOpen attribute
      if (this.el.id === 'double-door-1') {
        this.updateRotation();
      }
    },
    toggleDoors: function () {
      var door1 = document.getElementById('double-door-1');
      var door2 = document.getElementById('double-door-2');

      var isOpen1 = door1.getAttribute('door').isOpen;
      var isOpen2 = door2.getAttribute('door').isOpen;

      door1.setAttribute('door', 'isOpen', !isOpen1);
      door2.setAttribute('door', 'isOpen', !isOpen2);

      var animationDuration = 400;
      var easing = 'easeInOutQuad';

      door1.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpen1 ? '0.628 5.684 13.593' : '-0.085 5.684 12.942'
      });
      door1.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpen1 ? '0 0 0' : '0 -90 0'
      });

      door2.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpen2 ? '-2.345 5.684 13.639' : '-1.604 5.684 12.942'
      });
      door2.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpen2 ? '0 0 0' : '0 90 0'
      });

      var audioId = isOpen1 || isOpen2 ? 'closeDoorAudio' : 'openDoorAudio';
      var audio = document.getElementById(audioId);

      if (audio && audio.readyState >= 2) {
        audio.play();
      } else {
        audio.addEventListener('loadeddata', function () {
          audio.play();
        });
      }
    },
    updateRotation: function () {
      // Set the initial rotation for door1 based on the isOpen attribute
      var isOpen = this.el.getAttribute('door').isOpen;
      var initialRotation = isOpen ? '0 -90 0' : '0 0 0';
      this.el.setAttribute('rotation', initialRotation);
    }
  });

  //back Doors
  AFRAME.registerComponent('backdoor', {
    init: function () {
      this.el.addEventListener('click', this.toggleDoors.bind(this));
      // Set the initial rotation for backDoor2 based on the isOpen attribute
      if (this.el.id === 'back-double-door-2') {
        this.updateRotation();
      }
    },
    toggleDoors: function () {
      var backDoor1 = document.getElementById('back-double-door-1');
      var backDoor2 = document.getElementById('back-double-door-2');

      var isOpenBack1 = backDoor1.getAttribute('backdoor').isOpen;
      var isOpenBack2 = backDoor2.getAttribute('backdoor').isOpen;

      backDoor1.setAttribute('backdoor', 'isOpen', !isOpenBack1);
      backDoor2.setAttribute('backdoor', 'isOpen', !isOpenBack2);

      var animationDuration = 400;
      var easing = 'easeInOutQuad';

      backDoor1.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpenBack1 ? '-9.303 0.5553 18.940' : '-8.568 0.630 18.156'
      });
      backDoor1.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpenBack1 ? '0 0 0' : '0 90 0'
      });

      backDoor2.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpenBack2 ? '-6.254 0.555 18.956' : '-6.988 0.630 18.156'
      });
      backDoor2.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpenBack2 ? '0 0 0' : '0 -90 0'
      });

      var audioId = isOpenBack1 || isOpenBack2 ? 'closeDoorAudio' : 'openDoorAudio';
      var audio = document.getElementById(audioId);

      if (audio && audio.readyState >= 2) {
        audio.play();
      } else {
        audio.addEventListener('loadeddata', function () {
          audio.play();
        });
      }
    },
    updateRotation: function () {
      // Set the initial rotation for backDoor2 based on the isOpen attribute
      var isOpen = this.el.getAttribute('backdoor').isOpen;
      var initialRotation = isOpen ? '0 -90 0' : '0 0 0';
      this.el.setAttribute('rotation', initialRotation);
    }
  });

  //Bathroom door
  AFRAME.registerComponent('bathroomdoor', {
    schema: { isOpenB: { default: false } },
    init: function () {
      this.el.addEventListener('click', this.toggleDoor.bind(this));
    },
    toggleDoor: function () {
      var bathroomDoor = document.getElementById('bathroom-door-1');
      var isOpenB = bathroomDoor.getAttribute('bathroomdoor').isOpenB;

      bathroomDoor.setAttribute('bathroomdoor', 'isOpenB', !isOpenB);

      var animationDuration = 600;
      var easing = 'easeInOutQuad';

      bathroomDoor.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpenB ? '0 180 0' : '0 270 0'
      });
      bathroomDoor.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpenB ? '-1.48867 0.54 8.63875' : '5.7854 5.684 21.38106'
      });

      var audioId = isOpenB ? 'closeDoorAudio' : 'openDoorAudio';
      var audio = document.getElementById(audioId);

      if (audio && audio.readyState >= 2) {
        audio.play();
      } else {
        audio.addEventListener('loadeddata', function () {
          audio.play();
        });
      }
    }
  });

  //pool door
  AFRAME.registerComponent('pooldoor', {
    schema: { isOpenP: { default: false } },
    init: function () {
      this.el.addEventListener('click', this.toggleDoor.bind(this));
    },
    toggleDoor: function () {
      var poolDoor = document.getElementById('pool-door');
      var isOpenP = poolDoor.getAttribute('pooldoor').isOpenP;

      poolDoor.setAttribute('pooldoor', 'isOpenP', !isOpenP);

      var animationDuration = 600;
      var easing = 'easeInOutQuad';

      poolDoor.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpenP ? '0 180 0' : '0 90 0'
      });
      poolDoor.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpenP ? '-9.62711 1.83002 8.82728' : '-9.627 1.83002 8.67283'
      });

      var audioId = isOpenP ? 'closeDoorAudio' : 'openDoorAudio';
      var audio = document.getElementById(audioId);

      if (audio && audio.readyState >= 2) {
        audio.play();
      } else {
        audio.addEventListener('loadeddata', function () {
          audio.play();
        });
      }
    }
  });

  AFRAME.registerComponent('fridgedoor', {
    init: function () {
      this.el.addEventListener('click', this.toggleDoors.bind(this));
      // Set the initial rotation for door1 based on the isOpen attribute
      if (this.el.id === 'double-door-1') {
        this.updateRotation();
      }
    },
    toggleDoors: function () {
      var fridgedoor1 = document.getElementById('fridge-door-1');
      var fridgedoor2 = document.getElementById('fridge-door-2');
  
      var isOpen1 = fridgedoor1.getAttribute('fridgedoor').isOpen;
      var isOpen2 = fridgedoor2.getAttribute('fridgedoor').isOpen;
  
      fridgedoor1.setAttribute('fridgedoor', 'isOpen', !isOpen1);
      fridgedoor2.setAttribute('fridgedoor', 'isOpen', !isOpen2);
  
      var animationDuration = 100;
      var easing = 'easeInOutQuad';
  
      fridgedoor1.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpen1 ? '-14.924 6.802 15.503' : ' -14.603 6.792 14.398'
      });
      fridgedoor1.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpen1 ? '0 0 0' : '0 100 0'
      });
  
      fridgedoor2.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpen2 ? '-14.922 6.792 14.750' : ' -14.612 6.792 15.960'
      });
      fridgedoor2.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpen2 ? '0 0 0' : '0 -100 0'
      });
  
      var audioId = isOpen1 || isOpen2 ? 'openFridge' : 'closeFridge';
      var audio = document.getElementById(audioId);
  
      if (audio && audio.readyState >= 2) {
        audio.play();
      } else {
        audio.addEventListener('loadeddata', function () { audio.play(); });
      }
  
      var fridgeRunningSound = document.getElementById('Fridge');
  
      if (isOpen1 || isOpen2) {
        fridgeRunningSound.pause();
        fridgeRunningSound.loop = true;
      } else {
        fridgeRunningSound.play();
        fridgeRunningSound.currentTime = 0;
        fridgeRunningSound.loop = false;
      }
    }
  });
  

  //Storage doors
  AFRAME.registerComponent('storagedoor', {
    schema: { isOpenS: { default: false } },
    init: function () {
      this.el.addEventListener('click', this.toggleDoors.bind(this));
    },
    toggleDoors: function () {
      var storageDoor1 = document.getElementById('storage-door-1');
      var storageDoor2 = document.getElementById('storage-door-2');
      var handle1 = document.getElementById('handle-storage-1');
      var handle2 = document.getElementById('handle-storage-2');

      var isOpenS1 = storageDoor1.getAttribute('storagedoor').isOpenS;
      var isOpenS2 = storageDoor2.getAttribute('storagedoor').isOpenS;

      storageDoor1.setAttribute('storagedoor', 'isOpenS', !isOpenS1);
      storageDoor2.setAttribute('storagedoor', 'isOpenS', !isOpenS2);

      var animationDuration = 0;
      var easing = 'easeInOutQuad';

      storageDoor1.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpenS1 ? '0 90 0' : '0 0 0'
      });
      storageDoor1.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpenS1 ? '-0.7869 2.32204 -0.47444' : '-1.30988 2.32204 0.06979'
      });

      handle1.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpenS1 ? '0 90 0' : '0 0 0'
      });
      handle1.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpenS1 ? '-0.43765 2.32204 -0.44493' : '-1.33575 2.32204 0.5045'
      });

      storageDoor2.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpenS2 ? '0 90 0' : '0 0 0'
      });
      storageDoor2.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpenS2 ? '0.41011 2.32204 -0.47444' : '1.00315 2.32204 0.12903'
      });

      handle2.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpenS2 ? '0 90 0' : '0 0 0'
      });
      handle2.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpenS2 ? '0.02765 2.32204 -0.44493' : '1.04491 2.322 0.52845'
      });

      var audioId = isOpenS1 || isOpenS2 ? 'storageOpen' : 'storageClose';
      var audio = document.getElementById(audioId);

      if (audio && audio.readyState >= 2) {
        audio.play();
      } else {
        audio.addEventListener('loadeddata', function () {
          audio.play();
        });
      }
    }
  });

  // Small Storage doors
  AFRAME.registerComponent('smallstoragedoor', {
    schema: { isOpenSS: { default: false } },
    init: function () {
      this.el.addEventListener('click', this.toggleDoors.bind(this));
    },
    toggleDoors: function () {
      var smallStorageDoor1 = document.getElementById('small-storage-door-1');
      var smallStorageDoor2 = document.getElementById('small-storage-door-2');
      var handle1 = document.getElementById('handle-small-storage-1');
      var handle2 = document.getElementById('handle-small-storage-2');

      var isOpenSS1 = smallStorageDoor1.getAttribute('smallstoragedoor').isOpenSS;
      var isOpenSS2 = smallStorageDoor2.getAttribute('smallstoragedoor').isOpenSS;

      smallStorageDoor1.setAttribute('smallstoragedoor', 'isOpenSS', !isOpenSS1);
      smallStorageDoor2.setAttribute('smallstoragedoor', 'isOpenSS', !isOpenSS2);

      var animationDuration = 0;
      var easing = 'easeInOutQuad';

      smallStorageDoor1.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpenSS1 ? '0 90 0' : '0 0 0'
      });
      smallStorageDoor1.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpenSS1 ? '-0.49617 3.43639 -1.36877' : '-0.76035 3.43263 -1.1184'
      });

      handle1.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpenSS1 ? '0 0 0' : '0 90 0'
      });
      handle1.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpenSS1 ? '-0.08669 3.50788 -1.29269' : '-0.77454 3.50788 -0.91007'
      });

      smallStorageDoor2.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpenSS2 ? '0 90 0' : '0 0 0'
      });
      smallStorageDoor2.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpenSS2 ? '0.03015 3.43639 -1.36877' : '0.28416 3.43639 -1.10795'
      });

      handle2.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpenSS2 ? '0 0 0' : '0 90 0'
      });
      handle2.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpenSS2 ? '-0.38846 3.50788 -1.29269' : '0.29548 3.50788 -0.96703'
      });

      var audioId = isOpenSS1 || isOpenSS2 ? 'drawerOpen' : 'drawerClose';
      var audio = document.getElementById(audioId);

      if (audio && audio.readyState >= 2) {
        audio.play();
      } else {
        audio.addEventListener('loadeddata', function () {
          audio.play();
        });
      }
    }
  });

  //Box 1
  AFRAME.registerComponent('boxesdoor', {
    init: function () {
      this.el.addEventListener('click', this.toggleDoor.bind(this));
    },
    toggleDoor: function () {
      var boxesDoor = document.getElementById('boxes-door-1');
      var handle = document.getElementById('handle-boxes-1');
      var isOpenb1 = boxesDoor.getAttribute('boxesdoor').isOpenb1;

      boxesDoor.setAttribute('boxesdoor', 'isOpenb1', !isOpenb1);

      var animationDuration = 0;
      var easing = 'easeInOutQuad';

      boxesDoor.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpenb1 ? '0 90 0' : '0 170 0'
      });
      boxesDoor.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpenb1 ? '1.9548 1.10462 -0.91695' : '1.596 1.10462 -0.608'
      });

      handle.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpenb1 ? '90 90 0' : '90 170 0'
      });
      handle.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpenb1 ? '2.01904 1.43714 -0.88374' : '1.568 1.43714 -0.549'
      });

      if (!boxesDoor.hasAttribute('raycaster')) {
        boxesDoor.setAttribute('raycaster', 'objects: .collidable');
      }

      var audioId = isOpenb1 ? 'drawerClose' : 'drawerOpen';
      var audio = document.getElementById(audioId);

      if (audio && audio.readyState >= 2) {
        audio.play();
      } else {

        audio.addEventListener('loadeddata', function () {
          audio.play();
        });
      }
    }
  });

  // Box 2
  AFRAME.registerComponent('boxesdoor2', {
    init: function () {
      this.el.addEventListener('click', this.toggleDoor.bind(this));
    },
    toggleDoor: function () {
      var boxesDoor = document.getElementById('boxes-door-2');
      var handle = document.getElementById('handle-boxes-2');
      var isOpenb2 = boxesDoor.getAttribute('boxesdoor2').isOpenb2;

      boxesDoor.setAttribute('boxesdoor2', 'isOpenb2', !isOpenb2);

      var animationDuration = 0;
      var easing = 'easeInOutQuad';

      boxesDoor.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpenb2 ? '0 90 0' : '0 170 0'
      });
      boxesDoor.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpenb2 ? '1.9548 2.24583 -0.90258' : '1.59602 2.246 -0.60841'
      });

      handle.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpenb2 ? '90 90 0' : '90 170 0'
      });
      handle.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpenb2 ? '2.01904 1.62829 -0.88374' : '1.56824 1.62829 -0.54871'
      });

      var audioId = isOpenb2 ? 'drawerClose' : 'drawerOpen';
      var audio = document.getElementById(audioId);

      if (audio && audio.readyState >= 2) {
        audio.play();
      } else {

        audio.addEventListener('loadeddata', function () {
          audio.play();
        });
      }
    }
  });

  // Box 3
  AFRAME.registerComponent('boxesdoor3', {
    init: function () {
      this.el.addEventListener('click', this.toggleDoor.bind(this));
    },
    toggleDoor: function () {
      var boxesDoor = document.getElementById('boxes-door-3');
      var handle = document.getElementById('handle-boxes-3');
      var isOpenb3 = boxesDoor.getAttribute('boxesdoor3').isOpenb3;

      // Toggle the door state
      boxesDoor.setAttribute('boxesdoor3', 'isOpenb3', !isOpenb3);

      // Define animation properties
      var animationDuration = 0;
      var easing = 'easeInOutQuad';

      // Update door properties based on the state with animation
      boxesDoor.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpenb3 ? '0 90 0' : '0 170 0'
      });
      boxesDoor.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpenb3 ? '1.9548 3.26608 -0.9025' : '1.596 3.26608 -0.608'
      });

      handle.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpenb3 ? '90 90 0' : '90 170 0'
      });
      handle.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpenb3 ? '2.01904 3.04595 -0.88374' : '1.568 3.04595 -0.549'
      });

      // Play the sound effect based on the state
      var audioId = isOpenb3 ? 'drawerClose' : 'drawerOpen';
      var audio = document.getElementById(audioId);

      // Check if the audio element is defined and is loaded
      if (audio && audio.readyState >= 2) {
        audio.play();
      } else {
        // If the audio is not loaded, wait for the 'loadeddata' event
        audio.addEventListener('loadeddata', function () {
          audio.play();
        });
      }
    }
  });

  // Box 4
  AFRAME.registerComponent('boxesdoor4', {
    init: function () {
      this.el.addEventListener('click', this.toggleDoor.bind(this));
    },
    toggleDoor: function () {
      var boxesDoor = document.getElementById('boxes-door-4');
      var handle = document.getElementById('handle-boxes-4');
      var isOpenb4 = boxesDoor.getAttribute('boxesdoor4').isOpenb4;

      // Toggle the door state
      boxesDoor.setAttribute('boxesdoor4', 'isOpenb4', !isOpenb4);

      // Define animation properties
      var animationDuration = 0;
      var easing = 'easeInOutQuad';

      // Update door properties based on the state with animation
      boxesDoor.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpenb4 ? '0 90 0' : '0 170 0'
      });
      boxesDoor.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpenb4 ? '2.62905 2.96795 -0.917' : '2.22453 2.96795 -0.57238'
      });

      handle.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpenb4 ? '0 90 0' : '0 -10 0'
      });
      handle.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpenb4 ? '2.86394 2.64347 -0.88374' : '2.17656 2.64347 -0.38159'
      });

      // Play the sound effect based on the state
      var audioId = isOpenb4 ? 'drawerClose' : 'drawerOpen';
      var audio = document.getElementById(audioId);

      // Check if the audio element is defined and is loaded
      if (audio && audio.readyState >= 2) {
        audio.play();
      } else {
        // If the audio is not loaded, wait for the 'loadeddata' event
        audio.addEventListener('loadeddata', function () {
          audio.play();
        });
      }
    }
  });

  // Box 5
  AFRAME.registerComponent('boxesdoor5', {
    init: function () {
      this.el.addEventListener('click', this.toggleDoor.bind(this));
    },
    toggleDoor: function () {
      var boxesDoor = document.getElementById('boxes-door-5');
      var handle = document.getElementById('handle-boxes-5');
      var isOpenb5 = boxesDoor.getAttribute('boxesdoor5').isOpenb5;

      // Toggle the door state
      boxesDoor.setAttribute('boxesdoor5', 'isOpenb5', !isOpenb5);

      // Define animation properties
      var animationDuration = 0;
      var easing = 'easeInOutQuad';

      // Update door properties based on the state with animation
      boxesDoor.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpenb5 ? '0 90 0' : '0 10 0'
      });
      boxesDoor.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpenb5 ? '3.33715 2.79565 -0.917' : '3.71341 2.79565 -0.60342'
      });

      handle.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpenb5 ? '0 90 0' : '0 10 0'
      });
      handle.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpenb5 ? '3.0935 2.64347 -0.88374' : '3.75165 2.64347 -0.42411'
      });

      // Check if raycasting components are present and update the collidable class
      if (!boxesDoor.hasAttribute('raycaster')) {
        boxesDoor.setAttribute('raycaster', 'objects: .collidable');
      }

      // Play the sound effect based on the state
      var audioId = isOpenb5 ? 'drawerClose' : 'drawerOpen';
      var audio = document.getElementById(audioId);

      // Check if the audio element is defined and is loaded
      if (audio && audio.readyState >= 2) {
        audio.play();
      } else {
        // If the audio is not loaded, wait for the 'loadeddata' event
        audio.addEventListener('loadeddata', function () {
          audio.play();
        });
      }
    }
  });

  // Box 6
  AFRAME.registerComponent('boxesdoor6', {
    init: function () {
      this.el.addEventListener('click', this.toggleDoor.bind(this));
    },
    toggleDoor: function () {
      var boxesDoor = document.getElementById('boxes-door-6');
      var handle = document.getElementById('handle-boxes-6');
      var isOpenb6 = boxesDoor.getAttribute('boxesdoor6').isOpenb6;

      // Toggle the door state
      boxesDoor.setAttribute('boxesdoor6', 'isOpenb6', !isOpenb6);

      // Define animation properties
      var animationDuration = 0;
      var easing = 'easeInOutQuad';

      // Update door properties based on the state with animation
      boxesDoor.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpenb6 ? '0 90 0' : '0 0 0'
      });
      boxesDoor.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpenb6 ? '4.0313 2.79565 -0.917' : '4.38493 2.79565 -0.58662'
      });

      handle.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpenb6 ? '0 90 0' : '0 90 0'
      });
      handle.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpenb6 ? '3.79911 2.64347 -0.88374' : '4.40576 2.64347 -0.88374'
      });

      // Check if raycasting components are present and update the collidable class
      if (!boxesDoor.hasAttribute('raycaster')) {
        boxesDoor.setAttribute('raycaster', 'objects: .collidable');
      }

      // Play the sound effect based on the state
      var audioId = isOpenb6 ? 'drawerClose' : 'drawerOpen';
      var audio = document.getElementById(audioId);

      // Check if the audio element is defined and is loaded
      if (audio && audio.readyState >= 2) {
        audio.play();
      } else {
        // If the audio is not loaded, wait for the 'loadeddata' event
        audio.addEventListener('loadeddata', function () {
          audio.play();
        });
      }
    }
  });

  // Box 7
  AFRAME.registerComponent('boxesdoor7', {
    init: function () {
      this.el.addEventListener('click', this.toggleDoor.bind(this));
    },
    toggleDoor: function () {
      var boxesDoor = document.getElementById('boxes-door-7');
      var handle = document.getElementById('handle-boxes-7');
      var isOpenb7 = boxesDoor.getAttribute('boxesdoor7').isOpenb7;

      // Toggle the door state
      boxesDoor.setAttribute('boxesdoor7', 'isOpenb7', !isOpenb7);

      // Define animation properties
      var animationDuration = 500;
      var easing = 'easeInOutQuad';

      // Update door properties based on the state with animation
      boxesDoor.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpenb7 ? '0 0 0' : '0 0 0'
      });
      boxesDoor.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpenb7 ? '3.69441 1.0734 -0.36638' : '3.694 1.073 -1.25966'
      });

      handle.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpenb7 ? '0 0 0' : '0 0 0'
      });
      handle.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpenb7 ? '3.67654 1.08804 -0.00156' : '3.67654 1.08804 -0.86773'
      });

      var audioId = isOpenb7 ? 'drawerClose' : 'drawerOpen';
      var audio = document.getElementById(audioId);

      if (audio && audio.readyState >= 2) {
        audio.play();
      } else {
        audio.addEventListener('loadeddata', function () {
          audio.play();
        });
      }
    }
  });

  // Box 8
  AFRAME.registerComponent('boxesdoor8', {
    init: function () {
      this.el.addEventListener('click', this.toggleDoor.bind(this));
    },
    toggleDoor: function () {
      var boxesDoor = document.getElementById('boxes-door-8');
      var handle = document.getElementById('handle-boxes-8');
      var isOpenb8 = boxesDoor.getAttribute('boxesdoor8').isOpenb8;

      // Toggle the door state
      boxesDoor.setAttribute('boxesdoor8', 'isOpenb8', !isOpenb8);

      // Define animation properties
      var animationDuration = 500;
      var easing = 'easeInOutQuad';

      // Update door properties based on the state with animation
      boxesDoor.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpenb8 ? '0 0 0' : '0 100 0'
      });
      boxesDoor.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpenb8 ? '3.69441 1.0734 1.81199' : '3.4434 1.073 2.12672'
      });

      handle.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpenb8 ? '0 0 0' : '0 100 0'
      });
      handle.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpenb8 ? '3.67654 1.08804 1.63343' : '3.30317 1.08804 2.15208'
      });

      // Check if raycasting components are present and update the collidable class
      if (!boxesDoor.hasAttribute('raycaster')) {
        boxesDoor.setAttribute('raycaster', 'objects: .collidable');
      }

      // Play the sound effect based on the state
      var audioId = isOpenb8 ? 'drawerClose' : 'drawerOpen';
      var audio = document.getElementById(audioId);

      // Check if the audio element is defined and is loaded
      if (audio && audio.readyState >= 2) {
        audio.play();
      } else {
        // If the audio is not loaded, wait for the 'loadeddata' event
        audio.addEventListener('loadeddata', function () {
          audio.play();
        });
      }
    }
  });

      //Tv and Ps5
      document.addEventListener('DOMContentLoaded', function () {
        const HIDDEN_SCALE = '0 0 0';
  
        class VideoController {
          constructor(videoEntity, speakerEntity1, speakerEntity2, otherController) {
            this.videoEntity = videoEntity;
            this.speakerEntity1 = speakerEntity1;
            this.speakerEntity2 = speakerEntity2;
            this.isVideoPlaying = false;
            this.otherController = otherController;
          }
  
          toggleVideo() {
            if (this.isVideoPlaying) {
              this.pauseAndHideVideo();
            } else {
              // Pause the other video before playing this one
              if (this.otherController.isVideoPlaying) {
                this.otherController.pauseAndHideVideo();
              }
              this.playVideo();
            }
            this.isVideoPlaying = !this.isVideoPlaying;
          }
  
          pauseAndHideVideo() {
            this.pauseVideo();
            this.hideVideoBox();
            this.resetSpeakerAnimation();
          }
  
          pauseVideo() {
            this.videoEntity.components.material.material.map.image.pause();
            this.resetSpeakerAnimation();
          }
  
          playVideo() {
            this.videoEntity.components.material.material.map.image.play();
            this.startSpeakerAnimations();
            this.showVideoBox();
          }
  
          hideVideoBox() {
            this.videoEntity.setAttribute('scale', HIDDEN_SCALE);
          }
  
          showVideoBox() {
            this.videoEntity.setAttribute('scale', '1 1 1');
          }
  
          resetSpeakerAnimation() {
            this.speakerEntity1.removeAttribute('animation__scale');
            this.speakerEntity2.removeAttribute('animation__scale');
          }
  
          startSpeakerAnimations() {
            this.speakerEntity1.setAttribute('animation__scale', "property: scale; to: 1.2 1.2 1.2; easing: easeInOutQuad; dur: 500; loop: true");
            this.speakerEntity2.setAttribute('animation__scale', "property: scale; to: 1.2 1.2 1.2; easing: easeInOutQuad; dur: 500; loop: true");
          }
        }
  
        const tvVideoController = new VideoController(
          document.getElementById('tvVideo'),
          document.getElementById('speaker1'),
          document.getElementById('speaker2'),
          null
        );
  
        const ps5VideoController = new VideoController(
          document.getElementById('ps5Video'),
          document.getElementById('speaker1'),
          document.getElementById('speaker2'),
          tvVideoController
        );
  
        // Set the other controller for each instance
        tvVideoController.otherController = ps5VideoController;
  
        document.getElementById('tvScreen').addEventListener('click', () => tvVideoController.toggleVideo());
        document.getElementById('ps5Entity').addEventListener('click', () => ps5VideoController.toggleVideo());
      });

  //Sink
  AFRAME.registerComponent('bathroomsink', {
    init: function () {
      var el = this.el;
      var waterEntities = document.querySelectorAll('#water1, #water2');
      var isWaterVisible = false;

      el.addEventListener('click', function () {
        isWaterVisible = !isWaterVisible;

        if (isWaterVisible) {
          // Show water by setting the scale
          waterEntities.forEach(function (entity) {
            entity.setAttribute('scale', '1 1 1');
          });

          // Start audio playback
          el.setAttribute('sound', 'src: #sinkAudio; autoplay: true; loop: true');
        } else {
          // Hide water by setting the scale to 0
          waterEntities.forEach(function (entity) {
            entity.setAttribute('scale', '0 0 0');
          });

          // Stop audio playback
          el.removeAttribute('sound');
        }
      });
    },
  });

  //Shower
  AFRAME.registerComponent('shower', {
    init: function () {
      var el = this.el;
      var showerWater = document.getElementById('shower-water');
      var showerAudio = document.getElementById('showerAudio');
      var isWaterVisible = false;

      el.addEventListener('click', function () {
        isWaterVisible = !isWaterVisible;

        if (isWaterVisible) {
          showerWater.setAttribute('scale', '1 1 1.2');

          showerAudio.play();
        } else {
          showerWater.setAttribute('scale', '0 0 0');

          showerAudio.pause();
          showerAudio.currentTime = 0;
        }
      });
    },
  });

  //pool shower 
  AFRAME.registerComponent('pool-shower', {
    init: function () {
      var el = this.el;
      var showerWater = document.getElementById('shower-water-2');
      var showerAudio = document.getElementById('showerAudio');
      var isWaterVisible = false;

      el.addEventListener('click', function () {
        isWaterVisible = !isWaterVisible;

        if (isWaterVisible) {
          // Show water by setting the scale
          showerWater.setAttribute('scale', '1 1 1.2');

          // Start audio playback
          showerAudio.play();
        } else {
          // Hide water by setting the scale to 0
          showerWater.setAttribute('scale', '0 0 0');

          // Stop audio playback
          showerAudio.pause();
          showerAudio.currentTime = 0; // Reset the audio to the beginning
        }
      });
    },
  });

  //Kitchen Sink
  AFRAME.registerComponent('kitchensink', {
    init: function () {
      var el = this.el;
      var waterEntities = document.querySelectorAll('#water2-1, #water2-2');
      var isWaterVisible = false;

      el.addEventListener('click', function () {
        isWaterVisible = !isWaterVisible;

        if (isWaterVisible) {
          // Show water by setting the scale
          waterEntities.forEach(function (entity) {
            entity.setAttribute('scale', '1 1 1');
          });

          // Start audio playback
          el.setAttribute('sound', 'src: #sinkAudio; autoplay: true; loop: true');
        } else {
          // Hide water by setting the scale to 0
          waterEntities.forEach(function (entity) {
            entity.setAttribute('scale', '0 0 0');
          });

          // Stop audio playback
          el.removeAttribute('sound');
        }
      });
    },
  });

  //Gas Stove 
  AFRAME.registerComponent('stove', {

    init: function () {
      var el = this.el;
      var waterEntities = document.querySelectorAll('#gas-stove, #gas-stove-2, #gas-stove-3, #gas-stove-4');
      var isWaterVisible = false;

      el.addEventListener('click', function () {
        isWaterVisible = !isWaterVisible;

        if (isWaterVisible) {
          // Show water by setting the scale
          waterEntities.forEach(function (entity) {
            entity.setAttribute('scale', '1 1 1');
          });

          // Start audio playback
          el.setAttribute('sound', 'src: #gasAudio; autoplay: true; loop: true');
        } else {
          // Hide water by setting the scale to 0
          waterEntities.forEach(function (entity) {
            entity.setAttribute('scale', '0 0 0');
          });

          // Stop audio playback
          el.removeAttribute('sound');
        }
      });
    },
  });

  // Teleportation Up
  AFRAME.registerComponent('teleportation-up', {
    init: function () {
      this.el.addEventListener('click', this.teleport.bind(this, '-0.490 7.345 -6.841', '7.400 3.542-7.793'));
    },
    teleport: function (position, rotation) {
      var camera = document.getElementById('cameraRig');
      var audio = document.getElementById('teleport');

      if (camera) {
        camera.setAttribute('position', position);
        camera.setAttribute('rotation', rotation);
      }

      if (audio) {
        audio.play();
      }
    }
  });

  // Teleportation down 
  AFRAME.registerComponent('teleportation-down', {
    init: function () {
      this.el.addEventListener('click', this.teleport.bind(this, '7.780 3.908 -5.556', '-0.490 7.345 -6.841'));
    },
    teleport: function (position, rotation) {
      var camera = document.getElementById('cameraRig');
      var audio = document.getElementById('teleport');

      if (camera) {
        camera.setAttribute('position', position);
        camera.setAttribute('rotation', rotation);
      }

      if (audio) {
        audio.play();
      }
    }
  });

    // Teleportation Up
    AFRAME.registerComponent('teleportation1-up', {
      init: function () {
        this.el.addEventListener('click', this.teleport.bind(this, '3.356449270275855 11.44333 -12.838900524106108', '3.570741707040071 0.24732 -8.511502540573776'));
      },
      teleport: function (position, rotation) {
        var camera = document.getElementById('cameraRig');
        var audio = document.getElementById('teleport');
  
        if (camera) {
          camera.setAttribute('position', position);
          camera.setAttribute('rotation', rotation);
        }
  
        if (audio) {
          audio.play();
        }
      }
    });
  
    // Teleportation down 
    AFRAME.registerComponent('teleportation1-down', {
      init: function () {
        this.el.addEventListener('click', this.teleport.bind(this, '3.570741707040071 0.24732 -8.511502540573776', '-0.490 7.345 -6.841'));
      },
      teleport: function (position, rotation) {
        var camera = document.getElementById('cameraRig');
        var audio = document.getElementById('teleport');
  
        if (camera) {
          camera.setAttribute('position', position);
          camera.setAttribute('rotation', rotation);
        }
  
        if (audio) {
          audio.play();
        }
      }
    });

  //Bed door 1 
  AFRAME.registerComponent('bedroomdoor', {
    schema: { isOpenBedroom1: { default: false } },
    init: function () {
      this.el.addEventListener('click', this.toggleDoor.bind(this));
    },
    toggleDoor: function () {
      var bedroomdoor = document.getElementById('bedroomdoor-1');
      var isOpenBedroom1 = bedroomdoor.getAttribute('bedroomdoor').isOpenBedroom1;

      bedroomdoor.setAttribute('bedroomdoor', 'isOpenBedroom1', !isOpenBedroom1);

      var animationDuration = 500;
      var easing = 'easeInOutQuad';

      bedroomdoor.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpenBedroom1 ? '0 0 0' : '0 -90 0'
      });
      bedroomdoor.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpenBedroom1 ? '0.3798 4.10988 1.38675' : '0.895 4.09 2.03074'
      });

      var audioId = isOpenBedroom1 ? 'closeDoorAudio' : 'openDoorAudio';
      var audio = document.getElementById(audioId);

      if (audio && audio.readyState >= 2) {
        audio.play();
      } else {
        audio.addEventListener('loadeddata', function () {
          audio.play();
        });
      }
    }
  });

  //Bathroom door 2
  AFRAME.registerComponent('bathroomdoor2', {
    schema: { isOpenBathroom2: { default: false } },
    init: function () {
      this.el.addEventListener('click', this.toggleDoor.bind(this));
    },
    toggleDoor: function () {
      var bathroomdoor2 = document.getElementById('bathroomdoor-2');
      var isOpenBathroom2 = bathroomdoor2.getAttribute('bathroomdoor2').isOpenBathroom2;

      bathroomdoor2.setAttribute('bathroomdoor2', 'isOpenBathroom2', !isOpenBathroom2);

      var animationDuration = 500;
      var easing = 'easeInOutQuad';

      bathroomdoor2.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpenBathroom2 ? '0 90 0' : '0 180 0'
      });
      bathroomdoor2.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpenBathroom2 ? '0.935 4.10988 2.72942' : '1.42887 4.10988 3.157'
      });

      var audioId = isOpenBathroom2 ? 'closeDoorAudio' : 'openDoorAudio';
      var audio = document.getElementById(audioId);

      if (audio && audio.readyState >= 2) {
        audio.play();
      } else {
        audio.addEventListener('loadeddata', function () {
          audio.play();
        });
      }
    }
  });

  //Storage door
  AFRAME.registerComponent('storagedoor2', {
    schema: { isStoragedoor: { default: false } },
    init: function () {
      this.el.addEventListener('click', this.toggleDoor.bind(this));
    },
    toggleDoor: function () {
      var storagedoor2 = document.getElementById('storagedoorsingle-1');
      var isStoragedoor = storagedoor2.getAttribute('storagedoor2').isStoragedoor;

      storagedoor2.setAttribute('storagedoor2', 'isStoragedoor', !isStoragedoor);

      var animationDuration = 500;
      var easing = 'easeInOutQuad';

      storagedoor2.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isStoragedoor ? '0 0 0' : '0 90 0'
      });
      storagedoor2.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isStoragedoor ? '4.99141 5.60093 21.12257' : '5.64252 5.601 20.56217'
      });

      var audioId = isStoragedoor ? 'closeDoorAudio' : 'openDoorAudio';
      var audio = document.getElementById(audioId);

      if (audio && audio.readyState >= 2) {
        audio.play();
      } else {
        audio.addEventListener('loadeddata', function () {
          audio.play();
        });
      }
    }
  });

  //bedroom door2
  AFRAME.registerComponent('bedroomdoor2', {
    schema: { isBedroomdoor2: { default: false } },
    init: function () {
      this.el.addEventListener('click', this.toggleDoor.bind(this));
    },
    toggleDoor: function () {
      var bedroomdoor2 = this.el;
      var isBedroomdoor2 = bedroomdoor2.getAttribute('bedroomdoor2').isBedroomdoor2;

      bedroomdoor2.setAttribute('bedroomdoor2', 'isBedroomdoor2', !isBedroomdoor2);

      var animationDuration = 500;
      var easing = 'easeInOutQuad';

      bedroomdoor2.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isBedroomdoor2 ? '0 180 0' : '0 270 0'
      });
      bedroomdoor2.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isBedroomdoor2 ? '-10.56676 4.156 8.81517' : '-10.53738 4.156 8.78994'
      });

      var audioId = isBedroomdoor2 ? 'closeDoorAudio' : 'openDoorAudio';
      var audio = document.getElementById(audioId);

      if (audio && audio.readyState >= 2) {
        audio.play();
      } else {
        audio.addEventListener('loadeddata', function () {
          audio.play();
        });
      }
    }
  });

  //Bathroom door 3 
  AFRAME.registerComponent('bathroomdoor3', {
    schema: { isBathroomdoor3: { default: false } },
    init: function () {
      this.el.addEventListener('click', this.toggleDoor.bind(this));
    },
    toggleDoor: function () {
      var bathroomdoor3 = this.el;
      var isBathroomdoor3 = bathroomdoor3.getAttribute('bathroomdoor3').isBathroomdoor3;

      bathroomdoor3.setAttribute('bathroomdoor3', 'isBathroomdoor3', !isBathroomdoor3);

      var animationDuration = 500;
      var easing = 'easeInOutQuad';

      bathroomdoor3.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isBathroomdoor3 ? '0 180 0' : '0 90 0'
      });
      bathroomdoor3.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isBathroomdoor3 ? '5.94153 5.684 21.18517' : '5.94153 5.684 21.163'
      });

      var audioId = isBathroomdoor3 ? 'closeDoorAudio' : 'openDoorAudio';
      var audio = document.getElementById(audioId);

      if (audio && audio.readyState >= 2) {
        audio.play();
      } else {
        audio.addEventListener('loadeddata', function () {
          audio.play();
        });
      }
    }
  });

  //Workroom door
  AFRAME.registerComponent('workroom', {
    schema: { isWorkroomdoor: { default: false } },
    init: function () {
      this.el.addEventListener('click', this.toggleDoor.bind(this));
    },
    toggleDoor: function () {
      var workroomdoor = this.el;
      var isWorkroomdoor = workroomdoor.getAttribute('workroom').isWorkroomdoor;

      workroomdoor.setAttribute('workroom', 'isWorkroomdoor', !isWorkroomdoor);

      var animationDuration = 500;
      var easing = 'easeInOutQuad';

      workroomdoor.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isWorkroomdoor ? '0 180 0' : '0 270 0'
      });
      workroomdoor.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isWorkroomdoor ? '-4.28127 4.156 8.81517' : '-4.23575 4.156 8.76495'
      });

      var audioId = isWorkroomdoor ? 'closeDoorAudio' : 'openDoorAudio';
      var audio = document.getElementById(audioId);

      if (audio && audio.readyState >= 2) {
        audio.play();
      } else {
        audio.addEventListener('loadeddata', function () {
          audio.play();
        });
      }
    }
  });

  //shower3
  AFRAME.registerComponent('shower2', {
    init: function () {
      var el = this.el;
      var showerWater = document.getElementById('shower-water-3');
      var showerAudio = document.getElementById('showerAudio');
      var isWaterVisible = false;

      el.addEventListener('click', function () {
        isWaterVisible = !isWaterVisible;

        if (isWaterVisible) {
          showerWater.setAttribute('scale', '1 1 1.2');

          showerAudio.play();
        } else {
          showerWater.setAttribute('scale', '0 0 0');

          showerAudio.pause();
          showerAudio.currentTime = 0;
        }
      });
    },
  });

  //shower4
  AFRAME.registerComponent('shower3', {
    init: function () {
      var el = this.el;
      var showerWater = document.getElementById('shower-water-4');
      var showerAudio = document.getElementById('showerAudio');
      var isWaterVisible = false;

      el.addEventListener('click', function () {
        isWaterVisible = !isWaterVisible;

        if (isWaterVisible) {
          showerWater.setAttribute('scale', '1 1 1.2');

          showerAudio.play();
        } else {
          showerWater.setAttribute('scale', '0 0 0');

          showerAudio.pause();
          showerAudio.currentTime = 0;
        }
      });
    },
  });

  //bathroom Sink 2
  AFRAME.registerComponent('bathroomsink2', {
    init: function () {
      var el = this.el;
      var waterEntities = document.querySelectorAll('#water2-4, #water2-3');
      var isWaterVisible = false;

      el.addEventListener('click', function () {
        isWaterVisible = !isWaterVisible;

        if (isWaterVisible) {
          // Show water by setting the scale
          waterEntities.forEach(function (entity) {
            entity.setAttribute('scale', '1 1 1');
          });

          // Start audio playback
          el.setAttribute('sound', 'src: #sinkAudio; autoplay: true; loop: true');
        } else {
          // Hide water by setting the scale to 0
          waterEntities.forEach(function (entity) {
            entity.setAttribute('scale', '0 0 0');
          });

          el.removeAttribute('sound');
        }
      });
    },
  });

  //Tv2
  document.addEventListener('DOMContentLoaded', function () {
    const HIDDEN_SCALE = '0 0 0';

    class VideoController {
      constructor(videoEntity) {
        this.videoEntity = videoEntity;
        this.isVideoPlaying = false;
      }

      toggleVideo() {
        if (this.isVideoPlaying) {
          this.pauseAndHideVideo();
        } else {
          this.playVideo();
        }
        this.isVideoPlaying = !this.isVideoPlaying;
      }

      pauseAndHideVideo() {
        this.pauseVideo();
        this.hideVideoBox();
      }

      pauseVideo() {
        this.videoEntity.components.material.material.map.image.pause();
      }

      playVideo() {
        this.videoEntity.components.material.material.map.image.play();
        this.showVideoBox();
      }

      hideVideoBox() {
        this.videoEntity.setAttribute('scale', HIDDEN_SCALE);
      }

      showVideoBox() {
        this.videoEntity.setAttribute('scale', '1 1 1');
      }
    }

    const tvVideoController2 = new VideoController(
      document.getElementById('tvVideo2')
    );

    document.getElementById('tvScreen2').addEventListener('click', () => tvVideoController2.toggleVideo());
  });

  //Tv3
  document.addEventListener('DOMContentLoaded', function () {
    const HIDDEN_SCALE = '0 0 0';

    class VideoController {
      constructor(videoEntity) {
        this.videoEntity = videoEntity;
        this.isVideoPlaying = false;
      }

      toggleVideo() {
        if (this.isVideoPlaying) {
          this.pauseAndHideVideo();
        } else {
          this.playVideo();
        }
        this.isVideoPlaying = !this.isVideoPlaying;
      }

      pauseAndHideVideo() {
        this.pauseVideo();
        this.hideVideoBox();
      }

      pauseVideo() {
        this.videoEntity.components.material.material.map.image.pause();
      }

      playVideo() {
        this.videoEntity.components.material.material.map.image.play();
        this.showVideoBox();
      }

      hideVideoBox() {
        this.videoEntity.setAttribute('scale', HIDDEN_SCALE);
      }

      showVideoBox() {
        this.videoEntity.setAttribute('scale', '1 1 1');
      }
    }

    const tvVideoController3 = new VideoController(
      document.getElementById('tvVideo3')
    );

    document.getElementById('tvScreen3').addEventListener('click', () => tvVideoController3.toggleVideo());
  });

  //Bedroom drawer 
    AFRAME.registerComponent('drawer', {
      schema: { isOpen: { default: false } },
      init: function () {
        this.el.addEventListener('click', this.toggleDrawer.bind(this));
      },
      toggleDrawer: function () {
        var drawerDoor1 = document.getElementById('bedroom-drawerdoor-1');
        var drawerDoor2 = document.getElementById('bedroom-drawerdoor-2');
        var handle1 = document.getElementById('bedroom-drawerhandle-1');
        var handle2 = document.getElementById('bedroom-drawerhandle-2');

        var isOpen1 = drawerDoor1.getAttribute('drawer').isOpen;
        var isOpen2 = drawerDoor2.getAttribute('drawer').isOpen;

        drawerDoor1.setAttribute('drawer', 'isOpen', !isOpen1);
        drawerDoor2.setAttribute('drawer', 'isOpen', !isOpen2);

        var animationDuration = 0;
        var easing = 'easeInOutQuad';

        drawerDoor1.setAttribute('animation__rotation', {
          property: 'rotation',
          dur: animationDuration,
          easing: easing,
          to: isOpen1 ? '0 90 0' : '0 0 0'
        });
        drawerDoor1.setAttribute('animation__position', {
          property: 'position',
          dur: animationDuration,
          easing: easing,
          to: isOpen1 ? '-10.67799 6.16619 14.81062' : '-10.37309 6.16619 14.48496'
        });

        handle1.setAttribute('animation__rotation', {
          property: 'rotation',
          dur: animationDuration,
          easing: easing,
          to: isOpen1 ? '0 90 0' : '0 0 0'
        });
        handle1.setAttribute('animation__position', {
          property: 'position',
          dur: animationDuration,
          easing: easing,
          to: isOpen1 ? '-10.85146 6.0617 14.76944' : '-10.32767 6.0617 14.76944'
        });

        drawerDoor2.setAttribute('animation__rotation', {
          property: 'rotation',
          dur: animationDuration,
          easing: easing,
          to: isOpen2 ? '0 90 0' : '0 180 0'
        });
        drawerDoor2.setAttribute('animation__position', {
          property: 'position',
          dur: animationDuration,
          easing: easing,
          to: isOpen2 ? '-11.30407 6.16619 14.81062' : '-11.59647 6.16619 14.485'
        });

        handle2.setAttribute('animation__rotation', {
          property: 'rotation',
          dur: animationDuration,
          easing: easing,
          to: isOpen2 ? '0 90 0' : '0 180 0'
        });
        handle2.setAttribute('animation__position', {
          property: 'position',
          dur: animationDuration,
          easing: easing,
          to: isOpen2 ? '-11.15203 6.0617 14.76944' : '-11.61043 6.14433 14.3187'
        });

        var audioId = isOpen1 || isOpen2 ? 'drawerOpen' : 'drawerClose';
        var audio = document.getElementById(audioId);

        if (audio && audio.readyState >= 2) {
          audio.play();
        } else {
          audio.addEventListener('loadeddata', function () {
            audio.play();
          });
        }
      }
    });

  //waredrobe 1
  AFRAME.registerComponent('waredrobe1', {
    init: function () {
      this.el.addEventListener('click', this.toggleWardrobe.bind(this));
    },
    toggleWardrobe: function () {
      var wardrobe = document.getElementById('waredrobe-1');
      var handle = document.getElementById('waredrobe-handle-1');
      var isOpenW1 = wardrobe.getAttribute('waredrobe1').isOpenW1;

      wardrobe.setAttribute('waredrobe1', 'isOpenW1', !isOpenW1);

      var animationDuration = 0;
      var easing = 'easeInOutQuad';

      wardrobe.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpenW1 ? '0 90 0' : '0 0 0'
      });
      wardrobe.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpenW1 ? '2.04402 5.62826 6.08177' : '2.36575 5.62826 5.74016'
      });

      handle.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpenW1 ? '0 90 0' : '0 0 0'
      });
      handle.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpenW1 ? '1.89459 5.24249 6.06963' : '2.40826 5.24249 6.06963'
      });

      var audioId = isOpenW1 ? 'drawerOpen' : 'drawerClose';
      var audio = document.getElementById(audioId);

      if (audio && audio.readyState >= 2) {
        audio.play();
      } else {
        audio.addEventListener('loadeddata', function () {
          audio.play();
        });
      }
    }
  });

  //waredrobe 2
  AFRAME.registerComponent('waredrobe2', {
    init: function () {
      this.el.addEventListener('click', this.toggleWardrobe.bind(this));
    },
    toggleWardrobe: function () {
      var wardrobe = document.getElementById('waredrobe-2');
      var handle = document.getElementById('waredrobe-handle-2');
      var isOpenW2 = wardrobe.getAttribute('waredrobe2').isOpenW2;

      wardrobe.setAttribute('waredrobe2', 'isOpenW2', !isOpenW2);

      var animationDuration = 0;
      var easing = 'easeInOutQuad';

      wardrobe.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpenW2 ? '0 90 0' : '0 0 0'
      });
      wardrobe.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpenW2 ? '1.4411 5.38949 6.08177' : '1.71318 5.38949 5.80648'
      });

      handle.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpenW2 ? '0 90 0' : '0 0 0'
      });
      handle.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpenW2 ? '1.26638 5.24249 6.06963' : '1.72692 5.24249 5.62909'
      });

      var audioId = isOpenW2 ? 'drawerOpen' : 'drawerClose';
      var audio = document.getElementById(audioId);

      if (audio && audio.readyState >= 2) {
        audio.play();
      } else {
        audio.addEventListener('loadeddata', function () {
          audio.play();
        });
      }
    }
  });

  //waredrobe 3
  AFRAME.registerComponent('waredrobe3', {
    init: function () {
      this.el.addEventListener('click', this.toggleWardrobe.bind(this));
    },
    toggleWardrobe: function () {
      var wardrobe = document.getElementById('waredrobe-3');
      var handle = document.getElementById('waredrobe-handle-3');
      var isOpenW3 = wardrobe.getAttribute('waredrobe3').isOpenW3;

      wardrobe.setAttribute('waredrobe3', 'isOpenW3', !isOpenW3);

      var animationDuration = 0;
      var easing = 'easeInOutQuad';

      wardrobe.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpenW3 ? '0 90 0' : '0 0 0'
      });
      wardrobe.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpenW3 ? '0.80723 5.1383 6.08177' : '0.47328 5.1383 5.71895'
      });

      handle.setAttribute('animation__rotation', {
        property: 'rotation',
        dur: animationDuration,
        easing: easing,
        to: isOpenW3 ? '0 90 0' : '0 0 0'
      });
      handle.setAttribute('animation__position', {
        property: 'position',
        dur: animationDuration,
        easing: easing,
        to: isOpenW3 ? '1.02716 5.24249 6.06963' : '0.45464 5.24249 5.56757'
      });

      var audioId = isOpenW3 ? 'drawerOpen' : 'drawerClose';
      var audio = document.getElementById(audioId);

      if (audio && audio.readyState >= 2) {
        audio.play();
      } else {
        audio.addEventListener('loadeddata', function () {
          audio.play();
        });
      }
    }
  });















     // Play the loading video
     var loadingVideo = document.getElementById('loadingVideo');
     loadingVideo.play();
  
     // Wait for the video to load
     loadingVideo.addEventListener('loadeddata', function() {
       setTimeout(function() {
         document.getElementById('loadingScreen').setAttribute('visible', 'false');
       }, 30000); // 40 seconds
     });

// AI
AFRAME.registerSystem('chatSystem', {
  init: function () {
    this.currentText = "";
  }
});

AFRAME.registerComponent('input-prompt', {
  init: function () {
    this.el.addEventListener('click', () => {
      const userPrompt = prompt("Nhập câu hỏi cho AI:");
      if (userPrompt && userPrompt.trim()) {
        this.el.setAttribute('text', 'value', userPrompt.trim());
        this.el.sceneEl.systems.chatSystem.currentText = userPrompt.trim();
      }
    });
  }
});

AFRAME.registerComponent('send-question', {
  init: function () {
    this.el.addEventListener('click', async () => {
      const chatSystem = this.el.sceneEl.systems.chatSystem;
      const currentText = chatSystem.currentText;

      if (!currentText || !currentText.trim()) {
        alert("Vui lòng nhập câu hỏi trước khi gửi!");
        return;
      }

      console.log("🧠 Gửi prompt đến AI...", currentText);

      try {
        const response = await fetch('http://localhost:3000/api/lmstudio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'mistral',
            prompt: currentText,
            max_tokens: 100,
            temperature: 0.7
          })
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`Lỗi server ${response.status}: ${errText}`);
        }

        const data = await response.json();

        if (data.choices && data.choices.length > 0 && data.choices[0].text) {
          const reply = data.choices[0].text.trim();

          // Xóa tin nhắn AI cũ nếu có
          const oldMsg = document.getElementById('ai-reply');
          if (oldMsg) oldMsg.remove();

          // Tạo tin nhắn AI mới
          const msg = document.createElement('a-text');
          msg.setAttribute('id', 'ai-reply');
          msg.setAttribute('value', reply);
          msg.setAttribute('position', '4.777 6.526 -20.867');
          msg.setAttribute('rotation', '0 -90 0')
          msg.setAttribute('color', 'yellow');
          msg.setAttribute('align', 'center');
          msg.setAttribute('width', 4);
          msg.setAttribute('font', 'roboto');
          this.el.sceneEl.appendChild(msg);

          // Ẩn panel chat và reset input
          document.getElementById('chat-panel').setAttribute('visible', false);
          chatSystem.currentText = "";
          document.getElementById('user-input').setAttribute('text', 'value', '');
        } else {
          alert("❌ Không nhận được phản hồi hợp lệ từ AI.");
        }
      } catch (err) {
        console.error("❌ Lỗi gọi AI:", err);
        alert("Lỗi khi gọi AI: " + err.message);
      }
    });
  }
});

AFRAME.registerComponent('ai-listener', {
  init: function () {
    this.el.addEventListener('click', () => {
      const chatPanel = document.getElementById('chat-panel');
      const isVisible = chatPanel.getAttribute('visible');
      chatPanel.setAttribute('visible', !isVisible);
    });
  }
});




//CSS

AFRAME.registerComponent('chat-panel-styles', {
  init: function () {
    const chatPanel = this.el; // Entity mà component này được gắn vào (#chat-panel)

    // Lấy các phần tử con
    const userInput = chatPanel.querySelector('#user-input');
    const sendButton = chatPanel.querySelector('#send-button');
    const sendButtonText = sendButton ? sendButton.querySelector('a-text') : null;
    const backgroundPlane = chatPanel.querySelector('a-plane');

    // --- Cấu hình cho user-input ---
    if (userInput) {
      userInput.setAttribute('geometry', {
        primitive: 'plane',
        width: 1.7, // Rộng hơn
        height: 0.22 // Cao hơn
      });
      userInput.setAttribute('material', {
        color: '#F9F9F9', // Màu nền trắng ngà
        opacity: 0.95 // Hơi trong suốt
      });
      userInput.setAttribute('text', {
        value: 'Type your message here...', // Văn bản gợi ý
        color: '#333333', // Màu chữ xám đậm
        wrapCount: 25, // Số ký tự trước khi xuống dòng
        align: 'left', // Căn lề trái
        width: 1.5 // Giới hạn chiều rộng của vùng văn bản
      });
      userInput.setAttribute('position', '0 0.28 0.01'); // Thay đổi vị trí
    }

    // --- Cấu hình cho send-button ---
    if (sendButton) {
      sendButton.setAttribute('geometry', {
        primitive: 'box',
        depth: 0.05,
        height: 0.2,
        width: 0.65 // Rộng hơn
      });
      sendButton.setAttribute('color', '#007BFF'); // Màu xanh dương
      sendButton.setAttribute('material', {
        shader: 'standard', // Shader chuẩn để có hiệu ứng ánh sáng
        metalness: 0.3, // Hiệu ứng kim loại nhẹ
        roughness: 0.5 // Bề mặt không quá bóng
      });
      sendButton.setAttribute('position', '0 -0.28 0.01'); // Thay đổi vị trí

      // Hiệu ứng hover cho nút Gửi
      sendButton.addEventListener('mouseenter', function () {
        sendButton.setAttribute('color', '#0056b3'); // Màu đậm hơn khi hover
        sendButton.setAttribute('scale', '1.05 1.05 1.05'); // Phóng to nhẹ
      });
      sendButton.addEventListener('mouseleave', function () {
        sendButton.setAttribute('color', '#007BFF'); // Trở lại màu gốc
        sendButton.setAttribute('scale', '1 1 1'); // Trở lại kích thước gốc
      });
    }

    // --- Cấu hình cho văn bản trên send-button ---
    if (sendButtonText) {
      sendButtonText.setAttribute('value', 'Gửi tin nhắn'); // Văn bản mới
      sendButtonText.setAttribute('color', 'white'); // Màu chữ trắng
      sendButtonText.setAttribute('align', 'center');
      sendButtonText.setAttribute('font', 'fonts/Roboto_Medium.json'); // Font (đảm bảo đường dẫn đúng)
      sendButtonText.setAttribute('position', '0 0 0.03');
    }

    // --- Cấu hình cho a-plane nền của chat-panel ---
    if (backgroundPlane) {
      backgroundPlane.setAttribute('color', '#E0E0E0'); // Màu nền xám nhạt
      backgroundPlane.setAttribute('width', 2.1); // Rộng hơn
      backgroundPlane.setAttribute('height', 1.1); // Cao hơn
    }
  }
});
