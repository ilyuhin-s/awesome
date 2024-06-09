import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import WebApp from "@twa-dev/sdk";
import {
  Flex,
  Text,
  Button,
  Box,
  Card,
  SegmentedControl,
} from "@radix-ui/themes";
WebApp.MainButton;
function App() {
  const [count, setCount] = useState(0);

  return (
    <Flex gap="3" direction="column">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Text size="7" weight="bold">
        Vite + React
      </Text>

      <Flex align='stretch' direction="column" gap="4">
        <SegmentedControl.Root defaultValue="inbox" radius="full">
          <SegmentedControl.Item value="inbox">Inbox</SegmentedControl.Item>
          <SegmentedControl.Item value="drafts">Drafts</SegmentedControl.Item>
          <SegmentedControl.Item value="sent">Sent</SegmentedControl.Item>
        </SegmentedControl.Root>
      </Flex>

      <Box maxWidth="350px">
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
    </Flex>
  );
}

export default App;
