import "./App.css";
import WebApp from "@twa-dev/sdk";
import { Flex, Heading, SegmentedControl } from "@radix-ui/themes";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";

type EScreens = "mine" | "earn" | "airdrop";

const Airdrop = () => {
  const wallet = useTonWallet();
  console.log(wallet);
  return (
    <motion.div
      animate={{
        x: [-40, 0],
      }}
    >
      <Flex gap="8" direction="column" align="center" justify="center">
        <Heading mb="2" size="9">
          Airdrop
        </Heading>
        <TonConnectButton />
      </Flex>
    </motion.div>
  );
};

const Mine = () => {
  const [count, setCount] = useState(() => {
    return Number(localStorage.getItem("count")) || 0;
  });

  const [positions, setPositions] = useState<
    { x: number; y: number; date: Date }[]
  >([]);

  useEffect(() => {
    localStorage.setItem("count", String(count));
  }, [count]);

  const handleClick = (event: React.TouchEvent<HTMLDivElement>) => {
    const date = new Date();
    setPositions([
      ...positions,
      { x: event.touches[0].clientX, y: event.touches[0].clientY, date },
    ]);

    setTimeout(() => {
      setPositions((positions) =>
        positions.filter((item) => item.date !== date)
      );
    }, 500);

    setCount((count) => count + 4);
  };

  return (
    <motion.div
      animate={{
        x: [40, 0],
      }}
    >
      <Flex gap="8" direction="column" align="center" justify="center">
        <Heading mb="2" size="9">
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "USD",
          }).format(count)}
        </Heading>
        <div onTouchStart={handleClick}>
          <motion.button
            className="clicker"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          />
          <AnimatePresence>
            {positions.map((position) => (
              <motion.div
                onTransitionEnd={() =>
                  setPositions((positions) =>
                    positions.filter((item) => item.date !== position.date)
                  )
                }
                animate={{
                  opacity: [0, 1, 0],
                  y: [40, 0, -50],
                }}
                key={+position.date}
                style={{ left: `${position.x}px`, top: `${position.y - 40}px` }}
                className="count"
              >
                <Heading size="6">+4</Heading>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Flex>
    </motion.div>
  );
};

function App() {
  const [screen, setScreen] = useState<EScreens>("mine");

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  useEffect(() => {
    WebApp.expand();
  }, []);

  return (
    <div className="container">
      {screen === "mine" && <Mine />}
      {screen === "airdrop" && <Airdrop />}
      <motion.div
        variants={container}
        className="menu"
        initial="hidden"
        animate="visible"
      >
        <Flex align="stretch" asChild direction="column" gap="4">
          <SegmentedControl.Root
            size="3"
            onValueChange={(value) => setScreen(value as EScreens)}
            defaultValue="mine"
            radius="full"
          >
            <SegmentedControl.Item value="mine">Mine</SegmentedControl.Item>
            <SegmentedControl.Item value="earn">Earn</SegmentedControl.Item>
            <SegmentedControl.Item value="airdrop">
              Airdrop
            </SegmentedControl.Item>
          </SegmentedControl.Root>
        </Flex>
      </motion.div>
    </div>
  );
}

export default App;
