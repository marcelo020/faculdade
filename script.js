
 const forbiddenZones = [
  {x: 1050, y: 700, width: 1000, height: 2400}, /*vermelho*/
  {x: 20, y: 700, width: 820, height: 3300}, /*verde*/
  {x: 2600, y: 700, width: 720, height: 2800}, /*azul*/
  {x: 3300, y: 0, width: 720, height: 4000}, /*rosa*/
  {x:2000, y: 600, width: 820, height: 600}, /*amarelo*/
  {x: 2200, y: 3650, width: 420, height: 400}, /*laranja*/
  {x:1400, y: 3250, width: 600, height: 300} /*cinza*/
]

  function isInForbiddenZone(x, y) {
  return forbiddenZones.some(zone =>
   x >= zone.x &&
   x <= zone.x + zone.width &&
   y >= zone.y &&
   y <= zone.y + zone.height
  )
  }
  const noSpawnZone7 = {
  x: 1400,     // posição X da zona
  y: 3250,      // posição Y da zona
  width: 600,  // largura da zona
  height: 300 // altura da zona
  }
  const noSpawnZone6 = {
  x: 2200,     // posição X da zona
  y: 3650,      // posição Y da zona
  width: 420,  // largura da zona
  height: 400 // altura da zona
  }
  const noSpawnZone5 = {
  x: 2000,     // posição X da zona
  y: 600,      // posição Y da zona
  width: 820,  // largura da zona
  height: 600 // altura da zona
  }
  const noSpawnZone4 = {
  x: 3300,     // posição X da zona
  y: 0,      // posição Y da zona
  width: 720,  // largura da zona
  height: 4000 // altura da zona
  }
  const noSpawnZone3 = {
  x: 2600,     // posição X da zona
  y: 700,      // posição Y da zona
  width: 720,  // largura da zona
  height: 2800 // altura da zona
  }
  
const noSpawnZone2 = {
  x: 20,     // posição X da zona
  y: 700,      // posição Y da zona
  width: 820,  // largura da zona
  height: 3300 // altura da zona
  }

  const noSpawnZone = {
  x: 1050,     // posição X da zona
  y: 700,      // posição Y da zona
  width: 1000,  // largura da zona
  height: 2400 // altura da zona
  }

const AudioManager = (() => {
  const sounds = {}
  
  return {
    load: (key, src, loop = false, volume = 1) => {
      const audio = new Audio(src)
      audio.loop = loop
      audio.volume = volume
      sounds[key] = audio
    },
    
    play: (key) => {
  const sound = sounds[key]
  if (sound) {
    sound.currentTime = 0
    sound.play()
      .then(() => console.log(`🔊 Som '${key}' reproduzido.`))
      .catch(e => console.error(`❌ Erro ao tocar som '${key}':`, e))
  } else {
    console.warn(`Som '${key}' não foi carregado.`)
  }
},
    
    stop: (key) => {
      const sound = sounds[key]
      if (sound) {
        sound.pause()
        sound.currentTime = 0
      }
    },
    
    setVolume: (key, volume) => {
      const sound = sounds[key]
      if (sound) sound.volume = volume
    },
    
    pauseAll: () => {
      Object.values(sounds).forEach(audio => audio.pause())
    },
    
    stopAll: () => {
      Object.values(sounds).forEach(audio => {
        audio.pause()
        audio.currentTime = 0
      })
    }
  }
})()
AudioManager.load('bgMusic', 'audio/vaderfundo.mp3', true, 0.1)
AudioManager.load('hug', 'audio/abraco.mp3', false, 0.6  )
AudioManager.load('error', 'audio/erro-coelho.mp3', false, 0.6)
/*efeitos sonoros*/



document.getElementById('start-button').addEventListener('click', () => {
  const name = document.getElementById('player-name-input').value.trim()
  if (name) {
    document.getElementById('start-screen').style.display = 'none'
    document.getElementById('player-name').textContent = name
    
  AudioManager.play('bgMusic')

  } else {
    alert('Por favor, insira um nome.')
  }
  
})



