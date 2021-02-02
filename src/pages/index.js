import React, { useState, useEffect, useRef } from "react"
import Layout from "src/components/layout"
import SEO from "src/components/seo"
import {
  SimpleGrid,
  Text,
  Flex,
  Button,
  PseudoBox,
  FormLabel,
  FormControl,
  Input,
  Select,
  Checkbox,
} from "@chakra-ui/core"
import { clap, snare, kick, hihat, tink } from "src/sounds/"
import "src/pages/index.css"

const polyrhythmList = [
  [2, 3],
  [2, 5],
  [3, 4],
  [2, 7],
  [3, 5],
  [2, 9],
  [4, 5],
  [3, 7],
  [3, 8],
  [4, 6],
  [4, 7],
  [5, 6],
  [5, 7],
  [4, 9],
  [5, 8],
  [6, 7],
  [5, 9],
  [6, 8],
  [6, 9],
  [7, 8],
  [7, 9],
  [7, 11],
  [8, 9],
]

const IndexPage = props => {
  const clapRef = useRef(null)
  const snareRef = useRef(null)
  const kickRef = useRef(null)
  const hihatRef = useRef(null)
  const tinkRef = useRef(null)

  const [currentPolyrhythm, setCurrentPolyrhythm] = useState(0)
  const [invertHands, setInvertHands] = useState(false)
  const [tempo, setTempo] = useState(180)
  const [shouldPlaySound, setShouldPlaySound] = useState(false)
  const [playingInterval, setPlayingInterval] = useState(null)

  useEffect(() => {
    let persistedPolyrhythm
    try {
      persistedPolyrhythm = JSON.parse(
        localStorage.getItem("persistedPolyrhythm")
      )
    } catch (e) {}
    if (persistedPolyrhythm) setCurrentPolyrhythm(persistedPolyrhythm)
  }, [])

  const [sounds] = useState([
    { name: "clap", src: clap, ref: clapRef },
    { name: "snare", src: snare, ref: snareRef },
    { name: "kick", src: kick, ref: kickRef },
    { name: "hihat", src: hihat, ref: hihatRef },
    { name: "tink", src: tink, ref: tinkRef },
  ])
  const [leftHandSound, setLeftHandSound] = useState("clap")
  const [leftHandAnimation, setLeftHandAnimation] = useState("")
  const [leftHandKey, setLeftHandKey] = useState({ keyCode: 90, key: "z" })

  const [rightHandSound, setRightHandSound] = useState("snare")
  const [rightHandAnimation, setRightHandAnimation] = useState("")
  const [rightHandKey, setRightHandKey] = useState({ keyCode: 77, key: "m" })

  const getSound = name => sounds.find(x => x.name === name)

  const playSound = type => {
    const playLeft = () => {
      const { ref } = getSound(leftHandSound)
      if (ref && ref.current) {
        if (shouldPlaySound) {
          setLeftHandAnimation(`lefthandassist ${90 / tempo}s`)
          setTimeout(() => setLeftHandAnimation(""), 60000 / (2 * tempo))
        } else {
          ref.current.currentTime = 0
          ref.current.play()
          setLeftHandAnimation(`lefthand ${90 / tempo}s`)
          setTimeout(() => setLeftHandAnimation(""), 60000 / (2 * tempo))
        }
      }
    }
    const playRight = () => {
      const { ref } = getSound(rightHandSound)
      if (ref && ref.current) {
        if (shouldPlaySound) {
          setRightHandAnimation(`righthandassist ${90 / tempo}s`)
          setTimeout(() => setRightHandAnimation(""), 60000 / (2 * tempo))
        } else {
          ref.current.currentTime = 0
          ref.current.play()
          setRightHandAnimation(`righthand ${90 / tempo}s`)
          setTimeout(() => setRightHandAnimation(""), 60000 / (2 * tempo))
        }
      }
    }
    if (type === "left") playLeft()
    else if (type === "right") playRight()
  }

  useEffect(() => {
    const handleKeyPress = e => {
      if (leftHandKey.keyCode === e.keyCode) playSound("left")
      else if (rightHandKey.keyCode === e.keyCode) playSound("right")
    }
    window.addEventListener("keydown", handleKeyPress)
  }, [])

  const startPlaying = (playingFn = playSound) => {
    const timeInterval = 60000 / tempo
    let count = 1
    const incrementCount = () =>
      count ===
      polyrhythmList[currentPolyrhythm][0] *
        polyrhythmList[currentPolyrhythm][1]
        ? (count = 1)
        : count++

    const play = (count, incrementCount) => {
      if (count % polyrhythmList[currentPolyrhythm][0] === 0) {
        if (invertHands) playingFn("right")
        else playingFn("left")
      }
      if (count % polyrhythmList[currentPolyrhythm][1] === 0) {
        if (invertHands) playingFn("left")
        else playingFn("right")
      }
      incrementCount()
    }
    setPlayingInterval(
      setInterval(() => play(count, incrementCount), timeInterval)
    )
  }
  const stopPlaying = () => {
    clearInterval(playingInterval)
    setPlayingInterval(null)
  }

  const handleInterruptChange = changeCallback => {
    if (playingInterval) {
      stopPlaying()
    }
    changeCallback()
  }

  return (
    <>
      <SEO title="Home" />
      {sounds.map(sound => (
        <audio
          src={sound.src}
          name={sound.name}
          ref={sound.ref}
          key={sound.name}
        />
      ))}
      <Flex flexDir="column" my="10px" width="100vw">
        <Flex flexDir="row" wrap="wrap" mb="10px">
          <FormControl mx="10px">
            <FormLabel htmlFor="currentPolyrhythm" value="">
              Current Polyrhythm
            </FormLabel>
            <Select
              id="currentPolyrhythm"
              value={currentPolyrhythm}
              onChange={e =>
                handleInterruptChange(() =>
                  setCurrentPolyrhythm(e.target.value)
                )
              }
            >
              {polyrhythmList.map((x, i) => (
                <option
                  value={i}
                  key={JSON.stringify(x)}
                >{`${x[0]} - ${x[1]}`}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl mx="10px">
            <FormLabel htmlFor="tempo">Tempo</FormLabel>
            <Input
              type="number"
              id="tempo"
              value={tempo}
              onChange={e =>
                handleInterruptChange(() =>
                  setTempo(
                    parseInt(e.target.value) ? parseInt(e.target.value) : ""
                  )
                )
              }
              placeholder="Enter tempo"
            ></Input>
          </FormControl>
          <FormControl
            mx="10px"
            my={["5px", "5px", "auto", "auto"]}
            display="flex"
            flexDir="column"
            textAlign="center"
          >
            <FormLabel htmlFor="invertHands">
              <Checkbox
                id="invertHands"
                value={invertHands}
                mx="5px"
                onChange={e =>
                  handleInterruptChange(() => setInvertHands(e.target.checked))
                }
              />
              Invert Hands
            </FormLabel>
            <FormLabel htmlFor="shouldPlaySound">
              <Checkbox
                id="shouldPlaySound"
                value={shouldPlaySound}
                mx="5px"
                onChange={e =>
                  handleInterruptChange(() =>
                    setShouldPlaySound(e.target.checked)
                  )
                }
              />
              Do not play audio
            </FormLabel>
          </FormControl>
        </Flex>
        <Flex flexDir="row" justifyContent="center">
          <Button
            isDisabled={Boolean(playingInterval)}
            onClick={() => startPlaying()}
            mr="10px"
          >
            Start
          </Button>
          <Button
            isDisabled={Boolean(!playingInterval)}
            onClick={() => stopPlaying()}
          >
            Stop
          </Button>
        </Flex>
      </Flex>
      <SimpleGrid columns={2}>
        <PseudoBox
          as="button"
          boxSizing="border-box"
          style={{ touchAction: "manipulation" }}
          h="40vh"
          w="100%"
          bg="red.400"
          borderRight="1px solid"
          animation={leftHandAnimation}
          // onTouchStart={touchStart}
          onTouchStart={() => playSound("left")}
          d="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
        >
          <Text textTransform="capitalize">Play {leftHandSound}</Text>
          (Left hand - tap or press key &apos;{leftHandKey.key}&apos;)
        </PseudoBox>
        <PseudoBox
          as="button"
          boxSizing="border-box"
          style={{ touchAction: "manipulation" }}
          h="40vh"
          w="100%"
          bg="green.400"
          borderLeft="1px solid"
          animation={rightHandAnimation}
          // onTouchStart={touchStart}
          onTouchStart={() => playSound("right")}
          d="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
        >
          <Text textTransform="capitalize">Play {rightHandSound}</Text>
          (Right hand - tap or press key &apos;{rightHandKey.key}&apos;)
        </PseudoBox>
      </SimpleGrid>
    </>
  )
}

const IndexPageWrapper = props => (
  <Layout {...props}>
    <IndexPage />
  </Layout>
)

export default IndexPageWrapper
