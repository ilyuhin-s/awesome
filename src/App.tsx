import "./App.css";
import WebApp from "@twa-dev/sdk";
import { Button, Flex, Heading, SegmentedControl } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
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
      <Flex gap="8" direction="column" align="center" justify="center">
        <Heading mb="2" size="9">
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "USD",
          }).format(count)}
        </Heading>
        <motion.button
          className="clicker"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCount((count) => count + 1)}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        />
      </Flex>
      <motion.div
        variants={container}
        className="menu"
        initial="hidden"
        animate="visible"
      >
        <Flex align="stretch" asChild direction="column" gap="4">
          <SegmentedControl.Root size="3" defaultValue="inbox" radius="full">
            <SegmentedControl.Item value="inbox">Mine</SegmentedControl.Item>
            <SegmentedControl.Item value="drafts">Earn</SegmentedControl.Item>
            <SegmentedControl.Item value="sent">Airdrop</SegmentedControl.Item>
          </SegmentedControl.Root>
        </Flex>
      </motion.div>

      {/* <Box maxWidth="350px">
          <Card asChild>
            <Flex gap="3" direction="column">
              <Text as="div" color="gray" size="2">
                Start building your next project in minutes
              </Text>
              <Button onClick={() => setCount((count) => count + 1)}>
                count is {count}
              </Button>
            </Flex>
          </Card>
        </Box>
        <Button
          size={"4"}
          radius="large"
          variant="surface"
          onClick={() =>
            WebApp.showAlert(`Hello World! Current count is ${count}`)
          }
        >
          Show Alert 2
        </Button>
      </Flex> */}
    </div>
  );
}

export default App;