/*-------- Mini game de interação com os coelhos ----------*/
function normalizeAnswer(ans) {
  return ans.toLowerCase().trim().replace(/[.,!?]/g, '')
}  
 const questions = [
  { q: "Como centraliza uma div?", a: "nao sei" },
  { q: "Qual a cor do cavalo branco de napoleão?", a: "branco" },
  { q: "Coelhos gostam de cenouras? (sim/não)", a: "sim" },
  { q: "Qual a cor do céu?", a: "azul" },
  { q: "Pra qual lado o sol se põe?", a: "Oeste",},
  { q: "Qual o maior orgão do corpo humano?", a: "pele" },
  { q: "Coelhos botam ovos? (sim/nao)", a: "nao" },
  { q: "Quantas letras tem no alfabeto?", a: "26"},
  { q: "Quantas cores tem no arco-iris?", a: "7"},


]

const interactWithBunny = (bunny) => {
  const { q, a } = questions[Math.floor(Math.random() * questions.length)]
  const answer = prompt(q)
  if (answer && answer.toLowerCase().trim() === a.toLowerCase()) {
    hugBunny(bunny)
  } else {
    AudioManager.play('error')
    //  som de erro

    alert("Caraí vc é burro em, vai estudar e tente novamente.")
  }
}

    const elements = {
      wrapper: document.querySelector('.wrapper'),
      mapCover: document.querySelector('.map-cover'), 
      indicator: document.querySelector('.indicator'),
      player: document.querySelector('.player'), 
      bunnyRadar: document.querySelector('.circle'),
      bunnyPos: [],
      endMessage: document.querySelector('.end-message'),
      button: document.querySelector('button')
    }
  
    const radToDeg = rad => Math.round(rad * (180 / Math.PI))
    const distanceBetween = (a, b) => Math.round(Math.sqrt(Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2)))
    const randomN = max => Math.ceil(Math.random() * max)
    const px = n => `${n}px`
    const setPos = ({ el, x, y }) => Object.assign(el.style, { left: `${x}px`, top: `${y}px` })
  
    const setSize = ({ el, w, h, d }) => {
      const m = d || 1
      if (w) el.style.width = px(w * m)
      if (h) el.style.height = px(h * m)
    }
  
    const player = {
      id: 'bear',
      x: 0, y: 0,
      frameOffset: 1,
      animationTimer: null,
      el: elements.player,
      sprite: {
        el: document.querySelector('.player').childNodes[1],
        x: 0, y: 0
      },
      walkingDirection: '',
      walkingInterval: null,
      pause: false,
      buffer: 20,
      move: { x: 0, y: 0 }
    }
  
    const settings = {
      d: 40, /** define o tamnho do passo*/ 
      offsetPos: {
        x: 0, y: 0,
      },
      elements: [],
      bunnies: [],
      map: {
        el: document.querySelector('.map'),
        walls: [],
        w: 20 * 200,
        h: 20 * 200,
        x: 0, y: 0,
      },
      transitionTimer: null,
      isWindowActive: true,
      controlPos: { x: 0, y: 0 },
      bunnyRadarSize: 0,
      sadBunnies: []
    }
    
    const resizeBunnyRadar = () => {
      const { innerWidth: w, innerHeight: h } = window
      const size = w > h ? h : w
      settings.bunnyRadarSize = size - 20
      ;['width', 'height'].forEach(param => {
        elements.bunnyRadar.style[param] = px(settings.bunnyRadarSize)
        const isInNoSpawnZone = (x, y) => {
  return (
    x >= noSpawnZone.x &&
    x <= noSpawnZone.x + noSpawnZone.width &&
    y >= noSpawnZone.y &&
    y <= noSpawnZone.y + noSpawnZone.height
  )
}

      })
    }
  
    const triggerBunnyWalk = bunny => {
      bunny.animationTimer = setInterval(()=> {
        if (!settings.isWindowActive) return
        const dir = ['up', 'down', 'right', 'left'][Math.floor(Math.random() * 4)]
        const { d } = settings
  
        bunny.move = {
          down: { x: 0, y: d },
          up: { x: 0, y: -d },
          right: { x: d, y: 0 },
          left: { x: -d, y: 0 }
        }[dir]
  
        walk(bunny, dir)
        setTimeout(()=> walk(bunny, dir), 300)
        setTimeout(()=> walk(bunny, dir), 600)
        setTimeout(()=> stopSprite(bunny), 900)
      }, 1600) /** aumentei a velocidade, pq anda a cada 1000 ms agora antes estava com 2000**/
    }
  
    const getRandomPos = key =>  20 * randomN((settings.map[key] / 20) - 1)
  
   const addBunny = () => {
  let x, y;

  // Repete até achar uma posição fora da zona proibida
  do {
    x = getRandomPos('w');
    y = getRandomPos('h');
  } while (isInForbiddenZone(x, y));

  const bunny = {
    id: `bunny-${settings.bunnies.length + 1}`,
    x, y,
    frameOffset: 1,
    animationTimer: null,
    el: Object.assign(document.createElement('div'), {
      className: 'sprite-container sad',
      innerHTML: '<div class="bunny sprite"></div>'
    }),
    sprite: { el: null, x: 0, y: 0 },
    sad: true,
    buffer: 30,
  }

  settings.bunnies.push(bunny)
  settings.map.el.appendChild(bunny.el)
  bunny.sprite.el = bunny.el.childNodes[0]
  bunny.el.style.zIndex = bunny.y
  setPos(bunny)

  if (randomN(2) === 2) triggerBunnyWalk(bunny)
}


    
    const addWall = ({ x, y, width, height }) => {
  const wall = {
    id: `wall-${settings.elements.length + 1}`,
    x,
    y,
    el: Object.assign(document.createElement('div'), {
      className: 'wall',
    }),
    buffer: Math.max(width, height) / 2, // ou use um valor fixo como 40
  }
  settings.elements.push(wall)
  settings.map.el.appendChild(wall.el)
  wall.el.style.zIndex = wall.y
  setPos(wall)
  setSize({ el: wall.el, w: width, h: height })
}

  

    const addTree = () => {
      const tree = {
        id: `tree-${settings.elements.length + 1}`,
        x: 1150,
        y: 800 + settings.elements.length*600,
        el: Object.assign(document.createElement('div'), 
        { 
          className: 'tree',
          innerHTML: '<div></div>' 
        }),
        buffer: 40,
      }
      settings.elements.push(tree)
      settings.map.el.appendChild(tree.el)
      tree.el.style.zIndex = tree.y
      setPos(tree)
    }
  
   
    
  
    const setBackgroundPos = ({ el, x, y }) => {
      el.style.setProperty('--bx', px(x))
      el.style.setProperty('--by', px(y))
    }
  
    const animateSprite = (actor, dir) => {
      const h = -32 * 2
      actor.sprite.y = {
        down: 0,
        up: h,
        right: h * 2,
        left: h * 3
      }[dir]
      actor.frameOffset = actor.frameOffset === 1 ? 2 : 1
      actor.sprite.x = actor.frameOffset * (2 * -20)
      setBackgroundPos(actor.sprite)
    }
  
    /**const triggerBunnyMessage = (bunny, classToAdd) => {
      bunny.el.setAttribute('message', ['thanks!', 'arigato!', 'yeah!', '^ _ ^', 'thank you!'][randomN(5) - 1])
      bunny.el.classList.add(classToAdd)
      setTimeout(()=>{
        bunny.el.classList.remove(classToAdd)
      }, 800)
    } animação do abraço **/
  
    const updateSadBunnyCount = () => {
      const sadBunnyCount = settings.bunnies.filter(b => b.sad).length
      elements.indicator.innerHTML = sadBunnyCount ? `x ${sadBunnyCount}` : ''
      if (!sadBunnyCount) {
        elements.endMessage.classList.remove('d-none')
        elements.indicator.classList.add('happy')
      }
    }
    
  
    const hugBunny = bunny => {
      const classToAdd = bunny.x > player.x ? 'hug-bear-bunny' : 'hug-bunny-bear'
      player.el.classList.add('d-none')
      bunny.el.classList.add(classToAdd)
      clearInterval(bunny.animationTimer)
      player.pause = true
      bunny.sad = false
  
      player.y = bunny.y
      if (classToAdd === 'hug-bear-bunny') {
        player.x = bunny.x - 150
        animateSprite(player, 'right')
        animateSprite(bunny, 'left')
      } else {
        player.x = bunny.x + 150
        animateSprite(player, 'left')
        animateSprite(bunny, 'right')
      }
      
      positionMap()
      settings.map.el.classList.add('fast-transition')
      setPos(settings.map)
      player.el.parentNode.style.zIndex = player.y
  
      setTimeout(()=> {
        player.el.classList.remove('d-none')
        ;[classToAdd, 'sad'].forEach(c => bunny.el.classList.remove(c))
        stopSprite(bunny)
        triggerBunnyWalk(bunny)
        player.pause = false
        settings.map.el.classList.remove('slow-transition')
        triggerBunnyMessage(bunny, classToAdd === 'hug-bear-bunny' ? 'happy-left' : 'happy-right')
        updateSadBunnyCount()
      }, 1000)

      
      AudioManager.play('hug')

        }
    const noWall = actor => {
      const newPos = {...actor}
      newPos.x += actor.move.x
      newPos.y += actor.move.y
      if (actor === player && !player.pause) {
        const bunnyToHug = settings.bunnies.find(el => el.sad && el.id !== actor.id && distanceBetween(el, newPos) <= el.buffer)
        if (bunnyToHug) {
          interactWithBunny(bunnyToHug)
  stopSprite(player)
  return
          /*hugBunny(bunnyToHug)
          stopSprite(player)
          return */ /*Abraço*/
        }
      } 
      if ([
        ...settings.bunnies.filter(el => el.id !== actor.id), 
        ...settings.elements].some(el => {
        return distanceBetween(el, newPos) <= el.buffer 
              && distanceBetween(el, actor) > el.buffer
      })) return
  
      const buffer = 40
      const noWallX = actor.move.x > 0
        ? newPos.x + buffer < settings.map.w 
        : newPos.x - buffer > 0 
      const noWallY = actor.move.y > 0
        ? newPos.y < settings.map.h - buffer
        : newPos.y - buffer > 0 
  
      return noWallX && noWallY
    }
  
    const walk = (actor, dir) => {
      if (!dir || player.pause || !settings.isWindowActive) return
      if (noWall(actor)) {
        animateSprite(actor, dir)
        actor.x += actor.move.x
        actor.y += actor.move.y
        if (actor === player) {
          positionMap()
          setPos(settings.map)
          player.el.parentNode.style.zIndex = player.y
        } else {
          setPos(actor)
          actor.el.style.zIndex = actor.y
        }
      } else {
        stopSprite(actor)
      }
    }
  
    const updateOffset = () => {
      const { width, height } = elements.wrapper.getBoundingClientRect()
      settings.offsetPos = {
        x: (width / 2),
        y: (height / 2),
      }
    }
  
    const positionMap = () => {
      settings.map.x = settings.offsetPos.x - player.x
      settings.map.y = settings.offsetPos.y - player.y
    }
  
    const resizeAndRepositionMap = () => {
      settings.map.el.classList.add('transition')
      clearTimeout(settings.transitionTimer)
      settings.transitionTimer = setTimeout(()=> {
        settings.map.el.classList.remove('transition')
      }, 500)
      updateOffset()
      positionMap()
      setPos(settings.map)
    }
  
    const stopSprite = actor => {
      actor.sprite.x = 0
      setBackgroundPos(actor.sprite)
      clearInterval(actor.walkingInterval)
    }
  clearInterval(player.walkingInterval)

    const handleWalk = () =>{
      let dir = 'right'
      const { d } = settings
  
        player.walkingInterval = setInterval(()=>{
        if (Math.abs(player.y - settings.controlPos.y) > 20) {
          player.move.y = player.y > settings.controlPos.y ? -d : d
          dir = player.move.y === -d ? 'up' : 'down'
        } else {
          player.move.y = 0
        }
        if (Math.abs(player.x - settings.controlPos.x) > 20) {
          player.move.x = player.x > settings.controlPos.x ? -d : d
          dir = player.move.x === -d ? 'left' : 'right'
        } else {
          player.move.x = 0
        }
  
        player.move.x || player.move.y
          ? walk(player, dir)
          : stopSprite(player)
      }, 90)
    }
  /*define a posição do player na entrada do projeção */
    player.x = 1000
    player.y = 4000
    player.el.style.zIndex = player.y
    setSize(settings.map)
  
    document.addEventListener('click', e => {
      stopSprite(player)
      const { left, top } = settings.map.el.getBoundingClientRect()
  
      if (e.targetTouches) {
        settings.controlPos = { 
          x: e.targetTouches[0].offsetX - left,
          y: e.targetTouches[0].offsetY - top
        }
      } else {
        settings.controlPos = { 
          x: e.pageX - left,
          y: e.pageY - top
        }
      }
  
      handleWalk()
    })
  
    const elAngle = pos => {
      const { x, y } = pos
      const angle = radToDeg(Math.atan2(y - player.y, x - player.x)) - 90
      return Math.round(angle)
    }
    
    /**new Array(5).fill('').forEach(() => {
      const bunnyPos = Object.assign(document.createElement('div'), { className: 'bunny-pos' })
      elements.bunnyPos.push(bunnyPos)
     
    })  tirar o radar dos coelhos**/
                      
    const findSadBunnies = () => {
      settings.sadBunnies = settings.bunnies.filter(el => el.sad).map(el => {
        return  {
          el,
          distance: distanceBetween(el, player)
        } 
      }).sort((a, b)=> a.distance - b.distance)
      if (settings.sadBunnies.length > 5) settings.sadBunnies.length = 5 
    }
  
    setInterval(()=> {
      findSadBunnies()
      elements.bunnyPos.forEach((indicator, i) => {
        const bunny = settings.sadBunnies[i]?.el
        if (bunny) {
          const angle = elAngle(bunny)
          const distance = distanceBetween(bunny, player)
          indicator.innerHTML = `<div class="bunny-indicator" style="transform: rotate(${angle * -1}deg)">${distance - 40}px</div>`
          indicator.style.setProperty('--size', px(distance > (settings.bunnyRadarSize / 2) ? settings.bunnyRadarSize : distance))
          indicator.style.transform = `rotate(${angle}deg)`
        }
        indicator.classList[bunny ? 'remove' : 'add']('d-none')
      })
    }, 500)
  
    window.addEventListener('focus', ()=> settings.isWindowActive = true)
    window.addEventListener('blur', ()=> settings.isWindowActive = false)
    window.addEventListener('resize', ()=> {
      resizeAndRepositionMap()
      resizeBunnyRadar()
    })
    resizeAndRepositionMap()
    resizeBunnyRadar()
    
    elements.button.addEventListener('click', ()=> location.reload())
  
    new Array(20).fill('').forEach(()=> addBunny())
    new Array(4).fill('').forEach(()=> addTree())
    updateSadBunnyCount()

