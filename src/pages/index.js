import React, { useState, useEffect, useRef } from "react"
import Layout from "src/components/layout"
import SEO from "src/components/seo"
import { SimpleGrid, Text, PseudoBox, Box } from "@chakra-ui/core"
import { clap, snare, kick, hihat, tink } from "src/sounds/"

const IndexPage = () => {
  const clapRef = useRef(null)
  const snareRef = useRef(null)
  const kickRef = useRef(null)
  const hihatRef = useRef(null)
  const tinkRef = useRef(null)

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
    if (type === "left") {
      const { ref } = getSound(leftHandSound)
      if (ref && ref.current) {
        ref.current.currentTime = 0
        ref.current.play()
        setLeftHandAnimation("lefthand 0.2s")
        setTimeout(() => setLeftHandAnimation(""), 150)
      }
    } else if (type === "right") {
      const { ref } = getSound(rightHandSound)
      if (ref && ref.current) {
        ref.current.currentTime = 0
        ref.current.play()
        setRightHandAnimation("righthand 0.2s")
        setTimeout(() => setRightHandAnimation(""), 150)
      }
    }
  }
  useEffect(() => {
    const handleKeyPress = e => {
      if (leftHandKey.keyCode === e.keyCode) playSound("left")
      else if (rightHandKey.keyCode === e.keyCode) playSound("right")
    }
    window.addEventListener("keydown", handleKeyPress)
  }, [])

  return (
    <Layout>
      <SEO title="Home" />
      {sounds.map(sound => (
        <audio
          src={sound.src}
          name={sound.name}
          ref={sound.ref}
          key={sound.name}
        />
      ))}
      <SimpleGrid columns={2}>
        <PseudoBox
          as="button"
          boxSizing="border-box"
          border="2px solid"
          borderX="4px solid"
          h="80vh"
          w="100%"
          bg="red.400"
          animation={leftHandAnimation}
          onClick={() => playSound("left")}
          d="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
        >
          <Text textTransform="capitalize">Play {leftHandSound}</Text>
          (Left hand - tap or press key '{leftHandKey.key}')
        </PseudoBox>
        <PseudoBox
          as="button"
          boxSizing="border-box"
          border="2px solid"
          borderX="4px solid"
          h="80vh"
          w="100%"
          bg="green.400"
          animation={rightHandAnimation}
          onClick={() => playSound("right")}
          d="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
        >
          <Text textTransform="capitalize">Play {rightHandSound}</Text>
          (Right hand - tap or press key '{rightHandKey.key}')
        </PseudoBox>
      </SimpleGrid>
    </Layout>
  )
}

export default IndexPage