/*----------vizualização no mapa na area proibida----------*/
const debugNoSpawnZone = () => {
  const el = document.createElement('div')
  el.style.position = 'absolute'
  el.style.left = px(noSpawnZone.x)
  el.style.top = px(noSpawnZone.y)
  el.style.width = px(noSpawnZone.width)
  el.style.height = px(noSpawnZone.height)
  el.style.backgroundColor = 'rgba(255, 0, 0, 0)'
  el.style.border = /*'2px dashed red'*/
  el.style.zIndex = 9999
  settings.map.el.appendChild(el)
}
debugNoSpawnZone()

const debugNoSpawnZone2 = () => {
  const el = document.createElement('div')
  el.style.position = 'absolute'
  el.style.left = px(noSpawnZone2.x)
  el.style.top = px(noSpawnZone2.y)
  el.style.width = px(noSpawnZone2.width)
  el.style.height = px(noSpawnZone2.height)
  el.style.backgroundColor = 'rgba(29, 134, 8, 0)'
  el.style.border = /*'2px dashed red'*/
  el.style.zIndex = 9999
  settings.map.el.appendChild(el)
}
debugNoSpawnZone2()

const debugNoSpawnZone3 = () => {
  const el = document.createElement('div')
  el.style.position = 'absolute'
  el.style.left = px(noSpawnZone3.x)
  el.style.top = px(noSpawnZone3.y)
  el.style.width = px(noSpawnZone3.width)
  el.style.height = px(noSpawnZone3.height)
  el.style.backgroundColor = 'rgba(17, 0, 255, 0)'
  el.style.border = /*'2px dashed red'*/
  el.style.zIndex = 9999
  settings.map.el.appendChild(el)
}
debugNoSpawnZone3()

const debugNoSpawnZone4 = () => {
  const el = document.createElement('div')
  el.style.position = 'absolute'
  el.style.left = px(noSpawnZone4.x)
  el.style.top = px(noSpawnZone4.y)
  el.style.width = px(noSpawnZone4.width)
  el.style.height = px(noSpawnZone4.height)
  el.style.backgroundColor = 'rgba(255, 0, 221, 0)'
  el.style.border = /*'2px dashed red'*/
  el.style.zIndex = 9999
  settings.map.el.appendChild(el)
}
debugNoSpawnZone4()

const debugNoSpawnZone5 = () => {
  const el = document.createElement('div')
  el.style.position = 'absolute'
  el.style.left = px(noSpawnZone5.x)
  el.style.top = px(noSpawnZone5.y)
  el.style.width = px(noSpawnZone5.width)
  el.style.height = px(noSpawnZone5.height)
  el.style.backgroundColor = 'rgba(251, 255, 0, 0)'
  el.style.border = /*'2px dashed red'*/
  el.style.zIndex = 9999
  settings.map.el.appendChild(el)
}
debugNoSpawnZone5()

const debugNoSpawnZone6 = () => {
  const el = document.createElement('div')
  el.style.position = 'absolute'
  el.style.left = px(noSpawnZone6.x)
  el.style.top = px(noSpawnZone6.y)
  el.style.width = px(noSpawnZone6.width)
  el.style.height = px(noSpawnZone6.height)
  el.style.backgroundColor = 'rgba(255, 60, 0, 0)'
  el.style.border = /*'2px dashed red'*/
  el.style.zIndex = 9999
  settings.map.el.appendChild(el)
}
debugNoSpawnZone6()

const debugNoSpawnZone7 = () => {
  const el = document.createElement('div')
  el.style.position = 'absolute'
  el.style.left = px(noSpawnZone7.x)
  el.style.top = px(noSpawnZone7.y)
  el.style.width = px(noSpawnZone7.width)
  el.style.height = px(noSpawnZone7.height)
  el.style.backgroundColor = 'rgba(58, 55, 55, 0)'
  el.style.border = /*'2px dashed red'*/
  el.style.zIndex = 9999
  settings.map.el.appendChild(el)
}
debugNoSpawnZone7()


const isInNoSpawnZone = (x, y) => {
  return (
    x >= noSpawnZone.x &&
    x <= noSpawnZone.x + noSpawnZone.width &&
    y >= noSpawnZone.y &&
    y <= noSpawnZone.y + noSpawnZone.height
  )
}



// ✅ Cria uma parede horizontal 19 blocos
    for (let i = 0; i < 19; i++) {
  addWall({ x: 1360 + (i * 100), y: 690, width: 100, height: 40 })
}
// ✅ Cria uma parede vertical de 24 blocos
for (let i = 0; i < 24; i++) {
  addWall({ x: 1250, y: 700 + (i * 100), width: 40, height: 100 })
}
// ✅ Cria uma parede vertical de 24 blocos
for (let i = 0; i < 24; i++) {
  addWall({ x: 1350, y: 700 + (i * 100), width: 40, height: 100 })
}
// ✅ Cria uma parede horizontal 6 blocos
    for (let i = 0; i < 7; i++) {
  addWall({ x: 1260 + (i * 100), y: 3050, width: 100, height: 40 })
}
// ✅ Cria uma parede vertical 4 blocos
    for (let i = 0; i < 4; i++) {
  addWall({ x: 1960, y: 2700 + (i * 100),width: 40, height: 100 })
}
// ✅ Cria uma parede vertical 12 blocos
    for (let i = 0; i < 12; i++) {
  addWall({ x: 1960, y: 1250 + (i * 100),width: 40, height: 100 })
}
// ✅ Cria uma parede horizontal 6 blocos
    for (let i = 0; i < 7; i++) {
  addWall({ x: 1960 + (i * 100), y: 1200, width: 100, height: 40 })
}
// ✅ Cria uma parede vertical 19 blocos
    for (let i = 0; i < 19; i++) {
  addWall({ x: 2600, y: 1200 + (i * 100),width: 40, height: 100 })
}
// ✅ Cria uma parede vertical 4 blocos
    for (let i = 0; i < 4; i++) {
  addWall({ x: 1600 + (i * 100), y: 2420, width: 100, height: 40 })
}
// ✅ Cria uma parede horizontal 4 blocos
    for (let i = 0; i < 4; i++) {
  addWall({ x: 1600 + (i * 100), y: 2700, width: 100, height: 40 })
}
// ✅ Cria uma parede vertical 3 blocos
    for (let i = 0; i < 3; i++) {
  addWall({ x: 1550, y: 2450 + (i * 100),width: 40, height: 100 })
}
// ✅ Cria uma parede vertical de 28 blocos
for (let i = 0; i < 40; i++) {
  addWall({ x: 3240, y: 0 + (i * 100), width: 40, height: 100 })
}
// ✅ Cria uma parede horizontal 4 blocos
    for (let i = 0; i < 4; i++) {
  addWall({ x: 2850 + (i * 100), y: 3460, width: 100, height: 40 })
}
// ✅ Cria uma parede vertical 3 blocos
    for (let i = 0; i < 4; i++) {
  addWall({ x: 2850, y: 3100 + (i * 100),width: 40, height: 100 })
}
// ✅ Cria uma parede horizontal 4 blocos
    for (let i = 0; i < 3; i++) {
  addWall({ x: 2600 + (i * 100), y: 3100, width: 100, height: 40 })
}
// ✅ Cria uma parede vertical de 33 blocos
for (let i = 0; i < 33; i++) {
  addWall({ x: 800, y: 700 + (i * 100), width: 40, height: 100 })
}
// ✅ Cria uma parede vertical de 33 blocos
for (let i = 0; i < 33; i++) {
  addWall({ x: 230, y: 700 + (i * 100), width: 40, height: 100 })
}
// ✅ Cria uma parede vertical de 3 blocos
for (let i = 0; i < 3; i++) {
  addWall({ x: 1250, y: 3500 + (i * 100), width: 40, height: 100 })
}
// ✅ Cria uma parede horizontal 8 blocos
    for (let i = 0; i < 8; i++) {
  addWall({ x: 1300 + (i * 100), y: 3650, width: 100, height: 40 })
}
// ✅ Cria uma parede vertical de 4 blocos
for (let i = 0; i < 4; i++) {
  addWall({ x: 2240, y: 3670 + (i * 100), width: 40, height: 100 })
}
// ✅ Cria uma parede vertical de 4 blocos
for (let i = 0; i < 4; i++) {
  addWall({ x: 2600, y: 3670 + (i * 100), width: 40, height: 100 })
}
// ✅ Cria uma parede horizontal 8 blocos
    for (let i = 0; i < 3; i++) {
  addWall({ x: 2300 + (i * 100), y: 3650, width: 100, height: 40 })
}
// ✅ Cria uma parede horizontal 19 blocos
    for (let i = 0; i < 6; i++) {
  addWall({ x: 240 + (i * 100), y: 690, width: 100, height: 40 })
}
// ✅ Cria uma parede horizontal 4 blocos
    for (let i = 0; i < 3; i++) {
  addWall({ x: 1100 + (i * 100), y: 2800, width: 100, height: 40 })
}
// ✅ Cria uma parede horizontal 4 blocos
    for (let i = 0; i < 3; i++) {
  addWall({ x: 1100 + (i * 100), y: 2400, width: 100, height: 40 })
}
// ✅ Cria uma parede vertical 4 blocos
    for (let i = 0; i < 4; i++) {
  addWall({ x: 1050, y: 2400 + (i * 100),width: 40, height: 100 })
}
// ✅ Cria uma parede horizontal 4 blocos
    for (let i = 0; i < 3; i++) {
  addWall({ x: 1100 + (i * 100), y: 2200, width: 100, height: 40 })
}
// ✅ Cria uma parede horizontal 4 blocos
    for (let i = 0; i < 3; i++) {
  addWall({ x: 1100 + (i * 100), y: 1800, width: 100, height: 40 })
}
// ✅ Cria uma parede vertical 4 blocos
    for (let i = 0; i < 4; i++) {
  addWall({ x: 1050, y: 1800 + (i * 100),width: 40, height: 100 })
}
// ✅ Cria uma parede horizontal 4 blocos
    for (let i = 0; i < 3; i++) {
  addWall({ x: 1100 + (i * 100), y: 1600, width: 100, height: 40 })
}
// ✅ Cria uma parede horizontal 4 blocos
    for (let i = 0; i < 3; i++) {
  addWall({ x: 1100 + (i * 100), y: 1200, width: 100, height: 40 })
}
// ✅ Cria uma parede vertical 4 blocos
    for (let i = 0; i < 4; i++) {
  addWall({ x: 1050, y: 1200 + (i * 100),width: 40, height: 100 })
}
// ✅ Cria uma parede vertical 4 blocos
    for (let i = 0; i < 3; i++) {
  addWall({ x: 1050, y: 700 + (i * 100),width: 40, height: 100 })
}
// ✅ Cria uma parede horizontal 4 blocos
    for (let i = 0; i < 3; i++) {
  addWall({ x: 1100 + (i * 100), y: 1000, width: 100, height: 40 })
}
// ✅ Cria uma parede horizontal 4 blocos
    for (let i = 0; i < 3; i++) {
  addWall({ x: 1100 + (i * 100), y: 700, width: 100, height: 40 })
}
// ✅ Cria uma parede vertical 4 blocos
    for (let i = 0; i < 2; i++) {
  addWall({ x: 1920, y: 3300 + (i * 100),width: 40, height: 100 })
}
// ✅ Cria uma parede vertical 4 blocos
    for (let i = 0; i < 2; i++) {
  addWall({ x: 1430, y: 3300 + (i * 100),width: 40, height: 100 })
}
// ✅ Cria uma parede horizontal 4 blocos
    for (let i = 0; i < 5; i++) {
  addWall({ x: 1440 + (i * 100), y: 3280, width: 100, height: 40 })
}
// ✅ Cria uma parede horizontal 4 blocos
    for (let i = 0; i < 5; i++) {
  addWall({ x: 1440 + (i * 100), y: 3480, width: 100, height: 40 })
}

const nameTag = document.createElement('div')
nameTag.id = 'player-name'
nameTag.className = 'name-tag'
elements.player.appendChild(nameTag)

player.el.style.width = '100px'
player.el.style.height = '100px'
player.sprite.el.style.transform = 'scale(3)'
player.sprite.el.style.transformOrigin = 'top left'
  
